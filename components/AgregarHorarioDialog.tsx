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
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { differenceInMinutes,parse,isBefore, isAfter } from "date-fns";
import { createHorarioAction } from "@/app/actions";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import TimePickerComponent from "@/components/TimePicker";

const nuevoHorarioFormSchema = z.object({
    dia: z.string().max(10),
    hora_inicio: z.string().max(8),
    hora_fin: z.string().max(8),
}).refine(data => {
    const start = parse(data.hora_inicio, 'HH:mm', new Date());
    const end = parse(data.hora_fin, 'HH:mm', new Date());
    return differenceInMinutes(end, start) <= 240; // 4 hours * 60 minutes
}, {
    message: "El horario no puede superar las 4 horas.",
    path: ["hora_fin"],
}).refine(data => {
    const start = parse(data.hora_inicio, 'HH:mm', new Date());
    const end = parse(data.hora_fin, 'HH:mm', new Date());
    return isBefore(start, end); // Ensure start time is before end time
}, {
    message: "La hora de inicio debe ser antes de la hora de finalización.",
    path: ["hora_inicio"],
}).refine(data => {
    const start = parse(data.hora_inicio, 'HH:mm', new Date());
    return isBefore(start, parse("22:00", 'HH:mm', new Date()))
    && isAfter(start, parse("06:59", 'HH:mm', new Date()))
}, {
    message: "la clase debe ser en horario laboral.",
    path: ["hora_inicio"],
})
.refine(data => {
    const end = parse(data.hora_fin, 'HH:mm', new Date());
    return isBefore(end, parse("22:59", 'HH:mm', new Date()))
    && isAfter(end, parse("06:59", 'HH:mm', new Date()))
}, {
    message: "la clase debe ser en horario laboral.",
    path: ["hora_fin"],
})

export function AgregarHorarioDialog() {
    const searchParams = useSearchParams();
    let succesMessage = searchParams.get("success");
    let errorMessage = searchParams.get("error");
    const params = new URLSearchParams(searchParams.toString())
    const { push } = useRouter();

    useEffect(() => {
        if(succesMessage) {
            toast.success(succesMessage)
            params.delete("success")
        }
        if(errorMessage) {
            toast.error(errorMessage)
            params.delete("error")
        }
        console.log("params")
        push("/horarios")
    },[succesMessage, errorMessage])

    const form = useForm<z.infer<typeof nuevoHorarioFormSchema>>({
        resolver: zodResolver(nuevoHorarioFormSchema),
        defaultValues: {
            hora_inicio: "07:00",
            hora_fin: "09:00",
        },
    })

    function onSubmit(values: z.infer<typeof nuevoHorarioFormSchema>) {
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
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <DialogHeader>
                        <DialogTitle>Agregar Horario</DialogTitle>
                        <DialogDescription>
                            Ingresá los datos del nuevo horario
                        </DialogDescription>
                    </DialogHeader>
                    <FormField
                        control={form.control}
                        name="dia"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-right">Dia de la semana</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value} >
                                            <SelectTrigger className="">
                                                <SelectValue placeholder="Dia" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="LUNES">Lunes</SelectItem>
                                                <SelectItem value="MARTES">Martes</SelectItem>
                                                <SelectItem value="MIERCOLES">Miercoles</SelectItem>
                                                <SelectItem value="JUEVES">Jueves</SelectItem>
                                                <SelectItem value="VIERNES">Viernes</SelectItem>
                                                <SelectItem value="SABADO">Sabado</SelectItem>
                                                <SelectItem value="DOMINGO">Domingo</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="hora_inicio"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-right">Hora de Inicio</FormLabel>
                                    <FormControl>
                                        <TimePickerComponent value={field.value} onChange={field.onChange}/>
                                    </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="hora_fin"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-right">Hora de Finalización</FormLabel>
                                    <FormControl>
                                        <TimePickerComponent value={field.value} onChange={field.onChange}/>
                                    </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <DialogFooter>
                            <Button type="submit">Agregar</Button>
                    </DialogFooter>
                </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}