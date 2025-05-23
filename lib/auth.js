
import { connect } from "@/lib/mongodb"
import User from "@/lib/models/User";
import { compare } from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions = {
    debug: true,
    session: {
        strategy: "jwt",
    },

    pages: {
        signIn: "/login",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {

                await connect();
                const existedUser = await User.findOne({ email: credentials?.email });

                if (!existedUser) {
                    throw new Error("Invalid email or password");
                }

                const correctPassword = await compare(
                    credentials.password,
                    existedUser.password
                );

                if (!correctPassword) {
                    throw new Error("Invalid email or password");
                }

                return {
                    id: existedUser._id,
                    email: existedUser.email,
                };
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
};