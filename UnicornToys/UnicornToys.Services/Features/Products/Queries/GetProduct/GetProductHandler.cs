using AutoMapper;
using MediatR;
using UnicornToys.Application.Dtos;
using UnicornToys.Domain.Repositories;

namespace UnicornToys.Application.Features.Products.Queries.GetProduct
{
    public class GetProductHandler : IRequestHandler<GetProductQuery, ProductDto>
    {
        private IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetProductHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<ProductDto> Handle(GetProductQuery request, CancellationToken cancellationToken)
        {
            var entity = await _unitOfWork.ProductReadOnlyRepository.Get(request.Id);

            return _mapper.Map<ProductDto>(entity);
        }
    }
}