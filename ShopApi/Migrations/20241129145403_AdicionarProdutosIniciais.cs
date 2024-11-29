using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopApi.Migrations
{
    /// <inheritdoc />
    public partial class AdicionarProdutosIniciais : Migration
    {
         protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                INSERT INTO Produtos (Nome, Descricao, Quantidade, Preco, Imagem) 
                VALUES 
                ('Bright Sword', 'Espada de uma mão com ataque 36 e defesa 30 (+1). Requer nível 30 para ser utilizada. Possui 2 slots de imbuement e é classificada como Tier 2.', 15, 500, 'https://www.tibiawiki.com.br/images/1/18/Bright_Sword.gif'),
                ('Blade of Destruction', 'Espada de uma mão com ataque 50 e defesa 33. Requer nível 200 para ser utilizada. Possui 2 slots de imbuement e é classificada como Tier 2.', 5, 8000, 'https://www.tibiawiki.com.br/images/c/cb/Blade_of_Destruction.gif'),
                ('Summerblade', 'Espada de uma mão com ataque 10 + 41 de dano de fogo e defesa 20 (+3). Concede bônus de +1 em Sword Fighting. Requer nível 200 para ser utilizada. Possui 2 slots de imbuement e é classificada como Tier 3.', 3, 12000, 'https://www.tibiawiki.com.br/images/7/78/Summerblade.gif'),
                ('Blacksteel Sword', 'Espada de duas mãos com ataque 42 e defesa 22. Requer nível 35 para ser utilizada. Possui 2 slots de imbuement e é classificada como Tier 2.', 10, 1500, 'https://www.tibiawiki.com.br/images/6/63/Blacksteel_Sword.gif'),
                ('Crystalline Sword', 'Espada de uma mão com ataque 47 e defesa 34 (+1). Requer nível 62 para ser utilizada. Possui 2 slots de imbuement e é classificada como Tier 2.', 8, 3000, 'https://www.tibiawiki.com.br/wiki/Arquivo:Crystalline_Sword.gif'),
                ('The Justice Seeker', 'Espada de uma mão com ataque 45 e defesa 30 (+1). Requer nível 75 para ser utilizada. Possui 2 slots de imbuement e é classificada como Tier 2.', 7, 4000, 'https://www.tibiawiki.com.br/wiki/Arquivo:The_Justice_Seeker.gif');
            ");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                DELETE FROM Produtos WHERE Nome IN 
                ('Bright Sword', 'Blade of Destruction', 'Summerblade', 'Blacksteel Sword', 'Crystalline Sword', 'The Justice Seeker');
            ");
        }
    }
}
