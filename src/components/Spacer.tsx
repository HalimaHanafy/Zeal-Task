import React, { FC } from 'react';
import { View } from 'react-native';

export interface SpacerProps {
    size:
    | 'tiny'
    | 'verySmall'
    | 'smaller'
    | 'small'
    | 'smallMedium'
    | 'medium'
    | 'medium24'
    | 'large'
    | 'veryLarge'
    | 'extraLarge';
    direction: 'horizontal' | 'vertical';
}
const Sizes: Record<string, number> = {
    tiny: 6,
    verySmall: 10,
    smaller: 12,
    small: 14,
    smallMedium: 18,
    medium: 20,
    medium24: 24,
    large: 26,
    veryLarge: 32,
    extraLarge: 45
};

export const Spacer: FC<SpacerProps> = (props: SpacerProps) => {
    const { size, direction } = props;

    const h = direction === 'vertical' ? Sizes[size] : undefined;
    const w = direction === 'horizontal' ? Sizes[size] : undefined;
    return <View style={{ height: h, width: w }} />;
};
