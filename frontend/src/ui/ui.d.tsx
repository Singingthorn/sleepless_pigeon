import { ChangeEvent } from 'react'

export interface searchComProps {
  type?: string,
  value?: string | number,
  onChange?: (e: ChangeEvent<HTMLElement> | string | number) => any,
  allowClear?: boolean,
  dataName?: string,
}