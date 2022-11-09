/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react';
import styled from 'styled-components/native';

export interface ContainerProps {
    height?: string | number;
    width?: string | number;
    flex?: number;
    flexWrap?: boolean;
    justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
}
export const VerticalContainer = styled.View<ContainerProps>`
    display: flex;
    flex-direction: column;
    ${props => props.height ? `height: ${props.height}${props.height.toString().endsWith('%') ? '' : 'px'};` : ''} 
    ${props => props.width ? `width: ${props.width}${props.width.toString().endsWith('%') ? '' : 'px'};` : ''} 
    ${props => props.flex ? `flex: ${props.flex};` : ''}
    ${props => props.flexWrap ? `flexWrap: wrap;` : ''}
    ${props => props.justify ? `justify-content: ${props.justify};` : ''}
`;

export const HorizontalContainer = styled.View<ContainerProps>`
    display: flex;
    flex-direction: row;
    ${props => props.height ? `height: ${props.height}${props.height.toString().endsWith('%') ? '' : 'px'};` : ''} 
    ${props => props.width ? `width: ${props.width}${props.width.toString().endsWith('%') ? '' : 'px'};` : ''} 
    ${props => props.flex ? `flex: ${props.flex};` : ''}
    ${props => props.flexWrap ? `flexWrap: wrap;` : ''}
    ${props => props.justify ? `justify-content: ${props.justify};` : ''}

`;

// MARGIN
export interface MarginProps {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
}

const MarginStyled = styled.View`
    ${(props: MarginProps) => (props.top ? `margin-top: ${props.top}px;` : '')}
    ${(props: MarginProps) =>
        props.left ? `margin-left: ${props.left}px;` : ''}
    ${(props: MarginProps) =>
        props.right ? `margin-right: ${props.right}px;` : ''}
    ${(props: MarginProps) =>
        props.bottom ? `margin-bottom: ${props.bottom}px;` : ''}
`;

export const Margin: FC<MarginProps> = (props: MarginProps) => {
    return <MarginStyled {...props} />;
};
