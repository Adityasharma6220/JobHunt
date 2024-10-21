import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';

const JobMapComponent = () => {
  const [location, setLocation] = useState('');
  const [societies, setSocieties] = useState([]);
  const [showHotline, setShowHotline] = useState(false); // State to toggle hotline info

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const fetchNearbySocieties = () => {
    // Call API or use geocoding service to find nearby societies
    const mockSocieties = ['Society 1', 'Society 2', 'Society 3'];
    setSocieties(mockSocieties);
  };

  const toggleHotline = () => {
    setShowHotline((prev) => !prev); // Toggle hotline information
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Job Search Map</h2>
      <button onClick={toggleHotline} className="mb-4 bg-blue-500 text-white p-2 rounded">
        {showHotline ? 'Hide Hotline Info' : 'Show Hotline Info'}
      </button>

      {showHotline ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Hotline Information</h2>
          <p className="mb-2">If you need assistance or help, please contact our hotline:</p>
          <p className="text-lg font-semibold">Helpline Number: 1800-123-4567 (Toll-Free)</p>

          <h3 className="text-xl font-semibold mt-6">IVR Menu:</h3>
          <p>Welcome to Domestic Workers' Helpline!</p>
          <p>Please select your preferred language:</p>
          <ul className="list-disc ml-6">
            <li>1. Hindi</li>
            <li>2. English</li>
            <li>3. Tamil</li>
            <li>4. Telugu</li>
            <li>5. Marathi</li>
            <li>6. Other (Please hold for assistance)</li>
          </ul>

          <h3 className="text-xl font-semibold mt-4">Language Selection:</h3>
          <p>(Example: Press 1 for Hindi)</p>

          <h3 className="text-xl font-semibold mt-4">Profession Selection:</h3>
          <p>Thank you for selecting your language. Please choose your profession:</p>
          <ul className="list-disc ml-6">
            <li>1. Housekeeper</li>
            <li>2. Nanny/Caregiver</li>
            <li>3. Cook</li>
            <li>4. Driver</li>
            <li>5. Elderly Care</li>
            <li>6. Other Domestic Worker</li>
            <li>7. Employer (Seeking Domestic Staff)</li>
          </ul>

          <h3 className="text-xl font-semibold mt-4">Profession-Specific Menu:</h3>
          <p>(Example: Press 1 for Housekeeper)</p>

          <h3 className="text-xl font-semibold mt-4">Housekeeper Menu:</h3>
          <ul className="list-disc ml-6">
            <li>1. Job Search Assistance</li>
            <li>2. Salary Negotiation</li>
            <li>3. Workplace Issue Resolution</li>
            <li>4. Training and Upskilling</li>
            <li>5. Speak to a Counselor</li>
          </ul>

          <h3 className="text-xl font-semibold mt-4">Example Call Flow:</h3>
          <ol className="list-decimal ml-6">
            <li>Caller dials 1800-123-4567</li>
            <li>Selects language (e.g., Hindi)</li>
            <li>Selects profession (e.g., Housekeeper)</li>
            <li>Chooses specific option (e.g., Job Search Assistance)</li>
            <li>Connected to relevant expert/advisor</li>
          </ol>

          <h3 className="text-xl font-semibold mt-4">Additional Options:</h3>
          <ul className="list-disc ml-6">
            <li>Press 0 to speak to a representative</li>
            <li>Press 9 to repeat the menu</li>
            <li>Press # to exit</li>
          </ul>
        </div>
      ) : (
        <div className="flex">
          <div className="w-2/3">
            <MapContainer center={[19.98424, 78.91625]} zoom={14} style={{ height: '500px', width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[19.98424, 78.91625]} />
            </MapContainer>
          </div>

          <div className="w-1/3 p-4">
            <h3>Enter your location</h3>
            <input
              type="text"
              value={location}
              onChange={handleLocationChange}
              placeholder="Enter location"
              className="border p-2 mb-2 w-full"
            />
            <button onClick={fetchNearbySocieties} className="bg-blue-500 text-white p-2 rounded">
              Find Nearby Societies
            </button>

            {societies.length > 0 && (
              <ul className="mt-4">
                {societies.map((society, index) => (
                  <li key={index} className="p-2 border-b">
                    {society}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobMapComponent;
