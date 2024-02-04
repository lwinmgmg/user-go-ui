import FormLogo from "@/src/components/logos/form-logo";
import Input from "@/src/components/forms/input";
import Link from "next/link";
import GoogleSignup from "@/src/components/forms/google-signup";

export default function Signup(){
    return (
        <main className="flex flex-row justify-center items-center h-full">
            <form className="container border rounded-md w-full max-w-md flex flex-col p-5 space-y-2">
                <div className="h-5"></div>
                <FormLogo/>
                <div className="h-3"></div>
                <div className="flex flex-row justify-evenly space-x-1">
                    <div>
                        <Input placeHolder="First Name" label="First Name" />
                    </div>
                    <div>
                        <Input placeHolder="Last Name" label="Last Name" />
                    </div>
                </div>
                <div>
                    <Input label="Username" placeHolder="username" />
                </div>
                <div>
                    <Input label="Email" type="email" placeHolder="example@gmail.com" />
                </div>
                <div className="flex flex-row justify-evenly space-x-1">
                    <div>
                        <Input placeHolder="Password" type="password" label="Password" />
                    </div>
                    <div>
                        <Input placeHolder="Confirm Password" type="password" label="Confirm Password" />
                    </div>
                </div>
                <div className="h-1"></div>
                <p className="text-xs text-slate-600">By creating an account, you agree to the Terms of use and Privacy Policy</p>
                <button className="btn-primary">Sign Up</button>
                <p className="text-sm text-slate-600">If you already have an account, please login <Link href="/login" className="text-blue-400">here</Link></p>
                <p className="text-center text-sm font-bold">Or</p>
                <GoogleSignup />
                <div className="h-5"></div>
            </form>
        </main>
    );
}