import React from 'react';
import { Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio/interface';

import { statusComProps, option, btnStatusComProps } from '../ui.d';

export default function StatuCom(props: statusComProps | btnStatusComProps = {}) {
  // const {
  //   value, options = [], dataName, onChange, type, lable,
  // } = props;
  // function onChangeHandle(e: RadioChangeEvent) {
  //   const { target: { value } } = e;
  //   onChange ? onChange(dataName, value) : null;
  // }
  // // function getCom
  // return(
  //   <Radio.Group
  //     value={value}
  //     onChange={onChangeHandle}
  //   >
  //     {
  //       options.map((i: option) => (<Radio.Button value={i.key}>{i.value}</Radio.Button>))
  //     }
  //   </Radio.Group>
  // ) 
}