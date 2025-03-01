import './LandingPage.css';

function LandingPage(){
    return (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="shadow" style={{ marginBottom: '10px' }}></div>
            <h1 className="sora-medium" style={{ marginBottom: 'auto'}}>Discover Answers in Every Language—<span className="text-span-gradient">Instantly</span></h1>
            <h2 className="sora-light" style={{ color: "#F2F2F2", display: 'flex', alignItems: 'center', gap: '10px' }}>
              Your AI search engine to find information in 50+ languages
              <span role="img" aria-label="globe">🌐</span>
            </h2>
          </div>
        </>
      )
}

export default LandingPage;