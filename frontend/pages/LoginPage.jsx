import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, Mail, Lock, ArrowRight, Loader } from "lucide-react";
import { useUserStore } from "../src/stores/useUserStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading } = useUserStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
   const success = await login(email, password);
   if (success) {
    navigate("/");  // redirect only if successful
  }
  };

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Heading */}
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-extrabold text-center text-emerald-400 mb-8">
          Login to Your Account
        </h2>
      </motion.div>

      {/* Form Container */}
      <motion.div
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="bg-gray-800 py-8 px-6 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email address
              </label>
              <div className="flex items-center gap-3 mt-1">
                <Mail className="h-6 w-6 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md 
                             placeholder-gray-400 focus:outline-none focus:ring-emerald-500 
                             focus:border-emerald-500 sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="flex items-center gap-3 mt-1">
                <Lock className="h-6 w-6 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md 
                             placeholder-gray-400 focus:outline-none focus:ring-emerald-500 
                             focus:border-emerald-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent 
                         rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600
                         hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                         focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                  Loading...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" aria-hidden="true" />
                  Login
                </>
              )}
            </button>
          </form>

          {/* Sign Up link */}
          <p className="mt-8 text-center text-sm text-gray-400">
            Not a member?{" "}
            <Link to="/signup" className="font-medium text-emerald-400 hover:text-emerald-300">
              Sign up now <ArrowRight className="inline h-4 w-4" />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
