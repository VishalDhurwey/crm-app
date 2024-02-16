import "./TicketDashboard.css";



function TicketDashboard(props){
    return (
        <div className="TicketDashboard">
            <div className="tile tile-all">
                <p className="tile-text">Total</p>
                <p className="tile-value">{props.dashboardcounts.total}</p>
            </div>
            <div className="tile tile-new">
            <p className="tile-text">New</p>
                <p className="tile-value">{props.dashboardcounts.new}</p>
            </div>
            <div className="tile tile-rejected">
            <p className="tile-text">Assigned</p>
                <p className="tile-value">{props.dashboardcounts.assigned}</p>
            </div>
            <div className="tile tile-accepted">
            <p className="tile-text">Resolved</p>
                <p className="tile-value">{props.dashboardcounts.resolved}</p>
            </div>
            
        </div>
    );
}

export default TicketDashboard;