using Microsoft.EntityFrameworkCore;
using UnicornToys.Domain.Products;

namespace UnicornToys.Persistence.Contexts
{
    public class MyAppDbContext : DbContext
    {
        public MyAppDbContext(DbContextOptions<MyAppDbContext> options) : base(options)
        {
        }

        public DbSet<Product> Products => Set<Product>();
    }
}