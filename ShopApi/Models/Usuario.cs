using System;

namespace ShopApi.Models;

public class Usuario
{
    public long Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Senha { get; set; } = string.Empty;
    public bool Admin { get; set; } = false;
    public decimal Saldo { get; set; } = 1000;
    public Carrinho Carrinho { get; set; } = new Carrinho();
    public List<Inventario> Inventario { get; set; } = new List<Inventario>();
}
