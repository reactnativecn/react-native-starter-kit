import { NativeModules } from 'react-native';

if (!NativeModules.PushNotificationManager) {
  NativeModules.PushNotificationManager = {
    addListener: () => {},
    removeListeners: () => {},
    presentLocalNotification: () => {},
    scheduleLocalNotification: () => {},
    cancelAllLocalNotifications: () => {},
    removeAllDeliveredNotifications: () => {},
    getDeliveredNotifications: () => {},
    removeDeliveredNotifications: () => {},
    setApplicationIconBadgeNumber: () => {},
    getApplicationIconBadgeNumber: () => {},
    cancelLocalNotifications: () => {},
    getScheduledLocalNotifications: () => {},
    checkPermissions: () => {},
    getInitialNotification: () => {},
    onFinishRemoteNotification: () => {},
  }
}
