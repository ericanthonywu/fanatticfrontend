import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class Navbar extends React.Component{

    render() {
        return (
            <div>
                <ul>
                    <li><Link to={"socialmediapost"}>Social Media Posts</Link></li>
                    <li><Link to={"socialmedia"}>Social Media </Link></li>
                    <li><Link to={"video"}>Videos </Link></li>
                    <li><Link to={"music"}>Music </Link></li>
                    <li><Link to={"merchandise"}>Merchandise </Link></li>
                    <li><Link to={"event"}>Events </Link></li>
                    <li><Link to={"analytics"}>Analytics </Link></li>
                    <li><Link to={"moderator"}>Moderator </Link></li>
                    <li><Link to={"setting"}>Setting </Link></li>
                </ul>
            </div>
        );
    }

}

export default connect()(Navbar)
