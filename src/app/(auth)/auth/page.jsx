import LoginForm from '@/components/elements/form/LoginForm';
import RegisterForm from '@/components/elements/form/RegisterForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function page() {
  return (
    <div className="w-full min-h-screen flex flex-col  justify-center">
      <Tabs
        defaultValue="Login"
        className="max-w-sm w-full mx-auto lg:px-0 md:px-0 sm:px-0 px-4"
        data-aos="fade-up"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Login">Login</TabsTrigger>
          <TabsTrigger value="Register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="Login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="Register">
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
