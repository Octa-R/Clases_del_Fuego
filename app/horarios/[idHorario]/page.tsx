import { Horario } from '@/app/types';
import { createClient } from '@/utils/supabase/server';
import { ActualizarHorario } from './ActualizarHorario';

async function getHorarioData(id:string): Promise<Horario> {
    const supabase = await createClient();
    const { data: horario, error } = await supabase.from("horarios")
        .select(`*,
            inscripciones(*),
            `)
        .filter('activo', 'eq', true)
        .eq('id', id)
        .single();
    return horario ?? null
}

export default async function HorarioDetalle({params}:any) {
    const {idHorario }= await params
    const horario:Horario = await getHorarioData(String(idHorario));
    return (
        <div>
            <h1>Horario</h1>
            <ActualizarHorario horario={horario}/>
        </div>
    )
}