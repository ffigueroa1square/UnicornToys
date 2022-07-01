﻿using UnicornToys.Domain.SeedWork;

namespace UnicornToys.Domain.Products
{
    public interface IProductReadOnlyRepository : IReadOnlyRepository<int, Product>
    {
    }
}