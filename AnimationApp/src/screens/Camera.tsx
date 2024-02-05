import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useMicrophonePermission,
} from 'react-native-vision-camera';

const CameraScreen = () => {
  const cameraRef = useRef<Camera>(null);
  const {
    hasPermission: hasCameraPermission,
    requestPermission: requestCameraPermission,
  } = useCameraPermission();
  const {
    hasPermission: hasMicPermission,
    requestPermission: requestMicPermission,
  } = useMicrophonePermission();
  const device = useCameraDevice('back');

  useEffect(() => {
    if (!hasCameraPermission) {
      requestCameraPermission();
    }
  }, [hasCameraPermission, requestCameraPermission]);

  if (device == null) {
    return <Text>No camera found!</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>Camera</Text>
      <Camera
        style={StyleSheet.absoluteFill}
        ref={cameraRef}
        device={device}
        isActive={true}
        photo={true}
      />
      <TouchableOpacity
        style={{position: 'absolute', bottom: 20}}
        onPress={() => {
          cameraRef.current?.takePhoto().then(photo => {
            console.log(photo);
          });
        }}>
        <Text>Take photo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CameraScreen;
