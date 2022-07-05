using AutoMapper;
using MediatR;
using UnicornToys.Domain.Products;
using UnicornToys.Persistence;

namespace UnicornToys.Application.Features.Products.Commands.CreateProduct
{
    public class CreateProductHandler : IRequestHandler<CreateProductCommand, bool>
    {
        private IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CreateProductHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<bool> Handle(CreateProductCommand request, CancellationToken cancellationToken)
        {            
            var validator = new CreateProductValidator();
            var validationResult = await validator.ValidateAsync(request);

            if (validationResult.IsValid == true)
            {
                var entity = _mapper.Map(request.CreateProductDto, new Product());

                _unitOfWork.GetRepository<Product>().Add(entity);
                _unitOfWork.Commit();
                return await Task.FromResult(true);
            } else
            {
                return await Task.FromResult(false);
            }
        }
    }
}