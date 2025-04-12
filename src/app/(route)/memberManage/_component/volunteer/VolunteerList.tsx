import React from "react";
import VolunteerItem from "./VolunteerItem";

import { dummyVolunteers } from "../../_constants/volunteerData";

const VolunteerList = () => {
  return (
    <div className="flex flex-wrap justify-between gap-4 w-full">
      {dummyVolunteers.map((volunteer) => (
        <VolunteerItem key={volunteer.id} {...volunteer} />
      ))}
    </div>
  );
};

export default VolunteerList;