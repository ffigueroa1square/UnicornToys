using Microsoft.EntityFrameworkCore;
using System.Reflection;
using UnicornToys.Domain.Products;

namespace UnicornToys.Persistence.Contexts
{
    public class MyAppDbContext : DbContext
    {
        public MyAppDbContext(DbContextOptions<MyAppDbContext> options) : base(options)
        {
        }

        public DbSet<Product> Products => Set<Product>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var implementedConfigTypes = Assembly.GetExecutingAssembly()
                                        .GetTypes()
                                        .Where(type => !type.IsAbstract
                                        && !type.IsGenericTypeDefinition
                                        && type.GetTypeInfo().ImplementedInterfaces
                                        .Any(implementedInterfaces => implementedInterfaces.GetTypeInfo().IsGenericType
                                        && implementedInterfaces.GetGenericTypeDefinition() == typeof(IEntityTypeConfiguration<>)));

            foreach (var configInfo in implementedConfigTypes)
            {
                dynamic mapInstance = Activator.CreateInstance(configInfo);
                modelBuilder.ApplyConfiguration(mapInstance);
            }
        }
    }
}