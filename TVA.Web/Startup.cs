#region Information
/*
 * Author       : Zng Tfy
 * Email        : nvt87x@gmail.com
 * Phone        : +84 345 515 010
 * ------------------------------- *
 * Create       : 24/01/2019 09:24
 * Update       : 30/01/2019 19:23
 * Checklist    : 1.0
 * Status       : OK
 */
#endregion

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using SKG;
using Swashbuckle.AspNetCore.Swagger;
using System.Text;

namespace TVA.Web
{
    using BLL;

    /// <summary>
    /// Startup
    /// </summary>
    public class Startup
    {
        #region -- Methods --

        /// <summary>
        /// Initialize
        /// </summary>
        /// <param name="configuration">Configuration</param>
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        /// <summary>
        /// This method gets called by the runtime.
        /// Use this method to add services to the container.
        /// </summary>
        /// <param name="services">Services</param>
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddMvc();
            services.AddOptions();

            #region -- Swagger --
            var inf1 = new Info
            {
                Title = "TVA API v1.0",
                Version = "v1",
                Description = "A sample API to demo Swashbuckle",
                TermsOfService = "Knock yourself out",
                Contact = new Contact
                {
                    Name = "Toan Nguyen",
                    Email = "toan.nguyen@tanvieta.co"
                },
                License = new License
                {
                    Name = "Apache 2.0",
                    Url = "http://www.apache.org/licenses/LICENSE-2.0.html"
                }
            };

            var inf2 = new Info
            {
                Title = "TVA API v2.0",
                Version = "v2",
                Description = "A sample API to demo Swashbuckle",
                TermsOfService = "Knock yourself out",
                Contact = new Contact
                {
                    Name = "Toan Nguyen",
                    Email = "toan.nguyen@tanvieta.co"
                },
                License = new License
                {
                    Name = "Apache 2.0",
                    Url = "http://www.apache.org/licenses/LICENSE-2.0.html"
                }
            };

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", inf1);
                c.SwaggerDoc("v2", inf2);
            });
            #endregion

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            // Configure strongly typed settings objects
            var section = Configuration.GetSection("AppSetting");
            services.Configure<AppSetting>(section);

            // Configure JWT authentication
            AppSetting.S = section.Get<AppSetting>();
            var key = Encoding.ASCII.GetBytes(AppSetting.S.JwtSecret);

            ZRsa.PublicKey = AppSetting.S.RsaPublicKey;
            ZRsa.PrivateKey = AppSetting.S.RsaPrivateKey;

            services.AddAuthentication(p =>
            {
                p.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                p.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(p =>
            {
                p.RequireHttpsMetadata = false;
                p.SaveToken = true;
                p.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            #region -- Configure DI for application services --
            services.AddSingleton<UserSvc, UserSvc>();
            services.AddSingleton<HolidaySvc, HolidaySvc>();
            services.AddSingleton<LeaveSvc, LeaveSvc>();
            services.AddSingleton<LeaveApplySvc, LeaveApplySvc>();
            services.AddSingleton<CodeSvc, CodeSvc>();
            services.AddSingleton<PositionSvc, PositionSvc>();
            services.AddSingleton<GroupSvc, GroupSvc>();
            #endregion

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        /// <summary>
        /// This method gets called by the runtime.
        /// Use this method to configure the HTTP request pipeline.
        /// </summary>
        /// <param name="app">Application builder</param>
        /// <param name="env">Hosting environment</param>
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");

                // The default HSTS value is 30 days.
                // You may want to change this for production scenarios,
                // see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            #region -- Swagger --
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "TVA API v1.0");
                c.SwaggerEndpoint("/swagger/v2/swagger.json", "TVA API v2.0");
            });
            #endregion

            app.UseCors(p => p.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
            app.UseAuthentication();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }

        #endregion

        #region -- Properties --

        /// <summary>
        /// Configuration
        /// </summary>
        public IConfiguration Configuration { get; }

        #endregion
    }
}