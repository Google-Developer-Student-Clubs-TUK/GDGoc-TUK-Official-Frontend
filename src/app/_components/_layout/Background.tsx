import React from "react";
import styled, { css } from "styled-components";

const Background = ({
  img,
  opacity,
  main = false,
}: {
  img: string;
  opacity: number;
  main?: boolean;
}) => {
  return <BackgroundContainer opacity={opacity} img={img} $main={main} />;
};

export default Background;

const BackgroundContainer = styled.div<{
  img: string;
  opacity: number;
  $main: boolean;
}>`
  position: fixed;
  inset: 0;
  z-index: 1;
  opacity: ${(props) => props.opacity};

  background-image: ${(props) =>
    props.$main
      ? `linear-gradient(180deg, rgba(46, 46, 46, 0.3) 0%, #2e2e2e 100%), url(${props.img})`
      : `linear-gradient(270deg, rgba(46, 46, 46, 0.8) 0%, #2e2e2e 73.67%), url(${props.img})`};

  ${(props) =>
    props.$main &&
    css`
      backdrop-filter: blur(2px);
    `}

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
