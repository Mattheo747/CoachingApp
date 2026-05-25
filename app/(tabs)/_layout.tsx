import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { View, StyleSheet } from 'react-native';

function TabIcon({ name, color, focused }: { name: any; color: string; focused: boolean }) {
  return (
    <View style={[styles.iconWrapper, focused && styles.iconWrapperActive]}>
      <Ionicons name={name} size={22} color={color} />
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Entraînements',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name={focused ? 'barbell' : 'barbell-outline'} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="nutrition"
        options={{
          title: 'Nutrition',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name={focused ? 'nutrition' : 'nutrition-outline'} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="bilans"
        options={{
          title: 'Bilans',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name={focused ? 'analytics' : 'analytics-outline'} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="documentation"
        options={{
          title: 'Docs',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name={focused ? 'library' : 'library-outline'} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name={focused ? 'person-circle' : 'person-circle-outline'} color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.tabBar,
    borderTopColor: Colors.border,
    borderTopWidth: 1,
    height: 64,
    paddingBottom: 8,
    paddingTop: 4,
  },
  tabLabel: { fontSize: 10, fontWeight: '600' },
  iconWrapper: { alignItems: 'center', justifyContent: 'center', width: 36, height: 28 },
  iconWrapperActive: {
    backgroundColor: Colors.primary + '20',
    borderRadius: 8,
  },
});
