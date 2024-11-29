using System;
using ShopApi.Models;

namespace ShopApi.DTOs;

public class UsuarioDTO
{
    public UsuarioDTO() { }
    public UsuarioDTO(Usuario usuario) 
    {
        Id = usuario.Id.ToString();
        Nome = usuario.Nome;
        Email = usuario.Email;
        Admin = usuario.Admin;
        Saldo = usuario.Saldo;
        
    }

    public string Id { get; set; } = string.Empty;
    public string Nome { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public bool Admin { get; set; } = false;
    public decimal Saldo { get; set; } = 1000;


    public Usuario GetModel()
    {
        var usuario = new Usuario();
        FillModel(usuario);

        return usuario;
    }

    public void FillModel(Usuario usuario)
    {
        long.TryParse(this.Id, out long id);
        usuario.Id = id;
        usuario.Nome = this.Nome;
        usuario.Email = this.Email;
        usuario.Admin = this.Admin;
        usuario.Saldo = this.Saldo;
    }
}
