import { createClient } from "@/utils/supabase/server"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { ProfileForm } from "@/components/ProfileForm"
import { H2 } from "@/components/typography/h2"
const getData = async (idUser: string) => {
    const supabase = await createClient()
    const { data: userData, error } = await supabase
        .from("alumnes")
        .select(`
            id,
            nombre,
            apellido,
            email,
            observaciones,
            inscripciones (id, activo, horarios(id, dia_semana, hora_inicio))
            `)
        .eq("id", idUser)
        .single()
    console.log(userData,error)
    return userData ?? null
}

export default async function Page({
    params,
}: {
    params: Promise<{ idAlu: string }>
}) {
    const idUser = (await params).idAlu
    const userData = await getData(idUser) as any | null
    if (!userData) {
        throw new Error("User data not found")
    }
    console.log(userData)
    return (
        <div className="container mx-auto py-10">
            <ProfileForm profile={userData}/>
            <H2>Incripciones a Horarios</H2>
            <DataTable columns={columns} data={userData.inscripciones} />
        </div>
    )
}