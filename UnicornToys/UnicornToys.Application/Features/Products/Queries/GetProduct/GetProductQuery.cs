using MediatR;
using UnicornToys.Application.Dtos;

namespace UnicornToys.Application.Features.Products.Queries.GetProduct
{
    public class GetProductQuery : IRequest<ProductDto>
    {
        public int Id { get; set; }
    }
}