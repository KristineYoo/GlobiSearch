import './LandingPage.css';
import TryNowButton from './TryNowButton';

function LandingPage(){
    return (
        <>
        <div style={{ height: '100vh', flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{ position: 'absolute', top: '3%', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px', zIndex: '2', blur: '10px' }}>
                <img src='imgs/globi1.png' alt='Globi' style={{ width: '100px', height: 'auto' }} />
                <h2 className="sora-medium" style={{fontSize: '48px', color: "white", letterSpacing: '-1px'}}>GlobiSearch</h2>
            </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="shadow" style={{ marginBottom: '10px' }}></div>
            <h1 className="sora-medium" style={{ marginBottom: 'auto'}}>Discover Answers in Every Language—<span className="text-span-gradient">Instantly</span></h1>
            <h2 className="sora-light" style={{ color: "#F2F2F2", display: 'flex', alignItems: 'center', gap: '10px' }}>
              Your AI search engine to find information in 50+ languages
              <span role="img" aria-label="globe">🌐</span>
            </h2>
            <TryNowButton />
          </div>
        </div>
        <div style={{height: '100vh'}}>
        </div>
        </>
      )
}

export default LandingPage;