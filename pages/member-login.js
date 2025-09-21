import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

export default function MemberLogin() {
  const [form, setForm] = useState({ flatNumber: "", password: "" });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // ✅ Redirect if already logged in as member
  useEffect(() => {
    const savedMember = localStorage.getItem("member");
    if (savedMember) {
      router.replace("/member-home");
    }
  }, [router]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/members/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.error) {
        setMessage("❌ " + data.error);
      } else {
        setMessage("✅ Login successful!");
        localStorage.setItem("member", JSON.stringify(data.member));
        setTimeout(() => {
          router.push("/member-home");
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>VIP Member Login | EliteEstate</title>
        <meta
          name="description"
          content="Exclusive access for EliteEstate members"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=Cinzel:wght@400;500;600;700&display=swap');
          
          :root {
            --primary: #d4af37;
            --primary-dark: #b8941f;
            --secondary: #1a1a1a;
            --accent: #c89b3c;
            --light: #f8f0e0;
            --dark: #0f0f0f;
            --gray: #8b8b8b;
            --success: #10b981;
            --glass: rgba(255, 255, 255, 0.05);
            --gold-gradient: linear-gradient(135deg, #d4af37 0%, #f9e076 100%);
          }
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
        body {
  min-height: 100vh;
  background: 
   
    url('https://static.vecteezy.com/system/resources/previews/035/667/325/non_2x/ai-generated-a-black-squareshaped-pattern-background-is-shown-free-photo.jpg') ;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow-x: hidden;
  font-family: 'Inter', sans-serif;
  color: var(--light);
}

          
          /* Animated background elements */
          .luxury-bg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            overflow: hidden;
          }
          
          .luxury-particle {
            position: absolute;
            border-radius: 50%;
            background: radial-gradient(circle, var(--primary) 0%, transparent 70%);
            opacity: 0.3;
            animation: float 20s infinite linear;
          }
          
          .luxury-particle:nth-child(1) {
            width: 120px;
            height: 120px;
            top: 10%;
            left: 20%;
            animation-delay: 0s;
            animation-duration: 25s;
          }
          
          .luxury-particle:nth-child(2) {
            width: 80px;
            height: 80px;
            top: 60%;
            left: 70%;
            animation-delay: -2s;
            animation-duration: 20s;
          }
          
          .luxury-particle:nth-child(3) {
            width: 60px;
            height: 60px;
            top: 40%;
            left: 40%;
            animation-delay: -5s;
            animation-duration: 30s;
            background: radial-gradient(circle, var(--accent) 0%, transparent 70%);
          }
          
          .luxury-particle:nth-child(4) {
            width: 100px;
            height: 100px;
            top: 70%;
            left: 30%;
            animation-delay: -7s;
            animation-duration: 22s;
          }
          
          .luxury-particle:nth-child(5) {
            width: 50px;
            height: 50px;
            top: 20%;
            left: 80%;
            animation-delay: -10s;
            animation-duration: 18s;
            background: radial-gradient(circle, var(--accent) 0%, transparent 70%);
          }
          
          @keyframes float {
            0% {
              transform: translate(0, 0) rotate(0deg) scale(1);
            }
            25% {
              transform: translate(20px, 40px) rotate(90deg) scale(1.1);
            }
            50% {
              transform: translate(0, 80px) rotate(180deg) scale(1);
            }
            75% {
              transform: translate(-20px, 40px) rotate(270deg) scale(0.9);
            }
            100% {
              transform: translate(0, 0) rotate(360deg) scale(1);
            }
          }
          
          /* Luxury shine effect */
          @keyframes shine {
            0% {
              left: -100%;
            }
            20% {
              left: 100%;
            }
            100% {
              left: 100%;
            }
          }
          
          /* Main container */
          .vip-container {
            position: relative;
            z-index: 2;
            width: 100%;
            max-width: 500px;
            background: rgba(15, 15, 15, 0.7);
            backdrop-filter: blur(15px);
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5),
                        0 0 0 1px rgba(212, 175, 55, 0.3);
            animation: fadeIn 0.8s ease-out;
            padding: 50px 40px;
          }
          
          .vip-container::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(
              to bottom right,
              rgba(212, 175, 55, 0.1),
              rgba(212, 175, 55, 0.05),
              rgba(212, 175, 55, 0.025),
              transparent
            );
            transform: rotate(30deg);
            z-index: -1;
          }
          
          .gold-border {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 24px;
            pointer-events: none;
            box-shadow: inset 0 0 20px rgba(212, 175, 55, 0.3);
            z-index: -1;
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          
          .form-header {
            margin-bottom: 40px;
            text-align: center;
            position: relative;
          }
          
          .vip-badge {
            position: absolute;
            top: -50px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--gold-gradient);
            color: var(--dark);
            padding: 8px 20px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 700;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3);
            animation: pulse 2s infinite;
          }
          
          @keyframes pulse {
            0% {
              box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3);
            }
            50% {
              box-shadow: 0 5px 20px rgba(212, 175, 55, 0.6);
            }
            100% {
              box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3);
            }
          }
          
          .form-title {
  font-size: 36px;
  font-weight: 700;
  margin-top: 50px; /* increased top space */
  margin-bottom: 10px;
  color: var(--primary);
  letter-spacing: 1px;
  font-family: 'Cinzel', serif;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

          
          .form-subtitle {
            color: var(--light);
            font-size: 16px;
            font-weight: 400;
            opacity: 0.8;
          }
          
          /* Form elements */
          .form-container {
            width: 100%;
          }
          
          .input-group {
            margin-bottom: 30px;
            position: relative;
          }
          
          .input-label {
            display: block;
            margin-bottom: 12px;
            color: var(--light);
            font-weight: 500;
            font-size: 14px;
            letter-spacing: 0.5px;
            text-transform: uppercase;
          }
          
          .input-field {
            width: 100%;
            padding: 18px 52px 18px 20px;
            border: 1px solid rgba(212, 175, 55, 0.3);
            border-radius: 12px;
            font-size: 16px;
            transition: all 0.3s ease;
            background: rgba(15, 15, 15, 0.7);
            color: var(--light);
            position: relative;
            overflow: hidden;
          }
          
          .input-field::placeholder {
            color: rgba(255, 255, 255, 0.4);
          }
          
          .input-field:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.2);
          }
          
          .input-icon {
            position: absolute;
            right: 20px;
            top: 50px;
            color: var(--primary);
            font-size: 18px;
          }
          
          .password-toggle {
            position: absolute;
            right: 20px;
            top: 50px;
            color: var(--primary);
            cursor: pointer;
            font-size: 18px;
            transition: all 0.3s ease;
            z-index: 3;
          }
          
          .password-toggle:hover {
            color: var(--accent);
            transform: scale(1.1);
          }
          
          .message {
            padding: 16px;
            border-radius: 10px;
            margin-bottom: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 500;
            animation: fadeIn 0.5s ease-out;
            text-align: center;
          }
          
          .error-message {
            background: rgba(200, 66, 66, 0.2);
            color: #ff7a7a;
            border: 1px solid rgba(200, 66, 66, 0.3);
          }
          
          .success-message {
            background: rgba(16, 185, 129, 0.2);
            color: #10b981;
            border: 1px solid rgba(16, 185, 129, 0.3);
          }
          
          .submit-btn {
            width: 100%;
            padding: 18px;
            background: var(--gold-gradient);
            color: var(--dark);
            border: none;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            letter-spacing: 1px;
            text-transform: uppercase;
            font-family: 'Cinzel', serif;
            box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3);
          }
          
          .submit-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            transition: 0.5s;
          }
          
          .submit-btn:hover::before {
            left: 100%;
          }
          
          .submit-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(212, 175, 55, 0.5);
          }
          
          .submit-btn:active {
            transform: translateY(0);
            box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3);
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
            margin-top: 30px;
            text-align: center;
          }
          
          .auth-link {
            display: block;
            margin-bottom: 15px;
            color: var(--light);
            font-size: 15px;
            opacity: 0.8;
            transition: all 0.3s ease;
          }
          
          .auth-link a {
            color: var(--primary);
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            position: relative;
          }
          
          .auth-link a::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0;
            height: 1px;
            background: var(--primary);
            transition: width 0.3s ease;
          }
          
          .auth-link a:hover::after {
            width: 100%;
          }
          
          .auth-link a:hover {
            color: var(--accent);
          }
          
          /* Decorative elements */
          .decorative-corner {
            position: absolute;
            width: 30px;
            height: 30px;
          }
          
          .corner-tl {
            top: 20px;
            left: 20px;
            border-top: 2px solid var(--primary);
            border-left: 2px solid var(--primary);
          }
          
          .corner-tr {
            top: 20px;
            right: 20px;
            border-top: 2px solid var(--primary);
            border-right: 2px solid var(--primary);
          }
          
          .corner-bl {
            bottom: 20px;
            left: 20px;
            border-bottom: 2px solid var(--primary);
            border-left: 2px solid var(--primary);
          }
          
          .corner-br {
            bottom: 20px;
            right: 20px;
            border-bottom: 2px solid var(--primary);
            border-right: 2px solid var(--primary);
          }
          
          /* Responsive design */
          @media (max-width: 576px) {
            .vip-container {
              padding: 40px 25px;
            }
            
            .form-title {
              font-size: 28px;
            }
            
            .vip-badge {
              font-size: 12px;
              padding: 6px 15px;
              top: -40px;
            }
          }
        `}</style>
      </Head>

      {/* Luxury background elements */}
      <div className="luxury-bg">
        <div className="luxury-particle"></div>
        <div className="luxury-particle"></div>
        <div className="luxury-particle"></div>
        <div className="luxury-particle"></div>
        <div className="luxury-particle"></div>
      </div>

      <div className="vip-container">
        <div className="gold-border"></div>

        {/* Decorative corners */}
        <div className="decorative-corner corner-tl"></div>
        <div className="decorative-corner corner-tr"></div>
        <div className="decorative-corner corner-bl"></div>
        <div className="decorative-corner corner-br"></div>

        <div className="form-header">
          <div className="vip-badge">
            <i className="fas fa-crown"></i> Exclusive Access
          </div>
          <h1 className="form-title ">{"  "} Member Login</h1>
          <p className="form-subtitle">
            Enter your credentials to access the elite portal
          </p>
        </div>

        <div className="form-container">
          {message && (
            <div
              className={
                message.includes("❌")
                  ? "message error-message"
                  : "message success-message"
              }
            >
              <span>{message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label">
                <i className="fas fa-building"></i> Flat Number
              </label>
              <input
                name="flatNumber"
                placeholder="Enter your flat number"
                onChange={handleChange}
                className="input-field"
                required
              />
              <div className="input-icon">
                <i className="fas fa-building"></i>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">
                <i className="fas fa-lock"></i> Password
              </label>
              <input
                name="password"
                placeholder="Enter your password"
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
                  <i className="fas fa-eye-slash"></i>
                ) : (
                  <i className="fas fa-eye"></i>
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
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 18V22"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4.93 4.93L7.76 7.76"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.24 16.24L19.07 19.07"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 12H6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18 12H22"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4.93 19.07L7.76 16.24"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.24 7.76L19.07 4.93"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Authenticating...</span>
                </div>
              ) : (
                <>
                  <i className="fas fa-key"></i> Access Portal
                </>
              )}
            </button>
          </form>

          <div className="auth-links">
            <p className="auth-link">
              Don't have an account?{" "}
              <Link href="/register">Request Access</Link>
            </p>
            <p className="auth-link">
              <Link href="/">
                <i className="fas fa-arrow-left"></i> Back to Home
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
