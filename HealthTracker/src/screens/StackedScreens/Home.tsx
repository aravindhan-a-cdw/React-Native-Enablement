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
import QuickActionButton from '../../components/QuickActionButton';

type Props = {
  navigation: StackNavigatorPropType;
};

const Home = (props: Props) => {
  // This is the home screen of Stack Navigator which renders the Bottom Tab Navigator
  const dispatch = useDispatch();
  const isDrawerOpen = useSelector(selectIsDrawerOpen);

  useEffect(() => {
    // const date = new Date();
    // date.setDate(date.getDate() - 4);
    dispatch(loadData());
    // dispatch(addSteps({data: 20, date: date.toISOString().split('T')[0]}));
    // dispatch(saveData()); // When data is not saved it won't reflect in calendar
    dispatch(addSteps({data: 0}));
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
      <QuickActionButton />
    </Drawer>
  );
};

export default Home;
