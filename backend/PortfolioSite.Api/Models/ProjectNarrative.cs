using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PortfolioSite.Api.Models
{
    public class ProjectNarrative
    {
        [Key]
        public int Id { get; set; }
        public string BackStory { get; set; } = string.Empty;
        public string DesignPhilosophy { get; set; } = string.Empty;
        public string TechnicalChallenges { get; set; } = string.Empty;

        // Foreign Key back to Project
        public int ProjectId { get; set; }
    }
}
