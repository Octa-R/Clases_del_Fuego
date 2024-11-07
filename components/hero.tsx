import Image from 'next/image';
import Can from '/app/Can.jpg';
export default function Header() {
    return (
        <div className="flex flex-col gap-16 items-center">
            <div className="flex gap-8 justify-center items-center">
                <Image src={Can} alt={''}></Image>
            </div>
        </div>
    );
}
