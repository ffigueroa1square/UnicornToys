using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.PlatformAbstractions;
using UnicornToys.API;
using UnicornToys.Persistence.Contexts;

namespace UnicornToys.IntegrationTest
{
    public class ApiWebApplication : WebApplicationFactory<Api>
    {
        public const string TestConnectionString = "Server=localhost\\SQLEXPRESS;Database=UnicornToys_TestDb;TrustServerCertificate=True;Trusted_Connection=True;MultipleActiveResultSets=true";

        protected override IHost CreateHost(IHostBuilder builder)
        {
            builder.ConfigureServices(services =>
            {
                services.AddScoped(sp =>
                {
                    // LocalDB usage for integration test
                    return new DbContextOptionsBuilder<MyAppDbContext>()
                    .UseSqlServer(TestConnectionString)
                    .UseApplicationServiceProvider(sp)
                    .Options;
                });
            });

            var path = PlatformServices.Default.Application.ApplicationBasePath;
            var setDir = Path.GetFullPath(Path.Combine(path, Path.Combine(Directory.GetCurrentDirectory(), @"Resources")));

            builder.UseContentRoot(setDir);

            return base.CreateHost(builder);
        }
    }
}