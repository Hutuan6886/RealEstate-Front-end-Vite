import FormWrapper from "@/components/form-wrapper/FormWrapper"
import RegisterForm from "@/components/form-wrapper/RegisterForm"

function Register() {

  return (
    <div className="w-full h-[500px] md:grid md:grid-cols-2">
      <div className="hidden md:block md:w-full md:h-full bg-center bg-cover bg-no-repeat rounded-[0.375rem] bg-[url('/img/pexels-rickyrecap.jpg')]"></div>
      <FormWrapper label="Register" redirectLabel="Back to log in" redirectUrl="/log-in">
        <div className="w-full md:w-[70%]">
          <RegisterForm />
        </div>
      </FormWrapper>
    </div>
  )
}

export default Register
