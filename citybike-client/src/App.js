import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L from 'leaflet'

const bicycleMarker = L.icon({
  iconUrl: require('./assets/bicycle.svg'),
  iconRetinaUrl: require('./assets/bicycle.svg'),
  iconSize: [25, 41]
})

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:4001",
      lat: 25.761681,
      lng: -80.191788,
      zoom: 14,
      bikesInMiami: null,
      history: [],
      static: false,
      bikesInMiamiStatic: null,
      staticIndex: 0
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on('bikesApi', data => {
      const newHistory = this.state.history
      newHistory.push(data)
      this.setState({ bikesInMiami: data, history: newHistory });
    });

  }

  getBicycleMarkers = () => {
    const staticIndex = this.state.staticIndex
    const bicycles = this.state.static ? this.state.history[staticIndex] : this.state.bikesInMiami
    if (bicycles) {
      var bikeMarkers = bicycles.network.stations.map(
        (marker, index) => {
          return (
            <div key={`marker_container_${marker.id}`}>
              <Marker key={`marker_${marker.id}`} position={[marker.latitude, marker.longitude]} icon={bicycleMarker}>
                <Popup>
                  <div><strong>{marker.extra.address}</strong></div>
                  <div>Free bikes: {marker.free_bikes}</div>
                </Popup>
              </Marker>
            </div>
          );
        },
      );
      return bikeMarkers;
    }
  };

  getHistory = () => {
    const history = this.state.history
    const historyButtons = history.map((point, index) => {
      return (
        <button key={index} onClick={() => this.handleClick(index)}>{index + 1}</button>
      )
    })
    return historyButtons
  }

  continueButton = () => {
    if (this.state.static) {
      const currentIndex = this.state.staticIndex
      return (
        <>
          <p>Showing status in <strong>{currentIndex + 1}</strong></p>
          <button onClick={this.handleContinueClick}>Continue in real time</button>
        </>
      )
    } else {
      return (
        <p>Showing real time status</p>
      )
    }
  }

  handleClick = (index) => {
    this.setState({ static: true, staticIndex: index })
  }

  handleContinueClick = () => {
    this.setState({ static: false })
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    return (
      <>
        <div className="map">
          <h1> City Bikes in Miami </h1>
          <Map center={position} zoom={this.state.zoom}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {this.getBicycleMarkers()}
          </Map>
        </div>
        <div>
          <h1>Change history</h1>
          {this.getHistory()}
          <br />
          {this.continueButton()}
        </div>
      </>
    );
  }
}
export default App;
