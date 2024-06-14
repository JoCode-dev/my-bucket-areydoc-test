"use client";
import * as Toggle from '@radix-ui/react-toggle';
import { useTheme } from 'next-themes';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

export default function ToggleButton() {
    const { theme, setTheme } = useTheme();
    const toggleMode = () => setTheme(theme == 'light' ? 'dark' : 'light');

    return (
        <DarkModeSwitch
            className="w-7 h-7 m-0"
            moonColor="#ecf0f1"
            sunColor="#f1c40f"
            checked={theme === 'dark'}
            onChange={toggleMode}
            size={120}
        />

    )
}