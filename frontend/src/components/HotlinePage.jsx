import Navbar from "./shared/Navbar";

const HotlinePage = () => {
  return (
    <div>
      <Navbar />
      <div className="p-8">
        {/* Add an image here */}
        <img
          src="https://via.placeholder.com/600x200.png?text=Hotline+Information" // Replace this with your image URL
          alt="Hotline Information"
          className="w-full mb-4 rounded"
        />
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
    </div>
  );
};

export default HotlinePage;
