import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <main className="h-screen flex items-center justify-center p-6">
        <Link
          href={"/login"}
          className="w-full p-3 rounded-md text-white bg-[#0040C1] focus:outline-none cursor-pointer"
        >
          Login
        </Link>
      </main>
    );
  } else {
    return (
      <main className="h-screen flex items-center justify-center p-6">
        <Link
          href={"/login"}
          className="w-full p-3 rounded-md text-white bg-[#0040C1] focus:outline-none cursor-pointer"
        >
          Return to Dashboard
        </Link>
      </main>
    );
  }
}
