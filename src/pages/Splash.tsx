import waterWiseLogo from "@/assets/waterwise-logo.png";

const Splash = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-ocean relative overflow-hidden">
      {/* Animated water waves background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-wave animate-pulse"></div>
      </div>
      
      {/* Logo container */}
      <div className="relative z-10 text-center">
        <div className="mb-8 animate-bounce">
          <img 
            src={waterWiseLogo} 
            alt="WaterWise Logo" 
            className="w-32 h-32 mx-auto drop-shadow-2xl"
          />
        </div>
        
        <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
          WaterWise
        </h1>
        
        <p className="text-xl text-white/90 drop-shadow-md">
          Calculate Your Water Footprint
        </p>
        
        {/* Loading indicator */}
        <div className="mt-8">
          <div className="w-16 h-1 bg-white/30 rounded-full mx-auto overflow-hidden">
            <div className="w-full h-full bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Splash;