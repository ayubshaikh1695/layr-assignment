import { ReactNode } from 'react';

export type PopoverProps = {
  children: ReactNode;
  onClose: () => void;
};
