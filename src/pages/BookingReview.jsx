"use client"

import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { Calendar, Users, MapPin, Phone, Clock, Edit3, Save, X } from "lucide-react"
import { useAuth } from "../context/AuthContext"


// Import with lazy loading
import OptimizedImage from "../components/OptimizedImage"

// Define paths instead of importing directly
const villaImageMap = {
  "Amrith Palace": "/AmrithPalace/AP8.jpg",
  "East Coast Villa": "/eastcoastvilla/EC1.jpg",
  "Empire Anand Villa Samudra": "/empireanandvillasamudra/anandvilla1.jpg",
  "Ram Water Villa": "/ramwatervilla/RW1.jpg",
  "Lavish Villa I": "/LavishVilla 1/lvone18.jpg",
  "Lavish Villa II": "/LavishVilla 2/lvtwo22.jpg",
  "Lavish Villa III": "/LavishVilla 3/lvthree5.jpg",
  default: "/AmrithPalace/AP8.jpg",
}

// Optimized Razorpay script loading with defer attribute and error handling
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      return resolve(true)
    }
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.defer = true // Add defer attribute to non-blocking loading
    script.onload = () => resolve(true)
    script.onerror = () => {
      console.error("Failed to load Razorpay script")
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

export default function BookingReview() {
  const location = useLocation()
  const navigate = useNavigate()
  const { authToken, isAuthenticated, user } = useAuth()
  const [bookingData, setBookingData] = useState(null)
  const [paymentProcessing, setPaymentProcessing] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editedData, setEditedData] = useState(null)
  const [bookingDetails, setBookingDetails] = useState(null)

  // States for dropdowns
  const [countries, setCountries] = useState([])
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [isLoadingCountries, setIsLoadingCountries] = useState(false)
  const [isLoadingStates, setIsLoadingStates] = useState(false)
  const [isLoadingCities, setIsLoadingCities] = useState(false)

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated && !authToken) {
      // Store current location for redirect after login
      localStorage.setItem("authRedirectUrl", "/booking-review")
      // Store booking data if available
      if (location.state && location.state.bookingData) {
        localStorage.setItem("pendingBookingReview", JSON.stringify(location.state.bookingData))
      }
      // Redirect to login
      navigate("/sign-in", {
        state: { from: "/booking-review" },
        replace: true,
      })
      return
    }

    // Load booking data
    if (location.state && location.state.bookingData) {
      setBookingData(location.state.bookingData)
      setEditedData(location.state.bookingData)
      localStorage.setItem("pendingBookingReview", JSON.stringify(location.state.bookingData))
    } else {
      const stored = localStorage.getItem("pendingBookingReview")
      if (stored) {
        const data = JSON.parse(stored)
        setBookingData(data)
        setEditedData(data)
      }
    }

    // Fetch countries on component mount
    fetchCountries()
  }, [location.state, isAuthenticated, authToken, navigate])

  // Fetch countries
  const fetchCountries = async () => {
    setIsLoadingCountries(true)
    try {
      const INDIA = { name: "India", code: "IN" }
      const response = await fetch("https://countriesnow.space/api/v0.1/countries/positions")
      const data = await response.json()

      if (data.data && Array.isArray(data.data)) {
        let mappedCountries = data.data
          .map((c) => ({ name: c.name, code: c.iso2 || "" }))
          .sort((a, b) => a.name.localeCompare(b.name))

        mappedCountries = mappedCountries.filter((country) => country.name.toLowerCase() !== "india")
        const finalCountries = [INDIA, ...mappedCountries]
        setCountries(finalCountries)
      } else {
        setCountries([INDIA])
      }
    } catch (error) {
      console.error("Error fetching countries:", error)
      setCountries([{ name: "India", code: "IN" }])
    } finally {
      setIsLoadingCountries(false)
    }
  }

  // Fetch states
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
      }
    } catch (error) {
      console.error("Error fetching states:", error)
      setStates([])
    } finally {
      setIsLoadingStates(false)
    }
  }

  // Fetch cities
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
      }
    } catch (error) {
      console.error("Error fetching cities:", error)
      setCities([])
    } finally {
      setIsLoadingCities(false)
    }
  }

  // Handle country change
  const handleCountryChange = (country) => {
    handleAddressChange("country", country)
    handleAddressChange("state", "")
    handleAddressChange("city", "")
    fetchStates(country)
  }

  // Handle state change
  const handleStateChange = (state) => {
    handleAddressChange("state", state)
    handleAddressChange("city", "")
    fetchCities(editedData?.address?.country, state)
  }

  const handleInputChange = (field, value) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAddressChange = (field, value) => {
    setEditedData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }))
  }

  const handleSaveChanges = () => {
    setBookingData(editedData)
    setEditMode(false)
    localStorage.setItem("pendingBookingReview", JSON.stringify(editedData))

    Swal.fire({
      icon: "success",
      title: "Changes Saved",
      text: "Your booking details have been updated.",
      confirmButtonColor: "#D4AF37",
      timer: 2000,
      showConfirmButton: false,
    })
  }

  const handleCancelEdit = () => {
    setEditedData(bookingData)
    setEditMode(false)
  }

  const handleBack = () => {
    // Prepare the data to be passed to the booking form
    const bookingFormData = {
      ...editedData,
      fromReview: true,
      // Ensure we have the villaId for navigation
      villaId: bookingData.villaId || editedData.villaId
    };
    
    // Store in localStorage as fallback
    localStorage.setItem("pendingBookingData", JSON.stringify(bookingFormData));
    
    // Navigate to the villa booking page with the form data
    navigate(`/villa/${bookingFormData.villaId}`, {
      state: bookingFormData,
      replace: true
    });
  }

  const handlePayment = async (bookingData) => {
    try {
      setPaymentProcessing(true)

      // 1. First create the booking
      const bookingResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(bookingData),
      })

      if (!bookingResponse.ok) {
        const error = await bookingResponse.json()
        throw new Error(error.message || "Failed to create booking")
      }

      const booking = await bookingResponse.json()
      setBookingDetails(booking)

      // 2. Create Razorpay order
      const orderResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/payments/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          amount: booking.totalAmount * 100, // Convert to paise
          currency: "INR",
          receipt: `booking_${booking._id}`,
          notes: {
            bookingId: booking._id,
            villaId: booking.villa._id,
          },
        }),
      })

      if (!orderResponse.ok) {
        throw new Error("Failed to create payment order")
      }

      const order = await orderResponse.json()

      // 3. Initialize Razorpay
      await loadRazorpayScript()

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Luxor Villas",
        description: `Booking for ${booking.villa.name}`,
        order_id: order.id,
        handler: async (response) => {
          try {
            // Verify payment on the server
            const verifyResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/payments/verify`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                bookingId: booking._id,
              }),
            })

            const result = await verifyResponse.json()

            if (result.success) {
              Swal.fire({
                title: "Success!",
                text: "Payment successful! Your booking is confirmed.",
                icon: "success",
                confirmButtonText: "View My Bookings",
              }).then(() => {
                navigate("/my-bookings")
              })
            } else {
              throw new Error(result.message || "Payment verification failed")
            }
          } catch (error) {
            console.error("Payment verification error:", error)
            Swal.fire({
              title: "Error",
              text: error.message || "Payment verification failed. Please contact support.",
              icon: "error",
            })
          } finally {
            setPaymentProcessing(false)
          }
        },
        prefill: {
          name: booking.guestName,
          email: booking.email,
          contact: booking.phone || "",
        },
        theme: {
          color: "#3399cc",
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()

      rzp.on("payment.failed", (response) => {
        Swal.fire({
          title: "Payment Failed",
          text: response.error.description || "Payment was not completed successfully",
          icon: "error",
        })
        setPaymentProcessing(false)
      })
    } catch (error) {
      console.error("Payment error:", error)
      Swal.fire({
        title: "Error",
        text: error.message || "Something went wrong with the payment",
        icon: "error",
      })
      setPaymentProcessing(false)
    }
  }

  const handlePay = async () => {
    setPaymentProcessing(true)

    try {
      const isScriptLoaded = await loadRazorpayScript()
      if (!isScriptLoaded) {
        throw new Error("Failed to load payment gateway. Please refresh and try again.")
      }

      let calculatedTotalAmount = editedData.totalAmount
      let basePrice = 0
      let serviceFee = 0
      let taxAmount = 0
      
      // Try to use breakdown data from booking form first
      if (editedData.breakdown) {
        basePrice = editedData.breakdown.basePrice
        serviceFee = editedData.breakdown.serviceFee
        taxAmount = editedData.breakdown.taxAmount
        calculatedTotalAmount = editedData.breakdown.total
      } else if (!calculatedTotalAmount) {
        // Fallback calculation if breakdown data not available
        const nights = Math.max(
          1,
          Math.ceil(
            (new Date(editedData.checkOutDate).getTime() - new Date(editedData.checkInDate).getTime()) /
              (1000 * 3600 * 24),
          ),
        )
        
        // Calculate price based on weekday/weekend pricing
        let totalPrice = 0
        const weekdayPrice = editedData.pricePerNight || 10000
        const weekendPrice = editedData.weekendPrice || weekdayPrice * 1.5
        
        // Calculate for each night (simple approach - can be enhanced for exact weekday/weekend calculation)
        // For now, using weekday price as base
        totalPrice = weekdayPrice * nights

        basePrice = totalPrice
        serviceFee = Math.round(totalPrice * 0.05)
        taxAmount = Math.round((totalPrice + serviceFee) * 0.18)
        calculatedTotalAmount = Math.round(totalPrice + serviceFee + taxAmount)
        
        console.log("Amount calculation breakdown:")
        console.log("- Nights:", nights)
        console.log("- Weekday price per night:", weekdayPrice)
        console.log("- Weekend price per night:", weekendPrice)
        console.log("- Total base price:", totalPrice)
        console.log("- Service fee (5%):", serviceFee)
        console.log("- Tax amount (18%):", taxAmount)
        console.log("- Final calculated total:", calculatedTotalAmount)
      } else {
        // If total amount exists but no breakdown, derive breakdown from finalAmount
        basePrice = editedData.finalAmount || 0
        serviceFee = Math.round(basePrice * 0.05)
        taxAmount = Math.round((basePrice + serviceFee) * 0.18)
      }

      const authToken = localStorage.getItem("authToken") || localStorage.getItem("token")
      if (!authToken) {
        throw new Error("You must be signed in to pay.")
      }

      const orderResponse = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "https://luxorstay-backend.vercel.app"}/api/payments/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            amount: calculatedTotalAmount, // Use the actual calculated amount
            currency: "INR",
            villaName: editedData.villaName,
            villaId: editedData.villaId,
            guestName: editedData.guestName || "Guest",
            email: editedData.email,
            checkIn: editedData.checkInDate,
            checkOut: editedData.checkOutDate,
            checkInTime: editedData.checkInTime,
            checkOutTime: editedData.checkOutTime,
            guests: editedData.adults + editedData.children,
            infants: editedData.infants,
            totalDays: (new Date(editedData.checkOutDate) - new Date(editedData.checkInDate)) / (1000 * 3600 * 24) + 1,
            totalNights: (new Date(editedData.checkOutDate) - new Date(editedData.checkInDate)) / (1000 * 3600 * 24),
            address: editedData.address || {},
            originalCalculatedAmount: calculatedTotalAmount, // Store original amount for booking record
          }),
        },
      )

      const rawResponse = await orderResponse.text()
      let orderData
      try {
        orderData = JSON.parse(rawResponse)
      } catch {
        throw new Error("Invalid response from server. Please try again later.")
      }

      if (!orderData.success || !orderData.order || !orderData.order.id) {
        throw new Error(orderData.message || "Unable to create payment order. Please try again.")
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY || "rzp_live_quNHH9YfEhaAru",
        amount: orderData.order.amount,
        currency: orderData.order.currency || "INR",
        name: "LuxorStay",
        description: `Booking for ${editedData.villaName}`,
        order_id: orderData.order.id,
        modal: {
          // Disable QR code in the payment popup
          ondismiss: function() {
            // Handle modal close if needed
            setPaymentProcessing(false);
          },
          // Disable QR code
          confirm_close: true,
          // Hide UPI QR code section
          upi: {
            flow: "none"
          },
          // Hide other payment methods if needed
          method: {
            upi: false,
            card: true,
            netbanking: true,
            wallet: true,
            paylater: true
          }
        },
        handler: async (response) => {
          try {
            setPaymentProcessing(true)
            console.log("Payment response received:", response)

            // Get email from auth context if available
            const userEmail = (user && user.email) || editedData.email || localStorage.getItem("userEmail") || ""

            // Prepare booking data with proper types and values
            const bookingDetails = {
              villaId: editedData.villaId,
              villaName: editedData.villaName,
              checkIn: new Date(editedData.checkInDate).toISOString(),
              checkOut: new Date(editedData.checkOutDate).toISOString(),
              checkInTime: editedData.checkInTime || "14:00",
              checkOutTime: editedData.checkOutTime || "11:00",
              guests: Number.parseInt(editedData.adults || 0) + Number.parseInt(editedData.children || 0) || 1,
              infants: Number.parseInt(editedData.infants || 0),
              guestName: editedData.guestName || user?.name || "Guest",
              email: userEmail,
              phone: editedData.phone,
              totalAmount: calculatedTotalAmount, // Use calculated amount for booking record, not payment amount
              totalDays:
                Math.ceil(
                  (new Date(editedData.checkOutDate) - new Date(editedData.checkInDate)) / (1000 * 60 * 60 * 24),
                ) || 1,
              address: editedData.address || {},
            }

            console.log("Sending booking details:", bookingDetails)
            console.log("Total amount being sent:", bookingDetails.totalAmount, "Type:", typeof bookingDetails.totalAmount)

            // First, create the booking with the order ID
            const bookingResponse = await fetch(
              `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}/api/bookings/create`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify({
                  ...bookingDetails,
                  orderId: response.razorpay_order_id, // Include the order ID in the booking
                }),
              }
            )

            if (!bookingResponse.ok) {
              const errorText = await bookingResponse.text()
              console.error("Booking creation failed:", errorText)
              throw new Error(`Booking creation failed: ${errorText}`)
            }

            const booking = await bookingResponse.json()
            console.log("Booking created successfully:", booking)
            
            // Then verify the payment with both booking ID and order ID
            const paymentResponse = await fetch(
              `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}/api/payments/verify`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify({
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                  bookingId: booking._id,
                  orderId: response.razorpay_order_id // Also send orderId explicitly
                }),
              }
            )

            if (!paymentResponse.ok) {
              const errorText = await paymentResponse.text()
              console.error("Payment verification failed:", errorText)
              throw new Error(`Payment verification failed: ${errorText}`)
            }

            const result = await paymentResponse.json()

            // Clear stored booking data after successful payment
            localStorage.removeItem("pendingBookingReview")
            localStorage.removeItem("pendingBookingData")

            Swal.fire({
              icon: "success",
              title: "Booking Confirmed! 🎉",
              text: "Your payment was successful and booking has been confirmed!",
              confirmButtonColor: "#D4AF37",
              confirmButtonText: "View My Bookings",
            }).then(() => {
              navigate("/my-bookings", { replace: true })
            })
          } catch (error) {
            console.error("Payment processing error:", error)
            // Show a more user-friendly message
            Swal.fire({
              icon: "warning",
              title: "Payment Processing",
              text: "Your payment was received, but we need to confirm your booking. Our team will contact you shortly.",
              confirmButtonColor: "#D4AF37",
            })
          } finally {
            setPaymentProcessing(false)
          }
        },
        prefill: {
          name: editedData.guestName || "",
          email: editedData.email || "",
          contact: editedData.phone || "",
        },
        theme: {
          color: "#3399cc",
        },
        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true,
        },
        upi: {
          flow: "collect", // 🔁 UPI ID only (disables QR)
        },
      }

      const razorpayInstance = new window.Razorpay(options)
      razorpayInstance.open()
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: err.message || "There was a problem processing your booking.",
        confirmButtonColor: "#D4AF37",
      })
      setPaymentProcessing(false)
    }
  }

  const nights = Math.ceil(
    (new Date(editedData?.checkOutDate).getTime() - new Date(editedData?.checkInDate).getTime()) / (1000 * 3600 * 24),
  )

  // Get villa image
  const getVillaImage = (villaName) => {
    if (!villaName) return villaImageMap.default

    // Check for exact match first
    if (villaImageMap[villaName]) {
      return villaImageMap[villaName]
    }

    // Check for partial matches
    for (const [name, image] of Object.entries(villaImageMap)) {
      if (villaName.toLowerCase().includes(name.toLowerCase())) {
        return image
      }
    }

    return villaImageMap.default
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D4AF37]/10 to-[#BFA181]/10 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Review Your Booking</h1>
          <p className="text-gray-600">Please review and confirm your booking details before payment</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
            {/* Left Column - Villa Image */}
            <div className="relative overflow-hidden">
              <img
                src={getVillaImage(editedData?.villaName) || "/placeholder.svg"}
                alt={editedData?.villaName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h2 className="text-2xl font-bold mb-2">{editedData?.villaName}</h2>
                <p className="text-white/80 mb-4">Luxury Villa Experience</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>Up to {editedData?.adults + editedData?.children} guests</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {nights} night{nights > 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Booking Details */}
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Booking Details</h3>
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  {editMode ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                  {editMode ? "Cancel" : "Edit"}
                </button>
              </div>

              <div className="space-y-6">
                {/* Dates */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="w-5 h-5 text-[#D4AF37]" />
                    <h4 className="font-semibold text-gray-900">Stay Dates</h4>
                  </div>
                  {editMode ? (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-gray-500">Check-in</label>
                        <input
                          type="date"
                          value={editedData?.checkInDate}
                          onChange={(e) => handleInputChange("checkInDate", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">Check-out</label>
                        <input
                          type="date"
                          value={editedData?.checkOutDate}
                          onChange={(e) => handleInputChange("checkOutDate", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-700">
                      {editedData?.checkInDate} to {editedData?.checkOutDate} ({nights} night{nights > 1 ? "s" : ""})
                    </div>
                  )}
                </div>

                {/* Guests */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Users className="w-5 h-5 text-[#D4AF37]" />
                    <h4 className="font-semibold text-gray-900">Guests</h4>
                  </div>
                  {editMode ? (
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="text-xs text-gray-500">Adults</label>
                        <input
                          type="number"
                          min="1"
                          value={editedData?.adults}
                          onChange={(e) => handleInputChange("adults", Number.parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">Children</label>
                        <input
                          type="number"
                          min="0"
                          value={editedData?.children}
                          onChange={(e) => handleInputChange("children", Number.parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">Infants</label>
                        <input
                          type="number"
                          min="0"
                          value={editedData?.infants}
                          onChange={(e) => handleInputChange("infants", Number.parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-700">
                      {editedData?.adults} Adults, {editedData?.children} Children, {editedData?.infants} Infants
                    </div>
                  )}
                </div>

                {/* Contact Information */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Phone className="w-5 h-5 text-[#D4AF37]" />
                    <h4 className="font-semibold text-gray-900">Contact Information</h4>
                  </div>
                  {editMode ? (
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-gray-500">Phone Number</label>
                        <div className="flex gap-2">
                          <select
                            value={editedData?.countryCode}
                            onChange={(e) => handleInputChange("countryCode", e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          >
                            <option value="+91">+91</option>
                            <option value="+1">+1</option>
                            <option value="+44">+44</option>
                          </select>
                          <input
                            type="tel"
                            value={editedData?.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            placeholder="Phone number"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-700">
                      {editedData?.countryCode} {editedData?.phone}
                    </div>
                  )}
                </div>

                {/* Address */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin className="w-5 h-5 text-[#D4AF37]" />
                    <h4 className="font-semibold text-gray-900">Address</h4>
                  </div>
                  {editMode ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editedData?.address?.street || ""}
                        onChange={(e) => handleAddressChange("street", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="Street Address"
                      />
                      <div>
                        <label className="text-xs text-gray-500">Country</label>
                        <select
                          value={editedData?.address?.country || ""}
                          onChange={(e) => handleCountryChange(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          disabled={isLoadingCountries}
                        >
                          <option value="">-- Select Country --</option>
                          {countries.map((country) => (
                            <option key={country.name} value={country.name}>
                              {country.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">State/Province</label>
                        <select
                          value={editedData?.address?.state || ""}
                          onChange={(e) => handleStateChange(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          disabled={!editedData?.address?.country || isLoadingStates}
                        >
                          <option value="">-- Select State --</option>
                          {states.map((state) => (
                            <option key={state.name} value={state.name}>
                              {state.name}
                            </option>
                          ))}
                          {editedData?.address?.state && !states.find((s) => s.name === editedData?.address?.state) && (
                            <option key={editedData?.address?.state} value={editedData?.address?.state}>
                              {editedData?.address?.state}
                            </option>
                          )}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">City</label>
                        <select
                          value={editedData?.address?.city || ""}
                          onChange={(e) => handleAddressChange("city", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          disabled={!editedData?.address?.state || isLoadingCities}
                        >
                          <option value="">-- Select City --</option>
                          {cities.map((city) => (
                            <option key={city} value={city}>
                              {city}
                            </option>
                          ))}
                          {editedData?.address?.city && !cities.includes(editedData?.address?.city) && (
                            <option key={editedData?.address?.city} value={editedData?.address?.city}>
                              {editedData?.address?.city}
                            </option>
                          )}
                        </select>
                      </div>
                      <input
                        type="text"
                        value={editedData?.address?.zipCode || ""}
                        onChange={(e) => handleAddressChange("zipCode", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="ZIP Code"
                      />
                    </div>
                  ) : (
                    <div className="text-sm text-gray-700">
                      {editedData?.address?.street}, {editedData?.address?.city}, {editedData?.address?.state},{" "}
                      {editedData?.address?.country} {editedData?.address?.zipCode}
                    </div>
                  )}
                </div>

                {/* Check-in/Check-out Times */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="w-5 h-5 text-[#D4AF37]" />
                    <h4 className="font-semibold text-gray-900">Check-in/Check-out Times</h4>
                  </div>
                  {editMode ? (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-gray-500">Check-in Time</label>
                        <input
                          type="time"
                          value={editedData?.checkInTime}
                          onChange={(e) => handleInputChange("checkInTime", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">Check-out Time</label>
                        <input
                          type="time"
                          value={editedData?.checkOutTime}
                          onChange={(e) => handleInputChange("checkOutTime", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-700">
                      Check-in: {editedData?.checkInTime} | Check-out: {editedData?.checkOutTime}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
                {editMode ? (
                  <>
                    <button
                      onClick={handleCancelEdit}
                      className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-xl hover:bg-gray-300 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveChanges}
                      className="flex-1 bg-green-600 text-white py-3 px-4 rounded-xl hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleBack}
                      className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-xl hover:bg-gray-300 transition-colors font-medium"
                      disabled={paymentProcessing}
                    >
                      Back to Edit
                    </button>
                    <button
                      onClick={handlePay}
                      className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#BFA181] text-white py-3 px-4 rounded-xl hover:from-[#BFA181] hover:to-[#D4AF37] transition-all font-medium"
                      disabled={paymentProcessing}
                    >
                      {paymentProcessing ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Processing Payment...
                        </div>
                      ) : (
                        "Pay & Confirm Booking"
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
