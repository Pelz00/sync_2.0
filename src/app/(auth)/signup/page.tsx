/**
 * ROUTE: /signup
 * ACCESS: public
 * PURPOSE: Account creation. Role selector (student/vendor) drives the next step — students go to /verify (OTP), vendors go to /onboarding.
 * BUILT HERE: Role radio, name/email/password, terms checkbox, submit calls modules/auth/actions.ts.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
// app/signup/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {
  const router = useRouter()
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [phone, setPhone]     = useState('')
  const [school, setSchool]   = useState('')
  const [pw, setPw]           = useState('')
  const [conf, setConf]       = useState('')
  const [agreed, setAgreed]   = useState(true)
  const [showPw, setShowPw]   = useState(false)
  const [showConf, setShowConf] = useState(false)
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  const strength = (() => {
    let s = 0
    if (pw.length >= 8) s++
    if (/[A-Z]/.test(pw)) s++
    if (/[0-9]/.test(pw)) s++
    if (/[^A-Za-z0-9]/.test(pw)) s++
    return s
  })()
  const strengthColor = ['#e8e4dc','#f87171','#fbbf24','#86efac','#c8f135'][strength]
  const strengthWidth = ['0%','30%','55%','80%','100%'][strength]

  const handleSubmit = async () => {
    setError('')
    if (!name || !email || !school || !pw)
      return setError('Please fill in all required fields.')
    if (pw.length < 8)
      return setError('Password must be at least 8 characters.')
    if (pw !== conf)
      return setError('Passwords do not match.')
    if (!agreed)
      return setError('Please agree to the Terms & Privacy Policy.')

    setLoading(true)
    try {
      // 🔌 await signUp({ name, email, phone, school, password: pw })
      router.push('/verify')
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const inputCls = "w-full bg-white border-[1.5px] border-[#d6d2c8] rounded-xl px-4 py-3 text-sm font-['DM_Sans'] text-[#1a1a1a] outline-none focus:border-[#b8e020] transition-colors"

  return (
    <main className="min-h-screen bg-[#f5f2eb] px-5 py-7 pb-10 font-['DM_Sans'] text-[#1a1a1a]">

      <p className="text-[11px] tracking-widest uppercase text-[#aaa] mb-5">
        Step 1  of 3 — Create account
      </p>
      <h1 className="text-[27px] leading-tight mb-1">
        <span className="font-display font-bold">Sign up</span> to Sync
      </h1>
      <p className="text-xs text-[#bbb] mb-6">
        already have an account?{' '}
        <Link href="/login" className="text-[#1a1a1a] underline">sign in</Link>
      </p>

      {error && (
        <div className="bg-[#fff0f0] border-[1.5px] border-[#ffc0c0] rounded-xl px-4 py-3 text-xs text-[#c0392b] mb-3">
          {error}
        </div>
      )}

      {/* Full name */}
      <p className="text-[10px] uppercase text-[#aaa] mb-1 rounded-xl ">Full name</p>
      <input className={inputCls + ' mb-3'} type="text" value={name}
        onChange={e => setName(e.target.value)} placeholder="e.g. Aisha Olawale" />

      {/* Email */}
      <p className="text-[10px] tracking-widest uppercase text-[#aaa] mb-1">Email address</p>
      <input className={inputCls + ' mb-3'} type="email" value={email}
        onChange={e => setEmail(e.target.value)} placeholder="you@school.edu.ng" />

      {/* Phone */}
      <p className="text-[10px] tracking-widest uppercase text-[#aaa] mb-1">Phone number</p>
      <input className={inputCls + ' mb-3'} type="tel" value={phone}
        onChange={e => setPhone(e.target.value)} placeholder="+234 800 000 0000" />

      {/* School */}
      <p className="text-[10px] tracking-widest uppercase text-[#aaa] mb-1">School</p>
      <div className="relative mb-3">
        <select className={inputCls + ' appearance-none pr-8 cursor-pointer'}
          value={school} onChange={e => setSchool(e.target.value)}>
          <option value="">Select your school</option>
          <option value="unilorin">UNILORIN — University of Ilorin</option>
          <option value="unilag">UNILAG — University of Lagos</option>
          <option value="ui">UI — University of Ibadan</option>
          <option value="oau">OAU — Obafemi Awolowo University</option>
          <option value="uniben">UNIBEN — University of Benin</option>
        </select>
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#aaa] pointer-events-none text-xs">▾</span>
      </div>

      {/* Password */}
      <p className="text-[10px] tracking-widest uppercase text-[#aaa] mb-1">Password</p>
      <div className="relative mb-1">
        <input className={inputCls + ' pr-11'} type={showPw ? 'text' : 'password'}
          value={pw} onChange={e => setPw(e.target.value)} placeholder="at least 8 characters" />
        <button onClick={() => setShowPw(!showPw)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aaa]">
          {showPw ? '🙈' : '👁'}
        </button>
      </div>
      {/* Strength bar */}
      <div className="h-[3px] rounded-full bg-[#e8e4dc] mb-3 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-300"
          style={{ width: strengthWidth, background: strengthColor }} />
      </div>

      {/* Confirm password */}
      <p className="text-[10px] tracking-widest uppercase text-[#aaa] mb-1">Confirm password</p>
      <div className="relative mb-3">
        <input className={inputCls + ' pr-11'} type={showConf ? 'text' : 'password'}
          value={conf} onChange={e => setConf(e.target.value)} placeholder="repeat your password" />
        <button onClick={() => setShowConf(!showConf)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aaa]">
          {showConf ? '🙈' : '👁'}
        </button>
      </div>

      {/* Terms */}
      <div className="flex items-center gap-3 my-4">
        <button onClick={() => setAgreed(!agreed)}
          className={`w-[18px] h-[18px] rounded-[5px] border-[1.5px] flex items-center justify-center flex-shrink-0 transition-colors ${
            agreed ? 'bg-[#c8f135] border-[#c8f135]' : 'bg-white border-[#d6d2c8]'
          }`}>
          {agreed && <span className="text-[#1a1a1a] text-[11px] font-bold">✓</span>}
        </button>
        <p className="text-xs text-[#888]">
          I agree to Sync's{' '}
          <Link href="/terms" className="text-[#1a1a1a] underline">Terms &amp; Privacy Policy</Link>
        </p>
      </div>

      <button onClick={handleSubmit} disabled={loading}
        className="w-full bg-[#c8f135] hover:bg-[#b8e020] text-[#1a1a1a] font-medium py-4 rounded-full text-sm transition-colors disabled:opacity-50 mb-5">
        {loading ? 'Creating account…' : 'Create account →'}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-px bg-[#d6d2c8]" />
        <p className="text-xs text-[#aaa]">or continue with</p>
        <div className="flex-1 h-px bg-[#d6d2c8]" />
      </div>

      <div className="grid grid-cols-3 gap-2 mb-5">
        {['Google', 'Apple', 'Phone OTP'].map(s => (
          <button key={s}
            className="border-[1.5px] border-[#d6d2c8] rounded-xl py-3 text-xs text-[#555] bg-white hover:border-[#b8e020] transition-colors">
            {s}
          </button>
        ))}
      </div>

      <p className="text-center text-sm text-[#888]">
        Already have an account?{' '}
        <Link href="/login" className="text-[#1a1a1a] font-medium underline">Sign in</Link>
      </p>
    </main>
  )
}
