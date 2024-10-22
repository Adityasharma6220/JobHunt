import { useState } from 'react';
import Navbar from './shared/Navbar';

const JobMapComponent = () => {
  const [location, setLocation] = useState('');
  const [mapSrc, setMapSrc] = useState('https://maps.google.com/maps?width=600&height=400&hl=en&q=noida sector 62&t=&z=14&ie=UTF8&iwloc=B&output=embed');

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const fetchLocation = () => {
    if (!location) return;

    // Update the iframe source to show the entered location
    const encodedLocation = encodeURIComponent(location);
    setMapSrc(`https://maps.google.com/maps?width=600&height=400&hl=en&q=${encodedLocation}&t=&z=14&ie=UTF8&iwloc=B&output=embed`);
  };

  return (
    <div>
      <Navbar />
      <div className="p-8 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Job Search Map</h2>

      
        <div className="mb-4 text-center">
          <h3 className="mb-2">Enter your location</h3>
          <input
            type="text"
            value={location}
            onChange={handleLocationChange}
            placeholder="Enter location"
            className="border p-2 mb-2 w-full max-w-xs" 
          />
          <button onClick={fetchLocation} className="bg-blue-500 text-white p-2 rounded">
            Find Location
          </button>
        </div>

        <div className="relative w-full">
          <div className="mapouter">
            <div className="gmap_canvas">
              <iframe
                className="gmap_iframe"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src={mapSrc}
                style={{ width: '100%', height: '500px', border: 0 }} // Increased height for the map
              />
              <a href="https://embed-googlemap.com">embed google map</a>
            </div>
            <style>{`
              .mapouter { position: relative; text-align: right; width: 100%; height: 500px; }
              .gmap_canvas { overflow: hidden; background: none !important; width: 100%; height: 500px; }
              .gmap_iframe { width: 100% !important; height: 500px !important; }
            `}</style>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobMapComponent;
