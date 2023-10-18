import {
  blue,
  red,
  green,
  grey,
  magenta,
  cyan,
  purple,
} from "@ant-design/colors";

export const CustomerStatusProps = {
  0: {
    name: "not set",
    style: { color: grey[6], background: grey[0], borderColor: grey[2] },
  },
  1: {
    name: "new",
    style: { color: magenta[7], background: magenta[1], borderColor: magenta[3] },
  },
  2: {
    name: "in progress",
    style: { color: cyan[7], background: cyan[1], borderColor: cyan[4] },
  },
  3: {
    name: "completed",
    style: { color: green[7], background: green[1], borderColor: green[3] },
  },
  4: {
    name: "failed",
    style: { color: red[6], background: red[1], borderColor: red[2] },
  },
  5: {
    name: "on hold",
    style: { color: purple[6], background: purple[0], borderColor: purple[2] },
  },
  6: {
    name: "won't do",
    style: { color: blue[8], background: blue[2], borderColor: blue[4] },
  },
};

export const CustomerStatusLookup = [
  { label: "NOT SET", value: 0 },
  { label: "NEW", value: 1 },
  { label: "IN PROGRESS", value: 2 },
  { label: "COMPLETED", value: 3 },
  { label: "FAILED", value: 4 },
  { label: "ON HOLD", value: 5 },
  { label: "WON'T DO", value: 6 },
];
