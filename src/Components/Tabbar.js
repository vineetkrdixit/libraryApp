import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const TabBar = ({activeTab, onTabPress}) => {
  const renderTab = tabName => (
    <TouchableOpacity
      key={tabName}
      onPress={() => onTabPress(tabName)}
      style={[
        styles.tabStyles,
        // eslint-disable-next-line react-native/no-inline-styles
        {backgroundColor: activeTab === tabName ? 'lightblue' : 'white'},
      ]}>
      <Text>{tabName}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.tabViewStyle}>
      {['Tab1', 'Tab2', 'Tab3'].map(tab => renderTab(tab))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabViewStyle: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: 'lightgray',
  },
  tabStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
});

export default TabBar;
