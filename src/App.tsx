import CryptoJS from "crypto-js";
import { useState } from "react";
import { IText } from "./types/text";
import { Alert, Actions, Footer, Header, Input } from "./components";
import Markdown from "react-markdown";

function App() {
    // states
    const [text, setText] = useState<IText>({
        textInitial: "",
        textFinal: "",
        key: ""
    });
    const [cript, setCript] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    // fuctions
    const handleSubmit = () => {
        if (cript) {
            const convertText = CryptoJS.AES.encrypt(text.textInitial, text.key);
            setText((prev) => ({
                ...prev,
                textFinal: convertText.toString(),
                textInitial: ""
            }));
        } else {
            try {
                const bytes = CryptoJS.AES.decrypt(text.textInitial, text.key);

                // reset
                setText((prev) => ({
                    ...prev,
                    textFinal: "",
                    textInitial: ""
                }));

                const convertText = bytes.toString(CryptoJS.enc.Utf8);
                setText((prev) => ({
                    ...prev,
                    textFinal: convertText
                }));
                if (convertText === "") {
                    setError(
                        "Sua mensagem não pôde ser descriptografada. Verifique a mensagem ou a chave informada."
                    );
                } else {
                    setError("");
                }
            } catch (err) {
                setText({ ...text, textFinal: "" });
                setError(
                    "Sua mensagem não pôde ser descriptografada. Verifique a mensagem ou a chave informada."
                );
            }
        }
    };

    // render
    return (
        <div className="container mobile:panel">
            <div className="flex p-3 mb-2">
                <Header />
            </div>
            <div className="flex-col w-full h-full m-0">
                <div className="w-1/3 mb-3 mobile:w-full dark:text-white">
                    <label>Informe uma chave</label>
                    <input
                        type="text"
                        placeholder="Inseria a chave"
                        className="form-input"
                        onChange={(e) => setText({ ...text, key: e.target.value })}
                    />
                </div>
                <div className="flex mb-3">
                    <div
                        className={`mr-2 ${
                            !cript
                                ? "text-gray-500 dark:text-gray-500 "
                                : "text-black font-bold dark:text-white"
                        }`}
                    >
                        Criptografar{" "}
                    </div>
                    <label className="w-12 h-6 relative">
                        <input
                            type="checkbox"
                            className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                            id="switch_crip"
                            onChange={() => setCript(!cript)}
                        />
                        <span className="outline_checkbox bg-icon border-2 border-primary block h-full rounded-full before:absolute before:left-1 before:bg-primary before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
                    </label>
                    <div
                        className={`ml-2 ${
                            cript
                                ? "text-gray-500 dark:text-gray-500 "
                                : "text-black font-bold dark:text-white"
                        }`}
                    >
                        Decriptografar
                    </div>
                </div>

                <Input setText={setText} textInitial={text.textInitial} />
                <button
                    disabled={text.textInitial === "" || text.key === "" ? true : false}
                    className="btn btn-primary"
                    onClick={handleSubmit}
                >
                    {cript ? "Criptografar" : "Descriptografar"}
                </button>
                <div>
                    <div className="mt-3 mb-3">
                        {error !== "" && <Alert error={error} />}
                    </div>
                    {text.textFinal !== "" && (
                        <>
                            <Actions textFinal={text.textFinal} title={text.key} />
                            <div className="border p-2 bg-white mb-10">
                                <Markdown className={"whitespace-pre-wrap break-all"}>
                                    {text.textFinal}
                                </Markdown>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="w-full flex relative left-0 bottom-0 text-center justify-center">
                <Footer />
            </div>
        </div>
    );
}

export default App;
