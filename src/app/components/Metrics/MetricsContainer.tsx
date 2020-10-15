import React, { ReactElement, useState } from 'react';
import { ParentSize } from '@vx/responsive';
import {componentAtomTree} from '../../../types';
import IcicleVertical from './IcicleVertical.js';
import RankedGraph from './RankedGraph';

interface MetricsProps {
  cleanedComponentAtomTree: componentAtomTree;
}

interface hierarchyNode {
  children: hierarchyNode;
  data: componentAtomTree;
  depth: number;
  height: number;
  parent: hierarchyNode;
  value: number;
  x0: number;
  x1: number;
  y0: number;
  y1: number;
}


const Metrics: React.FC<MetricsProps> = ({cleanedComponentAtomTree}) => {
  //create state for the graph type toggle
  const [graphType, setGraphType] = useState<boolean>(true);

  const toggleGraphFunc = (ranked:boolean): void => {
    ranked ? setGraphType(false) : setGraphType(true);
  };

  const determineRender: any = () => {
    if(graphType){
      return(
        <ParentSize>
          {size =>
            size.ref &&
            <IcicleVertical cleanedComponentAtomTree={cleanedComponentAtomTree} width={size.width} height={600} />
          }
        </ParentSize>
      );
    }
    else{
      return(
        //return the bar graph component
        <RankedGraph cleanedComponentAtomTree={cleanedComponentAtomTree}/>
      );
    }
  }
  
  return (
    <div>
      <div data-testid="canvas" className="graphContainer">
        <button
          className="graphButton"
          autoFocus={true}
          onClick={() => {
            toggleGraphFunc(false);
          }}>
          Flame Graph
        </button>
        <button
          className="graphButton"
          onClick={() => {
            toggleGraphFunc(true);
          }}>
          Ranked Graph
        </button>
      </div>
      {determineRender()}
    </div>
  );
}


export default Metrics;