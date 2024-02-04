import { useState } from "react";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admincode, setadmincode] = useState("");
  const [role, setRole] = useState("user"); // default role

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { username, email, password, role };
    if(role=='admin' && admincode!="secretkey"){
      alert('Invalid Admin Code')
      return
    }
    try {
      // Adjust the URL to your backend endpoint
      const response = await axios.post("http://localhost:3000/signup", formData);
      console.log(response.data);
      console.log("hello");
      // Handle response or redirect here
    } catch (error) {
      console.error("Signup error", error.response);
      // Handle error here
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          <input type="radio" name="role" value="user" checked={role === "user"} onChange={(e) => setRole(e.target.value)} />
          User
        </label>
        <label>
          <input type="radio" name="role" value="admin" checked={role === "admin"} onChange={(e) => setRole(e.target.value)} />
          Admin
        </label>
      </div>

      <div>
        <label>Username:</label>
        <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      {role == "admin" ? (
        <div>
          <label>admincode:</label>
          <input type="password" name="admincode" value={admincode} onChange={(e) => setadmincode(e.target.value)} required />
        </div>
      ) : null}
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;
