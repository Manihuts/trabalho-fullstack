using ShopApi.DTOs;
using ShopApi.Services;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

namespace ShopApi.Endpoints;

public static class OperacoesEndpoints
{
    public static void AddOperacoesEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/operacoes").RequireAuthorization();

        group.MapPost("/comprar", ComprarProdutoAsync)
             .WithName("ComprarProduto")
             .WithOpenApi();

        group.MapPost("/vender", VenderProdutoAsync)
             .WithName("VenderProduto")
             .WithOpenApi();
    }

    private static async Task<IResult> ComprarProdutoAsync(OperacaoCompraDTO compraDto, HttpContext httpContext, OperacoesService service)
    {
        if (!UsuarioValido(httpContext, compraDto.UsuarioId))
            return TypedResults.Unauthorized();

        var resultado = await service.ComprarProdutoAsync(compraDto);
        return TypedResults.Ok(new { Mensagem = resultado });
    }

    private static async Task<IResult> VenderProdutoAsync(OperacaoVendaDTO vendaDto, HttpContext httpContext, OperacoesService service)
    {
        if (!UsuarioValido(httpContext, vendaDto.UsuarioId))
            return TypedResults.Unauthorized();

        var resultado = await service.VenderProdutoAsync(vendaDto);
        return TypedResults.Ok(new { Mensagem = resultado });
    }
private static bool UsuarioValido(HttpContext httpContext, long usuarioId)
{
    foreach (var claim in httpContext.User.Claims)
    {
        Console.WriteLine($"Claim: {claim.Type}, Value: {claim.Value}");
    }
    var userIdClaim = httpContext.User.Claims
                                     .FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;

    Console.WriteLine("UserIdClaim encontrado: " + userIdClaim);
    if (userIdClaim == null)
    {
        Console.WriteLine("Claim 'nameidentifier' não encontrada!");
        return false;
    }
    string userIdClaimString = userIdClaim.ToString();
    string usuarioIdString = usuarioId.ToString();
    Console.WriteLine($"ID da claim: {userIdClaimString}");
    Console.WriteLine($"ID do usuário: {usuarioIdString}");
    if (userIdClaimString == usuarioIdString)
    {
        return true;
    }
    Console.WriteLine("ID da claim não corresponde ao ID do usuário.");
    return false;
}

}
