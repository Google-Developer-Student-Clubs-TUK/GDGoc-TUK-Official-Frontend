import React from "react";
import styled from "styled-components";

interface ActivityItemProps {
  date: string;
  title: string;
  img: string;
}

const ActivityItem = ({ date, title, img }: ActivityItemProps) => {
  return (
    <ActivityItemContainer $img={img}>
      <div className="grid gap-1 text-white ">
        <p className="text-base">{date}</p>
        <p className="text-xl font-bold">{title}</p>
      </div>
    </ActivityItemContainer>
  );
};

export default ActivityItem;

const ActivityItemContainer = styled.div<{
  $img: string;
}>`
  width: 560px;
  height: 286px;
  padding: 20px;
  flex-shrink: 0;
  border: 1px solid #444;
  border-radius: 12px;
  background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, #2e2e2e 100%),
    url(${(props) => props.$img});
  display: flex;
  align-items: end;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
