import { createBrowserRouter, RouterProvider } from 'react-router-dom'; 
import Navbar from './components/shared/Navbar';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/Home';
import Jobs from './components/Jobs';
import Browse from './components/Browse';
import CareerGuidance from './components/CareerGuidance'; // Fixed spelling
import ViewAll from './components/ViewAll';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';
import Companies from './components/admin/Companies';
import CompanyCreate from './components/admin/CompanyCreate';
import CompanySetup from './components/admin/CompanySetup';
import AdminJobs from './components/admin/AdminJobs';
import PostJob from './components/admin/PostJob';
import Applicants from './components/admin/Applicants';
import ProtectedRoute from './components/admin/ProtectedRoute';
import ResumeBuilder from './components/ResumeBuilder'; // Adjust the path as necessary
import ResumePreview from './components/ResumePreview';
import CompanyDetails from './components/CompanyDetails';
import GameEmbeded from './components/GameEmbeded';
import Testimonials from './components/Testimonials';
import Networking from './components/Networking';
import SavedJobsList from './components/SavedJobsList';
import JobMapComponent from './components/JobMapComponent.jsx';
import HotlinePage from './components/HotlinePage';



const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/jobs',
    element: <Jobs />
  },
  {
    path: '/description/:id',
    element: <JobDescription />
  },
  {
    path: '/browse',
    element: <Browse />
  },
  {
    path:'/career',  
    element: <CareerGuidance />,  // Fixed spelling
  },
  {
    path:'/networking',  
    element: <Networking />,  // Fixed spelling
  },
  {
    path: '/view-all',
    element: <ViewAll />,  // Added View All route
  },
  // {
  //   path: '/savedjob',
  //   element: <SavedJobsList/>,  // Added View All route
  // },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/resume-builder',
    element: <ResumeBuilder /> // AI Resume Builder route
  },
  {
    path: '/resume-preview',
    element: <ResumePreview /> // AI Resume Builder route
  },
  {
    path: '/company/:id',  // Company details route
    element: <CompanyDetails /> // Render CompanyDetails component
  },
  {
    path: '/aptitude',  // Company details route
    element: <GameEmbeded /> // Render CompanyDetails component
  },
  {
    path: '/testimonial',  // Company details route
    element: <Testimonials /> // Render CompanyDetails component
  },
  {
    path: '/JobMapComponent',  // Company details route
    element: <JobMapComponent/> // Render CompanyDetails component
  },
  {
    path: '/HotlinePage',  // Company details route
    element: <HotlinePage/> // Render CompanyDetails component
  },
  // Admin routes
  {
    path: '/admin/companies',
    element: <ProtectedRoute><Companies /></ProtectedRoute>
  },
  {
    path: '/admin/companies/create',
    element: <ProtectedRoute><CompanyCreate /></ProtectedRoute> 
  },
  {
    path: '/admin/companies/:id',
    element: <ProtectedRoute><CompanySetup /></ProtectedRoute> 
  },
  {
    path: '/admin/jobs',
    element: <ProtectedRoute><AdminJobs /></ProtectedRoute> 
  },
  {
    path: '/admin/jobs/create',
    element: <ProtectedRoute><PostJob /></ProtectedRoute> 
  },
  {
    path: '/admin/jobs/:id',
    element: <ProtectedRoute><Applicants /></ProtectedRoute> 
  },
  {
    path: '/admin/jobs/:id/applicants',
    element: <ProtectedRoute><Applicants /></ProtectedRoute> 
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
