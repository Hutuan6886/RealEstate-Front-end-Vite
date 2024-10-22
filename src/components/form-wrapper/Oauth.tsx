import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { app } from "@/firebase"
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"

import { RootState } from "@/redux/store"
import { loginUserSuccess } from "@/features/user/userSlice"

import { ToastAction } from "@/components/ui/toast"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"

import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"


const Oauth = () => {
    const dispatch = useDispatch()
    const { isLoading } = useSelector((state: RootState) => state.user)

    const navigate = useNavigate()
    const googleLogin = async () => {
        const provider = new GoogleAuthProvider()
        const auth = getAuth(app)
        const result = await signInWithPopup(auth, provider)     //* result chính là data user Oauth (accessToken,name,email,imgUrl,...)
        const data = {
            userName: result.user.displayName,
            email: result.user.email,
            imgUrl: result.user.photoURL,
            provider: result.providerId && "oauth",
            emailVerified: result.user.emailVerified ? new Date() : null,
        }
        try {
            const res = await fetch('/api/auth/google', {
                method: 'post',
                cache: 'no-cache',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
            if (res.ok) {
                //todo: res trả về user sau khi log in thành công
                const dataUser = await res.json();
                dispatch(loginUserSuccess(dataUser))
                toast({
                    className: 'bg-green-600 border-0 text-white rounded-[0.375rem]',
                    description: "Log in user is successfully."
                })
                navigate('/')
            } else {
                //todo: res trả về error sau khi log in không thành công
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
        }
    }
    return (
        <div className="w-full grid grid-cols-2 gap-3">
            <Button type="button" disabled={isLoading} className="bg-white text-black shadow-md flex gap-1 ring-1 ring-black hover:bg-zinc-100" onClick={googleLogin}><FcGoogle size={20} /> Google</Button>
            <Button type="button" disabled={isLoading} className="bg-white text-black shadow-md flex gap-1 ring-1 ring-black hover:bg-zinc-100"><FaGithub size={20} /> Github</Button>
        </div>
    )
}

export default Oauth
