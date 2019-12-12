import React from 'react';

import SearchCom from '../../ui/SearchCom';
import SearchGroup from '../../ui/SearchGroup';

const searchConfig: Array<Object> = [
  {
    type: 'select',
    dataName: ''

  }
];


export default function BaseLayout() {
  return (
    <div>
      baseLayout
      <SearchGroup />
      <SearchCom type="input" />
    </div>
  )
}
