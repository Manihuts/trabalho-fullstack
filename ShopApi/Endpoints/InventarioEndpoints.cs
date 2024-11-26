using System;
using Microsoft.EntityFrameworkCore;
using ShopApi.DTOs;
using ShopApi.Infra;
using ShopApi.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace ShopApi.Endpoints;

public static class InventarioEndpoints
{
    public static void AddInventarioEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/inventario").RequireAuthorization();

        group.MapGet("/{usuarioId}", GetByUsuarioAsync);
        group.MapPost("/", PostAsync);
        group.MapPut("/{id}", PutAsync);
        group.MapDelete("/{id}", DeleteAsync);
    }

    private static async Task<IResult> GetByUsuarioAsync(string usuarioId, HttpContext httpContext, ShopContext db)
    {
        if (!UsuarioValido(httpContext, usuarioId))
            return TypedResults.Unauthorized();

        var itensInventario = await db.Inventarios
            .Where(i => i.UsuarioId == Convert.ToInt64(usuarioId))
            .Select(i => new InventarioDTO(i))
            .ToListAsync();

        return TypedResults.Ok(itensInventario);
    }

    private static async Task<IResult> PostAsync(InventarioDTO dto, HttpContext httpContext, ShopContext db)
    {
        if (!UsuarioValido(httpContext, dto.UsuarioId.ToString()))
            return TypedResults.Unauthorized();

        Inventario inventario = dto.GetModel();
        inventario.Id = IdGenerator.GetId();
        await db.Inventarios.AddAsync(inventario);
        await db.SaveChangesAsync();

        return TypedResults.Created($"/inventario/{inventario.Id}", new InventarioDTO(inventario));
    }

    private static async Task<IResult> PutAsync(string id, InventarioDTO dto, HttpContext httpContext, ShopContext db)
    {
        if (id != dto.Id || !UsuarioValido(httpContext, dto.UsuarioId.ToString()))
            return TypedResults.Unauthorized();

        var inventario = await db.Inventarios.FindAsync(Convert.ToInt64(id));

        if (inventario == null) {
            return TypedResults.NotFound();
        }

        dto.FillModel(inventario);

        db.Inventarios.Update(inventario);
        await db.SaveChangesAsync();

        return TypedResults.NoContent();
    }

    private static async Task<IResult> DeleteAsync(string id, HttpContext httpContext, ShopContext db)
    {
        var inventario = await db.Inventarios.FindAsync(Convert.ToInt64(id));

        if (inventario == null || !UsuarioValido(httpContext, inventario.UsuarioId.ToString())) {
            return TypedResults.Unauthorized();
        }

        db.Inventarios.Remove(inventario);
        await db.SaveChangesAsync();

        return TypedResults.NoContent();
    }

    private static bool UsuarioValido(HttpContext httpContext, string usuarioId)
    {
        var userIdClaim = httpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        return userIdClaim != null && userIdClaim == usuarioId;
    }
}
