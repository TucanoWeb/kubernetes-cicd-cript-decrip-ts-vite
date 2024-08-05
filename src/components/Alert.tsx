interface IProps {
    error: string;
}

const Alert = ({ error }: IProps) => {
    return (
        <div className="relative flex items-center border p-3.5 rounded text-danger bg-danger-light border-danger ltr:border-l-[64px] rtl:border-r-[64px] dark:bg-success-dark-light">
            <span className="absolute ltr:-left-11 rtl:-right-11 inset-y-0 text-white w-6 h-6 m-auto"></span>
            <span className="ltr:pr-2 rtl:pl-2">
                <strong className="ltr:mr-1 rtl:ml-1">Erro: </strong>
                {error}
            </span>
        </div>
    );
};

export default Alert;
