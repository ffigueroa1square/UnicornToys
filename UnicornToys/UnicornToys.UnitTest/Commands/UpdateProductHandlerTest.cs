using AutoMapper;
using Moq;
using UnicornToys.Application.Dtos;
using UnicornToys.Application.Features.Products.Commands.UpdateProduct;
using UnicornToys.Application.Mappings;
using UnicornToys.Domain.Products;
using UnicornToys.Persistence;

namespace UnicornToys.UnitTest.Commands
{
    [TestFixture]
    public class UpdateProductHandlerTest
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
        public async Task UpdateProductHandler_Should_Return_True()
        {
            // Arrange
            var productResponse = new Product()
            {
                Id = 1,
                Name = "Product 1",
                Description = "Description 1",
                AgeRestriction = 10,
                Company = "Company test",
                Price = 100m,
                ImageName = String.Empty,
                ImageLocation = String.Empty
            };
            var updateProductCommand = new UpdateProductCommand()
            {
                UpdateProductDto = new ProductDto()
                {
                    Id = 1,
                    Name = "Product 1",
                    Description = "Description 1",
                    AgeRestriction = 10,
                    Company = "Company test",
                    Price = 100m,
                    ImageName = String.Empty,
                    ImageLocation = String.Empty
                },
                Id = 1
            };

            _unitOfWorkMock.Setup(x => x.GetRepository<Product>().FindById(It.IsAny<int>())).Returns(productResponse);
            _unitOfWorkMock.Setup(x => x.GetRepository<Product>().Update(It.IsAny<Product>()));
            var handler = new UpdateProductHandler(_unitOfWorkMock.Object, _mapper);

            var response = await handler.Handle(updateProductCommand, CancellationToken.None);

            // Assert
            Assert.IsNotNull(response);
            Assert.IsInstanceOf<bool>(response);
            Assert.IsTrue(response);
        }

        [TestCase]
        public async Task UpdateProductHandler_Should_Return_False_EntityNotFound()
        {
            // Arrange
            var updateProductCommand = new UpdateProductCommand()
            {
                UpdateProductDto = new ProductDto()
                {
                    Id = 1,
                    Name = "Product 1",
                    Description = "Description 1",
                    AgeRestriction = 10,
                    Company = "Company test",
                    Price = 100m,
                    ImageName = String.Empty,
                    ImageLocation = String.Empty
                },
                Id = 1
            };

            _unitOfWorkMock.Setup(x => x.GetRepository<Product>().FindById(It.IsAny<int>()));
            _unitOfWorkMock.Setup(x => x.GetRepository<Product>().Update(It.IsAny<Product>()));
            var handler = new UpdateProductHandler(_unitOfWorkMock.Object, _mapper);

            var response = await handler.Handle(updateProductCommand, CancellationToken.None);

            // Assert
            Assert.IsNotNull(response);
            Assert.IsInstanceOf<bool>(response);
            Assert.IsFalse(response);
        }

        [TestCase]
        public async Task UpdateProductHandler_Should_Return_False_BadRequest()
        {
            // Arrange
            var updateProductCommand = new UpdateProductCommand()
            {
                UpdateProductDto = new ProductDto()
                {
                    Id = 1,
                    Name = "",
                    Description = "",
                    AgeRestriction = 1000,
                    Company = "Company test",
                    Price = 0m,
                    ImageName = String.Empty,
                    ImageLocation = String.Empty
                },
                Id = 1
            };

            _unitOfWorkMock.Setup(x => x.GetRepository<Product>().Update(It.IsAny<Product>()));
            var handler = new UpdateProductHandler(_unitOfWorkMock.Object, _mapper);

            var response = await handler.Handle(updateProductCommand, CancellationToken.None);

            // Assert
            Assert.IsNotNull(response);
            Assert.IsInstanceOf<bool>(response);
            Assert.IsFalse(response);
        }
    }
}
