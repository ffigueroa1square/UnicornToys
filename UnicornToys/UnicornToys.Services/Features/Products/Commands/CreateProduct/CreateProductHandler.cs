using AutoMapper;
using MediatR;
using UnicornToys.Domain.Products;
using UnicornToys.Domain.Repositories;

namespace UnicornToys.Application.Features.Products.Commands.CreateProduct
{
    public class CreateProductHandler : IRequestHandler<CreateProductCommand, Product>
    {
        private IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CreateProductHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<Product> Handle(CreateProductCommand request, CancellationToken cancellationToken)
        {
            var entity = _mapper.Map(request, new Product());

            await _unitOfWork.ProductCommandRepository.Create(entity);
            return entity;
        }
    }
}