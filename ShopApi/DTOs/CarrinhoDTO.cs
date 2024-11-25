using System;
using System.Numerics;
using ShopApi.Models;

namespace ShopApi.DTOs;

public class CarrinhoDTO
{
    public CarrinhoDTO() { }
    public CarrinhoDTO(Carrinho car)
    {
        Id = car.Id.ToString();
        UsuarioId = car.UsuarioId.ToString();
        Usuario = car.Usuario != null ? new UsuarioDTO(car.Usuario) : null;
        Total = car.Total;
        Itens = car.Itens?.Select(i => new ItemCarrinhoDTO(i)).ToList() ?? new List<ItemCarrinhoDTO>();
    }

    public string Id { get; set; }
    public string UsuarioId { get; set; }
    public UsuarioDTO? Usuario  { get; set; } 
    public decimal Total { get; set; }
    public List<ItemCarrinhoDTO> Itens { get; set; } = new List<ItemCarrinhoDTO>();

    public Carrinho GetModel()
    {
        var carrinho = new Carrinho();
        FillModel(carrinho);

        return carrinho;
    }

    public void FillModel(Carrinho car)
    {
        long.TryParse(this.Id, out long id);
        car.Id = id;
        long.TryParse(this.UsuarioId, out long usuarioId);
        car.UsuarioId = usuarioId;
        car.Usuario = this.Usuario != null ? this.Usuario.GetModel() : null;
        car.Total = this.Total;
        car.Itens = this.Itens?.ConvertAll(i => i.GetModel()) ?? new List<ItemCarrinho>();
    }
}
