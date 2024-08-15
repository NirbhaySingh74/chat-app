import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

const signupSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email format" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string().min(6, {
      message: "Confirm password must be at least 6 characters long",
    }),
    gender: z.enum(["male", "female"], {
      required_error: "Gender is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type SignupFormInputs = z.infer<typeof signupSchema>;

const Signup: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormInputs) => {
    try {
      console.log("Signup successful", data);
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105 max-h-[600px] overflow-y-auto">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 text-left"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              className={`mt-1 block w-full px-3 py-1.5 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500`}
              placeholder="Your Name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 text-left">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 text-left"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className={`mt-1 block w-full px-3 py-1.5 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 text-left">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 text-left"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className={`mt-1 block w-full px-3 py-1.5 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500`}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600 text-left">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 text-left"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
              className={`mt-1 block w-full px-3 py-1.5 border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500`}
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600 text-left">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 text-left">
              Gender
            </label>
            <div className="mt-1 flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="male"
                  {...register("gender")}
                  className="form-radio text-pink-500 focus:ring-pink-500"
                />
                <span className="ml-2 text-gray-700">Male</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="female"
                  {...register("gender")}
                  className="form-radio text-pink-500 focus:ring-pink-500"
                />
                <span className="ml-2 text-gray-700">Female</span>
              </label>
            </div>
            {errors.gender && (
              <p className="mt-1 text-sm text-red-600 text-left">
                {errors.gender.message}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-gradient-to-r from-indigo-600 to-pink-600 rounded-md shadow-lg hover:from-pink-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-pink-600 hover:text-pink-500 font-medium"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
