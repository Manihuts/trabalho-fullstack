using ShopApi.DTOs;
using ShopApi.Services;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

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
        var userIdClaim = httpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        return userIdClaim != null && long.TryParse(userIdClaim, out var userIdFromToken) && userIdFromToken == usuarioId;
    }
}
