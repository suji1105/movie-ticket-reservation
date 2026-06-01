import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AuthPage.css';

export default function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '', city: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [agree, setAgree] = useState(false);

  const cities = ['Chennai', 'Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Kochi', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Coimbatore', 'Madurai'];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.password || !form.city) {
      setError('Please fill in all required fields.');
      return;
    }
    // Password constraints: at least 8 characters, uppercase, number, special character
    if (form.password.length < 8 || !/[A-Z]/.test(form.password) || !/[0-9]/.test(form.password) || !/[!@#$%^&*]/.test(form.password)) {
      setError('Password must be at least 8 characters, include an uppercase letter, a number, and a special character.');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (!agree) {
      setError('Please accept the Terms & Conditions.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/login');
    }, 1800);
  };
  
  // Evaluate password strength
  useEffect(() => {
    const pass = form.password;
    let strength = '';
      if (pass.length >= 8 && /[A-Z]/.test(pass) && /[0-9]/.test(pass) && /[!@#$%^&*]/.test(pass)) {
        strength = 'Strong';
      }
    setPasswordStrength(strength);
  }, [form.password]);

  return (
    <div className="auth-page">
      <div className="auth-orb auth-orb-1" />
      <div className="auth-orb auth-orb-2" />
      <div className="auth-orb auth-orb-3" />
      <div className="auth-right">
        <div className="auth-hero">
          <h1>Cine Vault</h1>
          <p>Welcome! Create your account to enjoy movies.</p>
        </div>
        <div className="auth-card glass">
          <div className="auth-card-header">
            <h1>Cine Vault</h1>
            <p>Fast, secure, no‑cost registration</p>
          </div>
          {error && <div className="auth-error">{error}</div>}
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name *</label>
              <div className="input-wrapper">
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" />
              </div>
            </div>
            <div className="form-group">
              <label>Phone *</label>
              <div className="input-wrapper">
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 9876543210" />
              </div>
            </div>
            <div className="form-group">
              <label>Email *</label>
              <div className="input-wrapper">
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
              </div>
            </div>
            <div className="form-group">
              <label>City *</label>
              <div className="input-wrapper">
                <select name="city" value={form.city} onChange={handleChange}>
                  <option value="">Select your city</option>
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Password *</label>
                <div className="input-wrapper">
                  <input type={showPass ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} placeholder="Min. 8 chars" />
                  <button type="button" className="pass-toggle" onClick={() => setShowPass(!showPass)}>{showPass ? '🙈' : '👁️'}</button>
                </div>
                <div className={`password-strength ${passwordStrength.toLowerCase()}`}>{passwordStrength}</div>
              </div>
              <div className="form-group">
                <label>Confirm *</label>
                <div className="input-wrapper">
                  <input type={showPass ? 'text' : 'password'} name="confirm" value={form.confirm} onChange={handleChange} placeholder="Re‑enter password" />
                </div>
              </div>
            </div>
            <label className="checkbox-label">
              <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} />
              <span>I agree to the <a href="#">Terms & Conditions</a> and <a href="#">Privacy Policy</a></span>
            </label>
            <button type="submit" className={`auth-submit-btn ${loading ? 'loading' : ''}`} disabled={loading}>
              {loading ? <span className="btn-spinner" /> : 'Create Account'}
            </button>
          </form>
          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
          <div className="auth-trust">
            <span>256‑bit SSL secured</span>
            <span>|</span>
            <span>Privacy protected</span>
            <span>|</span>
            <span>Free forever</span>
          </div>
        </div>
      </div>
    </div>
  );
}
