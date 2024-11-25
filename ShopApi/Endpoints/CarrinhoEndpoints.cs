using System;
using Microsoft.EntityFrameworkCore;
using ShopApi.DTOs;
using ShopApi.Infra;
using ShopApi.Models;

namespace ShopApi.Endpoints;

public static class CarrinhoEndpoints
{
    public static void AddCarrinhoEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/carrinho");

        group.MapGet("/{usuarioId}", GetByUsuarioAsync);
        group.MapPost("/", PostAsync);
        group.MapPut("/{id}", PutAsync);
        group.MapDelete("/{id}", DeleteAsync);
    }

    private static async Task<IResult> GetByUsuarioAsync(string usuarioId, ShopContext db)
    {
        var carrinho = await db.Carrinhos
            .Include(c => c.Itens)
            .FirstOrDefaultAsync(c => c.UsuarioId == Convert.ToInt64(usuarioId));

        return carrinho == null ? TypedResults.NotFound() : TypedResults.Ok(new CarrinhoDTO(carrinho));
    }

    private static async Task<IResult> PostAsync(CarrinhoDTO dto, ShopContext db)
    {
        Carrinho carrinho = dto.GetModel();
        carrinho.Id = IdGenerator.GetId();
        await db.Carrinhos.AddAsync(carrinho);
        await db.SaveChangesAsync();

        return TypedResults.Created($"/carrinho/{carrinho.Id}", new CarrinhoDTO(carrinho));
    }

    private static async Task<IResult> PutAsync(string id, CarrinhoDTO dto, ShopContext db)
    {
        if (id != dto.Id) {
            return TypedResults.BadRequest();
        }

        var carrinho = await db.Carrinhos.FindAsync(Convert.ToInt64(id));

        if (carrinho == null) {
            return TypedResults.NotFound();
        }

        dto.FillModel(carrinho);

        db.Carrinhos.Update(carrinho);
        await db.SaveChangesAsync();

        return TypedResults.NoContent();
    }

    private static async Task<IResult> DeleteAsync(string id, ShopContext db)
    {
        var carrinho = await db.Carrinhos.FindAsync(Convert.ToInt64(id));

        if (carrinho == null) {
            return TypedResults.NotFound();
        }

        db.Carrinhos.Remove(carrinho);
        await db.SaveChangesAsync();

        return TypedResults.NoContent();
    }
}
