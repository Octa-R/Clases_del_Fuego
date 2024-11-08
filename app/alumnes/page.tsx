import { createClient } from '@/utils/supabase/server';
import { Alumno, columns } from './columns';
import { DataTable } from './data-table';

async function getData(): Promise< any[]> {
    const supabase = await createClient();
    const { data: alumnado, error } = await supabase.from("alumnes")
    .select(`
        id,
        nombre,
        apellido,
        email,
        observaciones,
        inscripciones (id,activo, horarios(id,dia_semana,hora_inicio))
        `)
    return alumnado ?? []
}

export default async function Horarios() {
    const data = await getData()

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}