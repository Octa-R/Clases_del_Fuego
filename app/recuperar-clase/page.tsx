import { H2 } from "@/components/typography/h2";
import { createClient } from '@/utils/supabase/server';
import RecuperarClaseForm from "./RecuperarClaseForm";
async function getHorarios(): Promise<any> {
    const supabase = await createClient();
    const { data: horarios, error } = await supabase.from("horarios")
        .select('*')
        .filter('cantidad_inscriptos', 'neq', 6)
    return horarios || []
}
export default async function InscripcionPage(){
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    const {data: alumno} = await supabase.from('alumnes').select('*').eq('email', user?.email).single()
    const data = await getHorarios()
    return (
        <div>
            <H2>Recuperar Clase</H2>
            <RecuperarClaseForm/>
        </div>
    )
}