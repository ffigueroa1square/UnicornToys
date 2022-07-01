using AutoMapper;
using UnicornToys.Application.Dtos;
using UnicornToys.Domain.Repositories;

namespace UnicornToys.Application.Features.Products.Queries.GetProducts
{
    public class GetProductsHandler
    {
        private IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetProductsHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ProductDto>> Handle(GetProductsQuery request, CancellationToken cancellationToken)
        {
            var entities = await _unitOfWork.ProductReadOnlyRepository.GetMultiple(request.QueryOptions);

            return _mapper.Map<IEnumerable<ProductDto>>(entities);
        }
    }
}