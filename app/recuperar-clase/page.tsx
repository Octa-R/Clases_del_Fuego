import { Separator } from "@/components/ui/separator";
import SeleccionadorDeHorario from "./SeleccionadorDeHorario";
import { H2 } from "@/components/typography/h2";


export default function InscripcionPage(){
    return (
        <div>
            <H2>Recuperar Clase</H2>
            <p>Esta es la página para recuperar una clase perdida</p>
            <Separator/>
            <SeleccionadorDeHorario/>
        </div>
    )
}