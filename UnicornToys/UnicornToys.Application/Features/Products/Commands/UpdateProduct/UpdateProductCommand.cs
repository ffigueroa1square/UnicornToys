using MediatR;
using UnicornToys.Application.Dtos;

namespace UnicornToys.Application.Features.Products.Commands.UpdateProduct
{
    public class UpdateProductCommand : IRequest<bool>
    {
        public ProductDto UpdateProductDto { get; set; }

        public int Id { get; set; }
    }
}