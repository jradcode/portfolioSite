namespace PortfolioSite.Api.Services
{
    public interface IImageService
    {
        // Returns the relative URL path to the saved image
        Task<string> ProcessAndSaveImageAsync(IFormFile file, string projectName);
        string SaveImage(string base64Data, string projectName);
    }
}
