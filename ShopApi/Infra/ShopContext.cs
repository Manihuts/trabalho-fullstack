using System;
using Microsoft.EntityFrameworkCore;
using ShopApi.Models;

namespace ShopApi.Infra;

public class ShopContext : DbContext
{
    public DbSet<Produto> Produtos { get; set; }
    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Carrinho> Carrinhos { get; set; } 
    public DbSet<Inventario> Inventarios { get; set; }
    public DbSet<ItemCarrinho> ItensCarrinho { get; set; }
    
    private readonly string path;

    public ShopContext()
    {
        path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "produto.db");
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        options.UseSqlite($"Data Source={path}");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Usuario>()
            .HasOne(u => u.Carrinho)
            .WithOne(c => c.Usuario)
            .HasForeignKey<Carrinho>(c => c.UsuarioId);

        modelBuilder.Entity<Carrinho>()
            .HasMany(c => c.Itens)
            .WithOne(i => i.Carrinho)
            .HasForeignKey(i => i.CarrinhoId);

        modelBuilder.Entity<ItemCarrinho>()
            .HasOne(i => i.Produto)
            .WithMany()
            .HasForeignKey(i => i.ProdutoId);

        modelBuilder.Entity<Usuario>()
            .HasMany(u => u.Inventario)
            .WithOne(i => i.Usuario)
            .HasForeignKey(i => i.UsuarioId);

        modelBuilder.Entity<Inventario>()
            .HasOne(i => i.Produto)
            .WithMany()
            .HasForeignKey(i => i.ProdutoId);
    }
}
