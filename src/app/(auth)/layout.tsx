import Image from "next/image";
import LoginImage from "../../../public/login-illustration.png";
import "./../globals.css";

export const metadata = {
  title: "Login | MeroByapar",
  description: "MeroByapar: My way of Business",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex md:w-[80%] md:mx-auto flex-row min-h-screen items-center justify-center md:justify-between">
      <section className="hidden sm:flex w-[30rem]   items-center justify-center h-[30rem] aspect-square  relative ">
        <Image
          src={LoginImage}
          fill
          className="block max-w-full object-contain"
          alt="Login"
        />
      </section>
      <main className="min-w-[80%] sm:min-w-[40%]">{children}</main>
    </div>
  );
}
