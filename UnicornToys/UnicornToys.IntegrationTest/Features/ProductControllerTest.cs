using Newtonsoft.Json;
using System.Net;
using System.Text;
using UnicornToys.API;
using UnicornToys.Application.Dtos;
using UnicornToys.Domain.Products;

namespace UnicornToys.IntegrationTest.Features
{
    [TestFixture]
    public class ProductControllerTest : ControllerBaseTest
    {
        [Test]
        public async Task GetAllProducts_Returns_OKResponse_When_Database_Empty()
        {
            // Arrange
            var client = Application.CreateClient();

            // Act
            var response = await client.GetAsync(ApiRoutes.Products.GetProducts);

            // Assert
            var result = await response.Content.ReadAsAsync<List<ProductDto>>();

            Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.OK));
            Assert.That(result.Count, Is.EqualTo(0));
        }

        [Test]
        public async Task GetAllProducts_Returns_OKResponse_When_Database_NotEmpty()
        {
            // Arrange
            var client = Application.CreateClient();
            await AddAsync(new Product()
            {
                Id = 0,
                Name = "Integration Test Product 1",
                Description = "Description Integration Test 1",
                AgeRestriction = 10,
                Company = "Test Company",
                Price = 100m
            });
            await AddAsync(new Product()
            {
                Id = 0,
                Name = "Integration Test Product 2",
                Description = "Description Integration Test 2",
                AgeRestriction = 10,
                Company = "Test Company",
                Price = 100m
            });

            // Act
            var response = await client.GetAsync(ApiRoutes.Products.GetProducts);

            // Assert
            var result = await response.Content.ReadAsAsync<List<ProductDto>>();

            Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.OK));
            Assert.That(result.Count, Is.EqualTo(2));
        }

        [Test]
        public async Task GetProduct_Returns_NoContentResponse_When_Database_Empty()
        {
            // Arrange
            var client = Application.CreateClient();
            var productId = 1;

            // Act
            var response = await client.GetAsync(ApiRoutes.Products.GetProduct.Replace("{id}", productId.ToString()));

            // Assert
            var result = await response.Content.ReadAsAsync<bool>();

            Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.NoContent));
            Assert.That(result, Is.EqualTo(false));
        }

        [Test]
        public async Task GetProduct_Returns_OkResponse_When_Database_NoEmpty()
        {
            // Arrange
            var client = Application.CreateClient();
            var productCreated = await AddAsync(new Product()
            {
                Id = 0,
                Name = "Integration Test Product 1",
                Description = "Description Integration Test 1",
                AgeRestriction = 10,
                Company = "Test Company",
                Price = 100m
            });            

            // Act
            var response = await client.GetAsync(ApiRoutes.Products.GetProduct.Replace("{id}", productCreated.Id.ToString()));

            // Assert
            var result = await response.Content.ReadAsAsync<ProductDto>();

            Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.OK));
            Assert.That(result.Id, Is.EqualTo(productCreated.Id));
            Assert.That(result.Name, Is.EqualTo(productCreated.Name));
            Assert.That(result.Description, Is.EqualTo(productCreated.Description));
        }

        [Test]
        public async Task CreateProduct_Returns_UnporcessableEntityResponse_When_ValidatorsNoPass()
        {
            // Arrange
            var client = Application.CreateClient();
            var productDto = new ProductDto();

            // Act
            var response = await client.PostAsync(ApiRoutes.Products.CreateProduct, new StringContent(JsonConvert.SerializeObject(productDto), Encoding.UTF8, "application/json"));

            // Assert            
            Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.UnprocessableEntity));
            Assert.That(response.IsSuccessStatusCode, Is.EqualTo(false));
        }

        [Test]
        public async Task CreateProduct_Returns_OKResponse()
        {
            // Arrange
            var client = Application.CreateClient();
            var productDto = new ProductDto()
            {
                Name = "Integration Test Product 1",
                Description = "Description Integration Test 1",
                AgeRestriction = 10,
                Company = "Test Company",
                Price = 100m
            };

            // Act
            var response = await client.PostAsync(ApiRoutes.Products.CreateProduct, new StringContent(JsonConvert.SerializeObject(productDto), Encoding.UTF8, "application/json"));

            // Assert            
            var result = await response.Content.ReadAsAsync<bool>();

            Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.OK));
            Assert.That(response.IsSuccessStatusCode, Is.EqualTo(true));
            Assert.That(result, Is.EqualTo(true));
        }
    }
}