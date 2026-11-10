const drumPads = document.querySelectorAll('.drum-pad');
const clips = document.querySelectorAll('.clip');
const display = document.querySelector('#display');
const grooveList = document.querySelector('#groove-list');
const stopPatternButton = document.querySelector('#stop-pattern');

const machineObj = [
    { drumName: "Heater 1", fileName: "Heater-1.mp3" },
    { drumName: "Heater 2", fileName: "Heater-2.mp3" },
    { drumName: "Heater 3", fileName: "Heater-3.mp3" },
    { drumName: "Heater 4", fileName: "Heater-4_1.mp3" },
    { drumName: "Clap", fileName: "Heater-6.mp3" },
    { drumName: "Open-HH", fileName: "Dsc_Oh.mp3" },
    { drumName: "Kick-n'-Hat", fileName: "Kick_n_Hat.mp3" },
    { drumName: "Kick", fileName: "RP4_KICK_1.mp3" },
    { drumName: "Closed-HH", fileName: "Cev_H2.mp3" },
];

const baseUrl = "https://cdn.freecodecamp.org/curriculum/drum";
const padByKey = new Map(Array.from(drumPads, (pad, index) => [pad.id, { pad, index }]));
const keyNames = {
    X: "Kick",
    S: "Clap",
    C: "Closed hi-hat",
    D: "Open hi-hat",
};

function createSteps({ kick, clap, closedHat, openHat = [] }) {
    const steps = Array.from({ length: 16 }, () => []);
    [
        [kick, "X"],
        [clap, "S"],
        [closedHat, "C"],
        [openHat, "D"],
    ].forEach(([positions, key]) => {
        positions.forEach((position) => steps[position].push(key));
    });
    return steps.map((step) => step.join("+"));
}

const grooves = [
    {
        name: "Classic Rock",
        style: "Straight 8ths",
        bpm: 110,
        steps: createSteps({
            kick: [0, 8],
            clap: [4, 12],
            closedHat: [0, 2, 4, 6, 8, 10, 12, 14],
        }),
    },
    {
        name: "Boom Bap",
        style: "Laid-back pocket",
        bpm: 90,
        steps: createSteps({
            kick: [0, 6, 10],
            clap: [4, 12],
            closedHat: [0, 2, 4, 6, 8, 10, 12, 14],
        }),
    },
    {
        name: "Four-on-the-floor",
        style: "Dance pulse",
        bpm: 124,
        steps: createSteps({
            kick: [0, 4, 8, 12],
            clap: [4, 12],
            closedHat: [],
            openHat: [2, 6, 10, 14],
        }),
    },
    {
        name: "Disco Drive",
        style: "Four-on-the-floor with open hats",
        bpm: 118,
        steps: createSteps({
            kick: [0, 4, 8, 12],
            clap: [4, 12],
            closedHat: [2, 6, 10, 14],
            openHat: [0, 8],
        }),
    },
    {
        name: "Half-Time",
        style: "Big, roomy backbeat",
        bpm: 82,
        steps: createSteps({
            kick: [0, 10],
            clap: [8],
            closedHat: [0, 2, 4, 6, 8, 10, 12, 14],
        }),
    },
    {
        name: "Trap Pulse",
        style: "Fast ticking hats",
        bpm: 140,
        steps: createSteps({
            kick: [0, 7, 10, 14],
            clap: [4, 12],
            closedHat: [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14],
            openHat: [7, 15],
        }),
    },
    {
        name: "Shuffle Blues",
        style: "Loping shuffled feel",
        bpm: 100,
        steps: createSteps({
            kick: [0, 6, 8, 14],
            clap: [4, 12],
            closedHat: [0, 3, 4, 7, 8, 11, 12, 15],
        }),
    },
    {
        name: "Breakbeat",
        style: "Syncopated and punchy",
        bpm: 106,
        steps: createSteps({
            kick: [0, 3, 8, 10],
            clap: [4, 12],
            closedHat: [0, 2, 4, 6, 8, 10, 12, 14],
        }),
    },
];

clips.forEach((clip, index) => {
    clip.src = `${baseUrl}/${machineObj[index].fileName}`;
    clip.preload = "auto";
    clip.load();
});

