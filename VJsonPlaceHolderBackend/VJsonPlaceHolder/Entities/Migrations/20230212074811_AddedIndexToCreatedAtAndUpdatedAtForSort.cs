using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Entities.Migrations
{
    /// <inheritdoc />
    public partial class AddedIndexToCreatedAtAndUpdatedAtForSort : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Comments_CreatedAt_UpdatedAt",
                table: "Comments",
                columns: new[] { "CreatedAt", "UpdatedAt" },
                descending: new bool[0]);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Comments_CreatedAt_UpdatedAt",
                table: "Comments");
        }
    }
}
