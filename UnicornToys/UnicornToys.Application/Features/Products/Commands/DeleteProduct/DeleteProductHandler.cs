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
            var entity = _unitOfWork.GetRepository<Product>().FindById(request.Id);

            if (entity == null)
            {
                throw new Exceptions.ApplicationException(AppResource.ProductNotFound);
            }

            _unitOfWork.GetRepository<Product>().Remove(entity);
            _unitOfWork.Commit();
            //if (!isSucceed) throw new Exceptions.ApplicationException(AppResource.ProductNotDeleted);

            return await Task.FromResult(true);
        }
    }
}