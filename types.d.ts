import {AccessibilityProps} from 'react-native';

export interface IComponentProps {
  children?: React.ReactNode;
}

export type ComponentAccessibilityProps = AccessibilityProps & {
  testID?: string;
};
