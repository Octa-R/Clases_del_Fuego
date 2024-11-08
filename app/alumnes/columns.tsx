"use client"
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link, MoreHorizontal, Pencil, PencilIcon, Router, TrashIcon, X } from "lucide-react"
import { use } from "react";
import { useRouter } from "next/navigation";

export const Alumno = z.object({
    id: z.number(),
    nombre: z.string(),
    apellido: z.string(),
    email: z.string(),
    fecha_nacimiento: z.string(),
    observaciones: z.string(),
    inscripciones: z.array(z.object({ }))
});

export const columns: ColumnDef<typeof Alumno>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "nombre",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    nombre
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "apellido",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    apellido
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "observaciones",
        header: "observaciones",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const alumno: any = row.original
            const router = useRouter()
            return (
                <div className="flex gap-2">
                    <Button onClick={() => router.push('/alumnes/1')} variant="outline" size="icon" color="green-600">
                        <PencilIcon />
                    </Button>
                    <Button variant="destructive" size="icon">
                        <TrashIcon />
                    </Button>
                </div>
            )
        },
    },
]