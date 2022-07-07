namespace UnicornToys.API
{
    public static class ApiRoutes
    {
        private static readonly string _baseUrl = "https://localhost:7218/api/";

        public static class Products
        {
            private static readonly string _productsControllerUrl = string.Concat(_baseUrl, "products");

            public static readonly string GetProducts = _productsControllerUrl;

            public static readonly string CreateProduct = _productsControllerUrl;

            public static readonly string GetProduct = string.Concat(_productsControllerUrl, "/{id}");

            public static readonly string UpdateProduct = string.Concat(_productsControllerUrl, "/{id}");

            public static readonly string DeleteProduct = string.Concat(_productsControllerUrl, "/{id}");
        }
    }
}
