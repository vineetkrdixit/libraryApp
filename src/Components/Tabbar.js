import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const TabBar = ({activeTab, onTabPress}) => {
  const renderTab = tabName => (
    <TouchableOpacity
      key={tabName}
      onPress={() => onTabPress(tabName)}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: activeTab === tabName ? 'lightblue' : 'white',
        paddingVertical: 10,
      }}>
      <Text>{tabName}</Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: 'lightgray',
      }}>
      {['Tab1', 'Tab2', 'Tab3'].map(tab => renderTab(tab))}
    </View>
  );
};

export default TabBar;
