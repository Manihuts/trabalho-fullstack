using System;
using Microsoft.EntityFrameworkCore;
using ShopApi.DTOs;
using ShopApi.Infra;
using ShopApi.Models;

namespace ShopApi.Endpoints;

public static class ProdutoEndpoints
{
    public static void AddProdutoEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/produtos");

        group.MapGet("/", GetAsync);
        group.MapGet("/{id}", GetByIdAsync);
        group.MapPost("/", PostAsync);
        group.MapPut("/{id}", PutAsync);
        group.MapDelete("/{id}", DeleteAsync);
    }

    private static async Task<IResult> GetAsync(ShopContext db)
    {
        var produtos = await db.Produtos.ToListAsync();
        return TypedResults.Ok(produtos.Select(p => new ProdutoDTO(p)));
    }

    private static async Task<IResult> GetByIdAsync(string id, ShopContext db)
    {
        var prod = await db.Produtos.FindAsync(Convert.ToInt64(id));
        return prod == null ? TypedResults.NotFound() : TypedResults.Ok(new ProdutoDTO(prod));
    }

    private static async Task<IResult> PostAsync(ProdutoDTO dto, ShopContext db)
    {
        Produto prod = dto.GetModel();
        prod.Id = IdGenerator.GetId();
        await db.Produtos.AddAsync(prod);
        await db.SaveChangesAsync();

        return TypedResults.Created($"/produtos/{prod.Id}", new ProdutoDTO(prod));
    }

    private static async Task<IResult> PutAsync(string id, ProdutoDTO dto, ShopContext db)
    {
        if (id != dto.Id) {
            return TypedResults.BadRequest();
        }

        var prod = await db.Produtos.FindAsync(Convert.ToInt64(id));

        if (prod == null) {
            return TypedResults.NotFound();
        }
        
        dto.FillModel(prod);

        db.Produtos.Update(prod);
        await db.SaveChangesAsync();

        return TypedResults.NoContent();
    }

    private static async Task<IResult> DeleteAsync(string id, ShopContext db)
    {
        var prod = await db.Produtos.FindAsync(Convert.ToInt64(id));

        if (prod == null) {
            return TypedResults.NotFound();
        }
        
        db.Produtos.Remove(prod);
        await db.SaveChangesAsync();

        return TypedResults.NoContent();
    }
}
