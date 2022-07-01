using AutoMapper;
using MediatR;
using UnicornToys.Domain.Repositories;

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
            var entity = await _unitOfWork.ProductReadOnlyRepository.Get(request.Id);

            if (entity == null)
            {
                throw new Exceptions.ApplicationException(AppResource.ProductNotFound);
            }

            _mapper.Map(request, entity);
            return await _unitOfWork.ProductCommandRepository.Update(request.Id, entity);
        }
    }
}