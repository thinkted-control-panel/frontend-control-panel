"use client";

import logo from "../../imports/logo.svg";
import puzzleIllustration from "../../imports/login-illustration.svg";
import Image from "next/image";
import { CustomTextInput } from "@/components/forms/TextInput";
import { useForm } from "react-hook-form";
import { ILogin } from "@/interfaces/ILogin";
import { CustomButton } from "@/components/forms/CustomButton";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILogin>();
  const { setToken } = useAuth();

  const onSubmit = async () => {
    // DEV BYPASS — remove when control_panel_backend is configured
    setToken("dev-bypass-token");
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
        <form className="flex flex-col gap-3 w-full max-w-md items-center">
          <CustomTextInput
            {...register("email")}
            type="email"
            label="Email"
            placeholder="Insira seu e-mail"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <CustomTextInput
            {...register("password")}
            label="Senha"
            placeholder="Insira sua senha"
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <CustomButton onClick={handleSubmit(onSubmit)} isLoading={isSubmitting}>
            Entrar
          </CustomButton>
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
