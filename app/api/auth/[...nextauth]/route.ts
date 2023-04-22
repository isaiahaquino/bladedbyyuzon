import { compare } from "bcrypt";
import NextAuth, { type NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/prisma/client";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          return null
        }
        const user = await prisma.user.findUnique({
          where: { username: credentials.username }
        })
        if (!user) {
          return null
        }
        const isPasswordValid = await compare(credentials.password, user.password)
        if (!isPasswordValid) {
          return null
        }
        return {
          id: user.id + "",
          username: user.username,
          name: user.name
        }
      }
    })
  ],
  callbacks: {
    session: ({ session, token }) => {
      return { ...session, id:token.id }
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any
        return { ...token, id:u.id }
      }
      return token
    },
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }