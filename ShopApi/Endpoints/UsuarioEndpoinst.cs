using System;
using Microsoft.EntityFrameworkCore;
using ShopApi.DTOs;
using ShopApi.Infra;
using ShopApi.Models;

namespace ShopApi.Endpoints;

public static class UsuarioEndpoints
{
    public static void AddUsuarioEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/usuarios");

        group.MapGet("/", GetAsync);
        group.MapGet("/{id}", GetByIdAsync);
        group.MapPost("/", PostAsync);
        group.MapPut("/{id}", PutAsync);
        group.MapDelete("/{id}", DeleteAsync);
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

    private static async Task<IResult> PostAsync(UsuarioDTO dto, ShopContext db)
    {
        Usuario usuario = dto.GetModel();
        usuario.Id = IdGenerator.GetId();
        await db.Usuarios.AddAsync(usuario);
        await db.SaveChangesAsync();

        return TypedResults.Created($"/usuarios/{usuario.Id}", new UsuarioDTO(usuario));
    }

    private static async Task<IResult> PutAsync(string id, UsuarioDTO dto, ShopContext db)
    {
        if (id != dto.Id) {
            return TypedResults.BadRequest();
        }

        var usuario = await db.Usuarios.FindAsync(Convert.ToInt64(id));

        if (usuario == null) {
            return TypedResults.NotFound();
        }

        dto.FillModel(usuario);

        db.Usuarios.Update(usuario);
        await db.SaveChangesAsync();

        return TypedResults.NoContent();
    }

    private static async Task<IResult> DeleteAsync(string id, ShopContext db)
    {
        var usuario = await db.Usuarios.FindAsync(Convert.ToInt64(id));

        if (usuario == null) {
            return TypedResults.NotFound();
        }

        db.Usuarios.Remove(usuario);
        await db.SaveChangesAsync();

        return TypedResults.NoContent();
    }
}
