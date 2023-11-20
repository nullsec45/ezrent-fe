'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { initialLogin } from '@/config/constant/auth/authInitialValues';
import { loginSchema } from '@/config/schema/auth/authSchema';
import { toast } from '@/components/ui/use-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { login } from '@/utils/api';
import ButtonSubmit from '@/components/elements/button/ButtonSubmit';
import LoginInput from '@/components/elements/input/LoginInput';

export default function LoginForm() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialLogin,
    resolver: yupResolver(loginSchema),
  });
  const { push } = useRouter();

  const handleLogin = async (data) => {
    try {
      const response = await login(data);
      if (response.status === 200) {
        reset(initialLogin);
        const accessToken = response.data?.data?.accessToken;
        localStorage.setItem('accessToken', accessToken);
        push('/product');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error?.message,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <LoginInput errors={errors} register={register} />
        </CardContent>
        <CardFooter>
          <ButtonSubmit isSubmitting={isSubmitting} text={'Login'} />
        </CardFooter>
      </Card>
    </form>
  );
}
