import { useEffect, useState } from "react";
import supabase from "./supabase";

// undefined = abhi check ho raha hai, null = login nahi, object = login hai
const useSession = () => {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    // localStorage mein saved session uthao
    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    // login / logout hone par session update karo
    const { data } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  return session;
};

export default useSession;
