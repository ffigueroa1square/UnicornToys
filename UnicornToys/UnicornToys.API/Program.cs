using Microsoft.EntityFrameworkCore;
using UnicornToys.Application.Mappings;
using UnicornToys.Persistence.Contexts;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<MyAppDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("AppConnection"));
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Automapper config
builder.Services.AddAutoMapper(typeof(ProductsMapping));

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