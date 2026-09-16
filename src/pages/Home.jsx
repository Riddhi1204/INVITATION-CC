import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

// Components
import BackgroundRings from '../components/BackgroundRings';
import ParticleField from '../components/ParticleField';
import Loader from '../components/ui/Loader';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';

// Sections
import Hero from '../components/sections/Hero';
import Countdown from '../components/sections/Countdown';
import ChallengeOverview from '../components/sections/ChallengeOverview';
import Rounds from '../components/sections/Rounds';
import MiniChallenge from '../components/sections/MiniChallenge';
import Protocol from '../components/sections/Protocol';
import Rewards from '../components/sections/Rewards';
import WhoShouldEnter from '../components/sections/WhoShouldEnter';
import EventDetails from '../components/sections/EventDetails';
import RegistrationCTA from '../components/sections/RegistrationCTA';

const Home = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full min-h-screen bg-transparent">
      {/* Loading Sequence */}
      {loading && <Loader onComplete={() => setLoading(false)} />}

      {/* 3D Canvas Background (Fixed) */}
      <div id="canvas-container">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <color attach="background" args={['#f8fafc']} />
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <directionalLight position={[-10, 10, -5]} intensity={0.5} />
          
          <Suspense fallback={null}>
            <Environment preset="city" />
            <BackgroundRings />
            <ParticleField count={1500} />
            
            {/* Cyber glow effects */}
            <EffectComposer disableNormalPass>
              <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={1.5} />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div>

      {/* Main Content Scroll Layer */}
      <div id="ui-layer" className={loading ? "opacity-0 h-screen overflow-hidden" : "opacity-100 transition-opacity duration-1000"}>
        <Navbar />
        
        <main>
          <Hero />
          <Countdown />
          <ChallengeOverview />
          <Rounds />
          <MiniChallenge />
          <Protocol />
          <Rewards />
          <WhoShouldEnter />
          <EventDetails />
          <RegistrationCTA />
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Home;
