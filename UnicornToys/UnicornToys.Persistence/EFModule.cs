using Autofac;
using Microsoft.EntityFrameworkCore;
using UnicornToys.Persistence.Contexts;

namespace UnicornToys.Persistence
{
    public class EFModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterModule<RepositoryModule>();
            builder.RegisterType(typeof(MyAppDbContext)).As(typeof(DbContext)).InstancePerLifetimeScope();
            builder.RegisterType(typeof(UnitOfWork)).As(typeof(IUnitOfWork)).InstancePerRequest();
        }
    }
}
