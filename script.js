// ==========================================
// 1. Theme Toggle Logic
// ==========================================
const themeToggle = document.getElementById('themeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');
const html = document.documentElement;

function updateIcons() {
    if (html.classList.contains('dark')) {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    } else {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }
}

themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
    updateIcons();
});

if (localStorage.getItem('theme') === 'light') {
    html.classList.remove('dark');
    updateIcons();
} else {
    updateIcons(); // Default to dark mode
}

// ==========================================
// 2. Logic Gate Playground Logic (Combination Circuit)
// ==========================================
let circuit = { A: false, B: false, C: false };

function toggleNode(node) {
    circuit[node] = !circuit[node];
    updateCircuit();
}

function updateCircuit() {
    // Logic: Output = (A AND B) OR C
    const andResult = circuit.A && circuit.B;
    const orResult = andResult || circuit.C;

    const activeColor = 'text-accent';
    const inactiveColor = 'text-gray-300';
    const inactiveDark = 'dark:text-gray-600';

    // Update Input Buttons and Wires
    ['A', 'B', 'C'].forEach(node => {
        const btn = document.getElementById(`btn-${node}`);
        const circle = document.getElementById(`circle-${node}`);
        const wire = document.getElementById(`wire-${node.toLowerCase()}`);
        
        if(circuit[node]) {
            btn.classList.add('bg-accent'); 
            btn.classList.remove('bg-gray-300', 'dark:bg-gray-600');
            circle.style.transform = 'translateX(20px)';
            wire.classList.add(activeColor); 
            wire.classList.remove(inactiveColor, inactiveDark);
        } else {
            btn.classList.remove('bg-accent'); 
            btn.classList.add('bg-gray-300', 'dark:bg-gray-600');
            circle.style.transform = 'translateX(0px)';
            wire.classList.remove(activeColor); 
            wire.classList.add(inactiveColor, inactiveDark);
        }
    });

    // Update AND Gate
    const gateAnd = document.getElementById('gate-and');
    const wireAnd = document.getElementById('wire-and');
    if (andResult) {
        gateAnd.classList.add('border-accent', 'text-accent', 'shadow-[0_0_15px_rgba(79,70,229,0.3)]');
        gateAnd.classList.remove('border-gray-300', 'dark:border-gray-600', 'text-gray-400');
        wireAnd.classList.add(activeColor); 
        wireAnd.classList.remove(inactiveColor, inactiveDark);
    } else {
        gateAnd.classList.remove('border-accent', 'text-accent', 'shadow-[0_0_15px_rgba(79,70,229,0.3)]');
        gateAnd.classList.add('border-gray-300', 'dark:border-gray-600', 'text-gray-400');
        wireAnd.classList.remove(activeColor); 
        wireAnd.classList.add(inactiveColor, inactiveDark);
    }

    // Update OR Gate
    const gateOr = document.getElementById('gate-or');
    const wireOut = document.getElementById('wire-out');
    if (orResult) {
        gateOr.classList.add('border-accent', 'text-accent', 'shadow-[0_0_15px_rgba(79,70,229,0.3)]');
        gateOr.classList.remove('border-gray-300', 'dark:border-gray-600', 'text-gray-400');
        wireOut.classList.add(activeColor); 
        wireOut.classList.remove(inactiveColor, inactiveDark);
    } else {
        gateOr.classList.remove('border-accent', 'text-accent', 'shadow-[0_0_15px_rgba(79,70,229,0.3)]');
        gateOr.classList.add('border-gray-300', 'dark:border-gray-600', 'text-gray-400');
        wireOut.classList.remove(activeColor); 
        wireOut.classList.add(inactiveColor, inactiveDark);
    }

    // Update Final Bulb Output
    const bulb = document.getElementById('lightbulb');
    const bulbIcon = document.getElementById('bulbIcon');
    const statusText = document.getElementById('status-text');

    if (orResult) {
        bulb.classList.add('bg-yellow-400', 'bulb-glow', 'border-yellow-200');
        bulbIcon.classList.add('text-white');
        statusText.innerText = "HIGH (1)";
        statusText.classList.replace('text-gray-400', 'text-yellow-500');
    } else {
        bulb.classList.remove('bg-yellow-400', 'bulb-glow', 'border-yellow-200');
        bulbIcon.classList.remove('text-white');
        statusText.innerText = "LOW (0)";
        statusText.classList.replace('text-yellow-500', 'text-gray-400');
    }
}

