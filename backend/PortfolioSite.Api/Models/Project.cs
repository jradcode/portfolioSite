namespace PortfolioSite.Api.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string[] Images { get; set; } = [];
        public string GithubUrl { get; set; } = string.Empty;
        public string[] Technologies { get; set; } = [];

        // Here is the connection! 
        // We tell C# that the "Narrative" property uses the class we defined above.
        public ProjectNarrative Narrative { get; set; } = new ProjectNarrative();
    }
}
