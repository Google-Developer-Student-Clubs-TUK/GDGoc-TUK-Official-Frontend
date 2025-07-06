import React from "react";
import styled from "styled-components";

interface ActivityItemProps {
  title: string;
  img: string;
}

const ActivityItem = ({ title, img }: ActivityItemProps) => {
  return (
    <ActivityItemContainer $img={img}>
      <div className="text-white ">
        <p className="text-xl font-bold">{title}</p>
      </div>
    </ActivityItemContainer>
  );
};

export default ActivityItem;

const ActivityItemContainer = styled.div<{
  $img: string;
}>`
  width: 100%;
  height: 286px;
  padding: 20px;
  flex-shrink: 0;
  border: 1px solid var(--gray-400);

  border-radius: 12px;
  background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.6) 100%),
    url(${(props) => props.$img});
  display: flex;
  align-items: end;
  
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
