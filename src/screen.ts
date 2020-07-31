import { useState, useEffect } from "react";
import { Dimensions, ScaledSize } from "react-native";

const percentageCalculation = (max: number, val: number) => max * (val / 100);

const fontCalculation = (height: number, width: number, val: number) => {
  const widthDimension = height > width ? width : height;
  const aspectRatioBasedHeight = (16 / 9) * widthDimension;
  return percentageCalculation(
    Math.sqrt(
      Math.pow(aspectRatioBasedHeight, 2) + Math.pow(widthDimension, 2)
    ),
    val
  );
};

export default (): {
  width: number,
  height: number,
  widthScreen: number;
  heightScreen: number,
  vw: Function,
  vh: Function,
  vmin: Function,
  vmax: Function,
  font: Function
} => {
  const [dimensionsWindow, setDimensionsWindow] = useState(Dimensions.get("window"));
  const [dimensionsScreen, setDimensionsScreen] = useState(Dimensions.get("screen"));

  useEffect(() => {
    setDimensionsWindow(Dimensions.get("window"));
    setDimensionsScreen(Dimensions.get("screen"));

    const listener = ({ window, screen }: { window: ScaledSize, screen: ScaledSize }) => {
      setDimensionsWindow(window);
      setDimensionsScreen(screen);
    };
    Dimensions.addEventListener("change", listener);

    return () => Dimensions.removeEventListener("change", listener);
  }, []);

  const width = Math.ceil(dimensionsWindow.width);
  const height = Math.ceil(dimensionsWindow.height);
  const widthScreen = Math.ceil(dimensionsScreen.width);
  const heightScreen = Math.ceil(dimensionsScreen.height);
  const vw = (value: string) => (Number(value) * width) / 100 + "px";
  const vh = (value: string) => (Number(value) * height) / 100 + "px";
  const vmin = (value: string) => (Number(value) * Math.min(width, height)) / 100 + "px";
  const vmax = (value: string) => (Number(value) * Math.max(width, height)) / 100 + "px";
  const font = (f: number) => Math.round(fontCalculation(height, width, f)) + "px";

  return { width, height, widthScreen, heightScreen, vw, vh, vmin, vmax, font };
};


