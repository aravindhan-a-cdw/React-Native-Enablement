/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Animated,
  Button,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
  extraStyles?: StyleProp<ViewStyle>;
}>;

function Section({
  children,
  title,
  extraStyles,
}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Animated.View style={[styles.sectionContainer, extraStyles]}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </Animated.View>
  );
}

function Home(props: any): React.JSX.Element {
  console.log(props);
  const {
    navigation: {navigate},
  } = props;
  const OpacityValue1 = useState(new Animated.Value(0))[0];
  const OpacityValue2 = useState(new Animated.Value(0))[0];
  const OpacityValue3 = useState(new Animated.Value(0))[0];
  const OpacityValue4 = useState(new Animated.Value(0))[0];
  const [section, setSection] = useState(0);

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const sections = [
    animateSection1,
    animateSection2,
    animateSection3,
    animateSection4,
  ];

  function animateSection1() {
    console.log('animateSection1 executed');
    Animated.timing(OpacityValue1, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    // Animated.timing(heightValue, {
    //   toValue: 100,
    //   duration: 1000,
    //   useNativeDriver: true,
    // }).start();
    setSection(1);
  }

  function animateSection2() {
    console.log('animateSection2 executed');
    Animated.timing(OpacityValue2, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    setSection(2);
  }

  function animateSection3() {
    console.log('animateSection3 executed');
    Animated.timing(OpacityValue3, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    setSection(3);
  }

  function animateSection4() {
    console.log('animateSection4 executed');
    Animated.timing(OpacityValue4, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    setSection(4);
  }

  const AnimatedStyles = StyleSheet.create({
    animatedSection1: {
      opacity: OpacityValue1,
    },
    animatedSection2: {
      opacity: OpacityValue2,
    },
    animatedSection3: {
      opacity: OpacityValue3,
    },
    animatedSection4: {
      opacity: OpacityValue4,
    },
  });

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={backgroundStyle}>
      <Header />
      <Button onPress={sections[section]} title="Reveal" />
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
        <Section
          extraStyles={AnimatedStyles.animatedSection1}
          title="Animations">
          You can click on next to see the animation!
        </Section>
        <Section
          extraStyles={AnimatedStyles.animatedSection2}
          title="Local Storage">
          <View>
            <Text>Checkout the usage of local storage in the app!</Text>
            <Button onPress={() => navigate('LocalStorage')} title="Explore" />
          </View>
        </Section>
        <Section extraStyles={AnimatedStyles.animatedSection3} title="Debug">
          <DebugInstructions />
        </Section>
        <Section
          extraStyles={AnimatedStyles.animatedSection3}
          title="Learn More">
          Read the docs to discover what to do next:
        </Section>
        <Section
          extraStyles={AnimatedStyles.animatedSection4}
          title="Learn More">
          Read the docs to discover what to do next:
        </Section>
        {/* <LearnMoreLinks /> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Home;
