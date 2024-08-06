import LottieView from 'lottie-react-native';
import React, { FC, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { BottomSheetView } from '@gorhom/bottom-sheet';

import { Button, Text } from 'src/app/components';
import { RoutineExercise } from 'src/interfaces/routine-exercises';

interface Props {
  exercise: RoutineExercise;
}

export const ExerciseBottomSheetContent: FC<Props> = ({ exercise }) => {
  const [isPlaying, setisPlaying] = useState(false);
  return (
    <BottomSheetView style={styles.contentContainer}>
      <Text>{exercise.exercise}</Text>
      {isPlaying ? (
        <CountdownCircleTimer
          size={100}
          strokeWidth={7}
          isPlaying={isPlaying}
          duration={10}
          isSmoothColorTransition
          colors={['#004777', '#2ecc71', '#F7B801', '#A30000']}
          colorsTime={[10, 7, 4, 0]}
          onComplete={() => {
            setisPlaying(false);
            return { shouldRepeat: isPlaying, delay: 1.5 };
          }}
        >
          {({ remainingTime }) => <Text fontSize="4xl">{remainingTime}</Text>}
        </CountdownCircleTimer>
      ) : (
        <View style={styles.lottieContainer}>
          <LottieView
            style={styles.lottieView}
            source={require('src/assets/lottie/barbell.json')}
            autoPlay
            loop
          />
        </View>
      )}
      <View>
        {/* <Text fontSize="2xl">Serie: 3/4</Text>
        <Text fontSize="2xl">Peso: 50KG</Text> */}
      </View>

      {/* BUTTON: INICIAR SERIE, TERMINAR SERIE */}
      {isPlaying ? (
        <Button
          content="Iniciar serie"
          onPress={() => {
            setisPlaying(false);
          }}
          marginTop={8}
          themeColor="secondary"
          disabled={isPlaying}
        />
      ) : (
        <Button
          content="Terminar serie"
          onPress={() => {
            setisPlaying(true);
          }}
          marginTop={8}
          themeColor="secondary"
        />
      )}
    </BottomSheetView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 10,
  },
  lottieContainer: { height: 100, width: 100 },
  lottieView: { flex: 1 },
});
