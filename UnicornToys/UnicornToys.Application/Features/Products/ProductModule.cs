using Autofac;
using FluentValidation;
using MediatR;
using UnicornToys.Application.Dtos;
using UnicornToys.Application.Features.Products.Commands.CreateProduct;
using UnicornToys.Application.Features.Products.Commands.DeleteProduct;
using UnicornToys.Application.Features.Products.Commands.UpdateProduct;
using UnicornToys.Application.Features.Products.Queries.GetProduct;
using UnicornToys.Application.Features.Products.Queries.GetProducts;
using UnicornToys.Domain.Products;

namespace UnicornToys.Application.Features.Products
{
    public class ProductModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<GetProductQuery>().As<IRequest<ProductDto>>().AsImplementedInterfaces();
            builder.RegisterType<GetProductsQuery>().As<IRequest<IEnumerable<ProductDto>>>().AsImplementedInterfaces();
            builder.RegisterType<CreateProductCommand>().As<IRequest<Product>>().AsImplementedInterfaces();
            builder.RegisterType<DeleteProductCommand>().As<IRequest<bool>>().AsImplementedInterfaces();
            builder.RegisterType<UpdateProductCommand>().As<IRequest<bool>>().AsImplementedInterfaces();
            builder.RegisterType<GetProductHandler>().As<IRequestHandler<GetProductQuery, ProductDto>>().AsImplementedInterfaces();
            builder.RegisterType<GetProductsHandler>().As<IRequestHandler<GetProductsQuery, List<ProductDto>>>().AsImplementedInterfaces();
            builder.RegisterType<CreateProductHandler>().As<IRequestHandler<CreateProductCommand, Product>>().AsImplementedInterfaces();
            builder.RegisterType<DeleteProductHandler>().As<IRequestHandler<DeleteProductCommand, bool>>().AsImplementedInterfaces();
            builder.RegisterType<UpdateProductHandler>().As<IRequestHandler<UpdateProductCommand, bool>>().AsImplementedInterfaces();
            builder.RegisterType<CreateProductValidator>().As<AbstractValidator<CreateProductCommand>>().AsImplementedInterfaces();
            builder.RegisterType<DeleteProductValidator>().As<AbstractValidator<DeleteProductCommand>>().AsImplementedInterfaces();
            builder.RegisterType<UpdateProductValidator>().As<AbstractValidator<UpdateProductCommand>>().AsImplementedInterfaces();
        }
    }
}