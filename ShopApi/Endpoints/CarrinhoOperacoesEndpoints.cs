using ShopApi.DTOs;
using ShopApi.Services;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

namespace ShopApi.Endpoints;

public static class CarrinhoOperacoesEndpoints
{
    public static void AddCarrinhoOperacoesEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/carrinho/operacoes")
                       .RequireAuthorization(); 
        group.MapGet("/total/{usuarioId}", ObterValorTotalAsync);
        group.MapPut("/alterar", AlterarItemCarrinhoAsync);
        group.MapPost("/finalizar/{usuarioId}", FinalizarCompraAsync);
    }

    private static async Task<IResult> ObterValorTotalAsync(long usuarioId, HttpContext httpContext, CarrinhoOperacoesService service)
    {
        if (!UsuarioValido(httpContext, usuarioId))
            return TypedResults.Unauthorized();

        try
        {
            var total = await service.ObterValorTotalAsync(usuarioId);
            return TypedResults.Ok(new { Total = total });
        }
        catch (Exception ex)
        {
            return TypedResults.BadRequest(new { Error = ex.Message });
        }
    }

    private static async Task<IResult> AlterarItemCarrinhoAsync(long usuarioId, ItemCarrinhoDTO itemDto, HttpContext httpContext, CarrinhoOperacoesService service)
    {
        if (!UsuarioValido(httpContext, usuarioId))
            return TypedResults.Unauthorized();

        var resultado = await service.AlterarItemCarrinhoAsync(usuarioId, itemDto);
        return TypedResults.Ok(resultado);
    }

    private static async Task<IResult> FinalizarCompraAsync(long usuarioId, HttpContext httpContext, CarrinhoOperacoesService service)
    {
        if (!UsuarioValido(httpContext, usuarioId))
            return TypedResults.Unauthorized();

        var resultado = await service.FinalizarCompraAsync(usuarioId);
        return TypedResults.Ok(new { Resultado = resultado });
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
