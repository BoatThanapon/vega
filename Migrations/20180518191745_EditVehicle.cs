﻿using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace vega.Migrations
{
    public partial class EditVehicle : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VehicleFeatures_Vehicles_VehicleId",
                table: "VehicleFeatures");

            migrationBuilder.DropPrimaryKey(
                name: "PK_VehicleFeatures",
                table: "VehicleFeatures");

            migrationBuilder.DropIndex(
                name: "IX_VehicleFeatures_VehicleId",
                table: "VehicleFeatures");

            migrationBuilder.DropColumn(
                name: "VihicleId",
                table: "VehicleFeatures");

            migrationBuilder.AlterColumn<int>(
                name: "VehicleId",
                table: "VehicleFeatures",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_VehicleFeatures",
                table: "VehicleFeatures",
                columns: new[] { "VehicleId", "FeatureId" });

            migrationBuilder.AddForeignKey(
                name: "FK_VehicleFeatures_Vehicles_VehicleId",
                table: "VehicleFeatures",
                column: "VehicleId",
                principalTable: "Vehicles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VehicleFeatures_Vehicles_VehicleId",
                table: "VehicleFeatures");

            migrationBuilder.DropPrimaryKey(
                name: "PK_VehicleFeatures",
                table: "VehicleFeatures");

            migrationBuilder.AlterColumn<int>(
                name: "VehicleId",
                table: "VehicleFeatures",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "VihicleId",
                table: "VehicleFeatures",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_VehicleFeatures",
                table: "VehicleFeatures",
                columns: new[] { "VihicleId", "FeatureId" });

            migrationBuilder.CreateIndex(
                name: "IX_VehicleFeatures_VehicleId",
                table: "VehicleFeatures",
                column: "VehicleId");

            migrationBuilder.AddForeignKey(
                name: "FK_VehicleFeatures_Vehicles_VehicleId",
                table: "VehicleFeatures",
                column: "VehicleId",
                principalTable: "Vehicles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
