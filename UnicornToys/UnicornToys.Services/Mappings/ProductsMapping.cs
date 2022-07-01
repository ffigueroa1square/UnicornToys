using AutoMapper;
using UnicornToys.Application.Dtos;
using UnicornToys.Domain.Products;

namespace UnicornToys.Application.Mappings
{
    public sealed class ProductsMapping : Profile
    {
        public ProductsMapping()
        {
            CreateMap<CreateProductDto, Product>()
                .ForMember(x => x.Id, e => e.Ignore())
                .ReverseMap();

            CreateMap<ProductDto, Product>()
                .ReverseMap();
        }
    }
}