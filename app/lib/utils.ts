// Ensure cn is defined
const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

// Export cn
export { cn }; 