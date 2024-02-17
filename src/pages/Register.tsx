import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaSkating } from "react-icons/fa";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useUserRegisterMutation } from "../redux/featuers/auth/authApi";

const Register = () => {
  const [shows, setShows] = useState(false);
  const navigate = useNavigate();
  const [userRegister, { isLoading }] = useUserRegisterMutation();
  //password text toogle
  const handleVisiblePasswordFirst = () => {
    setShows(!shows);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const user = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      };
      const result = await userRegister(user).unwrap();
      reset();
      toast.success(`${result?.message} please login now`);
      navigate("/login");
    } catch (error: any) {
      toast.error(`${error?.data?.message}`);
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
            Register Shoes Store
          </h1>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold font-serif text-emerald-500">
                User Name
              </span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Enter your name"
              className="input input-bordered"
            />
            {errors.name && (
              <span className="text-rose-500 animate-pulse">
                please provide your FullName
              </span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold font-serif text-emerald-500">
                User Email
              </span>
            </label>
            <input
              type="email"
              {...register("email", {
                required: true,
              })}
              placeholder="Enter your Email"
              className="input input-bordered"
            />
            {errors.email && (
              <span className="text-rose-500 animate-pulse">
                please provide valid Email
              </span>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-color">User Role</span>
            </label>
            <select
              {...register("role", {
                required: true,
              })}
              className="select select-bordered w-full "
            >
              <option disabled value="">
                select role
              </option>
              <option value="seller">Seller</option>
              <option value="buyer">Buyer</option>
            </select>
            {errors.role && (
              <span className="text-rose-500 animate-pulse">
                Please provide Role
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
              {...register("password", {
                required: true,
                pattern: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{6,}$/,
                minLength: 6,
              })}
              placeholder="password"
              className="input input-bordered"
            />
            {errors.password && (
              <span className="text-rose-500 animate-pulse">
                please provide Strong Password
              </span>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-600 animate-pulse">
                passwrod at least 6 characters long{" "}
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-600  animate-pulse">
                Password must contain at least one uppercase letter, one special
                character, one number.
              </p>
            )}
            <span
              onClick={handleVisiblePasswordFirst}
              className="absolute  top-[50px] right-4 text-[18px]"
            >
              {shows ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
            </span>
          </div>

          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn bg-emerald-500 text-lg  text-white  font-sans hover:bg-emerald-500 border-0"
            >
              {isLoading ? (
                <FaSkating className="animate-bounce" />
              ) : (
                "Register"
              )}
            </button>
          </div>
          <h1 className="text-center mt-3">
            Already registered? Go to{" "}
            <span className="text-emerald-500 font-semibold underline">
              <Link to="/login">Login</Link>
            </span>
          </h1>
        </form>
      </div>
    </div>
  );
};

export default Register;
