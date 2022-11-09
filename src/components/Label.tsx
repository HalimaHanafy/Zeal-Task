/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react';
import { I18nManager } from 'react-native';
import styled from 'styled-components/native';
import { ComponentAccessibilityProps, IComponentProps } from '../../types';

export interface LabelProps extends IComponentProps, ComponentAccessibilityProps {
    bold?: boolean;
    underline?: boolean;
    fontWeight?: string;
    fontSize?: number;
    lineHeight?: number;
    color?: string;
    applyFieldPadding?: boolean;
    flex?: number;
    flexGrow?: number;
    flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
    arabic?: boolean;
    forceLeftAlign?: boolean;
    forceRightAlign?: boolean;
    centerText?: boolean;
    maxLines?: number;
    maxWidth?: string | undefined;
}
const defaultSize = {
    font: 16,
    line: 22
};
const LabelStyled = styled.Text<LabelProps>`
    font-family: ${(props) =>
        props.bold ? `bold` : `normal`};
    ${(props) => (props.underline ? `textDecorationLine: underline;` : '')};
    ${(props) => (props.flex ? `flex: ${props.flex};` : '')};
    ${(props) => (props.flexGrow ? `flexGrow: ${props.flexGrow};` : '')};
    ${(props) => (props.flexWrap ? `flexWrap: ${props.flexWrap};` : '')};
    ${(props) => (props.color ? `color: ${props.color};` : '')};
    ${(props) => (props.fontWeight ? `fontWeight: ${props.fontWeight};` : '')};
    ${(props) => (props.fontSize ? `font-size: ${props.fontSize ?? defaultSize.font}px;` : '')}
    ${(props) => (props.maxWidth ? `max-width: ${props.maxWidth};` : '')};
    ${(props) =>
        props.lineHeight ? `line-height: ${props.lineHeight ?? defaultSize.line}px;` : ''}
    ${(props) => (props.applyFieldPadding ? `padding: 5px 0px 5px 0px;` : '')}
    ${(props) =>
        ((I18nManager.isRTL === false && (props.arabic)))
            ? 'text-align: right;'
            : 'text-align: left;'}
    ${(props) =>
        ((I18nManager.isRTL === false && (props.forceLeftAlign)))
            ? 'text-align: left;'
            : ''}
                    ${(props) =>
        ((I18nManager.isRTL === false && (props.forceRightAlign)))
            ? 'text-align: right;'
            : ''}
                    
    ${(props) => (props.centerText ? `text-align: center;` : '')};  
`;

const Label: FC<LabelProps> = (props: LabelProps) => {
    const { maxLines } = props;
    return <LabelStyled numberOfLines={maxLines} ellipsizeMode='tail' {...props} />;
};
export default Label;