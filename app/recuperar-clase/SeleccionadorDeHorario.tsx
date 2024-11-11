"use client"
import { Calendar } from "@/components/ui/calendar"
import { addDays } from "date-fns"
import { useState } from "react"

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

export default function SeleccionadorDeHorario() {
    const [date, setDate] = useState<Date | undefined>(new Date())

    return (
        <div className="flex items-center justify-center gap-4 my-4">

            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                disabled={(date) =>
                    date < new Date() || date > addDays(new Date(), 35)
                }
            />
            <HoariosDisponibles horarios={["10:00", "11:00", "12:00", "13:00", "14:00"]} />
        </div>
    )

}