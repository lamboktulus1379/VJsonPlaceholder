using System;
using System.IO;
using Contracts;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using VJsonPlaceHolder.Extensions;
using VJsonPlaceHolder.Services;
using NLog;
using Elastic.Apm.NetCoreAll;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Serialization;

namespace VJsonPlaceHolder
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            string nlogPath = "/nlog.config";
            string environment = string.Empty;
            if (env.IsDevelopment())
            {
                nlogPath = "/nlog.dev.config";
                environment = "Development";
            }
            LogManager.LoadConfiguration(String.Concat(Directory.GetCurrentDirectory(), nlogPath));
            //configuration = new ConfigurationBuilder()
            //    .AddEnvironmentVariables()
            //    .AddJsonFile($"appsettings.{environment}.json", true)
            //    .AddUserSecrets<Program>()
            //    .Build();
            Configuration = configuration;

        }


        public IConfiguration Configuration { get; }
        public ISubscriber _subscriber;

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.ConfigureCors();

            services.AddControllers().AddJsonOptions(opt => opt.JsonSerializerOptions.PropertyNamingPolicy = null);

            services.ConfigureIISIntegration();

            services.ConfigureLoggerService();

            //services.ConfigureMySqlContext(Configuration);

            services.ConfigureSqlServerContext(Configuration);

            services.ConfigureRepositoryWrapper();

            services.AddJwtAuthentication();
            // services.AddCustomMediaTypes();

            services.AddAutoMapper(typeof(Startup));

            //services.AddSwaggerGen(c =>
            //{
            //    c.SwaggerDoc("v1", new OpenApiInfo
            //    {
            //        Title = "Comment API",
            //        Version = "v1"
            //    });
            //});

            services.AddControllers(config =>
            {
                config.RespectBrowserAcceptHeader = true;
                config.ReturnHttpNotAcceptable = true;

            })
            .AddNewtonsoftJson(o =>
            {
                o.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                o.SerializerSettings.ContractResolver = new DefaultContractResolver();
            })
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.PropertyNamingPolicy = null;
            });

            services.AddMemoryCache();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //app.UseAllElasticApm(Configuration);

            //app.UseSerilogRequestLogging();

            // app.UseHttpsRedirection();

            app.UseStaticFiles();

            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.All
            });

            app.UseRouting();

            app.UseCors("CorsPolicy");

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapGet("/", async context =>
                {
                    await context.Response.WriteAsync("Comment API");
                });
            });

            //app.UseSwagger();

            //app.UseSwaggerUI(c =>
            //{
            //    c.SwaggerEndpoint("/swagger/v1/swagger.json", "CommentApp API V1");
            //});

        }
    }
}
