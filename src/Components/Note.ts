type Notes =
  | "C"
  | "C#"
  | "D"
  | "D#"
  | "E"
  | "F"
  | "F#"
  | "G"
  | "G#"
  | "A"
  | "A#"
  | "B";
type SingleNote = {
  note: Notes;
  octave: number;
};

const Notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export const Note = (note, octave): SingleNote => {
  return note + octave;
};

const scales = {
  majorpentatonic: [2, 2, 3, 2],
  minorpentatonic: [3, 2, 2, 3],
};

const GenerateScale = ({
  key,
  scale,
}: {
  key: Notes;
  scale: "minorpentatonic" | "majorpentatonic";
}) => {
  const generatedScale = [Note(key, 0)];
  const chosenScale = scales[scale];
  for (let steps in chosenScale) {
  }
};
