using Autofac;
using Autofac.Extensions.DependencyInjection;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using UnicornToys.Application.Features.Products;
using UnicornToys.Application.Mappings;
using UnicornToys.Persistence;
using UnicornToys.Persistence.Contexts;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<MyAppDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("AppConnection"));
});

//Register AutoMapper
builder.Services.AddAutoMapper(typeof(Program).Assembly, typeof(AutoMapperProfile).Assembly);

// Call UseServiceProviderFactory on the Host sub property
builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory());

builder.Host.ConfigureContainer<ContainerBuilder>(containerBuilder =>
{
    containerBuilder.RegisterGeneric(typeof(Repository<>))
        .As(typeof(IRepository<>))
        .InstancePerRequest();

    containerBuilder.RegisterType<UnitOfWork>().As<IUnitOfWork>().InstancePerLifetimeScope();

    containerBuilder.RegisterAssemblyTypes(typeof(IMediator).GetTypeInfo().Assembly)
        .AsImplementedInterfaces();

    containerBuilder.RegisterModule<ProductModule>();

    containerBuilder.Register<ServiceFactory>(ctx =>
    {
        var c = ctx.Resolve<IComponentContext>();
        return t => c.Resolve(t);
    });
});

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();