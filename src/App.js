import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/home/home.jsx';
import Suppliers from './components/homepage/explore/suppliers';
import Register from './pages/UserAuth/register/Register.jsx';
import Login from './pages/UserAuth/login/Login.jsx';
import SupplierRegister from './pages/SupplierAuth/supplierRegister/SupplierRegister.jsx'
import SupplierLogin from './pages/SupplierAuth/supplierLogin/SupplierLogin.jsx';
import Category from './pages/Category/Category.jsx'
import ViewDetails from './pages/viewdetails/ViewDetails.jsx';
import Searcher from './pages/categorypage/searcher/Searcher.jsx';
import PrivacyPolicy from './pages/privacy/PrivacyPolicy.jsx'
import Terms from './pages/terms/Terms.jsx'
import Blog from './pages/blogpage/blog/Blog.jsx';
import Read from './pages/blogpage/read/Read.jsx';
import Read1 from './pages/blogpage/read1/Read1.jsx'
import Contact from './pages/contact/Contact.jsx'
import ProfileSupplier from './pages/categorypage/userSupplier/profileSupplier.jsx';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getSupplier } from './redux/actions/supplierAuthAction.js';
import { getUser } from './redux/actions/userAuthAction.js';
import AdminLogin from './pages/AdminLogin/AdminLogin.jsx';
import AdminBusiness from './pages/AdminBusiness/AdminBusiness.jsx';
import FPVerifyEmail from './pages/UserAuth/ForgotPassword/FPVerifyEmail.jsx';
import FPVerifyOtp from './pages/UserAuth/ForgotPassword/FPVerifyOtp.jsx';
import FPChangePassword from './pages/UserAuth/ForgotPassword/FPChangePassword.jsx';
import SupplierVerifyEmail from './pages/SupplierAuth/SupplierForgotPassword/SupplierVerifyEmail.jsx';
import SupplierVerifyOtp from './pages/SupplierAuth/SupplierForgotPassword/SupplierVerifyOtp.jsx';
import SupplierChangePassword from './pages/SupplierAuth/SupplierForgotPassword/SupplierChangePassword.jsx';
import AdminPosters from './pages/AdminPosters/AdminPosters.jsx';
import AdminBlogs from './pages/AdminBlogs/AdminBlogs.jsx';
import BlogDetail from './pages/blogpage/BlogDetail/BlogDetail.jsx';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSupplier());
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<Terms />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/category" element={<Category />} />
          <Route path="/viewdetails/:id" element={<ViewDetails />} />
          <Route path="/searcher" element={<Searcher />} />
          <Route path="/profilesupplier" element={<ProfileSupplier />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/creating-a-cozy-retreat-tips-for-designing-a-comfortable-living-space" element={<Read />} />
          <Route path="/why-work-zone-safety-is-important-for-everyone" element={<Read1 />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/user/register" element={<Register />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/forgot-password/verify-email" element={<FPVerifyEmail />} />
          <Route path="/user/forgot-password/verify-otp" element={<FPVerifyOtp />} />
          <Route path="/user/forgot-password/change-password" element={<FPChangePassword />} />
          <Route path="/supplier/register" element={<SupplierRegister />} />
          <Route path="/supplier/login" element={<SupplierLogin />} />
          <Route path="/supplier/forgot-password/verify-email" element={<SupplierVerifyEmail />} />
          <Route path="/supplier/forgot-password/verify-otp" element={<SupplierVerifyOtp />} />
          <Route path="/supplier/forgot-password/change-password" element={<SupplierChangePassword />} />
          {/* admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/business" element={<AdminBusiness />} />
          <Route path="/admin/posters" element={<AdminPosters />} />
          <Route path="/admin/blogs" element={<AdminBlogs />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;