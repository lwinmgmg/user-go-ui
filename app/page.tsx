import Input from "@/src/components/forms/input"
import { redirect } from "next/navigation";

export default function Home() {
  redirect('/profile');
  return (
    <main className="flex flex-row justify-center items-center h-full">
      
    </main>
  );
}
