import React, { act, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { Audio } from 'expo-av';

export const PomodoroButton = ({ active, icon, title, onPress }) => {
    
    const [sound, setSound] = useState();
    const [source, setSource] = useState(null);

    useEffect(() => {
        if (active) {
            setSource(require('../../assets/sounds/stop.mp3'))
        } else {
            setSource(require('../../assets/sounds/play.mp3'))
        }
    }, [active])
    
    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    function handlePress() {
        playSound();
        
        if (onPress) {
            onPress();
        }
    }

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(
            source
        );
     
        setSound(sound);

        await sound.playAsync();
    }

    return (
        <Pressable
            style={styles.button}
            onPress={handlePress}
        >
            {icon}
            <Text style={styles.buttonText}>
                {title}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#B872FF',
        borderRadius: 32,
        padding: 8,
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        textAlign: 'center',
        color: '#021123',
        fontSize: 30,
    },
})
