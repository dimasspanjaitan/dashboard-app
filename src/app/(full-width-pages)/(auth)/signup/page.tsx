import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SignUp Page | DIKEY TECH.",
  description: "This is SignUp Page",
  // other metadata
};

export default function SignUp() {
  return <SignUpForm />;
}
