// In your app.tsx
import Hero from './components/Hero';
import './index.css';
import './App.css';

function App() {
  const handleCtaClick = () => {
    // Your CTA logic here
    console.log('CTA clicked');
  };

  return (
    <div className="app">
      <Hero 
        title="Attention builds influence" 
        subtitle="We make f*cking great videos that convert"
        ctaText="Let's talk"
        onCtaClick={handleCtaClick}
      />
      {/* Other components */}
    </div>
  );
}

export default App;