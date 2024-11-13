"use client"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Horario } from "../types"

interface HorariosDisponiblesProps {
    horarios: Horario[]
    onValueChange: (value: string) => void
    value: number
}

export function HorariosDisponibles({ horarios,onValueChange, value }: HorariosDisponiblesProps) {
    return (
        <RadioGroup
            onValueChange={onValueChange}
            defaultValue={""}
            className="grid w-full grid-cols-2 gap-2" >
                {horarios!.map((horario:Horario, index:any) => {
                    return (<div key={index}>
                            <RadioGroupItem
                                className="hidden"
                                value={horario.id}
                                id={horario.id}
                                key={index}
                            />
                            <Button
                                asChild
                                variant={horario.id === value ? "default" : "outline"}
                                className="select-none w-full"
                            >
                                <Label
                                    htmlFor={horario.id}
                                >
                                    {horario.hora_inicio.slice(0,5)}
                                </Label>
                            </Button>
                            </div>
                    )
                })}
        </RadioGroup>
    )
}