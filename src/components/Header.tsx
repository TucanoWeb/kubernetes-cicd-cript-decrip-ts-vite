import { useState } from "react";
import useTheme from "../hooks/useTheme";

import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";

const Header = () => {
    // states
    const [lightMode, setLightMode] = useState<boolean>(true);
    const { toogleTheme } = useTheme();

    // functions
    const handleTheme = () => {
        setLightMode(!lightMode);
        toogleTheme(lightMode);
    };

    return (
        <div className="flex w-full justify-evenly">
            <h1 className="dark:text-white">Crip and Decrip Project</h1>
            <button onClick={handleTheme}>
                {lightMode ?  <MdDarkMode className="size-6"/> : <CiLight className="size-6 dark:text-white"/>}
            </button>
        </div>
    );
};

export default Header;
