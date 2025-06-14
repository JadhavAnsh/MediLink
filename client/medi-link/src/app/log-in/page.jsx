'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/lib/auth';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function LogInPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);

  try {
    await login(email, password);
    toast.success('Login successful! Redirecting...');
    router.push('/');
  } catch (err) {
    console.error(err);
    setError(err.message || 'Invalid credentials');
    toast.error(err.message || 'Login failed');
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0e0e0e] px-4 py-12 overflow-x-hidden">
      <div className="flex flex-col md:flex-row bg-[#161616] rounded-[22px] overflow-hidden shadow-2xl max-w-[1000px] w-full min-h-[460px]">
        {/* Left: Form Section */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <div className="mb-5">
            <h2 className="text-white text-3xl font-bold">Hi there, Welcome Back</h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Get Started with Medi-Link.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email" className="text-white">Email address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-2 bg-[#1f1f1f] border border-[#333] text-white"
                required
              />
            </div>

            <div className="relative">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-2 bg-[#1f1f1f] border border-[#333] text-white pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-10 right-3 -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 rounded-lg mt-4"
            >
              Get Started
            </Button>

            <p className="text-sm text-muted-foreground text-center mt-2">
              Don&apos;t have an account?{' '}
              <Link
                href="/sign-up"
                className="text-emerald-500 hover:underline hover:text-emerald-400"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>

        {/* Right: Image Section */}
        <div className="hidden md:block md:w-1/2 relative h-[460px]">
          <Image
            src="/logIn-banner.png"
            alt="Doctor Login Illustration"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
