"use client";

import logo from "../../imports/logo.svg";
import puzzleIllustration from "../../imports/login-illustration.svg";
import Image from "next/image";
import { CustomTextInput } from "@/components/forms/TextInput";
import { useForm } from "react-hook-form";
import { ILogin } from "@/interfaces/ILogin";
import { CustomButton } from "@/components/forms/CustomButton";
import { toast } from "react-toastify";

export default function Login() {
  const { register, handleSubmit } = useForm<ILogin>();

  const onSubmit = (data: ILogin) => {
    toast.success(`Login realizado com sucesso! Bem-vindo, ${data.email}`);
  }

  return (
    <div className="flex h-screen">
      <div className="flex flex-col w-1/2 h-full justify-center items-center gap-5 px-10">
        <div className="w-full max-w-md flex flex-col gap-2 items-center">
          <Image src={logo} alt="Logo Control Panel" />
          <h1>Ecossistima</h1>
          <h5>Seja bem-vindo</h5>{" "}
        </div>
        <form className="flex flex-col gap-3 w-full max-w-md items-center">
          <CustomTextInput
            {...register("email")}
            type="email"
            label="Email"
            placeholder="Insira seu e-mail"
          />
          <CustomTextInput
            {...register("password")}
            label="Senha"
            placeholder="Insira sua senha"
            type="password"
          />

          <CustomButton onClick={handleSubmit(onSubmit)}>Entrar</CustomButton>
        </form>
      </div>

      <div className="flex w-1/2 h-full">
        <Image
          src={puzzleIllustration}
          alt="Ilustração Puzzle"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
