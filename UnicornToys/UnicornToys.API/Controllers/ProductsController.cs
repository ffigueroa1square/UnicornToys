using MediatR;
using Microsoft.AspNetCore.Mvc;
using UnicornToys.Application.Dtos;
using UnicornToys.Application.Features.Products.Commands.CreateProduct;
using UnicornToys.Application.Features.Products.Commands.DeleteProduct;
using UnicornToys.Application.Features.Products.Commands.UpdateProduct;
using UnicornToys.Application.Features.Products.Queries.GetProduct;
using UnicornToys.Application.Features.Products.Queries.GetProducts;

namespace UnicornToys.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ProductsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var results = await _mediator.Send(new GetProductsQuery());

            return Ok(results);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var result = await _mediator.Send(new GetProductQuery
            {
                Id = id
            });

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromBody] CreateProductDto createProductDto)
        {
            var result = await _mediator.Send(new CreateProductCommand
            {
                CreateProductDto = createProductDto
            });

            return Ok(result);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] ProductDto updatePostDto)
        {
            var result = await _mediator.Send(new UpdateProductCommand
            {
                UpdateProductDto = updatePostDto,
                Id = id
            });

            return Ok(result);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var result = await _mediator.Send(new DeleteProductCommand
            {
                Id = id
            });

            return Ok(result);
        }
    }
}