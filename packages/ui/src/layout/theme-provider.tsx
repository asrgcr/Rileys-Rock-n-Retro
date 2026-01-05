import { applyMode, Mode } from "@cloudscape-design/global-styles"
import {createContext, type FunctionComponent, type ReactNode, useCallback, useEffect, useState} from "react";

const IS_DARK_MODE_LOCAL_STORAGE_KEY = "WEBSITE_DARK_MODE";

const initialState = {
    isDarkMode: true,
    setIsDarkMode: (val: boolean) => {
        console.debug("Dark mode toggle requested, but no provider is mounted:", val);
    }
};

const CLASS_NAME_LIGHT = "light"
const CLASS_NAME_DARK = "dark"

export const DarkModeContext = createContext(initialState);

interface Props {
    readonly children: ReactNode;
}

export const ThemeProvider: FunctionComponent<Props> = ({ children }) => {
    const [isDarkMode, setIsDarkModeInState] = useState(true);

    const setIsDarkModeinStateAndInCSS = useCallback(
        (newIsDarkMode: boolean)=> {
            [document.documentElement, document.getElementById("app")!].forEach((element) => {
                element.classList.add(newIsDarkMode ? CLASS_NAME_DARK : CLASS_NAME_LIGHT);
                element.classList.remove(newIsDarkMode ? CLASS_NAME_LIGHT : CLASS_NAME_DARK);
            });
            applyMode(isDarkMode ? Mode.Dark : Mode.Light);
            setIsDarkModeInState(newIsDarkMode);
        },
        [isDarkMode],
    );
    useEffect(() => {
        const isDarkModeFromLocalStorage = localStorage.getItem(IS_DARK_MODE_LOCAL_STORAGE_KEY) === "true";
        setIsDarkModeinStateAndInCSS(isDarkModeFromLocalStorage);
    }, [setIsDarkModeInState, setIsDarkModeinStateAndInCSS]);

    const setIsDarkMode = (val: boolean) => {
        localStorage.setItem(IS_DARK_MODE_LOCAL_STORAGE_KEY, JSON.stringify(val));
        setIsDarkModeinStateAndInCSS(val);
    };
    return <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode}}>{children}</DarkModeContext.Provider>;
}