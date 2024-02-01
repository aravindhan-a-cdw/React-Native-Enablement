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
  SafeAreaView,
  ScrollView,
  StatusBar,
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
  LearnMoreLinks,
  ReloadInstructions,
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

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const OpacityValue1 = useState(new Animated.Value(0))[0];
  const OpacityValue2 = useState(new Animated.Value(0))[0];
  const OpacityValue3 = useState(new Animated.Value(0))[0];
  const heightValue = useState(new Animated.Value(0))[0];
  const [section, setSection] = useState(0);

  const sections = [animateSection1, animateSection2, animateSection3];

  function animateSection1() {
    console.log('animateSection1 executed');
    Animated.timing(OpacityValue1, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    Animated.timing(heightValue, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: true,
    }).start();
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

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

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
  });

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <Button onPress={sections[section]} title="Next" />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section
            extraStyles={AnimatedStyles.animatedSection1}
            title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section
            extraStyles={AnimatedStyles.animatedSection2}
            title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section extraStyles={AnimatedStyles.animatedSection3} title="Debug">
            <DebugInstructions />
          </Section>
          <Section
            extraStyles={AnimatedStyles.animatedSection3}
            title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
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

export default App;
