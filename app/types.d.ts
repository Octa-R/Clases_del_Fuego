import { Horario } from './horarios/columns';
type Horario = z.infer<typeof Horario>
type Alumno = z.infer<typeof AlumnoSchema>

enum Dias {
    LUNES = 'Lunes',
    MARTES = 'Martes',
    MIERCOLES = 'Miércoles',
    JUEVES = 'Jueves',
    VIERNES = 'Viernes',
    SABADO = 'Sábado',
    DOMINGO = 'Domingo'
}

type CodigoDias = "LUNES" | "MARTES" | "MIERCOLES" | "JUEVES" | "VIERNES" | "SABADO" | "DOMINGO"
