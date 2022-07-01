using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnicornToys.Domain.Products;

namespace UnicornToys.Domain.Repositories
{
    public interface IUnitOfWork
    {
        IProductCommandRepository ProductCommandRepository { get; }
        IProductReadOnlyRepository ProductReadOnlyRepository { get; }
    }
}
