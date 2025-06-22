import { useState } from "react";
import LoginForm from "../../forms/LoginForm";
import RegisterForm from "../../forms/RegisterForm";
import backgImg from "../../assets/bgbg.webp"

const LoginRegisterWrapper = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div style={{ backgroundImage: `url(${backgImg})`}} className="min-h-screen w-full bg-center bg-fixed bg-cover flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-3xl bg-white/40 p-8 rounded-2xl shadow-xl border border-orange-2">
        <h2 className="text-2xl font-bold text-center text-blue-1 mb-6">
          {isLogin ? "Welcome Back" : "Create an Account"}
        </h2>

        {isLogin ? <LoginForm /> : <RegisterForm whenDoneRegister={()=> setIsLogin(true)} />}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-orange-1 font-semibold hover:underline"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterWrapper;
