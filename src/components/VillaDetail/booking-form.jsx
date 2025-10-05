"use client"
import { useState, useEffect, useRef } from "react"
import { useAuth } from "../../context/AuthContext"
import axios from "axios"
import {
  Calendar,
  Plus,
  Minus,
  Check,
  Shield,
  Heart,
  ChevronRight,
  Users,
  CreditCard,
  Clock,
  MapPin,
  Phone,
  Edit3,
  Save,
  X,
} from "lucide-react"
import UnifiedCalendar from "./unified-calender.jsx"
import BasicCalendar from "./basic-calendar.jsx"
import { getPriceForDate, getPriceForDateSync } from "../../data/villa-pricing.jsx"
import { fetchVillaOfferForDate, calculatePricingWithOffers } from "../../utils/offersApi"
import Swal from "sweetalert2"

// import axios from "axios"

import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import { auth } from "../../utils/otp"
import { useNavigate } from 'react-router-dom';


// Replace the countryCodesList array with this fixed version
const countryCodesList = [
  { code: "+1", name: "United States", flag: "🇺🇸" },
  { code: "+44", name: "United Kingdom", flag: "🇬🇧" },
  { code: "+91", name: "India", flag: "🇮🇳" },
  { code: "+86", name: "China", flag: "🇨🇳" },
  { code: "+81", name: "Japan", flag: "🇯🇵" },
  { code: "+49", name: "Germany", flag: "🇩🇪" },
  { code: "+33", name: "France", flag: "🇫🇷" },
  { code: "+39", name: "Italy", flag: "🇮🇹" },
  { code: "+7", name: "Russia", flag: "🇷🇺" },
  { code: "+55", name: "Brazil", flag: "🇧🇷" },
  { code: "+61", name: "Australia", flag: "🇦🇺" },
  { code: "+34", name: "Spain", flag: "🇪🇸" },
  { code: "+82", name: "South Korea", flag: "🇰🇷" },
  { code: "+65", name: "Singapore", flag: "🇸🇬" },
  { code: "+971", name: "UAE", flag: "🇦🇪" },
  { code: "+966", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+60", name: "Malaysia", flag: "🇲🇾" },
  { code: "+66", name: "Thailand", flag: "🇹🇭" },
  { code: "+84", name: "Vietnam", flag: "🇻🇳" },
  { code: "+62", name: "Indonesia", flag: "🇮🇩" },
  { code: "+63", name: "Philippines", flag: "🇵🇭" },
  { code: "+880", name: "Bangladesh", flag: "🇧🇩" },
  { code: "+94", name: "Sri Lanka", flag: "🇱🇰" },
  { code: "+977", name: "Nepal", flag: "🇳🇵" },
  { code: "+92", name: "Pakistan", flag: "🇵🇰" },
  { code: "+27", name: "South Africa", flag: "🇿🇦" },
  { code: "+20", name: "Egypt", flag: "🇪🇬" },
  { code: "+234", name: "Nigeria", flag: "🇳🇬" },
  { code: "+254", name: "Kenya", flag: "🇰🇪" },
  { code: "+52", name: "Mexico", flag: "🇲🇽" },
  { code: "+54", name: "Argentina", flag: "🇦🇷" },
  { code: "+56", name: "Chile", flag: "🇨🇱" },
  { code: "+57", name: "Colombia", flag: "🇨🇴" },
  { code: "+51", name: "Peru", flag: "🇵🇪" },
  { code: "+90", name: "Turkey", flag: "🇹🇷" },
  { code: "+98", name: "Iran", flag: "🇮🇷" },
  { code: "+964", name: "Iraq", flag: "🇮🇶" },
  { code: "+972", name: "Israel", flag: "🇮🇱" },
  { code: "+31", name: "Netherlands", flag: "🇳🇱" },
  { code: "+46", name: "Sweden", flag: "🇸🇪" },
  { code: "+47", name: "Norway", flag: "🇳🇴" },
  { code: "+45", name: "Denmark", flag: "🇩🇰" },
  { code: "+358", name: "Finland", flag: "🇫🇮" },
  { code: "+41", name: "Switzerland", flag: "🇨🇭" },
  { code: "+43", name: "Austria", flag: "🇦🇹" },
  { code: "+32", name: "Belgium", flag: "🇧🇪" },
  { code: "+351", name: "Portugal", flag: "🇵🇹" },
  { code: "+48", name: "Poland", flag: "🇵🇱" },
  { code: "+420", name: "Czech Republic", flag: "🇨🇿" },
  { code: "+36", name: "Hungary", flag: "🇭🇺" },
  { code: "+30", name: "Greece", flag: "🇬🇷" },
  { code: "+385", name: "Croatia", flag: "🇭🇷" },
  { code: "+386", name: "Slovenia", flag: "🇸🇮" },
  { code: "+421", name: "Slovakia", flag: "🇸🇰" },
  { code: "+370", name: "Lithuania", flag: "🇱🇹" },
  { code: "+371", name: "Latvia", flag: "🇱🇻" },
  { code: "+372", name: "Estonia", flag: "🇪🇪" },
  { code: "+353", name: "Ireland", flag: "🇮🇪" },
  { code: "+354", name: "Iceland", flag: "🇮🇸" },
  { code: "+356", name: "Malta", flag: "🇲🇹" },
  { code: "+357", name: "Cyprus", flag: "🇨🇾" },
  { code: "+359", name: "Bulgaria", flag: "🇧🇬" },
  { code: "+40", name: "Romania", flag: "🇷🇴" },
  { code: "+381", name: "Serbia", flag: "🇷🇸" },
  { code: "+382", name: "Montenegro", flag: "🇲🇪" },
  { code: "+387", name: "Bosnia and Herzegovina", flag: "🇧🇦" },
  { code: "+389", name: "North Macedonia", flag: "🇲🇰" },
  { code: "+383", name: "Kosovo", flag: "🇽🇰" },
  { code: "+355", name: "Albania", flag: "🇦🇱" },
  { code: "+373", name: "Moldova", flag: "🇲🇩" },
  { code: "+380", name: "Ukraine", flag: "🇺🇦" },
  { code: "+375", name: "Belarus", flag: "🇧🇾" },
  { code: "+995", name: "Georgia", flag: "🇬🇪" },
  { code: "+374", name: "Armenia", flag: "🇦🇲" },
  { code: "+994", name: "Azerbaijan", flag: "🇦🇿" },
  { code: "+993", name: "Turkmenistan", flag: "🇹🇲" },
  { code: "+992", name: "Tajikistan", flag: "🇹🇯" },
  { code: "+996", name: "Kyrgyzstan", flag: "🇰🇬" },
  { code: "+998", name: "Uzbekistan", flag: "🇺🇿" },
  { code: "+7", name: "Kazakhstan", flag: "🇰🇿", id: "kaz" }, // Added id to make key unique
  { code: "+976", name: "Mongolia", flag: "🇲🇳" },
  { code: "+852", name: "Hong Kong", flag: "🇭🇰" },
  { code: "+853", name: "Macau", flag: "🇲🇴" },
  { code: "+886", name: "Taiwan", flag: "🇹🇼" },
  { code: "+850", name: "North Korea", flag: "🇰🇵" },
  { code: "+95", name: "Myanmar", flag: "🇲🇲" },
  { code: "+856", name: "Laos", flag: "🇱🇦" },
  { code: "+855", name: "Cambodia", flag: "🇰🇭" },
  { code: "+673", name: "Brunei", flag: "🇧🇳" },
  { code: "+670", name: "East Timor", flag: "🇹🇱" },
  { code: "+975", name: "Bhutan", flag: "🇧🇹" },
  { code: "+960", name: "Maldives", flag: "🇲🇻" },
  { code: "+93", name: "Afghanistan", flag: "🇦🇫" },
  // Removed duplicate Iran entry
  // Removed duplicate Iraq entry
  { code: "+965", name: "Kuwait", flag: "🇰🇼" },
  { code: "+973", name: "Bahrain", flag: "🇧🇭" },
  { code: "+974", name: "Qatar", flag: "🇶🇦" },
  { code: "+968", name: "Oman", flag: "🇴🇲" },
  { code: "+967", name: "Yemen", flag: "🇾🇪" },
  { code: "+962", name: "Jordan", flag: "🇯🇴" },
  { code: "+961", name: "Lebanon", flag: "🇱🇧" },
  { code: "+963", name: "Syria", flag: "🇸🇾" },
  { code: "+212", name: "Morocco", flag: "🇲🇦" },
  { code: "+213", name: "Algeria", flag: "🇩🇿" },
  { code: "+216", name: "Tunisia", flag: "🇹🇳" },
  { code: "+218", name: "Libya", flag: "🇱🇾" },
  { code: "+251", name: "Ethiopia", flag: "🇪🇹" },
  { code: "+252", name: "Somalia", flag: "🇸🇴" },
  { code: "+253", name: "Djibouti", flag: "🇩🇯" },
  { code: "+256", name: "Uganda", flag: "🇺🇬" },
  { code: "+255", name: "Tanzania", flag: "🇹🇿" },
  { code: "+250", name: "Rwanda", flag: "🇷🇼" },
  { code: "+257", name: "Burundi", flag: "🇧🇮" },
  { code: "+260", name: "Zambia", flag: "🇿🇲" },
  { code: "+263", name: "Zimbabwe", flag: "🇿🇼" },
  { code: "+265", name: "Malawi", flag: "🇲🇼" },
  { code: "+266", name: "Lesotho", flag: "🇱🇸" },
  { code: "+267", name: "Botswana", flag: "🇧🇼" },
  { code: "+268", name: "Eswatini", flag: "🇸🇿" },
  { code: "+264", name: "Namibia", flag: "🇳🇦" },
  { code: "+258", name: "Mozambique", flag: "🇲🇿" },
  { code: "+261", name: "Madagascar", flag: "🇲🇬" },
  { code: "+230", name: "Mauritius", flag: "🇲🇺" },
  { code: "+248", name: "Seychelles", flag: "🇸🇨" },
  { code: "+290", name: "Saint Helena", flag: "🇸🇭" },
]
// Phone Verification Component
const PhoneVerificationForm = ({
  userData,
  setPhoneVerified,
  authToken,
  countryCode,
  setCountryCode,
  newPhone,
  setNewPhone,
  setUserPhoneData,
}) => {
  const [sendingOtp, setSendingOtp] = useState(false)
  const [verifyingOtp, setVerifyingOtp] = useState(false)
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [confirmationResult, setConfirmationResult] = useState(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [otpCode, setOtpCode] = useState("")
  const recaptchaVerifierRef = useRef(null)
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "https://luxorstay-backend.vercel.app"

  useEffect(() => {
    return () => {
      if (recaptchaVerifierRef.current) {
        try {
          recaptchaVerifierRef.current.clear()
        } catch (error) {
          console.error("Error clearing recaptcha:", error)
        }
        recaptchaVerifierRef.current = null
      }
    }
  }, [])

  const startPhoneVerification = async () => {
    try {
      setSendingOtp(true)
      setError("")
      if (!newPhone || newPhone.length < 10) {
        setError("Please enter a valid phone number")
        setSendingOtp(false)
        return
      }
      const formattedPhone = `${countryCode}${newPhone}`

      // First check if this number already exists in the database
      const checkResponse = await axios.get(
        `${baseUrl}/api/profile/check-phone?phoneNumber=${encodeURIComponent(formattedPhone)}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken") || localStorage.getItem("token")}`
          }
        }
      )
      if (checkResponse.data.exists) {
        // Show warning if the number is already associated with another account
        Swal.fire({
          icon: "error",
          title: "Phone Number Already Registered",
          text: "This phone number is already associated with another account. Please use a different phone number.",
          confirmButtonColor: "#ca8a04",
        })
        setSendingOtp(false)
        return
      }

      // If number is not already registered, proceed with OTP verification
      if (recaptchaVerifierRef.current) {
        try {
          recaptchaVerifierRef.current.clear()
        } catch (error) {
          console.error("Error clearing recaptcha:", error)
        }
      }

      recaptchaVerifierRef.current = new RecaptchaVerifier(auth, "recaptcha-container-booking", {
        size: "invisible",
        callback: () => {
          console.log("Recaptcha verified")
        },
        "expired-callback": () => {
          setError("reCAPTCHA expired. Please try again.")
          setSendingOtp(false)
        },
      })

      console.log("Sending OTP to:", formattedPhone)
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone, recaptchaVerifierRef.current)
      setConfirmationResult(confirmation)
      setShowOtpInput(true)
      setSendingOtp(false)
      setSuccess("OTP sent successfully! Please check your phone.")
    } catch (error) {
      console.error("Error sending OTP:", error)
      if (error.response && error.response.status === 401) {
        // Handle unauthorized error
        setError("Your session has expired. Please sign in again.")
        // Potentially redirect to login page
      } else {
        setError(error.message || "Failed to verify phone number. Please try again.")
      }
      setSendingOtp(false)
      if (recaptchaVerifierRef.current) {
        try {
          recaptchaVerifierRef.current.clear()
        } catch (error) {
          console.error("Error clearing recaptcha:", error)
        }
        recaptchaVerifierRef.current = null
      }
    }
  }

  const verifyPhoneOtp = async () => {
    try {
      setVerifyingOtp(true)
      setError("")
      if (!otpCode || otpCode.length !== 6) {
        setError("Please enter a valid 6-digit OTP")
        setVerifyingOtp(false)
        return
      }
      if (!confirmationResult) {
        setError("Session expired. Please request a new OTP.")
        setVerifyingOtp(false)
        return
      }

      // First verify the OTP with Firebase
      await confirmationResult.confirm(otpCode)

      // Then update the phone number in the backend profile
      const response = await axios.post(
        `${baseUrl}/api/profile/update-phone`,
        { phone: newPhone, countryCode: countryCode },
        { headers: { Authorization: `Bearer ${authToken}` } },
      )

      if (response.data.success) {
        setSuccess("Phone number verified successfully!")
        setPhoneVerified(true)
        
        // Store the verified phone data in our state
        setUserPhoneData({
          phone: newPhone,
          countryCode: countryCode
        })
        
        // Also update the main profile in the backend to ensure consistency
        // This ensures the phone is stored in the user profile document, not just the auth record
        try {
          const profileUpdateResponse = await axios.put(
            `${baseUrl}/api/profile/update`,
            {
              phone: newPhone,
              countryCode: countryCode
            },
            { headers: { Authorization: `Bearer ${authToken}` } }
          )
          
          if (profileUpdateResponse.data.success) {
            console.log("Phone number successfully stored in user profile")
          }
        } catch (profileError) {
          console.error("Error updating profile with phone number:", profileError)
          // We don't need to show this error to the user as the phone verification was successful
        }
      }
    } catch (error) {
      console.error("Error verifying OTP:", error)
      setError(error.message || "Failed to verify OTP. Please try again.")
      setPhoneVerified(false)
    } finally {
      setVerifyingOtp(false)
      setConfirmationResult(null)
    }
  }

  return (
    <div className="space-y-3">
      {error && <div className="p-2 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs">{error}</div>}
      {success && <div className="p-2 bg-green-50 border-l-4 border-green-500 text-green-700 text-xs">{success}</div>}
      {!showOtpInput ? (
        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Country Code</label>
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm appearance-none bg-white"
              disabled={sendingOtp}
            >
              {countryCodesList.map((country, index) => (
                <option 
                  key={country.id || `${country.code}-${country.name}-${index}`} 
                  value={country.code}
                >
                  {country.flag} {country.name} ({country.code})
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Phone Number</label>
            <div className="flex">
              <div className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                <span className="text-sm text-gray-500">{countryCode}</span>
              </div>
              <input
                type="tel"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                className="flex-1 border border-gray-300 rounded-r-md px-3 py-2 focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Enter phone number"
                disabled={sendingOtp}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={startPhoneVerification}
            disabled={sendingOtp || !newPhone || newPhone.length < 10}
            className="w-full bg-gradient-to-r from-[#D4AF37] to-[#BFA181] hover:from-[#BFA181] hover:to-[#D4AF37] text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50 text-sm"
          >
            {sendingOtp ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending OTP...
              </span>
            ) : (
              "Send OTP"
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Enter OTP Code</label>
            <input
              type="text"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-yellow-500 focus:border-yellow-500 text-center tracking-wider"
              placeholder="Enter 6-digit code"
              maxLength="6"
            />
            <p className="text-xs text-gray-500">
              Enter the 6-digit code sent to {countryCode} {newPhone}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={verifyPhoneOtp}
              disabled={verifyingOtp || !otpCode || otpCode.length !== 6}
              className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#BFA181] hover:from-[#BFA181] hover:to-[#D4AF37] text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50 text-sm"
            >
              {verifyingOtp ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Verifying...
                </span>
              ) : (
                "Verify OTP"
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowOtpInput(false)
                setOtpCode("")
              }}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg transition-colors text-sm"
            >
              Back
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-1">
            Didn't receive the code?{" "}
            <button
              type="button"
              onClick={startPhoneVerification}
              disabled={sendingOtp}
              className="text-[#D4AF37] hover:text-[#BFA181] transition-colors"
            >
              Resend
            </button>
          </p>
        </div>
      )}
    </div>
  )
}

export default function EnhancedBookingForm({
  villa,
  checkInDate,
  checkOutDate,
  onDateChange,
  adults,
  children,
  infants,
  onGuestChange,
  onBookNow,
  bookingLoading,
  paymentProcessing,
  isSignedIn,
  userData,
  isModal = false,
  blockedDates = [],
  initialBookingStep = 1,
  initialAddress = {
    street: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
  },
  onCalendarVisibilityChange = () => {}, // Add this prop to notify parent component
}) {
  const [bookingStep, setBookingStep] = useState(initialBookingStep)
  const [showCalendar, setShowCalendar] = useState(false)
  
  // Update parent component whenever calendar visibility changes
  const updateCalendarVisibility = (isVisible) => {
    // Just update the state - no delays or conditional rendering
    setShowCalendar(isVisible);
    onCalendarVisibilityChange(isVisible);
    
    // Apply iOS-specific fixes when opening calendar
    if (isVisible) {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                   (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      if (isIOS) {
        // Force iOS to recalculate layout
        document.body.style.WebkitTransform = 'scale(1)';
        void document.body.offsetHeight; // Force reflow
        document.body.style.WebkitTransform = '';
      }
    }
  }
  const [address, setAddress] = useState(initialAddress)
  const [countries, setCountries] = useState([])
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [isLoadingCountries, setIsLoadingCountries] = useState(false)
  const [isLoadingStates, setIsLoadingStates] = useState(false)
  const [isLoadingCities, setIsLoadingCities] = useState(false)
  const [savedAddresses, setSavedAddresses] = useState([])
  const [isLoadingSavedAddresses, setIsLoadingSavedAddresses] = useState(false)
  const [selectedSavedAddress, setSelectedSavedAddress] = useState("")
  const [showNewAddressForm, setShowNewAddressForm] = useState(true)
  // New states for address editing
  const [addressEditMode, setAddressEditMode] = useState(false)
  const [hasAddressData, setHasAddressData] = useState(false)
  const [originalAddress, setOriginalAddress] = useState({})
  const [phoneVerified, setPhoneVerified] = useState(false)
  const [phoneVerificationError, setPhoneVerificationError] = useState("")
  const [newPhone, setNewPhone] = useState("")
  const [countryCode, setCountryCode] = useState("+91")
  
  // Offers state
  const [pricingWithOffers, setPricingWithOffers] = useState({})
  const [isLoadingOffers, setIsLoadingOffers] = useState(false)
  const [offerError, setOfferError] = useState("")
  const [isLoadingPhoneCheck, setIsLoadingPhoneCheck] = useState(false)
  const [userPhoneData, setUserPhoneData] = useState(null)
  const navigate = useNavigate();

  // Import useAuth
  const { authToken } = useAuth()

  // Utility function to check authentication before proceeding to booking step 3
  const checkAuthenticationForBookingStep = () => {
    if (!authToken) {
      // Save current booking state for redirect back after login
      const currentBookingData = {
        villaId: villa?.id || villa?._id,
        villaName: villa?.name,
        checkInDate,
        checkOutDate,
        adults,
        children,
        bookingStep: 3, // Continue to step 3 after login
        totalAmount,
        originalAmount: basePriceData.originalPrice,
        finalAmount: basePriceData.finalPrice,
        hasOffers: basePriceData.hasOffers,
        pricingWithOffers: pricingWithOffers,
        returnUrl: window.location.pathname + window.location.search
      }
      
      // Store in localStorage to persist across navigation
      localStorage.setItem('pendingBookingData', JSON.stringify(currentBookingData))
      
      Swal.fire({
        icon: "warning", 
        title: "Login Required",
        text: "Please sign in to continue with your booking.",
        confirmButtonColor: "#ca8a04",
        confirmButtonText: "Go to Sign In",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/sign-in", { 
            state: { 
              from: window.location.pathname,
              bookingData: currentBookingData
            }
          })
        }
      })
      return false // Not authenticated
    }
    return true // Authenticated
  }

  const checkInTime = "14:00 (2:00 PM)"
  const checkOutTime = "12:00 (12:00 PM)"

  const totalNights =
    checkInDate && checkOutDate
      ? Math.max(
          1,
          Math.ceil((new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 3600 * 24)),
        )
      : 0

  const villaFallbackPricing = {
    "Amrith Palace": { weekday: 45000, weekend: 65000 },
    "Ram Water Villa": { weekday: 30000, weekend: 45000 },
    "East Coast Villa": { weekday: 15000, weekend: 25000 },
    "Lavish Villa I": { weekday: 18000, weekend: 25000 },
    "Lavish Villa II": { weekday: 18000, weekend: 25000 },
    "Lavish Villa III": { weekday: 16000, weekend: 23000 },
    "Empire Anand Villa Samudra": { weekday: 40000, weekend: 60000 },
  }

  let weekdayPrice = Number(villa?.price) || Number(villa?.weekdayPrice) || 0
  let weekendPrice = Number(villa?.weekendPrice) || Number(villa?.weekendprice) || 0

  // Validate prices are proper numbers
  if (isNaN(weekdayPrice) || weekdayPrice <= 0) {
    weekdayPrice = 25000; // Default fallback
  }
  if (isNaN(weekendPrice) || weekendPrice <= 0) {
    weekendPrice = 0; // Will be calculated below
  }

  if (weekendPrice === 0 && villa?.name) {
    const villaMatch = Object.entries(villaFallbackPricing).find(([name]) =>
      villa.name.toLowerCase().includes(name.toLowerCase()),
    )
    if (villaMatch) {
      weekendPrice = villaMatch[1].weekend
      console.log(`Using fallback weekend price for ${villa.name}: ₹${weekendPrice}`)
    } else if (weekdayPrice > 0) {
      weekendPrice = Math.round(weekdayPrice * 1.5)
      console.log(`No fallback found for ${villa.name}, using 1.5x multiplier: ₹${weekendPrice}`)
    }
  }

  // If weekendPrice is still 0, try to use fallback pricing
  if (weekendPrice === 0 || !weekendPrice || isNaN(weekendPrice)) {
    // Find a matching villa in our fallback pricing
    for (const [villaName, pricing] of Object.entries(villaFallbackPricing)) {
      if (villa?.name && villa.name.toLowerCase().includes(villaName.toLowerCase())) {
        weekendPrice = pricing.weekend
        // Also set the weekday price if needed
        if (weekdayPrice === 0 || isNaN(weekdayPrice)) {
          weekdayPrice = pricing.weekday
        }
        break
      }
    }

    // If still no weekend price, use a multiplier on weekday price
    if ((weekendPrice === 0 || !weekendPrice || isNaN(weekendPrice)) && weekdayPrice > 0) {
      weekendPrice = Math.round(weekdayPrice * 1.5)
    }
  }

  // Final validation to ensure we never have invalid prices
  if (isNaN(weekdayPrice) || weekdayPrice <= 0) {
    weekdayPrice = 25000; // Default fallback
  }
  if (isNaN(weekendPrice) || weekendPrice <= 0) {
    weekendPrice = Math.round(weekdayPrice * 1.5); // Default weekend multiplier
  }

  console.log("Booking form prices:", {
    villaName: villa?.name,
    weekdayPrice: weekdayPrice,
    weekendPrice: weekendPrice,
    rawData: villa,
    usingFallback: villa?.weekendPrice === 0 || villa?.weekendprice === 0,
  })

  // Function to fetch offers for the entire date range
  const fetchOffersForDateRange = async () => {
    if (!checkInDate || !checkOutDate || !villa?._id) {
      setPricingWithOffers({})
      return
    }

    setIsLoadingOffers(true)
    setOfferError("")
    
    try {
      const startDate = new Date(checkInDate)
      const endDate = new Date(checkOutDate)
      const nights = Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)))
      const dateOffers = {}

      for (let i = 0; i < nights; i++) {
        const currentDate = new Date(startDate)
        currentDate.setDate(currentDate.getDate() + i)
        
        try {
          const pricingResult = await calculatePricingWithOffers(villa._id, currentDate)
          dateOffers[currentDate.toDateString()] = pricingResult
        } catch (error) {
          console.warn(`Error fetching offers for ${currentDate.toDateString()}:`, error)
          // Fallback to regular pricing
          const dayOfWeek = currentDate.getDay()
          const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
          const originalPrice = isWeekend ? weekendPrice : weekdayPrice
          
          dateOffers[currentDate.toDateString()] = {
            hasOffer: false,
            originalPrice: originalPrice,
            finalPrice: originalPrice
          }
        }
      }

      setPricingWithOffers(dateOffers)
    } catch (error) {
      console.error("Error fetching offers for date range:", error)
      setOfferError("Failed to load offers")
    } finally {
      setIsLoadingOffers(false)
    }
  }

  // Effect to fetch offers when dates or villa change
  useEffect(() => {
    if (checkInDate && checkOutDate && villa?._id) {
      fetchOffersForDateRange()
    }
  }, [checkInDate, checkOutDate, villa?._id])

  const calculateBasePrice = () => {
    if (!checkInDate || !checkOutDate || !villa) return { finalPrice: 0, originalPrice: 0, hasOffers: false }
    try {
      let totalPrice = 0
      let originalTotalPrice = 0
      const startDate = new Date(checkInDate)
      const endDate = new Date(checkOutDate)
      const nights = Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)))

      for (let i = 0; i < nights; i++) {
        const currentDate = new Date(startDate)
        currentDate.setDate(currentDate.getDate() + i)
        const dateKey = currentDate.toDateString()
        const dayOfWeek = currentDate.getDay()
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

        // Calculate original price with proper validation
        const originalDayPrice = isWeekend ? 
          (Number(weekendPrice) && !isNaN(Number(weekendPrice)) ? Number(weekendPrice) : 25000) : 
          (Number(weekdayPrice) && !isNaN(Number(weekdayPrice)) ? Number(weekdayPrice) : 25000)
        originalTotalPrice += originalDayPrice

        // Check if we have offer pricing for this date
        if (pricingWithOffers[dateKey]) {
          const offerPrice = pricingWithOffers[dateKey].finalPrice
          totalPrice += (offerPrice && !isNaN(offerPrice) ? offerPrice : originalDayPrice)
        } else {
          totalPrice += originalDayPrice
        }
      }

      return {
        finalPrice: (totalPrice && !isNaN(totalPrice) && totalPrice > 0) ? totalPrice : 0,
        originalPrice: (originalTotalPrice && !isNaN(originalTotalPrice) && originalTotalPrice > 0) ? originalTotalPrice : 0,
        hasOffers: Object.values(pricingWithOffers).some(p => p.hasOffer)
      }
    } catch (error) {
      console.error("Error calculating base price:", error)
      return {
        finalPrice: 0,
        originalPrice: 0,
        hasOffers: false
      }
    }
  }

  const calculateTotalAmount = () => {
    if (!checkInDate || !checkOutDate || !villa) return 0
    try {
      let totalPrice = 0
      const startDate = new Date(checkInDate)
      const endDate = new Date(checkOutDate)
      const nights = Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)))

      for (let i = 0; i < nights; i++) {
        const currentDate = new Date(startDate)
        currentDate.setDate(currentDate.getDate() + i)
        const dateKey = currentDate.toDateString()
        
        let dayPrice = 0
        
        // Check if we have offer pricing for this date
        if (pricingWithOffers[dateKey]) {
          dayPrice = pricingWithOffers[dateKey].finalPrice
        } else {
          // Fallback to regular pricing
          dayPrice = getPriceForDateSync(currentDate, villa)
        }
        
        // Ensure dayPrice is a valid number
        if (isNaN(dayPrice) || dayPrice <= 0) {
          console.warn(`Invalid price for date ${dateKey}, using fallback`);
          dayPrice = 25000; // Default fallback price
        }
        
        totalPrice += dayPrice
      }

      const serviceFee = Math.round(totalPrice * 0.05)
      const taxAmount = Math.round((totalPrice + serviceFee) * 0.18)
      const finalTotal = Math.round(totalPrice + serviceFee + taxAmount)
      
      // Final validation to ensure we never return NaN
      return (finalTotal && !isNaN(finalTotal) && finalTotal > 0) ? finalTotal : 0
    } catch (error) {
      console.error("Error calculating total amount:", error)
      return 0
    }
  }

  const basePriceData = calculateBasePrice()
  const totalAmount = calculateTotalAmount()

  const formatTimeDisplay = (timeString) => {
    return timeString
  }

  const extractRailwayTime = (timeString) => {
    if (timeString.includes("(")) {
      return timeString.split(" ")[0]
    }
    return timeString
  }

  const handleDateChangeWithTime = (checkIn, checkOut) => {
    if (checkIn && checkOut) {
      onDateChange(checkIn, checkOut)
      updateCalendarVisibility(false)
    } else if (checkIn && !checkInDate) {
      onDateChange(checkIn, checkOutDate)
    } else if (checkOut && checkInDate) {
      onDateChange(checkInDate, checkOut)
      updateCalendarVisibility(false)
    } else {
      onDateChange(checkIn, checkOut)
      if (checkIn && checkOut) {
        updateCalendarVisibility(false)
      }
    }
  }

  const handleBookNowWithTime = () => {
    if (!isSignedIn) {
      const bookingData = {
        checkInDate,
        checkOutDate,
        adults,
        children,
        infants,
        address: address,
        bookingStep,
        villaId: villa?._id || villa?.id,
        originalAmount: basePriceData.originalPrice,
        finalAmount: basePriceData.finalPrice,
        hasOffers: basePriceData.hasOffers,
        pricingWithOffers: pricingWithOffers,
        returnUrl: window.location.pathname + window.location.search,
      }
      localStorage.setItem("pendingBookingData", JSON.stringify(bookingData))
      Swal.fire({
        icon: "info",
        title: "Login Required",
        text: "Please log in to complete your booking. Your selections will be saved.",
        confirmButtonColor: "#D4AF37",
        confirmButtonText: "Continue to Login",
      }).then(() => {
        window.location.href = "/sign-in?redirect=booking"
      })
      return
    }
    
    // Calculate breakdown components for passing to booking review
    const basePrice = basePriceData.finalPrice && !isNaN(basePriceData.finalPrice) ? basePriceData.finalPrice : 0;
    const serviceFee = Math.round(basePrice * 0.05);
    const taxAmount = Math.round((basePrice + serviceFee) * 0.18);
    const calculatedTotal = Math.round(basePrice + serviceFee + taxAmount);
    
    // Prepare booking data for review page
    const bookingData = {
      villaId: villa?._id || villa?.id,
      villaName: villa?.name,
      pricePerNight: villa?.price || 10000, // Add the villa's base price
      weekendPrice: villa?.weekendPrice || villa?.weekendprice || villa?.price * 1.5 || 15000, // Add weekend price
      checkInDate,
      checkOutDate,
      adults,
      children,
      infants,
      address: address,
      phone: userPhoneData?.phone || userData?.phone || newPhone,
      countryCode: userPhoneData?.countryCode || userData?.countryCode || countryCode,
      checkInTime: extractRailwayTime(checkInTime),
      checkOutTime: extractRailwayTime(checkOutTime),
      originalAmount: basePriceData.originalPrice,
      finalAmount: basePriceData.finalPrice,
      totalAmount: calculatedTotal, // Use the calculated total that matches breakdown
      hasOffers: basePriceData.hasOffers,
      pricingWithOffers: pricingWithOffers,
      offerSavings: basePriceData.originalPrice - basePriceData.finalPrice,
      // Add breakdown components
      basePrice: basePrice,
      serviceFee: serviceFee,
      taxAmount: taxAmount,
      breakdown: {
        basePrice,
        serviceFee,
        taxAmount,
        total: calculatedTotal
      },
      // Add more fields as needed
    };
    // Navigate to review page
    navigate('/booking-review', { state: { bookingData } });
  }

  // Check if address has complete data
  const checkAddressData = (addressData) => {
    return addressData.street && addressData.country && addressData.state && addressData.city && addressData.zipCode
  }

  useEffect(() => {
    fetchCountries()
  }, [])

  useEffect(() => {
    if (isSignedIn && userData) {
      fetchSavedAddresses()
    }
  }, [isSignedIn, userData])

  useEffect(() => {
    if (initialAddress.street || initialAddress.country || initialAddress.city) {
      setAddress(initialAddress)
      setHasAddressData(checkAddressData(initialAddress))
    }
  }, [initialAddress])

  useEffect(() => {
    if (initialBookingStep > 1) {
      setBookingStep(initialBookingStep)
    }
  }, [initialBookingStep])

  // Check address data whenever address changes
  useEffect(() => {
    setHasAddressData(checkAddressData(address))
  }, [address])

  // Add new useEffect to fetch user address when user is signed in
  useEffect(() => {
    if (isSignedIn && userData) {
      fetchUserAddressInfo()
    }
  }, [isSignedIn, userData])

  // Function to fetch user address information from previous bookings or profile
  const fetchUserAddressInfo = async () => {
    try {
      // Don't fetch if we already have an address from props
      if (initialAddress.street || initialAddress.country || initialAddress.city) {
        console.log("Using provided initial address:", initialAddress)
        return
      }

      const baseUrl = import.meta.env.VITE_API_BASE_URL || "https://luxorstay-backend.vercel.app"
      const token = localStorage.getItem("token")

      if (!token) {
        console.log("No auth token available for fetching address")
        return
      }

      const response = await axios.get(`${baseUrl}/api/bookings/user-address-info`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.data && response.data.success && response.data.addressInfo) {
        console.log("Found user address info:", response.data.addressInfo)
        setAddress(response.data.addressInfo)
        setHasAddressData(checkAddressData(response.data.addressInfo))
        // If we have country and state info, fetch the corresponding states and cities
        if (response.data.addressInfo.country) {
          fetchStates(response.data.addressInfo.country)
          if (response.data.addressInfo.state) {
            fetchCities(response.data.addressInfo.country, response.data.addressInfo.state)
          }
        }
      }
    } catch (error) {
      // Just log the error but don't show to user since this is just an enhancement
      console.error("Error fetching user address info:", error.response?.data || error.message)
    }
  }

  const fetchCountries = async () => {
    setIsLoadingCountries(true)
    try {
      // Define India as a constant to ensure consistent naming
      const INDIA = { name: "India", code: "IN" }

      const response = await fetch("https://countriesnow.space/api/v0.1/countries/positions")
      const data = await response.json()

      if (data.data && Array.isArray(data.data)) {
        // Map countries to our format
        let mappedCountries = data.data
          .map((c) => ({ name: c.name, code: c.iso2 || "" }))
          // Sort alphabetically first
          .sort((a, b) => a.name.localeCompare(b.name))

        // Remove India if it exists in the array
        mappedCountries = mappedCountries.filter((country) => country.name.toLowerCase() !== "india")

        // Always ensure India is at the beginning, regardless of API response
        const finalCountries = [INDIA, ...mappedCountries]
        console.log("Countries list prepared with India as first option:", finalCountries[0])

        setCountries(finalCountries)
      } else {
        // Fallback if API doesn't return expected format
        console.warn("API didn't return expected data format, using fallback country list")
        setCountries([INDIA])
      }
    } catch (error) {
      console.error("Error fetching countries:", error)
      // If API fails, at least ensure India is available
      setCountries([{ name: "India", code: "IN" }])
    } finally {
      setIsLoadingCountries(false)
    }
  }

  const fetchStates = async (country) => {
    if (!country) {
      setStates([])
      setCities([])
      return
    }
    setIsLoadingStates(true)
    setStates([])
    setCities([])
    try {
      const response = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country }),
      })
      const data = await response.json()
      if (data.data && data.data.states) {
        setStates(data.data.states)
        console.log(`Fetched ${data.data.states.length} states for ${country}`)
      } else {
        console.warn("No states data received for country:", country)
      }
    } catch (error) {
      console.error("Error fetching states:", error)
      setStates([])
    } finally {
      setIsLoadingStates(false)
    }
  }

  const fetchCities = async (country, state) => {
    if (!country || !state) {
      setCities([])
      return
    }
    setIsLoadingCities(true)
    setCities([])
    try {
      const response = await fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country, state }),
      })
      const data = await response.json()
      if (data.data) {
        setCities(data.data)
        console.log(`Fetched ${data.data.length} cities for ${state}, ${country}`)
      } else {
        console.warn("No cities data received for:", state, country)
      }
    } catch (error) {
      console.error("Error fetching cities:", error)
      setCities([]) // Ensure cities is empty on error
    } finally {
      setIsLoadingCities(false)
    }
  }

  const fetchSavedAddresses = async () => {
    if (!isSignedIn) return
    setIsLoadingSavedAddresses(true)
    try {
      const token = localStorage.getItem("token") || localStorage.getItem("authToken")
      if (!token) return

      const baseUrl = import.meta.env.VITE_API_BASE_URL || "https://luxorstay-backend.vercel.app"

      // First try the new consolidated endpoint that includes both profile and booking addresses
      try {
        const addressResponse = await axios.get(`${baseUrl}/api/bookings/user-address-info`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (addressResponse.data && addressResponse.data.success && addressResponse.data.addressInfo) {
          // If we have a successful response with address info, use it
          const addressInfo = addressResponse.data.addressInfo
          // Create a single address entry from the consolidated info
          const addressList = [
            {
              id: "saved",
              label: "Previous Booking Address",
              street: addressInfo.street || "",
              city: addressInfo.city || "",
              state: addressInfo.state || "",
              country: addressInfo.country || "",
              zipCode: addressInfo.zipCode || "",
              source: "saved",
            },
          ]

          setSavedAddresses(addressList)
          setShowNewAddressForm(false)

          // If this is the first time the form is loaded, set the address
          if (!address.street && !address.city) {
            setAddress(addressInfo)
            setHasAddressData(checkAddressData(addressInfo))
            // Load the related states and cities
            if (addressInfo.country) {
              await fetchStates(addressInfo.country)
              if (addressInfo.state) {
                await fetchCities(addressInfo.country, addressInfo.state)
              }
            }
          }

          setIsLoadingSavedAddresses(false)
          return
        }
      } catch (error) {
        console.log("New address endpoint not available or returned an error, falling back to legacy method")
      }

     
      const bookingsResponse = await fetch(`${baseUrl}/api/bookings/user-bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      const profileResponse = await fetch(`${baseUrl}/api/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      const addressList = []

      if (profileResponse.ok) {
        const profileData = await profileResponse.json()
        if (profileData.user) {
          const { address: streetAddress, city, state, zipCode, country } = profileData.user
          if (streetAddress || city || state || country) {
            addressList.push({
              id: "profile",
              label: "Profile Address",
              street: streetAddress || "",
              city: city || "",
              state: state || "",
              country: country || "",
              zipCode: zipCode || "",
              source: "profile",
            })
          }
        }
      }

      if (bookingsResponse.ok) {
        const bookingsData = await bookingsResponse.json()
        if (Array.isArray(bookingsData)) {
          // Handle the case where bookings are returned directly as an array
          bookingsData.forEach((booking) => {
            if (booking.address && typeof booking.address === "object") {
              if (booking.address.street || booking.address.city || booking.address.state || booking.address.country) {
                const addressId = `booking-${booking._id}`
                const isAddressAlreadyAdded = addressList.some(
                  (addr) =>
                    addr.street === booking.address.street &&
                    addr.city === booking.address.city &&
                    addr.state === booking.address.state &&
                    addr.country === booking.address.country,
                )

                if (!isAddressAlreadyAdded) {
                  let label = `${booking.address.city || ""}, ${booking.address.state || ""}`
                  if (label.startsWith(", ")) label = label.substring(2)
                  if (label.endsWith(", ")) label = label.substring(0, label.length - 2)
                  if (!label) label = "Previous Booking Address"

                  addressList.push({
                    id: addressId,
                    label: label,
                    street: booking.address.street || "",
                    city: booking.address.city || "",
                    state: booking.address.state || "",
                    country: booking.address.country || "",
                    zipCode: booking.address.zipCode || "",
                    source: "booking",
                    bookingDate: booking.createdAt || null,
                  })
                }
              }
            }
          })
        } else if (bookingsData.bookings && Array.isArray(bookingsData.bookings)) {
          // Handle the case where bookings are in a bookings property
          bookingsData.bookings.forEach((booking) => {
            if (booking.address && typeof booking.address === "object") {
              if (booking.address.street || booking.address.city || booking.address.state || booking.address.country) {
                const addressId = `booking-${booking._id}`
                const isAddressAlreadyAdded = addressList.some(
                  (addr) =>
                    addr.street === booking.address.street &&
                    addr.city === booking.address.city &&
                    addr.state === booking.address.state &&
                    addr.country === booking.address.country,
                )

                if (!isAddressAlreadyAdded) {
                  let label = `${booking.address.city || ""}, ${booking.address.state || ""}`
                  if (label.startsWith(", ")) label = label.substring(2)
                  if (label.endsWith(", ")) label = label.substring(0, label.length - 2)
                  if (!label) label = "Previous Booking Address"

                  addressList.push({
                    id: addressId,
                    label: label,
                    street: booking.address.street || "",
                    city: booking.address.city || "",
                    state: booking.address.state || "",
                    country: booking.address.country || "",
                    zipCode: booking.address.zipCode || "",
                    source: "booking",
                    bookingDate: booking.createdAt || null,
                  })
                }
              }
            }
          })
        }
      }

      addressList.sort((a, b) => {
        if (a.source === "profile" && b.source === "booking") return 1
        if (a.source === "booking" && b.source === "profile") return -1
        if (a.source === "booking" && b.source === "booking") {
          if (a.bookingDate && b.bookingDate) {
            return new Date(b.bookingDate) - new Date(a.bookingDate)
          }
        }
        return 0
      })

      setSavedAddresses(addressList)
    } catch (error) {
      console.error("Error fetching saved addresses:", error)
    } finally {
      setIsLoadingSavedAddresses(false)
    }
  }

  const handleSavedAddressChange = async (e) => {
    const selectedId = e.target.value
    setSelectedSavedAddress(selectedId)

    if (selectedId === "new") {
      setShowNewAddressForm(true)
      setAddress({
        street: "",
        country: "",
        state: "",
        city: "",
        zipCode: "",
      })
      setHasAddressData(false)
      setAddressEditMode(true)
      // Clear dropdowns
      setStates([])
      setCities([])
      return
    }

    const selectedAddress = savedAddresses.find((addr) => addr.id === selectedId)
    if (selectedAddress) {
      console.log("Selected address:", selectedAddress)
      // Set the address first
      const newAddress = {
        street: selectedAddress.street || "",
        city: selectedAddress.city || "",
        state: selectedAddress.state || "",
        country: selectedAddress.country || "",
        zipCode: selectedAddress.zipCode || "",
      }
      setAddress(newAddress)
      setShowNewAddressForm(true)

      // Check if we have complete address data
      const isCompleteAddress = checkAddressData(newAddress)
      setHasAddressData(isCompleteAddress)

      // If country is missing but we have other address data,
      // go directly to read-only mode and show what we have
      if (!selectedAddress.country && (selectedAddress.city || selectedAddress.state)) {
        console.log("Country missing but other address data exists, showing in read-only mode")
        setAddressEditMode(false)
        setHasAddressData(true) // Force to show in read-only mode even if incomplete
        return
      }

      // If we have a country, proceed with normal dropdown population
      if (selectedAddress.country) {
        setAddressEditMode(false)
        try {
          console.log("Fetching states for country:", selectedAddress.country)

          // Set loading states
          setIsLoadingStates(true)
          setIsLoadingCities(true)

          // Clear existing data first
          setStates([])
          setCities([])

          // Fetch states
          const statesResponse = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ country: selectedAddress.country }),
          })
          const statesData = await statesResponse.json()
          if (statesData.data && statesData.data.states) {
            setStates(statesData.data.states)
            console.log("States loaded:", statesData.data.states.length)
          }
          setIsLoadingStates(false)

          // If we have a state, also fetch cities
          if (selectedAddress.state) {
            console.log("Fetching cities for state:", selectedAddress.state)

            const citiesResponse = await fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                country: selectedAddress.country,
                state: selectedAddress.state,
              }),
            })
            const citiesData = await citiesResponse.json()
            if (citiesData.data) {
              setCities(citiesData.data)
              console.log("Cities loaded:", citiesData.data.length)
            }
          }
          setIsLoadingCities(false)
        } catch (error) {
          console.error("Error fetching location data:", error)
          setIsLoadingStates(false)
          setIsLoadingCities(false)
        }
      } else {
        // No country data, but we might have partial address info
        // Set to edit mode so user can complete the address
        setAddressEditMode(true)
        setHasAddressData(false)
      }
    }
  }

  const handleAddressChange = (e) => {
    const { name, value } = e.target
    setAddress((prev) => ({ ...prev, [name]: value }))

    if (name === "country") {
      fetchStates(value)
      setAddress((prev) => ({ ...prev, state: "", city: "" }))
    }
    if (name === "state") {
      fetchCities(address.country, value)
      setAddress((prev) => ({ ...prev, city: "" }))
    }
  }

  const handleEditAddress = () => {
    setOriginalAddress({ ...address })
    setAddressEditMode(true)
    // Fetch states and cities for current address
    if (address.country) {
      fetchStates(address.country)
      if (address.state) {
        setTimeout(() => {
          fetchCities(address.country, address.state)
        }, 500)
      }
    }
  }

  const handleSaveAddress = () => {
    if (checkAddressData(address)) {
      setAddressEditMode(false)
      setHasAddressData(true)
    } else {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Address",
        text: "Please fill in all address fields before saving.",
        confirmButtonColor: "#D4AF37",
      })
    }
  }

  const handleCancelEdit = () => {
    setAddress(originalAddress)
    setAddressEditMode(false)
  }

  // Function to check for existing phone number in user profile and other sources
  const checkUserPhoneNumber = async () => {
    if (!isSignedIn || !userData) return
    
    try {
      setIsLoadingPhoneCheck(true)
      setPhoneVerificationError("") // Clear any previous errors
      
      // Define baseUrl within the function scope to ensure it's available
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "https://luxorstay-backend.vercel.app"
      
      // First check if phone exists in userData
      if (userData.phone && userData.countryCode) {
        console.log("Phone found in user data:", userData.phone, userData.countryCode)
        setUserPhoneData({
          phone: userData.phone,
          countryCode: userData.countryCode
        })
        setPhoneVerified(true)
        return
      }
      
      // Try different token sources to ensure we have one that works
      const token = authToken || localStorage.getItem("authToken") || localStorage.getItem("token")
      
      if (!token) {
        console.log("No auth token available for checking phone")
        setPhoneVerificationError("Authentication required to verify phone number")
        return
      }
      
      // Try to fetch from profile endpoint
      try {
        console.log("Fetching user profile for phone information...")
        const response = await axios.get(`${baseUrl}/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        
        if (response.data && response.data.user) {
          const profileData = response.data.user
          console.log("Got profile data:", profileData)
          
          // Check if profile has phone number
          if (profileData.phone && profileData.countryCode) {
            console.log("Phone found in profile data:", profileData.phone, profileData.countryCode)
            setUserPhoneData({
              phone: profileData.phone,
              countryCode: profileData.countryCode
            })
            setPhoneVerified(true)
            return
          }
        }
      } catch (err) {
        console.error("Error fetching profile:", err)
      }
      
      // If profile doesn't have phone, check user address endpoint
      try {
        console.log("Checking address info for phone data...")
        const addressResponse = await axios.get(`${baseUrl}/api/bookings/user-address-info`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        
        if (addressResponse.data && addressResponse.data.phoneData) {
          const phoneData = addressResponse.data.phoneData
          if (phoneData.phone && phoneData.countryCode) {
            console.log("Phone found in address info:", phoneData.phone, phoneData.countryCode)
            setUserPhoneData({
              phone: phoneData.phone,
              countryCode: phoneData.countryCode
            })
            setPhoneVerified(true)
            return
          }
        }
      } catch (err) {
        console.error("Error fetching address info:", err)
      }
      
      // Check previous bookings as a last resort
      try {
        console.log("Checking previous bookings for phone data...")
        const bookingResponse = await axios.get(`${baseUrl}/api/bookings/user-bookings`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        
        // Check if any booking has phone info
        if (bookingResponse.data && Array.isArray(bookingResponse.data) && bookingResponse.data.length > 0) {
          const booking = bookingResponse.data.find(b => b.phone || b.phoneNumber)
          if (booking) {
            const phone = booking.phone || booking.phoneNumber
            const countryCode = booking.countryCode || "+91" // Default if not available
            
            console.log("Phone found in previous booking:", phone, countryCode)
            setUserPhoneData({
              phone: phone,
              countryCode: countryCode
            })
            setPhoneVerified(true)
            return
          }
        }
      } catch (bookingErr) {
        console.error("Error fetching booking data:", bookingErr)
      }
      
      // If all attempts failed, show phone verification form
      console.log("No phone number found for user, verification will be required")
      setPhoneVerified(false)
      setUserPhoneData(null)
    } catch (error) {
      console.error("Error checking user phone number:", error)
      // Use more specific error messages
      if (error.response) {
        if (error.response.status === 401) {
          setPhoneVerificationError("Your session has expired. Please sign in again.")
        } else {
          setPhoneVerificationError(`Error: ${error.response.data?.message || "Server error occurred"}`)
        }
      } else if (error.request) {
        setPhoneVerificationError("Network error. Please check your connection and try again.")
      } else {
        setPhoneVerificationError("Error checking phone information. Please try again.")
      }
      
      setPhoneVerified(false)
      setUserPhoneData(null)
    } finally {
      setIsLoadingPhoneCheck(false)
    }
  }
  
  // Call checkUserPhoneNumber when component mounts and when user data changes
  useEffect(() => {
    if (isSignedIn && userData) {
      checkUserPhoneNumber()
    }
  }, [isSignedIn, userData])

  // Modify the phone verification section in the booking form to use this data:
  const renderPhoneVerificationSection = () => {
    return (
      <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#BFA181]/10 rounded-xl p-4 border border-[#D4AF37]/20">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-[#D4AF37]" />
            <h4 className="font-semibold text-gray-900 text-sm">Phone Number Verification</h4>
          </div>
        </div>
        <p className="text-xs text-gray-600 mb-4">Please verify your phone number for booking confirmation</p>

        {/* Show loading state */}
        {isLoadingPhoneCheck && (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#D4AF37]"></div>
          </div>
        )}

        {/* Show error message */}
        {phoneVerificationError && (
          <div className="p-2 mb-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs">
            {phoneVerificationError}
          </div>
        )}

        {/* Show verified phone number */}
        {!isLoadingPhoneCheck && userPhoneData && (
          <div className="space-y-3">
            <div className="p-3 bg-white rounded-lg border border-gray-200">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Phone Number</label>
              <p className="text-sm font-medium text-gray-900 mt-1">
                {userPhoneData.countryCode || "+"} {userPhoneData.phone}
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 text-green-700 text-xs">
                <Check className="w-4 h-4" />
                <span>Phone number verified</span>
              </div>
            </div>
          </div>
        )}

        {/* Show verification form if no phone found */}
        {!isLoadingPhoneCheck && !userPhoneData && (
          <PhoneVerificationForm
            userData={userData}
            setPhoneVerified={setPhoneVerified}
            authToken={authToken}
            countryCode={countryCode}
            setCountryCode={setCountryCode}
            newPhone={newPhone}
            setNewPhone={setNewPhone}
            setUserPhoneData={setUserPhoneData}
          />
        )}
      </div>
    )
  }

  return (
    <div
      className={`${isModal ? "relative" : ""} ${
        !isModal ? "lg:sticky lg:top-[calc(4rem+2rem)]" : ""
      } transition-all duration-300`}
    >
      <div
        className={`bg-white rounded-2xl shadow-xl border border-gray-100 p-4 lg:p-6 ${
          isModal ? "mt-0" : "mt-4"
        } transition-all duration-300 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto scrollbar-none lg:custom-scrollbar`}
      >
        <div className="text-center mb-6 p-4 bg-gradient-to-r from-[#D4AF37]/10 to-[#BFA181]/10 rounded-xl border border-[#D4AF37]/20">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Reserve Your Stay</h3>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <Shield className="w-4 h-4 text-[#D4AF37]" />
            <span>Secure booking • Instant confirmation</span>
          </div>
        </div>


        <div className="flex items-center justify-between mb-6">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  bookingStep > step
                    ? "bg-gradient-to-r from-[#D4AF37] to-[#BFA181] text-white"
                    : bookingStep === step
                      ? "bg-gradient-to-r from-[#D4AF37] to-[#BFA181] text-white"
                      : "bg-gray-200 text-gray-400"
                }`}
              >
                {bookingStep > step ? <Check className="h-4 w-4" /> : step}
              </div>
              {step < 4 && (
                <div
                  className={`w-6 h-1 transition-all duration-300 ${
                    bookingStep > step ? "bg-gradient-to-r from-[#D4AF37] to-[#BFA181]" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="text-center mb-6">
          <h3 className="text-lg font-bold text-gray-900">
            {bookingStep === 1 && "📅 Select Dates"}
            {bookingStep === 2 && "👥 Choose Guests"}
            {bookingStep === 3 && "🏠 Enter Address"}
            {bookingStep === 4 && "💳 Confirm & Pay"}
          </h3>
          <p className="text-gray-600 text-sm mt-1">Step {bookingStep} of 4</p>
        </div>

        <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#BFA181]/10 rounded-xl p-4 mb-6 border border-[#D4AF37]/20">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">Starting from</div>
            <div className="text-2xl font-bold text-gray-900">
              ₹{weekdayPrice?.toLocaleString() || "15,000"}
              <span className="text-base font-normal text-gray-600 ml-1">/ night</span>
            </div>
            <div className="flex justify-center gap-3 mt-2 text-xs">
              <div className="text-gray-600">
                Weekdays: <span className="font-semibold">₹{weekdayPrice?.toLocaleString()}</span>
              </div>
              <div className="text-gray-600">
                Weekends: <span className="font-semibold">₹{weekendPrice?.toLocaleString()}</span>
              </div>
            </div>
            {basePriceData.hasOffers && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-2 mt-3">
                <div className="text-xs text-green-700 font-medium">
                  🎉 Special offers available for your dates!
                </div>
              </div>
            )}
            {isLoadingOffers && (
              <div className="text-xs text-blue-600 mt-2">
                <span className="animate-pulse">Loading offers...</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {bookingStep === 1 && (
            <div className="space-y-3">
              <button
                onClick={() => updateCalendarVisibility(true)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-[#D4AF37] transition-all duration-200 text-left group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#D4AF37] to-[#BFA181] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">Select dates</div>
                      <div className="text-xs text-gray-600">
                        {checkInDate && checkOutDate
                          ? `${new Date(checkInDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${new Date(checkOutDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
                          : "Choose check-in and check-out"}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-[#D4AF37]" />
                </div>
              </button>

              {checkInDate && checkOutDate && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#BFA181]/10 rounded-xl p-3 border border-[#D4AF37]/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-[#D4AF37]" />
                      <span className="text-sm font-semibold text-gray-900">Check-in</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      {new Date(checkInDate).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <div className="text-lg font-bold text-[#D4AF37]">{formatTimeDisplay(checkInTime)}</div>
                  </div>
                  <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#BFA181]/10 rounded-xl p-3 border border-[#D4AF37]/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-[#D4AF37]" />
                      <span className="text-sm font-semibold text-gray-900">Check-out</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      {new Date(checkOutDate).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <div className="text-lg font-bold text-[#D4AF37]">{formatTimeDisplay(checkOutTime)}</div>
                  </div>
                </div>
              )}

              <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-xs text-blue-700 text-center">
                  <div className="font-medium mb-1">⏰ Standard Check-in/Check-out Times</div>
                  <div className="space-y-1">
                    <div>
                      <span className="font-medium">Check-in:</span> 14:00 (2:00 PM) on arrival day
                    </div>
                    <div>
                      <span className="font-medium">Check-out:</span> 12:00 (12:00 PM) on departure day
                    </div>
                    <div>
                      When you select dates {checkInDate && checkOutDate && `(${totalNights} nights)`}, your stay
                      includes all selected days
                    </div>
                  </div>
                </div>
              </div>

              {checkInDate && checkOutDate && (
                <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#BFA181]/10 rounded-xl p-3 border border-[#D4AF37]/20">
                  <div className="text-center">
                    <div className="text-[#D4AF37] font-semibold text-sm">
                      {totalNights} night{totalNights > 1 ? "s" : ""} selected
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {new Date(checkInDate).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      to{" "}
                      {new Date(checkOutDate).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {bookingStep === 2 && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#BFA181]/10 rounded-xl p-4 border border-[#D4AF37]/20">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-5 h-5 text-[#D4AF37]" />
                  <h4 className="font-semibold text-gray-900 text-sm">How many guests?</h4>
                </div>
                <p className="text-xs text-gray-600 mb-2">Maximum {villa?.guests || 4} guests allowed</p>
                {adults + children > (villa?.guests || 4) && (
                  <div className="mb-4 p-2 bg-red-50 rounded-md border border-red-200 text-xs text-red-700">
                    <strong>Warning:</strong> You have selected more guests than allowed for this villa. Please reduce
                    the number of guests.
                  </div>
                )}
                <div className="flex items-center justify-between mb-4 p-3 bg-white rounded-lg shadow-sm">
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">Adults</div>
                    <div className="text-xs text-gray-500">Age 13+</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onGuestChange(Math.max(1, adults - 1), children, infants)}
                      disabled={adults <= 1}
                      className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#BFA181] hover:border-[#D4AF37] hover:text-white transition-all disabled:opacity-50"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-6 text-center font-bold">{adults}</span>
                    <button
                      onClick={() => onGuestChange(adults + 1, children, infants)}
                      disabled={adults + children >= (villa?.guests || 4)}
                      className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#BFA181] hover:border-[#D4AF37] hover:text-white transition-all disabled:opacity-50"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4 p-3 bg-white rounded-lg shadow-sm">
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">Children</div>
                    <div className="text-xs text-gray-500">Age 3-12</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onGuestChange(adults, Math.max(0, children - 1), infants)}
                      disabled={children <= 0}
                      className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#BFA181] hover:border-[#D4AF37] hover:text-white transition-all disabled:opacity-50"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-6 text-center font-bold">{children}</span>
                    <button
                      onClick={() => onGuestChange(adults, children + 1, infants)}
                      disabled={adults + children >= (villa?.guests || 4)}
                      className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#BFA181] hover:border-[#D4AF37] hover:text-white transition-all disabled:opacity-50"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">Infants</div>
                    <div className="text-xs text-gray-500">Under 2 (don't count)</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onGuestChange(adults, children, Math.max(0, infants - 1))}
                      disabled={infants <= 0}
                      className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#BFA181] hover:border-[#D4AF37] hover:text-white transition-all disabled:opacity-50"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-6 text-center font-bold">{infants}</span>
                    <button
                      onClick={() => onGuestChange(adults, children, infants + 1)}
                      className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#BFA181] hover:border-[#D4AF37] hover:text-white transition-all"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
                <div className="mt-3 p-2 bg-white rounded-lg text-center shadow-sm">
                  <span className="font-semibold text-gray-900 text-sm">
                    Total: {adults + children} guest{adults + children > 1 ? "s" : ""}
                    {infants > 0 && ` + ${infants} infant${infants > 1 ? "s" : ""}`}
                  </span>
                </div>
              </div>

              <div className="mt-4 border-t border-gray-200 pt-4">
                <button
                  onClick={() => {
                    Swal.fire({
                      title: "Need More Guests?",
                      html: `
                        <div class="space-y-3 mt-2">
                          <p class="text-sm text-gray-600">Please contact us directly for special arrangements:</p>
                          <div class="flex items-center justify-center gap-3 mt-3 bg-gray-50 p-3 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="text-[#D4AF37]">
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                            <span class="font-medium text-gray-800">+91 8015924647</span>
                            <button id="copyPhone" class="bg-[#D4AF37]/20 p-1 rounded-full text-[#D4AF37] hover:bg-[#D4AF37]/30 transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      `,
                      showCloseButton: true,
                      showConfirmButton: false,
                      didOpen: () => {
                        const copyButton = document.getElementById("copyPhone")
                        if (copyButton) {
                          copyButton.addEventListener("click", () => {
                            navigator.clipboard.writeText("+91 8015924647").then(() => {
                              const originalHtml = copyButton.innerHTML
                              copyButton.innerHTML = `
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M20 6L9 17l-5-5"></path>
                                </svg>
                              `
                              setTimeout(() => {
                                copyButton.innerHTML = originalHtml
                              }, 1500)
                            })
                          })
                        }
                      },
                    })
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 text-sm text-[#D4AF37] bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 rounded-lg transition-colors"
                >
                  <span>Need to accommodate more guests?</span>
                  <Phone className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {bookingStep === 3 && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#BFA181]/10 rounded-xl p-4 border border-[#D4AF37]/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#D4AF37]" />
                    <h4 className="font-semibold text-gray-900 text-sm">Your Address Details</h4>
                  </div>
                  {hasAddressData && !addressEditMode && (
                    <button
                      onClick={handleEditAddress}
                      className="flex items-center gap-1 px-3 py-1 text-xs bg-[#D4AF37] text-white rounded-lg hover:bg-[#BFA181] transition-colors"
                    >
                      <Edit3 className="w-3 h-3" />
                      Edit
                    </button>
                  )}
                </div>
                <p className="text-xs text-gray-600 mb-4">Please provide your address information for the booking</p>

                {/* Show saved addresses dropdown only when no data or in edit mode */}
                {(!hasAddressData || addressEditMode) && savedAddresses.length > 0 && (
                  <div className="space-y-2 mb-4">
                    <label className="text-sm font-medium text-gray-700">Saved Addresses</label>
                    <select
                      value={selectedSavedAddress}
                      onChange={handleSavedAddressChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm appearance-none bg-white"
                    >
                      <option value="">-- Select a saved address --</option>
                      {savedAddresses.map((addr) => (
                        <option key={addr.id} value={addr.id}>
                          {addr.label}
                        </option>
                      ))}
                      <option value="new">+ Enter new address</option>
                    </select>
                  </div>
                )}

                {/* Show address data in read-only mode when data exists and not editing */}
                {hasAddressData && !addressEditMode && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="p-3 bg-white rounded-lg border border-gray-200">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Street Address
                        </label>
                        <p className="text-sm font-medium text-gray-900 mt-1">{address.street || "Not provided"}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-white rounded-lg border border-gray-200">
                          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Country</label>
                          <p className="text-sm font-medium text-gray-900 mt-1">
                            {address.country || <span className="text-gray-400 italic">Not specified</span>}
                          </p>
                        </div>
                        <div className="p-3 bg-white rounded-lg border border-gray-200">
                          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">State</label>
                          <p className="text-sm font-medium text-gray-900 mt-1">
                            {address.state || <span className="text-gray-400 italic">Not specified</span>}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-white rounded-lg border border-gray-200">
                          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">City</label>
                          <p className="text-sm font-medium text-gray-900 mt-1">
                            {address.city || <span className="text-gray-400 italic">Not specified</span>}
                          </p>
                        </div>
                        <div className="p-3 bg-white rounded-lg border border-gray-200">
                          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">ZIP Code</label>
                          <p className="text-sm font-medium text-gray-900 mt-1">
                            {address.zipCode || <span className="text-gray-400 italic">Not specified</span>}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Show a notice if country is missing */}
                    {!address.country && (address.city || address.state) && (
                      <div className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4 text-yellow-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                          </svg>
                          <div>
                            <p className="text-sm font-medium text-yellow-800">Incomplete Address Data</p>
                            <p className="text-xs text-yellow-700 mt-1">
                              Country information is missing from your saved address. Click Edit to complete the address
                              details.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Show form when no data or in edit mode */}
                {(!hasAddressData || addressEditMode) && showNewAddressForm && (
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Street Address</label>
                      <input
                        type="text"
                        name="street"
                        value={address.street}
                        onChange={handleAddressChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="Enter your street address"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Country</label>
                      <select
                        name="country"
                        value={address.country}
                        onChange={handleAddressChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm appearance-none bg-white"
                        required
                      >
                        <option value="">-- Select Country --</option>
                        {isLoadingCountries ? (
                          <option value="" disabled>
                            Loading countries...
                          </option>
                        ) : (
                          countries.map((country) => (
                            <option key={country.name} value={country.name}>
                              {country.name}
                            </option>
                          ))
                      )  }
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">State/Province</label>
                      <select
                        name="state"
                        value={address.state}
                        onChange={handleAddressChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm appearance-none bg-white"
                        disabled={!address.country || isLoadingStates}
                        required
                      >
                        <option value="">-- Select State --</option>
                        {isLoadingStates ? (
                          <option value="" disabled>
                            Loading states...
                          </option>
                        ) : (
                          states.map((state) => (
                            <option key={state.name} value={state.name}>
                              {state.name}
                            </option>
                          ))
                          )  }
                        {address.state && !states.find((s) => s.name === address.state) && !isLoadingStates && (
                          <option key={address.state} value={address.state}>
                            {address.state}
                          </option>
                        )}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">City</label>
                      <select
                        name="city"
                        value={address.city}
                        onChange={handleAddressChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm appearance-none bg-white"
                        disabled={!address.state || isLoadingCities}
                        required
                      >
                        <option value="">-- Select City --</option>
                        {isLoadingCities ? (
                          <option value="" disabled>
                            Loading cities...
                          </option>
                        ) : (
                          cities.map((city) => (
                            <option key={city} value={city}>
                              {city}
                            </option>
                          ))
                    )    }
                        {/* Show current city even if not in the list */}
                        {address.city && !cities.includes(address.city) && !isLoadingCities && (
                          <option key={address.city} value={address.city}>
                            {address.city}
                          </option>
                        )}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">ZIP/Postal Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={address.zipCode}
                        onChange={handleAddressChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="Enter ZIP code"
                        required
                      />
                    </div>

                    {/* Save/Cancel buttons when in edit mode */}
                    {addressEditMode && (
                      <div className="flex gap-2 mt-4">
                        <button
                          type="button"
                          onClick={handleSaveAddress}
                          className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm"
                        >
                          <Save className="w-4 h-4" />
                          Save Address
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="flex-1 flex items-center justify-center gap-2 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                      </div>
                    )}
                  </form>
                )}
              </div>

              {/* New Phone Verification Section */}
              <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#BFA181]/10 rounded-xl p-4 border border-[#D4AF37]/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-[#D4AF37]" />
                    <h4 className="font-semibold text-gray-900 text-sm">Phone Number Verification</h4>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-4">Please verify your phone number for booking confirmation</p>

                {/* Show loading state */}
                {isLoadingPhoneCheck && (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#D4AF37]"></div>
                  </div>
                )}

                {/* Show error message */}
                {phoneVerificationError && (
                  <div className="p-2 mb-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs">
                    {phoneVerificationError}
                  </div>
                )}

                {/* Show verified phone number */}
                {!isLoadingPhoneCheck && userPhoneData && (
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded-lg border border-gray-200">
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Phone Number</label>
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        {userPhoneData.countryCode || "+"} {userPhoneData.phone}
                      </p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2 text-green-700 text-xs">
                        <Check className="w-4 h-4" />
                        <span>Phone number verified</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Show verification form if no phone found */}
                {!isLoadingPhoneCheck && !userPhoneData && (
                  <PhoneVerificationForm
                    userData={userData}
                    setPhoneVerified={setPhoneVerified}
                    authToken={authToken}
                    countryCode={countryCode}
                    setCountryCode={setCountryCode}
                    newPhone={newPhone}
                    setNewPhone={setNewPhone}
                    setUserPhoneData={setUserPhoneData}
                  />
                )}
              </div>

              {/* Continue button logic - add phoneVerified check */}
              <div className="space-y-2 mt-4">
                <button
                  onClick={() => {
                    if (!checkAddressData(address)) {
                      Swal.fire({
                        icon: "warning",
                        title: "Missing Information",
                        text: "Please fill in all address fields to continue.",
                        confirmButtonColor: "#D4AF37",
                      })
                      return
                    }

                    // Update this check to use our verified state
                    if (!userPhoneData && !phoneVerified) {
                      Swal.fire({
                        icon: "warning",
                        title: "Phone Verification Required",
                        text: "Please verify your phone number to continue with booking.",
                        confirmButtonColor: "#D4AF37",
                      })
                      return
                    }

                    setBookingStep(4)
                  }}
                  className="w-full bg-gradient-to-r from-[#D4AF37] to-[#BFA181] hover:from-[#BFA181] hover:to-[#D4AF37] text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 text-sm"
                >
                  Continue to Review
                </button>
              </div>
            </div>
          )}

          {bookingStep === 4 && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#BFA181]/10 rounded-xl p-4 border border-[#D4AF37]/20">
                <div className="flex items-center gap-2 mb-3">
                  <CreditCard className="w-5 h-5 text-[#D4AF37]" />
                  <h4 className="font-semibold text-gray-900 text-sm">Booking Summary</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Dates ({totalNights} {totalNights === 1 ? "night" : "nights"}):
                    </span>
                    <span className="font-medium text-xs">
                      {checkInDate &&
                        checkOutDate &&
                        `${new Date(checkInDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${new Date(checkOutDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check-in (arrival):</span>
                    <span className="font-medium text-xs">
                      {formatTimeDisplay(checkInTime)} on{" "}
                      {new Date(checkInDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check-out (departure):</span>
                    <span className="font-medium text-xs">
                      {formatTimeDisplay(checkOutTime)} on{" "}
                      {new Date(checkOutDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Guests:</span>
                    <span className="font-medium text-xs">
                      {adults + children} guest{adults + children !== 1 ? "s" : ""}
                      {infants > 0 ? ` + ${infants} infant${infants !== 1 ? "s" : ""}` : ""}
                      <span className="text-xs text-gray-500 ml-1">(Max: {villa?.guests || 4})</span>
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Booked by:</span>
                    <span className="font-medium text-xs">{userData?.name || userData?.email || "Guest User"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone Number:</span>
                    <span className="font-medium text-xs">
                      {userPhoneData ? 
                        `${userPhoneData.countryCode || "+"} ${userPhoneData.phone}` : 
                        userData?.phone ? `${userData?.countryCode || "+"} ${userData?.phone}` : 
                        newPhone ? `${countryCode || "+"} ${newPhone}` : "Not provided"
                      }
                    </span>
                  </div>
                  {address.street && address.country && (
                    <div className="pt-2 mt-2 border-t border-gray-200">
                      <p className="font-medium text-sm text-gray-700 mb-1">Booking Address:</p>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {address.street}, {address.city}, {address.state}, {address.country}, {address.zipCode}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {totalAmount > 0 && (() => {
                // Calculate consistent breakdown values using the same logic as calculateTotalAmount
                const basePrice = basePriceData.finalPrice && !isNaN(basePriceData.finalPrice) ? basePriceData.finalPrice : 0;
                const serviceFee = Math.round(basePrice * 0.05);
                const taxAmount = Math.round((basePrice + serviceFee) * 0.18);
                const calculatedTotal = Math.round(basePrice + serviceFee + taxAmount);
                
                // Store these values for passing to booking review
                const breakdownData = {
                  basePrice,
                  serviceFee,
                  taxAmount,
                  calculatedTotal
                };
                
                return (
                  <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#BFA181]/10 rounded-xl p-4 border border-[#D4AF37]/20">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          {totalNights} night{totalNights > 1 ? "s" : ""}
                        </span>
                        <div className="flex flex-col items-end">
                          {basePriceData.hasOffers && basePriceData.originalPrice !== basePriceData.finalPrice ? (
                            <>
                              <span className="text-gray-400 line-through text-xs">
                                ₹{basePriceData.originalPrice && !isNaN(basePriceData.originalPrice) ? 
                                  basePriceData.originalPrice.toLocaleString() : "0"}
                              </span>
                              <span className="font-medium text-green-600">
                                ₹{basePrice.toLocaleString()}
                              </span>
                              <span className="text-xs text-green-600 font-medium">Offer Applied!</span>
                            </>
                          ) : (
                            <span className="font-medium">
                              ₹{basePrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Service fee (5%)</span>
                        <span className="font-medium">
                          ₹{serviceFee.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Taxes (18%)</span>
                        <span className="font-medium">
                          ₹{taxAmount.toLocaleString()}
                        </span>
                      </div>
                      {basePriceData.hasOffers && (
                        <div className="bg-green-50 rounded-lg p-2 mt-2">
                          <div className="text-xs text-green-700 font-medium text-center">
                            🎉 You saved ₹{basePriceData.originalPrice && basePriceData.finalPrice && 
                              !isNaN(basePriceData.originalPrice) && !isNaN(basePriceData.finalPrice) ? 
                              (basePriceData.originalPrice - basePriceData.finalPrice).toLocaleString() : "0"} with current offers!
                          </div>
                        </div>
                      )}
                      <div className="border-t border-[#D4AF37]/30 pt-2 mt-2">
                        <div className="flex justify-between font-bold">
                          <span className="text-gray-900">Total Amount</span>
                          <span className="text-[#D4AF37]">₹{calculatedTotal.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>

        <div className="mt-6 space-y-2">
          {bookingStep === 1 && (
            <button
              onClick={() => {
                if (!checkInDate || !checkOutDate) {
                  alert("Please select both check-in and check-out dates.")
                  return
                }
                setBookingStep(2)
              }}
              disabled={!checkInDate || !checkOutDate}
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#BFA181] hover:from-[#BFA181] hover:to-[#D4AF37] text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              Continue to Guests
            </button>
          )}

          {bookingStep === 2 && (
            <div className="space-y-2">
              <button
                onClick={() => {
                  const maxGuests = villa?.guests || 4
                  if (adults + children > maxGuests) {
                    Swal.fire({
                      icon: "error",
                      title: "Guest Limit Exceeded",
                      text: `This villa allows a maximum of ${maxGuests} guests. Please reduce the number of guests to continue.`,
                      confirmButtonText: "OK",
                      confirmButtonColor: "#D4AF37",
                    })
                    return
                  }
                  
                  // Check authentication before proceeding to step 3
                  if (checkAuthenticationForBookingStep()) {
                    setBookingStep(3)
                  }
                }}
                className="w-full bg-gradient-to-r from-[#D4AF37] to-[#BFA181] hover:from-[#BFA181] hover:to-[#D4AF37] text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 text-sm"
              >
                Continue to Address
              </button>
              <button
                onClick={() => setBookingStep(1)}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-xl transition-all duration-300 text-sm"
              >
                Back to Dates
              </button>
            </div>
          )}

          {bookingStep === 3 && (
            <div className="space-y-2">
              <button
                onClick={() => setBookingStep(2)}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-xl transition-all duration-300 text-sm"
              >
                Back to Guests
              </button>
            </div>
          )}

          {bookingStep === 4 && (
            <div className="space-y-2">
              <button
                onClick={handleBookNowWithTime}
                disabled={bookingLoading || paymentProcessing || !checkInDate || !checkOutDate}
                className="w-full bg-gradient-to-r from-[#D4AF37] to-[#BFA181] hover:from-[#BFA181] hover:to-[#D4AF37] text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {bookingLoading || paymentProcessing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    {paymentProcessing ? "Processing Payment..." : "Processing..."}
                  </div>
                ) : (
                  `Pay & Confirm ₹${(totalAmount && !isNaN(totalAmount) ? totalAmount : 0).toLocaleString()}`
                )}
              </button>
              <button
                onClick={() => {
                  // Check authentication before going back to step 3
                  if (checkAuthenticationForBookingStep()) {
                    setBookingStep(3)
                  }
                }}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-xl transition-all duration-300 text-sm"
              >
                Back to Address
              </button>
            </div>
          )}
        </div>

        <div className="mt-4 p-3 bg-gray-50 rounded-xl">
          <div className="flex items-center justify-center gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3 text-[#D4AF37]" />
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-1">
              <Check className="h-3 w-3 text-[#D4AF37]" />
              <span>Instant</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="h-3 w-3 text-[#D4AF37]" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>

        {!isSignedIn && (
          <div className="mt-3 p-3 bg-gradient-to-r from-[#D4AF37]/10 to-[#BFA181]/10 rounded-xl border border-[#D4AF37]/20">
            <div className="text-center">
              <h4 className="font-semibold text-[#D4AF37] text-sm">Login Required</h4>
              <p className="text-gray-700 text-xs mt-1">Sign in to complete your booking.</p>
            </div>
          </div>
        )}
      </div>

      {/* Direct rendering of UnifiedCalendar without nested containers */}
      <UnifiedCalendar
        isVisible={showCalendar}
        onClose={() => updateCalendarVisibility(false)}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        onDateSelect={handleDateChangeWithTime}
        villa={villa}
        blockedDates={blockedDates}
      />

      <div id="recaptcha-container-booking" style={{ visibility: "hidden" }}></div>
    </div>
  )
}
