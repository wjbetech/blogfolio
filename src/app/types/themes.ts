export type ColorTheme = {
  id: string;
  name: string;
  bg100: string;
  bg200: string;
  bg300: string;
  headline: string;
  paragraph: string;
  button: string;
  buttonText: string;
  accent: string;
  accent2: string;
  accent3: string;
  // optional alternate key for accent text — some theme objects may provide this
  accentText?: string;
};
