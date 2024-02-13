import React from 'react';
import BottomTabNavigator from '../../navigators/BottomTabNavigator';
import {Text} from 'react-native';
import {Drawer} from 'react-native-drawer-layout';
import {useDispatch, useSelector} from 'react-redux';
import {
  closeDrawer,
  openDrawer,
  selectIsDrawerOpen,
} from '../../stores/slices/appState';

const Home = () => {
  // This is the home screen of Stack Navigator which renders the Bottom Tab Navigator
  const dispatch = useDispatch();
  const isDrawerOpen = useSelector(selectIsDrawerOpen);

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
        return <Text>Drawer content</Text>;
      }}>
      <BottomTabNavigator />
    </Drawer>
  );
};

export default Home;

// export default function DrawerExample() {
//   return (
//   );
// }
