import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import styles from "../styles/Home.module.css";
import { locationData } from "../constants/map";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaXNtb25zYW5qYXIiLCJhIjoiY2wyOHRqazVsMGNzeDNlcDF5OXZscWNpYSJ9.p9yeEQUgJis-43VOykElpg";

export default function Home() {
  const mapRef = useRef();

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      zoom: 12,
      center: [69.26667, 41.31],
    });
    map.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      "bottom-right"
    );
    // map.doubleClickZoom.disable();

    locationData.forEach((i) => {
      let marker = new mapboxgl.Marker({ color: "#ff0000" })
        .setLngLat(i.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(i.location))

        .addTo(map);
    });

    mapboxgl.Marker.prototype.getPopup = function () {
      console.log("ref", mapRef.current);
    };
  }, []);

  const handleZoom = () => {
    // mapRef.current.zoomIn();
  };

  return (
    <div className={styles.mapContainer}>
      <button onClick={() => handleZoom()}>ZOOM +</button>
      <div id="map" className={styles.map}></div>
      <div className="popup" ref={mapRef}>
        <h3>TITLE</h3>
        {}
      </div>
    </div>
  );
}
