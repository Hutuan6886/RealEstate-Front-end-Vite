import { FieldValues, Path, PathValue, UseFormRegister, UseFormSetValue } from "react-hook-form";

type Type = {
    onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
};
const numberInputProps = (callback: (formattedValue: string) => void): Type => {

    return {
        onKeyDown: (e) => {
            const okKey = ["Tab", "Backspace", "ArrowLeft", "ArrowRight"].some((key) => e.key === key); //* e.key là giá trị nhập từ keyboard === với các key trong mảng => okkey sẽ return true

            if (!okKey && Number.isNaN(Number(e.key))) {
                //* thực thi khi okkey = false và e.key là number
                e.preventDefault();
            }
        },
        onChange: (e) => {
            const { value } = e.target;     //* e.target.value là giá trị nhận vào

            const numberValue = value.replace(/,/g, "");  //* Bỏ dấu comma trong kí tự string của số

            if (!isNaN(Number(numberValue)) && Number.isFinite(+numberValue)) {
                const formattedValue: string = Number(numberValue).toLocaleString("en-US"); //* 1000 đổi thành hệ 1,000 của en-US
                callback(formattedValue);
            }
        },
    };
};

type InputCurrencyAProps<T extends FieldValues> = {
    name: Path<T>,
    label?: string
    placeholder?: string
    message?: string;
    register: UseFormRegister<T>
    setValue: UseFormSetValue<T>
}


const InputCurrencyA = <T extends FieldValues>({ name, label, placeholder, message, register, setValue }: InputCurrencyAProps<T>) => {
    return (
        <div className="flex flex-col items-start gap-1">
            <h3 className="text-zinc-500">{label}</h3>
            <input {...register(name)}
                {...numberInputProps((formattedValue) => {
                    setValue(name, formattedValue as PathValue<T, Path<T>>, {
                        shouldDirty: true,
                    })
                })}
                className="w-full border border-zinc-700 rounded-[0.375rem] p-2" type="text" placeholder={placeholder} />
            {message ? <p className="text-xs text-rose-800">{message}</p> : null}
        </div>
    )
}

export default InputCurrencyA
