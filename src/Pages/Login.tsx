import { Button } from "@heroui/react";
import { useForm } from "react-hook-form";
import type { ILoginObject } from "../interfaces/authinterface";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schema/authschema";
import useAuth from "../Hooks/useAuth";
import { toast } from "react-toastify";
import axios from "axios";
import { baseURL } from "../api/api";
import { useNavigate, NavLink } from "react-router-dom";
import { LoginDefaultValues } from "../utils/AuthDefaultValues";

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<ILoginObject>({
    defaultValues: LoginDefaultValues,
    resolver: zodResolver(loginSchema)
  });

  const { login } = useAuth();
  
  async function callLoginAPI(values: ILoginObject) {
    try {
      const { data } = await axios.post(`${baseURL}/users/signin`, values);
      console.log(data);
      if (data.success || data.message === "success" || data.token) {
        login(data.data.token, data.data.user);
        toast.success("Logged In Successfully!");
        navigate("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.message || "Login failed");
      } else {
        console.log(error);
      }
    }
  }

  return (
    <section className="min-h-[calc(100vh-5rem)] bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <div className="lg:col-span-7 space-y-6">
          <div>
            <h1 className="text-5xl font-extrabold tracking-tight text-blue-900">
              Route Posts
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Connect with friends and the world around you on Route Posts.
            </p>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
            <span className="text-xs font-bold tracking-wider text-blue-600 uppercase">
              About Route Academy
            </span>
            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              Egypt's Leading IT Training Center Since 2012
            </h2>
            <p className="mt-4 text-sm text-gray-600 leading-relaxed">
              Route Academy is the premier IT training center in Egypt, established in 2012. We specialize in delivering high-quality training courses in programming, web development, and application development. We've identified the unique challenges people may face when learning new technology and made efforts to provide strategies to overcome them.
            </p>

            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-4">
                <div className="text-xl font-bold text-blue-900">2012</div>
                <div className="text-xs uppercase font-semibold text-gray-500 mt-1">Founded</div>
              </div>
              <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-4">
                <div className="text-xl font-bold text-blue-900">40K+</div>
                <div className="text-xs uppercase font-semibold text-gray-500 mt-1">Graduates</div>
              </div>
              <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-4">
                <div className="text-xl font-bold text-blue-900">50+</div>
                <div className="text-xs uppercase font-semibold text-gray-500 mt-1">Partner Companies</div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-4">
                <div className="text-xl font-bold text-blue-900">5</div>
                <div className="text-xs uppercase font-semibold text-gray-500 mt-1">Branches</div>
              </div>
              <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-4">
                <div className="text-xl font-bold text-blue-900">20</div>
                <div className="text-xs uppercase font-semibold text-gray-500 mt-1">Diplomas Available</div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 rounded-3xl bg-white p-8 shadow-xl border border-gray-100">
          <div className="mb-6 flex rounded-xl bg-gray-100 p-1">
            <NavLink
              to="/login"
              className="flex-1 rounded-lg bg-white py-2.5 text-center text-sm font-semibold text-blue-900 shadow-sm"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="flex-1 rounded-lg py-2.5 text-center text-sm font-medium text-gray-600 transition hover:text-gray-900"
            >
              Register
            </NavLink>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Log in to Route Posts
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Log in and continue your social journey.
            </p>
          </div>

          <form onSubmit={handleSubmit(callLoginAPI)} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Email or username"
                {...register("email")}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-blue-600 focus:outline-none"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                {...register("password")}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-blue-600 focus:outline-none"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <Button
              type="submit"
              className="mt-6 w-full rounded-xl bg-blue-700 px-4 py-3 font-semibold text-white hover:bg-blue-800"
            >
              Log In
            </Button>

            <div className="text-center mt-4">
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
}