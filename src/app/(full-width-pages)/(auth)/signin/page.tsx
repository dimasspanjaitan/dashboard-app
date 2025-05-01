import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SignIn Page | DIKEY TECH.",
  description: "This is Signin Page",
};

export default function SignIn() {
  return <SignInForm />;
}
