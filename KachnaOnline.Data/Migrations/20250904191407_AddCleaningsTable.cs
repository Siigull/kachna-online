using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace KachnaOnline.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddCleaningsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cleanings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    MadeById = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "character varying(128)", maxLength: 128, nullable: false),
                    Place = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    CleaningInstructions = table.Column<string>(type: "text", nullable: false),
                    AssignedUsersIds = table.Column<List<int>>(type: "integer[]", nullable: true),
                    IdealParticipantsCount = table.Column<int>(type: "integer", nullable: false),
                    Finished = table.Column<bool>(type: "boolean", nullable: false),
                    From = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    To = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cleanings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Cleanings_Users_MadeById",
                        column: x => x.MadeById,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cleanings_MadeById",
                table: "Cleanings",
                column: "MadeById");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Cleanings");
        }
    }
}
