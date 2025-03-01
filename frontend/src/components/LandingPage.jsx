import './LandingPage.css';
import TryNowButton from './TryNowButton';
import TypewriterButton from './TypewriterButton';


function LandingPage(){


    return (
        <>
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="shadow" style={{ marginBottom: '10px' }}></div>
            <h1 className="sora-medium" style={{ marginBottom: 'auto'}}>Discover Answers in Every Language—<span className="text-span-gradient">Instantly</span></h1>
            <h2 className="sora-light" style={{ color: "#F2F2F2", display: 'flex', alignItems: 'center', gap: '10px' }}>
              Your AI search engine to find information in 50+ languages
              <span role="img" aria-label="globe">🌐</span>
            </h2>
            <TypewriterButton/>
            <TryNowButton />
          </div>
        </div>
        <div style={{height: '100vh'}}>
        </div>
        </>
      )
}

export default LandingPage;