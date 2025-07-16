import './App.css'
import Stat_card from './components/Stat_card'

function App() {
  const arr = [1];

  return (
    <>
    <div className="main">
      {
        arr.map((item) => {
          return <Stat_card/>
        })
      }
    </div>
    
    </>
  )
}

export default App
