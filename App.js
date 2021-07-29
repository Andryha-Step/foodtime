import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import OneSignal from 'react-native-onesignal'
import { ActivityIndicator, View } from 'react-native';

export default function App() {

	useEffect(() => {
		//OneSignal Init Code
		OneSignal.setLogLevel(6, 0);
		OneSignal.setAppId("32f429ce-fe37-4223-a448-e1473d689fdd");
		//END OneSignal Init Code

		// //Prompt for push on iOS
		OneSignal.promptForPushNotificationsWithUserResponse(response => {
			console.log("Prompt response:", response);
		});

		// //Method for handling notifications received while app in foreground
		// OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
		// 	console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
		// 	let notification = notificationReceivedEvent.getNotification();
		// 	console.log("notification: ", notification);
		// 	const data = notification.additionalData
		// 	console.log("additionalData: ", data);
		// 	// Complete with null means don't show a notification.
		// 	notificationReceivedEvent.complete(notification);
		// });

		// //Method for handling notifications opened
		// OneSignal.setNotificationOpenedHandler(notification => {
		// 	console.log("OneSignal: notification opened:", notification);
		// });
	}, [])

	const [isLoading, setIsLoading] = useState(true);

	return (
		<SafeAreaProvider>
			<SafeAreaView style={{flex: 1}}>
				<StatusBar style='auto' />
				<WebView 
					onLoadStart={() => setIsLoading(true)}
					onLoadEnd={() => setIsLoading(false)}
					bounces={false}
					source={{ uri: 'https://foodtime-delivery.ru/' }}
				/>
				{
					isLoading && <View style={{
						position: 'absolute',
						top: 0,
						left: 0,
						height: '100%',
						width: '100%',
						justifyContent: 'center',
						alignItems: 'center'
					}}>
						<View
							style={{
								backgroundColor: '#e9e9e9',
								height: 80,
								width: 80,
								justifyContent: 'center',
								alignItems: 'center',
								borderRadius: 10,
							}}
						>
							<ActivityIndicator size={'small'} />
						</View>
					</View>
				}
			</SafeAreaView>
		</SafeAreaProvider>
	);
}

