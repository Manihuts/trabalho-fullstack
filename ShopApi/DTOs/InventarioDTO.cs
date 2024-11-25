using System;
using ShopApi.Models;

namespace ShopApi.DTOs;

public class InventarioDTO
{
    public InventarioDTO() { }
    public InventarioDTO(Inventario inventario)
    {
        Id = inventario.Id.ToString();
        UsuarioId = inventario.UsuarioId.ToString();
        ProdutoId = inventario.ProdutoId.ToString();
        ProdutoNome = inventario.Produto?.Nome ?? string.Empty;
        Quantidade = inventario.Quantidade;
    }

    public string Id { get; set; } = string.Empty;
    public string UsuarioId { get; set; } = string.Empty;
    public string ProdutoId { get; set; } = string.Empty;
    public string ProdutoNome { get; set; } = string.Empty;
    public int Quantidade { get; set; } = 0;

    public Inventario GetModel()
    {
        var inventario = new Inventario();
        FillModel(inventario);

        return inventario;
    }

    public void FillModel(Inventario inventario)
    {
        long.TryParse(this.Id, out long id);
        inventario.Id = id;
        long.TryParse(this.UsuarioId, out long usuarioId);
        inventario.UsuarioId = usuarioId;
        long.TryParse(this.ProdutoId, out long produtoId);
        inventario.ProdutoId = produtoId;
        inventario.Quantidade = this.Quantidade;
        
    }
}   
