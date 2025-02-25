'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/Button'
import Navbar from '../components/Navbar'
import { useSearchParams } from 'next/navigation'

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

export default function Settings() {
  const searchParams = useSearchParams()
  const { currentUser, userDataObj, upgradeToPro } = useAuth()
  const [activeTab, setActiveTab] = useState('account')
  const [showPricing, setShowPricing] = useState(false)
  const [billingType, setBillingType] = useState('monthly')
  const [displayName, setDisplayName] = useState(userDataObj?.displayName || '')
  const [country, setCountry] = useState(userDataObj?.country || 'United States')
  const [city, setCity] = useState(userDataObj?.city || '')
  const [userType, setUserType] = useState(userDataObj?.userType || 'CLIENT')
  const [experience, setExperience] = useState(userDataObj?.experience || 'BEGINNER')

  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab === 'billing') {
      setActiveTab('billing')
      setShowPricing(true)
    }
  }, [searchParams])

  const handleTabChange = (tab) => {
    if (tab !== 'billing') {
      setShowPricing(false);
    }
    setActiveTab(tab);
  };

  const PricingPlans = () => (
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
              onClick={async () => {
                try {
                  await upgradeToPro();
                  setShowPricing(false);
                  alert("You have successfully upgraded to Pro!");
                } catch (error) {
                  alert("Failed to upgrade: " + error.message);
                }
              }}
              className="w-full bg-gray-600 hover:bg-gray-500 text-gray-100"
            >
              Get Pro Unlimited
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8 mt-24">
        <div className="flex gap-8">
          {/* Left Sidebar */}
          <div className="w-64 space-y-1">
            <h2 className="text-xl font-bold text-gray-100 mb-4">Settings</h2>
            <button
              onClick={() => handleTabChange('account')}
              className={`w-full text-left px-4 py-2 rounded-lg ${
                activeTab === 'account' 
                  ? 'bg-gray-700 text-gray-100' 
                  : 'text-gray-400 hover:bg-gray-800'
              }`}
            >
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Account Info</span>
              </div>
            </button>
            <button
              onClick={() => handleTabChange('billing')}
              className={`w-full text-left px-4 py-2 rounded-lg ${
                activeTab === 'billing' 
                  ? 'bg-gray-700 text-gray-100' 
                  : 'text-gray-400 hover:bg-gray-800'
              }`}
            >
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span>Billing</span>
              </div>
            </button>
            <button
              onClick={() => handleTabChange('deletion')}
              className={`w-full text-left px-4 py-2 rounded-lg ${
                activeTab === 'deletion' 
                  ? 'bg-gray-700 text-gray-100' 
                  : 'text-gray-400 hover:bg-gray-800'
              }`}
            >
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>Account Deletion</span>
              </div>
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1 max-w-2xl">
            {activeTab === 'account' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-100">Account Info</h2>
                
                {/* Email Address */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    EMAIL ADDRESS
                  </label>
                  <label className="w-full px-0 py-2 text-gray-300">
                    {currentUser?.email}
                  </label>
                </div>

                {/* Display Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    PUBLIC DISPLAY NAME
                  </label>
                  <p className="text-xs text-gray-400">
                    This name will be displayed publicly on your profile and tattoo designs. Full names are abbreviated to first name and last initial.
                  </p>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                  />
                </div>

                {/* Location */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Country
                    </label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      City
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Save Button */}
                <Button className="w-full bg-gray-700 hover:bg-gray-600 text-gray-100">
                  SAVE
                </Button>
              </div>
            )}

            {activeTab === 'billing' && (
              showPricing ? (
                <PricingPlans />
              ) : (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-gray-100">Billing</h2>

                  {/* Credits & Subscription Section */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-300">
                      Credits & Subscription Plan
                    </h3>

                    {/* Current Plan */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">
                        Current Plan
                      </label>
                      <div className="flex items-center space-x-3">
                        <span className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded-full">
                          {userDataObj?.isPro ? 'Pro' : 'Free'}
                        </span>
                      </div>
                    </div>

                    {/* Available Credits */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">
                        Available Credits
                      </label>
                      <div className="flex items-center space-x-3">
                        <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full">
                          {userDataObj?.isPro ? 'Unlimited' : userDataObj?.credits || 0}
                        </span>
                      </div>
                    </div>

                    {/* Promotion Code */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">
                        Promotion Codes
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          placeholder="Enter code"
                          className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                        />
                        <Button className="px-4 bg-gray-700 hover:bg-gray-600 text-gray-100">
                          ADD
                        </Button>
                      </div>
                    </div>

                    {/* Subscribe Button */}
                    <Button
                      className="w-full bg-gray-700 hover:bg-gray-600 text-gray-100"
                      onClick={() => setShowPricing(true)}
                    >
                      Upgrade / Buy Credits
                    </Button>
                  </div>
                </div>
              )
            )}

            {activeTab === 'deletion' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-100">Account Deletion</h2>
                <p className="text-gray-400">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button 
                  className="w-full bg-red-600 hover:bg-red-500 text-white"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                      // Add your delete account logic here
                    }
                  }}
                >
                  DELETE ACCOUNT
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
} 