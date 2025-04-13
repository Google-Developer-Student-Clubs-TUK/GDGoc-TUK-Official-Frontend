import React from "react";
import { useState } from "react";
import VolunteerItem from "./VolunteerItem";
import VolunteerModal from "./VolunteerModal";

import { dummyVolunteers, Volunteer } from "../../_constants/volunteerData";

const VolunteerList = () => {
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null);

  const handleClick = (volunteer: Volunteer) => {
    setSelectedVolunteer(volunteer);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 ">
      {dummyVolunteers.map((volunteer) => (
        <div key={volunteer.id} onClick={() => handleClick(volunteer)}>
          <VolunteerItem {...volunteer} />
        </div>
      ))}

      {selectedVolunteer && (
        <VolunteerModal
          volunteer={selectedVolunteer}
          onClose={() => setSelectedVolunteer(null)}
        />
      )}
    </div>
  );
};

export default VolunteerList;