export interface JwtPayload {
  exp?: number;
  [key: string]: unknown;
}

export function decodeJwt(token: string): JwtPayload | null {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;

    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(normalized)
        .split("")
        .map((char) => "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function isTokenValid(token: string | null | undefined): token is string {
  if (!token) return false;

  const payload = decodeJwt(token);
  if (!payload) return false;

  if (typeof payload.exp !== "number") return true;

  return payload.exp * 1000 > Date.now();
}
