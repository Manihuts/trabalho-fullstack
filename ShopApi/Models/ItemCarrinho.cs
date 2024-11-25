using System;

namespace ShopApi.Models;

public class ItemCarrinho
{
    public long Id { get; set; }
    public int Quantidade { get; set; }
    public decimal Preco { get; set; }
    public long CarrinhoId { get; set; }
    public Carrinho? Carrinho { get; set; }
    public long ProdutoId { get; set; }
    public Produto? Produto { get; set; }
}