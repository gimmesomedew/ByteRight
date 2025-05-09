import App from './App.jsx'
import './index.css'

const root = document.getElementById('root')

if (root) {
  const renderApp = () => {
    window.ReactDOM.createRoot(root).render(
      window.React.createElement(window.React.StrictMode, null,
        window.React.createElement(App)
      )
    )
  }

  if (window.React && window.ReactDOM) {
    renderApp()
  } else {
    console.error('React or ReactDOM not loaded properly')
  }
}
