import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import CTASection from "../components/CTA";
import Footer from "../components/Footer";
import OurTeamSection from "../components/OurTeam";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <OurTeamSection />
      <CTASection />
      <Footer />
    </>
  );
};

export default LandingPage;
