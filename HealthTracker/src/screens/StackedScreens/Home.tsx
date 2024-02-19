import React, {useEffect} from 'react';
import BottomTabNavigator from '../../navigators/BottomTabNavigator';
import {View} from 'react-native';
import {Drawer} from 'react-native-drawer-layout';
import {useDispatch, useSelector} from 'react-redux';
import {
  closeDrawer,
  openDrawer,
  selectIsDrawerOpen,
} from '../../stores/slices/appState';
import Profile from '../BottomTabScreens/Profile';
import {StackNavigatorPropType} from '../../navigators/StackNavigator';
import {containerStyles} from '../../styles/common';
import {addSteps, loadData} from '../../stores/slices/data';

type Props = {
  navigation: StackNavigatorPropType;
};

const Home = (props: Props) => {
  // This is the home screen of Stack Navigator which renders the Bottom Tab Navigator
  const dispatch = useDispatch();
  const isDrawerOpen = useSelector(selectIsDrawerOpen);

  useEffect(() => {
    dispatch(loadData());
    dispatch(addSteps(0));
  }, [dispatch]);

  const onDrawerOpen = () => {
    dispatch(openDrawer());
  };

  const onDrawerClose = () => {
    dispatch(closeDrawer());
  };

  return (
    <Drawer
      open={isDrawerOpen}
      onOpen={onDrawerOpen}
      onClose={onDrawerClose}
      renderDrawerContent={() => {
        return (
          <View
            style={[
              containerStyles.fullHeightContainer,
              containerStyles.horizontallyCenteredContainer,
            ]}>
            <Profile viewOnly={true} navigation={props.navigation} />
          </View>
        );
      }}>
      <BottomTabNavigator />
    </Drawer>
  );
};

export default Home;
