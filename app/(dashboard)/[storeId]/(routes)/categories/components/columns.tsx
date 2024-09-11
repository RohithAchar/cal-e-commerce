"use client";

import { ColumnDef } from "@tanstack/react-table";

import CellActions from "./cell-action";

export type CategoriesColumn = {
  id: string;
  name: string;
  billboardLabel: string;
  createdAt: string;
};

export const columns: ColumnDef<CategoriesColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboardLabel",
    header: "Billboard",
    cell: ({ row }) => row.original.billboardLabel,
  },
  {
    accessorKey: "createdAt",
    header: "Date ",
  },
  {
    id: "actions",
    header: "Action",
    enableHiding: false,
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
