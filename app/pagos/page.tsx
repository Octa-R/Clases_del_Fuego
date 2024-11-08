import { Pago, columns } from "./columns"
import { DataTable } from "./data-table"
import { createClient } from '@/utils/supabase/server';

async function getData(): Promise<Pago[] | any[] > {
    const supabase = await createClient();
    const { data: pagos, error } = await supabase.from("pagos").select(`
        id,
        fecha_pago,
        monto,
        metodo_pago,
        alumnes (id, nombre, apellido),
        horarios (id, dia_semana, hora_inicio)
        `);
    console.log("pagos",pagos,error)
    return pagos ?? []
}

export default async function DemoPage() {
    const data = await getData()

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
