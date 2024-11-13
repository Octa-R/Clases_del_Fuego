import { InscribirseHorarioForm } from "./InscribirseHorarioForm";
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
    horarios: any[]
}

async function getHorariosDeCadaDia(): Promise<HorariosDeCadaDia> {
    const supabase = await createClient();
    const { data: horarios, error } = await supabase.from("horarios")
        .select('*')
        .filter('cantidad_inscriptos', 'neq', 6)

    if (!horarios) {
        throw new Error("Failed to fetch horarios");
    }

    const groupedHorarios = horarios.reduce((acc: any, horario: any) => {
        const { dia_semana } = horario;
        if (!acc[dia_semana]) {
            acc[dia_semana] = [];
        }
        acc[dia_semana].push(horario);
        return acc;
    }, {});
    // array con los dias disponibles
    const dias_disponibles = Object.keys(groupedHorarios);
    return { horarios_por_dia: groupedHorarios, dias_disponibles, horarios }
}

export default async function InscripcionPage() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    const { data: alumno } = await supabase.from('alumnes').select('*').eq('email', user?.email).single()
    const data: HorariosDeCadaDia = await getHorariosDeCadaDia()
    return (
        <div>
            <H2>Inscribirse a un Horario</H2>
            <InscribirseHorarioForm data={data} alumno={alumno} />
        </div>
    )
}