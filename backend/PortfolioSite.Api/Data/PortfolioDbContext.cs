using Microsoft.EntityFrameworkCore;
using PortfolioSite.Api.Models;
using System.Reflection.Emit;

namespace PortfolioSite.Api.Data
{
    public class PortfolioDbContext : DbContext
    {
        public PortfolioDbContext(DbContextOptions<PortfolioDbContext> options)
            : base(options)
        {
        }

        // These represent your tables in Neon
        public DbSet<Project> Projects { get; set; }
        public DbSet<ProjectNarrative> ProjectNarratives { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuring the 1-to-1 relationship
            modelBuilder.Entity<Project>()
                .HasOne(p => p.Narrative)
                .WithOne() // Narrative belongs to one project
                .HasForeignKey<ProjectNarrative>(n => n.ProjectId);

            // PostgreSQL Pro-Tip: Ensure arrays are handled correctly
            // EF Core 10 handles string[] natively, but this ensures 
            // the column type is explicitly text[]
        }
    }
}
