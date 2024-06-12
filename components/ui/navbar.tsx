import React from "react";

interface NavbarProps {
    children: React.ReactNode
}

const Navbar: React.FC<NavbarProps> = ({children}) => {
    return (
        <nav>
            {children}
        </nav>
    )
}

export default Navbar;