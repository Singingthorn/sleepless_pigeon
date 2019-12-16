import React, { useState, useEffect } from 'react';
// import option from 'echarts/lib/component/op';

import Charts from '../../ui/charts';

const searchConfig: Array<Object> = [
  {
    type: 'select',
    dataName: 'depart'
  },
  {
    type: 'input',
    dataName: 'name'
  }
];

const echartsAmountOption: object = {
  backgroundColor: '#2c343c',
  title: {
      text: 'Customized Pie',
      left: 'center',
      top: 20,
      textStyle: {
          color: '#ccc'
      }
  },

  tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
  },

  visualMap: {
      show: false,
      min: 80,
      max: 800,
      inRange: {
          colorLightness: [0, 1]
      }
  },
  series : [
      {
          name:'访问来源',
          type:'pie',
          radius : '55%',
          center: ['50%', '50%'],
          data:[
              {value:335, name:'直接访问'},
              {value:310, name:'邮件营销'},
              {value:274, name:'联盟广告'},
              {value:235, name:'视频广告'},
              {value:500, name:'搜索引擎'}
          ].sort(function (a, b) { return a.value - b.value; }),
          roseType: 'radius',
          label: {
              normal: {
                  textStyle: {
                      color: 'rgba(255, 255, 255, 0.3)'
                  }
              }
          },
          labelLine: {
              normal: {
                  lineStyle: {
                      color: 'rgba(255, 255, 255, 0.3)'
                  },
                  smooth: 0.2,
                  length: 10,
                  length2: 20
              }
          },
          itemStyle: {
              normal: {
                  color: '#c23531',
                  shadowBlur: 200,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
          },

          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function () {
              return Math.random() * 200;
          }
      }
  ]
};

const assistantOption: Function  = (num: number): object => ({
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: Array.from([1,2,3,4,5], (i:any, x: number) => Math.random() * num ),
},
yAxis: {
    boundaryGap: [0, '50%'],
    type: 'value'
},
series: [
    {
        name:'成交',
        type:'bar',
        smooth:true,
        symbol: 'none',
        stack: 'a',
        areaStyle: {
            normal: {}
        },
        data: Array.from([1,2,3,4,5], (i:any, x: number) => Math.random() * num ),
    }
]
});

export default function BaseLayout() {
  // const onMainEvents: 
  let [mainOption] = useState(echartsAmountOption);
  let [aOption, setAoption] = useState(assistantOption(50));

  function HandleClickEcharts(params: any): void {
    console.info('testoule', aOption.series);
    const { data: { value }} = params;
    aOption = assistantOption(value/10);
    setAoption(aOption);
    console.info('new', aOption.series);
  }

  return (
    <div>
      baseLayout
      <Charts
        onMainEvents={{ 'click': HandleClickEcharts }}
        mainOption={mainOption}
        assistantOption={aOption}
        // onAssistantEvents={{ 'click': HandleClickEcharts }}
      />
    </div>
  )
}
