using System.ComponentModel.DataAnnotations.Schema;

namespace ShopApi.Models
{
    public class Inventario
    {
        public long Id { get; set; }
        public long UsuarioId { get; set; } 
        [ForeignKey("UsuarioId")]
        public Usuario? Usuario { get; set; }
        public long ProdutoId { get; set; }
        [ForeignKey("ProdutoId")]
        public Produto? Produto { get; set; }
        public int Quantidade { get; set; }
    }
}
