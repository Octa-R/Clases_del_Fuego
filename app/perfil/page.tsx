import { createClient } from "@/utils/supabase/server";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { ProfileForm } from "@/components/ProfileForm";

async function getUserData(): Promise<any> {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    const { data: alumno, error } = await supabase.from("alumnes")
    .select(`
        id,
        nombre,
        apellido,
        email,
        fecha_nacimiento
        `)
    .eq("email",user!.email)
    .single()
    return alumno || null
}

export default async function PerfilPage() {
    const data = await getUserData()
    return (
        <div className="container mx-auto py-10">
            <h1>Perfil</h1>
            <ProfileForm profile={data}/>
        </div>
    )
}