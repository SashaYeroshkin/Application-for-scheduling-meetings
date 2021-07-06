import React from "react";
import { Link } from "react-router-dom"
import eventImg from "../images/laptop-user.png";

const EventCard = (props) => {
  const { id, title, date, location, weather} = props.event;

  return (
    <div className="item">
        <img className="ui avatar image" src={eventImg} alt="User icon" />
        <div className="content">
            <div className="header">
              <Link to={{pathname: "/event/${id}", state:{event: props.event}}}>{title} {date} </Link> 
              <Link to={{pathname: "/edit", state:{event: props.event}}}>
                <i className="edit alternate outline icon" style={{color:"blue", marginLeft: "7px"}}></i>
              </Link> 
              <i className="trash alternate outline icon" style={{color:"red", marginLeft: "7px"}} onClick={() => props.clickHander(id)}></i>
              
            </div>
            <div>{location}</div>
            <div>{weather}</div>
        </div>
    </div>
  );
};

export default EventCard;