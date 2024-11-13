"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { inscribirseHorarioAction } from "../actions"
import { Alumno, CodigoDias } from "../types"
import { SeleccionadorDeDia } from "./SeleccionadorDeDia"
import { HorariosDisponibles } from "./HorariosDisponibles"
import { useToastMessages } from "@/hooks/useToastMessages"

const formSchema = z.object({
    dia: z.string().min(1),
    horario_id: z.number().min(1),
})

interface HorariosDeCadaDia {
    horarios_por_dia: {
        LUNES?: string[]
        MARTES?: string[]
        MIERCOLES?: string[]
        JUEVES?: string[]
        VIERNES?: string[]
        SABADO?: string[]
        DOMINGO?: string[]
    }
    dias_disponibles: string[]
}
interface InscribirseHorarioFormProps {
    data: HorariosDeCadaDia;
    alumno: Alumno
}

export function InscribirseHorarioForm({data,alumno}: InscribirseHorarioFormProps) {
    useToastMessages()
    const [horarios, setHorarios] = useState<any[]>([])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const handleDiaChange = (value: CodigoDias) => {
        setHorarios(data.horarios_por_dia[value] || [])
    }

    const onSubmit = ({horario_id}:any) => {
        inscribirseHorarioAction({horario_id,alumno_id:alumno.id});
    }

    return (
        <div className="flex items-center justify-center gap-4 my-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="dia"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Selecciona un día</FormLabel>
                                <FormControl>
                                    <SeleccionadorDeDia
                                        onDiaSelected={handleDiaChange}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        data={data}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="horario_id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Selecciona un Horario</FormLabel>
                                <FormControl>
                                    <HorariosDisponibles
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        horarios={horarios}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Inscribirse</Button>
                </form>
            </Form>
        </div>
    )
}