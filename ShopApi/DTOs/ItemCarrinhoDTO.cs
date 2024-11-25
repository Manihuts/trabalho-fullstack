using System;
using ShopApi.Models;

namespace ShopApi.DTOs;

public class ItemCarrinhoDTO
{
    public ItemCarrinhoDTO() { }

    public ItemCarrinhoDTO(ItemCarrinho item)
    {
        Id = item.Id.ToString();
        ProdutoId = item.Id.ToString();
        ProdutoNome = item.Produto?.Nome ?? string.Empty;
        Quantidade = item.Quantidade;
        Preco = item.Preco;
    }

    public string Id { get; set; } = string.Empty;
    public string ProdutoId { get; set; } = string.Empty;
    public string ProdutoNome { get; set; } = string.Empty;
    public int Quantidade { get; set; } = 0;
    public decimal Preco { get; set; } = 0;

    public ItemCarrinho GetModel()
    {
        var itemCarrinho = new ItemCarrinho();
        FillModel(itemCarrinho);

        return itemCarrinho;
    }

    public void FillModel(ItemCarrinho itemCarrinho)
    {
        long.TryParse(this.Id, out long id);
        itemCarrinho.Id = id;
        long.TryParse(this.ProdutoId, out long produtoId);
        itemCarrinho.ProdutoId = produtoId;
        itemCarrinho.Quantidade = this.Quantidade;
        itemCarrinho.Preco = this.Preco;
    }
}
