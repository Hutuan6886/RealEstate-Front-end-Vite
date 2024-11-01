import { useSelector, useDispatch } from "react-redux";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { POST_CREATE_CREDENTIAL_PROFILE } from "@/data/apiUrl";
import { ProfileForm } from "@/form_schema/FormSchema";
import { updateUserFailure, updateUserLoading, updateUserSuccess } from "@/features/user/userSlice";
import { RootState } from "@/redux/store";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";


type ProfileFormType = z.infer<typeof ProfileForm>


interface CredentialsProfileProps {
    imgFirebaseUrl?: string;
}
const CredentialsProfile: React.FC<CredentialsProfileProps> = ({ imgFirebaseUrl }) => {

    const { currentUser, isLoading } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()

    const profileForm = useForm<ProfileFormType>({
        resolver: zodResolver(ProfileForm),
        defaultValues: {
            userName: currentUser.userName || "",
            email: currentUser.email || "",
            gender: currentUser.gender ? currentUser.gender as ProfileFormType['gender'] : undefined,
            address: currentUser.address || "",
            birthday: currentUser.birthday || "",
            phone: currentUser.phone || "",
            imgUrl: currentUser.imgUrl || "",
            currentPassword: "",
            newPassword: "",
            reNewPassword: "",
        }
    })

    const submitProfileForm = async (data: ProfileFormType) => {
        data = { ...data, imgUrl: imgFirebaseUrl || currentUser.imgUrl }
        try {
            dispatch(updateUserLoading())
            const res = await fetch(`${POST_CREATE_CREDENTIAL_PROFILE}/${currentUser.id}`, {
                credentials: "include",
                method: 'POST',
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
            profileForm.resetField("currentPassword")
            dispatch(updateUserFailure())
        }
    }

    return (
        <Form {...profileForm}>
            <form onSubmit={profileForm.handleSubmit(submitProfileForm)} className="w-full flex flex-col items-start gap-4">
                <div className="w-full md:grid grid-cols-2 gap-4">
                    <div className="col-span-1 flex flex-col gap-3">
                        <FormField
                            disabled={isLoading}
                            name="userName"
                            control={profileForm.control}
                            render={({ field }) => (
                                <FormItem className="col-span-1">
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
                            name="email"
                            control={profileForm.control}
                            render={({ field }) => (
                                <FormItem className="col-span-1">
                                    <FormLabel className="font-semibold flex gap-1">Email<span className="italic text-red-400">*</span></FormLabel>
                                    <FormControl className="rounded-[0.375rem] placeholder:text-zinc-400">
                                        <Input type="email" placeholder="tuan@gmail.com" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-rose-800 text-xs" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            disabled={isLoading}
                            name="phone"
                            control={profileForm.control}
                            render={({ field }) => (
                                <FormItem className="col-span-1">
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
                            name="currentPassword"
                            control={profileForm.control}
                            render={({ field }) => (
                                <FormItem className="col-span-1">
                                    <FormLabel className="font-semibold flex gap-1">Current Password<span className="italic text-red-400">*</span></FormLabel>
                                    <FormControl className="rounded-[0.375rem] placeholder:text-zinc-400">
                                        <Input type="password" placeholder="••••••••" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-rose-800 text-xs" />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="col-span-1 flex flex-col gap-3">
                        <FormField
                            disabled={isLoading}
                            name="gender"
                            control={profileForm.control}
                            render={({ field }) => (
                                <FormItem className="col-span-1">
                                    <FormLabel className="font-semibold flex gap-1">Gender</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl className="rounded-[0.375rem]">
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value} placeholder="Select gender" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-white">
                                            <SelectItem value="Male">Male</SelectItem>
                                            <SelectItem value="Female">Female</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <FormField
                            disabled={isLoading}
                            name="birthday"
                            control={profileForm.control}
                            render={({ field }) => (
                                <FormItem className="col-span-1">
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
                            control={profileForm.control}
                            render={({ field }) => (
                                <FormItem className="col-span-1">
                                    <FormLabel className="font-semibold">Current Address</FormLabel>
                                    <FormControl className="rounded-[0.375rem] placeholder:text-zinc-400">
                                        <Input type="text" placeholder="1 Street, Ward, District, City" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="bg-zinc-200 rounded-[0.45rem] p-3">
                            <FormField
                                disabled={isLoading}
                                name="newPassword"
                                control={profileForm.control}
                                render={({ field }) => (
                                    <FormItem className="col-span-1">
                                        <FormLabel className="font-semibold">New Password</FormLabel>
                                        <FormControl className="rounded-[0.375rem] placeholder:text-zinc-400">
                                            <Input type="password" placeholder="••••••••" {...field} />
                                        </FormControl >
                                        <FormMessage className="text-rose-800 text-xs" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                disabled={isLoading}
                                name="reNewPassword"
                                control={profileForm.control}
                                render={({ field }) => (
                                    <FormItem className="col-span-1">
                                        <FormLabel className="font-semibold">Re-New Password</FormLabel>
                                        <FormControl className="rounded-[0.375rem] placeholder:text-zinc-400">
                                            <Input type="password" placeholder="••••••••" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-rose-800 text-xs" />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-row justify-end items-center gap-3">
                    <Button
                        disabled={isLoading} variant="ghost" type="button" onClick={() => profileForm.reset()}>Reset</Button>
                    <Button
                        disabled={isLoading} variant="login" type="submit">{isLoading ? 'Loading...' : 'Save'}</Button>
                </div>
            </form>
        </Form>
    )
}

export default CredentialsProfile
