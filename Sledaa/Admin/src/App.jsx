import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Images from './pages/Admin/Images.jsx'; 
import Events from './pages/Admin/Events.jsx';
import AdminNews from './pages/Admin/News.jsx';
import AdminProjects from './pages/Admin/Projects.jsx';
import AdminCommittee from './pages/Admin/Committee.jsx';
import AdminReport from './pages/Admin/Report.jsx';
import AdminResources from './pages/Admin/Resources.jsx';
import Login from './pages/Admin/loging.jsx';
import GalleryPage from './pages/Admin/GalleryPage.jsx';
import AdminLayout from './components/layout/AdminLayout.jsx';
import ScrollToTop from './components/common/ScrollToTop.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Navigate to="/admin/login" replace />} />
          <Route path="/admin/login" element={<Login />} />
          
          {/* Admin Routes with Layout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="gallery/images/:id" element={<Images />} />
            <Route path="events" element={<Events />} />
            <Route path="news" element={<AdminNews />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="committee" element={<AdminCommittee />} />
            <Route path="report" element={<AdminReport />} />
            <Route path="resources" element={<AdminResources />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
