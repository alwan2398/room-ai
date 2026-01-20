import AuthForm from "@/components/auth/AuthForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Selamat Datang di Room AI
        </h1>
        <AuthForm />
      </div>
    </div>
  );
};

export default LoginPage;
