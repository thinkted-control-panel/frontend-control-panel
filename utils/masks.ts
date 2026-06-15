// Aplica a máscara DD/MM/AAAA enquanto o usuário digita
export const formatDate = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  const parts: string[] = [];
  if (digits.length > 0) parts.push(digits.slice(0, 2));
  if (digits.length > 2) parts.push(digits.slice(2, 4));
  if (digits.length > 4) parts.push(digits.slice(4, 8));
  return parts.join("/");
};

// Aplica a máscara (00) 0 0000-0000 enquanto o usuário digita
export const formatPhone = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  let result = "";
  if (digits.length > 0) result = `(${digits.slice(0, 2)}`;
  if (digits.length >= 2) result = `(${digits.slice(0, 2)})`;
  if (digits.length > 2) result += ` ${digits.slice(2, 3)}`;
  if (digits.length > 3) result += ` ${digits.slice(3, 7)}`;
  if (digits.length > 7) result += `-${digits.slice(7, 11)}`;
  return result;
};
