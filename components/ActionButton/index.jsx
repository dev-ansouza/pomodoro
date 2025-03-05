import { Pressable, StyleSheet, Text } from "react-native"

export const ActionButton = ({ active, onPress, display }) => {
    return (
        <Pressable
            style={active ? styles.contextButtonActive : null}
            onPress={onPress}
        >
            <Text style={styles.contextButtonText}>
                {display}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    contextButtonActive: {
        backgroundColor: '#144480',
        borderRadius: 8,
    },
    contextButtonText: {
        fontSize: 18,
        color: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 25,
    },
})