import * as Toast from '@radix-ui/react-toast';
import { Text } from '@radix-ui/themes';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

interface ToasterProps {
    title: string;
    message: string;

    success: boolean;
}

const Toaster: React.FC<ToasterProps> = ({ title, message, success }) => {
    const [open, setOpen] = useState(false);
    const timerRef = useRef(0);

    useEffect(() => {
        setOpen(false);
        window.clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(() => {
            setOpen(true);
        }, 100);

        return () => clearTimeout(timerRef.current);
    }, []);

    return (
        <Toast.Provider swipeDirection="right">

            <Toast.Root
                className={
                    clsx(success ? "bg-green-500" : "bg-red-500", "rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut")
                }
                open={open}
                onOpenChange={setOpen}
            >
                <Toast.Title className="[grid-area:_title] mb-[5px] font-medium text-white text-[15px]">
                    {title}
                </Toast.Title>
                <Toast.Description asChild>
                    <Text className="[grid-area:_description] m-0 text-white text-[13px] leading-[1.3]">{message}</Text>
                </Toast.Description>
            </Toast.Root>
            <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
        </Toast.Provider>
    );
};


export default Toaster;
