import './App.css'
import Stat_card from './components/Stat_card'
import { useContext } from 'react';
import Data_table_state from './context/DataTableState';

function App() {
  
  const arr = [1];
  return (
    <>
      <Data_table_state>
        <div className="main">
          {
            arr.map((item) => {
              return <Stat_card />
            })
          }
        </div>
      </Data_table_state>
    </>
  )
}

export default App
