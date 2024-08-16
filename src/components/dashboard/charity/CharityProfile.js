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
    <div>
      <h1>Charity Profile</h1>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleInputChange}
          placeholder="Charity Name"
        />
      </div>
      <div>
        <label>Mission:</label>
        <textarea
          name="mission"
          value={profile.mission}
          onChange={handleInputChange}
          placeholder="Mission"
        />
      </div>
      <div>
        <label>Contact:</label>
        <input
          type="text"
          name="contact"
          value={profile.contact}
          onChange={handleInputChange}
          placeholder="Contact"
        />
      </div>
      <div>
        <label>Goal:</label>
        <input
          type="number"
          name="goal"
          value={profile.goal}
          onChange={handleInputChange}
          placeholder="Goal"
        />
      </div>
      <div>
        <label>Raised:</label>
        <input type="number" name="raised" value={profile.raised} readOnly />
      </div>
      <button onClick={saveProfile}>Save Profile</button>
      <h2>Progress</h2>
      <p>
        {((profile.raised / profile.goal) * 100).toFixed(2)}% of goal reached
      </p>
    </div>
  );
};

export default CharityProfile;
