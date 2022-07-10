using AutoMapper;
using Moq;
using UnicornToys.Application.Dtos;
using UnicornToys.Application.Features.Products.Queries.GetProducts;
using UnicornToys.Application.Mappings;
using UnicornToys.Domain.Products;
using UnicornToys.Persistence;

namespace UnicornToys.UnitTest.Queries
{
    [TestFixture]
    public class GetProductsHandlerTest
    {
        private Mock<IUnitOfWork> _unitOfWorkMock;
        private IMapper _mapper;

        [SetUp]
        public void Init()
        {
            _unitOfWorkMock = new Mock<IUnitOfWork>();
            var mapperConfig = new MapperConfiguration(c =>
            {
                c.AddProfile<ProductsMapping>();
            });

            _mapper = mapperConfig.CreateMapper();
        }

        [TestCase]
        public async Task GetProductsHandler_Should_Return_ListProductDto()
        {
            // Arrange
            var productResponse = new List<Product>()
            {
                new Product ()
                {
                    Id = 1,
                    Name = "Product 1",
                    Description = "Description 1",
                    AgeRestriction = 10,
                    Company = "Company test",
                    Price = 100,
                    ImageName = String.Empty,
                    ImageLocation = String.Empty
                },
                new Product ()
                {
                    Id = 2,
                    Name = "Product 2",
                    Description = "Description 2",
                    AgeRestriction = 20,
                    Company = "Company test",
                    Price = 200,
                    ImageName = String.Empty,
                    ImageLocation = String.Empty
                }
            };

            var iQueryable = productResponse.AsQueryable();

            var productListDto = new List<ProductDto>()
            {
                new ProductDto
                {
                    Id = 1,
                    Name = "Product 1",
                    Description = "Description 1",
                    AgeRestriction = 10,
                    Company = "Company test",
                    Price = 100,
                    ImageName = String.Empty,
                    ImageLocation = String.Empty
                },
                new ProductDto
                {
                    Id = 2,
                    Name = "Product 2",
                    Description = "Description 2",
                    AgeRestriction = 20,
                    Company = "Company test",
                    Price = 200,
                    ImageName = String.Empty,
                    ImageLocation = String.Empty
                }
            };

            _unitOfWorkMock.Setup(x => x.GetRepository<Product>().GetAllAsQueryable()).Returns(iQueryable);
            var handler = new GetProductsHandler(_unitOfWorkMock.Object, _mapper);

            //Act
            var response = await handler.Handle(new GetProductsQuery(), CancellationToken.None);

            // Assert
            Assert.IsNotNull(response);
            Assert.IsInstanceOf<List<ProductDto>>(response);
            Assert.That(response.Count, Is.EqualTo(productListDto.Count));
        }
    }
}