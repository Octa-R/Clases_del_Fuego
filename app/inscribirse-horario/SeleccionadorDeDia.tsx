"use client"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function SeleccionadorDeDia({ data,onDiaSelected, onValueChange, value }: any) {
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