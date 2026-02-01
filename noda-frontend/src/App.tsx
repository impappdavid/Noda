import './App.css'
import { Routes, Route } from 'react-router-dom'
import Overview from './components/myComponents/LandingPage/Overview/Overview'
import HowItWorks from './components/myComponents/LandingPage/HowItWorks/HowItWorks'
import ForRecruiters from './components/myComponents/LandingPage/ForRecruiters/ForRecruiters'
import Features from './components/myComponents/LandingPage/Features/Features'
import Pricing from './components/myComponents/LandingPage/Pricing/Pricing'
import ChangeLog from './components/myComponents/LandingPage/Changelog/Changelog'
import FAQ from './components/myComponents/LandingPage/Faq/Faq'
import Waitlist from './components/myComponents/LandingPage/Waitlist/WaitList'
import AppHome from './components/myComponents/App/Home/Home'
import AppJobs from './components/myComponents/App/Jobs/Jobs'
import AppCompanies from './components/myComponents/App/Companies/Companies'
import AppTracker from './components/myComponents/App/Tracker/Tracker'
import AppCommunities from './components/myComponents/App/Communities/Communities'

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
        <Route path="/waitlist" element={<Waitlist />} />

        <Route path="/app" element={<AppHome />} />
        <Route path="/app/jobs" element={<AppJobs />} />
        <Route path="/app/companies" element={<AppCompanies />} />
        <Route path="/app/tracker" element={<AppTracker />} />
        <Route path="/app/communities" element={<AppCommunities />} />

      </Routes>
    </>
  )
}

export default App
