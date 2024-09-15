import CredentialsProvider from 'next-auth/providers/credentials'
import { randomUUID, randomBytes } from 'crypto'

export const authOptions = {
  /* providers */
  providers: [
    // ユーザ用認証
    CredentialsProvider({
      id: 'user',
      name: 'User',
      credentials: {
        email: { label: 'メールアドレス', type: 'email', placeholder: 'メールアドレス' },
        password: { label: 'パスワード', type: 'password' }
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/user`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: {
            'Content-Type': 'application/json'
          }
        })

        const user = res.json()

        if (res.ok && user) {
          return user
        }
        
        return null
      },
    }),
  ],

  /* callbacks */
  callbacks: {
  },

  /* secret */
  secret: process.env.NEXTAUTH_SECRET,

  /* jwt */
  jwt: {
    maxAge: 3 * 24 * 60 * 60,       // 3 days 
  },

  /* session */
  session: {
    maxAge: 30 * 24 * 60 * 60,      // 30 days
    updateAge: 24 * 60 * 60,        // 24 hours
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex")
    }
  }
}