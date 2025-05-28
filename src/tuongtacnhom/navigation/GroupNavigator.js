import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import GroupList from '../screens/GroupList';
import GroupDetail from '../screens/GroupDetail';
import CreateGroup from '../screens/CreateGroup';
import GroupSettings from '../screens/GroupSettings';
import FindGroups from '../screens/FindGroups';
import Comments from '../screens/Comments';
import GroupMembers from '../screens/GroupMembers';

const Stack = createStackNavigator();

const GroupNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#FFFFFF' },
      }}
    >
      <Stack.Screen name="GroupList" component={GroupList} />
      <Stack.Screen name="GroupDetail" component={GroupDetail} />
      <Stack.Screen name="CreateGroup" component={CreateGroup} />
      <Stack.Screen name="GroupSettings" component={GroupSettings} />
      <Stack.Screen name="FindGroups" component={FindGroups} />
      <Stack.Screen name="Comments" component={Comments} />
      <Stack.Screen name="GroupMembers" component={GroupMembers} />
    </Stack.Navigator>
  );
};

export default GroupNavigator; 