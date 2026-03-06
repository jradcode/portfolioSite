using PortfolioSite.Api.Services;
using SkiaSharp;

public class ImageService : IImageService
{
    private readonly IWebHostEnvironment _environment;

    public ImageService(IWebHostEnvironment environment)
    {
        _environment = environment;
    }

    public async Task<string> ProcessAndSaveImageAsync(IFormFile file, string projectName)
    {
        // Create the Slug
        var slug = projectName.ToLower().Trim().Replace(" ", "-");
        slug = new string(slug.Where(c => char.IsLetterOrDigit(c) || c == '-').ToArray());

        // Define the path (with a safety check for ContentRootPath)
        // If WebRootPath is null, use ContentRootPath/wwwroot
        var rootPath = _environment.WebRootPath ?? Path.Combine(_environment.ContentRootPath, "wwwroot");
        var folderPath = Path.Combine(rootPath, "images", slug);

        if (!Directory.Exists(folderPath))
            Directory.CreateDirectory(folderPath);

        // File naming
        var fileName = $"{Guid.NewGuid()}.webp";
        var physicalPath = Path.Combine(folderPath, fileName);

        // SkiaSharp Processing
        using var stream = file.OpenReadStream();
        using (var codec = SKCodec.Create(stream))
        using (var bitmap = SKBitmap.Decode(codec))
        using (var image = SKImage.FromBitmap(bitmap))
        using (var data = image.Encode(SKEncodedImageFormat.Webp, 80))
        {
            await File.WriteAllBytesAsync(physicalPath, data.ToArray());
        }

        // Return the Web-friendly path for Neon DB
        return $"/images/{slug}/{fileName}";
    }

    public string SaveImage(string base64Data, string projectName)
    {
        // Clean the base64 string
        var base64Image = base64Data.Split(',')[1];
        var bytes = Convert.FromBase64String(base64Image);

        //Define the path
        var fileName = Guid.NewGuid().ToString() + ".webp"; // We like WebP!
        var folderPath = Path.Combine("wwwroot", "images", projectName.ToLower().Replace(" ", "-"));

        if (!Directory.Exists(folderPath)) Directory.CreateDirectory(folderPath);

        var fullPath = Path.Combine(folderPath, fileName);

        // Save to disk
        System.IO.File.WriteAllBytes(fullPath, bytes);

        // Return the path to save in NEON
        return $"/images/{projectName.ToLower().Replace(" ", "-")}/{fileName}";
    }
}