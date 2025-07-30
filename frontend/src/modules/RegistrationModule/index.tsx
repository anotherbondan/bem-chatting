"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const registerSchema = z.object({
  username: z.string().min(3),
  password: z.string(),
  profileName: z.string().min(1),
  phoneNumber: z.string().min(10),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegistrationModule() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: RegisterForm) => {
    console.log("Form Data:", data);

    setLoading(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      toast.success("Register success, please log in");
      setTimeout(() => router.push("/login"), 1500);
    } else {
      const errText = await res.text();
      toast.error("Register failed: " + errText);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 pt-16">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold font-roboto-flex mb-4 text-center">
          Register
        </h2>

        <div>
          <label className="block mb-1">Username</label>
          <input
            {...register("username")}
            className="w-full border px-3 py-2 rounded-xl"
          />
          {errors.username && (
            <p className="text-sm text-red-500">{errors.username.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full border px-3 py-2 rounded-xl"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Profile Name</label>
          <input
            {...register("profileName")}
            className="w-full border px-3 py-2 rounded-xl"
          />
          {errors.profileName && (
            <p className="text-sm text-red-500">{errors.profileName.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Phone Number</label>
          <input
            {...register("phoneNumber")}
            className="w-full border px-3 py-2 rounded-xl"
          />
          {errors.phoneNumber && (
            <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
          )}
        </div>

        <Button type="submit" disabled={loading} className="flex w-full">
          {loading ? "Registering..." : "Register"}
        </Button>
      </form>
    </div>
  );
}
