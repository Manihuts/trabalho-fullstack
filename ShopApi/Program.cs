using Microsoft.AspNetCore.Identity;
using ShopApi.Endpoints;
using ShopApi.Infra;
using ShopApi.Models;
using ShopApi.Services;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddAuthorization();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ShopContext>();
builder.Services.AddScoped<OperacoesService>();
builder.Services.AddScoped<CarrinhoOperacoesService>();


// Hash do password
builder.Services.AddSingleton<IPasswordHasher<Usuario>, PasswordHasher<Usuario>>();

// Configuração de autenticação com JWT
builder.Services.AddScoped<AuthService>();
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = "Bearer";
    options.DefaultChallengeScheme = "Bearer";
})
.AddJwtBearer("Bearer", options =>
{
    options.RequireHttpsMetadata = false; // Configurar como true em produção
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = "ShopApiIssuer", // Substituir pelo emissor válido
        ValidAudience = "ShopApiAudience", // Substituir pela audiência válida
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes("superchavesecretamegablastermatadoradenoobsplustripleheadshotcarpadoinvertido") // Substituir pela chave privada
        )
    };
});

builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Ativação de CORS
app.UseCors(builder => builder
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowAnyOrigin()
);

// Ativação de autenticação e autorização
app.UseAuthentication();
app.UseAuthorization();

// Adição dos endpoints
app.AddProdutoEndpoints();
app.AddUsuarioEndpoints();
app.AddCarrinhoEndpoints();
app.AddInventarioEndpoints();
app.AddItemCarrinhoEndpoints();
app.AddOperacoesEndpoints();
app.AddCarrinhoOperacoesEndpoints();

app.Run();
