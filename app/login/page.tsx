"use client";

import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react";

import { CustomButton } from "@/components/forms/CustomButton";
import logo from "../../imports/logo.svg";
import puzzleIllustration from "../../imports/login-illustration.svg";

export default function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    setIsSubmitting(true);
    const callbackUrl =
      new URLSearchParams(window.location.search).get("callbackUrl") ??
      "/dashboard";

    await signIn("keycloak", { redirectTo: callbackUrl });
  };

  return (
    <div className=" font-poppins flex h-screen">
      <div className="flex flex-col w-1/2 h-full justify-center items-center gap-5 px-10">
        <div className="w-full max-w-md flex flex-col gap-2 items-center">
          <Image src={logo} alt="Logo Control Panel" />
          <h1 className="font-poppins font-bold text-6xl text-[#142E82]">
            Ecossistema
          </h1>
          <h5>Seja bem-vindo</h5>
        </div>

        <div className="flex flex-col gap-3 w-full max-w-md items-center">
          <CustomButton
            type="button"
            onClick={handleLogin}
            isLoading={isSubmitting}
          >
            Entrar
          </CustomButton>
        </div>
      </div>

      <div className="flex w-1/2 h-full">
        <Image
          src={puzzleIllustration}
          alt="Ilustracao Puzzle"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
