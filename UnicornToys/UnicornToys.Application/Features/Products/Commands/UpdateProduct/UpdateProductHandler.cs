using AutoMapper;
using MediatR;
using UnicornToys.Domain.Products;
using UnicornToys.Persistence;

namespace UnicornToys.Application.Features.Products.Commands.UpdateProduct
{
    public class UpdateProductHandler : IRequestHandler<UpdateProductCommand, bool>
    {
        private IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UpdateProductHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<bool> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
        {
            var entity = _unitOfWork.GetRepository<Product>().FindById(request.Id);

            if (entity == null)
            {
                throw new Exceptions.ApplicationException(AppResource.ProductNotFound);
            }

            _mapper.Map(request, entity);
            _unitOfWork.GetRepository<Product>().Update(entity);
            _unitOfWork.Commit();
            return await Task.FromResult(true);
        }
    }
}