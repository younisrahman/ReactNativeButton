import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState} from 'react';

const App = () => {
  const opacity1_animation = useRef(new Animated.Value(1)).current;
  const opacity2_animation = useRef(new Animated.Value(0)).current;
  const opacity3_animation = useRef(new Animated.Value(0)).current;
  const [activeButton, setActiveButton] = useState(false);
  const animationDelay = 400;
  const startAnimation = () => {
    Animated.parallel([
      Animated.timing(opacity1_animation, {
        toValue: 0,
        duration: animationDelay,
        useNativeDriver: false,
      }),
      Animated.timing(opacity2_animation, {
        toValue: 1,
        duration: animationDelay,
        useNativeDriver: false,
      }),
      Animated.delay(1500),
    ]).start(() => {
      Animated.parallel([
        Animated.timing(opacity2_animation, {
          toValue: 0,
          duration: animationDelay,
          useNativeDriver: false,
        }),
        Animated.timing(opacity3_animation, {
          toValue: 1,
          duration: animationDelay,
          useNativeDriver: false,
        }),
      ]).start();
      setActiveButton(true);
    });
  };

  const animatedStylesFirst = {
    opacity: opacity1_animation,
  };
  const animatedStylesSecond = {
    opacity: opacity2_animation,
  };
  const animatedStylesFinal = {
    opacity: opacity3_animation,
  };
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Text style={styles.titleText}>
          Press prototype to see button animation
        </Text>

        <TouchableOpacity
          activeOpacity={1}
          onPress={() => startAnimation()}
          disabled={activeButton}>
          <Animated.Image
            source={require('./src/assets/images/join.png')}
            style={[styles.imageStyle, animatedStylesFirst]}
            resizeMode="contain"
          />
          <Animated.Image
            source={require('./src/assets/images/check.png')}
            style={[styles.imageStyle, animatedStylesSecond]}
            resizeMode="contain"
          />
          <Animated.View style={[styles.joinedContainer, animatedStylesFinal]}>
            <Image
              source={require('./src/assets/images/joined.png')}
              style={styles.imageStyleJoined}
              resizeMode="contain"
            />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonContainer: {
    height: 100,
    width: 300,
  },
  button: {
    backgroundColor: 'red',
    height: 100,
    width: 100,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  imageStyle: {
    height: 50,
    width: 100,
    position: 'absolute',
    top: 10,
    left: 100,
  },
  imageStyleJoined: {
    height: 30,
    width: 50,
  },
  joinedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 20,
    left: 125,
  },
});
export default App;
