using AutoMapper;
using Moq;
using UnicornToys.Application.Dtos;
using UnicornToys.Application.Features.Products.Commands.CreateProduct;
using UnicornToys.Application.Mappings;
using UnicornToys.Domain.Products;
using UnicornToys.Persistence;

namespace UnicornToys.UnitTest.Commands
{
    [TestFixture]
    public class CreateProductHandlerTest
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
        public async Task CreateProductHandler_Should_Return_True()
        {
            // Arrange
            var createProductCommand = new CreateProductCommand()
            {
                CreateProductDto = new CreateProductDto()
                {
                    Name = "Product 1",
                    Description = "Description 1",
                    AgeRestriction = 10,
                    Company = "Company test",
                    Price = 100m,
                    ImageName = String.Empty,
                    ImageLocation = String.Empty
                }
            };
            _unitOfWorkMock.Setup(x => x.GetRepository<Product>().Add(It.IsAny<Product>()));
            var handler = new CreateProductHandler(_unitOfWorkMock.Object, _mapper);

            // Act
            var response = await handler.Handle(createProductCommand, CancellationToken.None);

            // Assert
            Assert.IsNotNull(response);
            Assert.IsInstanceOf<bool>(response);
            Assert.IsTrue(response);
        }

        [TestCase]
        public async Task CreateProductHandler_Should_Return_False()
        {
            // Arrange
            var createProductCommand = new CreateProductCommand()
            {
                CreateProductDto = new CreateProductDto()
                {
                    Name = "",
                    Description = "Description 1",
                    AgeRestriction = 1000,
                    Company = "Company test",
                    Price = 0m,
                    ImageName = String.Empty,
                    ImageLocation = String.Empty
                }
            };
            _unitOfWorkMock.Setup(x => x.GetRepository<Product>().Add(It.IsAny<Product>()));
            var handler = new CreateProductHandler(_unitOfWorkMock.Object, _mapper);

            // Act
            var response = await handler.Handle(createProductCommand, CancellationToken.None);

            // Assert
            Assert.IsNotNull(response);
            Assert.IsInstanceOf<bool>(response);
            Assert.IsFalse(response);
        }
    }
}