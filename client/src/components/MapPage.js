
import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from "leaflet";
import MyActivities from './MyActivities';



function MapPage({ locations, events, activities, addToMyActivities, renderEventDateDay }) {

  const [currentLocation, setCurrentLocation] = useState(null);
  // const [activities, setActivities] = useState([]);
  const [joinedEvent, setJoinedEvent] = useState(false);

 function toggleJoinedEvent(){
  setJoinedEvent(joinedEvent => !joinedEvent);
 }

  const handleMarkerClick = (location) => {
    setCurrentLocation(location);
  };


  const markers = locations.map(location => ({
    geocode: [location.lat, location.long],
    popup: location.name,
    img: location.img,
    address: location.address,
    events: events.filter(event => event.location_id === location.id),
    locationType: location.location_type
  }))

  const getMarkerIcon = (locationType) => {
    switch (locationType) {
      case 'Football':
        return new Icon({
          iconUrl: 'images/football.png',
          iconSize: [34, 34],
        });
      case 'Soccer':
        return new Icon({
          iconUrl: 'images/Soccer.png',
          iconSize: [34, 34],
        });
      case 'Bicycle':
        return new Icon({
          iconUrl: 'images/bike.png',
          iconSize: [34, 34],
        });
      case 'Chess':
        return new Icon({
          iconUrl: 'images/chess.png',
          iconSize: [34, 34],
        });
      case 'Books':
        return new Icon({
          iconUrl: 'images/books.png',
          iconSize: [34, 34],
        });
      case 'Game':
        return new Icon({
          iconUrl: 'images/game.png',
          iconSize: [34, 34],
        });
      case 'Home1':
        return new Icon({
          iconUrl: 'images/home1.png',
          iconSize: [34, 34],
        });
      case 'Home2':
        return new Icon({
          iconUrl: 'images/home2.png',
          iconSize: [34, 34],
        });
      case 'Basketball':
        return new Icon({
          iconUrl: 'images/basketball.png',
          iconSize: [34, 34],
        });
      default:
        return new Icon({
          iconUrl: 'images/home1.png',
          iconSize: [34, 34],
        });
    }
  };



  return (
    <div id="Home">


      <div className="" id="event-container">
        <h1 className="block-header" >Welcome to the block.</h1>
        <div className="event-wrap">
          {events.map(event => (
            <div id="event-card" className="card" key={event.id}>
              <div id="event-card-body" className="card-body">
                <h3 className="card-title">{event.title}</h3>
                {/* Access Correct Location Name by Matching Event ID */}
                <h3 className="card-text">{event.location.name}</h3>
                {/* <h3 className="card-text"> {event.name}</h3> */}
                <h4 className="card-text">{renderEventDateDay(event.date.day)} @ {event.date.time}</h4>
                <h4 className="card-text">Capacity: {event.people_needed} people</h4>
                <h4 className="card-text">Space available: {event.space_available}</h4>
                <div className="card-text">{event.description}</div>
                <button className={`btn ${activities.some((activity) => activity.id === event.id) ? 'joined-btn' : 'btn-dark'}`}
                id="event-container-btn" onClick={() => {addToMyActivities(event)}}>
                 {activities.some((activity) => activity.id === event.id)
                 ? "Joined" : "+ Join"
                 }
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>


      <div id="right-container">
        <div >
          <MapContainer className='map-container' center={[40.678177, -73.944160]} zoom={12}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />

            {markers.map(marker => (
              <Marker
                key={marker.geocode}
                position={marker.geocode}
                icon={getMarkerIcon(marker.locationType)}
                eventHandlers={{ click: () => handleMarkerClick(marker) }} >
                <Popup><h4>{marker.popup}</h4></Popup>
              </Marker>
            ))
            }

          </MapContainer>
        </div>


        <div className="container" id="location-container">
          <div className="card" id="location-card">
            <div className="card-body">
              {currentLocation && (
                <img className="card-img" id="location-card-img" src={currentLocation.img} alt="Location Image" />
              )}
              <h2>{currentLocation ? currentLocation.popup : "Event Location:"}</h2>
              <p>{currentLocation && currentLocation.address}</p>
              <div>Upcoming:</div>
              {currentLocation && currentLocation.events.map(event => (
                <div className="card" key={event.id}>
                  <div class="card-body">
                    <h3 class="card-title">{event.title}</h3>
                    <h3 class="card-text">{`${renderEventDateDay(event.date.day)} @ ${event.date.time}`}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;



{/* <div class="card">
<div class="card-body">
  <h2 class="card-title">Flag Football</h2>
  <h3 class="card-subtitle">Verrazano Sports Complex</h3>
  <h3 class="card-subtitle">08/09/23</h3>
  <div class="card-text">Join us this sunday for 4 on 4 flag football! Bring your A game and plenty of water!</div>
  <btn class="btn" id="event-container-btn">Join Activity</btn>
</div>
</div>
<div class="card">
<div class="card-body">
  <h2 class="card-title">Pickup Basketball</h2>
  <h3 class="card-subtitle">Sid Luckman Field</h3>
  <h3 class="card-subtitle">08/05/23</h3>
  <div class="card-text">Come hoop with us!</div>
  <btn class="btn" id="event-container-btn">Join Activity</btn>
</div>
</div>
<div class="card">
<div class="card-body">
  <h2 class="card-title">Cycling Group</h2>
  <h3 class="card-subtitle">Prospect Park</h3>
  <h3 class="card-subtitle">08/02/23</h3>
  <div class="card-text">Come cycle with us. Leaving bright and early</div>
  <btn class="btn" id="event-container-btn">Join Activity</btn>
</div>
</div> */}







// Original Markers
// [
//   {
//     geocode: [40.694438, -74.001049],
//     popup: "Brooklyn Bridge Park Pier 5"
//   },
//   {
//     geocode: [40.587382, -73.992417],
//     popup: "Verrazano Sports Comple"
//   },
//   {
//     geocode: [40.661041, -73.968445],
//     popup: "Prospect Park"
//   }
// ]



// Google Maps (works but funky)
// const { isLoaded } = useLoadScript({
//   googleMapsApiKey: "AIzaSyDu7dpbSGMOVSpORpahfxd3T9W3UrVkz1o",
// });
// const center = useMemo(() => ({ lat: 40.678177, lng: -73.944160 }), []);



// {!isLoaded ? (
//   <h1>Loading...</h1>
// ) : (
//   <GoogleMap
//     mapContainerClassName="map-container"
//     center={center}
//     zoom={11}
//   >
//   <Marker position={{ lat:40.694438, lng:-74.001049 }} />
//   </GoogleMap>



// )}


{/* <Marker position={{ lat: 40.694438 lng: -74.001049 }} /> */ }
