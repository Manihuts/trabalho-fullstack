namespace ShopApi.DTOs;

public class OperacaoCompraDTO
{
    public long UsuarioId { get; set; }
    public long ProdutoId { get; set; }
    public int Quantidade { get; set; }
}
