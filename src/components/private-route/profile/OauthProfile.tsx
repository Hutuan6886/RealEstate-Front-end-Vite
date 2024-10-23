import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { RootState } from "@/redux/store";
import { ProfileOauthForm } from "@/form_schema/FormSchema"
import { updateUserFailure, updateUserLoading, updateUserSuccess } from "@/features/user/userSlice";

import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


interface OauthProfileProps {
    imgFirebaseUrl?: string
}
type ProfileOauthFormType = z.infer<typeof ProfileOauthForm>

const OauthProfile: React.FC<OauthProfileProps> = ({ imgFirebaseUrl }) => {

    //todo: Redux
    const { currentUser, isLoading } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()

    const oauthProfileForm = useForm<ProfileOauthFormType>({
        resolver: zodResolver(ProfileOauthForm),
        defaultValues: {
            userName: currentUser.userName || "",
            phone: currentUser.phone || "",
            gender: currentUser.gender ? currentUser.gender as ProfileOauthFormType['gender'] : undefined,
            birthday: currentUser.birthday || "",
            address: currentUser.address || ""
        }
    })

    const submitOauthProfileForm = async (data: ProfileOauthFormType) => {
        data = { ...data, imgUrl: imgFirebaseUrl || currentUser.imgUrl }
        console.log(data);
        try {
            dispatch(updateUserLoading())
            const res = await fetch(`/api/user/update-oauth/${currentUser.id}`, {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            if (res.ok) {
                const dataUser = await res.json();
                console.log("Data user is updated", dataUser);
                dispatch(updateUserSuccess(dataUser))
                toast({
                    className: 'bg-green-600 border-0 text-white rounded-[0.375rem]',
                    description: "Update user is successfully."
                })
                window.location.reload()
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
            dispatch(updateUserFailure())
        }

    }
    return (
        <Form {...oauthProfileForm}>
            <form onSubmit={oauthProfileForm.handleSubmit(submitOauthProfileForm)} className="w-full">
                <div className="w-full md:grid grid-cols-2 gap-4">
                    <FormField
                        disabled={isLoading}
                        name="userName"
                        control={oauthProfileForm.control}
                        render={({ field }) => (
                            <FormItem className="w-full col-span-1">
                                <FormLabel className="font-semibold flex gap-1">User Name<span className="italic text-red-400">*</span></FormLabel>
                                <FormControl className="rounded-[0.375rem] placeholder:text-zinc-400">
                                    <Input type="text" placeholder="Lê Hữu Tuân" {...field} />
                                </FormControl>
                                <FormMessage className="text-rose-800 text-xs" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        disabled={isLoading}
                        name="phone"
                        control={oauthProfileForm.control}
                        render={({ field }) => (
                            <FormItem className="w-full col-span-1">
                                <FormLabel className="font-semibold flex gap-1">Phone Number<span className="italic text-red-400">*</span></FormLabel>
                                <FormControl className="rounded-[0.375rem] placeholder:text-zinc-400">
                                    <Input type="number" placeholder="0353••••••" {...field} />
                                </FormControl>
                                <FormMessage className="text-rose-800 text-xs" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        disabled={isLoading}
                        name="gender"
                        control={oauthProfileForm.control}
                        render={({ field }) => (
                            <FormItem className="w-full col-span-1">
                                <FormLabel className="font-semibold flex gap-1">Gender</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl className="rounded-[0.375rem]">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="bg-white">
                                        <SelectItem value="Male">Male</SelectItem>
                                        <SelectItem value="Female">Female</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        disabled={isLoading}
                        name="birthday"
                        control={oauthProfileForm.control}
                        render={({ field }) => (
                            <FormItem className="w-full col-span-1">
                                <FormLabel className="font-semibold">Birthday date</FormLabel>
                                <FormControl className="rounded-[0.375rem]">
                                    <Input className="cursor-pointer" type="date" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        disabled={isLoading}
                        name="address"
                        control={oauthProfileForm.control}
                        render={({ field }) => (
                            <FormItem className="w-full col-span-1">
                                <FormLabel className="font-semibold">Current Address</FormLabel>
                                <FormControl className="rounded-[0.375rem] placeholder:text-zinc-400">
                                    <Input placeholder="1 Street, Ward, District, City" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="w-full flex flex-row justify-end items-center gap-3">
                    <Button
                        disabled={isLoading} variant="ghost" type="submit">Reset</Button>
                    <Button
                        disabled={isLoading} variant="login" type="submit">{isLoading ? 'Loading...' : 'Save'}</Button>
                </div>
            </form>
        </Form>
    )
}

export default OauthProfile
