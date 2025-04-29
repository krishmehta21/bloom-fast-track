
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { FastingProvider } from "../contexts/FastingContext";
import HomePage from "./HomePage";

// Main index page that redirects to the HomePage with FastingProvider
const Index = () => {
  return (
    <FastingProvider>
      <HomePage />
    </FastingProvider>
  );
};

export default Index;
