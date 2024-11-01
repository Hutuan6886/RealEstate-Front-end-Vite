import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { REGISTER } from "@/data/apiUrl"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { RegisterFormSchema } from "@/form_schema/FormSchema"

import { Form, FormControl, FormField, FormLabel, FormItem, FormMessage } from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'



type RegisterFormType = z.infer<typeof RegisterFormSchema>
const RegisterForm = () => {
    const { toast } = useToast()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)


    const registerForm = useForm<RegisterFormType>({
        resolver: zodResolver(RegisterFormSchema),
        defaultValues: {
            userName: '',
            email: '',
            password: '',
            rePassword: ''
        }
    })
    const submitRegister = async (data: RegisterFormType) => {
        try {
            setIsLoading(true)
            const res = await fetch(REGISTER, {
                credentials: "include",
                method: 'POST',
                cache: 'no-cache',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            if (res.ok) {
                //* res trả về userCreated
                toast({
                    className: 'bg-green-600 border-0 text-white rounded-[0.375rem]',
                    description: "The user is created successfully."
                })
                navigate('/log-in')     //* /register to /log-in
            } else {
                const { success, message } = await res.json()
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
            registerForm.reset()
        }
    }

    return (
        <Form {...registerForm}>
            <form onSubmit={registerForm.handleSubmit(submitRegister)} className="flex flex-col gap-3">
                <FormField disabled={isLoading}
                    control={registerForm.control}
                    name="userName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>User Name</FormLabel>
                            <FormControl>
                                <Input type='text' className="w-full outline-1 bg-white rounded-[0.375rem] placeholder:text-zinc-400" placeholder="Lê Hữu Tuân" {...field} />
                            </FormControl>
                            <FormMessage className="text-rose-800 text-xs" />
                        </FormItem>
                    )}
                />
                <FormField disabled={isLoading}
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" className="w-full outline-1 bg-white rounded-[0.375rem] placeholder:text-zinc-400" placeholder="abc@gmail.com" {...field} />
                            </FormControl>
                            <FormMessage className="text-rose-800 text-xs" />
                        </FormItem>
                    )}
                />
                <FormField disabled={isLoading}
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" className="w-full outline-1 bg-white rounded-[0.375rem] placeholder:text-zinc-400" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage className="text-rose-800 text-xs" />
                        </FormItem>
                    )}
                />
                <FormField disabled={isLoading}
                    control={registerForm.control}
                    name="rePassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Re-Password</FormLabel>
                            <FormControl>
                                <Input type="password" className="w-full outline-1 bg-white rounded-[0.375rem] placeholder:text-zinc-400" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage className="text-rose-800 text-xs" />
                        </FormItem>
                    )}
                />

                <Button disabled={isLoading} type="submit" className="w-full">{!isLoading ? 'Confirm' : "Loading..."} </Button>
            </form>

        </Form>
    )
}

export default RegisterForm
