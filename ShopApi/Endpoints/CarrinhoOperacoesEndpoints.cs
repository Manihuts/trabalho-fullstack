using ShopApi.DTOs;
using ShopApi.Services;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

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

    // Função auxiliar para validar se o ID do usuário no token corresponde ao ID solicitado
    private static bool UsuarioValido(HttpContext httpContext, long usuarioId)
    {
        var userIdClaim = httpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        if (userIdClaim == null || !long.TryParse(userIdClaim, out var userIdFromToken))
            return false;

        return userIdFromToken == usuarioId;
    }
}
