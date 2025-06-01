import React, { useEffect } from "react";
import { useState } from "react";
import VolunteerItem from "./VolunteerItem";
import VolunteerModal from "./VolunteerModal";
import { useQuery } from "@tanstack/react-query";
import { applicantsApi } from "../../_api";
import Pagination from "../Pagination";
import { VolunteerItemType } from "./_type/volunteer";

const VolunteerList = () => {
  const [selectedVolunteer, setSelectedVolunteer] =
    useState<VolunteerItemType | null>(null);

  const [volunteerList, setVolunteerList] = useState<
    VolunteerItemType[] | null
  >(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const handleClick = (volunteer: VolunteerItemType) => {
    setSelectedVolunteer(volunteer);
  };

  const { data } = useQuery({
    queryKey: ["applicants", currentPage],
    queryFn: () =>
      applicantsApi({
        page: currentPage - 1,
        size: 4,
      }),
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      setTotalPage(data.data.totalPage);
      setCurrentPage(data.data.currentPage + 1);
      setVolunteerList(data.data.applicants);
    }
  }, [data]);

  return (
    <div>
      <p className="mb-6 text-white text-lg">
        총 <span className="text-[#FFBA00] font-bold">134명</span>
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 ">
        {volunteerList?.map((volunteer: VolunteerItemType) => (
          <div
            key={volunteer.applicantId}
            onClick={() => handleClick(volunteer)}
          >
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
      <div className="flex gap-2 justify-center">
        <Pagination
          totalPage={totalPage}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default VolunteerList;
