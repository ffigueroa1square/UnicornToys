using AutoMapper;
using UnicornToys.Application.Dtos;
using UnicornToys.Domain.Products;

namespace UnicornToys.Application.Mappings
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<CreateProductDto, Product>();
            CreateMap<ProductDto, Product>();
        }
    }
}