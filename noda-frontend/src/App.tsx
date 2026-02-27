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
import AppCalendar from './components/myComponents/App/Calendar/Calendar'
import AppNetwork from './components/myComponents/App/Network/Network'
import AppBookmarks from './components/myComponents/App/Bookmarks/Bookmarks'
import PostDetail from './components/myComponents/App/Post/Post'
import JobDetailPage from './components/myComponents/App/Job/Job'
import CommunityDetail from './components/myComponents/App/Community/Community'
import UserProfile from './components/myComponents/App/User/User'
import NotificationsPage from './components/myComponents/App/Notifications/Notifications'
import SettingsPage from './components/myComponents/App/Settings/Settings'
import MessagesPage from './components/myComponents/App/Messages/Messages'
import CompanyPage from './components/myComponents/App/Company/Company'
import CreatePost from './components/myComponents/App/CompanyAdmin/CreatePost/CreatePost'
import PostJob from './components/myComponents/App/CompanyAdmin/PostJob/PostJob'
import CompanyDashboard from './components/myComponents/App/CompanyAdmin/Dashboard/Dashboard'
import TeamNodesManager from './components/myComponents/App/CompanyAdmin/Team/Team'
import ManageApplicants from './components/myComponents/App/CompanyAdmin/Applications/Applications'
import FounderIdeaPortal from './components/myComponents/App/Noda/Idea/Idea'
import IdeaResonanceBoard from './components/myComponents/App/Noda/Ideas/Ideas'
import RoadmapBoard from './components/myComponents/App/Noda/Roadmap/Roadmap'
import AdminReportsPage from './components/myComponents/App/Admin/Reports/Reports'
import AdminNotificationsPage from './components/myComponents/App/Admin/Notifications/Notifications'
import IdeaReviewPage from './components/myComponents/App/Admin/Review/Review'
import SignupPage from './components/myComponents/Auth/SignUp/SignUp'
import AuthController from './components/myComponents/Auth/Login/LoginController'
import PremiumPage from './components/myComponents/App/Premium/Premium'

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


        <Route path="/login" element={<AuthController />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route path="/app/post/:id" element={<PostDetail />} />
        <Route path="/app/jobs/:id" element={<JobDetailPage />} />
        <Route path="/app/communities/:id" element={<CommunityDetail />} />
        <Route path="/app/user/:id" element={<UserProfile />} />
        <Route path="/app/company/:id" element={<CompanyPage />} />

        <Route path="/app" element={<AppHome />} />
        <Route path="/app/jobs" element={<AppJobs />} />
        <Route path="/app/companies" element={<AppCompanies />} />
        <Route path="/app/tracker" element={<AppTracker />} />
        <Route path="/app/communities" element={<AppCommunities />} />
        <Route path="/app/calendar" element={<AppCalendar />} />
        <Route path="/app/network" element={<AppNetwork />} />
        <Route path="/app/bookmarks" element={<AppBookmarks />} />
        <Route path="/app/premium" element={<PremiumPage />} />

        <Route path="/app/noda/idea" element={<FounderIdeaPortal />} />
        <Route path="/app/noda/ideas" element={<IdeaResonanceBoard />} />
        <Route path="/app/noda/roadmap" element={<RoadmapBoard />} />

        <Route path="/app/noda/admin/reports" element={<AdminReportsPage />} />
        <Route path="/app/noda/admin/notifications" element={<AdminNotificationsPage />} />
        <Route path="/app/noda/admin/review" element={<IdeaReviewPage />} />

        <Route path="/app/notifications" element={<NotificationsPage />} />
        <Route path="/app/settings" element={<SettingsPage />} />
        <Route path="/app/messages" element={<MessagesPage />} />

        <Route path="/app/admin/post" element={<CreatePost />} />
        <Route path="/app/admin/jobs" element={<PostJob />} />
        <Route path="/app/admin/dashboard" element={<CompanyDashboard />} />
        <Route path="/app/admin/team" element={<TeamNodesManager />} />
        <Route path="/app/admin/applications" element={<ManageApplicants />} />

      </Routes>
    </>
  )
}

export default App
