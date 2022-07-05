using AutoMapper;
using Moq;
using UnicornToys.Application.Dtos;
using UnicornToys.Application.Features.Products.Queries.GetProduct;
using UnicornToys.Application.Mappings;
using UnicornToys.Domain.Products;
using UnicornToys.Persistence;

namespace UnicornToys.UnitTest.Queries
{
    [TestFixture]
    public class GetProductHandlerTest
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
        public async Task GetProductHandler_Should_Return_ProductDto()
        {
            // Arrange
            var getProductQuery = new GetProductQuery { Id = 1 };
            var productResponse = new Product()
            {
                Id = 1,
                Name = "Product 1",
                Description = "Description 1",
                AgeRestriction = 10,
                Company = "Company test",
                Price = 100
            };
            var productDto = new ProductDto()
            {
                Id = 1,
                Name = "Product 1",
                Description = "Description 1",
                AgeRestriction = 10,
                Company = "Company test",
                Price = 100
            };
            _unitOfWorkMock.Setup(x => x.GetRepository<Product>().FindById(getProductQuery.Id)).Returns(productResponse);
            var handler = new GetProductHandler(_unitOfWorkMock.Object, _mapper);

            // Act
            var response = await handler.Handle(getProductQuery, CancellationToken.None);

            // Assert
            Assert.IsNotNull(response);
            Assert.IsInstanceOf<ProductDto>(response);
            Assert.That(response.Id, Is.EqualTo(1));
        }
    }
}