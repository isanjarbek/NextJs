import mapboxgl from "mapbox-gl";
import { useState, useEffect, useRef } from "react";
import { locationData } from "../constants/map";

import styles from "../styles/Home.module.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaXNtb25zYW5qYXIiLCJhIjoiY2wyOHRqazVsMGNzeDNlcDF5OXZscWNpYSJ9.p9yeEQUgJis-43VOykElpg";

export default function Home() {
  const map = useRef(null);
  const mapContainer = useRef(null);
  const [values, setValues] = useState("");

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      zoom: 12,
      center: [69.28, 41.31],
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({ showCompass: false, showZoom: false })
    );

    // map.addControl(
    //   new MapboxDirections({
    //     accessToken: mapboxgl.accessToken,
    //   }),
    //   "top-left"
    // );

    locationData.forEach((i) => {
      let marker = new mapboxgl.Marker({ color: "#ff0000" })
        .setLngLat(i.coordinates)
        // .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(i.location))
        .addTo(map.current);

      marker.getElement().addEventListener("click", () => {
        setValues(i.location);
      });
    });
  }, []);

  const handleZoomIn = () => {
    map.current.zoomIn();
  };
  const handleZoomOut = () => {
    map.current.zoomOut();
  };

  console.log("values", values);

  return (
    <div className={styles.container}>
      <button onClick={handleZoomIn}>ZOOM IN</button>
      <button onClick={handleZoomOut}>ZOOM OUT</button>
      <h2>Location: {values}</h2>
      <div ref={mapContainer} className={styles.map}></div>
    </div>
  );
}
