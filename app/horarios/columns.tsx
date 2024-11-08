"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, PencilIcon, TrashIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { z } from "zod";
import { useRouter } from "next/navigation"
import { ConfirmDialog } from "@/components/ConfirmDialog"
import { toast } from "sonner"
import { deleteHorarioAction } from "../actions"

export const Horario = z.object({
    id: z.number(),
    dia_semana: z.string(),
    hora_inicio: z.string(),
    hora_fin: z.string(),
    cupo_maximo: z.number(),
    cantidad_inscriptos: z.number(),
});

export const columns: ColumnDef<typeof Horario>[] = [
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
        accessorKey: "dia_semana",
        header: "Dia de la Semana",
    },
    {
        accessorKey: "hora_inicio",
        header: "Hora Inicio",
    },
    {
        accessorKey: "hora_fin",
        header: "Hora Fin",
    },
    {
        accessorKey: "cupo_maximo",
        header: "Cupo Máximo",
    },
    {
        accessorKey: "cantidad_inscriptos",
        header: "Cantidad de Inscriptos",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const h = row.original as any
            const router = useRouter()
            return (
                <div className="flex gap-2">
                    <Button onClick={() => router.push(`/horarios/${h.id}`)} variant="outline" size="icon" color="green-600">
                        <PencilIcon />
                    </Button>
                    <ConfirmDialog onConfirm={() => {
                        deleteHorarioAction(h.id)
                    }} >
                        <Button variant="destructive" size="icon" >
                            <TrashIcon />
                        </Button>
                    </ConfirmDialog>
                </div >
            )
        },
    },
]