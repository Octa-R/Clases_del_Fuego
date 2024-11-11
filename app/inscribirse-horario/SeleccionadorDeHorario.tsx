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
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

function HorariosDisponibles({ horarios,onValueChange, value }: any) {
    return (
        <RadioGroup
            onValueChange={onValueChange}
            defaultValue={value}
            className="grid w-full grid-cols-2 gap-2" >
                {horarios!.map((horario:string, index:any) => {
                    return (
                        <div key={index}>
                            <RadioGroupItem
                                className="hidden"
                                value={horario}
                                id={horario}
                                key={horario}
                            />
                            <Button
                                asChild
                                variant={horario === value ? "default" : "outline"}
                                className="select-none w-full"
                            >
                                <Label
                                    htmlFor={horario}
                                >
                                    {horario.slice(0,5)}
                                </Label>
                            </Button>
                        </div>
                    )
                })}
        </RadioGroup>
    )
}

function SeleccionadorDeDia({ data,onDiaSelected, onValueChange, value }: any) {
    return (
        <RadioGroup
            key="asd"
            onValueChange={(v) => {
                onValueChange(v)
                onDiaSelected(v)
            }}
            defaultValue={value}
            className="grid w-full grid-cols-2 gap-2" >
            {data.dias_disponibles.map((dia:string,index: number) => {
                return (
                    <div key={dia}>
                        <RadioGroupItem
                            className="hidden"
                            value={dia}
                            id={dia}
                            key={dia}
                        />
                        <Button
                            asChild
                            variant={dia === value ? "default" : "outline"}
                            className="select-none w-full"
                        >
                            <Label
                                htmlFor={dia}
                            >
                                {dia}
                            </Label>
                        </Button>
                    </div>
                )
            })}
        </RadioGroup>
    )
}

const formSchema = z.object({
    dia: z.string().min(1),
    hora: z.string().min(1),
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
enum Dias {
    LUNES = "LUNES",
    MARTES = "MARTES",
    MIERCOLES = "MIERCOLES",
    JUEVES = "JUEVES",
    VIERNES = "VIERNES",
    SABADO = "SABADO",
    DOMINGO = "DOMINGO",
}
export default function SeleccionadorDeHorario({data}:{data:HorariosDeCadaDia}) {
    const [horarios, setHorarios] = useState<any[]>([])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    const handleDiaChange = (value: Dias) => {
        setHorarios(data.horarios_por_dia[value] || [])
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
                        name="hora"
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