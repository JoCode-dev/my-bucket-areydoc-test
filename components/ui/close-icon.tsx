import { Cross2Icon } from "@radix-ui/react-icons";

interface CloseIconProps {
    onClick: (e: any) => void;
    className?: string
}

const CloseIcon: React.FC<CloseIconProps> = ({ onClick, className }) => {
    return (
        <div className={`cursor-pointer hover:scale-110 transition flex items-center justify-center rounded-full bg-red-500 ${className}`} onClick={onClick}>
            <Cross2Icon width="18" height="18" color="#ffffff" />
        </div>
    )
}

export default CloseIcon;