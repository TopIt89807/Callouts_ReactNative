import React from 'react'
import { View, StatusBar } from 'react-native'
import { Metrics, Styles, Colors, Fonts } from 'theme';

const CommonWidgets = {
  renderStatusBar(color) {
    return (
      <StatusBar
        backgroundColor={color}
        barStyle={'light-content'}
        translucent
      />
    )
  },

  renderSpacer(size) {
    return (
      <View style={{ height: (Metrics.screenHeight / 80) * size }} />
    )
  }
}

export default CommonWidgets