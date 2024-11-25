using System;
using ShopApi.Models;

namespace ShopApi.DTOs;

public class ProdutoDTO
{
    public ProdutoDTO() { }
    public ProdutoDTO(Produto prod)
    {
        Id = prod.Id.ToString();
        Nome = prod.Nome;
        Descricao = prod.Descricao;
        Quantidade = prod.Quantidade;
        Preco = prod.Preco;
        Imagem = prod.Imagem;
    }

    public string Id { get; set; } = string.Empty;
    public string Nome { get; set; } = string.Empty;
    public string Descricao { get; set; } = string.Empty;
    public int Quantidade { get; set; } = 0;
    public decimal Preco { get; set; } = 0;
    public string Imagem { get; set; } = string.Empty;

    public Produto GetModel()
    {
        var produto = new Produto();
        FillModel(produto);

        return produto;
    }

    public void FillModel(Produto prod)
    {
        long.TryParse(this.Id, out long id);
        prod.Id = id;
        prod.Nome = this.Nome;
        prod.Descricao = this.Descricao;
        prod.Quantidade = this.Quantidade;
        prod.Preco = this.Preco;
        prod.Imagem = this.Imagem;
    } 
}
