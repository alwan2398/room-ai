"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn, signUp } from "@/lib/auth-client";
import { useAuthStore } from "@/store/useAuthStore";
import { Loader2 } from "lucide-react";

const signInSchema = z.object({
  email: z.email("Email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
});

const signUpSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.email("Email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
});

type SignInFormData = z.infer<typeof signInSchema>;
type SignUpFormData = z.infer<typeof signUpSchema>;

interface AuthFormProps {
  defaultTab?: "signin" | "signup";
  onSuccess?: () => void;
}

const AuthForm = ({ defaultTab = "signin", onSuccess }: AuthFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { view, closeAuthModal } = useAuthStore();

  const signInForm = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const signUpForm = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const handleSignIn = async (data: SignInFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      await signIn.email({
        email: data.email,
        password: data.password,
      });
      closeAuthModal();
      onSuccess?.();
    } catch (err) {
      setError("Email atau password salah");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (data: SignUpFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      closeAuthModal();
      onSuccess?.();
    } catch (err) {
      setError("Gagal membuat akun. Email mungkin sudah terdaftar.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn.social({ provider: "google" });
    } catch (err) {
      setError("Gagal masuk dengan Google");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Tabs defaultValue={defaultTab || view} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-zinc-800">
          <TabsTrigger value="signin" className="cursor-pointer">
            Masuk
          </TabsTrigger>
          <TabsTrigger value="signup" className="cursor-pointer">
            Daftar
          </TabsTrigger>
        </TabsList>

        <TabsContent value="signin" className="space-y-4 mt-4">
          <form
            onSubmit={signInForm.handleSubmit(handleSignIn)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="signin-email">Email</Label>
              <Input
                className="placeholder:text-zinc-500"
                id="signin-email"
                type="email"
                placeholder="email@example.com"
                {...signInForm.register("email")}
              />
              {signInForm.formState.errors.email && (
                <p className="text-sm text-destructive">
                  {signInForm.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="signin-password">Password</Label>
              <Input
                className="placeholder:text-zinc-500"
                id="signin-password"
                type="password"
                placeholder="••••••••"
                {...signInForm.register("password")}
              />
              {signInForm.formState.errors.password && (
                <p className="text-sm text-destructive">
                  {signInForm.formState.errors.password.message}
                </p>
              )}
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button
              type="submit"
              className="w-full bg-blue-700 text-white cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Masuk"
              )}
            </Button>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                atau
              </span>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full cursor-pointer"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            <svg className="size-4 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Masuk dengan Google
          </Button>
        </TabsContent>

        <TabsContent value="signup" className="space-y-4 mt-4">
          <form
            onSubmit={signUpForm.handleSubmit(handleSignUp)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="signup-name">Nama</Label>
              <Input
                className="placeholder:text-zinc-500"
                id="signup-name"
                type="text"
                placeholder="Nama lengkap"
                {...signUpForm.register("name")}
              />
              {signUpForm.formState.errors.name && (
                <p className="text-sm text-destructive">
                  {signUpForm.formState.errors.name.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-email">Email</Label>
              <Input
                className="placeholder:text-zinc-500"
                id="signup-email"
                type="email"
                placeholder="email@example.com"
                {...signUpForm.register("email")}
              />
              {signUpForm.formState.errors.email && (
                <p className="text-sm text-destructive">
                  {signUpForm.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-password">Password</Label>
              <Input
                className="placeholder:text-zinc-500"
                id="signup-password"
                type="password"
                placeholder="••••••••"
                {...signUpForm.register("password")}
              />
              {signUpForm.formState.errors.password && (
                <p className="text-sm text-destructive">
                  {signUpForm.formState.errors.password.message}
                </p>
              )}
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button
              type="submit"
              className="w-full cursor-pointer bg-blue-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Daftar"
              )}
            </Button>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                atau
              </span>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full cursor-pointer"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            <svg className="size-4 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Daftar dengan Google
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthForm;
