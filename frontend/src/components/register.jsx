import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { $axios } from "../utils";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    let regiserOption = {
      name,
      email,
      password,
    };

    try {
      const response = await $axios.post(
        "/auth/register",
        regiserOption
      );

      alert("Successfully registired!");
      navigate("/login");
      //   setName("");
      //   setEmail("");
      //   setPassword("");
    } catch (error) {}
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 max-w-lg rounded-lg shadow-md"
      >
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          Register
        </button>
      </form>
      <p className="mt-2">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
