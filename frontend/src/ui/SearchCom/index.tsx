import React from 'react'
import { Select, Input } from 'antd';

import { searchComProps } from '../ui.d';

const defaultProps: searchComProps = {
  type: 'select',
  value: 418,
  onChange: (e) => {
    console.info('onChange', e);
  },
  allowClear: false,
}

export default function SearchCom(props: searchComProps) {
  const {
    type = defaultProps.type, 
    value = defaultProps.value, 
    onChange = defaultProps.onChange,
    allowClear = defaultProps.allowClear,
    dataName
  } = props;

  function Component() {
    const propsCom = {
      type, value, onChange, allowClear, ['data-name']: dataName
    };
    switch(type) {
      case 'input': 
        return (
          <Input
            {...propsCom}
          />
        )
      default: 
        return (
          <Select
            {...propsCom}
          />
        )
    }
  }
  
  return (
    <div>
      {Component()}
    </div>
  )
}
