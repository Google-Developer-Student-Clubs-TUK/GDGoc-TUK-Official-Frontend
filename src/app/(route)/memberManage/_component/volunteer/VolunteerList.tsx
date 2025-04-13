import React from "react";
import VolunteerItem from "./VolunteerItem";

import { dummyVolunteers } from "../../_constants/volunteerData";

const VolunteerList = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 ">
      {dummyVolunteers.map((volunteer) => (
        <VolunteerItem key={volunteer.id} {...volunteer} />
      ))}
    </div>
  );
};

export default VolunteerList;