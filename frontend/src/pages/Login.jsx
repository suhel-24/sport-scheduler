import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { email, password };
    try {
      const response = await axios.post("http://localhost:3000/login", formData);
      console.log(response.data);

      // Save the response data in local storage
      const { token, ...userData } = response.data;

      // Store the token separately as instructed
      localStorage.setItem("token", token);
      
      // Convert the rest of the user data into a JSON string and store it in a single item
      localStorage.setItem("userData", JSON.stringify(userData));

      // Redirect to home
      navigate("/");
    } catch (error) {
      console.error("Login error", error.response);
      const message = error.response && error.response.data ? error.response.data.msg : 'An unknown error occurred';
      setErrorMessage(message);
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  return (
    <>
    <div className="relative">
    {errorMessage && (
        <div className="bg-red-500 text-white py-2 px-4 rounded absolute top-4 right-4">
          {errorMessage}
        </div>
      )}
    </div>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Email:</label>
          <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Password:</label>
          <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline border border-blue-700" type="submit">
          Log In
        </button>
      </form>
    </>
  );
};

export default Login;
