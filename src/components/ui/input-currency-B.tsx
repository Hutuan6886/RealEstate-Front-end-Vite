import { ChangeEvent, FocusEvent } from "react";
import { FieldValues, Path, PathValue, UseFormRegister, UseFormSetValue } from "react-hook-form";

type InputCurrencyBProps<T extends FieldValues> = {
    name: Path<T>,
    label?: string
    placeholder?: string
    message?: string;
    register: UseFormRegister<T>
    setValue: UseFormSetValue<T>
}

const InputCurrencyB = <T extends FieldValues>({ name, label, placeholder, message, register, setValue }: InputCurrencyBProps<T>) => {

    // removes everything except digits.
    function removeNonDigit(value: string): string {
        return value.replace(/\D/g, "");
    }

    // formats number in selected currency and locale.
    const formatNumber = (value: string): string => {

        //todo: Nếu sử dụng "es-US" thì các chữ số hàng ngàn là dấu phẩy indexOf("."), thay đổi giá trị tại handleChange là const final_part = left_part + "." + right_part
        //todo: Nếu sử dụng "vi-VN" thì các chữ số hàng ngàn là dấu chấm indexOf(","), thay đổi giá trị tại handleChange là const final_part = left_part + "," + right_part
        return new Intl.NumberFormat("vi-VN", {
            currency: "VND",
        }).format(Number(removeNonDigit(value)));
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value,
            ele = e.target,
            original_length = value.length;
        let initialPosition,
            updated_length = value.length;

        // store the initial position of cursor
        if (ele) {
            initialPosition = ele.selectionStart;
        }

        if (value.indexOf(",") >= 0) {
            // get index of decimal
            const decimal_pos = value.indexOf(",");
            // get left part
            let left_part = value.substring(0, decimal_pos);
            // get right part
            let right_part = value.substring(decimal_pos);
            // format the left part
            left_part = formatNumber(left_part);
            right_part = removeNonDigit(right_part);
            // join left and right with a "."
            const final_part = left_part + "," + right_part;
            // update the length of the value.
            updated_length = final_part.length;
            // pass the final value to field value.
            // e.target.value = final_part;
            setValue(name, final_part as PathValue<T, Path<T>>)
        } else {
            const final_part = formatNumber(value);
            // update the length of the value.
            updated_length = final_part.length;
            // pass the final value to field value.
            // e.target.value = final_part;
            setValue(name, final_part as PathValue<T, Path<T>>)
        }

        // to update the cursor position
        if (initialPosition && ele) {
            const finalPosition = updated_length - original_length + initialPosition;
            ele.setSelectionRange(finalPosition, finalPosition);
        }
    }

    function handleBlur(e: FocusEvent<HTMLInputElement, Element>) {
        const value = e.target.value;
        if (value === "") {
            return undefined;
        }
        if (value.indexOf(".") >= 0) {
            const split_array = value.split(".");
            if (split_array.length === 2 && Number(split_array[1]) === 0) {
                e.target.value = split_array[0];
            }
        }
    }

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={name} className="text-sm">{label}</label>
            <input
                {...register(name)}
                name={name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={placeholder}
                className="w-full border border-zinc-700 rounded-[0.375rem] p-2"
                type="text"
                inputMode="numeric"
            />
            {message ? <p className="text-xs text-rose-800">{message}</p> : null}
        </div>
    );
}

export default InputCurrencyB
