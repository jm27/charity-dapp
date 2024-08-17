import { useState, useEffect } from "react";

const CharityProfile = () => {
  const [charityPublicKey] = useState("");
  const [profile, setProfile] = useState({
    name: "",
    mission: "",
    contact: "",
    goal: 0,
    raised: 0,
  });

  useEffect(() => {
    const fetchProfile = async (charityPublicKey) => {
      const mockProfile = {
        name: "Charity Name",
        mission: "Our mission is to help those in need.",
        contact: "contact@charity.org",
        goal: 1000,
        raised: 200, // This should be fetched from the Stellar transactions
      };
      setProfile(mockProfile);
    };
    fetchProfile(charityPublicKey);
  }, [charityPublicKey]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const saveProfile = () => {
    // Save profile to blockchain
    console.log("Saving profile to blockchain", profile);
    // Save profile to local storage
    const charityProfile =
      JSON.parse(localStorage.getItem("charityProfile")) || {};
    // Merge the new profile with the existing profile
    // check if public key from charity matches the public key in local storage
    // link the two profiles
    const updatedProfile = { ...charityProfile, ...profile };
    localStorage.setItem("charityProfile", JSON.stringify(updatedProfile));
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Charity Profile</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleInputChange}
            placeholder="Charity Name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mission:
          </label>
          <textarea
            name="mission"
            value={profile.mission}
            onChange={handleInputChange}
            placeholder="Mission"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contact:
          </label>
          <input
            type="text"
            name="contact"
            value={profile.contact}
            onChange={handleInputChange}
            placeholder="Contact"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Goal:
          </label>
          <input
            type="number"
            name="goal"
            value={profile.goal}
            onChange={handleInputChange}
            placeholder="Goal"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image URL:
          </label>
          <input
            type="text"
            name="image"
            value={profile.image || ""}
            onChange={handleInputChange}
            placeholder="Image URL"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Raised:
          </label>
          <input
            type="number"
            name="raised"
            value={profile.raised}
            readOnly
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          onClick={saveProfile}
          className="mt-3 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Profile
        </button>
      </div>
      <h2 className="mt-8 text-xl font-semibold text-gray-900">Progress</h2>
      <p className="text-gray-700">
        {((profile.raised / profile.goal) * 100).toFixed(2)}% of goal reached
      </p>
    </div>
  );
};

export default CharityProfile;
