import { Navigate, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import TopBar from './components/TopBar';
import ForgotPasswordPage from './pages/forgot-password';
import HeightPage from './pages/height';
import Home from './pages/home';
import LoginPage from './pages/login';
import NutritionPage from './pages/nutrition';
import RegisterPage from './pages/register';
import WeightPage from './pages/weight';

function App() {
  return (
    <>
      <TopBar />
      <main>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<LoginPage />} path="/login" />
          <Route element={<RegisterPage />} path="/register" />
          <Route element={<ForgotPasswordPage />} path="/forgot-password" />
          <Route element={<HeightPage />} path="/height" />
          <Route element={<WeightPage />} path="/weight" />
          <Route element={<NutritionPage />} path="/nutrition" />
          <Route element={<NutritionPage />} path="/dinh-duong" />
          <Route element={<NutritionPage />} path="/goi-y-dinh-duong" />
          <Route element={<Navigate replace to="/login" />} path="/dang-nhap" />
          <Route element={<Navigate replace to="/register" />} path="/dang-ky" />
          <Route element={<Navigate replace to="/forgot-password" />} path="/quen-mat-khau" />
          <Route element={<Navigate replace to="/height" />} path="/cong-cu/theo-doi-chieu-cao" />
          <Route element={<Navigate replace to="/weight" />} path="/cong-cu/theo-doi-can-nang" />
          <Route element={<Navigate replace to="/nutrition" />} path="/cong-cu/goi-y-dinh-duong" />
          <Route element={<Navigate replace to="/nutrition" />} path="/pages/nutrition" />
          <Route element={<Navigate replace to="/" />} path="*" />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
