import { ColorChangeHandler } from 'react-color';

export interface ColorInputProps {
  label?: string;
  value?: string;
  className?: string;
  onChange: ColorChangeHandler;
  onShowPanel?: () => void;
  onHidePanel?: () => void;
}

export interface ColorViewerProps {
  color: string;
  hasLabel: boolean;
}

export interface ColorPickerProps {
  showPicker: bool;
}
