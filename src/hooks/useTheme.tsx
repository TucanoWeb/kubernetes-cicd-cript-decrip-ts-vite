const useTheme = () => {
    const toogleTheme = (dark: boolean) => {
        if (dark) {
            document.querySelector("body")?.classList.add("dark");
        } else {
            document.querySelector("body")?.classList.remove("dark");
        }
    };

    return {
        toogleTheme
    };
};

export default useTheme;
