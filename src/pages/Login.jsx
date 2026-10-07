import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import LoginForm from "../components/LoginForm";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userServer: "",
    userId: "",
    userPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    // Validasi form
    if (!form.userServer.trim()) {
      setError("User Server wajib diisi.");
      return;
    }

    if (!form.userId.trim()) {
      setError("User ID wajib diisi.");
      return;
    }

    if (!form.userPassword) {
      setError("Password wajib diisi.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        from_origin: "*",
        userServer: form.userServer,
        userId: form.userId,
        userPassword: form.userPassword,
        envServer: "dev",
        referrer: "bodev.uruz.id",
      };

      const response = await login(payload);

      console.log("API Response:", response);

      if (response.status >= 200 && response.status < 300) {
        navigate("/dashboard");
      } else {
        setError(
          "Login gagal. Silakan periksa kembali data Anda."
        );
      }
    } catch (error) {
    console.error("Login Error:", error);

    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      console.log("Status:", status);
      console.log("Response:", data);

      setError(
        data?.message ||
        data?.error ||
        "Login gagal. Silakan coba lagi."
      );
    } else if (error.request) {
      setError(
        "Tidak dapat terhubung ke server."
      );
    } else {
      setError(
        "Terjadi kesalahan. Silakan coba lagi."
      );
    }
  } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h1>Login</h1>
          <p>Silakan masuk menggunakan akun Anda</p>
        </div>

        <LoginForm
          form={form}
          error={error}
          loading={loading}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default Login;