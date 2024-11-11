import { H2 } from "@/components/typography/h2";
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
        <div className="container mx-auto py-4">
            <H2>Pagos</H2>
            <DataTable columns={columns} data={data} />
        </div>
    )
}
