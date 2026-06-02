import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/login.jsx'
import RegisterPage from './pages/register.jsx'
import AdminPage from './pages/adminPage.jsx'
import { TestPage } from './pages/testPage.jsx'
import { Toaster } from 'react-hot-toast'
import { HomePage } from './pages/homePage.jsx'
import { ClientProductsPage } from './pages/client/products.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ForgetPasswordPage from './pages/forgetPassword.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

function App() {
  return (
    <GoogleOAuthProvider clientId="975133249214-hb88ai8m5cjhe9gimnf3gbf1p2rv71an.apps.googleusercontent.com">
      {/* AuthProvider wraps BrowserRouter so auth state is available everywhere */}
      <AuthProvider>
        <BrowserRouter>
          <div>
            <Toaster position="top-center" />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/forget-password" element={<ForgetPasswordPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/products" element={<ClientProductsPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* 🔒 Protected: only admins can access /admin */}
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute adminOnly>
                    <AdminPage />
                  </ProtectedRoute>
                }
              />

              <Route path="/test" element={<TestPage />} />
              <Route path="/*" element={<HomePage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  )
}

export default App