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
import { initialRegister } from '@/config/constant/auth/authInitialValues';
import ButtonSubmit from '@/components/elements/button/ButtonSubmit';
import { registerSchema } from '@/config/schema/auth/authSchema';
import FieldInput from '@/components/elements/input/FieldInput';
import { register as CreateAccount } from '@/utils/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from '@/components/ui/use-toast';
import { CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';

export default function RegisterForm() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialRegister,
    resolver: yupResolver(registerSchema),
  });

  const handleRegister = async (data) => {
    try {
      const response = await CreateAccount(data);
      if (response?.status === 201) {
        reset(initialRegister);
        toast({
          title: 'Congratulations.',
          description:
            'Register berhasil, silahkan pergi ke menu LOGIN untuk masuk ke akun Anda',
          action: <CheckCircle />,
        });
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
    <form onSubmit={handleSubmit(handleRegister)}>
      <Card>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Register for an account and begin using the service.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <FieldInput
              name={'username'}
              type={'text'}
              placeholder={'John Doe'}
              register={register}
              required={true}
              autoComplete={'off'}
            />
            <ErrorMessageInput message={errors.username?.message} />
          </div>
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
          <ButtonSubmit isSubmitting={isSubmitting} text={'Create Account'} />
        </CardFooter>
      </Card>
    </form>
  );
}
