"use client"
import { Horario } from "@/app/types"
import { HorarioForm } from "../HorarioForm"
import { updateHorarioAction } from "@/app/actions"

export function ActualizarHorario({horario}:any) {
    const onSubmit = (horarioData:Horario) => {
        updateHorarioAction(horario.id, horarioData)
    }
    return (
        <div>
            <HorarioForm onSubmit={onSubmit} horarioData={horario} />
        </div>
    )
}