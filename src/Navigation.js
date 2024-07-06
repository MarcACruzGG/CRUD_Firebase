import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from './screens/Home';
import Add from './screens/Add';

const Stack = createNativeStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Home" 
                component={Home} 
                options={{
                    title: 'Inicio',
                    headerStyle: { backgroundColor: '#2E7D32' },
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontWeight: 'bold' },
                }}
            />
            <Stack.Screen 
                name="Add" 
                component={Add} 
                options={{ 
                    title: 'Crear Nueva Tarea',
                    headerStyle: { backgroundColor: '#1E88E5' },
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontWeight: 'bold' },
                    presentation: 'modal'
                }} 
            />
        </Stack.Navigator>
    );
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}
