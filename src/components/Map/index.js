import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import mapboxgl from "mapbox-gl";
import CenterImage from "@assets/images/center.png";
import { addressData, regionData } from "@constants/map";
import { LocationIcon, ZoomInIcon, ZoomOutIcon } from "@constants/icons";

import styles from "../../styles/Home.module.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaXNtb25zYW5qYXIiLCJhIjoiY2wyOHRqazVsMGNzeDNlcDF5OXZscWNpYSJ9.p9yeEQUgJis-43VOykElpg";

export default function MapExample() {
  const map = useRef(null);
  const mapContainer = useRef(null);
  const [values, setValues] = useState("");
  const [open, setOpen] = useState(false);

  const [selectRegion, setSelectRegion] = useState("Select region");

  const handleZoomIn = () => {
    map.current.zoomIn();
  };
  const handleZoomOut = () => {
    map.current.zoomOut();
  };

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

    // const directions = new MapboxDirections({
    //   accessToken: mapboxgl.accessToken,
    //   unit: "metric",
    //   profile: "mapbox/driving",
    // });

    addressData.forEach((i) => {
      let marker = new mapboxgl.Marker({ color: "#ff0000" })
        .setLngLat(i?.coordinates)
        .addTo(map.current);

      marker.getElement().addEventListener("click", () => {
        setValues(i);
      });
    });
  }, []);

  const handleValue = (e, coordinate) => {
    map.current.setCenter(coordinate);
    setSelectRegion(e.target.textContent);
    setOpen(false);
  };

  return (
    <div>
      <div className={styles.container}>
        <div style={{ position: "relative" }}>
          <div ref={mapContainer} className={styles.map}></div>
          <div className={styles.tab}>
            <div className={styles.dropdown}>
              <div
                className={styles.dropdown_box}
                onClick={() => setOpen(!open)}
              >
                {selectRegion}
              </div>
              {open && (
                <div className={styles.options}>
                  {regionData.map((i, index) => (
                    <div key={index} className={styles.option}>
                      <span
                        className={styles.option_value}
                        onClick={(e) => handleValue(e, i.coordinates)}
                      >
                        {i.region}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <ZoomInIcon onClick={handleZoomIn} className={styles.icon} />
            <ZoomOutIcon onClick={handleZoomOut} className={styles.icon} />
            <div className={styles.route}>
              {/* <RouteIcon /> */}
              <span>Build route</span>
            </div>
          </div>
        </div>
      </div>
      {values && (
        <>
          <h2 className={styles.title}>Головной офис</h2>
          <div className={styles.mapData}>
            <Image src={CenterImage} width={440} height={510} alt="" />
            <div>
              <h3>
                <LocationIcon /> {values.location}
              </h3>
              <p>{values.landMark}</p>
              <p>{values.phoneNumber}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
