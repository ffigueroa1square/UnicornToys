using UnicornToys.Domain.SeedWork;

namespace UnicornToys.Domain.Products
{
    public interface IProductCommandRepository : ICommandRepository<int, Product>
    {
    }
}
