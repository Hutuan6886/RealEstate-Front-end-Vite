import { z } from "zod";
import { SearchFormSchema } from "@/form_schema/FormSchema";
import { useForm } from 'react-hook-form'
import { Button } from "./button";
import { Input } from "./input"
import { IoSearchSharp } from "react-icons/io5";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "./form";
import { cn } from "@/lib/utils";


export type SearchFormType = z.infer<typeof SearchFormSchema>

interface SearchFieldProps {
    className?: string
}
const SearchField: React.FC<SearchFieldProps> = ({ className }) => {
    const formSchema = useForm<SearchFormType>({
        resolver: zodResolver(SearchFormSchema),
        defaultValues: {
            search: ''
        }
    })

    const submitSearch = (data: SearchFormType) => {
        console.log(data);
    }
    return (
        <div className={cn(className)}>
            <Form {...formSchema}>
                <form onSubmit={formSchema.handleSubmit(submitSearch)} className="h-[50px] flex flex-row items-center justify-center">
                    <FormField
                        control={formSchema.control}
                        name="search"
                        render={({ field }) => (
                            <FormItem className="h-full">
                                <FormControl>
                                    <Input {...field} size={50} className="h-full border-0 bg-white rounded-[0px] rounded-tl-[0.375rem] rounded-bl-[0.375rem] placeholder:text-zinc-400" placeholder="Search for city, ZIP, Country" />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="h-full shadow-sm rounded-[0px] rounded-tr-[0.375rem] rounded-br-[0.375rem] bg-red-500 hover:bg-red-700 text-lg text-white"><IoSearchSharp /></Button>
                </form>
            </Form>
        </div>
    )
}

export default SearchField
