import { Button } from "@/components/ui/button"
import { useRef } from "react"
import RequestInfoInput from "./RequestInfoInput"
import RequestInfoTextArea from "./RequestInfoTextArea"

const RequestInfoForm = () => {
    const checkBoxRef = useRef<HTMLInputElement>(null)
    return (
        <div className='w-full h-fit
                        border border-zinc-300 rounded-[0.375rem] shadow-lg p-5
                        flex flex-col gap-2'>
            <form action="" className="flex flex-col gap-2">
                <div className="flex flex-col gap-4">
                    <RequestInfoInput label="Phone" name="phone" type="text" />
                    <RequestInfoInput label="Email" name="email" type="email" />
                    <RequestInfoTextArea label="Message" name="message" type="text" defaultValue={`I am interested in 1847 Sylvan Rd SW, Atlanta, GA 30310`} />
                </div>
                <Button className="w-full bg-orange-700">Request Info</Button>
            </form>
            <div className="flex flex-col gap-4">
                <div className="w-full flex flex-row items-center justify-start gap-2 cursor-pointer"><input ref={checkBoxRef} type="checkbox" className="size-5 cursor-pointer" /> <p className="text-xs text-zinc-500 " onClick={() => { checkBoxRef.current?.click() }}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p></div>
                <p className="text-zinc-500 text-xs">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio consequatur nostrum, officia distinctio quaerat sunt esse voluptatum unde rem odit est optio repellat. Architecto sunt, accusantium delectus quam distinctio dolores consequatur laboriosam eveniet quibusdam suscipit perspiciatis cum voluptas inventore dolorem.</p>
            </div>
        </div>
    )
}

export default RequestInfoForm
