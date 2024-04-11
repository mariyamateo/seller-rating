"use client";
import RatingPage from "@/components/Rating";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const supabase = createClientComponentClient();

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    }

    getUser();
  }, []);

  const handleSignUp = async () => {
    const res = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    setUser(res.data.user);
    router.refresh();
    setEmail("");
    setPassword("");
  };

  const handleSignIn = async () => {
    const res = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setUser(res.data.user);
    router.refresh();
    setEmail("");
    setPassword("");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center p-6">
        <h1>Loading..</h1>
      </div>
    );
  }

  if (user) {
    return (
      <div className="lg:h-screen flex flex-col justify-center items-center m-20 md:m-auto">
        <div className="flex flex-col justify-center items-center gap-14 pt-40 pb-12 xl:p-0">
          <RatingPage />
          <button
            onClick={handleLogout}
            className="w-fit p-3 rounded-md bg-[#0040C1] text-white hover:bg-red-600 focus:outline-none m-auto"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="h-screen flex items-center justify-center p-6">
      <div className="p-8 rounded-lg shadow-md w-96">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="mb-4 w-full p-3 rounded-md border border-gray-700 placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mb-4 w-full p-3 rounded-md border border-gray-700 placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSignUp}
          className="w-full mb-2 p-3 rounded-md bg-[#0040C1] text-white hover:bg-blue-700 focus:outline-none"
        >
          Sign Up
        </button>
        <button
          onClick={handleSignIn}
          className="w-full p-3 rounded-md bg-gray-700 text-white hover:bg-gray-600 focus:outline-none"
        >
          Sign In
        </button>
      </div>
    </main>
  );
}
