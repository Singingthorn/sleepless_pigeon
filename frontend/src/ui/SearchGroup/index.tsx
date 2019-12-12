import React from 'react'

import SearchCom from '../SearchCom';
import { searchComProps } from '../ui.d';

const getSearchCom = (config: Array<searchComProps>) => config.map((i) => <SearchCom {...i} /> );


export default function SearchGroup() {
  return (
    <div>
      group
    </div>
  )
}
