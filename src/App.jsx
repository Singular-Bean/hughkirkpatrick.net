import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import GithubProject from './pages/GithubProject'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/github/:projectName" element={<GithubProject />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
