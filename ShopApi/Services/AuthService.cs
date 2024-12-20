using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ShopApi.DTOs;
using ShopApi.Models;
using ShopApi.Infra;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ShopApi.Services;

public class AuthService
{
    private readonly ShopContext _context;
    private readonly IPasswordHasher<Usuario> _passwordHasher;
    private readonly IConfiguration _configuration;

    public AuthService(ShopContext context, IPasswordHasher<Usuario> passwordHasher, IConfiguration configuration)
    {
        _context = context;
        _passwordHasher = passwordHasher;
        _configuration = configuration;
    }


    public async Task<UsuarioDTO?> RegisterAsync(UsuarioDTO dto, string password)
    {
        if (await _context.Usuarios.AnyAsync(u => u.Email == dto.Email))
        {
            return null; 
        }

        var usuario = dto.GetModel();
        usuario.HashSenha = _passwordHasher.HashPassword(usuario, password);
        usuario.Id = IdGenerator.GetId(); 

        await _context.Usuarios.AddAsync(usuario);
        await _context.SaveChangesAsync();

        return new UsuarioDTO(usuario);
    }

    public async Task<string?> LoginAsync(LoginDTO loginDto)
    {
        var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == loginDto.Email);

        if (usuario == null)
        {
            return null; 
        }

        var result = _passwordHasher.VerifyHashedPassword(usuario, usuario.HashSenha, loginDto.Senha);
        if (result == PasswordVerificationResult.Failed)
        {
            return null;
        }
        
        return GenerateJwtToken(usuario); 
    }

    private string GenerateJwtToken(Usuario usuario)
{
#pragma warning disable CS8604 // Possible null reference argument.
    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
#pragma warning restore CS8604 // Possible null reference argument.
    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

    var claims = new List<Claim>
    {
        new Claim(JwtRegisteredClaimNames.Sub, usuario.Id.ToString()),
        new Claim(ClaimTypes.Name, usuario.Email),
        new Claim(ClaimTypes.Role, usuario.Admin ? "Admin" : "User")
    };

    var usuarioDTO = new UsuarioDTO(usuario);
    claims.AddRange(new[]
    {
        new Claim("UsuarioDTO", System.Text.Json.JsonSerializer.Serialize(usuarioDTO))
    });

    var token = new JwtSecurityToken(
        issuer: _configuration["Jwt:Issuer"],
        audience: _configuration["Jwt:Audience"],
        claims: claims,
        expires: DateTime.UtcNow.AddHours(1),
        signingCredentials: credentials
    );

    var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);

    Console.WriteLine("Token Gerado: " + jwtToken);

    return jwtToken;
}

}
