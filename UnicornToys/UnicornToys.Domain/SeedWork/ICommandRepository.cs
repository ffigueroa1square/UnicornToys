namespace UnicornToys.Domain.SeedWork
{
    public interface ICommandRepository<T, TEntity>
    {
        Task<TEntity> Create(TEntity entitiy);

        Task<bool> Update(T id, TEntity entity);

        Task<bool> Delete(T id);
    }
}