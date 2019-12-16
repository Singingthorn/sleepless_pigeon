import React from 'react'
import { Button, Radio } from 'antd';

import SearchCom from '../SearchCom';
import StatuCom from '../StatuCom';
import { searchComProps, statusComProps, searchGroupProps } from '../ui.d';
import styles from './index.scss';

const getSearchCom = (config: Array<searchComProps>) => config.map((i: searchComProps) => <SearchCom {...i} /> );

export default function SearchGroup(props: searchGroupProps) {
  const { config = [], statusConfig,  } = props

  return (
    <div>
      <div className={styles.searchGroup}>{config.length ? getSearchCom(config) : null }</div>
      {/* <div className={styles.searchGroup}>{ statusConfig ? <StatuCom {...statusConfig} /> : null }</div> */}
      <div></div>
      <Button disabled/>
    </div>
  )
}
