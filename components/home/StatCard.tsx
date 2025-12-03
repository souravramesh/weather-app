import Colors from '@/constants/Colors';
import React from 'react';
import { SvgProps } from 'react-native-svg';
import BoxView from '../common/BoxView';
import StyledText from '../common/StyledText';

interface StatCardProps {
    label: string;
    value: string;
    Icon: React.FC<SvgProps>;
    subValue?: string;
}

const StatCard = ({ label, value, Icon, subValue }: StatCardProps) => {
    return (
        <BoxView fd='row' w="48%" bg={Colors.surface} r={16} p={15} g={8} ai='center' >
            <BoxView bg={Colors.white} ai="center" jc="center" h={30} w={30} r={50}>
                <Icon width={16} height={16} color={Colors.textSecondary} />
            </BoxView>
            <BoxView g={5}>
                <StyledText color={Colors.textSecondary}>{label}</StyledText>
                <BoxView fd="row" ai="flex-end" g={8}>
                    <StyledText size={16} color={Colors.textSecondary}>{value}</StyledText>
                    {subValue && (
                        <StyledText size={12} color={Colors.textSecondary} style={{ marginBottom: 2 }}>
                            {subValue}
                        </StyledText>
                    )}
                </BoxView>
            </BoxView>
        </BoxView>
    );
};

export default StatCard;
