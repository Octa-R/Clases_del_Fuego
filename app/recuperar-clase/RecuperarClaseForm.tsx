"use client"
import { Calendar } from "@/components/ui/calendar"
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
import { useToastMessages } from "@/components/hooks/useToastMessages"
import { es } from "date-fns/locale"
import { HorariosDisponibles } from "../inscribirse-horario/HorariosDisponibles"

function HoariosDisponibles({ horarios }: { horarios: any[] }) {
    return (
        <ul id="timetable" className="grid w-full grid-cols-2 gap-2">
            {horarios!.map((horario) => {
                return (
                    <li key={horario.id}>
                        <input type="radio" id="10-am" value="" className="hidden peer" name="timetable" />
                        <label htmlFor="10-am"
                            className="inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-gray-700 border-gray-200 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-gray-900  peer-checked:text-white hover:bg-gray-100 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-blue-500"
                        >
                            {horario}
                        </label>
                    </li>
                )
            })}
        </ul>
    )
}
const formSchema = z.object({
    dia: z.string().min(1),
    horario_id: z.number().min(1),
})
export default function RecuperarClaseForm() {
    useToastMessages()
    const [horarios, setHorarios] = useState<any[]>([])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    // const handleDiaChange = (value: CodigoDias) => {
    //     setHorarios(data.horarios_por_dia[value] || [])
    // }

    const onSubmit = ({horario_id}:any) => {
    }

    const isDisabled = (date:Date) => {
            return date < new Date() || date.getDay() === 0 || date.getDay() === 6
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
                                    <Calendar
                                        onDayClick={(day) => {
                                            const dayOfWeek = day.toLocaleDateString('en-US', { weekday: 'long' });
                                            console.log(dayOfWeek);
                                            field.onChange(day.toISOString().split('T')[0]);
                                        }}
                                        locale={es}
                                        disabled={isDisabled}
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