
import { useEffect } from "react";
import { FastingProvider } from "../contexts/FastingProvider";
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
