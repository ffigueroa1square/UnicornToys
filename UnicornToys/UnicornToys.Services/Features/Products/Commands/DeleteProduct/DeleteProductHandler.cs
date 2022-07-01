using MediatR;
using UnicornToys.Domain.Repositories;

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
            var entity = _unitOfWork.ProductReadOnlyRepository.Get(request.Id);

            if (entity == null)
            {
                throw new Exceptions.ApplicationException(AppResource.ProductNotFound);
            }

            var isSucceed = await _unitOfWork.ProductCommandRepository.Delete(request.Id);

            if (!isSucceed) throw new Exceptions.ApplicationException(AppResource.ProductNotDeleted);

            return true;
        }
    }
}