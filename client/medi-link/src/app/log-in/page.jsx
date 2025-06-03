'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function LogInPage() {
  const [showPassword, setShowPassword] = useState(false);

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

          <form className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-white">
                Email address
              </Label>
              <Input
                id="email"
                placeholder="you@example.com"
                className="mt-2 bg-[#1f1f1f] border border-[#333] text-white"
              />
            </div>

            <div className="relative">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="mt-2 bg-[#1f1f1f] border border-[#333] text-white pr-10"
              />
              <Button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-9 right-3 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </Button>
            </div>

            <Button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 rounded-lg mt-4"
            >
              Get Started
            </Button>

            {/* Sign Up link */}
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
