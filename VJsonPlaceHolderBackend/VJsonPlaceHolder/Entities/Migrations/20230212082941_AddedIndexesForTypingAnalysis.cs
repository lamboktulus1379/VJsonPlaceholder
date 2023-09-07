using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Entities.Migrations
{
    /// <inheritdoc />
    public partial class AddedIndexesForCommentAnalysis : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_CommentAnalysis_CreatedAt",
                table: "CommentAnalysis",
                column: "CreatedAt",
                descending: new bool[0]);

            migrationBuilder.CreateIndex(
                name: "IX_CommentAnalysis_UserId_CommentId_ScoreId",
                table: "CommentAnalysis",
                columns: new[] { "UserId", "CommentId", "ScoreId" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_CommentAnalysis_CreatedAt",
                table: "CommentAnalysis");

            migrationBuilder.DropIndex(
                name: "IX_CommentAnalysis_UserId_CommentId_ScoreId",
                table: "CommentAnalysis");
        }
    }
}
