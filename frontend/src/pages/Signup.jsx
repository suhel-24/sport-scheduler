import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admincode, setadmincode] = useState("");
  const [role, setRole] = useState("user");
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { username, email, password, role ,admincode};
    if (role == "admin" && admincode != "secretkey") {
      alert("Invalid Admin Code");
      return;
    }
    try {
      // Adjust the URL to your backend endpoint
      const response = await axios.post("http://localhost:3000/signup", formData);
      // Handle response or redirect here
      if (response){
        navigate("/");
      }

    } catch (error) {
      console.error("Signup error", error.response);
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
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input type="radio" name="role" value="user" checked={role === "user"} onChange={(e) => setRole(e.target.value)} className="form-radio" />
            <span className="ml-2">User</span>
          </label>
          <label className="inline-flex items-center ml-6">
            <input type="radio" name="role" value="admin" checked={role === "admin"} onChange={(e) => setRole(e.target.value)} className="form-radio" />
            <span className="ml-2">Admin</span>
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
          <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        {role === "admin" ? (
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Admin Code:</label>
            <input type="password" name="admincode" value={admincode} onChange={(e) => setadmincode(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
        ) : null}
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Sign Up
        </button>
      </form>
    </>
  );
}

export default Signup;
