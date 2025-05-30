'use client';

import { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import Portal from '@/components/ui/portal';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [clickedElements, setClickedElements] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  if (!isOpen) return null;

  const handleClick = (elementId: string) => {
    setClickedElements((prev) => [...prev, elementId]);
    setTimeout(() => {
      setClickedElements((prev) => prev.filter((id) => id !== elementId));
    }, 1000);
  };

  const toggleMode = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setMode(mode === 'login' ? 'register' : 'login');
      setIsAnimating(false);
    }, 150);
  };

  return (
    <Portal>
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/60 to-green-900/80 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-64 h-64 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />
        </div>

        <Card className="w-full max-w-5xl bg-white/95 backdrop-blur-lg rounded-3xl overflow-hidden relative shadow-2xl border-0 transform hover:scale-[1.02] transition-all duration-500">
          <button
            onClick={() => {
              handleClick('close-button');
              onClose();
            }}
            className="absolute top-6 right-6 z-10 p-3 hover:bg-red-50 rounded-full transition-all duration-300 group hover:scale-110 active:scale-95"
          >
            <X
              className={`h-6 w-6 text-slate-600 group-hover:text-red-500 transition-colors ${clickedElements.includes('close-button') ? 'animate-spin' : ''}`}
            />
          </button>

          <div className="flex min-h-[600px]">
            {/* Left side - Enhanced visual */}
            <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-green-500 to-blue-600 relative overflow-hidden">
              {/* Animated background patterns */}
              <div className="absolute inset-0">
                <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse" />
                <div className="absolute bottom-20 right-10 w-24 h-24 bg-white/20 rounded-full animate-pulse delay-1000" />
              </div>

              <div className="relative z-10 flex flex-col items-center justify-center p-12 text-white text-center space-y-8">
                <div className="relative">
                  <div
                    className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center hover:rotate-12 transition-transform duration-500 cursor-pointer group"
                    onClick={() => handleClick('logo-icon')}
                  >
                    <div className="relative">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`h-16 w-16 text-white ${clickedElements.includes('logo-icon') ? 'animate-bounce' : 'group-hover:animate-pulse'}`}
                      >
                        <path d="M2 12a10 10 0 0 0 20 0" />
                        <path d="M2 12a10 10 0 0 1 20 0" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-white hover:scale-105 transition-transform cursor-pointer">
                    {mode === 'register' ? 'Create Account' : 'Welcome Back!'}
                  </h3>
                  <p className="text-green-100 text-lg leading-relaxed hover:text-white transition-colors cursor-pointer">
                    {mode === 'register'
                      ? 'Start your journey with us!'
                      : 'Continue your mission!'}
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Enhanced form */}
            <div className="w-full md:w-1/2 p-8 lg:p-12">
              <CardContent className="p-0 space-y-8">
                <div
                  className={`transition-all duration-300 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
                >
                  {mode === 'register' ? (
                    <>
                      {/* Enhanced Register Form */}
                      <div className="text-center space-y-4">
                        <h2 className="text-3xl lg:text-4xl font-bold text-green-600 hover:text-green-700 transition-all duration-500 cursor-pointer">
                          Create Account
                        </h2>
                        <p className="text-slate-600 text-lg">
                          Enter your details below:
                        </p>
                      </div>

                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <Label
                              htmlFor="firstName"
                              className="text-sm font-semibold text-slate-700 flex items-center gap-2"
                            >
                              First Name
                            </Label>
                            <Input
                              id="firstName"
                              placeholder="Your first name"
                              className="border-2 border-green-200 focus:border-green-500 focus:ring-green-500/20 rounded-xl py-3 transition-all duration-300 hover:border-green-300 hover:shadow-md focus:shadow-lg"
                            />
                          </div>
                          <div className="space-y-3">
                            <Label
                              htmlFor="lastName"
                              className="text-sm font-semibold text-slate-700 flex items-center gap-2"
                            >
                              Last Name
                            </Label>
                            <Input
                              id="lastName"
                              placeholder="Your last name"
                              className="border-2 border-blue-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl py-3 transition-all duration-300 hover:border-blue-300 hover:shadow-md focus:shadow-lg"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label
                            htmlFor="email"
                            className="text-sm font-semibold text-slate-700 flex items-center gap-2"
                          >
                            Email
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="email@example.com"
                            className="border-2 border-green-200 focus:border-green-500 focus:ring-green-500/20 rounded-xl py-3 transition-all duration-300 hover:border-green-300 hover:shadow-md focus:shadow-lg"
                          />
                        </div>

                        <div className="space-y-3">
                          <Label
                            htmlFor="password"
                            className="text-sm font-semibold text-slate-700 flex items-center gap-2"
                          >
                            Password
                          </Label>
                          <div className="relative">
                            <Input
                              id="password"
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Enter a strong password"
                              className="border-2 border-green-200 focus:border-green-500 focus:ring-green-500/20 rounded-xl py-3 pr-12 transition-all duration-300 hover:border-green-300 hover:shadow-md focus:shadow-lg"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setShowPassword(!showPassword);
                                handleClick('toggle-password');
                              }}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400 hover:text-green-600 p-1 rounded-lg hover:bg-green-50 transition-all duration-300 hover:scale-110 active:scale-95"
                            >
                              {showPassword ? (
                                <EyeOff
                                  className={`h-5 w-5 ${clickedElements.includes('toggle-password') ? 'animate-pulse' : ''}`}
                                />
                              ) : (
                                <Eye
                                  className={`h-5 w-5 ${clickedElements.includes('toggle-password') ? 'animate-pulse' : ''}`}
                                />
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label
                            htmlFor="confirmPassword"
                            className="text-sm font-semibold text-slate-700 flex items-center gap-2"
                          >
                            Confirm Password
                          </Label>
                          <div className="relative">
                            <Input
                              id="confirmPassword"
                              type={showConfirmPassword ? 'text' : 'password'}
                              placeholder="Confirm your password"
                              className="border-2 border-blue-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl py-3 pr-12 transition-all duration-300 hover:border-blue-300 hover:shadow-md focus:shadow-lg"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setShowConfirmPassword(!showConfirmPassword);
                                handleClick('toggle-confirm-password');
                              }}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-600 p-1 rounded-lg hover:bg-blue-50 transition-all duration-300 hover:scale-110 active:scale-95"
                            >
                              {showConfirmPassword ? (
                                <EyeOff
                                  className={`h-5 w-5 ${clickedElements.includes('toggle-confirm-password') ? 'animate-pulse' : ''}`}
                                />
                              ) : (
                                <Eye
                                  className={`h-5 w-5 ${clickedElements.includes('toggle-confirm-password') ? 'animate-pulse' : ''}`}
                                />
                              )}
                            </button>
                          </div>
                        </div>

                        <Button
                          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 group"
                          onClick={() => handleClick('register-submit')}
                        >
                          <span>Register</span>
                        </Button>

                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200"></div>
                          </div>
                          <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-4 text-slate-500 font-medium">
                              OR
                            </span>
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          className="w-full py-4 rounded-xl border-2 border-slate-200 hover:border-green-300 hover:bg-green-50 transition-all duration-300 transform hover:scale-105 active:scale-95 group"
                          onClick={() => handleClick('google-register')}
                        >
                          <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                            <path
                              fill="#4285F4"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                              fill="#34A853"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                              fill="#FBBC05"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                              fill="#EA4335"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                          </svg>
                          <span
                            className={`text-lg font-medium ${clickedElements.includes('google-register') ? 'animate-pulse' : ''}`}
                          >
                            Register with Google
                          </span>
                        </Button>

                        <p className="text-center text-slate-600 text-lg">
                          Already have an account?{' '}
                          <button
                            onClick={() => {
                              toggleMode();
                              handleClick('switch-to-login');
                            }}
                            className="text-green-600 hover:text-green-700 font-bold hover:underline transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center gap-1"
                          >
                            <span
                              className={
                                clickedElements.includes('switch-to-login')
                                  ? 'animate-pulse'
                                  : ''
                              }
                            >
                              Login here
                            </span>
                          </button>
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Enhanced Login Form */}
                      <div className="text-center space-y-4">
                        <h2 className="text-3xl lg:text-4xl font-bold text-blue-600 hover:text-blue-700 transition-all duration-500 cursor-pointer">
                          Login to Your Account
                        </h2>
                        <p className="text-slate-600 text-lg">Welcome back!</p>
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-3">
                          <Label
                            htmlFor="loginEmail"
                            className="text-sm font-semibold text-slate-700 flex items-center gap-2"
                          >
                            Email
                          </Label>
                          <Input
                            id="loginEmail"
                            type="email"
                            placeholder="email@example.com"
                            className="border-2 border-blue-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl py-4 transition-all duration-300 hover:border-blue-300 hover:shadow-md focus:shadow-lg text-lg"
                          />
                        </div>

                        <div className="space-y-3">
                          <Label
                            htmlFor="loginPassword"
                            className="text-sm font-semibold text-slate-700 flex items-center gap-2"
                          >
                            Password
                          </Label>
                          <div className="relative">
                            <Input
                              id="loginPassword"
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Enter your password"
                              className="border-2 border-green-200 focus:border-green-500 focus:ring-green-500/20 rounded-xl py-4 pr-12 transition-all duration-300 hover:border-green-300 hover:shadow-md focus:shadow-lg text-lg"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setShowPassword(!showPassword);
                                handleClick('toggle-login-password');
                              }}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400 hover:text-green-600 p-1 rounded-lg hover:bg-green-50 transition-all duration-300 hover:scale-110 active:scale-95"
                            >
                              {showPassword ? (
                                <EyeOff
                                  className={`h-5 w-5 ${clickedElements.includes('toggle-login-password') ? 'animate-pulse' : ''}`}
                                />
                              ) : (
                                <Eye
                                  className={`h-5 w-5 ${clickedElements.includes('toggle-login-password') ? 'animate-pulse' : ''}`}
                                />
                              )}
                            </button>
                          </div>
                        </div>

                        <Button
                          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 group"
                          onClick={() => handleClick('login-submit')}
                        >
                          <span>Login</span>
                        </Button>

                        <div className="text-center">
                          <button
                            className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center gap-2"
                            onClick={() => handleClick('forgot-password')}
                          >
                            <span>Forgot password?</span>
                          </button>
                        </div>

                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200"></div>
                          </div>
                          <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-4 text-slate-500 font-medium">
                              OR
                            </span>
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          className="w-full py-4 rounded-xl border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 active:scale-95 group"
                          onClick={() => handleClick('google-login')}
                        >
                          <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                            <path
                              fill="#4285F4"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                              fill="#34A853"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                              fill="#FBBC05"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                              fill="#EA4335"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                          </svg>
                          <span
                            className={`text-lg font-medium ${clickedElements.includes('google-login') ? 'animate-pulse' : ''}`}
                          >
                            Login with Google
                          </span>
                        </Button>

                        <p className="text-center text-slate-600 text-lg">
                          Don&apos;t have an account?{' '}
                          <button
                            onClick={() => {
                              toggleMode();
                              handleClick('switch-to-register');
                            }}
                            className="text-blue-600 hover:text-blue-700 font-bold hover:underline transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center gap-1"
                          >
                            <span
                              className={
                                clickedElements.includes('switch-to-register')
                                  ? 'animate-pulse'
                                  : ''
                              }
                            >
                              Register here
                            </span>
                          </button>
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    </Portal>
  );
}
