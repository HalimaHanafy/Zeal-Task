import { useNavigation, useTheme } from '@react-navigation/native';
import React, { FC, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, View } from 'react-native';
import styled from 'styled-components/native';
import { IComponentProps } from '../../types';
import { FocusControleContext } from '../contexts/FocusControlContext';
import { FontSize } from '../utils/Constants';
import Label from './Label';

const ViewLayout = styled.View`
    align-items: center;
    justify-content: center;
    font-family: 'tahoma';
    font-size: 20px;
`;
const ScrollViewLayout = styled.ScrollView`
    display: flex;
    width: 100%;
`;

export interface LayoutProps extends IComponentProps {
    scrollable?: boolean;
    isLoading?: boolean;
    loadingText?: string;
    padding?: number;
    onScreenFocus?: () => void;
    onScreenBlur?: () => void;
    height?: number | 'ScreenHeight';
    disableKeyboardSliding?: boolean;
}
export const Layout: FC<LayoutProps> = (props: LayoutProps) => {
    const { children, scrollable, disableKeyboardSliding, onScreenFocus, onScreenBlur, isLoading, loadingText, padding, height } = props;
    const navigation = useNavigation();
    const { colors } = useTheme();
    const layoutHeight = height === 'ScreenHeight' ? Math.trunc(Dimensions.get('window').height) : height;
    const [verticalOffset, setVerticalOffset] = useState<number | undefined>();
    const focusContext = useContext(FocusControleContext);

    useEffect(() => {
        if ((focusContext.state.distanceControlKeyBoard && focusContext.state.distanceControlKeyBoard < 0) ||
            focusContext.state.distanceControlKeyBoard === undefined) {
            setVerticalOffset(focusContext.state.distanceControlKeyBoard);
        } else {
            setVerticalOffset(undefined);
        }
    }, [focusContext.state.distanceControlKeyBoard]);

    useEffect(() => {
        let unsubscribeFocus: (() => void) | null = null;
        let unsubscribeBlur: (() => void) | null = null;
        if (onScreenFocus) {
            unsubscribeFocus = navigation.addListener('focus', onScreenFocus);
        }
        if (onScreenBlur) {
            unsubscribeBlur = navigation.addListener('blur', onScreenBlur);
        }
        return () => {
            if (unsubscribeFocus) {
                navigation.removeListener('focus', unsubscribeFocus);
            }
            if (unsubscribeBlur) {
                navigation.removeListener('blur', unsubscribeBlur);
            }
        };
    }, []);
    return (
        <ViewLayout style={{ padding, height: layoutHeight }}>
            <View style={{ width: '100%', height: '100%', top: disableKeyboardSliding ? undefined : verticalOffset }}>
                {scrollable ? (
                    <ScrollViewLayout>{children}</ScrollViewLayout>
                ) : (
                    children
                )}
            </View>
            {isLoading && (
                <View style={{
                    height: '100%',
                    top: 0,
                    position: 'absolute',
                    width: '100%',
                    backgroundColor: colors.background,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <ActivityIndicator
                        size="large"
                        color={colors.primary}
                    />
                    {loadingText && <Label color={colors.primary} fontSize={FontSize.MD} lineHeight={24}>{loadingText}</Label>}
                </View>
            )}
        </ViewLayout>
    );
};
