import { RegisterFormSchema } from "@/form_schema/FormSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormLabel, FormItem, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from '@/components/ui/button'


type RegisterFormType = z.infer<typeof RegisterFormSchema>
const RegisterForm = () => {
    const registerForm = useForm<RegisterFormType>({
        resolver: zodResolver(RegisterFormSchema),
        defaultValues: {
            userName: '',
            email: '',
            password: '',
            rePassword: ''
        }
    })
    const submitRegister = (data: RegisterFormType) => {
        console.log(data);

    }
    return (
        <Form {...registerForm}>
            <form onSubmit={registerForm.handleSubmit(submitRegister)} className="flex flex-col gap-3">
                <FormField
                    control={registerForm.control}
                    name="userName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>User Name</FormLabel>
                            <FormControl>
                                <Input className="w-full outline-1 bg-white rounded-[0.375rem] placeholder:text-zinc-400" placeholder="Lê Hữu Tuân" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-400 text-sm"/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" className="w-full outline-1 bg-white rounded-[0.375rem] placeholder:text-zinc-400" placeholder="abc@gmail.com" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-400 text-sm"/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" className="w-full outline-1 bg-white rounded-[0.375rem] placeholder:text-zinc-400" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-400 text-sm"/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={registerForm.control}
                    name="rePassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Re-Password</FormLabel>
                            <FormControl>
                                <Input type="password" className="w-full outline-1 bg-white rounded-[0.375rem] placeholder:text-zinc-400" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-400 text-sm"/>
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full">Confirm</Button>
            </form>

        </Form>
    )
}

export default RegisterForm
