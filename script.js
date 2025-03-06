let breatheInterval;
let countInterval;
let phaseIndex = 0;
const bgMusic = document.getElementById("bgMusic");

const phases = [
    { text: "Inhale", time: 4000, scale: 1.5, count: 4 },
    { text: "Hold", time: 2000, scale: 1.5, count: 2 },
    { text: "Exhale", time: 8000, scale: 1, count: 8 }
];

function startBreathing() {
    if (breatheInterval) return;
    phaseIndex = 0;

    // Start music 1 second before
    bgMusic.play();
    setTimeout(() => {
        cycleBreathing();
    }, 1000);
}

function cycleBreathing() {
    const circle = document.querySelector(".circle");
    const instructions = document.querySelector(".instructions");

    let phase = phases[phaseIndex];
    instructions.innerText = phase.text;
    circle.style.transition = `all ${phase.time / 1000}s ease-in-out`;
    circle.style.transform = `scale(${phase.scale})`;

    // Ensure previous counting stops before starting new one
    clearInterval(countInterval);
    displayCountInsideCircle(phase.count, phase.time);

    breatheInterval = setTimeout(() => {
        phaseIndex = (phaseIndex + 1) % phases.length;
        cycleBreathing();
    }, phase.time);
}

function stopBreathing() {
    clearTimeout(breatheInterval);
    clearInterval(countInterval); // Stop counting
    breatheInterval = null;
    countInterval = null;

    document.querySelector(".instructions").innerText = "Press Start to Begin";
    const circle = document.querySelector(".circle");
    circle.style.transition = "none"; 
    circle.style.transform = "scale(1)";
    circle.innerText = ""; // Clear the number inside the circle

    bgMusic.pause();
    bgMusic.currentTime = 0;
}

function displayCountInsideCircle(count, duration) {
    let circle = document.querySelector(".circle");
    let interval = duration / count;
    
    let currentCount = 1;
    circle.innerText = currentCount;

    countInterval = setInterval(() => {
        if (currentCount >= count) {
            clearInterval(countInterval);
        } else {
            currentCount++;
            circle.innerText = currentCount;
        }
    }, interval);
}
