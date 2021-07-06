import React from "react";
import { Link } from "react-router-dom"
import eventImg from "../images/laptop-user.png";

const EventDetail = (props) => {
const { title, date, location, weather} = props.location.state.event
  return (
    <div className="main">
            <h2 style={{marginTop: "15px"}}>
                Spotkanie
                <Link to="/"><button className="ui button green" style={{ marginLeft: "10px" }}> Powrót do listy spotkań</button></Link>
            </h2>

        <div className="ui card centered">
            <div className="image">
                <img src={eventImg} alt="Event"/>
            </div>
            <div className="content">
                <div className="header">{title}</div>
                <div className="desctiption">{date}</div>
                <div className="desctiption">{location}, {weather}</div>
            </div>
        </div>
    </div>
  );
};

export default EventDetail;