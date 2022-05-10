using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using System;
using System.Threading.Tasks;

namespace Comp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {



            string[] s = new string[] { "http://localhost:8080", "http://localhost:8081", "http://localhost:8082", "http://localhost:8083", "http://localhost:8084", "http://localhost:8085" };
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                  builder =>
                  {
                      builder
                      .WithOrigins(s)
                      .AllowAnyHeader()
                      .AllowCredentials()
                      .AllowAnyMethod();
                  });
            });

            services.AddControllers();

            var connection = Configuration.GetConnectionString("DefaultConnection");

            services.AddDbContext<CompContext>(options => options.UseSqlServer(connection));

            services.AddIdentity<User, IdentityRole>().AddEntityFrameworkStores<CompContext>();

            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequiredLength = 4;
                options.Password.RequireUppercase = false;
                options.Password.RequireNonAlphanumeric = false;
            });

            services.ConfigureApplicationCookie(options =>
            {
                options.Cookie.Name = "SimpleWebApp";
                options.LoginPath = "/";
                options.AccessDeniedPath = "/";
                options.LogoutPath = "/";
                options.Events.OnRedirectToLogin = context =>
                {
                    context.Response.StatusCode = 401;
                    return Task.CompletedTask;
                };
                options.Events.OnRedirectToAccessDenied = context =>
                {
                    context.Response.StatusCode = 401;
                    return Task.CompletedTask;
                };
            });

            services.AddMvc()
               .AddNewtonsoftJson(options =>
               {
                   options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;

               });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IServiceProvider services)
        {
            app.UseCors();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseDefaultFiles();

            app.UseStaticFiles();

            app.UseAuthentication();

            app.UseAuthorization();

            CreateUserRoles(services).Wait();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }


       private async Task CreateUserRoles(IServiceProvider serviceProvider)
        {
            var roleManager =
            serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var userManager =
            serviceProvider.GetRequiredService<UserManager<User>>();
            // Создание ролей администратора и пользователя
            if (await roleManager.FindByNameAsync("admin") == null)
            {
                await roleManager.CreateAsync(new
                IdentityRole("admin"));
            }
            if (await roleManager.FindByNameAsync("user") == null)
            {
                await roleManager.CreateAsync(new IdentityRole("user"));
            }
            // Создание Администратора
            string adminEmail = "admin@mail.com";
            string adminPassword = "z123456789!";
            if (await userManager.FindByNameAsync(adminEmail) == null)
            {
                User admin = new User
                {
                    Email = adminEmail,
                    UserName = adminEmail
                };
                IdentityResult result = await
                userManager.CreateAsync(admin, adminPassword);
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(admin, "admin");
                }
            }
            // Создание Пользователя
            string userEmail = "user@mail.com";
            string userPassword = "z123456789!";
            if (await userManager.FindByNameAsync(userEmail) == null)
            {
                User user = new User
                {
                    Email = userEmail,
                    UserName =
                userEmail
                };
                IdentityResult result = await
                userManager.CreateAsync(user, userPassword);
                if (result.Succeeded)
                {
                
                await userManager.AddToRoleAsync(user, "user");
                }
            }
        }

    }








}

