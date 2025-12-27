/**
 * Sound Design for NicePanda
 * Subtle, ambient audio feedback for interactions
 */

// Create AudioContext on first interaction (browser policy)
let audioContext = null;

const initAudio = () => {
    if (!audioContext && typeof window !== 'undefined') {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
};

/**
 * Play a soft "paw press" sound
 * Like a gentle tap on bamboo
 */
export const playPawSound = () => {
    const ctx = initAudio();
    if (!ctx) return;

    // Create a soft, warm tone
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    // Frequency: A gentle mid-range tone (like a wooden chime)
    oscillator.frequency.setValueAtTime(520, ctx.currentTime); // C5 note
    oscillator.frequency.exponentialRampToValueAtTime(420, ctx.currentTime + 0.1);

    // Envelope: Quick attack, gentle decay
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.01); // Very subtle volume
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

    // Use a triangle wave for warmth (like wood)
    oscillator.type = 'triangle';

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.3);
};

/**
 * Play ambient forest background (optional for profile page)
 * Very subtle white noise with low-pass filter
 */
export const playForestAmbience = (duration = 2) => {
    const ctx = initAudio();
    if (!ctx) return;

    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Generate pink noise (more natural than white noise)
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
        b6 = white * 0.115926;
    }

    const source = ctx.createBufferSource();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    source.buffer = buffer;
    filter.type = 'lowpass';
    filter.frequency.value = 800; // Muffled, like distant forest
    gainNode.gain.value = 0.03; // Very quiet

    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    source.start();
};

// Initialize on user interaction
if (typeof window !== 'undefined') {
    document.addEventListener('click', initAudio, { once: true });
}
