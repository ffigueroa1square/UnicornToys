using MediatR;
using UnicornToys.Domain.Products;
using UnicornToys.Persistence;

namespace UnicornToys.Application.Features.Products.Commands.DeleteProduct
{
    public class DeleteProductHandler : IRequestHandler<DeleteProductCommand, bool>
    {
        private IUnitOfWork _unitOfWork;

        public DeleteProductHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<bool> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
        {
            var validator = new DeleteProductValidator();
            var validationResult = await validator.ValidateAsync(request);

            if (validationResult.IsValid == true)
            {
                var entity = _unitOfWork.GetRepository<Product>().FindById(request.Id);

                if (entity == null)
                {
                    return await Task.FromResult(false);
                }

                _unitOfWork.GetRepository<Product>().Remove(entity);
                _unitOfWork.Commit();

                return await Task.FromResult(true);
            } else
            {
                return await Task.FromResult(false);
            }
        }
    }
}