﻿using AutoMapper;
using MediatR;
using UnicornToys.Domain.Products;
using UnicornToys.Persistence;

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

            _unitOfWork.GetRepository<Product>().Add(entity);
            _unitOfWork.Commit();
            return await Task.FromResult(entity);
        }
    }
}