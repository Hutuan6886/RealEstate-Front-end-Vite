
import { FieldValues, Path, PathValue, UseFormRegister, UseFormSetValue } from "react-hook-form";

type Type = {
    onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
};
const numberInputProps = (callback: (formattedValue: string) => void): Type => {
    return {
        onKeyDown: (e) => {
            const okKey = ["Tab", "Backspace", "ArrowLeft", "ArrowRight"].some((key) => e.key === key);

            if (!okKey && Number.isNaN(Number(e.key))) {
                e.preventDefault();
            }
        },
        onChange: (e) => {
            const { value } = e.target;
            const numberValue = value.replace(/,/g, "");

            if (!isNaN(Number(numberValue)) && Number.isFinite(+numberValue)) {
                const formattedValue: string = Number(numberValue).toLocaleString("en-US");
                callback(formattedValue);
            }
        },
    };
};

type InputCommaNumberFieldProps<T extends FieldValues> = {
    name: Path<T>
    placeholder?: string
    register: UseFormRegister<T>
    setValue: UseFormSetValue<T>
}


const InputCommaNumberField = <T extends FieldValues>({ name, placeholder, register, setValue }: InputCommaNumberFieldProps<T>) => {
    return (
        <div>
            <input {...register(name)}
                {...numberInputProps((formattedValue) => {
                    setValue(name, formattedValue as PathValue<T, Path<T>>, {
                        shouldDirty: true,
                    })
                })}
                className="border border-zinc-700 rounded-[0.375rem] p-2" type="text" placeholder={placeholder} />
        </div>
    )
}

export default InputCommaNumberField
