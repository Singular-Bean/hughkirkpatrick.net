import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { projects } from '../config'
import GithubButton from '../components/GithubButton'
import 'github-markdown-css/github-markdown.css'
import './GithubProject.css'

function GithubProject() {
  const { projectName } = useParams()
  const [markdown, setMarkdown] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [branch, setBranch] = useState('main')

  useEffect(() => {
    const fetchReadme = async () => {
      setLoading(true)
      const project = projects.find(p => p.type === 'github' && p.repo === projectName)
      
      if (!project) {
        setError('Project not found in configuration.')
        setLoading(false)
        return
      }

      const owner = 'Singular-Bean'
      const { branch: successfulBranch } = project
      
      try {
        const response = await fetch(
          `https://raw.githubusercontent.com/${owner}/${projectName}/${successfulBranch}/README.md`
        )
        if (response.ok) {
          const fetchedText = await response.text()
          setMarkdown(fetchedText)
          setBranch(successfulBranch)
          setError(null)
        } else {
          setError('Could not fetch README from GitHub. Please check if the project exists and has a README.md file.')
        }
      } catch (err) {
        console.error(`Failed to fetch from ${successfulBranch}:`, err)
        setError('An error occurred while fetching the README.')
      }
      setLoading(false)
    }

    fetchReadme()
    window.scrollTo(0, 0)
  }, [projectName])

  const baseUrl = `https://raw.githubusercontent.com/Singular-Bean/${projectName}/${branch}/`

  const components = {
    img: (props) => {
      if (props.src && !props.src.startsWith('http') && !props.src.startsWith('/')) {
        return <img {...props} src={`${baseUrl}${props.src}`} alt={props.alt || ''} />
      }
      return <img {...props} alt={props.alt || ''} />
    }
  }


  if (loading) {
    return (
      <main className="main-content">
        <div className="github-project-container loading">
          <div className="loading-spinner">Loading README...</div>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="main-content">
        <div className="github-project-container error">
          <div className="header">
            <Link to="/" className="back-link">← Back to Home</Link>
          </div>
          <div className="error-message">
            <h2>Error</h2>
            <p>{error}</p>
            <GithubButton projectName={projectName}>Go to GitHub Project</GithubButton>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="main-content">
      <div className="github-project-page">
        <div className="header">
          <div className="header-content">
            <Link to="/" className="back-link">← Back to Home</Link>
            <GithubButton projectName={projectName} />
          </div>
        </div>
        <div className="content">
          <div className="markdown-wrapper">
            <article className="markdown-body">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]} 
                rehypePlugins={[rehypeRaw]}
                components={components}
              >
                {markdown}
              </ReactMarkdown>
            </article>
            <div className="github-project-footer">
              <GithubButton projectName={projectName} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default GithubProject
