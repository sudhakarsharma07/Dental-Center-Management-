import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Stethoscope, AlertCircle } from 'lucide-react';

export const LoginForm: React.FC = () => {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const success = await login(email, password);
    if (!success) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Branding Panel */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-100 via-white to-green-100 items-center justify-center p-10">
        <div className="flex flex-col items-center justify-center text-center max-w-md">
          <div className="bg-blue-100 p-3 rounded-full shadow mb-3">
            <Stethoscope className="w-8 h-8 text-blue-700" />
          </div>
          <h1 className="text-4xl font-bold text-blue-800 mb-2">
            Dental<span className="text-green-500">Care</span>
          </h1>
          <p className="text-blue-800 text-sm">
            Streamline patient records, appointments, and dental care—all in one dashboard.
          </p>
        </div>
      </div>

      {/* Right Login Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 px-6 py-12">
        <Card className="w-full max-w-md shadow-xl border border-gray-100 rounded-xl bg-white">
          <div className="text-center mb-6">
            {/* Same Logo */}
            <div className="flex items-center gap-2 justify-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full shadow">
                <Stethoscope className="w-6 h-6 text-blue-700" />
              </div>
              <h1 className="text-2xl font-extrabold text-blue-800 tracking-tight">
                Dental<span className="text-green-500">Care</span>
              </h1>
            </div>
            <p className="text-sm text-gray-500">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-sm text-red-700 rounded-md">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span>{error}</span>
              </div>
            )}

            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@entnt.in"
              disabled={isLoading}
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              disabled={isLoading}
            />

            <Button
              type="submit"
              size="lg"
              isLoading={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-600 space-y-2">
            <p className="font-medium text-gray-800">Demo Accounts</p>
            <div className="text-xs space-y-1">
              <p><strong>Admin:</strong> admin@entnt.in / admin123</p>
              <p><strong>Patient:</strong> john@entnt.in / patient123</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
