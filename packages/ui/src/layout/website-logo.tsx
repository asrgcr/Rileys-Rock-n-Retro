import {type FunctionComponent, useContext} from "react";
import { Link } from "react-router";
import {DarkModeContext} from "./theme-provider";

export const Logo: FunctionComponent = () => {
    const { isDarkMode } = useContext(DarkModeContext)
    return (
        <Link to={"/"} className={"mt-[10px] flex grow-4 items-center gap-2 md:grow-0"}>
            <img src={"/website.png"} alt={"Website Logo"} width={60} className={isDarkMode ? "" : ""}/>
        </Link>
    );
};