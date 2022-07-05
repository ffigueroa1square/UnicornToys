using UnicornToys.Domain.Products;

namespace UnicornToys.Persistence.Contexts
{
    public class MyAppDbContextSeed
    {
        public static async Task SeedDataAsync(MyAppDbContext context)
        {
            if (!context.Products.Any())
            {
                context.Products.AddRange(new List<Product>
                {
                    new Product
                    {
                        Name = "Product unittest 1",
                        Description = "Description unitest 1",
                        AgeRestriction = 10,
                        Company = "Hasbro",
                        Price = 100
                    },
                    new Product
                    {
                        Name = "Product unittest 2",
                        Description = "Description unitest 3",
                        AgeRestriction = 20,
                        Company = "Mattel",
                        Price = 200
                    }
                });

                await context.SaveChangesAsync();
            }
        }
    }
}