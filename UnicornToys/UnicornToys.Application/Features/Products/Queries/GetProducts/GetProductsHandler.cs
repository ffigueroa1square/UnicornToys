using AutoMapper;
using MediatR;
using UnicornToys.Application.Dtos;
using UnicornToys.Domain.Products;
using UnicornToys.Persistence;

namespace UnicornToys.Application.Features.Products.Queries.GetProducts
{
    public class GetProductsHandler : IRequestHandler<GetProductsQuery, List<ProductDto>>
    {
        private IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetProductsHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<List<ProductDto>> Handle(GetProductsQuery request, CancellationToken cancellationToken)
        {
            var entities = _unitOfWork.GetRepository<Product>().GetAllAsQueryable().ToList();

            return await Task.FromResult(_mapper.Map<List<ProductDto>>(entities));
        }
    }
}