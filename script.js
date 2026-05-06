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
    updateIcons(); 
}

// ==========================================
// 2. Multi-Stage Logic Gate Playground
// ==========================================
let circuit = { A: false, B: false, C: false };

function toggleNode(node) {
    circuit[node] = !circuit[node];
    updateCircuit();
}

function updateCircuit() {
    // Stage 1: NAND Gate
    const nandResult = !(circuit.A && circuit.B);
    
    // Stage 2: XOR Gate
    const xorResult = nandResult !== circuit.C;

    const activeColor = 'text-accent';
    const inactiveColor = 'text-gray-300';
    const inactiveDark = 'dark:text-gray-600';

    // 1. Update Input Buttons and Wires
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

    // 2. Update NAND Gate & Branching Wires
    const gateNand = document.getElementById('gate-nand');
    const nandDot = document.getElementById('nand-dot');
    const wireNandMain = document.getElementById('wire-nand-main');
    const wireNandLed1 = document.getElementById('wire-nand-led1');
    const wireNandXor = document.getElementById('wire-nand-xor');
    
    if (nandResult) {
        gateNand.classList.add('border-accent', 'text-accent', 'shadow-[0_0_15px_rgba(79,70,229,0.3)]');
        gateNand.classList.remove('border-gray-300', 'dark:border-gray-600', 'text-gray-400');
        nandDot.classList.add('border-accent'); nandDot.classList.remove('border-gray-300', 'dark:border-gray-600');
        
        [wireNandMain, wireNandLed1, wireNandXor].forEach(w => {
            w.classList.add(activeColor); w.classList.remove(inactiveColor, inactiveDark);
        });
    } else {
        gateNand.classList.remove('border-accent', 'text-accent', 'shadow-[0_0_15px_rgba(79,70,229,0.3)]');
        gateNand.classList.add('border-gray-300', 'dark:border-gray-600', 'text-gray-400');
        nandDot.classList.remove('border-accent'); nandDot.classList.add('border-gray-300', 'dark:border-gray-600');

        [wireNandMain, wireNandLed1, wireNandXor].forEach(w => {
            w.classList.remove(activeColor); w.classList.add(inactiveColor, inactiveDark);
        });
    }

    // 3. Update LED 1 (Blue NAND Indicator)
    const led1 = document.getElementById('led-1');
    const led1Icon = document.getElementById('led-1-icon');
    const text1 = document.getElementById('text-1');
    
    if (nandResult) {
        led1.classList.add('bg-blue-400', 'shadow-[0_0_40px_rgba(96,165,250,0.6)]', 'border-blue-200');
        led1Icon.classList.add('text-white');
        text1.innerText = "NAND: HIGH (1)";
        text1.classList.replace('text-gray-400', 'text-blue-500');
    } else {
        led1.classList.remove('bg-blue-400', 'shadow-[0_0_40px_rgba(96,165,250,0.6)]', 'border-blue-200');
        led1Icon.classList.remove('text-white');
        text1.innerText = "NAND: LOW (0)";
        text1.classList.replace('text-blue-500', 'text-gray-400');
    }

    // 4. Update XOR Gate & Output Wire
    const gateXor = document.getElementById('gate-xor');
    const xorBack = document.getElementById('xor-back');
    const wireXorOut = document.getElementById('wire-xor-led2');
    
    if (xorResult) {
        gateXor.classList.add('border-accent', 'text-accent', 'shadow-[0_0_15px_rgba(79,70,229,0.3)]');
        gateXor.classList.remove('border-gray-300', 'dark:border-gray-600', 'text-gray-400');
        xorBack.classList.add('border-accent'); xorBack.classList.remove('border-gray-300', 'dark:border-gray-600');
        
        wireXorOut.classList.add(activeColor); wireXorOut.classList.remove(inactiveColor, inactiveDark);
    } else {
        gateXor.classList.remove('border-accent', 'text-accent', 'shadow-[0_0_15px_rgba(79,70,229,0.3)]');
        gateXor.classList.add('border-gray-300', 'dark:border-gray-600', 'text-gray-400');
        xorBack.classList.remove('border-accent'); xorBack.classList.add('border-gray-300', 'dark:border-gray-600');
        
        wireXorOut.classList.remove(activeColor); wireXorOut.classList.add(inactiveColor, inactiveDark);
    }

    // 5. Update LED 2 (Yellow Final Output)
    const led2 = document.getElementById('led-2');
    const led2Icon = document.getElementById('led-2-icon');
    const text2 = document.getElementById('text-2');
    
    if (xorResult) {
        led2.classList.add('bg-yellow-400', 'bulb-glow', 'border-yellow-200');
        led2Icon.classList.add('text-white');
        text2.innerText = "OUT: HIGH (1)";
        text2.classList.replace('text-gray-400', 'text-yellow-500');
    } else {
        led2.classList.remove('bg-yellow-400', 'bulb-glow', 'border-yellow-200');
        led2Icon.classList.remove('text-white');
        text2.innerText = "OUT: LOW (0)";
        text2.classList.replace('text-yellow-500', 'text-gray-400');
    }
}

// Ensure circuit initializes on page load
window.addEventListener('DOMContentLoaded', () => {
    updateCircuit();
});