import "./Sidemenu.css"
import { Sidebar } from 'primereact/sidebar';
        

function Sidemenu() {
  return (
    <div>
    <Sidebar visible="true">
      <div className="menus">
        <p className="sidemenu">
        <a className=" navbar-brand" href="/">Home</a>
        </p>
        <p className="sidemenu">
        <a className=" navbar-brand" href="/users">User</a>
        </p>
        <p className="sidemenu">
        <a className=" navbar-brand" href="/tickets">Ticket</a>
        </p>
        </div>
    </Sidebar>
    </div>
  )
}

export default Sidemenu;
