import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormLabel, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { LoginFormSchema } from "@/form_schema/FormSchema"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { useDispatch } from "react-redux"
import { userLogin } from "@/features/user/userSlice"

type LoginFormType = z.infer<typeof LoginFormSchema>
const RegisterForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { toast } = useToast()
    const dispatch = useDispatch()

    const loginForm = useForm<LoginFormType>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })
    const submitLogin = async (data: LoginFormType) => {
        // console.log(data);
        try {
            setIsLoading(true)
            const res = await fetch('/api/auth/login', {
                headers: {
                    "Content-Type": "Application/json"
                },
                cache: 'no-cache',
                method: 'post',
                body: JSON.stringify(data)
            })
            if (res.ok) {
                //todo: res trả về user sau khi log in thành công
                const dataUser = await res.json();
                dispatch(userLogin(dataUser))   //* push dataUser vừa log in lên redux
                toast({
                    className: 'bg-green-600 border-0 text-white rounded-[0.375rem]',
                    description: "Log in user is successfully."
                })
                navigate('/')
            } else {
                //todo: res trả về error sau khi log in không thành công
                const { success, message } = await res.json()
                console.log(res);
                if (!success) {
                    //* res trả về error
                    toast({
                        variant: 'destructive',
                        className: 'bg-red-600 border-0 text-white rounded-[0.375rem]',
                        description: message
                    })
                }
            }
        } catch (error) {
            console.log(error);
            toast({
                variant: "destructive",
                className: 'bg-red-600 border-0 text-white rounded-[0.375rem]',
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        } finally {
            setIsLoading(false)
            loginForm.reset()
        }

    }
    return (
        <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(submitLogin)} className="flex flex-col gap-3">

                <FormField
                    disabled={isLoading}
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
                    disabled={isLoading}
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

                <Button disabled={isLoading} type="submit" className="w-full">{!isLoading ? 'Confirm' : "Loading..."}</Button>
                <div className="w-full grid grid-cols-2 gap-3">
                    <Button disabled={isLoading} className="bg-white text-black shadow-md flex gap-1 ring-1 ring-black hover:bg-zinc-100"><FcGoogle size={20} /> Google</Button>
                    <Button disabled={isLoading} className="bg-white text-black shadow-md flex gap-1 ring-1 ring-black hover:bg-zinc-100"><FaGithub size={20} /> Github</Button>
                </div>
            </form>

        </Form>
    )
}

export default RegisterForm
