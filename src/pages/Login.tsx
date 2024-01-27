import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaSkating } from "react-icons/fa";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useUserLoginMutation } from "../redux/featuers/auth/authApi";
import { decodedToken } from "../utils/decodedToken";
import { useAppDispatch } from "../redux/hooks";
import { loginUser } from "../redux/featuers/auth/authSlice";

const Login = () => {
  const [loding, setLoding] = useState(false);
  const [shows, setShows] = useState(false);
  const [userLogin, { isLoading }] = useUserLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  //password text toogle
  const handleVisiblePasswordFirst = () => {
    setShows(!shows);
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      setLoding(true);
      const loginInfo = { email: data.email, password: data?.password };
      const result = await userLogin(loginInfo).unwrap();
      const { accessToken } = result.data;
      const user = decodedToken(accessToken);
      console.log(user);
      dispatch(
        loginUser({
          user,
          token: accessToken,
        })
      );
      reset();
      toast.success(result?.message);
      navigate("/", { replace: true });
    } catch (error: any) {
      console.log(error);
      toast.error(`${error?.data?.message}`);
    } finally {
      setLoding(false);
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="w-full h-screen md:px-20 px-5 flex justify-center items-center  ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border-2 border-emerald-500 rounded-lg bg-gray-100 p-6 auth-shadow"
          action=""
        >
          <h1 className="text-2xl text-center mb-2 font-serif text-emerald-500 uppercase font-bold ">
            Login Shoes Store
          </h1>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold font-serif text-emerald-500">
                User Email
              </span>
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter your Email"
              className="input input-bordered"
            />
            {errors.email && (
              <span className="text-rose-500 animate-pulse">
                please provide your Email
              </span>
            )}
          </div>

          <div className="form-control relative w-full">
            <label className="label">
              <span className="label-text font-bold font-serif text-emerald-500">
                Password
              </span>
            </label>
            <input
              type={shows ? "text" : "password"}
              {...register("password", { required: true })}
              placeholder="password"
              className="input input-bordered"
            />
            <span
              onClick={handleVisiblePasswordFirst}
              className="absolute  top-[50px] right-4 text-[18px]"
            >
              {shows ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
            </span>
            {errors.password?.type === "required" && (
              <p className="text-red-600 animate-pulse">Password is required</p>
            )}
          </div>

          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn bg-emerald-500 text-lg  text-white  font-mono hover:bg-emerald-500 border-0"
            >
              {isLoading || loding ? (
                <FaSkating className="animate-bounce" />
              ) : (
                "Login"
              )}
            </button>
          </div>
          <h1 className="text-center mt-3">
            don't have an account go to
            <span className="text-emerald-500 ml-[1px] font-semibold underline">
              <Link to="/register">Register</Link>
            </span>
          </h1>
        </form>
      </div>
    </div>
  );
};

export default Login;
