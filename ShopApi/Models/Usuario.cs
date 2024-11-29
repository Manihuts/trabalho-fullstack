using System;

namespace ShopApi.Models;

public class Usuario
{
    public long Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string HashSenha { get; set; } = string.Empty;
    public bool Admin { get; set; } = false;
    public decimal Saldo { get; set; } = 100000;

    public List<Inventario> Inventario { get; set; } = new List<Inventario>();
}
