import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";

const supabase = createClient(
  "https://hbdmhlxvvpttebeegkzq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhiZG1obHh2dnB0dGViZWVna3pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI3NDA4NzYsImV4cCI6MjAyODMxNjg3Nn0.PtsbLBnKOwDStOAklI1DnIZZdptUvQHEHfXRhetJBf8"
);

export default function RatingPage() {
  const [user, setUser] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then((value: any) => {
        if (value.data?.user) {
          console.log(value.data.user);
          setUser(value.data.user);
        }
      });
    }
    getUserData();
  }, []);

  async function signOutUser() {
    const { error } = await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <div>
      <></>
      <button onClick={() => signOutUser()}>
        Sign Out
      </button>
    </div>
  );
}
