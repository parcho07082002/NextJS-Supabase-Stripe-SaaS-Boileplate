'use client'
import { useState } from 'react'
import { Button } from './Button'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation'

// Helper function for feature items
const FeatureItem = ({ included, children }) => (
  <li className={`flex items-center text-sm ${!included ? 'text-gray-500' : 'text-gray-300'}`}>
    {included ? (
      <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ) : (
      <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    )}
    {children}
  </li>
)

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isSignUp, setIsSignUp] = useState(true)
  const [showPricing, setShowPricing] = useState(false)
  const [billingType, setBillingType] = useState('monthly')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const router = useRouter()
  const { signup, login, signInWithGoogle } = useAuth()

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle()
      if (result.isNewUser) {
        setShowPricing(true)
      } else {
        router.push('/')
      }
    } catch (error) {
      setError(error.message || 'Failed to sign in with Google')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setPasswordError('')

    if (isSignUp) {
      if (password !== passwordConfirm) {
        setPasswordError('Passwords do not match')
        return
      }
      
      if (!showPricing) {
        setShowPricing(true)
        return
      }
    }

    setIsLoading(true)
    try {
      if (isSignUp) {
        await signup(email, password)
      } else {
        await login(email, password)
      }
      router.push('/')
    } catch (err) {
      setError(err.message || 'Failed to login. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (showPricing) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-100">Choose your plan</h2>
          <p className="text-sm text-gray-400 mt-2">
            Select the plan that best fits your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto">
          {/* Buy Credits */}
          <div className="p-8 bg-gray-800 rounded-lg border border-gray-700 flex flex-col">
            <div>
              <h3 className="text-lg font-semibold text-gray-100">Buy Credits</h3>
              <div className="mt-2">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-gray-100">$9.97</span>
                  <span className="text-gray-400 ml-1">/100 credits</span>
                </div>
              </div>
              <ul className="mt-4 space-y-3">
                <FeatureItem included={true}>100 tattoo generations</FeatureItem>
                <FeatureItem included={true}>Access to all basic styles</FeatureItem>
                <FeatureItem included={true}>Standard resolution downloads</FeatureItem>
                <FeatureItem included={false}>Premium features</FeatureItem>
                <FeatureItem included={false}>Advanced placement options</FeatureItem>
                <FeatureItem included={false}>Special styles</FeatureItem>
              </ul>
            </div>
            <div className="mt-auto pt-6">
              <Button
                className="w-full bg-gray-700 hover:bg-gray-600 text-gray-100"
                variant="outline"
                onClick={handleSubmit}
              >
                Get 100 Credits
              </Button>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="p-8 bg-gray-800 rounded-lg border border-gray-600 flex flex-col relative">
            <div>
              <div className="absolute -top-2 right-4 bg-gray-600 text-gray-100 text-xs px-3 py-1 rounded-full">
                RECOMMENDED
              </div>
              <h3 className="text-lg font-semibold text-gray-100">Pro Unlimited</h3>
              <div className="mt-2">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-gray-100">
                    {billingType === 'monthly' ? '$14.97' : '$10.47'}
                  </span>
                  <span className="text-gray-400 ml-1">
                    /{billingType === 'monthly' ? 'month' : 'month'}
                  </span>
                </div>
                {billingType === 'yearly' && (
                  <div className="flex items-baseline">
                    <span className="text-sm text-gray-400 ml-2">($125.97 annually)</span>
                  </div>
                )}
              </div>

              {/* Billing Toggle */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setBillingType('monthly')}
                  className={`w-full px-4 py-2.5 text-sm rounded-lg transition-colors border ${
                    billingType === 'monthly'
                      ? 'bg-gray-600 text-gray-100 border-gray-500'
                      : 'bg-gray-700 text-gray-400 border-gray-600 hover:bg-gray-600'
                  }`}
                >
                  <span className="block h-5">Monthly</span>
                </button>
                <div className="relative">
                  <div className={`absolute -top-2 left-1/2 -translate-x-1/2 text-gray-100 text-[10px] px-2 py-0.5 rounded-full z-10 transition-opacity ${
                    billingType === 'yearly' ? 'bg-green-600' : 'bg-green-700'
                  }`}>
                    SAVE 30%
                  </div>
                  <button
                    onClick={() => setBillingType('yearly')}
                    className={`w-full px-4 py-2.5 text-sm rounded-lg transition-colors border ${
                      billingType === 'yearly'
                        ? 'bg-gray-600 text-gray-100 border-gray-500'
                        : 'bg-gray-700 text-gray-400 border-gray-600 hover:bg-gray-600'
                    }`}
                  >
                    <span className="block h-5">Annual</span>
                  </button>
                </div>
              </div>

              <ul className="mt-4 space-y-3">
                <FeatureItem included={true}>Unlimited generations</FeatureItem>
                <FeatureItem included={true}>All styles included</FeatureItem>
                <FeatureItem included={true}>High resolution downloads</FeatureItem>
                <FeatureItem included={true}>Advanced placement options</FeatureItem>
                <FeatureItem included={true}>Premium features</FeatureItem>
                <FeatureItem included={true}>Special styles</FeatureItem>
              </ul>
            </div>
            <div className="mt-auto pt-6">
              <Button
                onClick={handleSubmit}
                className="w-full bg-gray-600 hover:bg-gray-500 text-gray-100"
              >
                Get Pro Unlimited
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-100">
          {isSignUp ? 'Create an account' : 'Welcome'}
        </h2>
        <p className="text-sm text-gray-400 mt-2">
          {isSignUp ? 'Sign up' : 'Sign in'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm mx-auto">
        {error && (
          <div className="p-3 text-sm text-red-400 bg-red-900/50 border border-red-800 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label 
            htmlFor="email" 
            className="text-sm font-medium text-gray-200"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-3 py-2 text-sm bg-gray-800 border border-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 placeholder-gray-500"
          />
        </div>

        <div className="space-y-2">
          <label 
            htmlFor="password" 
            className="text-sm font-medium text-gray-200"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="w-full px-3 py-2 text-sm bg-gray-800 border border-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 placeholder-gray-500"
          />
        </div>

        {isSignUp && (
          <div className="space-y-2">
            <label 
              htmlFor="passwordConfirm" 
              className="text-sm font-medium text-gray-200"
            >
              Confirm Password
            </label>
            <input
              id="passwordConfirm"
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="Confirm your password"
              required
              className="w-full px-3 py-2 text-sm bg-gray-800 border border-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 placeholder-gray-500"
            />
            {passwordError && (
              <p className="text-sm text-red-400 mt-1">
                {passwordError}
              </p>
            )}
          </div>
        )}

        {!isSignUp && (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 bg-gray-800 border-gray-700 rounded text-gray-600 focus:ring-gray-600"
              />
              <label 
                htmlFor="remember" 
                className="ml-2 text-sm text-gray-400"
              >
                Remember me
              </label>
            </div>
            <button 
              type="button"
              className="text-sm text-gray-400 hover:text-gray-300 hover:underline"
            >
              Forgot password?
            </button>
          </div>
        )}

        <Button
          type="submit"
          className="w-full bg-gray-700 hover:bg-gray-600 text-gray-100"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg 
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-100" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                />
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              {isSignUp ? 'Creating account...' : 'Signing in...'}
            </div>
          ) : (
            isSignUp ? 'Continue' : 'Sign in'
          )}
        </Button>

        <div className="text-center text-sm text-gray-400">
          {isSignUp ? (
            <>
              Already have an account?{' '}
              <button 
                type="button"
                onClick={() => setIsSignUp(false)}
                className="text-gray-300 hover:text-gray-100 hover:underline"
              >
                Sign in
              </button>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <button 
                type="button"
                onClick={() => setIsSignUp(true)}
                className="text-gray-300 hover:text-gray-100 hover:underline"
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </form>

      {/* Add Google Sign In Button */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
        </div>
      </div>

      <Button
        onClick={handleGoogleSignIn}
        className="w-full bg-gray-800 hover:bg-gray-700 text-gray-100 flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
          />
        </svg>
        Continue with Google
      </Button>
    </div>
  )
}