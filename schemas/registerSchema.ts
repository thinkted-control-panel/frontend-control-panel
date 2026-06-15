import { z } from "zod";

// Valida data no formato DD/MM/AAAA e checa se é uma data real
const isValidDate = (value: string) => {
  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return false;

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);

  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;
  if (year < 1900 || year > new Date().getFullYear()) return false;

  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};

export const registerSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(1, "Informe o nome do usuário")
    .min(3, "O nome deve ter ao menos 3 caracteres"),
  email: z
    .string()
    .trim()
    .min(1, "Informe o e-mail")
    .email("Informe um e-mail válido"),
  dataNascimento: z
    .string()
    .trim()
    .min(1, "Informe a data de nascimento")
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Use o formato DD/MM/AAAA")
    .refine(isValidDate, "Informe uma data válida"),
  telefone: z
    .string()
    .trim()
    .min(1, "Informe o telefone")
    .regex(
      /^\(\d{2}\)\s?\d?\s?\d{4}-?\d{4}$/,
      "Use o formato (00) 0 0000-0000",
    ),
  instituicao: z
    .string()
    .trim()
    .min(1, "Informe a instituição de vínculo"),
  senha: z
    .string()
    .min(8, "A senha deve ter ao menos 8 caracteres")
    .regex(/[a-z]/, "A senha deve conter uma letra minúscula")
    .regex(/[A-Z]/, "A senha deve conter uma letra maiúscula")
    .regex(/[0-9]/, "A senha deve conter um número")
    .regex(/[^a-zA-Z0-9]/, "A senha deve conter um caractere especial"),
  exigirTrocaSenha: z.boolean(),
  objetivo: z
    .string()
    .trim()
    .min(1, "Informe o objetivo de uso"),
  tipos: z.object({
    estudante: z.boolean(),
    professor: z.boolean(),
    pesquisador: z.boolean(),
  }),
  permissoes: z.object({
    gameClass: z.boolean(),
    gameTed: z.boolean(),
    glBoard: z.boolean(),
    thinkLib: z.boolean(),
    thinktest: z.boolean(),
    thinkTedSystem: z.boolean(),
    todos: z.boolean(),
  }),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
