import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import CTASection from "../components/CTA";
import Footer from "../components/Footer";
import MeetTheDeveloper from "../components/MeetTheDevelopers";



const LandingPage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <MeetTheDeveloper />
      <CTASection />
      <Footer />
    </>
  );
};

export default LandingPage;
