"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, LogIn, ArrowRight } from "lucide-react";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { APP_NAME } from "@/lib/constants";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid email or password");
      } else {
        toast.success("Welcome back!");
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl });
  };

  return (
    <motion.div
      className="glass-card w-full max-w-md p-8"
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="mb-8 text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-6">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{
              background: "linear-gradient(135deg, var(--theme-accent-primary), var(--theme-accent-secondary))",
            }}
          >
            <span className="text-xl font-black text-white">N</span>
          </div>
        </Link>
        <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--theme-font-heading)" }}>
          Welcome back
        </h1>
        <p className="mt-2 text-sm" style={{ color: "var(--theme-text-secondary)" }}>
          Sign in to your {APP_NAME} account
        </p>
      </div>

      {/* Google OAuth */}
      <motion.button
        type="button"
        onClick={handleGoogleSignIn}
        className="btn-secondary mb-6 w-full justify-center gap-3 py-3"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Continue with Google
      </motion.button>

      {/* Divider */}
      <div className="relative mb-6 flex items-center">
        <div className="flex-1 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }} />
        <span className="px-4 text-xs" style={{ color: "var(--theme-text-muted)" }}>
          or sign in with email
        </span>
        <div className="flex-1 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }} />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            Email
          </label>
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
              style={{ color: "var(--theme-text-muted)" }}
            />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field pl-10"
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </div>
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs font-medium transition-colors hover:underline"
              style={{ color: "var(--theme-accent-primary)" }}
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
              style={{ color: "var(--theme-text-muted)" }}
            />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field pl-10 pr-10"
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5"
              style={{ color: "var(--theme-text-muted)" }}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <motion.button
          type="submit"
          className="btn-primary w-full justify-center py-3"
          disabled={isLoading}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <span className="relative z-10 flex items-center gap-2">
            {isLoading ? (
              <motion.div
                className="h-5 w-5 rounded-full border-2 border-white/20 border-t-white"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            ) : (
              <>
                <LogIn className="h-4 w-4" />
                Sign In
              </>
            )}
          </span>
        </motion.button>
      </form>

      {/* Footer */}
      <p className="mt-6 text-center text-sm" style={{ color: "var(--theme-text-secondary)" }}>
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold transition-colors hover:underline"
          style={{ color: "var(--theme-accent-primary)" }}
        >
          Create account <ArrowRight className="inline h-3 w-3" />
        </Link>
      </p>

      {/* Demo credentials */}
      <div
        className="mt-4 rounded-lg p-3 text-center text-xs"
        style={{
          background: "rgba(139, 92, 246, 0.06)",
          border: "1px solid rgba(139, 92, 246, 0.1)",
          color: "var(--theme-text-muted)",
        }}
      >
        <p className="font-medium mb-1" style={{ color: "var(--theme-text-secondary)" }}>Demo Credentials</p>
        <p>Admin: admin@nexstore.com / Admin@123</p>
        <p>Customer: customer@demo.com / Customer@123</p>
      </div>
    </motion.div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <Suspense fallback={
        <div className="flex h-96 w-full max-w-md items-center justify-center rounded-2xl bg-white/5 animate-pulse">
          <div className="h-10 w-10 rounded-full border-2 border-white/20 border-t-white animate-spin" />
        </div>
      }>
        <LoginForm />
      </Suspense>
    </div>
  );
}
