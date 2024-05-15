import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormLabel, FormItem, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from '@/components/ui/button'
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { LoginFormSchema } from "@/form_schema/FormSchema"

type LoginFormType = z.infer<typeof LoginFormSchema>
const RegisterForm = () => {
    const loginForm = useForm<LoginFormType>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })
    const submitLogin = (data: LoginFormType) => {
        console.log(data);

    }
    return (
        <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(submitLogin)} className="flex flex-col gap-3">

                <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" className="w-full outline-1 bg-white rounded-[0.375rem] placeholder:text-zinc-400" placeholder="abc@gmail.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" className="w-full outline-1 bg-white rounded-[0.375rem] placeholder:text-zinc-400" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full">Confirm</Button>
                <div className="w-full grid grid-cols-2 gap-3">
                    <Button className="bg-white text-black shadow-md flex gap-1 ring-1 ring-black hover:bg-zinc-100"><FcGoogle size={20} /> Google</Button>
                    <Button className="bg-white text-black shadow-md flex gap-1 ring-1 ring-black hover:bg-zinc-100"><FaGithub size={20} /> Github</Button>
                </div>
            </form>

        </Form>
    )
}

export default RegisterForm
