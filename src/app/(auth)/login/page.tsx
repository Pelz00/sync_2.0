/**
 * ROUTE: /login
 * ACCESS: public
 * PURPOSE: Email + password login. Reached directly or via the proxy gate
 *          when a logged-out visitor clicks a protected module tab - the
 *          original destination arrives as `?next=`.
 * BUILT HERE: <LoginForm> (validated email + password) + Sign up link that
 *             preserves `next`.
 * TODO: wire the sign-in server action to Supabase auth.
 */
// app/signup/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Role = 'student' | 'landlord'

export default function SignupPage() {
  const router = useRouter()
  const [role, setRole]         = useState<Role>('student')
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [school, setSchool]     = useState('')
  const [password, setPassword] = useState('')
  const [agreed, setAgreed]     = useState(false)
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const handleSubmit = async () => {
    setError('')
    if (!name || !email || !school || !password)
      return setError('Please fill in all fields.')
    if (!agreed)
      return setError('You must agree to the terms.')

    setLoading(true)
    try {
     
      router.push(role === 'student' ? '/verify' : '/onboarding')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f2eb] px-5 py-8">
      
      <h1 className="text-3xl font-bold leading-tight mb-5">
        <span className="font-display">Create your</span> account
      </h1>
      

      {/* Role selector */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {([
          { id: 'student',  label: "I'm a student",   desc: 'Find a hostel near my campus' },
          { id: 'landlord', label: "I'm a landlord",  desc: 'List my property to students' },
        ] as { id: Role; label: string; desc: string }[]).map(r => (
          <button
            key={r.id}
            onClick={() => setRole(r.id)}
            className={`relative text-left rounded-[15px] font-bold border-[1.5px] p-4 transition-all ${
              role === r.id
                ? 'bg-[#C5FF4A] border-[#0E0E12]'
                : 'bg-white border-gray-200'
            }`}
          >
            {/* check circle */}
            <span className={`absolute top-3 right-3 w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center ${
              role === r.id ? 'bg-black border-black' : 'bg-white border-gray-300'
            }`}>
              {role === r.id && <span className="w-2 h-2 rounded-full bg-white" />}
            </span>
            <p className="font-medium text-sm pr-6">{r.label}</p>
            <p className={`text-xs mt-1 ${role === r.id ? 'text-lime-700' : 'text-gray-400'}`}>
              {r.desc}
            </p>
          </button>
        ))}
      </div>

      {/* Fields */}
      {[
        { label: 'Full name',      value: name,     set: setName,     type: 'text',     ph: 'Aisha Olawale' },
        { label: 'Email or phone', value: email,    set: setEmail,    type: 'text',     ph: 'you@school.edu' },
        { label: 'Password',       value: password, set: setPassword, type: 'password', ph: '••••••••' },
      ].map(f => (
        <div key={f.label} className="mb-3">
          <p className="text-[10px] tracking-widest uppercase text-gray-400 mb-1">{f.label}</p>
          <input
            type={f.type}
            value={f.value}
            onChange={e => f.set(e.target.value)}
            placeholder={f.ph}
            className="w-full bg-white border-[1.5px] border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#b8e020]"
          />
        </div>
      ))}

      {/* School dropdown */}
      <div className="mb-3">
        <p className="text-[10px] tracking-widest uppercase text-gray-400 mb-1">School</p>
        <div className="relative">
          <select
            value={school}
            onChange={e => setSchool(e.target.value)}
            className="w-full bg-white border-[1.5px] border-gray-200 rounded-xl px-4 py-3 text-sm outline-none appearance-none focus:border-[#b8e020]"
          >
            <option value="">Select school…</option>
            <option value="malete">MALETE</option>
            <option value="unilorin">UNILORIN</option>
            <option value="unilag">UNILAG</option>          </select>
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▾</span>
        </div>
      </div>

      {/* Terms */}
      <div className="flex items-center gap-3 my-4">
        <button
          onClick={() => setAgreed(!agreed)}
          role="checkbox"
          aria-checked={agreed}
          aria-label="Agree to Terms and Privacy Policy"
          className={`w-5 h-5 rounded-md border-[1.5px] flex items-center justify-center flex-shrink-0 ${
            agreed ? 'bg-[#c8f135] border-[#c8f135]' : 'bg-white border-gray-300'
          }`}
        >
          {agreed && <span className="text-black text-xs font-bold">✓</span>}
        </button>        <p className="text-xs text-gray-500">
          I agree to Sync&apos;s{' '}
          <Link href="/terms" className="text-black underline">Terms &amp; Privacy Policy</Link>
        </p>
      </div>

      {error && <p className="text-red-500 text-xs mb-3">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-[#C5FF4A] hover:bg-[#b8e020] text-black font-medium py-4 rounded-full text-sm transition-colors disabled:opacity-50 mb-5"
      >
        {loading ? 'Please wait…' : 'Continue → verify school ID'}
      </button>

      {/* Social */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-px bg-gray-200" />
        <p className="text-xs text-gray-400">or continue with</p>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <div className="grid grid-cols-3 gap-2">
        {['Google', 'Apple', 'Phone OTP'].map(s => (
          <button key={s} className="border-[1.5px] border-gray-200 rounded-xl py-3 text-xs text-gray-500 bg-white hover:border-[#b8e020] transition-colors">
            {s}
          </button>
        ))}
      </div>
    </main>
  )
}
