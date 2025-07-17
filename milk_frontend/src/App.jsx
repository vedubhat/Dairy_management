import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Sidebar, { SidebarItem } from "./components/SideBar";
import { LayoutDashboard } from "lucide-react";
import { FileText, Receipt, Truck, Inbox, Mail } from "lucide-react";
import Stat_card from './components/Stat_card'
import { useContext } from 'react';
import Data_table_state from './context/DataTableState';

function App() {
  const [count, setCount] = useState(0);
  const arr = [1, 2, 3, 4];

  return (
    <Data_table_state>
      <main className="w-full flex ">
        <Sidebar>
          <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" />
          <SidebarItem icon={<Truck size={20} />} text="Delivery" />
          <SidebarItem icon={<Inbox size={20} />} text="Requests" />
          <SidebarItem icon={<Receipt size={20} />} text="Bill" />
        </Sidebar>
        
        <div className="container" style={{display : 'flex' , flexDirection : 'column'}}>
          <div className="main">
            {
              arr.map((item) => {
                return <Stat_card />
              })
            }
          </div>
        </div>
      </main>
    </Data_table_state>
  );
}

export default App;
