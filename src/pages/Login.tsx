import FormWrapper from "@/components/form-wrapper/FormWrapper"
import LoginForm from "@/components/form-wrapper/LoginForm"

function Login() {
  return (
    <div className="w-full h-full md:grid grid-cols-5">
      <div className="col-span-2">
        <FormWrapper label="Sign In" redirectLabel="Don't have an account ?" redirectUrl="/register">
          <div className="w-full md:w-[70%]">
            <LoginForm />
          </div>
        </FormWrapper>
      </div>
      <div className="col-span-3 invisible md:visible md:w-full md:h-full bg-fixed bg-center bg-cover bg-no-repeat rounded-[0.375rem] bg-[url('/img/pexels-sevenstormphotography.jpg')]"></div>
    </div>
  )
}

export default Login
