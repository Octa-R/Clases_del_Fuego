import SeleccionadorDeHorario from "./SeleccionadorDeHorario";
import { H2 } from "@/components/typography/h2";
import { createClient } from '@/utils/supabase/server';
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

async function getHorariosDeCadaDia(): Promise<HorariosDeCadaDia> {
    const supabase = await createClient();
    const { data: horarios, error } = await supabase.from("horarios")
        .select('*')
    const groupedHorarios = horarios!.reduce((acc: any, horario: any) => {
        const { dia_semana } = horario;
        if (!acc[dia_semana]) {
            acc[dia_semana] = [];
        }
        acc[dia_semana].push(horario.hora_inicio);
        return acc;
    }, {});
    // array con los dias disponibles
    const dias_disponibles = Object.keys(groupedHorarios);
    return {horarios_por_dia:groupedHorarios,dias_disponibles}
}

export default async function InscripcionPage() {
    const data:HorariosDeCadaDia = await getHorariosDeCadaDia()
    console.log("InscripcionPage",data)
    return (
        <div>
            <H2>Inscribirse a un Horario</H2>

            <SeleccionadorDeHorario data={data} />
        </div>
    )
}