import ErrorMessageInput from '@/components/elements/errors/ErrorMessageInput';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function RegisterInput({ register, errors }) {
  return (
    <>
      <div className="space-y-1">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          type="text"
          placeholder="John Doe"
          autoComplete="off"
          {...register?.('username')}
        />
        <ErrorMessageInput message={errors?.username?.message} />
      </div>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="example@gmail.com"
          autoComplete="off"
          {...register?.('email')}
        />
        <ErrorMessageInput message={errors?.email?.message} />
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="******"
          autoComplete="off"
          {...register?.('password')}
        />
        <ErrorMessageInput message={errors?.password?.message} />
      </div>
    </>
  );
}
