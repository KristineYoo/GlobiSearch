import  { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LandingPage from './components/LandingPage'
import Typewriter from './components/Typewriter';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
function App() {
  const [count, setCount] = useState(0)

  const texts=["We are here to help!", "以 一百三多种语言进行搜索", "Comment pouvons-nous vous aider"]


  return (
    <>
      <LandingPage />
      <Box  sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
      <Button fullWidth variant="contained" sx={{ borderRadius: 8, justifyContent: 'center', height:70}}><Typewriter strings={texts} speed={100} delay={1500}/></Button>
      </Box>
    </>
  )
}

export default App
