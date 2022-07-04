using MediatR;
using UnicornToys.Application.Dtos;

namespace UnicornToys.Application.Features.Products.Queries.GetProducts
{
    public class GetProductsQuery : IRequest<List<ProductDto>>
    {        
    }
}
