import { useState } from "react";
import { LoginFormControl, LoginFormInitials } from "../../config/formFields";
import FormControls from "../../components/common/common-Form/FormControl";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { loginUser } from "../../store/auth/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

const Login = () => {
  const [loginFormData, setLoginFormData] = useState(LoginFormInitials);
  const dispatch = useDispatch();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(loginFormData)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message); // ✅ Correct toast usage
      } else {
        toast.error(data?.payload?.message); // ✅ Correct toast usage
      }
    });
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
      <FormControls
        formControls={LoginFormControl}
        formData={loginFormData}
        setFormData={setLoginFormData}
      />
      <p className="text-center text-sm mt-3">
        Don&apos;t have an account?{" "}
        <Link to="/auth/register" className="text-blue-500">
          Register
        </Link>
      </p>
      <Button type="submit" onClick={onSubmit}>
        Login
      </Button>
    </div>
  );
};

export default Login;
