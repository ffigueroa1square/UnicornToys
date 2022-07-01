using MediatR;
using UnicornToys.Application.Dtos;
using UnicornToys.Domain.QueryMapper;

namespace UnicornToys.Application.Features.Products.Queries.GetProducts
{
    public class GetProductsQuery : IRequest<IEnumerable<ProductDto>>
    {
        public QueryOptions QueryOptions { get; set; }
    }
}
