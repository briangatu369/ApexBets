import { useEffect, useState } from "react";

export const useHandleVolumeChange = () => {
  const [soundVolume, setSoundVolume] = useState(0.2);

  const handleChangeVolume = (e) => {
    const newValue = parseFloat(e.target.value); // Convert to number

    if (isFinite(newValue)) {
      localStorage.setItem("minesSoundVolume", newValue);
      setSoundVolume(newValue);
    }
  };

  useEffect(() => {
    const minesSoundVolume = localStorage.getItem("minesSoundVolume");

    if (minesSoundVolume !== null) {
      const parsedVolume = parseFloat(minesSoundVolume);
      if (isFinite(parsedVolume)) {
        setSoundVolume(parsedVolume);
      }
    }
  }, []);

  return { soundVolume, handleChangeVolume };
};
