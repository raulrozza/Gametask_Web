import { ColorChangeHandler } from 'react-color';

export interface ColorInputProps {
  label?: string;
  value?: string;
  className?: string;
  onChange: ColorChangeHandler;
  onShowPanel?: () => void;
  onHidePanel?: () => void;
}

export interface ColorInputWrapperProps {
  color: string;
  showPicker: bool;
  hasLabel: boolean;
}
