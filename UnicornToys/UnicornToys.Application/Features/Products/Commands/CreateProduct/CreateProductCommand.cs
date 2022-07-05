﻿using MediatR;
using UnicornToys.Application.Dtos;
using UnicornToys.Domain.Products;

namespace UnicornToys.Application.Features.Products.Commands.CreateProduct
{
    public class CreateProductCommand : IRequest<bool>
    {
        public CreateProductDto CreateProductDto { get; set; }
    }
}