import styled, { keyframes } from "styled-components";
import { isMobile } from "react-device-detect";


const Chart = styled.div`
width: ${({ size }) => size};
height: ${({ size }) => size};
position: relative;
margin-bottom:20px;
`;

const AniSvg = styled.svg`
position: relative;
padding:${(isMobile ? '0 4px' : '0 15px')};
`;

const circleFill = keyframes`
  0%{
      stroke-dasharray:0 ${2 * Math.PI * 90};
  }
`;

const AnimatedCircle = styled.circle`
animation: ${circleFill} 2s ease;
`;

const Percent = styled.span`
position: absolute;
top:0;
left:0;
width:100%;
height:100%;
display:flex;
justify-content:center;
align-items:center;
font-size: 0.8vw;
font-family:"GongGothicLight";
text-align:center;
color: #664498;
`;

function DountChart({ color, percent, size, name }) {
  return (
    <Chart size={size}>
      <AniSvg viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r="75"
          fill="none"
          stroke="#ebebeb"
          strokeWidth="50"
        />
        <AnimatedCircle
          cx="100"
          cy="100"
          r="75"
          fill="none"
          stroke={color}
          strokeWidth="50"
          strokeDasharray={`${2 * Math.PI * 90 * percent} ${
            2 * Math.PI * 90 * (1 - percent)
          }`}
          strokeDashoffset={Math.PI * 90 * 0.75}
        />
      </AniSvg>
      <Percent color={color}>{percent * 100}%<br/>{name}</Percent>
    </Chart>
  );
}

export default DountChart;


