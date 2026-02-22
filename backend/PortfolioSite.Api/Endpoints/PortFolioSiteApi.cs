using Microsoft.EntityFrameworkCore;
using PortfolioSite.Api.Data;

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

            // This is where you'll add your group.MapPost, group.MapPut, etc. later!
        }
    }
}
