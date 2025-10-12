import { useState, useEffect, useRef, useCallback } from "react"
import { ChevronLeft, ChevronRight, Home, Users, Maximize, MapPin, Star } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { API_BASE_URL } from "../config/api"

// // Amrith Palace Images
import AP1 from "/AmrithPalace/AP1.jpg"
import AP2 from "/AmrithPalace/AP2.jpg"
import AP3 from "/AmrithPalace/AP3.jpg"
import AP4 from "/AmrithPalace/AP4.jpg"
import AP5 from "/AmrithPalace/AP5.jpg"
import AP6 from "/AmrithPalace/AP6.jpg"
import AP7 from "/AmrithPalace/AP7.jpg"
import AP8 from "/AmrithPalace/AP8.jpg"
import AP9 from "/AmrithPalace/AP9.jpg"
import AP10 from "/AmrithPalace/AP10.jpg"
import AP11 from "/AmrithPalace/AP11.jpg"
import AP12 from "/AmrithPalace/AP12.jpg"
import AP13 from "/AmrithPalace/AP13.jpg"
import AP14 from "/AmrithPalace/AP14.jpg"
import AP15 from "/AmrithPalace/AP15.jpg"
import AP16 from "/AmrithPalace/AP16.jpg"
import AP17 from "/AmrithPalace/AP17.jpg"
import AP18 from "/AmrithPalace/AP18.jpg"
import AP19 from "/AmrithPalace/AP19.jpg"
import AP20 from "/AmrithPalace/AP20.jpg"
import AP21 from "/AmrithPalace/AP21.jpg"
import AP22 from "/AmrithPalace/AP22.jpg"
import AP23 from "/AmrithPalace/AP23.jpg"
import AP24 from "/AmrithPalace/AP24.jpg"
import AP25 from "/AmrithPalace/AP25.jpg"
import AP26 from "/AmrithPalace/AP26.jpg"
import AP27 from "/AmrithPalace/AP27.jpg"
import AP28 from "/AmrithPalace/AP28.jpg"
import AP29 from "/AmrithPalace/AP29.jpg"
import AP30 from "/AmrithPalace/AP30.jpg"

// East Coast Villa Images
import EC1 from "/eastcoastvilla/EC1.jpg"
import EC2 from "/eastcoastvilla/EC2.jpg"
import EC3 from "/eastcoastvilla/EC3.jpg"
import EC4 from "/eastcoastvilla/EC4.jpg"
import EC5 from "/eastcoastvilla/EC5.jpg"
import EC6 from "/eastcoastvilla/EC6.jpg"
import EC7 from "/eastcoastvilla/EC7.jpg"
import EC8 from "/eastcoastvilla/EC8.jpg"
import EC9 from "/eastcoastvilla/EC9.jpg"
import EC10 from "/eastcoastvilla/EC10.jpg"
import EC11 from "/eastcoastvilla/EC11.jpg"
import EC12 from "/eastcoastvilla/EC12.jpg"
import EC13 from "/eastcoastvilla/EC13.jpg"
import EC14 from "/eastcoastvilla/EC14.jpg"
import EC15 from "/eastcoastvilla/EC15.jpg"

// Empire Anand Villa Samudra Images
import anandvilla1 from "/empireanandvillasamudra/anandvilla1.jpg"
import anandvilla2 from "/empireanandvillasamudra/anandvilla2.jpg"
import anandvilla3 from "/empireanandvillasamudra/anandvilla3.jpg"
import anandvilla4 from "/empireanandvillasamudra/anandvilla4.jpg"
import anandvilla5 from "/empireanandvillasamudra/anandvilla5.jpg"
import anandvilla6 from "/empireanandvillasamudra/anandvilla6.jpg"
import anandvilla7 from "/empireanandvillasamudra/anandvilla7.jpg"
import anandvilla8 from "/empireanandvillasamudra/anandvilla8.jpg"
import anandvilla9 from "/empireanandvillasamudra/anandvilla9.jpg"
import anandvilla10 from "/empireanandvillasamudra/anandvilla10.jpg"
import anandvilla11 from "/empireanandvillasamudra/anandvilla11.jpg"
import anandvilla12 from "/empireanandvillasamudra/anandvilla12.jpg"
import anandvilla13 from "/empireanandvillasamudra/anandvilla13.jpg"
import anandvilla14 from "/empireanandvillasamudra/anandvilla14.jpg"
import anandvilla15 from "/empireanandvillasamudra/anandvilla15.jpg"
import anandvilla16 from "/empireanandvillasamudra/anandvilla16.jpg"

// Ram Water Villa Images
import RW1 from "/ramwatervilla/RW1.jpg"
import RW2 from "/ramwatervilla/RW2.jpg"
import RW3 from "/ramwatervilla/RW3.jpg"
import RW4 from "/ramwatervilla/RW4.jpg"
import RW5 from "/ramwatervilla/RW5.jpg"
import RW6 from "/ramwatervilla/RW6.jpg"
import RW7 from "/ramwatervilla/RW7.jpg"
import RW8 from "/ramwatervilla/RW8.jpg"
import RW9 from "/ramwatervilla/RW9.jpg"
import RW10 from "/ramwatervilla/RW10.jpg"
import RW11 from "/ramwatervilla/RW11.jpg"
import RW13 from "/ramwatervilla/RW13.jpg"
import RW14 from "/ramwatervilla/RW14.jpg"
import RW15 from "/ramwatervilla/RW15.jpg"
import RW16 from "/ramwatervilla/RW16.jpg"
import RW17 from "/ramwatervilla/RW17.jpg"
import RW18 from "/ramwatervilla/RW18.jpg"
import RW19 from "/ramwatervilla/RW19.jpg"

// LavishVilla 1 Images
import lvone1 from "/LavishVilla 1/lvone1.jpg"
import lvone2 from "/LavishVilla 1/lvone2.jpg"
import lvone3 from "/LavishVilla 1/lvone3.jpg"
import lvone4 from "/LavishVilla 1/lvone4.jpg"
import lvone5 from "/LavishVilla 1/lvone5.jpg"
import lvone6 from "/LavishVilla 1/lvone6.jpg"
import lvone7 from "/LavishVilla 1/lvone7.jpg"
import lvone8 from "/LavishVilla 1/lvone8.jpg"
import lvone9 from "/LavishVilla 1/lvone9.jpg"
import lvone10 from "/LavishVilla 1/lvone10.jpg"
import lvone11 from "/LavishVilla 1/lvone11.jpg"
import lvone12 from "/LavishVilla 1/lvone12.jpg"
import lvone13 from "/LavishVilla 1/lvone13.jpg"
import lvone14 from "/LavishVilla 1/lvone14.jpg"
import lvone15 from "/LavishVilla 1/lvone15.jpg"
import lvone16 from "/LavishVilla 1/lvone16.jpg"
import lvone17 from "/LavishVilla 1/lvone17.jpg"
import lvone18 from "/LavishVilla 1/lvone18.jpg"
import lvone19 from "/LavishVilla 1/lvone19.jpg"
import lvone20 from "/LavishVilla 1/lvone20.jpg"
import lvone21 from "/LavishVilla 1/lvone21.jpg"
import lvone22 from "/LavishVilla 1/lvone22.jpg"

