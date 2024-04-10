import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";

const supabase = createClient(
  "https://hbdmhlxvvpttebeegkzq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhiZG1obHh2dnB0dGViZWVna3pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI3NDA4NzYsImV4cCI6MjAyODMxNjg3Nn0.PtsbLBnKOwDStOAklI1DnIZZdptUvQHEHfXRhetJBf8"
);

export default function LoginPage() {
  const router = useRouter();

  supabase.auth.onAuthStateChange(async (event) => {
    if (event !== "SIGNED_OUT") {
      router.push("rating");
    } else {
      router.push("/");
    }
  });

  return (
    <div>
      <div>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={["discord"]}
        />
      </div>
    </div>
  );
}
