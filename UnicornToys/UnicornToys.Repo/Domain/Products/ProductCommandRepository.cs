using UnicornToys.Domain.Products;
using UnicornToys.Persistence.Contexts;

namespace UnicornToys.Persistence.Domain.Products
{
    public class ProductCommandRepository : IProductCommandRepository
    {
        private readonly MyAppDbContext _context;

        public ProductCommandRepository(MyAppDbContext context)
        {
            _context = context;
        }

        public async Task<Product> Create(Product entity)
        {
            _context.Products?.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<bool> Delete(int id)
        {
            var entity = _context.Products?.FirstOrDefault(p => p.Id == id);
            if (entity != null)
            {
                _context.Products?.Remove(entity);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<bool> Update(int id, Product entity)
        {
            var isEntityExists = _context.Products?.FirstOrDefault(p => p.Id == id);
            if (isEntityExists != null)
            {
                _context.Products?.Update(entity);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}