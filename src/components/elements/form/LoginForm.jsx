'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ErrorMessageInput from '@/components/elements/errors/ErrorMessageInput';
import { initialLogin } from '@/config/constant/auth/authInitialValues';
import ButtonSubmit from '@/components/elements/button/ButtonSubmit';
import FieldInput from '@/components/elements/input/FieldInput';
import { loginSchema } from '@/config/schema/auth/authSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { login } from '@/utils/api';

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
          <div className="space-y-1">
            <FieldInput
              name={'email'}
              type={'email'}
              placeholder={'example@gmail.com'}
              register={register}
              required={true}
              autoComplete={'off'}
            />
            <ErrorMessageInput message={errors.email?.message} />
          </div>
          <div className="space-y-1">
            <FieldInput
              name={'password'}
              type={'password'}
              placeholder={'*******'}
              register={register}
              required={true}
              autoComplete={'off'}
            />
            <ErrorMessageInput message={errors.password?.message} />
          </div>
        </CardContent>
        <CardFooter>
          <ButtonSubmit isSubmitting={isSubmitting} text={'Login'} />
        </CardFooter>
      </Card>
    </form>
  );
}
