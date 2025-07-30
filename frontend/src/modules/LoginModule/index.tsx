"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginModule() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: {
          Authorization: "Basic " + btoa(`${username}:${password}`),
        },
      });

      if (!res.ok) {
        const errText = await res.text();
        toast.error("Login gagal: " + errText);
        return;
      }

      const data = await res.json();
      toast.success(data.message || "Login berhasil");
      localStorage.setItem("token", "your-token-value");
      localStorage.setItem("userId", data.user.id);
      window.location.href = "/chats";
    } catch (error) {
      toast.error(
        "Login gagal: " +
          (error instanceof Error ? error.message : "Unknown error")
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow-md w-80"
      >
        <h2 className="text-xl mb-4 font-bold text-center">Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-3 p-2 border rounded-xl"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded-xl"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" className="flex w-full">
          Login
        </Button>
      </form>
    </div>
  );
}
