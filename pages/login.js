import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) router.replace("/");
  }, [router]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else {
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/");
      }
    } catch (err) {
      setError("Failed to login. Check backend server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login | LuxeRealty</title>
        <meta name="description" content="Login to your LuxeRealty account" />
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          
          :root {
            --primary: #0066ff;
            --primary-dark: #0052d4;
            --secondary: #8B5CF6;
            --accent: #FF5757;
            --light: #f8fafc;
            --dark: #1e293b;
            --gray: #64748b;
            --success: #10b981;
          }
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Inter', sans-serif;
          }
          
          body {
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            position: relative;
            overflow-x: hidden;
          }
          
          /* Animated background elements */
          .bg-bubbles {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            overflow: hidden;
          }
          
          .bg-bubbles li {
            position: absolute;
            list-style: none;
            display: block;
            width: 40px;
            height: 40px;
            background-color: rgba(255, 255, 255, 0.15);
            bottom: -160px;
            border-radius: 50%;
            animation: square 25s infinite;
            transition-timing-function: linear;
          }
          
          .bg-bubbles li:nth-child(1) {
            left: 10%;
            animation-delay: 0s;
            width: 80px;
            height: 80px;
          }
          
          .bg-bubbles li:nth-child(2) {
            left: 20%;
            animation-delay: 2s;
            animation-duration: 17s;
            width: 60px;
            height: 60px;
          }
          
          .bg-bubbles li:nth-child(3) {
            left: 25%;
            animation-delay: 4s;
            width: 100px;
            height: 100px;
          }
          
          .bg-bubbles li:nth-child(4) {
            left: 40%;
            animation-delay: 0s;
            animation-duration: 22s;
            width: 120px;
            height: 120px;
          }
          
          .bg-bubbles li:nth-child(5) {
            left: 70%;
            animation-delay: 3s;
            width: 70px;
            height: 70px;
          }
          
          .bg-bubbles li:nth-child(6) {
            left: 80%;
            animation-delay: 2s;
            width: 90px;
            height: 90px;
          }
          
          .bg-bubbles li:nth-child(7) {
            left: 32%;
            animation-delay: 6s;
            width: 110px;
            height: 110px;
          }
          
          .bg-bubbles li:nth-child(8) {
            left: 55%;
            animation-delay: 8s;
            animation-duration: 18s;
            width: 60px;
            height: 60px;
          }
          
          .bg-bubbles li:nth-child(9) {
            left: 25%;
            animation-delay: 10s;
            animation-duration: 20s;
            width: 50px;
            height: 50px;
          }
          
          .bg-bubbles li:nth-child(10) {
            left: 90%;
            animation-delay: 5s;
            width: 80px;
            height: 80px;
          }
          
          @keyframes square {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 1;
              border-radius: 50%;
            }
            100% {
              transform: translateY(-1000px) rotate(720deg);
              opacity: 0;
              border-radius: 50%;
            }
          }
          
          /* Main container */
          .login-container {
            position: relative;
            z-index: 2;
            width: 100%;
            max-width: 1200px;
            display: flex;
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(10px);
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            animation: fadeIn 0.8s ease-out;
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
            background: linear-gradient(135deg, rgba(0, 102, 255, 0.85) 0%, rgba(102, 126, 234, 0.85) 100%), 
                        url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80');
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
          
          /* Right side - Form */
          .form-section {
            flex: 1;
            background: rgba(255, 255, 255, 0.95);
            padding: 60px;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          
          .form-header {
            margin-bottom: 40px;
          }
          
          .form-title {
            font-size: 32px;
            font-weight: 700;
            color: var(--dark);
            margin-bottom: 10px;
            letter-spacing: -0.5px;
          }
          
          .form-subtitle {
            color: var(--gray);
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
            color: var(--dark);
            font-weight: 500;
            font-size: 14px;
          }
          
          .input-field {
            width: 100%;
            padding: 16px 48px 16px 16px;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            font-size: 16px;
            transition: all 0.3s ease;
            background: white;
          }
          
          .input-field:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 4px rgba(0, 102, 255, 0.1);
          }
          
          .input-icon {
            position: absolute;
            right: 16px;
            top: 42px;
            color: var(--gray);
          }
          
          .password-toggle {
            position: absolute;
            right: 16px;
            top: 42px;
            color: var(--gray);
            cursor: pointer;
          }
          
          .error-message {
            background: rgba(255, 87, 87, 0.1);
            color: var(--accent);
            padding: 12px 16px;
            border-radius: 10px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            border: 1px solid rgba(255, 87, 87, 0.2);
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
            box-shadow: 0 10px 20px rgba(0, 102, 255, 0.2);
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
          
          .divider {
            display: flex;
            align-items: center;
            margin: 30px 0;
            color: var(--gray);
          }
          
          .divider-line {
            flex: 1;
            height: 1px;
            background: #e2e8f0;
          }
          
          .divider-text {
            padding: 0 15px;
            font-size: 14px;
          }
          
          .social-login {
            display: flex;
            gap: 15px;
            margin-bottom: 30px;
          }
          
          .social-btn {
            flex: 1;
            padding: 12px;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          
          .social-btn:hover {
            border-color: var(--primary);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          }
          
          .signup-link {
            text-align: center;
            color: var(--gray);
            font-size: 15px;
          }
          
          .signup-link a {
            color: var(--primary);
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
          }
          
          .signup-link a:hover {
            text-decoration: underline;
          }
          
          /* Responsive design */
          @media (max-width: 968px) {
            .login-container {
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
            
            .social-login {
              flex-direction: column;
            }
          }
        `}</style>
      </Head>

      {/* Animated background elements */}
      <ul className="bg-bubbles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>

      <div className="login-container">
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
            <div className="logo-text">LuxeRealty</div>
          </div>

          <div className="brand-content">
            <h1 className="brand-heading">Find Your Dream Home With Ease</h1>
            <p className="brand-subheading">
              Access exclusive property listings and connect with the best
              agents in the industry.
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
            <h1 className="form-title">Welcome Back</h1>
            <p className="form-subtitle">Sign in to your account to continue</p>
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
                    stroke="#FF5757"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label className="input-label">Email Address</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
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
                      stroke="#64748B"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 6L12 13L2 6"
                      stroke="#64748B"
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
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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
                        stroke="#64748B"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                        stroke="#64748B"
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
                        stroke="#64748B"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                        stroke="#64748B"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 2L22 22"
                        stroke="#64748B"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>

              <div className="remember-forgot">
                <div className="remember">
                  <input type="checkbox" id="remember" className="checkbox" />
                  <label htmlFor="remember">Remember me</label>
                </div>
                <a href="#" className="forgot-link">
                  Forgot password?
                </a>
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
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="divider">
              <div className="divider-line"></div>
              <span className="divider-text">or continue with</span>
              <div className="divider-line"></div>
            </div>

            <div className="social-login">
              <button className="social-btn">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 12.25C22 11.47 21.93 10.72 21.78 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.57V20.34H19.28C21.36 18.42 22 15.6 22 12.25Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.71 17.57C14.73 18.23 13.48 18.64 12 18.64C9.14 18.64 6.72 16.67 5.83 14.1H2.17V16.94C3.99 20.53 7.7 23 12 23Z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.83 14.1C5.38 12.72 5.38 11.28 5.83 9.9V7.06H2.17C0.69 9.85 0.69 13.15 2.17 15.94L5.83 14.1Z"
                    fill="#FBBC04"
                  />
                  <path
                    d="M12 5.36C13.62 5.36 15.06 5.93 16.21 7.02L19.36 3.87C17.45 2.09 14.97 1 12 1C7.7 1 3.99 3.47 2.17 7.06L5.83 9.9C6.72 7.33 9.14 5.36 12 5.36Z"
                    fill="#EA4335"
                  />
                </svg>
              </button>

              <button className="social-btn">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.971H15.83c-1.491 0-1.956.93-1.956 1.886v2.264h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z"
                    fill="#1877F2"
                  />
                </svg>
              </button>

              <button className="social-btn">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 0C5.374 0 0 5.373 0 12C0 17.302 3.438 21.8 8.207 23.387C8.806 23.498 9 23.126 9 22.81V20.576C5.662 21.302 4.967 19.16 4.967 19.16C4.421 17.773 3.634 17.404 3.634 17.404C2.545 16.659 3.717 16.675 3.717 16.675C4.922 16.759 5.556 17.912 5.556 17.912C6.626 19.746 8.363 19.216 9.048 18.909C9.155 18.134 9.466 17.604 9.81 17.305C7.145 17 4.343 15.971 4.343 11.374C4.343 10.063 4.812 8.993 5.579 8.153C5.455 7.85 5.044 6.629 5.696 4.977C5.696 4.977 6.704 4.655 8.997 6.207C9.954 5.941 10.98 5.808 12 5.803C13.02 5.808 14.047 5.941 15.006 6.207C17.297 4.655 18.303 4.977 18.303 4.977C18.956 6.63 18.545 7.85 18.421 8.153C19.191 8.993 19.656 10.064 19.656 11.374C19.656 15.983 16.849 16.998 14.177 17.295C14.607 17.667 15 18.397 15 19.517V22.81C15 23.129 15.192 23.504 15.801 23.386C20.566 21.797 24 17.3 24 12C24 5.373 18.627 0 12 0Z"
                    fill="#24292F"
                  />
                </svg>
              </button>
            </div>

            <p className="signup-link">
              Don't have an account? <Link href="/register">Register here</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
