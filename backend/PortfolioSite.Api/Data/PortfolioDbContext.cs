using Microsoft.EntityFrameworkCore;
using PortfolioSite.Api.Models;

namespace PortfolioSite.Api.Data
{
    public class PortfolioDbContext : DbContext
    {
        public PortfolioDbContext(DbContextOptions<PortfolioDbContext> options)
            : base(options)
        {
        }

        public DbSet<Project> Projects { get; set; }
        public DbSet<ProjectNarrative> ProjectNarratives { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // 1. Configuring the 1-to-1 relationship with Shared Primary Key
            modelBuilder.Entity<Project>()
                .HasOne(p => p.Narrative)
                .WithOne(n => n.Project) // Points back to the virtual Project property
                .HasForeignKey<ProjectNarrative>(n => n.Id); // Narrative.Id is the link

            // 2. Neon/PostgreSQL specific configuration for string arrays
            // This ensures the database creates 'text[]' columns instead of trying to make a sub-table
            modelBuilder.Entity<Project>(entity =>
            {
                entity.Property(p => p.Images)
                    .HasColumnType("text[]");

                entity.Property(p => p.Technologies)
                    .HasColumnType("text[]");
            });
        }
    }
}