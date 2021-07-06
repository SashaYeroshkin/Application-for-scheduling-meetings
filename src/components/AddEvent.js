import React from "react";

class AddEvent extends React.Component {
  state = {
    title: "",
    date: "",
    location: "",
    weather: ""
  };

  add = (e) => {
    e.preventDefault();
    if (this.state.title === "" || this.state.date === "" || this.state.location === "") {
      alert("Wszystkie pola są obowiązkowe.");
      return;
    };

    // this.state.weather = this.props.retrieveWeather(this.state.location);

    this.props.addEventHandler(this.state).then(() => this.props.history.push("/"))
    // this.setState({ title: "", date: "", location: "" });
    // this.props.history.push("/")
  };
  render() {
    return (
      <div className="ui main">
        <h2 style={{ marginTop: "15px" }}>Dodać nowe spotkanie</h2>
        <form className="ui form" onSubmit={this.add}>
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
          <button className="ui button green">Dodać</button>
        </form>
      </div>
    );
  }
}

export default AddEvent;
