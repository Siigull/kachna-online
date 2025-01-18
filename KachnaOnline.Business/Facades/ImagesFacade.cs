using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using KachnaOnline.Business.Constants;
using KachnaOnline.Dto.Images;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;

namespace KachnaOnline.Business.Facades
{
    public class ImagesFacade
    {
        private readonly IHostEnvironment _environment;

        public ImagesFacade(IHostEnvironment environment)
        {
            _environment = environment;

            var dir = Path.Combine(_environment.ContentRootPath, ImageConstants.ImageDirectory);
            if (!Directory.Exists(dir))
                Directory.CreateDirectory(dir);
        }

        public string GetImageBasePath(string md5Hash)
            => Path.Combine(_environment.ContentRootPath, ImageConstants.ImageDirectory, md5Hash);

        public (string, string) GetImageActualPath(string md5Hash)
        {
            md5Hash = md5Hash.ToLowerInvariant();
            var imagePath = this.GetImageBasePath(md5Hash);

            var actualImagePath = imagePath + ".png";
            if (File.Exists(actualImagePath))
                return (actualImagePath, "image/png");

            actualImagePath = imagePath + ".jpg";
            if (File.Exists(actualImagePath))
                return (actualImagePath, "image/jpeg");

            return (null, null);
        }

        public async Task<ImageDto> UploadImage(IFormFile file)
        {
            using var md5 = MD5.Create();
            md5.Initialize();

            var tempName = this.GetImageBasePath($"{DateTime.Now.Ticks}-{this.GetHashCode()}");
            var stream = new FileStream(tempName, FileMode.CreateNew);
            await file.CopyToAsync(stream);

            stream.Seek(0, SeekOrigin.Begin);
            var hashBytes = await md5.ComputeHashAsync(stream);

            var sb = new StringBuilder();
            foreach (var t in hashBytes)
            {
                sb.Append(t.ToString("x2"));
            }

            var hash = sb.ToString();
            var dto = new ImageDto()
            {
                Hash = hash,
                Url = $"{ImageConstants.ImageUrlPath}/{hash}",
                Exists = false
            };

            var newFileName = this.GetImageBasePath(hash)
                + (file.ContentType == "image/png"
                    ? ".png"
                    : ".jpg");

            if (File.Exists(newFileName))
            {
                await stream.DisposeAsync();
                File.Delete(tempName);
                dto.Exists = true;
                return dto;
            }

            await stream.FlushAsync();
            await stream.DisposeAsync();
            File.Move(tempName, newFileName);

            return dto;
        }
    }
}
