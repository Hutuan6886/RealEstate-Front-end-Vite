import FormWrapper from "@/components/form-wrapper/FormWrapper"
import LoginForm from "@/components/form-wrapper/LoginForm"

function Login() {
  return (
    <div className="w-full h-[500px] md:grid grid-cols-5">
      <div className="col-span-2">
        <FormWrapper label="Sign In" redirectLabel="Don't have an account ?" redirectUrl="/register">
          <div className="w-full md:w-[70%]">
            <LoginForm />
          </div>
        </FormWrapper>
      </div>
      <div className="col-span-3 hidden md:block md:w-full md:h-full bg-center bg-cover bg-no-repeat rounded-[0.375rem] bg-[url('/img/pexels-sevenstormphotography.jpg')]"></div>
    </div>
  )
}

export default Login
