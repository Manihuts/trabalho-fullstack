using Microsoft.AspNetCore.Identity;
using ShopApi.Endpoints;
using ShopApi.Infra;
using ShopApi.Models;
using ShopApi.Services;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddAuthorization();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ShopContext>();
builder.Services.AddScoped<OperacoesService>();



// Hash do password
builder.Services.AddSingleton<IPasswordHasher<Usuario>, PasswordHasher<Usuario>>();


builder.Services.AddScoped<AuthService>();
builder.Services.AddAuthorization(options =>
{
    // Configuração da política "Admin"
    options.AddPolicy("Admin", policy =>
    {
        policy.RequireClaim("http://schemas.microsoft.com/ws/2008/06/identity/claims/role", "Admin");
    });
});
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = "Bearer";
    options.DefaultChallengeScheme = "Bearer";
    
})
.AddJwtBearer("Bearer", options =>
{
    options.SaveToken = true;
  
    
    options.Events = new JwtBearerEvents
    {
        OnAuthenticationFailed = context =>
        {
            var exception = context.Exception;
            if (exception != null)
            {
               
                Console.WriteLine("Erro na autenticação JWT: " + exception.Message);
            
            
            }
            return Task.CompletedTask;
        },
        OnTokenValidated = context =>
        {

            Console.WriteLine("####Token validado com sucesso.####");
            

            var claimsIdentity = context.Principal?.Identity;
            if (claimsIdentity != null)
            {
                var userName = claimsIdentity.Name;  
                Console.WriteLine($"Usuário autenticado: {userName}");
            }
            return Task.CompletedTask;
        }
    };

    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = "ShopApiIssuer",  
        ValidAudience = "ShopApiAudience", 
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes("superchavesecretamegablastermatadoradenoobsplustripleheadshotcarpadoinvertido") 
        )
    };    
});




builder.Services.AddCors();

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();


app.UseCors(builder => builder
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowAnyOrigin()
);

app.UseAuthentication();
app.UseAuthorization();

app.AddProdutoEndpoints();
app.AddUsuarioEndpoints();
app.AddInventarioEndpoints();
app.AddOperacoesEndpoints();


app.Run();
