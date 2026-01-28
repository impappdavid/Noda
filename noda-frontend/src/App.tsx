import './App.css'
import { Routes, Route } from 'react-router-dom'
import Overview from './components/myComponents/LandingPage/Overview/Overview'
import HowItWorks from './components/myComponents/LandingPage/HowItWorks/HowItWorks'
import ForRecruiters from './components/myComponents/LandingPage/ForRecruiters/ForRecruiters'
import Features from './components/myComponents/LandingPage/Features/Features'

function App() {

  return (
    <>
      <Routes>

        <Route path="/" element={<Overview />} />
        <Route path="/howitworks" element={<HowItWorks />} />
        <Route path="/forrecruiters" element={<ForRecruiters />} />
        <Route path="/features" element={<Features />} />

      </Routes>
    </>
  )
}

export default App
