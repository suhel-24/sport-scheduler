import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { email, password };
    try {
      const response = await axios.post("http://localhost:3000/login", formData);
      console.log(response.data);

      // Save the response data in local storage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("user_id", response.data.user_id);
      localStorage.setItem("role", response.data.role);

      // Redirect to home
      navigate("/");
    } catch (error) {
      console.error("Login error", error.response);
      // Handle error here
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="">
        <div>
          <label >Email:</label>
          <input className=" bg-gray-50 border border-black" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input className="bg-gray-50 border border-black" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button className=" border border-black" type="submit">Log In</button>
      </form>
      
    </>
  );
};

export default Login;