// LavishVilla 2 Images
import lvtwo1 from "/LavishVilla 2/lvtwo1.jpg"
import lvtwo2 from "/LavishVilla 2/lvtwo2.jpg"
import lvtwo3 from "/LavishVilla 2/lvtwo3.jpg"
import lvtwo4 from "/LavishVilla 2/lvtwo4.jpg"
import lvtwo5 from "/LavishVilla 2/lvtwo5.jpg"
import lvtwo6 from "/LavishVilla 2/lvtwo6.jpg"
import lvtwo7 from "/LavishVilla 2/lvtwo7.jpg"
import lvtwo8 from "/LavishVilla 2/lvtwo8.jpg"
import lvtwo9 from "/LavishVilla 2/lvtwo9.jpg"
import lvtwo10 from "/LavishVilla 2/lvtwo10.jpg"
import lvtwo11 from "/LavishVilla 2/lvtwo11.jpg"
import lvtwo12 from "/LavishVilla 2/lvtwo12.jpg"
import lvtwo13 from "/LavishVilla 2/lvtwo13.jpg"
import lvtwo14 from "/LavishVilla 2/lvtwo14.jpg"
import lvtwo15 from "/LavishVilla 2/lvtwo15.jpg"
import lvtwo16 from "/LavishVilla 2/lvtwo16.jpg"
import lvtwo17 from "/LavishVilla 2/lvtwo17.jpg"
import lvtwo18 from "/LavishVilla 2/lvtwo18.jpg"
import lvtwo19 from "/LavishVilla 2/lvtwo19.jpg"
import lvtwo20 from "/LavishVilla 2/lvtwo20.jpg"
import lvtwo21 from "/LavishVilla 2/lvtwo21.jpg"
import lvtwo22 from "/LavishVilla 2/lvtwo22.jpg"

// LavishVilla 3 Images
import lvthree1 from "/LavishVilla 3/lvthree1.jpg"
import lvthree2 from "/LavishVilla 3/lvthree2.jpg"
import lvthree3 from "/LavishVilla 3/lvthree3.jpg"
import lvthree4 from "/LavishVilla 3/lvthree4.jpg"
import lvthree5 from "/LavishVilla 3/lvthree5.jpg"
import lvthree6 from "/LavishVilla 3/lvthree6.jpg"
import lvthree7 from "/LavishVilla 3/lvthree7.jpg"
import lvthree8 from "/LavishVilla 3/lvthree8.jpg"
import lvthree9 from "/LavishVilla 3/lvthree9.jpg"
import lvthree10 from "/LavishVilla 3/lvthree10.jpg"
import lvthree12 from "/LavishVilla 3/lvthree12.jpg"
import lvthree13 from "/LavishVilla 3/lvthree13.jpg"
import lvthree14 from "/LavishVilla 3/lvthree14.jpg"
import lvthree15 from "/LavishVilla 3/lvthree15.jpg"
import lvthree16 from "/LavishVilla 3/lvthree16.jpg"
import lvthree17 from "/LavishVilla 3/lvthree17.jpg"
import lvthree18 from "/LavishVilla 3/lvthree18.jpg"

// Villa Image Collections - Updated to match FeaturedDestination format
const villaImageCollections = {
  "Amrith Palace": [
    AP8,
    AP2,
    AP3,
    AP4,
    AP5,
    AP6,
    AP7,
    AP1,
    AP9,
    AP10,
    AP11,
    AP12,
    AP13,
    AP14,
    AP15,
    AP16,
    AP17,
    AP18,
    AP19,
    AP20,
    AP21,
    AP22,
    AP23,
    AP24,
    AP25,
    AP26,
    AP27,
    AP28,
    AP29,
    AP30,
  ],
  "East Coast Villa": [EC1, EC2, EC3, EC4, EC5, EC6, EC7, EC8, EC9, EC10, EC11, EC12, EC13, EC14, EC15],
  "Ram Water Villa": [
    RW19,
    RW2,
    RW3,
    RW4,
    RW5,
    RW6,
    RW7,
    RW8,
    RW9,
    RW10,
    RW11,
    RW13,
    RW14,
    RW15,
    RW16,
    RW17,
    RW18,
    RW1,
  ],
  "Empire Anand Villa Samudra": [
    anandvilla1,
    anandvilla2,
    anandvilla3,
    anandvilla4,
    anandvilla5,
    anandvilla6,
    anandvilla7,
    anandvilla8,
    anandvilla9,
    anandvilla10,
    anandvilla11,
    anandvilla12,
    anandvilla13,
    anandvilla14,
    anandvilla15,
    anandvilla16,
  ],
  "Lavish Villa I": [
    lvone18,
    lvone2,
    lvone3,
    lvone4,
    lvone5,
    lvone6,
    lvone7,
    lvone8,
    lvone9,
    lvone10,
    lvone11,
    lvone12,
    lvone13,
    lvone14,
    lvone15,
    lvone16,
    lvone17,
    lvone1,
    lvone19,
    lvone20,
    lvone21,
    lvone22,
  ],
  "Lavish Villa II": [
    lvtwo4,
    lvtwo2,
    lvtwo3,
    lvtwo1,
    lvtwo5,
    lvtwo6,
    lvtwo7,
    lvtwo8,
    lvtwo9,
    lvtwo10,
    lvtwo11,
    lvtwo12,
    lvtwo13,
    lvtwo14,
    lvtwo15,
    lvtwo16,
    lvtwo17,
    lvtwo18,
    lvtwo19,
    lvtwo20,
    lvtwo21,
    lvtwo22,
  ],
  "Lavish Villa III": [
    lvthree17,
    lvthree2,
    lvthree3,
    lvthree4,
    lvthree5,
    lvthree6,
    lvthree7,
    lvthree8,
    lvthree9,
    lvthree10,
    lvthree12,
    lvthree13,
    lvthree14,
    lvthree15,
    lvthree16,
    lvthree1,
    lvthree18,
  ],
}

