import * as React from 'react';
import { IKeyValString } from '../interfaces';

const icons: IKeyValString = {
  'chevron-left': require('../../assets/icons/chevron-left.svg'),
  'chevron-right': require('../../assets/icons/chevron-right.svg'),
  'magnify': require('../../assets/icons/magnify.svg'),
};

interface IProps {
  className?: string;
  name: string;
}

export const Icon = (props: IProps) => (
  <i
    className={`flex align-center justify-center ${props.className ? props.className : ''}`}
    dangerouslySetInnerHTML={{ __html: icons[props.name] }}
  />
);
