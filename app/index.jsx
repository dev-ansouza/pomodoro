import { useEffect, useRef, useState } from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import { PomodoroButton } from "../components/PomodoroButton"
import { ActionButton } from "../components/ActionButton"
import { Timer } from "../components/Timer"
import { IconPause, IconPlay } from "../components/Icons"
import { Audio } from "expo-av";

const pomodoro = [
  {
    id: 'short',
    initialValue: 5 * 60,
    image: require('../assets/images/short.png'),
    display: 'Short',
  },
  {
    id: 'focus',
    initialValue: 15 * 60,
    image: require('../assets/images/pomodoro.png'),
    display: 'Focus',
  },
  {
    id: 'long',
    initialValue: 25 * 60,
    image: require('../assets/images/long.png'),
    display: 'Long',
  },
]

export default function Index() {

  const [timerType, setTimerType] = useState(pomodoro[1])
  const [seconds, setSeconds] = useState(pomodoro[1].initialValue)
  const [timerRunning, setTimerRunning] = useState(false)
  const [sound, setSound] = useState();

  const timerRef = useRef(null)

  const clear = () => {
    if (timerRef.current != null) {
      clearInterval(timerRef.current)
      timerRef.current = null
      setTimerRunning(false)
    }
  }

  const toggleTimerType = (newTimerType) => {
    setTimerType(newTimerType)
    setSeconds(newTimerType.initialValue)
    clear()
  }

  const ToggleTimer = () => {
    if (timerRef.current) {
      clear()
      return
    }

    setTimerRunning(true)

    const id = setInterval(() => {
      setSeconds(oldState => {
        if (oldState === 0) {
          Alert.alert('The time sold out')
          playSound()
          clear()
          return timerType.initialValue
        }
        return oldState - 1
      })
    }, 1000);
    timerRef.current = id
  }

  useEffect(() => {
    return sound
      ? () => {
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sounds/end.mp3')
    );

    setSound(sound);

    await sound.playAsync();
  }

  return (
    <View
      style={styles.container}
    >
      <Image
        source={timerType.image}
        style={styles.image}
      />
      <View style={styles.actions}>
        <View style={styles.context}>
          {pomodoro.map(p => (
            <ActionButton
              key={p.id}
              active={timerType.id === p.id}
              onPress={() => toggleTimerType(p)}
              display={p.display}
            />
          ))}
        </View>
        <Timer
          totalSeconds={seconds}
        />
        <PomodoroButton
          active={!timerRunning ? false : true}
          title={timerRunning ? 'stop' : 'start'}
          icon={timerRunning ? <IconPause /> : <IconPlay />}
          onPress={ToggleTimer}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#021123",
    gap: 40,
  },
  image: {
    width: '80%',
    height: '40%',
  },
  actions: {
    paddingVertical: 24,
    paddingHorizontal: 24,
    backgroundColor: "#14448080",
    width: '90%',
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#144480',
    gap: 32,
  },
  context: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
})