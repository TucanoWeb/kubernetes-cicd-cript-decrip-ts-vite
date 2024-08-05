import SimpleMdeReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Dispatch, SetStateAction } from "react";
import { IText } from "../types/text";

interface IProps {
    setText: Dispatch<SetStateAction<IText>>;
    textInitial: string;
}

const Input = ({ setText, textInitial }: IProps) => {
    return (
        <>
            <SimpleMdeReact
                className="dark:text-white"
                value={textInitial}
                onChange={(value) => setText((prev) => ({ ...prev, textInitial: value }))}
            />
        </>
    );
};

export default Input;
