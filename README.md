# Drum Machine

A browser-based drum machine with nine sample pads, keyboard shortcuts, and a library of ready-to-play drum grooves.

## Features

- Play drum samples by clicking pads or pressing their corresponding keys.
- Choose from eight 16-step grooves with different styles and tempos.
- Watch the active step as a groove plays, and stop playback at any time.
- Responsive dark studio-inspired interface.

## Run locally

No build tools or package installation are required.

1. Download or clone this project.
2. Open `index.html` in a modern web browser.
3. Click a drum pad or press its key to play a sound.
4. Scroll to the Groove Library and choose **PLAY** to hear a pattern. Select **STOP** to stop it.

The drum samples are loaded from the freeCodeCamp curriculum CDN, so an internet connection is required for audio.

## Drum pad keys

| Key | Sample |
| --- | --- |
| Q | Heater 1 |
| W | Heater 2 |
| E | Heater 3 |
| A | Heater 4 |
| S | Clap |
| D | Open hi-hat |
| Z | Kick and hat |
| X | Kick |
| C | Closed hi-hat |

## Groove library

Each groove is one bar of 16 steps. Steps are played at a sixteenth-note interval based on the displayed BPM. A step may trigger multiple sounds at once; a dot (`·`) marks a rest.

| Groove | Style | Tempo |
| --- | --- | ---: |
| Classic Rock | Straight 8ths | 110 BPM |
| Boom Bap | Laid-back pocket | 90 BPM |
| Four-on-the-floor | Dance pulse | 124 BPM |
| Disco Drive | Four-on-the-floor with open hats | 118 BPM |
| Half-Time | Big, roomy backbeat | 82 BPM |
| Trap Pulse | Fast ticking hats | 140 BPM |
| Shuffle Blues | Loping shuffled feel | 100 BPM |
| Breakbeat | Syncopated and punchy | 106 BPM |

## Project files

- `index.html` — page structure and drum pad controls.
- `style.css` — responsive visual styling.
- `script.js` — sample mapping, keyboard controls, groove patterns, and playback.
