import axios from "axios";
import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { showToast } from "./toast";


interface ProblemDetails {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
  errors?: Record<string, string[]>;
  message?: string;
}

export interface ParsedApiError {
  status: number | null;
  message: string;
  fieldErrors: Record<string, string>;
  isNetworkError: boolean;
}

const NETWORK_ERROR_MESSAGE =
  "Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.";

const TIMEOUT_ERROR_MESSAGE =
  "O servidor demorou para responder. Tente novamente.";

const DEFAULT_ERROR_MESSAGE = "Ocorreu um erro inesperado. Tente novamente.";

const STATUS_MESSAGES: Record<number, string> = {
  400: "Requisição inválida. Revise os dados informados.",
  401: "Credenciais inválidas ou sessão expirada.",
  403: "Você não tem permissão para realizar esta ação.",
  404: "Recurso não encontrado.",
  409: "Este registro já existe.",
  422: "Não foi possível processar os dados enviados.",
  429: "Muitas requisições. Aguarde um instante e tente novamente.",
  500: "Erro interno do servidor. Tente novamente mais tarde.",
  502: "Servidor indisponível no momento. Tente novamente mais tarde.",
  503: "Servidor indisponível no momento. Tente novamente mais tarde.",
};

function normalizeFieldName(field: string): string {
  return field
    .replace(/^\$\./, "")
    .split(".")
    .map((part) => part.charAt(0).toLowerCase() + part.slice(1))
    .join(".");
}

function extractFieldErrors(data: ProblemDetails): Record<string, string> {
  if (!data.errors || typeof data.errors !== "object") return {};

  const fieldErrors: Record<string, string> = {};

  for (const [field, messages] of Object.entries(data.errors)) {
    const message = Array.isArray(messages) ? messages.join(" ") : String(messages);
    if (message) {
      fieldErrors[normalizeFieldName(field)] = message;
    }
  }

  return fieldErrors;
}

function messageForStatus(status: number): string {
  if (STATUS_MESSAGES[status]) return STATUS_MESSAGES[status];
  if (status >= 500) return STATUS_MESSAGES[500];
  return DEFAULT_ERROR_MESSAGE;
}

export function parseApiError(
  error: unknown,
  fallbackMessage: string = DEFAULT_ERROR_MESSAGE
): ParsedApiError {
  if (!axios.isAxiosError(error)) {
    return {
      status: null,
      message: error instanceof Error && error.message ? error.message : fallbackMessage,
      fieldErrors: {},
      isNetworkError: false,
    };
  }

  if (!error.response) {
    return {
      status: null,
      message:
        error.code === "ECONNABORTED" ? TIMEOUT_ERROR_MESSAGE : NETWORK_ERROR_MESSAGE,
      fieldErrors: {},
      isNetworkError: true,
    };
  }

  const { status, data } = error.response;

  if (!data || typeof data !== "object") {
    const message = typeof data === "string" && data.trim() ? data : messageForStatus(status);
    return { status, message, fieldErrors: {}, isNetworkError: false };
  }

  const problem = data as ProblemDetails;
  const fieldErrors = extractFieldErrors(problem);

  const fieldErrorMessages = Object.values(fieldErrors);

  const message =
    fieldErrorMessages.length > 0
      ? fieldErrorMessages.join(" ")
      : problem.detail?.trim() ||
        problem.message?.trim() ||
        problem.title?.trim() ||
        messageForStatus(status);

  return { status, message, fieldErrors, isNetworkError: false };
}

interface HandleApiErrorOptions<T extends FieldValues> {
  /**
   * `setError` do react-hook-form. Quando informado, os erros de validação da
   * API vão para os inputs correspondentes em vez do toast.
   *
   * Exige que os nomes dos campos do formulário sejam iguais aos do DTO do
   * backend (`email`, `password`). Onde os nomes divergirem, não passe esta
   * opção — a mensagem cai no toast e nada se perde.
   */
  setError?: UseFormSetError<T>;
  /** Não exibe nada; só faz o parse. Útil quando a tela já mostra o erro. */
  silent?: boolean;
}

/**
 * Exibe o erro da API em um toast e devolve o erro já normalizado.
 *
 * @param error erro capturado no catch
 * @param fallbackMessage mensagem usada quando a API não informa nada útil
 *
 * @example
 * try {
 *   await updateUser(id, payload);
 * } catch (error) {
 *   handleApiError(error, "Erro ao atualizar usuário.");
 * }
 *
 * @example Direcionando erros de validação para os inputs do formulário
 * const { setError } = useForm<ILogin>();
 * catch (error) {
 *   handleApiError(error, "Erro ao realizar login.", { setError });
 * }
 */
export function handleApiError<T extends FieldValues = FieldValues>(
  error: unknown,
  fallbackMessage: string = DEFAULT_ERROR_MESSAGE,
  options: HandleApiErrorOptions<T> = {}
): ParsedApiError {
  const parsed = parseApiError(error, fallbackMessage);
  const { setError, silent } = options;

  if (silent) return parsed;

  const fieldEntries = Object.entries(parsed.fieldErrors);

  if (setError && fieldEntries.length > 0) {
    for (const [field, message] of fieldEntries) {
      setError(field as Path<T>, { message });
    }
    return parsed;
  }

  showToast.error(parsed.message);

  return parsed;
}
