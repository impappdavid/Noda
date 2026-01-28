import './App.css'
import { Routes, Route } from 'react-router-dom'
import Overview from './components/myComponents/LandingPage/Overview/Overview'
import HowItWorks from './components/myComponents/LandingPage/HowItWorks/HowItWorks'
import ForRecruiters from './components/myComponents/LandingPage/ForRecruiters/ForRecruiters'
import Features from './components/myComponents/LandingPage/Features/Features'
import Pricing from './components/myComponents/LandingPage/Pricing/Pricing'
import ChangeLog from './components/myComponents/LandingPage/Changelog/Changelog'
import FAQ from './components/myComponents/LandingPage/Faq/Faq'

function App() {

  return (
    <>
      <Routes>

        <Route path="/" element={<Overview />} />
        <Route path="/howitworks" element={<HowItWorks />} />
        <Route path="/forrecruiters" element={<ForRecruiters />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/changelog" element={<ChangeLog />} />
        <Route path="/faq" element={<FAQ />} />

      </Routes>
    </>
  )
}

export default App
