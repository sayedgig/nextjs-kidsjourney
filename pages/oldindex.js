import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
  
  const { data: session } = useSession();
  console.log("session",session);
  if (!session) {
    return (
      <div className="bg-bgGray w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button onClick={() => signIn('google')} className="bg-white p-2 px-4 rounded-lg">Login with Google</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bgGray w-screen h-screen flex items-center">
        <div className="text-center w-full">
          login in {session.user.email}
        </div>
      </div>

  );
}