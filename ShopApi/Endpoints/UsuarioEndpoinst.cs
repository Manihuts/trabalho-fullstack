using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using ShopApi.DTOs;
using ShopApi.Models;
using ShopApi.Services;
using ShopApi.Infra;
namespace ShopApi.Endpoints;

public static class UsuarioEndpoints
{
    public static void AddUsuarioEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/usuarios");

        // Endpoints públicos
        group.MapPost("/registrar", RegistrarUsuarioAsync).AllowAnonymous();
        group.MapPost("/login", LoginUsuarioAsync).AllowAnonymous();

        // Endpoints protegidos por token
        group.MapGet("/", GetAsync).RequireAuthorization("Admin");
        group.MapGet("/{id}", GetByIdAsync).RequireAuthorization();
        group.MapPost("/", PostUsuarioAsync).RequireAuthorization("Admin");
        group.MapPost("/admin", PostAdminAsync).RequireAuthorization("Admin");
        group.MapPut("/{id}", PutAsync).RequireAuthorization();
        group.MapDelete("/{id}", DeleteAsync).RequireAuthorization("Admin");
    }

    private static async Task<IResult> RegistrarUsuarioAsync(AuthService authService, UsuarioDTO dto, string senha)
    {
        var usuario = await authService.RegisterAsync(dto, senha);
        if (usuario == null)
            return TypedResults.BadRequest("Email já está em uso.");

        return TypedResults.Created($"/usuarios/{usuario.Id}", usuario);
    }

   private static async Task<IResult> LoginUsuarioAsync(AuthService authService, LoginDTO loginDto)
{
    var token = await authService.LoginAsync(loginDto);
    if (token == null)
    {
        
        return Results.Json(new { Error = "Email ou senha inválidos." }, statusCode: StatusCodes.Status401Unauthorized);
    }

    return Results.Ok(new { Token = token });
}


    private static async Task<IResult> GetAsync(ShopContext db)
    {
        var usuarios = await db.Usuarios.ToListAsync();
        return TypedResults.Ok(usuarios.Select(u => new UsuarioDTO(u)));
    }

    private static async Task<IResult> GetByIdAsync(string id, ShopContext db)
    {
        var usuario = await db.Usuarios.FindAsync(Convert.ToInt64(id));
        return usuario == null ? TypedResults.NotFound() : TypedResults.Ok(new UsuarioDTO(usuario));
    }

    private static async Task<IResult> PostUsuarioAsync(ShopContext db, UsuarioDTO dto)
    {
        var usuario = dto.GetModel();
        usuario.Id = IdGenerator.GetId();

        await db.Usuarios.AddAsync(usuario);
        await db.SaveChangesAsync();

        return TypedResults.Created($"/usuarios/{usuario.Id}", new UsuarioDTO(usuario));
    }

    private static async Task<IResult> PostAdminAsync(ShopContext db, UsuarioDTO dto)
    {
        var usuario = dto.GetModel();
        usuario.Id = IdGenerator.GetId();
        usuario.Admin = true;

        await db.Usuarios.AddAsync(usuario);
        await db.SaveChangesAsync();

        return TypedResults.Created($"/usuarios/{usuario.Id}", new UsuarioDTO(usuario));
    }

    private static async Task<IResult> PutAsync(string id, ShopContext db, UsuarioDTO dto)
    {
        if (id != dto.Id)
            return TypedResults.BadRequest();

        var usuario = await db.Usuarios.FindAsync(Convert.ToInt64(id));
        if (usuario == null)
            return TypedResults.NotFound();

        dto.FillModel(usuario);
        db.Usuarios.Update(usuario);
        await db.SaveChangesAsync();

        return TypedResults.NoContent();
    }

    private static async Task<IResult> DeleteAsync(string id, ShopContext db)
    {
        var usuario = await db.Usuarios.FindAsync(Convert.ToInt64(id));
        if (usuario == null)
            return TypedResults.NotFound();

        db.Usuarios.Remove(usuario);
        await db.SaveChangesAsync();

        return TypedResults.NoContent();
    }
}
