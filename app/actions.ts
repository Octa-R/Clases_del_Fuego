"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { HorarioSchema } from "./horarios/HorarioForm";
import { Horario } from "./types";

export const signUpAction = async (formData: FormData) => {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const supabase = await createClient();
    const origin = (await headers()).get("origin");

    if (!email || !password) {
        return { error: "Email and password are required" };
    }

    const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
        emailRedirectTo: `${origin}/auth/callback`,
    },
    });

    if (error) {
        console.error(error.code + " " + error.message);
        return encodedRedirect("error", "/sign-up", error.message);
    } else {
        return encodedRedirect(
        "success",
        "/sign-up",
        "Thanks for signing up! Please check your email for a verification link."
        );
    }
};

export const signInAction = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return encodedRedirect("error", "/sign-in", error.message);
    }

    return redirect("/principal");
};

export const forgotPasswordAction = async (formData: FormData) => {
    const email = formData.get("email")?.toString();
    const supabase = await createClient();
    const origin = (await headers()).get("origin");
    const callbackUrl = formData.get("callbackUrl")?.toString();

    if (!email) {
        return encodedRedirect("error", "/forgot-password", "Email is required");
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
    });

    if (error) {
        console.error(error.message);
        return encodedRedirect(
        "error",
        "/forgot-password",
        "Could not reset password"
        );
    }

    if (callbackUrl) {
        return redirect(callbackUrl);
    }

    return encodedRedirect(
        "success",
        "/forgot-password",
        "Check your email for a link to reset your password."
    );
};

export const resetPasswordAction = async (formData: FormData) => {
    const supabase = await createClient();

    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!password || !confirmPassword) {
        encodedRedirect(
        "error",
        "/protected/reset-password",
        "Password and confirm password are required"
        );
    }

    if (password !== confirmPassword) {
        encodedRedirect(
        "error",
        "/protected/reset-password",
        "Passwords do not match"
        );
    }

    const { error } = await supabase.auth.updateUser({
        password: password,
    });

    if (error) {
        encodedRedirect(
        "error",
        "/protected/reset-password",
        "Password update failed"
        );
    }

    encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
    const supabase = await createClient();
    await supabase.auth.signOut();
    return redirect("/sign-in");
};

export const createHorarioAction = async (nuevoHorarioData: Horario) => {
    const supabase = await createClient();
    console.log(nuevoHorarioData);
    const { data: horarios, error: errorHorarios } = await supabase.from("horarios")
    .select("*")
    .eq("dia_semana", nuevoHorarioData.dia_semana)
    .gt("hora_fin", nuevoHorarioData.hora_inicio)
    .lt("hora_inicio", nuevoHorarioData.hora_fin);

    if (errorHorarios) {
        return encodedRedirect("error", "/horarios", errorHorarios.message);
    }

    if(horarios!.length > 0) {
        return encodedRedirect("error", "/horarios", "Ya existe un horario en ese rango de horas");
    }

    const { data, error } = await supabase.from("horarios").insert([
        {   dia_semana: nuevoHorarioData.dia_semana,
            hora_inicio: nuevoHorarioData.hora_inicio,
            hora_fin: nuevoHorarioData.hora_fin,
        },
    ]);

    if (error) {
        return encodedRedirect("error", "/horarios", error.message);
    }

    encodedRedirect("success","/horarios","Horario creado correctamente");
}

export const deleteHorarioAction = async (horarioId: number) => {
    const supabase = await createClient();
    const { error } = await supabase.from("horarios")
    .update({activo: false})
    .match({ id: horarioId });

    if (error) {
        return encodedRedirect("error", "/horarios", error.message);
    }

    encodedRedirect("success","/horarios","Horario eliminado correctamente");
}

export const updateHorarioAction = async (horarioId: number, horarioData: Horario) => {
    const supabase = await createClient();
    const { data: horarios, error: errorHorarios } = await supabase.from("horarios")
    .select("*")
    .neq("id", horarioId)
    .eq("dia_semana", horarioData.dia_semana)
    .gt("hora_fin", horarioData.hora_inicio)
    .lt("hora_inicio", horarioData.hora_fin);

    if (errorHorarios) {
        return encodedRedirect("error", "/horarios", errorHorarios.message);
    }

    if(horarios!.length > 0) {
        return encodedRedirect("error", "/horarios", "Ya existe un horario en ese rango de horas");
    }

    const { error } = await supabase.from("horarios")
    .update({
        dia_semana: horarioData.dia_semana,
        hora_inicio: horarioData.hora_inicio,
        hora_fin: horarioData.hora_fin,
    })
    .match({ id: horarioId });

    if (error) {
        return encodedRedirect("error", "/horarios", error.message);
    }

    encodedRedirect("success","/horarios","Horario actualizado correctamente");
}

export const inscribirseHorarioAction = async ({horario_id,alumno_id}:any) => {
    console.log(horario_id,alumno_id);
    const supabase = await createClient();
    const { data: horario, error: errorHorario } = await supabase.from("horarios")
    .select("*")
    .eq("id", horario_id)
    .single();
    console.log(horario,errorHorario);
    if (errorHorario) {
        return encodedRedirect("error", "/inscribirse-horario", errorHorario.message);
    }
    if (!horario) {
        return encodedRedirect("error", "/inscribirse-horario", "Horario no encontrado");
    }
    if (horario.cupo_maximo <= horario.cantidad_inscriptos) {
        return encodedRedirect("error", "/inscribirse-horario", "Horario completo");
    }

    const { data: inscripcion, error: errorInscripcion } = await supabase.from("inscripciones")
    .select("*")
    .eq("id_alumne", alumno_id)
    .eq("id_horario", horario_id)
    .single();
    console.log(inscripcion,errorInscripcion);
    if (inscripcion) {
        return encodedRedirect("error", "/inscribirse-horario", "Ya estas inscripto en este horario");
    }
    const { data, error } = await supabase.from("inscripciones").insert([
        { id_horario: horario_id,id_alumne: alumno_id },
    ]);
    if (error) {
        return encodedRedirect("error", "/inscribirse-horario", error.message);
    }
    const { error: errorHorarioUpdate } = await supabase.from("horarios")
    .update({ cantidad_inscriptos: horario.cantidad_inscriptos + 1 })
    .match({ id: horario_id });

    if (errorHorarioUpdate) {
        return encodedRedirect("error", "/inscribirse-horario", errorHorarioUpdate.message);
    }


    encodedRedirect("success","/inscribirse-horario","Inscripción realizada correctamente");
}