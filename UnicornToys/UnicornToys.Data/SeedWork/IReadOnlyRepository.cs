using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnicornToys.Domain.QueryMapper;

namespace UnicornToys.Domain.SeedWork
{
    public interface IReadOnlyRepository<T, TEntity>
    {
        Task<IEnumerable<TEntity>> GetMultiple(QueryOptions options);
        Task<TEntity> Get(T id);
    }
}
