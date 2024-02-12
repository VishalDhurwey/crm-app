import "./Dashboard.css";



function Dashboard(props){
    return (
        <div className="dashboard">
            <div className="tile tile-all">
                <p className="tile-text">Total</p>
                <p className="tile-value">{props.counts.total}</p>
            </div>
            <div className="tile tile-new">
            <p className="tile-text">New</p>
                <p className="tile-value">{props.counts.new}</p>
            </div>
            <div className="tile tile-accepted">
            <p className="tile-text">Accepted</p>
                <p className="tile-value">{props.counts.accepted}</p>
            </div>
            <div className="tile tile-rejected">
            <p className="tile-text">Rejected</p>
                <p className="tile-value">{props.counts.rejected}</p>
            </div>
        </div>
    );
}

export default Dashboard;