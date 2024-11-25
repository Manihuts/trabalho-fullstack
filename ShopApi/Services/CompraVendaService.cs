// using System.Linq;
// using Microsoft.EntityFrameworkCore;
// using ShopApi.Infra;
// using ShopApi.Models;

// namespace ShopApi.Services;

// public class CompraVendaService
// {
//     private readonly ShopContext _context;

//     public CompraVendaService(ShopContext context)
//     {
//         _context = context;
//     }


//     public string Comprar(int usuarioId)
//     {
        
//         var usuario = _context.Usuarios.Find(usuarioId);
//         if (usuario == null)
//             return "Usuário não encontrado.";

   
//         var carrinho = _context.Carrinhos.Where(c => c.UsuarioId == usuarioId).ToList();

//         if (!carrinho.Any())
//             return "Carrinho vazio.";

  
//         var totalCompra = carrinho.Sum(c => c.Preco * c.Quantidade);


//         if (usuario.Saldo < totalCompra)
//             return "Saldo insuficiente.";

   
//         usuario.Saldo -= totalCompra;

 
//         foreach (var item in carrinho)
//         {
//             var inventario = _context.Inventarios
//                 .FirstOrDefault(i => i.UsuarioId == usuarioId && i.Nome == item.Nome);

//             if (inventario == null)
//             {
//                 _context.Inventarios.Add(new Inventario
//                 {
//                     UsuarioId = usuarioId,
//                     Nome = item.Nome,
//                     Descricao = item.Descricao,
//                     Preco = item.Preco,
//                     Quantidade = item.Quantidade
//                 });
//             }
//             else
//             {
                
//                 inventario.Quantidade += item.Quantidade;
//             }
//         }

   
//         _context.Carrinhos.RemoveRange(carrinho);

       
//         _context.SaveChanges();

//         return "Compra realizada com sucesso.";
//     }

//     public string Vender(int usuarioId, List<(string Nome, int Quantidade)> itens)
//     {
        
//         var usuario = _context.Usuarios.Find(usuarioId);
//         if (usuario == null)
//             return "Usuário não encontrado.";

       
//         foreach (var (nome, quantidade) in itens)
//         {
//             var inventario = _context.Inventarios
//                 .FirstOrDefault(i => i.UsuarioId == usuarioId && i.Nome == nome);

//             if (inventario == null || inventario.Quantidade < quantidade)
//                 return $"O usuário não possui {quantidade} unidades de {nome} no inventário.";

        
//             inventario.Quantidade -= quantidade;

            
//             if (inventario.Quantidade == 0)
//                 _context.Inventarios.Remove(inventario);

            
//             usuario.Saldo += quantidade * inventario.Preco;
//         }

    
//         _context.SaveChanges();

//         return "Venda realizada com sucesso.";
//     }
// }
