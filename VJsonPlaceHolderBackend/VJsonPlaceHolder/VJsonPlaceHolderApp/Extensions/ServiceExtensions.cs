using System.Linq;
using System.Text;
using Contracts;
using Entities;
using Entities.Helpers;
using Entities.Models;
using LoggerService;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using VJsonPlaceHolder.Filters;
using VJsonPlaceHolder.Services;
using Repository;

namespace VJsonPlaceHolder.Extensions
{
    public static class ServiceExtensions
    {
        private const string SECURITY_KEY = "I was wandering what if the best I could do for may day to day";

        public static void ConfigureCors(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .WithExposedHeaders(new[] { "x-pagination" })
                    );
            });
        }

        public static void ConfigureIISIntegration(this IServiceCollection services)
        {
            services.Configure<IISOptions>(options =>
            {
            });
        }

        public static void ConfigureLoggerService(this IServiceCollection services)
        {
            services.AddSingleton<ILoggerManager, LoggerManager>();
        }

        public static void ConfigureSqlServerContext(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<RepositoryContext>(options => options.UseSqlServer(config.GetConnectionString("Connection")));
        }

        public static void ConfigureMySqlContext(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<RepositoryContext>(options => options.UseMySql(config.GetConnectionString("DevConnection"), MariaDbServerVersion.LatestSupportedServerVersion));
        }

        public static void ConfigureInMemoryDatabaseContext(this IServiceCollection services, IConfiguration config)
        {
            IServiceCollection serviceCollections = services.AddDbContext<RepositoryContext>(options => options.UseInMemoryDatabase("Comment-app"));
        }

        public static void ConfigureRepositoryWrapper(this IServiceCollection services)
        {
            services.AddScoped<ISortHelper<Comment>, SortHelper<Comment>>();
            services.AddScoped<IDataShaper<Comment>, DataShaper<Comment>>();

            services.AddScoped<IRepositoryWrapper, RepositoryWrapper>();
            services.AddScoped<ValidateMediaTypeAttribute>();
            services.AddTransient<ICommentService, CommentService>();
        }

        public static void AddCustomMediaTypes(this IServiceCollection services)
        {
            services.Configure<MvcOptions>(config =>
            {
                var newtonSoftJsonFormatter = config.OutputFormatters.OfType<NewtonsoftJsonOutputFormatter>()?.FirstOrDefault();

                if (newtonSoftJsonFormatter != null)
                {
                    newtonSoftJsonFormatter.SupportedMediaTypes.Add("application/vnd.codemaze.hateoas+json");
                }

                var xmlOutputFormatter = config.OutputFormatters.OfType<XmlDataContractSerializerOutputFormatter>()?.FirstOrDefault();

                if (xmlOutputFormatter != null)
                {
                    xmlOutputFormatter.SupportedMediaTypes.Add("application/vnd.codemaze.hateoas+xml");
                }
            });
        }

        public static void AddJwtAuthentication(this IServiceCollection services)
        {
            services.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,

                    ValidIssuer = "http://localhost:5001/,http://localhost:5003/,http://localhost:5005/",
                    ValidAudience = "http://localhost:4201/",
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SECURITY_KEY))
                };
            });
        }
    }
}
