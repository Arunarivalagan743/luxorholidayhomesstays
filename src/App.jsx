import React, { useEffect, lazy, Suspense } from 'react';
import { createPortal } from 'react-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {Route, Routes, useLocation, Navigate} from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa';
import "./App.css";
import { ToastProvider } from './context/ToastContext';
import Toast from './components/Toast';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Always loaded components
import Navbar from './components/Navbar'
import SEOHead from './components/SEO/SEOHead';
import Footer from './components/Footer'
import AuthGuard from './components/AuthGuard';
import Layout from './components/Adminpanel/Layout';
import ProtectedRoute from './components/Adminpanel/Protected';
import LanguageSelector from './components/LanguageSelector'

// Lazy loaded components - main pages
const Home = lazy(() => import('./pages/Home'))
const AllRooms = lazy(() => import('./pages/AllRooms'))
const VillaDetails = lazy(() => import('./pages/VillaDetails'))
const RoomDetails = lazy(() => import('./pages/RoomDetails'))
const MyBookings = lazy(() => import('./pages/MyBookings'))
const BookingDetails = lazy(() => import('./pages/BookingDetails'));
const Contact = lazy(() => import('./pages/Contact'))
const About = lazy(() => import('./pages/About'));
const SearchResults = lazy(() => import('./pages/SearchResults'));
const SignIn = lazy(() => import('./pages/SignIn'));
const OTPVerification = lazy(() => import('./pages/OTPVerification'));
const PhotoGallery = lazy(() => import('./pages/PhotoGallery'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const VerifyOTP = lazy(() => import('./pages/VerifyOTP'));
const Profile = lazy(() => import('./pages/Profile'));
const CompleteProfile = lazy(() => import('./pages/Completeprofile'));
const BookingReview = lazy(() => import('./pages/BookingReview'));

// Lazy loaded components - admin pages
const AdminDashboard = lazy(() => import('./pages/Dashboard'));
const VillaManagement = lazy(() => import('./pages/Admin/VillaManagement'));
const BookingManagement = lazy(() => import('./pages/Admin/BookingManagement'));
const UserManagement = lazy(() => import('./pages/Admin/userManagement'));
const PhoneUserManagement = lazy(() => import('./pages/Admin/PhoneUserManagement'));
const VillaInfoManagementPage = lazy(() => import('./pages/Admin/VillaInfoManagementPage'));
const AmenitiesManagement = lazy(() => import('./pages/Admin/AmenitiesManagement'));
const NewsletterManagement = lazy(() => import('./pages/Admin/NewsletterManagement'));
const UserProfilesManagement = lazy(() => import('./pages/Admin/UserProfilesManagement'));
const ManualBookingManagement = lazy(() => import('./pages/Admin/ManualBookingManagement'));
const OffersManagement = lazy(() => import('./pages/Admin/OffersManagement'));
const BlockedDatesManagement = lazy(() => import('./pages/Admin/BlockedDatesManagement'));
const CancelRequestsManagementPage = lazy(() => import('./pages/Admin/CancelRequestsManagementPage'));

// Lazy loaded components - footer pages
const Partners = lazy(() => import('./components/Footer/Partners'))
const HelpCenter = lazy(() => import('./components/Footer/Help-center'))
const Safety = lazy(() => import('./components/Footer/safety-info'))
const NavbarGallery = lazy(() => import('./components/Navbar/Gallery'))
const AboutGallery = lazy(() => import('./components/About/Gallery'))
const GuestReviews = lazy(() => import('./components/Footer/GuestReviews'));
const PrivacyPolicy = lazy(() => import('./components/Footer/PrivacyPolicy'));
const TermsConditions = lazy(() => import('./components/Footer/TermsConditions'));
function App() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Initialize AOS animation library
    AOS.init({
      duration: 1000,
      once: true,
    });
    
    // Hide preloader after the page is fully loaded
    const hidePreloader = () => {
      const preloader = document.getElementById('preloader');
      if (preloader) {
        preloader.classList.add('preloader-hide');
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500);
      }
    };
    
    // If document is already loaded, hide the preloader immediately
    if (document.readyState === 'complete') {
      hidePreloader();
    } else {
      // Wait for everything to load
      window.addEventListener('load', hidePreloader);
    }
    
    // Fallback - hide preloader after 2.5 seconds if load event doesn't fire
    const timeoutId = setTimeout(hidePreloader, 2500);
    
    return () => {
      window.removeEventListener('load', hidePreloader);
      clearTimeout(timeoutId);
    };
  }, []);
  
  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Ensure body scroll is enabled when routes change
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
  }, [pathname]);
  
  // Check if current path is in the admin section - use startsWith for more precise matching
  const isOwnerPath = pathname.startsWith('/owner');
  
  // Default SEO configuration for the entire app
  const getDefaultSEO = () => {
    // Base SEO settings
    let seoProps = {
      title: 'Luxor Holiday Home Stays | Luxury Villas in Chennai & Pondicherry',
      description: 'Experience premium luxury villa stays in Chennai and Pondicherry with Luxor Holiday Home Stays. Book our exclusive villas with private pools and luxury amenities.',
      keywords: 'luxor, luxor holiday, luxorstay, luxor holiday homestays, luxury villas, chennai villas, pondicherry villas'
    };

    // Route-specific SEO settings
    if (pathname === '/') {
      seoProps.title = 'Luxor Holiday Home Stays | Premium Luxury Villas in South India';
      seoProps.description = 'Discover Luxor Holiday Home Stays - the ultimate luxury villa experience in Chennai and Pondicherry. Book your perfect getaway today.';
    } else if (pathname.includes('chennai-villas')) {
      seoProps.title = 'Luxury Villas in Chennai | Luxor Holiday Home Stays';
      seoProps.description = 'Explore our exclusive collection of luxury villas in Chennai. Private pools, premium amenities, and exceptional service by Luxor Holiday Home Stays.';
      seoProps.keywords = 'luxor, luxor chennai, luxury villas in chennai, private pool villas, chennai homestays';
    } else if (pathname.includes('pondicherry-villas')) {
      seoProps.title = 'Beachfront Villas in Pondicherry | Luxor Holiday Home Stays';
      seoProps.description = 'Book your dream beachfront villa in Pondicherry. Experience luxury accommodations with ocean views by Luxor Holiday Home Stays.';
      seoProps.keywords = 'luxor, luxor pondicherry, pondicherry beach villas, luxury stay pondicherry';
    } else if (pathname.includes('about')) {
      seoProps.title = 'About Luxor Holiday Home Stays | Our Story & Vision';
      seoProps.description = 'Learn about Luxor Holiday Home Stays - our journey, vision, and commitment to providing exceptional luxury vacation experiences in South India.';
    } else if (pathname.includes('contact')) {
      seoProps.title = 'Contact Luxor Holiday Home Stays | Booking Inquiries';
      seoProps.description = "Reach out to Luxor Holiday Home Stays for booking inquiries, special requests, or customer support. We're here to help plan your perfect stay.";
    } else if (pathname.includes('gallery')) {
      seoProps.title = 'Photo Gallery | Luxor Holiday Home Stays Premium Villas';
      seoProps.description = 'Browse our gallery of stunning luxury villas in Chennai and Pondicherry. See the premium accommodations and amenities offered by Luxor Holiday Home Stays.';
      seoProps.keywords = 'luxor gallery, luxury villa photos, chennai villas, pondicherry villas, luxury accommodations';
    }

    return seoProps;
  };

  // Loading fallback component
  const LoadingFallback = () => (
    <div className="flex h-[50vh] items-center justify-center">
      <div className="animate-pulse flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-t-4 border-b-4 border-primary rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
  
  return (
    <AuthProvider>
      <ToastProvider>
        <LanguageProvider>
          <SEOHead {...getDefaultSEO()} />
          <div className="w-full max-w-[100vw] overflow-x-hidden">
            {!isOwnerPath && <Navbar />}
            <div className='min-h-[90vh] pt-[3rem] md:pt-[4rem]'>
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                {/* Public routes */}
                <Route path='/' element={<Home/>} />
                <Route path='/rooms' element={<AllRooms/>} />
                <Route path='/rooms/:id' element={<RoomDetails/>} />
                <Route path='/villa/:id' element={<VillaDetails/>} />
                <Route path='/villas/:id' element={<VillaDetails/>} /> {/* Support both URL patterns */}
                <Route path='/search-results' element={<SearchResults/>} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/partners' element={<Partners />} />
                <Route path='/h' element={<HelpCenter />} />
              <Route path='/si' element={<Safety/>} />
                   <Route path='/profile' element={<Profile/>} />
              <Route path="/complete-profile" element={
                <AuthGuard redirectOnAuthenticated={false} redirectPath="/">
                  <CompleteProfile />
                </AuthGuard>
              } />
              <Route path='/g' element={<NavbarGallery/>} />
              <Route path='/gallery' element={<AboutGallery/>} />
              <Route path='/about' element={<About />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/verify-otp" element={<OTPVerification />} />
              <Route path="/photogallery/:villaname" element={<PhotoGallery />} />
              <Route path="/reviews" element={<GuestReviews />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsConditions />} />
              <Route path="/forgot-password" element={<ForgotPassword />} /> {/* New route for forgot password */}
              <Route path="/verify-otp" element={<VerifyOTP />} /> {/* New route for OTP verification */}

              {/* User protected routes */}
              <Route path="/my-bookings" element={
                <AuthGuard>
                  <MyBookings />
                </AuthGuard>
              } />
              <Route path="/booking/:id" element={
                <AuthGuard>
                  <BookingDetails />
                </AuthGuard>
              } />
              <Route path="/booking-review" element={
                <AuthGuard>
                  <BookingReview />
                </AuthGuard>
              } />
              
              {/* Admin protected routes */}
              <Route path="/dashboard" element={
  <ProtectedRoute>
    <Layout>
      <AdminDashboard />
    </Layout>
  </ProtectedRoute>
} />

<Route path="/cancel-requests" element={
  <ProtectedRoute>
    <Layout>
      <CancelRequestsManagementPage />
    </Layout>
  </ProtectedRoute>
} />
<Route path="/amenities" element={
  <ProtectedRoute>
    <Layout>
      <AmenitiesManagement />
    </Layout>
  </ProtectedRoute>
} />

<Route path="/bookings" element={
  <ProtectedRoute>
    <Layout>
      <BookingManagement />
    </Layout>
  </ProtectedRoute>
} />

<Route path="/villas" element={
  <ProtectedRoute>
    <Layout>
      <VillaManagement />
    </Layout>
  </ProtectedRoute>
} />

<Route path="/users" element={
  <ProtectedRoute>
    <Layout>
      <UserManagement />
    </Layout>
  </ProtectedRoute>
} />

<Route path="/phone-users" element={
  <ProtectedRoute>
    <Layout>
      <PhoneUserManagement />
    </Layout>
  </ProtectedRoute>
} />

<Route path="/villa-info" element={
  <ProtectedRoute>
    <Layout>
      <VillaInfoManagementPage />
    </Layout>
  </ProtectedRoute>
} />

<Route path="/amenities" element={
  <ProtectedRoute>
    <Layout>
      <AmenitiesManagement />
    </Layout>
  </ProtectedRoute>
} />
<Route path="/newsletter" element={
  <ProtectedRoute>
    <Layout>
      <NewsletterManagement />
    </Layout>
  </ProtectedRoute>
} />

<Route path="/user-profiles" element={
  <ProtectedRoute>
    <Layout>
      <UserProfilesManagement />
    </Layout>
  </ProtectedRoute>
} />
<Route path="/manual-booking" element={
  <ProtectedRoute>
    <Layout>
      <ManualBookingManagement />
    </Layout>
  </ProtectedRoute>
} />

<Route path="/offers" element={
  <ProtectedRoute>
    <Layout>
      <OffersManagement />
    </Layout>
  </ProtectedRoute>
} />

<Route path="/blocked-dates" element={
  <ProtectedRoute>
    <Layout>
      <BlockedDatesManagement />
    </Layout>
  </ProtectedRoute>
} />
              {/* If you still want to support /Dashboard directly */}
              <Route path="/Dashboard" element={
                <ProtectedRoute>
                  <Navigate to="/owner/dashboard" replace />
                </ProtectedRoute>
              } />

              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
              </Suspense>
          </div>
          {!isOwnerPath && <Footer />}

          {/* WhatsApp button and Language Selector with React Portal to ensure they stay on top of everything */}
          {createPortal(
            <>
              {/* WhatsApp Button - Placed on right side */}
              <div className="fixed bottom-5 right-5 z-[9999]">
                <a
                  href="https://wa.me/918015924647?text=Hi%2C%20I%20am%20interested%20in%20booking%20a%20villas."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300 text-2xl whatsapp-button animate-pulse-slow"
                  style={{
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3), 0 0 10px rgba(37, 211, 102, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'auto',
                    touchAction: 'manipulation'
                  }}
                  aria-label="Contact us on WhatsApp"
                >
                  <FaWhatsapp />
                </a>
              </div>
              
            
            </>,
            document.body
          )}
        </div>
        <Toast />
        </LanguageProvider>
      </ToastProvider>
    </AuthProvider>
  )
}

export default App;



