let breatheInterval;
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
    bgMusic.play(); 
    cycleBreathing();
}

function cycleBreathing() {
    const circle = document.querySelector(".circle");
    const instructions = document.querySelector(".instructions");

    let phase = phases[phaseIndex];
    instructions.innerText = phase.text;
    circle.style.transition = `all ${phase.time / 1000}s ease-in-out`;
    circle.style.transform = `scale(${phase.scale})`;

    displayCountInsideCircle(phase.count, phase.time);

    breatheInterval = setTimeout(() => {
        phaseIndex = (phaseIndex + 1) % phases.length;
        cycleBreathing();
    }, phase.time);
}

function stopBreathing() {
    clearTimeout(breatheInterval);
    breatheInterval = null;

    document.querySelector(".instructions").innerText = "Press Start to Begin";
    document.querySelector(".circle").style.transition = "none"; 
    document.querySelector(".circle").style.transform = "scale(1)";
    
    bgMusic.pause(); 
    bgMusic.currentTime = 0; 
}

function displayCountInsideCircle(count, duration) {
    let circle = document.querySelector(".circle");
    let interval = duration / count;
    
    let currentCount = 1; 
    circle.innerText = currentCount; 

    let countInterval = setInterval(() => {
        currentCount++;
        if (currentCount > count) {
            clearInterval(countInterval);
            circle.innerText = ""; 
        } else {
            circle.innerText = currentCount; 
        }
    }, interval);
}
