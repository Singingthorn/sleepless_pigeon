import React from 'react';
import ReactEcharts, { EventMap } from 'echarts-for-react';


interface chartProps {
  style?: object,
  onMainEvents?: EventMap,
  mainOption?: object,
  onAssistantEvents?: EventMap,
  assistantOption?: object,
}

export default function Charts(props: chartProps) {
  const { mainOption = {}, onMainEvents, style, assistantOption = {}, onAssistantEvents } = props;
  return (
    <div>
      <ReactEcharts
        style={style}
        onEvents={onMainEvents}
        option={mainOption}
      />
      <ReactEcharts
        style={style}
        onEvents={onAssistantEvents}
        option={assistantOption}
      />
    </div>
  )
}
