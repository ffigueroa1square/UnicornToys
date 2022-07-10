using UnicornToys.Domain.SeedWork;

namespace UnicornToys.Domain.Products
{
    public class Product : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int AgeRestriction { get; set; }
        public string Company { get; set; }
        public decimal Price { get; set; }
        public string ImageName { get; set; }
        public string ImageLocation { get; set; }
    }
}