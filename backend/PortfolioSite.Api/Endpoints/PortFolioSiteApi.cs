using Microsoft.EntityFrameworkCore;
using PortfolioSite.Api.Data;
using PortfolioSite.Api.Models;
using PortfolioSite.Api.Services;
using Microsoft.AspNetCore.Identity;

namespace PortfolioSite.Api.Endpoints
{
    public static class PortFolioSiteApi
    {
        public record LoginRequest(string Username, string Password);

        public static void MapPortfolioSiteEndpoints(this IEndpointRouteBuilder app)
        {
            // The actual login route
            app.MapPost("/api/auth/login", (LoginRequest login, ITokenService tokenService, IConfiguration config) =>
            {
                var adminUser = config["Admin:Username"];
                var adminHash = config["Admin:PasswordHash"];

                // Log what is happening to your Terminal
                //Console.WriteLine($"Login Attempt: User={login.Username}, ConfigUser={adminUser}");

                // Check if the Username is correct
                if (string.IsNullOrEmpty(login.Username) || login.Username != adminUser)
                {
                    return Results.Unauthorized();
                }

                var hasher = new PasswordHasher<string>();

                // Verify the password using the same identity string used to hash it
                var result = hasher.VerifyHashedPassword("jradcode", adminHash!, login.Password);

                // If the password doesn't match, fail.
                if (result == PasswordVerificationResult.Failed)
                {
                    Console.WriteLine("Password verification failed.");
                    return Results.Unauthorized();
                }

                // Success!
                var token = tokenService.CreateToken(adminUser!);
                return Results.Ok(new { token });
            });

            var group = app.MapGroup("/api/projects");

            group.MapGet("/", async (PortfolioDbContext db) =>
                await db.Projects
                        .Include(p => p.Narrative)
                        .AsNoTracking()
                        .ToListAsync());

            // Get by Id
            group.MapGet("/{id}", async (int id, PortfolioDbContext db) =>
                await db.Projects
                        .Include(p => p.Narrative)
                        .FirstOrDefaultAsync(p => p.Id == id)
                is Project project ? Results.Ok(project) : Results.NotFound());

            // Post (Create Project)
            group.MapPost("/", async (Project project, PortfolioDbContext db) =>
            {
               
                // If Angular sends 'null' or a number, it can trip the PK constraint.
                project.Id = 0;

                if (project.Narrative != null)
                {
                    // For Shared PK, the Narrative ID must be 0 
                    // so it can inherit the Project ID after the Project is saved.
                    project.Narrative.Id = 0;
                    project.Narrative.Project = project;
                }

                db.Projects.Add(project);

                try
                {
                    await db.SaveChangesAsync();
                    var completeProject = await db.Projects.Include(p => p.Narrative).FirstOrDefaultAsync(p => p.Id == project.Id);
                    return Results.Created($"/api/projects/{project.Id}", completeProject);
                }
                catch (DbUpdateException ex) when (ex.InnerException is Npgsql.PostgresException pgEx && pgEx.SqlState == "23505")
                {
                    return Results.Conflict("A project with this ID already exists or the sequence is out of sync.");
                }
            }).RequireAuthorization();

            // Put (Update) Edit Project
            group.MapPut("/{id}", async (int id, Project inputProject, PortfolioDbContext db) =>
            {
                var project = await db.Projects
                                     .Include(p => p.Narrative)
                                     .FirstOrDefaultAsync(p => p.Id == id);

                if (project is null) return Results.NotFound();

                // Update Core Project Fields
                project.Name = inputProject.Name;
                project.Description = inputProject.Description;
                project.GithubUrl = inputProject.GithubUrl;
                project.Technologies = inputProject.Technologies;
                project.Images = inputProject.Images;

                // Update or Initialize Narrative
                if (inputProject.Narrative != null)
                {
                    if (project.Narrative == null)
                    {
                        // If narrative didn't exist, create it and link it
                        project.Narrative = new ProjectNarrative
                        {
                            Id = project.Id,
                            BackStory = inputProject.Narrative.BackStory,
                            DesignPhilosophy = inputProject.Narrative.DesignPhilosophy,
                            TechnicalChallenges = inputProject.Narrative.TechnicalChallenges
                        };
                    }
                    else
                    {
                        // If it exists, update the fields
                        project.Narrative.BackStory = inputProject.Narrative.BackStory;
                        project.Narrative.DesignPhilosophy = inputProject.Narrative.DesignPhilosophy;
                        project.Narrative.TechnicalChallenges = inputProject.Narrative.TechnicalChallenges;
                    }
                }

                await db.SaveChangesAsync();
                return Results.Ok(project);
            }).RequireAuthorization();

            // Delete/Destory Request
            group.MapDelete("/{id}", async (int id, PortfolioDbContext db, IWebHostEnvironment env) =>
            {
                var project = await db.Projects.FindAsync(id);
                if (project is null) return Results.NotFound();

                // This assumes your folder name matches a slugified version of project.Name
                var slug = project.Name.ToLower().Replace(" ", "-");
                var folderPath = Path.Combine(env.WebRootPath, "images", slug);

                if (Directory.Exists(folderPath))
                {
                    Directory.Delete(folderPath, true); // true = recursive delete
                }

                db.Projects.Remove(project);
                await db.SaveChangesAsync();
                return Results.NoContent();
            }).RequireAuthorization();

            // Post (Upload Image)
            // This endpoint takes a file and the project name to create /images/project-name/file.webp
            group.MapPost("/upload", async (IFormFile file, string projectName, IImageService imageService) =>
            {
                if (file == null || file.Length == 0)
                    return Results.BadRequest("No file uploaded.");

                if (string.IsNullOrWhiteSpace(projectName))
                    return Results.BadRequest("Project name is required for folder organization.");

                try
                {
                    // Call SkiaSharp service
                    string imagePath = await imageService.ProcessAndSaveImageAsync(file, projectName);

                    // Return the path so Angular can add it to the Project.Images array
                    return Results.Ok(new { path = imagePath });
                }
                catch (Exception ex)
                {
                    return Results.Problem($"Image processing failed: {ex.Message}");
                }
            }).DisableAntiforgery().RequireAuthorization(); // Essential for multipart/form-data in Minimal APIs

            var resumeGroup = app.MapGroup("/api/resume");
            // Use a generic internal name so you NEVER have to change this code again
            const string fileName = "Web-Dev-Resume-2026.pdf";

            resumeGroup.MapGet("/download", (IWebHostEnvironment env) =>
            {
                var filePath = Path.Combine(env.ContentRootPath, "Docs", fileName);

                if (!File.Exists(filePath))
                    return Results.NotFound("Resume file not found.");

                // This is where you can keep the "Year" for the user's benefit
                // You only change the '2026' here so the user sees a fresh date
                return Results.File(filePath, "application/pdf", "Web-Dev-Resume-2026.pdf");
            });

            // Keep the POST just in case you ever want to build that Admin button!
            resumeGroup.MapPost("/upload", async (IFormFile file, IWebHostEnvironment env) =>
            {
                var folderPath = Path.Combine(env.ContentRootPath, "Docs");
                if (!Directory.Exists(folderPath)) Directory.CreateDirectory(folderPath);

                var filePath = Path.Combine(folderPath, fileName);

                using var stream = new FileStream(filePath, FileMode.Create);
                await file.CopyToAsync(stream);

                return Results.Ok(new { message = "Uploaded!" });
            }).DisableAntiforgery().RequireAuthorization();
        }
    }
}
