"use client"
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function RegistrationForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    // Validate email
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            return 'Email is required';
        }
        if (!emailRegex.test(email)) {
            return 'Please provide a valid email address';
        }
        return '';
    };

    // Validate password
    const validatePassword = (password) => {
        if (!password) {
            return 'Password is required';
        }
        if (password.length < 6) {
            return 'Password must be at least 6 characters';
        }
        return '';
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Validate and clear error for the current field
        setErrors(prev => ({
            ...prev,
            [name]: name === 'email'
                ? validateEmail(value)
                : validatePassword(value)
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all fields
        const emailError = validateEmail(formData.email);
        const passwordError = validatePassword(formData.password);

        // Set errors if any
        if (emailError || passwordError) {
            setErrors({
                email: emailError,
                password: passwordError
            });
            return;
        }

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            // Simulate toast and navigation
            alert("User registered successfully. You'll be redirected to Login page");
            // In a real app, you'd use router to navigate
            window.location.href = "/login";
        } catch (error) {
            console.error("Registration Failed:", error);
            alert("Uh oh! Something went wrong. There was a problem with your request.");
        }
    };

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="text-center text-3xl">Sign up to HomeHero</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-base mb-2">Email</label>
                        <Input
                            id="email"
                            name="email"
                            type="text"
                            placeholder="youremail@domain.com"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full ${errors.email ? 'border-red-500' : ''}`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-base mb-2">Password</label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full ${errors.password ? 'border-red-500' : ''}`}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>

                    <Button type="submit" className="w-full mt-4">
                        Sign Up
                    </Button>
                </form>
            </CardContent>
            <CardFooter>
                <CardDescription className="flex justify-center w-full gap-x-1">
                    Already have an account?
                    <a href="/login" className="text-blue-600 hover:underline">
                        Login
                    </a>
                </CardDescription>
            </CardFooter>
        </Card>
    );
}