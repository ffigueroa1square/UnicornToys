using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;

namespace UnicornToys.Persistence
{
    public interface IRepository<T> where T : class
    {
        void Add(T entity);
        void AddRange(ICollection<T> entities);
        void Update(T entity);
        void Remove(T entity);
        void RemoveRange(ICollection<T> entities);
        IQueryable<T> Find(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includeProperties);
        T FindById(params object[] keyValues);
        IQueryable<T> GetAllAsQueryable(Func<IQueryable<T>, IIncludableQueryable<T, object>> include);
        IQueryable<T> GetAllAsQueryable();
    }
}