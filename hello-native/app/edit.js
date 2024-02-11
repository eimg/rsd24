import { View, Text, TextInput, Button } from "react-native";

import { router } from "expo-router";

export default function Edit() {
    return <View>
        <Text>Edit Page</Text>
        <Button title="Save" onPress={() => {
            // update state
            router.replace("/");
        }} />
    </View>
}
