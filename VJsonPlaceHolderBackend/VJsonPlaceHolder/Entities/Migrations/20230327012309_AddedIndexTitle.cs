using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Entities.Migrations
{
    /// <inheritdoc />
    public partial class AddedIndexTitle : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Comments_CreatedAt_UpdatedAt",
                table: "Comments");

            migrationBuilder.DropColumn(
                name: "WPM",
                table: "Comments");

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "Comments",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Comments_CreatedAt_UpdatedAt_Title",
                table: "Comments",
                columns: new[] { "CreatedAt", "UpdatedAt", "Title" },
                descending: new[] { true, true, false });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Comments_CreatedAt_UpdatedAt_Title",
                table: "Comments");

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "Comments",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<double>(
                name: "WPM",
                table: "Comments",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.CreateIndex(
                name: "IX_Comments_CreatedAt_UpdatedAt",
                table: "Comments",
                columns: new[] { "CreatedAt", "UpdatedAt" },
                descending: new bool[0]);
        }
    }
}
