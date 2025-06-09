import React from "react";
import styled, { css, keyframes } from "styled-components";
import { useInView } from "react-intersection-observer";

interface SlideInProps {
  direction: "left" | "right";
  children: React.ReactNode;
}

const SlideIn = ({ direction, children }: SlideInProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <Wrapper ref={ref} $inView={inView} $direction={direction}>
      {children}
    </Wrapper>
  );
};

export default SlideIn;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-300px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(300px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const Wrapper = styled.div<{
  $inView: boolean;
  $direction: "left" | "right";
}>`
  opacity: 0;
  width: 100%;
  max-width: 1800px;
  padding: 0 40px;
  
  transform: translateX(
    ${(props) => (props.$direction === "left" ? "-100px" : "100px")}
  );
  transition: opacity 3s ease, transform 3s ease;

  ${(props) =>
    props.$inView &&
    css`
      animation: ${props.$direction === "left" ? slideInLeft : slideInRight} 3s
        ease forwards;
    `}
`;
