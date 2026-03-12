using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace PortfolioSite.Api.Models
{
    public class Project
    {
        [Key]
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; } = string.Empty;

        [JsonPropertyName("description")]
        public string Description { get; set; } = string.Empty;

        [JsonPropertyName("images")]
        public string[] Images { get; set; } = [];

        [JsonPropertyName("githubUrl")]
        public string? GithubUrl { get; set; } = null;

        [JsonPropertyName("isPrivate")]
        public bool IsPrivate { get; set; }

        [JsonPropertyName("technologies")]
        public string[] Technologies { get; set; } = [];

        [JsonPropertyName("narrative")]
        public ProjectNarrative Narrative { get; set; } = null!;
    }
}