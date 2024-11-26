using System;
using ShopApi.Models;

namespace ShopApi.DTOs;

//Adicionado para o fluxo do login 
public class LoginDTO
{

    public string Email { get; set; } = string.Empty;
    public string Senha { get; set; } = string.Empty;


}
