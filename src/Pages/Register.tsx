import { Button } from "@heroui/react";
import { useForm } from "react-hook-form";
import { RegistrationDefaultValues } from "../utils/AuthDefaultValues";
import type { IRegisterObject } from "../interfaces/auth.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "../schema/authschema";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<IRegisterObject>({
    defaultValues: RegistrationDefaultValues,
    resolver: zodResolver(registrationSchema)
  });

  async function callRegisterAPI(values: IRegisterObject) {
    try {
      const response = await axios.post(`${baseURL}/users/signup`, values);
      console.log(response);
      toast.success("Account Created Successfully!");
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.message);
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
              className="flex-1 rounded-lg py-2.5 text-center text-sm font-medium text-gray-600 transition hover:text-gray-900"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="flex-1 rounded-lg bg-white py-2.5 text-center text-sm font-semibold text-blue-900 shadow-sm"
            >
              Register
            </NavLink>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Create a new account
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              It is quick and easy.
            </p>
          </div>

          <form onSubmit={handleSubmit(callRegisterAPI)} className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-700">Full name</label>
              <input
                id="name"
                type="text"
                placeholder="Full name"
                {...register("name")}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-blue-600 focus:outline-none"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="username" className="mb-1.5 block text-sm font-medium text-gray-700">Username (optional)</label>
              <input
                id="username"
                type="text"
                placeholder="Username (optional)"
                {...register("username")}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-blue-600 focus:outline-none"
              />
              {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">Email address</label>
              <input
                id="email"
                type="email"
                placeholder="Email address"
                {...register("email")}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-blue-600 focus:outline-none"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="gender" className="mb-1.5 block text-sm font-medium text-gray-700">Gender</label>
              <select
                id="gender"
                {...register("gender")}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-blue-600 focus:outline-none"
              >
                <option value="" disabled>Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
            </div>

            <div>
              <label htmlFor="dateOfBirth" className="mb-1.5 block text-sm font-medium text-gray-700">Date of birth</label>
              <input
                id="dateOfBirth"
                type="date"
                {...register("dateOfBirth")}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-blue-600 focus:outline-none"
              />
              {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth.message}</p>}
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

            <div>
              <label htmlFor="rePassword" className="mb-1.5 block text-sm font-medium text-gray-700">Confirm password</label>
              <input
                id="rePassword"
                type="password"
                placeholder="Confirm password"
                {...register("rePassword")}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-blue-600 focus:outline-none"
              />
              {errors.rePassword && <p className="text-red-500 text-xs mt-1">{errors.rePassword.message}</p>}
            </div>

            <Button
              type="submit"
              className="mt-6 w-full rounded-xl bg-blue-700 px-4 py-3 font-semibold text-white hover:bg-blue-800"
            >
              Sign Up
            </Button>
          </form>
        </div>

      </div>
    </section>
  );
}