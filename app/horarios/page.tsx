import { DataTable } from "../horarios/data-table";
import { columns,Horario } from "./columns"
import { createClient } from '@/utils/supabase/server';

async function getData(): Promise<typeof Horario[]> {
    const supabase = await createClient();
    const { data: pagos, error } = await supabase.from("horarios")
    .select('*')
    .order("dia_semana", { ascending: true })
    return pagos ?? []
}

export default async function Horarios() {
    const data = await getData()

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}