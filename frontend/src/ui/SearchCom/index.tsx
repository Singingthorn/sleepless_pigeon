import React, { ChangeEvent } from 'react'
import { Select, Input } from 'antd';

import { searchComProps } from '../ui.d';

const defaultProps: searchComProps = {
  type: 'select',
  value: 418,
  onChange: (k, v) => {
    console.info('onChange', k);
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

  function onSelectChange(e: string | number) {
    onChange ? onChange(dataName, value) : null;
  } 

  function onInputChangeHandle(e: ChangeEvent<HTMLInputElement>) {
    const { target: { dataset: { name }, value } } = e;
    onChange ? onChange(dataName, value) : null;
  }

  function Component() {
    const propsCom = {
      type, value, allowClear, ['data-name']: dataName
    };
    switch(type) {
      case 'input': 
        return (
          <Input
            {...propsCom}
            onChange={onInputChangeHandle}
          />
        )
      default: 
        return (
          <Select
            {...propsCom}
            onChange={onSelectChange}
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
