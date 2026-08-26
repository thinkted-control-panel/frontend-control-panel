import NextAuth from "next-auth";
import Keycloak from "next-auth/providers/keycloak";
import type { JWT } from "next-auth/jwt";

type KeycloakProfile = {
  preferred_username?: string;
};

const keycloakIssuer = process.env.KEYCLOAK_ISSUER;
const keycloakOpenIdConnectUrl = keycloakIssuer
  ? `${keycloakIssuer}/protocol/openid-connect`
  : undefined;
const keycloakEndpoint = (path: string) =>
  keycloakOpenIdConnectUrl ? `${keycloakOpenIdConnectUrl}/${path}` : undefined;

async function refreshAccessToken(token: JWT): Promise<JWT> {
  const clientId = process.env.KEYCLOAK_CLIENT_ID;
  const clientSecret = process.env.KEYCLOAK_CLIENT_SECRET;

  if (
    !keycloakOpenIdConnectUrl ||
    !clientId ||
    !clientSecret ||
    !token.refreshToken
  ) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }

  try {
    const response = await fetch(`${keycloakOpenIdConnectUrl}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: token.refreshToken,
      }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
      idToken: refreshedTokens.id_token ?? token.idToken,
      error: undefined,
    };
  } catch {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Keycloak({
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
      issuer: keycloakIssuer,
      authorization: keycloakEndpoint("auth"),
      token: keycloakEndpoint("token"),
      userinfo: keycloakEndpoint("userinfo"),
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        const keycloakProfile = profile as KeycloakProfile | undefined;

        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          idToken: account.id_token,
          accessTokenExpires: account.expires_at
            ? account.expires_at * 1000
            : Date.now() + Number(account.expires_in ?? 0) * 1000,
          username: keycloakProfile?.preferred_username,
        };
      }

      if (
        token.accessTokenExpires &&
        Date.now() < token.accessTokenExpires - 60_000
      ) {
        return token;
      }

      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub;
        }

        if (typeof token.username === "string") {
          session.user.username = token.username;
        }
      }

      session.accessToken = token.accessToken;
      session.error = token.error;

      return session;
    },
  },
});
