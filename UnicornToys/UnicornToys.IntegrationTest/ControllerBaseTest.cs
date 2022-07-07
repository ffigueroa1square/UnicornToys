using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Respawn;
using UnicornToys.Persistence.Contexts;

namespace UnicornToys.IntegrationTest
{
    public class ControllerBaseTest
    {
        protected ApiWebApplication Application;

        [OneTimeSetUp]
        public void RunBeforeAnyTests()
        {
            Application = new ApiWebApplication();

            using var scope = Application.Services.CreateScope();

            EnsureDatabase(scope);
        }

        [OneTimeTearDown]
        public void RunAfterAnyTests()
        {
            Application.Dispose();
        }

        [SetUp]
        public async Task Setup()
        {
            await ResetState();
        }

        [TearDown]
        public async Task Down()
        {
            await ResetState();
        }

        protected async Task<TEntity> AddAsync<TEntity>(TEntity entity) where TEntity : class
        {
            using var scope = Application.Services.CreateScope();

            var context = scope.ServiceProvider.GetService<MyAppDbContext>();

            context.Add(entity);

            await context.SaveChangesAsync();

            return entity;
        }

        protected async Task<TEntity> FindAsync<TEntity>(params object[] keyValues) where TEntity : class
        {
            using var scope = Application.Services.CreateScope();

            var context = scope.ServiceProvider.GetService<MyAppDbContext>();

            return await context.FindAsync<TEntity>(keyValues);
        }

        private static void EnsureDatabase(IServiceScope scope)
        {
            var context = scope.ServiceProvider.GetService<MyAppDbContext>();

            context.Database.Migrate();
        }

        private static async Task ResetState()
        {
            var checkpoint = new Checkpoint
            {
                TablesToIgnore = new Respawn.Graph.Table[] { "__EFMigrationsHistory" }
            };

            await checkpoint.Reset(ApiWebApplication.TestConnectionString);
        }
    }
}