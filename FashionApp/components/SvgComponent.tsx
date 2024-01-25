import * as React from 'react';
// import Svg, {Circle} from 'react-native-svg';
import Svg, {G, Defs, Path, Circle} from 'react-native-svg';

const SvgComponent = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-0.704 168.231 502.384 176.009"
    style={{
      position: 'absolute',
      height: 150,
      width: 400,
      bottom: -50,
      left: 0,
    }}
    {...props}>
    <Path
      d="M500.612 339.041.332 341.349l.436-171.007 217.344 2.245c15.863 5.019 16.68 28.19 40.57 28.355 23.891.165 27.865-25.169 37.292-26.793 9.427-1.624 203.648-3.411 203.611-3.897l1.027 168.789Z"
      stroke="#fff"
      fill="#fff"
      fillOpacity="1"
      fillRule="nonzero"
      strokeWidth="2"
    />
  </Svg>
  //   <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" {...props}>
  //     <G id="SVGRepo_iconCarrier">
  //       <Defs></Defs>
  //       <G id="Search">
  //         <Path d="M24 32h-1v-4h1z" className="cls-1" />
  //         <Path
  //           d="M24 28h2v4h-2z"
  //           style={{
  //             fill: '#a4b0c0',
  //           }}
  //           transform="rotate(180 25 30)"
  //         />
  //         <Path
  //           d="M24.5 32a2.5 2.5 0 0 1 2.5 2.5V47a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V34.5a2.5 2.5 0 0 1 2.5-2.5Z"
  //           style={{
  //             fill: '#4c5665',
  //           }}
  //           transform="rotate(180 24.5 40)"
  //         />
  //         <Circle cx={25} cy={15} r={15} className="cls-1" />
  //         <Circle
  //           cx={25}
  //           cy={15}
  //           r={13}
  //           style={{
  //             fill: '#49aaee',
  //           }}
  //         />
  //         <Path
  //           d="M15.5 16.5a1 1 0 0 1-1-1A10.512 10.512 0 0 1 25 5a1 1 0 0 1 0 2 8.51 8.51 0 0 0-8.5 8.5 1 1 0 0 1-1 1Z"
  //           style={{
  //             fill: '#3398d6',
  //           }}
  //         />
  //       </G>
  //     </G>
  //   </Svg>
);
export default SvgComponent;
