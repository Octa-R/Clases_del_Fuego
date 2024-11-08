"use client"
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch";

export const Inscripcion = z.object({
    id: z.number(),
    activo: z.boolean(),
    horarios: z.array(z.object({ }))
});

export const columns: ColumnDef<typeof Inscripcion>[] = [
    {
        accessorKey: "activo",
        cell: ({ row }) => {
            const a:any = row.original;
            return (
                <Switch
                    checked={a.activo}
                />
            )
        },
    },
    {
        "accessorKey": "horarios.dia_semana",
        "header": "dia_semana"
    },
    {
        "accessorKey": "horarios.hora_inicio",
        "header": "hora_inicio"
    }
]