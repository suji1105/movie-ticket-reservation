import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AuthPage.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');

    const evaluateStrength = (pass) => {
      if (!pass) return '';
      const hasUpper = /[A-Z]/.test(pass);
      const hasNumber = /[0-9]/.test(pass);
      const hasSpecial = /[^A-Za-z0-9]/.test(pass);
      const lengthOk = pass.length >= 8;
      if (hasUpper && hasNumber && hasSpecial && lengthOk) return 'strong';
      if (hasUpper || hasNumber || hasSpecial) return 'weak';
      return '';
    };

  // Password strength evaluation for login
  useEffect(() => {
    setPasswordStrength(evaluateStrength(form.password));
  }, [form.password]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="auth-page">
      <div className="auth-orb auth-orb-1" />
      <div className="auth-orb auth-orb-2" />
      <div className="auth-orb auth-orb-3" />

      
        <div className="auth-hero">
        <h1>Cine Vault</h1>
        <p>Welcome back! Please sign in to continue.</p>
      </div>

        <div className="auth-card glass">
          <div className="auth-card-header">
            <h1>Cine Vault</h1>
            <p>Enter your credentials to continue</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-group">
              <div className="label-row">
                <label>Password</label>
              </div>
              <div className="input-wrapper">
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  autoComplete="current-password"
                />
                <button type="button" className="pass-toggle" onClick={() => setShowPass(!showPass)}>
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button type="submit" className={"auth-submit-btn " + (loading ? "loading" : "")} disabled={loading}>
              {loading ? <span className="btn-spinner" /> : 'Sign In'}
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/signup">Create one</Link>
          </p>

          <div className="auth-trust">
            <span>256‑bit SSL secured</span>
            <span>|</span>
            <span>Privacy protected</span>
            <span>|</span>
            <span>Trusted by 50M+</span>
          </div>
        </div>
      </div>
  );
}
