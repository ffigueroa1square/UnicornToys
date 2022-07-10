using Moq;
using UnicornToys.Application.Features.Products.Commands.DeleteProduct;
using UnicornToys.Domain.Products;
using UnicornToys.Persistence;

namespace UnicornToys.UnitTest.Commands
{
    [TestFixture]
    public class DeleteProductHandlerTest
    {
        private Mock<IUnitOfWork> _unitOfWorkMock;

        [SetUp]
        public void Init()
        {
            _unitOfWorkMock = new Mock<IUnitOfWork>();
        }

        [TestCase]
        public async Task DeleteProductHandler_Should_Return_True()
        {
            // Arrange
            var deleteProductCommand = new DeleteProductCommand()
            {
                Id = 1,
            };
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
            _unitOfWorkMock.Setup(x => x.GetRepository<Product>().FindById(It.IsAny<int>())).Returns(productResponse);
            _unitOfWorkMock.Setup(x => x.GetRepository<Product>().Remove(It.IsAny<Product>()));
            var handler = new DeleteProductHandler(_unitOfWorkMock.Object);

            // Act
            var response = await handler.Handle(deleteProductCommand, CancellationToken.None);

            // Assert
            Assert.IsNotNull(response);
            Assert.IsInstanceOf<bool>(response);
            Assert.IsTrue(response);
        }

        [TestCase]
        public async Task DeleteProductHandler_Should_Return_False_EntityNotFound()
        {
            // Arrange
            var deleteProductCommand = new DeleteProductCommand()
            {
                Id = 1,
            };
            _unitOfWorkMock.Setup(x => x.GetRepository<Product>().FindById(It.IsAny<int>()));
            _unitOfWorkMock.Setup(x => x.GetRepository<Product>().Remove(It.IsAny<Product>()));
            var handler = new DeleteProductHandler(_unitOfWorkMock.Object);

            // Act
            var response = await handler.Handle(deleteProductCommand, CancellationToken.None);

            // Assert
            Assert.IsNotNull(response);
            Assert.IsInstanceOf<bool>(response);
            Assert.IsFalse(response);
        }

        [TestCase]
        public async Task DeleteProductHandler_Should_Return_False_BadRequest()
        {
            // Arrange
            var deleteProductCommand = new DeleteProductCommand()
            {
                Id = 1,
            };
            _unitOfWorkMock.Setup(x => x.GetRepository<Product>().Remove(It.IsAny<Product>()));
            var handler = new DeleteProductHandler(_unitOfWorkMock.Object);

            // Act
            var response = await handler.Handle(deleteProductCommand, CancellationToken.None);

            // Assert
            Assert.IsNotNull(response);
            Assert.IsInstanceOf<bool>(response);
            Assert.IsFalse(response);
        }
    }
}