// import { RadioChangeEvent } from 'antd';
interface baseProps {
  onChange?: (k: string | undefined, value: string | number | undefined)  => any,
  dataName?: string,
}

export interface option {
  key: string | number,
  value: string | number,
}

export interface searchComProps extends baseProps {
  type?: string,
  value?: string | number,
  allowClear?: boolean,
}
export interface statusComProps extends baseProps {
  value?: string | number,
  options?: Array<option> | [],
  type?: string | undefined,
}

export interface btnStatusComProps extends baseProps {
  type?: string | undefined,
  lable?: string | undefined,
}

export interface searchGroupProps {
  config?: Array<searchComProps> | [] | undefined,
  statusConfig?:  statusComProps | Array<btnStatusComProps> | undefined,
  buttonConfig?: Array<searchComProps> | [] | undefined,
}