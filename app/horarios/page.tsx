import { DataTable } from "../horarios/data-table";
import { columns, Horario } from "./columns"
import { createClient } from '@/utils/supabase/server';
import { H2 } from "@/components/typography/h2";
import { AgregarHorarioDialog } from "@/components/AgregarHorarioDialog";

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
            <H2>Horarios</H2>
            <div className="flex justify-end my-4" >
                <AgregarHorarioDialog />
            </div>
            <DataTable columns={columns} data={data} />
        </div>
    )
}