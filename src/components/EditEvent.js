import React from "react";

class EditEvent extends React.Component {
  constructor(props) {
    super(props);
    const { id, title, date, location, weather } = props.location.state.event;
    this.state = {
      id,
      title,
      date,
      location,
      weather
    };
  }

  update = (e) => {
    e.preventDefault();
    if (this.state.title === "" || this.state.date === "" || this.state.location === "") {
      alert("Wszystkie pola są obowiązkowe.");
      return;
    };

    this.props.updateEventHandler(this.state).then(() => this.props.history.push("/"));
  };
  
  render() {
    return (
      <div className="ui main">
        <h2 style={{ marginTop: "15px" }}>Edytuj spotkanie</h2>
        <form className="ui form" onSubmit={this.update}>
          <div className="field">
            <label>Tytuł</label>
            <input type="text" name="title" placeholder="Tytuł" value={this.state.title} onChange={ (e) => this.setState({title: e.target.value})}/>
          </div>
          <div className="field">
            <label>Data</label>
            <input type="text" name="date" placeholder="Data" value={this.state.date} onChange={ (e) => this.setState({date: e.target.value})}/>
          </div>
          <div className="field">
            <label>Lokalizacja</label>
            <input type="text" name="location" placeholder="Lokalizacja" value={this.state.location} onChange={ (e) => this.setState({location: e.target.value})}/>
          </div>
          <button className="ui button green">Akceptuj zmiany</button>
        </form>
      </div>
    );
  }
}

export default EditEvent;
