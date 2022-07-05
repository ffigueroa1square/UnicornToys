using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Linq.Expressions;
using UnicornToys.Persistence.Contexts;

namespace UnicornToys.UnitTest
{
    public class TestBase
    {
        protected ApiWebApplicationFactory Application;

        /// <summary>
        /// Al terminar cada prueba, se resetea la base de datos
        /// </summary>
        /// <returns></returns>
        [TearDown]
        public async Task Down()
        {
            await ResetState();
        }

        /// <summary>
        /// Libera recursos al terminar todas las pruebas
        /// </summary>
        [OneTimeTearDown]
        public void RunAfterAnyTests()
        {
            Application.Dispose();
        }

        /// <summary>
        /// Inicializa la API y la BD antes de iniciar las pruebas
        /// </summary>
        [OneTimeSetUp]
        public void RunBeforeAnyTests()
        {
            Application = new ApiWebApplicationFactory();

            EnsureDatabase();
        }

        /// <summary>
        /// Shortcut para ejecutar IRequests con el Mediador
        /// </summary>
        public async Task<TResponse> SendAsync<TResponse>(IRequest<TResponse> request)
        {
            using var scope = Application.Services.CreateScope();

            var mediator = scope.ServiceProvider.GetRequiredService<ISender>();

            return await mediator.Send(request);
        }

        /// <summary>
        /// Shortcut para agregar Entities a la BD
        /// </summary>
        protected async Task<TEntity> AddAsync<TEntity>(TEntity entity) where TEntity : class
        {
            using var scope = Application.Services.CreateScope();

            var context = scope.ServiceProvider.GetService<MyAppDbContext>();

            context.Add(entity);

            await context.SaveChangesAsync();

            return entity;
        }

        /// <summary>
        /// Shortcut para buscar entities por primary key
        /// </summary>
        protected async Task<TEntity> FindAsync<TEntity>(params object[] keyValues) where TEntity : class
        {
            using var scope = Application.Services.CreateScope();

            var context = scope.ServiceProvider.GetService<MyAppDbContext>();

            return await context.FindAsync<TEntity>(keyValues);
        }

        /// <summary>
        /// Shortcut para buscar entities según un criterio
        /// </summary>
        protected async Task<TEntity> FindAsync<TEntity>(Expression<Func<TEntity, bool>> predicate) where TEntity : class
        {
            using var scope = Application.Services.CreateScope();

            var context = scope.ServiceProvider.GetService<MyAppDbContext>();

            return await context.Set<TEntity>().FirstOrDefaultAsync(predicate);
        }

        /// <summary>
        /// Se asegura de crear la BD
        /// </summary>
        private void EnsureDatabase()
        {
            using var scope = Application.Services.CreateScope();
            var context = scope.ServiceProvider.GetService<MyAppDbContext>();

            context.Database.EnsureCreated();
        }

        /// <summary>
        /// Se asegura de limpiar la BD
        /// </summary>
        /// <returns></returns>
        private async Task ResetState()
        {
            using var scope = Application.Services.CreateScope();
            var context = scope.ServiceProvider.GetService<MyAppDbContext>();

            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();

            await MyAppDbContextSeed.SeedDataAsync(context);
        }
    }
}