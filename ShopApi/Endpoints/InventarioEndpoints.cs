using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using ShopApi.DTOs;
using ShopApi.Infra;
using ShopApi.Models;

namespace ShopApi.Endpoints;

public static class InventarioEndpoints
{
    public static void AddInventarioEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/inventario");

        group.MapGet("/{usuarioId}", GetByUsuarioAsync);
        group.MapPost("/", PostAsync);
        group.MapPut("/{id}", PutAsync);
        group.MapDelete("/{id}", DeleteAsync);
    }

    private static async Task<IResult> GetByUsuarioAsync(string usuarioId, ShopContext db)
    {
        var itensInventario = await db.Inventarios
            .Where(i => i.UsuarioId == Convert.ToInt64(usuarioId))
            .Select(i => new InventarioDTO(i))
            .ToListAsync();

        return itensInventario == null ? TypedResults.NotFound() : TypedResults.Ok(itensInventario);
    }

    private static async Task<IResult> PostAsync(InventarioDTO dto, ShopContext db)
    {
        Inventario inventario = dto.GetModel();
        inventario.Id = IdGenerator.GetId();
        await db.Inventarios.AddAsync(inventario);
        await db.SaveChangesAsync();

        return TypedResults.Created($"/inventario/{inventario.Id}", new InventarioDTO(inventario));
    }

    private static async Task<IResult> PutAsync(string id, InventarioDTO dto, ShopContext db)
    {
        if (id != dto.Id) {
            return TypedResults.BadRequest();
        }
            
        var inventario = await db.Inventarios.FindAsync(Convert.ToInt64(id));

        if (inventario == null) {
            return TypedResults.NotFound();
        }

        dto.FillModel(inventario);

        db.Inventarios.Update(inventario);
        await db.SaveChangesAsync();

        return TypedResults.NoContent();
    }

    private static async Task<IResult> DeleteAsync(string id, ShopContext db)
    {
        var inventario = await db.Inventarios.FindAsync(Convert.ToInt64(id));

        if (inventario == null) {
            return TypedResults.NotFound();
        }
            
        db.Inventarios.Remove(inventario);
        await db.SaveChangesAsync();

        return TypedResults.NoContent();
    }
}
