'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { register as CreateAccount } from '@/utils/api';
import { toast } from '@/components/ui/use-toast';
import { CheckCircle } from 'lucide-react';
import { initialRegister } from '@/config/constant/auth/authInitialValues';
import { registerSchema } from '@/config/schema/auth/authSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import ButtonSubmit from '@/components/elements/button/ButtonSubmit';
import RegisterInput from '@/components/elements/input/RegisterInput';

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
      if (response.status === 201) {
        reset(initialRegister);
        toast({
          title: 'Congratulations.',
          description: response.data?.message,
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
          <RegisterInput register={register} errors={errors} />
        </CardContent>
        <CardFooter>
          <ButtonSubmit isSubmitting={isSubmitting} text={'Create Account'} />
        </CardFooter>
      </Card>
    </form>
  );
}
