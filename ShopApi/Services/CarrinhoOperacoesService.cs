using System;
using Microsoft.EntityFrameworkCore;
using ShopApi.Models;
using ShopApi.DTOs;
using ShopApi.Infra;

namespace ShopApi.Services;

public class CarrinhoOperacoesService
{
    private readonly ShopContext _db;

    public CarrinhoOperacoesService
(ShopContext db)
    {
        _db = db;
    }

    /// <summary>
    /// Retorna o valor total do carrinho de um usuário.
    /// </summary>
    public async Task<decimal> ObterValorTotalAsync(long usuarioId)
    {
        var carrinho = await _db.Carrinhos
            .Include(c => c.Itens)
            .ThenInclude(i => i.Produto)
            .FirstOrDefaultAsync(c => c.UsuarioId == usuarioId);

        if (carrinho == null)
            throw new Exception("Carrinho não encontrado.");

        return carrinho.Itens.Sum(i => i.Quantidade * i.Preco);
    }

    /// <summary>
    /// Remove um item ou reduz a quantidade no carrinho.
    /// </summary>
    public async Task<string> AlterarItemCarrinhoAsync(long usuarioId, ItemCarrinhoDTO itemDto)
    {
        var carrinho = await _db.Carrinhos
            .Include(c => c.Itens)
            .FirstOrDefaultAsync(c => c.UsuarioId == usuarioId);

        if (carrinho == null)
            return "Carrinho não encontrado.";

        var item = carrinho.Itens.FirstOrDefault(i => i.ProdutoId == Convert.ToInt64(itemDto.ProdutoId));

        if (item == null)
            return "Item não encontrado no carrinho.";

        if (itemDto.Quantidade <= 0)
        {
            _db.ItensCarrinho.Remove(item);
        }
        else
        {
            item.Quantidade -= itemDto.Quantidade;
            if (item.Quantidade <= 0)
            {
                _db.ItensCarrinho.Remove(item);
            }
            else
            {
                _db.ItensCarrinho.Update(item);
            }
        }

        await _db.SaveChangesAsync();
        return "Item atualizado no carrinho.";
    }

    /// <summary>
    /// Finaliza a compra do carrinho do usuário.
    /// </summary>
    public async Task<string> FinalizarCompraAsync(long usuarioId)
    {
        using var transaction = await _db.Database.BeginTransactionAsync();

        try
        {
            // Buscar carrinho do usuário
            var carrinho = await _db.Carrinhos
                .Include(c => c.Itens)
                .ThenInclude(i => i.Produto)
                .FirstOrDefaultAsync(c => c.UsuarioId == usuarioId);

            if (carrinho == null || !carrinho.Itens.Any())
                return "Carrinho vazio ou não encontrado.";

            var usuario = await _db.Usuarios.FirstOrDefaultAsync(u => u.Id == usuarioId);
            if (usuario == null)
                return "Usuário não encontrado.";

            decimal totalCompra = 0;
            var itensDto = new List<ItemCarrinhoDTO>();

            foreach (var item in carrinho.Itens)
            {
                var produto = item.Produto;

                if (produto == null || produto.Quantidade < item.Quantidade)
                    return $"Estoque insuficiente para o produto: {produto?.Nome ?? "desconhecido"}.";

                // Atualizar estoque do produto
                produto.Quantidade -= item.Quantidade;

                // Calcular o valor total
                totalCompra += item.Quantidade * item.Preco;

                // Atualizar inventário do usuário
                var inventario = await _db.Inventarios
                    .FirstOrDefaultAsync(i => i.UsuarioId == usuarioId && i.ProdutoId == item.ProdutoId);

                if (inventario != null)
                {
                    inventario.Quantidade += item.Quantidade;
                }
                else
                {
                    _db.Inventarios.Add(new Inventario
                    {
                        UsuarioId = usuario.Id,
                        ProdutoId = item.ProdutoId,
                        Quantidade = item.Quantidade
                    });
                }

                // Criar DTO para o item
                itensDto.Add(new ItemCarrinhoDTO(item));
            }

            // Verificar saldo do usuário
            if (usuario.Saldo < totalCompra)
                return "Saldo insuficiente para finalizar a compra.";

            // Atualizar saldo do usuário
            usuario.Saldo -= totalCompra;

            // Limpar carrinho
            _db.ItensCarrinho.RemoveRange(carrinho.Itens);

            await _db.SaveChangesAsync();
            await transaction.CommitAsync();

            // Retornar um resumo da compra
            return $"Compra finalizada com sucesso. Total: {totalCompra:C}. Itens comprados: {itensDto.Count}.";
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            return $"Erro ao finalizar a compra: {ex.Message}";
        }
    }
}
