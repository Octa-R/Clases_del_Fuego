import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export function useToastMessages() {
    const searchParams = useSearchParams();
    let succesMessage = searchParams.get("success");
    let errorMessage = searchParams.get("error");
    const params = new URLSearchParams(searchParams.toString())
    const { push } = useRouter();
    useEffect(() => {
        if (succesMessage) {
            toast.success(succesMessage)
            params.delete("success")
        }
        if (errorMessage) {
            toast.error(errorMessage)
            params.delete("error")
        }
        console.log("params")
        push(window.location.pathname)
    }, [succesMessage, errorMessage])
}