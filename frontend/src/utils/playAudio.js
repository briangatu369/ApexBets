export const playAudio = (sound, soundVolume) => {
  const audio = new Audio(sound);
  audio.volume = soundVolume;
  audio.play();
};
