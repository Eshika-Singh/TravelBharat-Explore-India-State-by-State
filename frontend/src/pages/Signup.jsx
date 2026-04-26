import { useState } from "react";
import { useNavigate, Link } from "react-router";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);
    setMessage("");

    try {
      const res = await fetch("http://127.0.0.1:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const raw = await res.text();
      const data = raw ? JSON.parse(raw) : {};

      if (!res.ok) {
        throw new Error(data.detail || "Unable to sign up.");
      }

      // localStorage yahan set NAHI karenge
      // Sirf Login.jsx mein set hoga jab actual login ho

      setMessage("Account created successfully! Redirecting to login...");
      setMessageType("success");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setMessage(error.message || "Unable to sign up.");
      setMessageType("error");
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-slate-50 px-6 py-16">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-2xl ring-1 ring-slate-200">
        <h1 className="text-3xl font-bold text-slate-900">Create Account</h1>
        <p className="mt-2 text-slate-600">
          Start exploring India with Travel Bharat.
        </p>

        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="mt-8 space-y-5"
        >
          <input
            type="text"
            name="name"
            autoComplete="off"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
          />

          <input
            type="email"
            name="email"
            autoComplete="off"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
          />

          <input
            type="password"
            name="password"
            autoComplete="new-password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-3 font-semibold text-white transition duration-300 hover:scale-[1.02] hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {message && (
          <div
            className={`mt-6 rounded-2xl px-4 py-3 text-sm font-medium ${
              messageType === "success"
                ? "bg-green-50 text-green-700 ring-1 ring-green-200"
                : "bg-red-50 text-red-700 ring-1 ring-red-200"
            }`}
          >
            {message}
          </div>
        )}

        <p className="mt-6 text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-orange-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Signup;
