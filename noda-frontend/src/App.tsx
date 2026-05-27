import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom' // Added useLocation
import Overview from './components/myComponents/LandingPage/Overview/Overview'
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
import MessagesPage from './components/myComponents/App/Messages/Messages'
import CompanyPage from './components/myComponents/App/Company/Company'
import CreatePost from './components/myComponents/App/CompanyAdmin/CreatePost/CreatePost'
import PostJob from './components/myComponents/App/CompanyAdmin/PostJob/PostJob'
import CompanyDashboard from './components/myComponents/App/CompanyAdmin/Dashboard/Dashboard'
import TeamNodesManager from './components/myComponents/App/CompanyAdmin/Team/Team'
import ManageApplicants from './components/myComponents/App/CompanyAdmin/Jobs/Applications'
import IdeaResonanceBoard from './components/myComponents/App/Noda/Ideas/Ideas'
import AdminReportsPage from './components/myComponents/App/Admin/Reports/Reports'
import AdminNotificationsPage from './components/myComponents/App/Admin/Notifications/Notifications'
import IdeaReviewPage from './components/myComponents/App/Admin/Review/Review'
import SignupPage from './components/myComponents/Auth/SignUp/SignUp'
import AuthController from './components/myComponents/Auth/Login/LoginController'
import PremiumPage from './components/myComponents/App/Premium/Premium'
import UserSearchPage from './components/myComponents/App/UserSearch/User'
import CompanySearchPage from './components/myComponents/App/CompanySearch/CompanySearch'
import CreateCompanyPage from './components/myComponents/App/CreateCompany/CreateCompany'
import VerificationTerminal from './components/myComponents/App/Admin/CompanyReview/CompanyReview'
import Applicants from './components/myComponents/App/CompanyAdmin/Applicants/Applicants'
import ProjectDetailView from './components/myComponents/App/Project/ProjectDetailView'
import GlobalMessagingDock from './components/myComponents/App/GlobalMessagingDock'
import ProjectDashboard from './components/myComponents/App/Co-Build/Co-Build'

// 1. Import your dynamic message widget component structure block

function App() {
  // Pull current active window location context reference 
  const location = useLocation();

  // Evaluate if route match criteria target active app spaces
  const isAppSpace = location.pathname.startsWith('/app');

  return (
    <>
      <Routes>
        
        <Route path="/" element={<AuthController />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route path="/app/post/:id" element={<PostDetail />} />
        <Route path="/app/jobs/:id" element={<JobDetailPage />} />
        <Route path="/app/communities/:id" element={<CommunityDetail />} />
        <Route path="/app/user/:id" element={<UserProfile />} />
        <Route path="/app/company/:id" element={<CompanyPage />} />

        <Route path="/app/project/:id" element={<ProjectDetailView />} />

        <Route path="/app/user" element={<UserSearchPage />} />
        <Route path="/app/company" element={<CompanySearchPage />} />

        <Route path="/app/createcompany" element={<CreateCompanyPage />} />

        <Route path="/app" element={<AppHome />} />
        <Route path="/app/jobs" element={<AppJobs />} />
        <Route path="/app/co-build" element={<ProjectDashboard />} />
        <Route path="/app/companies" element={<AppCompanies />} />
        <Route path="/app/tracker" element={<AppTracker />} />
        <Route path="/app/communities" element={<AppCommunities />} />
        <Route path="/app/calendar" element={<AppCalendar />} />
        <Route path="/app/network" element={<AppNetwork />} />
        <Route path="/app/bookmarks" element={<AppBookmarks />} />
        <Route path="/app/premium" element={<PremiumPage />} />

        <Route path="/app/noda/ideas" element={<IdeaResonanceBoard />} />

        <Route path="/app/noda/admin/reports" element={<AdminReportsPage />} />
        <Route path="/app/noda/admin/notifications" element={<AdminNotificationsPage />} />
        <Route path="/app/noda/admin/review" element={<IdeaReviewPage />} />
        <Route path="/app/noda/admin/companyreview" element={<VerificationTerminal />} />

        <Route path="/app/notifications" element={<NotificationsPage />} />
        <Route path="/app/messages" element={<MessagesPage />} />

        <Route path="/app/admin/post" element={<CreatePost />} />
        <Route path="/app/admin/jobs" element={<ManageApplicants />} />
        <Route path="/app/admin/jobs/:id" element={<Applicants />} />
        <Route path="/app/admin/jobs/create" element={<PostJob />} />
        <Route path="/app/admin/dashboard" element={<CompanyDashboard />} />
        <Route path="/app/admin/team" element={<TeamNodesManager />} />
      </Routes>

      {/* 2. Global Persistent Overlay Core Mount Engine
          Render condition protects presentation inside onboarding screens */}
      {isAppSpace && <GlobalMessagingDock />}
    </>
  )
}

export default App