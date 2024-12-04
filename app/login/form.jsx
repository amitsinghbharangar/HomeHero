"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function LoginForm() {
    const router = useRouter();
    const { toast } = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        const { email, password } = data;

        try {
            const response = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (response.error) {
                toast({
                    variant: "destructive",
                    title: "Login Failed",
                    description: response.error,
                });
                return;
            }

            toast({
                title: "User logged in successfully.",
                description: "You will be redirected to the dashboard.",
            });
            router.push("/");
        } catch (error) {
            console.error("Login Failed:", error.message);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            });
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-center text-3xl">Login to HOMEHERO</CardTitle>
            </CardHeader>
            <CardContent>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="px-8 py-4 space-y-5"
                >
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <Input
                            placeholder="youremail@domain.com"
                            {...register("email", {
                                required: "Email is required.",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email address.",
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Password</label>
                        <Input
                            type="password"
                            placeholder="Password"
                            {...register("password", {
                                required: "Password is required.",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Password must be at least 6 characters.",
                                },
                            })}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Logging in..." : "Login"}
                    </Button>
                </form>
            </CardContent>
            <CardFooter>
                <CardDescription className="flex justify-center w-full gap-x-1">
                    Don't have an account?
                    <Link href={"/register"} className="text-primary hover:underline">
                        Sign Up
                    </Link>
                </CardDescription>
            </CardFooter>
        </Card>
    );
}
