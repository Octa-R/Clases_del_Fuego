"use client"
import { CirclePlusIcon } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { z } from "zod"
import { createHorarioAction } from "@/app/actions";
import { HorarioForm, HorarioSchema } from "./HorarioForm";
import { useToastMessages } from "@/components/hooks/useToastMessages";

export function AgregarHorarioDialog() {
    useToastMessages()

    function onSubmit(values: z.infer<typeof HorarioSchema>) {
        createHorarioAction(values)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline"  >
                    <CirclePlusIcon />Nuevo Horario
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Agregar Horario</DialogTitle>
                    <DialogDescription>
                        Ingresá los datos del nuevo horario
                    </DialogDescription>
                </DialogHeader>
                <HorarioForm onSubmit={onSubmit} />
                <DialogFooter>
                    <Button type="submit">Agregar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}