using System;
using System.Data.Common;
using Microsoft.EntityFrameworkCore;
using ShopApi.DTOs;
using ShopApi.Infra;
using ShopApi.Models;

namespace ShopApi.Endpoints;

public static class ItemCarrinhoEndpoints
{
    public static void AddItemCarrinhoEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/itemcarrinho");

        group.MapGet("/{id}", GetByIdAsync);
        group.MapPost("/", PostAsync);
        group.MapPut("/{id}", PutAsync);
        group.MapDelete("/{id}", DeleteAsync);
    }

    private static async Task<IResult> GetByIdAsync(string id, ShopContext db)
    {
        var item = await db.ItensCarrinho.FindAsync(Convert.ToInt64(id));
        return item == null ? TypedResults.NotFound() : TypedResults.Ok(new ItemCarrinhoDTO(item));
    }

    private static async Task<IResult> PostAsync(ItemCarrinhoDTO dto, ShopContext db)
    {
        ItemCarrinho item = dto.GetModel();
        item.Id = IdGenerator.GetId();
        await db.ItensCarrinho.AddAsync(item);
        await db.SaveChangesAsync();

        return TypedResults.Created($"/produtos/{item.Id}", new ItemCarrinhoDTO(item));
    }

    private static async Task<IResult> PutAsync(string id, ItemCarrinhoDTO dto, ShopContext db)
    {
        if (id != dto.Id) {
            return TypedResults.BadRequest();
        }

        var item = await db.ItensCarrinho.FindAsync(Convert.ToInt64(id));

        if (item == null) {
            return TypedResults.NotFound();
        }
        
        dto.FillModel(item);

        db.ItensCarrinho.Update(item);
        await db.SaveChangesAsync();

        return TypedResults.NoContent();
    }

    private static async Task<IResult> DeleteAsync(string id, ShopContext db)
    {
        var item = await db.ItensCarrinho.FindAsync(Convert.ToInt64(id));

        if (item == null) {
            return TypedResults.NotFound();
        }
        
        db.ItensCarrinho.Remove(item);
        await db.SaveChangesAsync();

        return TypedResults.NoContent();
    }
}
