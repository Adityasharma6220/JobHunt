import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import HeroSection from './HeroSection';
import CategoryCarousel from './CategoryCarousel';
import LatestJobs from './LatestJobs';
import Footer from './shared/Footer';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, [user, navigate]); // Added user and navigate as dependencies

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroSection className="w-full h-auto" />
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <CategoryCarousel className="w-full" />
          <LatestJobs className="w-full mt-4" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
