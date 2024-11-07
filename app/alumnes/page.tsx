import { createClient } from '@/utils/supabase/server';

export default async function Alumnes() {
    const supabase = await createClient();
    const { data: Alumnes, error } = await supabase.from("ALUMNES").select('*');
    console.log(Alumnes)
    return <pre>{JSON.stringify(Alumnes, null, 2)}</pre>
}