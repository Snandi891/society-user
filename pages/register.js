import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else {
        localStorage.setItem("hasAccount", "true");
        router.push("/login");
      }
    } catch (err) {
      setError("Failed to register. Check backend server.");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Guest Mode → goes to homepage
  const handleGuestMode = () => {
    const guestUser = {
      name: "Guest",
      email: "guest@example.com",
      guest: true,
    };
    localStorage.setItem("user", JSON.stringify(guestUser));
    router.push("/"); // ✅ homepage
  };

  return (
    <>
      <Head>
        <title>Register | EliteEstate</title>
        <meta name="description" content="Create your EliteEstate account" />
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');
          
          :root {
            --primary: #2563eb;
            --primary-dark: #1d4ed8;
            --secondary: #8b5cf6;
            --accent: #f43f5e;
            --light: #f8fafc;
            --dark: #1e293b;
            --gray: #64748b;
            --success: #10b981;
          }
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            min-height: 100vh;
            background: url('https://i.pinimg.com/1200x/0a/f7/74/0af7741991985e2b530c8f62135c3eea.jpg');
            background-size: cover;
            background-position: center;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            position: relative;
            overflow-x: hidden;
            font-family: 'Inter', sans-serif;
          }
          
          body::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.4);
            z-index: 1;
          }
          
          /* Animated background elements */
          .floating-elements {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 1;
          }
          
          .floating-element {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(5px);
            animation: float 15s infinite linear;
          }
          
          .floating-element:nth-child(1) {
            width: 80px;
            height: 80px;
            top: 10%;
            left: 20%;
            animation-delay: 0s;
            animation-duration: 25s;
          }
          
          .floating-element:nth-child(2) {
            width: 120px;
            height: 120px;
            top: 60%;
            left: 70%;
            animation-delay: -2s;
            animation-duration: 20s;
          }
          
          .floating-element:nth-child(3) {
            width: 60px;
            height: 60px;
            top: 40%;
            left: 40%;
            animation-delay: -5s;
            animation-duration: 30s;
          }
          
          .floating-element:nth-child(4) {
            width: 100px;
            height: 100px;
            top: 70%;
            left: 30%;
            animation-delay: -7s;
            animation-duration: 22s;
          }
          
          .floating-element:nth-child(5) {
            width: 50px;
            height: 50px;
            top: 20%;
            left: 80%;
            animation-delay: -10s;
            animation-duration: 18s;
          }
          
          @keyframes float {
            0% {
              transform: translate(0, 0) rotate(0deg);
            }
            25% {
              transform: translate(20px, 40px) rotate(90deg);
            }
            50% {
              transform: translate(0, 80px) rotate(180deg);
            }
            75% {
              transform: translate(-20px, 40px) rotate(270deg);
            }
            100% {
              transform: translate(0, 0) rotate(360deg);
            }
          }
          
          /* Main container */
          .register-container {
            position: relative;
            z-index: 2;
            width: 100%;
            max-width: 1100px;
            display: flex;
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(12px);
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            animation: fadeIn 0.8s ease-out;
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          /* Left side - Branding */
          .brand-section {
            flex: 1;
            background: linear-gradient(135deg, rgba(37, 99, 235, 0.85) 0%, rgba(139, 92, 246, 0.85) 100%), 
                        url('https://i.pinimg.com/736x/bb/14/4f/bb144ff0364c1dcd409740fab157a676.jpg');
            background-size: cover;
            background-position: center;
            padding: 60px;
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            position: relative;
            overflow: hidden;
          }
          
          .brand-section::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            transform: rotate(30deg);
          }
          
          .logo {
            display: flex;
            align-items: center;
            margin-bottom: 40px;
          }
          
          .logo-icon {
            width: 48px;
            height: 48px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 12px;
            backdrop-filter: blur(5px);
          }
          
          .logo-text {
            font-size: 24px;
            font-weight: 700;
            letter-spacing: -0.5px;
            font-family: 'Playfair Display', serif;
          }
          
          .brand-content {
            position: relative;
            z-index: 2;
          }
          
          .brand-heading {
            font-size: 42px;
            font-weight: 700;
            line-height: 1.2;
            margin-bottom: 20px;
            letter-spacing: -1px;
            font-family: 'Playfair Display', serif;
          }
          
          .brand-subheading {
            font-size: 18px;
            font-weight: 400;
            line-height: 1.6;
            opacity: 0.9;
            max-width: 400px;
          }
          
          .features-list {
            margin-top: 40px;
          }
          
          .feature-item {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            animation: slideIn 0.5s ease-out;
            animation-fill-mode: both;
          }
          
          .feature-item:nth-child(1) {
            animation-delay: 0.2s;
          }
          
          .feature-item:nth-child(2) {
            animation-delay: 0.4s;
          }
          
          .feature-item:nth-child(3) {
            animation-delay: 0.6s;
          }
          
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          .feature-icon {
            width: 36px;
            height: 36px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
            backdrop-filter: blur(5px);
          }
          
          /* Right side - Form - Updated for transparent blur effect */
          .form-section {
            flex: 1;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(15px);
            padding: 60px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            border-left: 1px solid rgba(255, 255, 255, 0.2);
          }
          
          .form-header {
            margin-bottom: 40px;
          }
          
          .form-title {
            font-size: 32px;
            font-weight: 700;
            color: white;
            margin-bottom: 10px;
            letter-spacing: -0.5px;
            font-family: 'Playfair Display', serif;
          }
          
          .form-subtitle {
            color: rgba(255, 255, 255, 0.8);
            font-size: 16px;
            font-weight: 400;
          }
          
          /* Form elements */
          .form-container {
            width: 100%;
            max-width: 400px;
            margin: 0 auto;
          }
          
          .input-group {
            margin-bottom: 24px;
            position: relative;
          }
          
          .input-label {
            display: block;
            margin-bottom: 8px;
            color: white;
            font-weight: 500;
            font-size: 14px;
          }
          
          .input-field {
            width: 100%;
            padding: 16px 48px 16px 16px;
            border: 2px solid rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            font-size: 16px;
            transition: all 0.3s ease;
            background: rgba(255, 255, 255, 0.1);
            color: white;
          }
          
          .input-field::placeholder {
            color: rgba(255, 255, 255, 0.6);
          }
          
          .input-field:focus {
            outline: none;
            border-color: rgba(255, 255, 255, 0.4);
            box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1);
          }
          
          .input-icon {
            position: absolute;
            right: 16px;
            top: 42px;
            color: rgba(255, 255, 255, 0.7);
          }
          
          .password-toggle {
            position: absolute;
            right: 16px;
            top: 42px;
            color: rgba(255, 255, 255, 0.7);
            cursor: pointer;
          }
          
          .error-message {
            background: rgba(244, 63, 94, 0.3);
            color: white;
            padding: 12px 16px;
            border-radius: 10px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            border: 1px solid rgba(244, 63, 94, 0.5);
            animation: shake 0.5s ease-in-out;
          }
          
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
          }
          
          .error-icon {
            margin-right: 10px;
          }
          
          .remember-forgot {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
          }
          
          .remember {
            display: flex;
            align-items: center;
          }
          
          .checkbox {
            width: 18px;
            height: 18px;
            accent-color: var(--primary);
            margin-right: 8px;
            cursor: pointer;
          }
          
          .forgot-link {
            color: var(--primary);
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.3s ease;
          }
          
          .forgot-link:hover {
            color: var(--primary-dark);
            text-decoration: underline;
          }
          
          .submit-btn {
            width: 100%;
            padding: 16px;
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }
          
          .submit-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: 0.5s;
          }
          
          .submit-btn:hover::before {
            left: 100%;
          }
          
          .submit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(37, 99, 235, 0.2);
          }
          
          .submit-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
          }
          
          .spinner {
            animation: spin 1s linear infinite;
            margin-right: 10px;
          }
          
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          .auth-links {
            margin-top: 25px;
            text-align: center;
          }
          
          .auth-link {
            display: block;
            margin-bottom: 15px;
            color: rgba(255, 255, 255, 0.8);
            font-size: 15px;
          }
          
          .auth-link a, .auth-link button {
            color: var(--primary);
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0;
          }
          
          .auth-link a:hover, .auth-link button:hover {
            text-decoration: underline;
          }
          
          .guest-btn {
            color: #f97316 !important;
          }
          
          .member-btn {
            color: var(--success) !important;
          }
          
          /* Responsive design */
          @media (max-width: 968px) {
            .register-container {
              flex-direction: column;
              max-width: 500px;
            }
            
            .brand-section {
              padding: 40px;
            }
            
            .brand-heading {
              font-size: 32px;
            }
            
            .form-section {
              padding: 40px;
            }
          }
          
          @media (max-width: 576px) {
            .brand-section {
              display: none;
            }
            
            .form-section {
              padding: 30px 20px;
            }
          }
        `}</style>
      </Head>

      {/* Animated background elements */}
      <div className="floating-elements">
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
      </div>

      <div className="register-container">
        {/* Left side - Branding */}
        <div className="brand-section">
          <div className="logo">
            <div className="logo-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 22V12H15V22"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="logo-text">EliteEstate</div>
          </div>

          <div className="brand-content">
            <h1 className="brand-heading">Find Your Dream Property</h1>
            <p className="brand-subheading">
              Join thousands of satisfied clients who found their perfect home
              with us.
            </p>

            <div className="features-list">
              <div className="feature-item">
                <div className="feature-icon">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span>Premium Security</span>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span>24/7 Support</span>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span>Verified Listings</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="form-section">
          <div className="form-header">
            <h1 className="form-title">Create Account</h1>
            <p className="form-subtitle">
              Join EliteEstate to find your dream property
            </p>
          </div>

          <div className="form-container">
            {error && (
              <div className="error-message">
                <svg
                  className="error-icon"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label className="input-label">Full Name</label>
                <input
                  name="name"
                  placeholder="Enter your full name"
                  onChange={handleChange}
                  className="input-field"
                  required
                />
                <div className="input-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Email Address</label>
                <input
                  name="email"
                  placeholder="Enter your email"
                  type="email"
                  onChange={handleChange}
                  className="input-field"
                  required
                />
                <div className="input-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 6L12 13L2 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Phone Number</label>
                <input
                  name="phone"
                  placeholder="Enter your phone number"
                  onChange={handleChange}
                  className="input-field"
                  required
                />
                <div className="input-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 16.92V19.92C22 20.52 21.46 21 20.82 21C10.26 21 2 12.74 2 2.18C2 1.54 2.48 1 3.08 1H6.08C6.66 1 7.12 1.45 7.14 2.03C7.26 5.17 7.88 8.26 8.96 11.17C9.12 11.63 8.96 12.14 8.57 12.45L6.63 14.03C8.28 17.48 11.01 20.21 14.47 21.86L16.05 19.92C16.36 19.53 16.87 19.37 17.33 19.53C20.24 20.61 23.33 21.23 26.47 21.35C27.05 21.37 27.5 21.83 27.5 22.41V25.41"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Password</label>
                <input
                  name="password"
                  placeholder="Create a password"
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
                <div
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 2L22 22"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>

              <button type="submit" disabled={isLoading} className="submit-btn">
                {isLoading ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      className="spinner"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2V6"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 18V22"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4.93 4.93L7.76 7.76"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16.24 16.24L19.07 19.07"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 12H6"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M18 12H22"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4.93 19.07L7.76 16.24"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16.24 7.76L19.07 4.93"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="auth-links">
              <p className="auth-link">
                Already have an account? <Link href="/login">Login here</Link>
              </p>

              {/* Guest Mode */}
              <p className="auth-link">
                Guest Mode{" "}
                <button onClick={handleGuestMode} className="guest-btn">
                  Click here
                </button>
              </p>

              {/* House Member Login */}
              <p className="auth-link">
                House Member Login{" "}
                <Link href="/member-login" className="member-btn">
                  Click here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
