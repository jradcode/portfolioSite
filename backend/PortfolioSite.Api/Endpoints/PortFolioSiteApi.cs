using Microsoft.EntityFrameworkCore;
using PortfolioSite.Api.Data;
using PortfolioSite.Api.Models;

namespace PortfolioSite.Api.Endpoints
{
    public static class PortFolioSiteApi
    {
        public static void MapPortfolioSiteEndpoints(this IEndpointRouteBuilder app)
        {
            var group = app.MapGroup("/api/projects");

            group.MapGet("/", async (PortfolioDbContext db) =>
                await db.Projects
                        .Include(p => p.Narrative)
                        .AsNoTracking()
                        .ToListAsync());

            // GET BY ID
            group.MapGet("/{id}", async (int id, PortfolioDbContext db) =>
                await db.Projects
                        .Include(p => p.Narrative)
                        .FirstOrDefaultAsync(p => p.Id == id)
                is Project project ? Results.Ok(project) : Results.NotFound());

            // POST (CREATE)
            group.MapPost("/", async (Project project, PortfolioDbContext db) =>
            {
                db.Projects.Add(project);
                await db.SaveChangesAsync();
                return Results.Created($"/api/projects/{project.Id}", project);
            });

            //PUT (UPDATE) Edit Project
            group.MapPut("/{id}", async (int id, Project inputProject, PortfolioDbContext db) =>
            {
                var project = await db.Projects
                                     .Include(p => p.Narrative)
                                     .FirstOrDefaultAsync(p => p.Id == id);

                if (project is null) return Results.NotFound();

                // 1. Update Core Project Fields
                project.Name = inputProject.Name;
                project.Description = inputProject.Description;
                project.GithubUrl = inputProject.GithubUrl;
                project.Technologies = inputProject.Technologies;
                project.Images = inputProject.Images;

                // 2. Update or Initialize Narrative
                if (inputProject.Narrative != null)
                {
                    if (project.Narrative == null)
                    {
                        // If narrative didn't exist, create it and link it
                        project.Narrative = new ProjectNarrative
                        {
                            Id = project.Id, // Shared Primary Key
                            BackStory = inputProject.Narrative.BackStory,
                            DesignPhilosophy = inputProject.Narrative.DesignPhilosophy,
                            TechnicalChallenges = inputProject.Narrative.TechnicalChallenges
                        };
                    }
                    else
                    {
                        // If it exists, just update the fields
                        project.Narrative.BackStory = inputProject.Narrative.BackStory;
                        project.Narrative.DesignPhilosophy = inputProject.Narrative.DesignPhilosophy;
                        project.Narrative.TechnicalChallenges = inputProject.Narrative.TechnicalChallenges;
                    }
                }

                await db.SaveChangesAsync();
                return Results.Ok(project);
            });

            // DELETE
            group.MapDelete("/{id}", async (int id, PortfolioDbContext db) =>
            {
                var project = await db.Projects.FindAsync(id);
                if (project is null) return Results.NotFound();

                db.Projects.Remove(project);
                await db.SaveChangesAsync();
                return Results.NoContent();
            });
        }
    }
}
