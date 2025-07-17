import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Sidebar, { SidebarItem } from "./components/SideBar";
import { LayoutDashboard } from "lucide-react";
import { FileText, Receipt, Truck, Inbox, Mail } from "lucide-react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="w-fit">
      <Sidebar>
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" />
        <SidebarItem icon={<Truck size={20} />} text="Delivery" />
        <SidebarItem icon={<Inbox size={20} />} text="Requests" />
        <SidebarItem icon={<Receipt size={20} />} text="Bill" />
      </Sidebar>
    </main>
  );
}

export default App;