// Fallback images if none are found
const unsplashImages = [
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
]

// Helper function to get a random unsplash image
function getRandomUnsplash() {
  return unsplashImages[Math.floor(Math.random() * unsplashImages.length)]
}

// Format price as "45k" similar to unified calendar (without ₹ symbol)
const formatCompactPrice = (price) => {
  if (!price || isNaN(Number(price))) return "0";
  const formattedPrice = Math.round(Number(price) / 1000);
  return `${formattedPrice}k`;
}

// Fallback prices for villas when API data is not available
const villaFallbackPrices = {
  "Amrith Palace": { weekday: 45000, weekend: 65000 },
  "Ram Water Villa": { weekday: 30000, weekend: 45000 },
  "East Coast Villa": { weekday: 15000, weekend: 25000 },
  "Lavish Villa I": { weekday: 18000, weekend: 25000 },
  "Lavish Villa II": { weekday: 18000, weekend: 25000 },
  "Lavish Villa III": { weekday: 16000, weekend: 23000 },
  "Empire Anand Villa Samudra": { weekday: 40000, weekend: 60000 }
}

// Get the accurate price for a villa based on its name
const getAccurateVillaPrice = (villa) => {
  if (!villa) return { weekday: 0, weekend: 0 };
  
  let weekdayPrice = villa.price || 0;
  if (typeof weekdayPrice === 'string') {
    weekdayPrice = parseInt(weekdayPrice.replace(/,/g, ""));
  }
  
  let weekendPrice = villa.weekendPrice || villa.weekendprice || 0;
  if (typeof weekendPrice === 'string') {
    weekendPrice = parseInt(weekendPrice.replace(/,/g, ""));
  }
  
  // If we don't have a weekend price, try to find a fallback
  if (weekendPrice === 0 || isNaN(weekendPrice)) {
    // Check for villa name match in fallbacks
    if (villa.name || villa.roomType) {
      const villaName = villa.name || villa.roomType;
      
      // Direct match
      if (villaFallbackPrices[villaName]) {
        weekdayPrice = villaFallbackPrices[villaName].weekday;
        weekendPrice = villaFallbackPrices[villaName].weekend;
        return { weekday: weekdayPrice, weekend: weekendPrice };
      }
      
      // Partial match
      for (const [name, pricing] of Object.entries(villaFallbackPrices)) {
        if (villaName.toLowerCase().includes(name.toLowerCase()) || 
            name.toLowerCase().includes(villaName.toLowerCase())) {
          weekdayPrice = pricing.weekday;
          weekendPrice = pricing.weekend;
          return { weekday: weekdayPrice, weekend: weekendPrice };
        }
      }
    }
    
    // If we have a weekday price but no weekend price
    if (weekdayPrice > 0) {
      weekendPrice = Math.round(weekdayPrice * 1.5);
    } else {
      // Default fallback
      weekdayPrice = 30000;
      weekendPrice = 45000;
    }
  }
  
  return { weekday: weekdayPrice, weekend: weekendPrice };
}

