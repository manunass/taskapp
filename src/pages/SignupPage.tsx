import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import styles from '../fStyles/SignupPage.styles';

const signupSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignupFormData = z.infer<typeof signupSchema>;

const SignupPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual signup logic with Supabase
      console.log('Signup data:', data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <CardHeader className={styles.header}>
          <CardTitle className={styles.title}>Create your account</CardTitle>
          <CardDescription className={styles.subtitle}>
            Sign up to get started
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.inputGroup}>
              <Label htmlFor="email" className={styles.label}>
                Email Address
              </Label>
              <div className={styles.inputWrapper}>
                <Mail className={styles.inputIcon} />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className={styles.input}
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className={styles.errorText}>{errors.email.message}</p>
              )}
            </div>

            <div className={styles.inputGroup}>
              <Label htmlFor="password" className={styles.label}>
                Password
              </Label>
              <div className={styles.inputWrapper}>
                <Lock className={styles.inputIcon} />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  className={styles.input}
                  {...register('password')}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.passwordToggle}
                >
                  {showPassword ? (
                    <EyeOff className={styles.eyeIcon} />
                  ) : (
                    <Eye className={styles.eyeIcon} />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className={styles.errorText}>{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className={styles.submitButton}
            >
              {isLoading ? (
                <>
                  <Loader2 className={styles.loaderIcon} />
                  Signing up...
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
          </form>

          <p className={styles.loginText}>
            Already have an account?{' '}
            <Link to="/login" className={styles.loginLink}>
              Log in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;
