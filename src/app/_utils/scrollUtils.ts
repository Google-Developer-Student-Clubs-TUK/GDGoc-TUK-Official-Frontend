// opacity 감소 
export const setOpacityDown= (scrollY: number) => {
  return  Math.max(1 - scrollY * 0.002, 0); 
}

// scale 감소 
export const setScaleDown= (scrollY: number) => {
  return  Math.max(1 - scrollY * 0.002, 0.5); 
}


// opacity 증가
export const setOpacityUp= (scrollY: number) => {
  return  Math.min(scrollY * 0.0015, 1);

}

// scale 증가
export const setScaleUp= (scrollY: number) => {
  return Math.min(scrollY * 0.0015, 1);
}


// section 시작 위치 계산
export const calculateAdjustedScroll = (scrollY: number, windowHeight: number) => {
  return Math.max(scrollY - windowHeight, 0);
};


