using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Pandauth.API.Migrations
{
    /// <inheritdoc />
    public partial class RemoveSampleData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 3);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Books",
                columns: new[] { "Id", "AuthorName", "Created", "CreatedBy", "LastModified", "LastModifiedBy", "Title", "Year" },
                values: new object[,]
                {
                    { 1, "George Orwell", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Sean Rodriguez", null, null, "1984", 1949 },
                    { 2, "Aldous Huxley", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Sean Rodriguez", null, null, "Brave New World", 1932 },
                    { 3, "Ray Bradbury", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Sean Rodriguez", null, null, "Fahrenheit 451", 1953 }
                });
        }
    }
}
