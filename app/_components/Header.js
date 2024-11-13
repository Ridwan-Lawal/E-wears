import Navigation from "@/app/_components/Navigation";
import { auth } from "@/auth";

async function Header() {
  // creating a new user in supabase, for each new user that sign in into our application

  //   create a UUID col in users table supabase and link it to the cart

  const session = await auth();

  return (
    <header>
      <Navigation session={session} />
    </header>
  );
}

export default Header;
