import { signOutAction } from "@/app/actions";
import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    LogOut,
    User,
} from "lucide-react"

import {
    DropdownMenuGroup,
    DropdownMenuPortal,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export async function MenuDeUsuario(props:any) {


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {props.trigger}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        {props.user.email}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <User />
                        <Link href="/perfil">
                        <span>Mi Perfil</span>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <form action={signOutAction}>
                        <Button  type="submit" variant={"outline"}>
                            <LogOut />
                            Cerrar sesión
                        </Button>
                    </form>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default async function AuthButton() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    return user ? (
        <div className="flex items-center gap-4">
            <MenuDeUsuario trigger={
                <Avatar>
                    <AvatarImage />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>}
                user={user}
            />
        </div>
    ) : (
        <div className="flex gap-2">
            <Button asChild size="sm" variant={"outline"}>
                <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button asChild size="sm" variant={"default"}>
                <Link href="/sign-up">Sign up</Link>
            </Button>
        </div>
    );
}