// ==========================================
// 3. Animated Honeycomb Border Logic
// ==========================================
const gridConfig = {
    cols: 10,
    rows: 10,
    hexSize: 10,
    baseColor: { r: 100, g: 116, b: 139, a: 0.2 }, // Slate base
    activeColor: { r: 79, g: 70, b: 229, a: 0.8 }, // Indigo accent
    pulseRate: 0.05,
    maxBrightnessShift: 40,
    activeProbability: 0.08,
    cellAnimationInterval: 500,
};

const hexGrid = document.getElementById('hexGrid');

function getRGBAString(color, alphaOverride) {
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${alphaOverride !== undefined ? alphaOverride : color.a})`;
}

function shiftBrightness(color, shiftPercentage) {
    const shiftAmount = (gridConfig.maxBrightnessShift / 100) * 255 * (shiftPercentage / 100);
    const r = Math.max(0, Math.min(255, color.r + shiftAmount));
    const g = Math.max(0, Math.min(255, color.g + shiftAmount));
    const b = Math.max(0, Math.min(255, color.b + shiftAmount));
    return { r, g, b, a: color.a };
}

const hexHeight = Math.sqrt(3);
const colWidth = 1.5 * gridConfig.hexSize;
const rowHeight = hexHeight * gridConfig.hexSize;

function createHexCell(x, y, scale) {
    const points = [];
    const angles = [30, 90, 150, 210, 270, 330];
    for (let angle of angles) {
        const angleRad = (angle * Math.PI) / 180;
        points.push(`${scale * Math.cos(angleRad)},${scale * Math.sin(angleRad)}`);
    }
    const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    polygon.setAttribute("points", points.join(' '));
    polygon.setAttribute("class", "hex-cell");
    polygon.setAttribute("transform", `translate(${x}, ${y})`);
    polygon.style.stroke = getRGBAString(gridConfig.baseColor);
    polygon.style.fill = getRGBAString(gridConfig.baseColor);
    return polygon;
}

function drawGrid() {
    if(!hexGrid) return;
    hexGrid.innerHTML = '';
    
    const path = `M10 0 L90 0 L100 10 L100 90 L90 100 L10 100 L0 90 L0 10 Z`;
    const borderClipPath = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
    borderClipPath.setAttribute("id", "borderShape");
    const borderPathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
    borderPathElement.setAttribute("d", path);
    borderClipPath.appendChild(borderPathElement);
    hexGrid.appendChild(borderClipPath);
    hexGrid.setAttribute("clip-path", "url(#borderShape)");

    for (let row = 0; row < gridConfig.rows; row++) {
        for (let col = 0; col < gridConfig.cols; col++) {
            const offsetX = (row % 2 === 0) ? gridConfig.hexSize * 0.75 : 0;
            const x = (col * colWidth) + offsetX;
            const y = (row * rowHeight) / 2;
            const hexScale = (gridConfig.hexSize / 2) * 1.1; 
            const hexCell = createHexCell(x, y, hexScale);
            hexGrid.appendChild(hexCell);
        }
    }
}

let pulseCounter = 0;
const allCells = [];

function animateGrid() {
    pulseCounter += gridConfig.pulseRate;
    if (allCells.length === 0) {
        document.querySelectorAll('.hex-cell').forEach(cell => allCells.push(cell));
    }

    allCells.forEach((cell, index) => {
        const brightnessShift = 100 * Math.sin(pulseCounter + index * 0.1) * (gridConfig.pulseRate / 2);
        const dimmedColor = shiftBrightness(gridConfig.baseColor, brightnessShift);
        cell.style.stroke = getRGBAString(dimmedColor, 0.3);
        cell.style.fill = getRGBAString(dimmedColor);

        if (Math.random() < gridConfig.pulseRate * gridConfig.activeProbability) {
            if (Math.random() < gridConfig.activeProbability) {
                cell.style.fill = getRGBAString(gridConfig.activeColor);
                cell.style.stroke = getRGBAString(gridConfig.activeColor, 0.9);
            }
        }
    });
}

// Initialize Honeycomb
drawGrid();
setInterval(animateGrid, gridConfig.cellAnimationInterval);