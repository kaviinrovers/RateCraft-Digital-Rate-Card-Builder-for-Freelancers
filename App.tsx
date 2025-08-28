import React, { useState } from 'react';
import { RateCardProvider } from './context/RateCardContext';
import { HomePage } from './components/HomePage';
import { BuilderPage } from './components/BuilderPage';

const App: React.FC = () => {
  const [showBuilder, setShowBuilder] = useState(false);

  return (
    <RateCardProvider>
      <main>
        {showBuilder ? (
          <BuilderPage onBack={() => setShowBuilder(false)} />
        ) : (
          <HomePage onStart={() => setShowBuilder(true)} />
        )}
      </main>
    </RateCardProvider>
  );
};

export default App;
