using System;

namespace ShopApi.Models;

public class Produto
{
    public long Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string Descricao { get; set; } = string.Empty;
    public int Quantidade { get; set; } = 0;
    public decimal Preco { get; set; } = 0;
    public string Imagem { get; set; } = string.Empty;
}
