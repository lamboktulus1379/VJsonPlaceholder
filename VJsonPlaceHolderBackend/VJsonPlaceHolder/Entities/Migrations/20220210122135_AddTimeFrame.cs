using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Entities.Migrations
{
    public partial class AddTimeFrame : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TimeFrame",
                table: "CommentAnalysis",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_CommentAnalysis_CommentId",
                table: "CommentAnalysis",
                column: "CommentId");

            migrationBuilder.AddForeignKey(
                name: "FK_CommentAnalysis_Comments_CommentId",
                table: "CommentAnalysis",
                column: "CommentId",
                principalTable: "Comments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CommentAnalysis_Comments_CommentId",
                table: "CommentAnalysis");

            migrationBuilder.DropIndex(
                name: "IX_CommentAnalysis_CommentId",
                table: "CommentAnalysis");

            migrationBuilder.DropColumn(
                name: "TimeFrame",
                table: "CommentAnalysis");
        }
    }
}
