namespace UnicornToys.Application.Dtos
{
    public class CreateProductDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int AgeRestriction { get; set; }
        public string Company { get; set; }
        public decimal Price { get; set; }
    }
}