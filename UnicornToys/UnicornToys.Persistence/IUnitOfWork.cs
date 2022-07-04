namespace UnicornToys.Persistence
{
    public interface IUnitOfWork
    {
        IRepository<T> GetRepository<T>() where T : class;

        void Commit();
    }
}