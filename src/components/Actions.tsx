import { useEffect, useState } from "react";
import { LuCopy } from "react-icons/lu";
import { LuCopyCheck } from "react-icons/lu";
import { copyText } from "../utils/copyFunc";
import { MdOutlineFileDownload } from "react-icons/md";

import { saveAs } from "file-saver";

interface IProps {
    textFinal: string;
    title: string;
}

const Actions = ({ textFinal, title }: IProps) => {
    const [clicked, setClicked] = useState<boolean>(false);

    useEffect(() => {
        setClicked(false);
    }, [textFinal]);

    const handleClick = () => {
        copyText(textFinal);
        setClicked(!clicked);
    };

    const handleDownload = () => {
        const blob = new Blob([textFinal], { type: "text/plain;charset=utf-8" });
        saveAs(blob, `${title}.txt`);
    };

    return (
        <div className="flex w-full mb-2 justify-end mobile:justify-between ">
            <button
                onClick={handleClick}
                className={`${clicked ? "btn btn-success" : "btn btn-warning"}`}
                disabled={clicked}
            >
                {clicked ? <LuCopyCheck className="mr-1" /> : <LuCopy className="mr-1" />}{" "}
                {clicked ? "Copiado" : "Copiar"}
            </button>

            <div className="ml-2">
                <button onClick={handleDownload} className="btn btn-secondary">
                    <MdOutlineFileDownload className="size-5 mr-1" />
                    Download
                </button>
            </div>
        </div>
    );
};

export default Actions;
