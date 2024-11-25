using System.ComponentModel.DataAnnotations.Schema;

namespace ShopApi.Models;

public class Carrinho
{
    public long Id { get; set; }
    public long UsuarioId { get; set; }
    [ForeignKey("UsuarioId")]
    public Usuario? Usuario  { get; set; } 
    public decimal Total { get; set; }
    public List<ItemCarrinho> Itens { get; set; } = [];
}