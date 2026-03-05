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
        [JsonPropertyName("backStory")]
        public string BackStory { get; set; } = string.Empty;
        [JsonPropertyName("designPhilosophy")]
        public string DesignPhilosophy { get; set; } = string.Empty;
        [JsonPropertyName("technicalChallenges")]
        public string TechnicalChallenges { get; set; } = string.Empty;

        // Foreign Key back to Project
        [JsonIgnore]
        public Project Project { get; set; } = null!;
    }
}
