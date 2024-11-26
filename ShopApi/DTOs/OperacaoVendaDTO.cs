namespace ShopApi.DTOs;

public class OperacaoVendaDTO
{
    public long UsuarioId { get; set; }
    public long ProdutoId { get; set; }
    public int Quantidade { get; set; }
}
