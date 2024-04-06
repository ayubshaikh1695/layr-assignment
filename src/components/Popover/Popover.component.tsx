import React, { Fragment, memo } from 'react';
import { PopoverProps } from './Popover.types';
const styles = require('./Popover.module.css');

const Popover = (props: PopoverProps) => {
  const { children, onClose } = props;

  return (
    <Fragment>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.popover}>{children}</div>
    </Fragment>
  );
};

export default memo(Popover);