function playSong(pad, index, updateDisplay = true) {
    const clip = pad.querySelector(".clip");

    clip.currentTime = 0;
    const playback = clip.play();
    if (playback) {
        playback.catch((error) => {
            display.textContent = "Audio could not be played";
            console.error("Drum sample playback failed:", error);
        });
    }

    if (updateDisplay) {
        display.textContent = machineObj[index].drumName;
    }
    pad.classList.add("is-active");
    window.setTimeout(() => pad.classList.remove("is-active"), 110);
}

function stopGroove() {
    window.clearTimeout(patternTimer);
    patternTimer = null;
    activeGroove = null;
    stopPatternButton.disabled = true;
    grooveList.querySelectorAll(".groove-card").forEach((card) => {
        card.classList.remove("is-playing");
        card.querySelectorAll(".groove-step").forEach((step) => step.classList.remove("current-step"));
    });
}

let patternTimer = null;
let activeGroove = null;

function playGroove(groove, card) {
    stopGroove();
    activeGroove = groove;
    stopPatternButton.disabled = false;
    card.classList.add("is-playing");
    display.textContent = `${groove.name} · ${groove.bpm} BPM`;

    const stepElements = card.querySelectorAll(".groove-step");
    const stepDuration = 60000 / groove.bpm / 4;
    let stepIndex = 0;

    function playNextStep() {
        if (!activeGroove) return;

        stepElements.forEach((step) => step.classList.remove("current-step"));
        stepElements[stepIndex].classList.add("current-step");
        groove.steps[stepIndex].split("+").filter(Boolean).forEach((key) => {
            const { pad, index } = padByKey.get(key);
            playSong(pad, index, false);
        });

        stepIndex += 1;
        if (stepIndex === groove.steps.length) {
            patternTimer = window.setTimeout(stopGroove, stepDuration);
        } else {
            patternTimer = window.setTimeout(playNextStep, stepDuration);
        }
    }

    playNextStep();
}

function renderGrooves() {
    grooves.forEach((groove) => {
        const card = document.createElement("article");
        card.className = "groove-card";

        const header = document.createElement("div");
        header.className = "groove-card-header";

        const heading = document.createElement("div");
        heading.className = "groove-card-title";
        const title = document.createElement("h3");
        title.textContent = groove.name;
        const style = document.createElement("p");
        style.textContent = groove.style;
        heading.append(title, style);

        const playButton = document.createElement("button");
        playButton.className = "groove-play";
        playButton.type = "button";
        playButton.textContent = "▶ PLAY";
        playButton.setAttribute("aria-label", `Play ${groove.name} groove`);
        playButton.addEventListener("click", () => playGroove(groove, card));
        header.append(heading, playButton);

        const sequenceHeader = document.createElement("div");
        sequenceHeader.className = "sequence-header";
        const tempo = document.createElement("span");
        tempo.textContent = `${groove.bpm} BPM`;
        const order = document.createElement("span");
        order.textContent = "STEP ORDER 01—16";
        sequenceHeader.append(tempo, order);

        const sequence = document.createElement("div");
        sequence.className = "groove-sequence";
        sequence.setAttribute("aria-label", `${groove.name} drum sequence`);

        groove.steps.forEach((keys, index) => {
            const step = document.createElement("span");
            step.className = `groove-step${index % 4 === 0 ? " beat-start" : ""}`;
            step.textContent = keys || "·";
            const notes = keys ? keys.split("+").map((key) => keyNames[key]).join(" and ") : "Rest";
            step.setAttribute("aria-label", `Step ${index + 1}: ${notes}`);
            sequence.append(step);
        });

        card.append(header, sequenceHeader, sequence);
        grooveList.append(card);
    });
}

renderGrooves();

drumPads.forEach((pad, index) => {
    pad.addEventListener("click", () => {
        stopGroove();
        playSong(pad, index);
    });
});

stopPatternButton.addEventListener("click", stopGroove);

document.addEventListener("keydown", (event) => {
    if (event.repeat || event.ctrlKey || event.metaKey || event.altKey) return;
    const key = event.key.toUpperCase();
    const pad = padByKey.get(key);

    if (pad) {
        pad.pad.click();
    }
});