const VillaSwiper = () => {
  const navigate = useNavigate()

  // State management - Updated to match FeaturedDestination
  const [villas, setVillas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const touchStartTime = useRef(0)
  const touchEndTime = useRef(0)
  const swipeVelocity = useRef(0)
  const isDragging = useRef(false)
  const dragOffset = useRef(0)
  const swiperRef = useRef(null)

  // Helper function to find the best matching villa name in our collections - Same as FeaturedDestination
  const getBestMatchingVillaImages = (villaName) => {
    // Direct match
    if (villaImageCollections[villaName]) {
      return villaImageCollections[villaName]
    }

    // Case insensitive match
    const lowercaseVillaName = villaName.toLowerCase().trim()
    for (const [key, imageArray] of Object.entries(villaImageCollections)) {
      if (key.toLowerCase().trim() === lowercaseVillaName) {
        return imageArray
      }
    }

    // Partial match (for villas with slightly different names)
    for (const [key, imageArray] of Object.entries(villaImageCollections)) {
      if (lowercaseVillaName.includes(key.toLowerCase()) || key.toLowerCase().includes(lowercaseVillaName)) {
        return imageArray
      }
    }

    // Check for specific keywords in names
    const nameKeywords = {
      amrith: "Amrith Palace",
      palace: "Amrith Palace",
      "east coast": "East Coast Villa",
      eastcoast: "East Coast Villa",
      "ram water": "Ram Water Villa",
      ramwater: "Ram Water Villa",
      empire: "Empire Anand Villa Samudra",
      anand: "Empire Anand Villa Samudra",
      samudra: "Empire Anand Villa Samudra",
      "lavish villa 1": "Lavish Villa I",
      "lavish villa i": "Lavish Villa I",
      "lavish villa 2": "Lavish Villa II",
      "lavish villa ii": "Lavish Villa II",
      "lavish villa 3": "Lavish Villa III",
      "lavish villa iii": "Lavish Villa III",
    }

    for (const [keyword, villaKey] of Object.entries(nameKeywords)) {
      if (lowercaseVillaName.includes(keyword)) {
        return villaImageCollections[villaKey]
      }
    }

    // Return null if no match found
    return null
  }

  // Function to create fallback properties if API fails - Same as FeaturedDestination
  const createFallbackProperties = () => {
    try {
      console.log("Creating fallback properties")
      // Create fallback properties using our predefined image collections
      const fallbackProperties = Object.entries(villaImageCollections).map(([name, images], index) => {
        // Get prices from our fallback price mapping
        const pricing = villaFallbackPrices[name];
        
        return {
          id: `fallback-villa-${index}`,
          _id: `fallback-${index}`,
          roomType: name,
          hotel: {
            name: name,
            address: index % 2 === 0 ? "ECR Road, Chennai" : "East Coast Road, Pondicherry",
            city: index % 2 === 0 ? "Chennai" : "Pondicherry",
          },
          images: images.slice(0, 5), // First 5 images for carousel
          allImages: images, // All images for detail view
          pricePerNight: pricing.weekday.toLocaleString(),
          pricing: {
            weekday: pricing.weekday.toLocaleString(),
            weekend: pricing.weekend.toLocaleString(),
            holiday: Math.round(pricing.weekend * 1.2).toLocaleString(),
          },
          description: "A beautiful luxury villa with stunning views and modern amenities.",
          amenities: ["Private Pool", "WiFi", "Air Conditioning", "Kitchen", "Parking"],
          capacity: Math.floor(Math.random() * 8) + 4,
          rating: (Math.random() * 1 + 4).toFixed(1),
          rooms: Math.floor(Math.random() * 4) + 2,
          area: `${Math.floor(Math.random() * 2000) + 3000} sq ft`,
          features: {
            bedrooms: Math.floor(Math.random() * 4) + 2,
            bathrooms: Math.floor(Math.random() * 3) + 2,
            balcony: index % 2 === 0 ? "Sea View" : "Garden View",
            speciality: index % 2 === 0 ? "Beach Access" : "Private Pool",
          },
        }
      })
      setVillas(fallbackProperties)
    } catch (fallbackError) {
      console.error("Even fallback creation failed:", fallbackError)
    }
  }

  // Fetch properties from backend - Same as FeaturedDestination
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true)
      setError(null)
      try {
        console.log("Fetching villas from:", `${API_BASE_URL}/api/villas/`)
        const res = await fetch(`${API_BASE_URL}/api/villas/`)
        if (!res.ok) throw new Error("Failed to load properties")
        const data = await res.json()
        console.log("API Response data:", data)

        // Map backend data to carousel property format
        const processedProperties = data.map((villa, idx) => {
          // Try to match villa name with our image collections
          const villaName = villa.name || ""
          let images = []
          let featuredImage = null

          // Get the full image collection for this villa
          const imageCollection = getBestMatchingVillaImages(villaName)
          if (imageCollection) {
            // Use our predefined image collections
            images = imageCollection
            featuredImage = imageCollection[0] // Use first image as featured
          } else if (Array.isArray(villa.images) && villa.images.length > 0) {
            // Use images from API if available
            images = villa.images
            featuredImage = villa.images[0]
          } else {
            // Fallback to random image
            featuredImage = getRandomUnsplash()
            images = [featuredImage]
          }
          
          // Get accurate pricing using our helper function
          const accuratePricing = getAccurateVillaPrice(villa);

          return {
            id: villa._id || `villa-${idx}`,
            _id: villa._id || `villa-${idx}`,
            roomType: villa.name,
            hotel: {
              name: villa.name,
              address: villa.location || "Luxury Location",
              city: villa.location?.split(",")[0]?.trim() || "Chennai",
            },
            images: images.slice(0, 5), // First 5 images for carousel
            allImages: images, // All images for detail view
            pricePerNight: accuratePricing.weekday.toLocaleString(),
            pricing: {
              weekday: accuratePricing.weekday.toLocaleString(),
              weekend: accuratePricing.weekend.toLocaleString(),
              holiday: Math.round(accuratePricing.weekend * 1.2).toLocaleString(),
            },
            description: villa.description || "A beautiful luxury villa with stunning views and modern amenities.",
            amenities: villa.facilities?.map((f) => f.name) || ["WiFi", "AC", "Kitchen", "Free Parking"],
            capacity: villa.guests || 8,
            rating: villa.rating || (4.5 + Math.random() * 0.5).toFixed(1),
            rooms: villa.bedrooms || 3,
            area: `${Math.floor(Math.random() * 2000) + 3000} sq ft`,
            features: {
              bedrooms: villa.bedrooms || 3,
              bathrooms: villa.bathrooms || villa.bedrooms || 3,
              balcony: "Sea View",
              speciality: "Private Pool",
            },
          }
        })
        setVillas(processedProperties)
      } catch (err) {
        console.error("Error fetching villas:", err)
        setError("Failed to load properties")
        // Create fallback properties using our image collections
        createFallbackProperties()
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  // Navigate to villa detail page - Updated to match FeaturedDestination functionality
  const handleViewDetails = (villa) => {
    const villaId = villa._id || villa.id

    // Prepare data for villa details page - matching the structure from FeaturedDestination
    const villaData = {
      id: villaId,
      _id: villaId,
      name: villa.roomType,
      location: `${villa.hotel.address}, ${villa.hotel.city}`,
      price: Number.parseInt(villa.pricePerNight.replace(/,/g, "")),
      description: villa.description,
      images: villa.allImages || villa.images, // Pass ALL images to the detail view
      guests: villa.capacity,
      bedrooms: villa.features.bedrooms,
      bathrooms: villa.features.bathrooms,
      rating: villa.rating,
      amenities: villa.amenities,
      type: "VILLA",
    }

    console.log("Navigating to villa details with data:", villaData)

    // Navigate to villa details page
    navigate(`/villa/${villaId}`, { state: { villa: villaData } })
  }

  // Handle click on slide - navigate if active, otherwise bring slide to center
  const handleSlideClick = (index, villa) => {
    if (index === currentIndex) {
      handleViewDetails(villa)
    } else {
      goToSlide(index)
    }
  }

  const nextSlide = useCallback(() => {
    if (isAnimating || villas.length === 0) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % villas.length)
    setTimeout(() => setIsAnimating(false), 550)
  }, [isAnimating, villas.length])

  const prevSlide = useCallback(() => {
    if (isAnimating || villas.length === 0) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + villas.length) % villas.length)
    setTimeout(() => setIsAnimating(false), 550)
  }, [isAnimating, villas.length])

  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex || villas.length === 0) return
    setIsAnimating(true)
    setCurrentIndex(index)
    setTimeout(() => setIsAnimating(false), 600)
  }

  // Enhanced price formatting function
  const formatPrice = (price) => {
    if (!price) return "0"
    const numPrice = Number(price.toString().replace(/,/g, ""))
    
    // For display in the slider, use compact format like unified calendar
    return formatCompactPrice(numPrice)
  }

  // Handle resize events to detect mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    // Set initial value
    handleResize()
    // Add event listener
    window.addEventListener("resize", handleResize)
    // Clean up
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating && villas.length > 0) {
        nextSlide()
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [isAnimating, nextSlide, villas.length])

  // Enhanced keyboard navigation with visual feedback
  useEffect(() => {
    // Track active keys to prevent key repeat issues
    const activeKeys = new Set()
    const handleKeyDown = (e) => {
      // Only respond to keyboard if not already animating and key not already pressed
      if (isAnimating || activeKeys.has(e.key)) return
      // Only respond to keyboard if swiper is in viewport
      if (swiperRef.current) {
        const rect = swiperRef.current.getBoundingClientRect()
        const isInView =
          rect.top <= window.innerHeight * 0.75 && // Element is at least 25% in view
          rect.bottom >= window.innerHeight * 0.25 // Element is at least 25% in view
        if (isInView) {
          // Mark key as active
          activeKeys.add(e.key)
          // Provide visual feedback for keypresses
          let shouldAnimate = false
          let direction = ""
          if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
            // Provide visual feedback for left movement (which will go to previous slide)
            if (swiperRef.current) {
              swiperRef.current.style.transform = "translateX(20px)"
              swiperRef.current.style.transition = "transform 0.15s cubic-bezier(0.2, 0, 0.2, 1)"
              setTimeout(() => {
                if (swiperRef.current) {
                  swiperRef.current.style.transform = ""
                }
              }, 150)
            }
            shouldAnimate = true
            direction = "prev" // Left key moves to previous slide
          } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
            // Provide visual feedback for right movement (which will go to next slide)
            if (swiperRef.current) {
              swiperRef.current.style.transform = "translateX(-20px)"
              swiperRef.current.style.transition = "transform 0.15s cubic-bezier(0.2, 0, 0.2, 1)"
              setTimeout(() => {
                if (swiperRef.current) {
                  swiperRef.current.style.transform = ""
                }
              }, 150)
            }
            shouldAnimate = true
            direction = "next" // Right key moves to next slide
          }
          // Execute the slide animation after feedback
          if (shouldAnimate) {
            setTimeout(() => {
              if (direction === "next") {
                nextSlide()
              } else if (direction === "prev") {
                prevSlide()
              }
            }, 100)
          }
        }
      }
    }
    const handleKeyUp = (e) => {
      // Remove key from active keys when released
      activeKeys.delete(e.key)
    }
    // Add both keydown and keyup listeners
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [isAnimating, nextSlide, prevSlide])

  // Optimized touch event handlers for ultra-smooth mobile swipe
  const touchVelocity = useRef(0)
  const lastTouchX = useRef(0)
  const lastTouchTime = useRef(0)
  const animationFrameId = useRef(null)
  const isSwiping = useRef(false)
  const rafScheduled = useRef(false)

  const handleTouchStart = useCallback(
    (e) => {
      // Don't handle new touch if animation is in progress
      if (isAnimating) return
      // Record initial touch position and time
      touchStartX.current = e.touches[0].clientX
      lastTouchX.current = e.touches[0].clientX
      lastTouchTime.current = Date.now()
      touchEndX.current = e.touches[0].clientX
      // Reset values
      touchVelocity.current = 0
      isDragging.current = true
      isSwiping.current = true
      dragOffset.current = 0
      // Cancel any ongoing animations to prevent conflicts
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
      // Capture the touch to improve touch response
      if (swiperRef.current) {
        swiperRef.current.style.willChange = "transform"
      }
    },
    [isAnimating],
  )

  // Handle requestAnimationFrame for ultra-smooth animation
  const updateSwipeAnimation = useCallback(() => {
    if (swiperRef.current && isDragging.current) {
      // Enhanced resistance curve for even more natural feeling feedback
      // More responsive initially with smoother falloff
      const resistance = Math.min(0.9, 0.95 / (1 + Math.abs(dragOffset.current) / 350))
      // Add subtle rotation for enhanced physical feel (very slight)
      const rotateValue = dragOffset.current * 0.01
      const transformValue = `translateX(${dragOffset.current * resistance}px) rotateY(${rotateValue}deg)`
      // Apply transform with GPU acceleration hints
      swiperRef.current.style.transform = transformValue
      swiperRef.current.style.backfaceVisibility = "hidden"
    }
    rafScheduled.current = false
  }, [])

  const handleTouchMove = useCallback(
    (e) => {
      // Exit early if not in active swipe state
      if (!isDragging.current || !isSwiping.current) return
      // Calculate current velocity with high precision
      const currentX = e.touches[0].clientX
      const currentTime = Date.now()
      const dt = currentTime - lastTouchTime.current
      // Only calculate velocity if time has passed to avoid division by zero
      if (dt > 0) {
        // Exponential moving average for smoother velocity tracking
        const newVelocity = (currentX - lastTouchX.current) / dt
        touchVelocity.current = touchVelocity.current * 0.7 + newVelocity * 0.3
      }
      // Update tracking values
      lastTouchX.current = currentX
      lastTouchTime.current = currentTime
      touchEndX.current = currentX
      // Calculate drag offset for real-time feedback
      dragOffset.current = touchEndX.current - touchStartX.current
      // Use requestAnimationFrame for smoother rendering
      // This prevents jank by synchronizing with the browser's render cycle
      if (!rafScheduled.current) {
        rafScheduled.current = true
        animationFrameId.current = requestAnimationFrame(updateSwipeAnimation)
      }
      // Always prevent default to ensure the swiper takes full control
      e.preventDefault()
    },
    [updateSwipeAnimation],
  )

  const handleTouchEnd = useCallback(() => {
    // Exit early if not in active swipe state
    if (!isDragging.current || !isSwiping.current) return
    // Reset state
    isDragging.current = false
    isSwiping.current = false
    // Cancel any pending animation frames
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current)
      animationFrameId.current = null
    }
    // Smoothly reset the transform with super smooth optimized animation
    if (swiperRef.current) {
      swiperRef.current.style.transform = ""
      swiperRef.current.style.transition = "transform 0.4s cubic-bezier(0.1, 0.0, 0.1, 1)"
      // Reset will-change after animation completes to free up resources
      setTimeout(() => {
        if (swiperRef.current) {
          swiperRef.current.style.willChange = "auto"
        }
      }, 400)
    }
    // Calculate swipe metrics with enhanced sensitivity
    const diff = touchStartX.current - touchEndX.current
    const minSwipeDistance = 25 // Even lower threshold for super-responsive touch
    const velocity = touchVelocity.current // pixels per millisecond
    const significantVelocity = Math.abs(velocity) > 0.3 // Extra sensitive flick detection for buttery smooth experience
    // Determine if swipe should trigger navigation
    if (Math.abs(diff) > minSwipeDistance || significantVelocity) {
      setIsAnimating(true)
      // Fixed swipe direction logic:
      // Swipe LEFT (negative diff/velocity) should go to NEXT slide (swiping content to the left)
      // Swipe RIGHT (positive diff/velocity) should go to PREVIOUS slide (swiping content to the right)
      const direction = diff > 0 ? "next" : "prev"
      // Execute the slide change with immediate response but smooth transition
      requestAnimationFrame(() => {
        if (direction === "next") {
          nextSlide()
        } else {
          prevSlide()
        }
        // Reset animation state after the transition completes with perfect timing
        setTimeout(() => setIsAnimating(false), 400)
      })
    }
  }, [nextSlide, prevSlide])

  // Additional mouse event handlers for desktop drag support
  const handleMouseDown = useCallback(
    (e) => {
      // Only handle left mouse button (button 0)
      if (isAnimating || e.button !== 0) return
      // Prevent default to avoid text selection
      e.preventDefault()
      // Record initial mouse position
      touchStartX.current = e.clientX
      lastTouchX.current = e.clientX
      lastTouchTime.current = Date.now()
      touchEndX.current = e.clientX
      // Reset values
      touchVelocity.current = 0
      isDragging.current = true
      isSwiping.current = true
      dragOffset.current = 0
      // Set will-change for performance optimization
      if (swiperRef.current) {
        swiperRef.current.style.willChange = "transform"
        swiperRef.current.style.cursor = "grabbing"
      }
      // Add document-level event listeners for mouse move and up
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    },
    [isAnimating],
  )

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging.current || !isSwiping.current) return
      // Calculate current velocity
      const currentX = e.clientX
      const currentTime = Date.now()
      const dt = currentTime - lastTouchTime.current
      if (dt > 0) {
        // Exponential moving average for smoother velocity tracking
        const newVelocity = (currentX - lastTouchX.current) / dt
        touchVelocity.current = touchVelocity.current * 0.7 + newVelocity * 0.3
      }
      // Update tracking values
      lastTouchX.current = currentX
      lastTouchTime.current = currentTime
      touchEndX.current = currentX
      // Calculate drag offset
      dragOffset.current = touchEndX.current - touchStartX.current
      // Use requestAnimationFrame for smoother rendering
      if (!rafScheduled.current) {
        rafScheduled.current = true
        animationFrameId.current = requestAnimationFrame(updateSwipeAnimation)
      }
      // Prevent default to avoid text selection
      e.preventDefault()
    },
    [updateSwipeAnimation],
  )

  const handleMouseUp = useCallback(
    (e) => {
      // Clean up document-level event listeners
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      if (!isDragging.current || !isSwiping.current) return
      // Reset state
      isDragging.current = false
      isSwiping.current = false
      // Reset cursor
      if (swiperRef.current) {
        swiperRef.current.style.cursor = "grab"
      }
      // Cancel any pending animation frames
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
        animationFrameId.current = null
      }
      // Reset transform
      if (swiperRef.current) {
        swiperRef.current.style.transform = ""
        swiperRef.current.style.transition = "transform 0.3s cubic-bezier(0.2, 0.0, 0.2, 1)"
        setTimeout(() => {
          if (swiperRef.current) {
            swiperRef.current.style.willChange = "auto"
          }
        }, 300)
      }
      // Calculate swipe metrics
      const diff = touchStartX.current - touchEndX.current
      const minSwipeDistance = 50 // Higher threshold for mouse to avoid accidental swipes
      const velocity = touchVelocity.current
      const significantVelocity = Math.abs(velocity) > 0.5
      // Determine if swipe should trigger navigation
      if (Math.abs(diff) > minSwipeDistance || significantVelocity) {
        setIsAnimating(true)
        // Make consistent with touch behavior:
        // Drag LEFT (positive diff) should go to NEXT slide
        // Drag RIGHT (negative diff) should go to PREVIOUS slide
        const direction = diff > 0 ? "next" : "prev"
        requestAnimationFrame(() => {
          if (direction === "next") {
            nextSlide()
          } else {
            prevSlide()
          }
          setTimeout(() => setIsAnimating(false), 350)
        })
      }
    },
    [nextSlide, prevSlide, updateSwipeAnimation],
  )

  const getSlidePosition = (index) => {
    const diff = index - currentIndex
    const totalSlides = villas.length
    let position = diff
    if (diff > totalSlides / 2) {
      position = diff - totalSlides
    } else if (diff < -totalSlides / 2) {
      position = diff + totalSlides
    }
    return position
  }

  const getSlideStyle = (index) => {
    const position = getSlidePosition(index)
    const isCenter = position === 0
    const isAdjacent = Math.abs(position) === 1
    const isVisible = Math.abs(position) <= 2
    // Handle non-visible slides - keep them in DOM but invisible for smooth transitions
    if (!isVisible) {
      return {
        transform: `translateX(${position * 100}%) scale(0.6)`,
        opacity: 0,
        zIndex: 0,
        pointerEvents: "none",
        visibility: "hidden", // Hide completely when far away
      }
    }
    // Mobile-specific positioning - optimized for full visibility and compact layout
    if (isMobile) {
      // Center slide - optimized to show price and image together
      if (isCenter) {
        return {
          transform: "translateX(0) translateY(-20px) scale(0.9)", // Slightly smaller scale and moved up
          opacity: 1,
          zIndex: 10,
          transition: isAnimating
            ? "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
            : "all 0.35s cubic-bezier(0.2, 0.0, 0.2, 1)",
          boxShadow: "0 8px 20px -6px rgba(0, 0, 0, 0.15)",
          willChange: "transform, opacity",
        }
      }
      // Adjacent slides - ensure they're fully visible
      if (isAdjacent) {
        // Use percentage-based positioning to ensure consistent display across devices
        const translateX = position < 0 ? "-85%" : "85%"
        return {
          transform: `translateX(${translateX}) translateY(-15px) scale(0.55)`, // Larger scale for better visibility
          opacity: 0.65, // Higher opacity for better visibility
          zIndex: 5,
          transition: isAnimating
            ? "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
            : "all 0.35s cubic-bezier(0.2, 0.0, 0.2, 1)",
          filter: "brightness(0.95)", // Less dimming for better visibility
          willChange: "transform, opacity",
          border: "1px solid rgba(0,0,0,0.04)",
          borderRadius: "12px",
        }
      }
      // Other slides are positioned but still visible enough
      return {
        transform: `translateX(${position < 0 ? "-140%" : "140%"}) scale(0.35)`, // Percentage-based for consistent display
        opacity: 0.2, // More visible than before
        zIndex: 1,
        pointerEvents: "none",
        transition: isAnimating ? "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "all 0.3s ease",
      }
    }
    // Desktop positioning with enhanced spacing and visibility for non-centered slides
    // Dynamically adjust spacing based on viewport width for optimal experience
    let spacing
    if (window.innerWidth >= 1440) {
      spacing = 630 // XL screens - wider spacing to fully show non-centered slides
    } else if (window.innerWidth >= 1280) {
      spacing = 580 // Large screens
    } else if (window.innerWidth >= 1024) {
      spacing = 530 // Medium-large screens
    } else {
      spacing = 480 // Medium screens
    }
    const translateX = position * spacing
    // Enhanced visual hierarchy with better visibility for adjacent slides
    // Increase scale of adjacent slides to make them fully visible without clipping
    const scale = isCenter ? 1 : isAdjacent ? 0.94 : 0.78
    // Higher opacity for adjacent slides to ensure they're clearly visible
    const opacity = isCenter ? 1 : isAdjacent ? 0.95 : 0.7
    const zIndex = isCenter ? 10 : isAdjacent ? 5 : 1
    // Subtle brightness adjustments instead of blur for clearer viewing
    const filter = isCenter ? "none" : isAdjacent ? "brightness(0.98)" : "brightness(0.92)"
    // Position and style slides for optimal visibility on desktop
    // Combine transform properties - add rotation for adjacent slides
    const transformValue = isAdjacent
      ? `translateX(${translateX}px) scale(${scale}) rotate(${position * 0.5}deg)`
      : `translateX(${translateX}px) scale(${scale})`;
    
    return {
      transform: transformValue,
      opacity,
      zIndex,
      transition: isAnimating
        ? "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
        : "all 0.35s cubic-bezier(0.2, 0.0, 0.2, 1)",
      boxShadow: isCenter
        ? "0 12px 30px -5px rgba(0, 0, 0, 0.15)"
        : isAdjacent
          ? "0 6px 15px -5px rgba(0, 0, 0, 0.1)"
          : "0 3px 10px -5px rgba(0, 0, 0, 0.05)",
      willChange: "transform, opacity",
      filter,
      margin: "0 0 20px 0", // Add bottom margin to prevent shadow cutoff
      // Ensure all slides are visible with proper opacity adjustments
      visibility: "visible",
      // Apply subtle borders to distinguish slides
      border: !isCenter ? "1px solid rgba(0,0,0,0.05)" : "none",
      borderRadius: !isCenter ? "12px" : "0",
    }
  }

  return (
    <div className="min-h-screen py-12 px-0 sm:px-4 w-full bg-white">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#BFA181] mb-4">
            PICK YOUR DREAM VILLA TODAY
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Discover luxury villas with stunning views and premium amenities for your perfect getaway
          </p>
          
          {/* Tourism Awards Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center mt-3 gap-2 sm:gap-6 text-sm font-medium">
            <div className="flex items-center bg-gradient-to-r from-amber-50 to-amber-100 px-3 py-1 rounded-full">
              <span className="text-amber-800">
                <span className="mr-1.5 text-xs">⭐</span>Tourism Board of India, 2024
              </span>
            </div>
            <div className="flex items-center bg-gradient-to-r from-amber-50 to-amber-100 px-3 py-1 rounded-full">
              <span className="text-amber-800">
                <span className="mr-1.5 text-xs">🏆</span>Travel & Leisure Awards, 2023
              </span>
            </div>
          </div>
          {/* Mobile-only swipe indicator */}
          <div className="flex md:hidden items-center justify-center mt-4 text-gray-500 text-sm">
            <span className="flex items-center">
              <ChevronLeft className="h-4 w-4 mr-1" /> Swipe to browse <ChevronRight className="h-4 w-4 ml-1" />
            </span>
          </div>
        </div>

        {/* Loading and error states */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
          </div>
        )}

        {error && (
          <div className="bg-amber-50 text-amber-800 p-4 rounded-lg mb-6 text-center border border-amber-200">
            {error}
          </div>
        )}

        {/* Villa Swiper - Enhanced container with optimized sizing for both mobile and desktop */}
        {!loading && !error && villas.length > 0 && (
          <div className="relative h-[520px] sm:h-[650px] md:h-[750px] mb-3 sm:mb-12 overflow-hidden villa-swiper-container w-full select-none">
            <div
              ref={swiperRef}
              className="relative w-full h-full flex items-center justify-center will-change-transform cursor-grab transition-all duration-300"
              style={{ perspective: "1200px" }} /* Add subtle 3D perspective for more depth */
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
            >
              {villas.map((villa, index) => (
                <div
                  key={villa.id}
                  className="absolute w-80 sm:w-96 md:w-[450px] lg:w-[490px] xl:w-[530px] cursor-pointer touch-manipulation villa-slide"
                  style={getSlideStyle(index)}
                  onClick={() => handleSlideClick(index, villa)}
                >
                  <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:shadow-3xl transition-all duration-300">
                    <div className="relative">
                      <img
                        src={villa.images[0] || "/placeholder.svg"}
                        alt={villa.roomType}
                        className="w-full h-48 sm:h-60 md:h-72 object-cover transition-all duration-300"
                        loading="lazy"
                        style={{
                          transform: index === currentIndex ? "scale(1)" : "scale(1.01)",
                        }}
                        onError={(e) => {
                          // Fallback if image fails to load
                          e.target.src = getRandomUnsplash()
                        }}
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold">{villa.rating}</span>
                      </div>
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-[#D4AF37] to-[#BFA181] text-white rounded-lg text-xs px-2 py-1 font-medium">
                        {villa.hotel.city}
                      </div>
                    </div>
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2">{villa.roomType}</h3>
                      <div className="flex items-center gap-1 mb-3 sm:mb-4">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600 text-xs sm:text-sm">{villa.hotel.city}</span>
                      </div>
                      {/* Villa Info Cards - Condensed for mobile */}
                      <div className={`transition-all duration-300 ${index === currentIndex ? "" : "hidden sm:block"}`}>
                        <div className="hidden sm:grid grid-cols-2 gap-3 mb-4 transition-all duration-300">
                          <div className="bg-gradient-to-br from-[#D4AF37]/20 to-[#BFA181]/20 rounded-lg p-3 text-center border border-[#D4AF37]/30">
                            <Home className="w-5 h-5 text-[#D4AF37] mx-auto mb-1" />
                            <div className="text-sm font-semibold text-gray-800">{villa.rooms}</div>
                            <div className="text-xs text-gray-600">Rooms</div>
                          </div>
                          <div className="bg-gradient-to-br from-[#D4AF37]/20 to-[#BFA181]/20 rounded-lg p-3 text-center border border-[#D4AF37]/30">
                            <Maximize className="w-5 h-5 text-[#D4AF37] mx-auto mb-1" />
                            <div className="text-sm font-semibold text-gray-800">{villa.area}</div>
                            <div className="text-xs text-gray-600">Area</div>
                          </div>
                          <div className="bg-gradient-to-br from-[#D4AF37]/20 to-[#BFA181]/20 rounded-lg p-3 text-center border border-[#D4AF37]/30">
                            <Users className="w-5 h-5 text-[#D4AF37] mx-auto mb-1" />
                            <div className="text-sm font-semibold text-gray-800">{villa.capacity}</div>
                            <div className="text-xs text-gray-600">Guests</div>
                          </div>
                          <div className="bg-gradient-to-br from-[#D4AF37]/20 to-[#BFA181]/20 rounded-lg p-3 text-center border border-[#D4AF37]/30">
                            <div className="w-5 h-5 text-[#D4AF37] mx-auto mb-1 text-lg">✨</div>
                            <div className="text-xs font-semibold text-gray-800">{villa.features.speciality}</div>
                          </div>
                        </div>
                        {/* Description - Visible on all devices */}
                        <p
                          className={`text-gray-600 text-xs sm:text-sm mb-4 ${
                            index === currentIndex ? "line-clamp-2" : "hidden sm:block sm:line-clamp-3 opacity-0"
                          }`}
                        >
                          {villa.description}
                        </p>
                        {/* Amenities - Desktop only */}
                        <div
                          className={`hidden sm:block transition-all duration-300 ${index === currentIndex ? "opacity-100 max-h-32" : "opacity-0 max-h-0 overflow-hidden"}`}
                        >
                          <div className="flex flex-wrap gap-2 mb-4">
                            {villa.amenities.slice(0, 4).map((amenity, idx) => (
                              <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-700">
                                {amenity}
                              </span>
                            ))}
                          </div>
                        </div>
                        {/* Book Now button - Enhanced for both mobile and desktop */}
                        <div
                          className={`flex justify-center ${index === currentIndex ? "opacity-100 max-h-12" : "opacity-0 max-h-0 overflow-hidden"} transition-all duration-300`}
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation() // Prevent parent click handler from firing
                              handleViewDetails(villa)
                            }}
                            className="w-full py-2.5 sm:py-3 text-sm font-semibold bg-gradient-to-r from-[#D4AF37] to-[#BFA181] text-white rounded-lg hover:from-[#BFA181] hover:to-[#D4AF37] transition-all duration-300 shadow-md"
                            style={{
                              animation: index === currentIndex ? "pulse-subtle 1.5s infinite alternate" : "none",
                            }}
                          >
                            Book Now
                          </button>
                          <style jsx>{`
                            @keyframes pulse-subtle {
                              0% { transform: scale(1); }
                              100% { transform: scale(1.02); }
                            }
                          `}</style>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Navigation Buttons - Hidden on mobile */}
            <button
              onClick={prevSlide}
              disabled={isAnimating}
              aria-label="Previous villa"
              className="hidden sm:block absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 z-20"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
            </button>
            <button
              onClick={nextSlide}
              disabled={isAnimating}
              aria-label="Next villa"
              className="hidden sm:block absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 z-20"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
            </button>
          </div>
        )}

        {/* Enhanced Dots Indicator - Reduced spacing on mobile */}
        {!loading && !error && villas.length > 0 && (
          <div className="flex justify-center gap-2 mb-2 sm:mb-8 -mt-1 sm:mt-0">
            {villas.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-[#D4AF37] to-[#BFA181] w-7 h-2.5 shadow-sm"
                    : "bg-gray-300 hover:bg-gray-400 w-2.5 h-2.5 hover:scale-110"
                }`}
                style={{
                  transform: index === currentIndex ? "translateY(-1px)" : "none",
                }}
              />
            ))}
          </div>
        )}

        {/* Booking Form - More compact on mobile */}
        {!loading && !error && villas.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-2 sm:p-3 md:p-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-1 sm:gap-2 md:gap-6">
              {/* Pricing information */}
              <div className="w-full md:w-auto">
                <div className="flex items-center justify-between md:justify-start gap-2 md:gap-4">
                  <div className="rounded-full p-2 md:p-3 text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#BFA181]">
                    <div className="text-lg md:text-2xl">🏷️</div>
                  </div>
                  <div>
                    <div className="text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#BFA181]">
                      {formatPrice(villas[currentIndex].pricePerNight)}
                    </div>
                    <div className="text-gray-600 text-xs md:text-sm">per night</div>
                  </div>
                  {/* Mobile pricing details - only visible on smaller screens */}
                  <div className="flex md:hidden items-center gap-1 ml-auto">
                    <div className="text-[9px] px-1 py-0.5 bg-gray-50 border border-gray-100 rounded">
                      <span className="font-medium">W:</span> ₹{formatPrice(villas[currentIndex].pricing.weekday)}
                    </div>
                    <div className="text-[9px] px-1 py-0.5 bg-gray-50 border border-gray-100 rounded">
                      <span className="font-medium">WE:</span> ₹{formatPrice(villas[currentIndex].pricing.weekend)}
                    </div>
                  </div>
                </div>
                {/* Desktop expanded pricing - hidden on mobile */}
                <div className="hidden md:flex mt-3 gap-3">
                  <div className="text-sm px-3 py-1.5 bg-gray-100 rounded-lg">
                    <span className="font-medium">Weekday:</span> ₹{formatPrice(villas[currentIndex].pricing.weekday)}
                  </div>
                  <div className="text-sm px-3 py-1.5 bg-gray-100 rounded-lg">
                    <span className="font-medium">Weekend:</span> ₹{formatPrice(villas[currentIndex].pricing.weekend)}
                  </div>
                  <div className="text-sm px-3 py-1.5 bg-gray-100 rounded-lg">
                    <span className="font-medium">Holiday:</span> ₹{formatPrice(villas[currentIndex].pricing.holiday)}
                  </div>
                </div>
              </div>
              {/* Action Buttons - Same style for both mobile and desktop */}
              <div className="flex w-full md:w-auto mt-2 md:mt-0 gap-3 justify-center">
                <button
                  onClick={() => navigate("/rooms")}
                  className="w-auto px-4 md:px-6 py-2 md:py-3 bg-white text-gray-800 rounded-lg font-semibold transition-all duration-300 text-sm md:text-base text-center border border-gray-300 shadow-sm transform hover:scale-105 max-w-xs hover:bg-gray-50"
                >
                  View All Villas
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default VillaSwiper;
