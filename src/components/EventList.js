import React, { useRef } from "react";
import { Link } from "react-router-dom" 
import EventCard from "./EventCard";

const EventList = (props) => {
    const inputRef = useRef("");

    const deleteConactHandler = (id) => {
        props.getEventId(id);
    };

    const renderEventList = props.events.map((event) => {
        return (
            <EventCard event={event} clickHander={deleteConactHandler} key={event.id}/>
        );
    })

    const getSearchTerm = () => {
        props.searchKeyword(inputRef.current.value);
    }

    return (
        <div className="main">
            <h2 style={{marginTop: "15px"}}>
                Spotkania
                <Link to="/add"><button className="ui button green" style={{ marginLeft: "10px" }}> Dodać nowe spotkanie</button></Link>
            </h2>

            <div className="ui search">
                <div className="ui icon input">
                    <input className="prompt" ref={inputRef} type="text" placeholder="Wyszukaj spotkanie" className="prompt" value={props.term} onChange={getSearchTerm}/>
                    <i className="search icon" />
                </div>
            </div>

            <div className="ui celled list"> {renderEventList.length > 0 ? renderEventList : "Nieznałeziono żadnego spotkania."} </div>
        </div>
    );
};

export default EventList;