using AutoMapper;
using System.Reflection;

namespace UnicornToys.Application.Mappings
{
    public static class AutoMapperConfig
    {
        public static void Configure(IMapperConfigurationExpression cfg)
        {
            if (cfg is null)
            {
                throw new ArgumentNullException(nameof(cfg));
            }

            Configure(cfg, new[] { typeof(AutoMapperConfig).Assembly });
        }

        public static void Configure(IMapperConfigurationExpression cfg, Assembly[] assemblies)
        {
            if (cfg is null)
            {
                throw new ArgumentNullException(nameof(cfg));
            }

            if (assemblies is null)
            {
                throw new ArgumentNullException(nameof(assemblies));
            }

            if (assemblies.Length == 0)
            {
                throw new ArgumentException("Value cannot be an empty collection.", nameof(assemblies));
            }

            cfg.AddMaps(assemblies);
        }
    }
}