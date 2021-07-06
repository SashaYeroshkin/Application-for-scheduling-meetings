import React, { useState, useEffect } from "react"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import { uuid } from 'uuidv4';
import './App.css';
import AddEvent from "./AddEvent";
import EditEvent from "./EditEvent";
import EventList from "./EventList";
import EventDetail from "./EventDetail";
import api from "../api/weatherAPI";

function App() {
  const LOCAL_STORAGE_KEY = "events";
  const[events, setEvents] = useState([]);
  const[searchTerm, setSearchTerm] = useState("");
  const[searchResults, setSearchResults] = useState([]);

  //WeatherAPI
  const retrieveWeather = async (location) => {
    const response = await api.get("/weather?q=" + location + "&APPID=b18208bb812e46bfe7f94f229f593db9");
    return response.data;
  };

  const addEventHandler = (event) => {
    const setEvent = async() => {
      const weatherValue = await retrieveWeather(event.location);
      setEvents([...events, {id: uuid(), weather: Math.round((weatherValue.main.temp - 273.15)*100)/100 + "'C", ...event}]);
    }

    return setEvent()
  };

  const updateEventHandler = (updatedEvent) => {
    const setEvent = async() => {
      const weatherValue = await retrieveWeather(updatedEvent.location);
      
      const { id, title, date, location, weather} = updatedEvent;
      setEvents(
        events.map((event) => 
          event.id === id ? {id: id, title: title, date: date, location: location, weather: Math.round((weatherValue.main.temp - 273.15)*100)/100 + "'C"} : event
        )
      )
    }

    return setEvent()
  }

  const removeEventHandler = (id) => {
    const newEventList = events.filter((event) => {
      return event.id !== id;
    });

    setEvents(newEventList);
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);

    if (searchTerm !== "") {
      const newEventList = events.filter((event) => {
        return Object.values(event).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
      })
      setSearchResults(newEventList);
    } else {
      setSearchResults(events);
    }
  }

  useEffect(() => {
    const retriveEvents = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retriveEvents) 
      setEvents(retriveEvents);
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(events));
  }, [events])

  return (
      <div className="ui container">
        <Router>
          <Switch>
            <Route path="/" exact render={(props) => ( <EventList {...props} events={searchTerm.length < 1 ? events : searchResults} getEventId={removeEventHandler} term={searchTerm} searchKeyword={searchHandler}/> )} /> 
            <Route path="/add" render={(props) => ( <AddEvent {...props} addEventHandler={addEventHandler} /> )} />
            <Route path="/edit" render={(props) => ( <EditEvent {...props} updateEventHandler={updateEventHandler} /> )} />
            <Route path="/event/:id" component={EventDetail} />
          </Switch>
        </Router>
      </div>
  );
}

export default App;
