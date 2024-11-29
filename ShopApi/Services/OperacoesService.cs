using System;
using Microsoft.EntityFrameworkCore;
using ShopApi.Models;
using ShopApi.DTOs;
using ShopApi.Infra;

namespace ShopApi.Services;

public class OperacoesService
{
    private readonly ShopContext _db;

    public OperacoesService(ShopContext db)
    {
        _db = db;
    }

    public async Task<string> ComprarProdutoAsync(OperacaoCompraDTO compraDto)
    {
        var usuario = await _db.Usuarios
            .Include(u => u.Inventario)
            .FirstOrDefaultAsync(u => u.Id == compraDto.UsuarioId);

        var produto = await _db.Produtos.FirstOrDefaultAsync(p => p.Id == compraDto.ProdutoId);

        if (usuario == null || produto == null)
            return "Usuário ou produto não encontrado.";

        if (compraDto.Quantidade <= 0)
            return "Quantidade inválida.";

        if (produto.Quantidade < compraDto.Quantidade)
            return "Estoque insuficiente.";

        decimal custoTotal = produto.Preco * compraDto.Quantidade;

        if (usuario.Saldo < custoTotal)
            return "Saldo insuficiente.";

        usuario.Saldo -= custoTotal;
        produto.Quantidade -= compraDto.Quantidade;

        var inventario = usuario.Inventario.FirstOrDefault(i => i.ProdutoId == compraDto.ProdutoId);
        if (inventario != null)
        {
            inventario.Quantidade += compraDto.Quantidade;
        }
        else
        {
            _db.Inventarios.Add(new Inventario
            {
                UsuarioId = usuario.Id,
                ProdutoId = produto.Id,
                Quantidade = compraDto.Quantidade
            });
        }

        await _db.SaveChangesAsync();
        return "Compra realizada com sucesso.";
    }

    public async Task<string> VenderProdutoAsync(OperacaoVendaDTO vendaDto)
    {
        var usuario = await _db.Usuarios
            .Include(u => u.Inventario)
            .FirstOrDefaultAsync(u => u.Id == vendaDto.UsuarioId);

        var produto = await _db.Produtos.FirstOrDefaultAsync(p => p.Id == vendaDto.ProdutoId);

        if (usuario == null || produto == null)
            return "Usuário ou produto não encontrado.";

        if (vendaDto.Quantidade <= 0)
            return "Quantidade inválida.";

        var inventario = usuario.Inventario.FirstOrDefault(i => i.ProdutoId == vendaDto.ProdutoId);
        if (inventario == null || inventario.Quantidade < vendaDto.Quantidade)
            return "Quantidade insuficiente no inventário.";

        decimal valorVenda = produto.Preco * vendaDto.Quantidade;

        usuario.Saldo += valorVenda;
        produto.Quantidade += vendaDto.Quantidade;

        inventario.Quantidade -= vendaDto.Quantidade;
        if (inventario.Quantidade == 0)
        {
            _db.Inventarios.Remove(inventario);
        }

        await _db.SaveChangesAsync();
        return "Venda realizada com sucesso.";
    }
}
