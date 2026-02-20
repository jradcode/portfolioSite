using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace PortfolioSite.Api.Models
{
    public class ProjectNarrative
    {
        [Key]
        [ForeignKey("Project")]
        public int Id { get; set; }
        public string BackStory { get; set; } = string.Empty;
        public string DesignPhilosophy { get; set; } = string.Empty;
        public string TechnicalChallenges { get; set; } = string.Empty;

        // Foreign Key back to Project
        [JsonIgnore]
        public virtual Project Project { get; set; } = null!;
    }
}
