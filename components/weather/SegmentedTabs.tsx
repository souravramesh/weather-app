import Colors from '@/constants/Colors';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import BoxView from '../common/BoxView';
import StyledText from '../common/StyledText';

const TABS = ['Today', 'Tomorrow', '10 days'];

const SegmentedTabs = () => {
    const [activeTab, setActiveTab] = useState('Today');

    return (
        <BoxView fd="row" g={16}>
            {TABS.map((tab) => {
                const isActive = activeTab === tab;
                return (
                    <TouchableOpacity
                        key={tab}
                        onPress={() => setActiveTab(tab)}
                        style={[styles.tab, isActive && styles.activeTab]}
                    >
                        <StyledText
                            weight='400'
                            color={Colors.text}
                            align="center"
                        >
                            {tab}
                        </StyledText>
                    </TouchableOpacity>
                );
            })}
        </BoxView>
    );
};

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 14,
        backgroundColor: Colors.white,
    },
    activeTab: {
        backgroundColor: Colors.secondary,
    },
});

export default SegmentedTabs;
