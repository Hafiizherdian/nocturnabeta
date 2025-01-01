import LoginForm from "./form";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#f0f0f0] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-[#292929]">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}