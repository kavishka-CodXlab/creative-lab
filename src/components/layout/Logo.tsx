import { motion } from "framer-motion";

interface LogoProps {
    className?: string;
    isLight?: boolean;
}

export function Logo({ className, isLight = false }: LogoProps) {
    // Website Theme Colors
    const textColor = isLight ? "#FFFFFF" : "hsl(var(--oxford))";

    // Gradients for the blobs to match the uploaded blue logo style using site variables
    // Blob 1: Cyan/Sky Blue
    const blob1Start = isLight ? "rgba(255, 255, 255, 0.4)" : "hsl(var(--sky))";
    const blob1End = isLight ? "rgba(255, 255, 255, 0.1)" : "hsl(var(--cyan-light))";

    // Blob 2: Deep Blue/Star Blue
    const blob2Start = isLight ? "rgba(255, 255, 255, 0.3)" : "hsl(var(--star))";
    const blob2End = isLight ? "rgba(255, 255, 255, 0.1)" : "hsl(var(--indigo-soft))";

    return (
        <div className={`flex items-center gap-3 select-none ${className}`}>
            <motion.div
                className="relative w-12 h-12 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
                <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                >
                    <defs>
                        <linearGradient id="blob1Grad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor={blob1Start} />
                            <stop offset="100%" stopColor={blob1End} />
                        </linearGradient>
                        <linearGradient id="blob2Grad" x1="100%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor={blob2Start} />
                            <stop offset="100%" stopColor={blob2End} />
                        </linearGradient>
                    </defs>

                    {/* Top Left Blob (Lighter Blue) */}
                    <motion.path
                        d="M50 20C30 20 15 35 15 50C15 65 30 75 45 75C60 75 55 60 70 60C85 60 95 45 95 30C95 15 80 5 65 5C50 5 50 20 50 20Z"
                        fill="url(#blob1Grad)"
                        className="mix-blend-multiply opacity-90"
                        initial={{ d: "M50 20C30 20 15 35 15 50C15 65 30 75 45 75C60 75 55 60 70 60C85 60 95 45 95 30C95 15 80 5 65 5C50 5 50 20 50 20Z" }}
                        animate={{
                            d: [
                                "M50 20C30 20 15 35 15 50C15 65 30 75 45 75C60 75 55 60 70 60C85 60 95 45 95 30C95 15 80 5 65 5C50 5 50 20 50 20Z",
                                "M50 25C30 25 20 40 20 55C20 70 35 80 50 80C65 80 60 65 75 65C90 65 100 50 100 35C100 20 85 10 70 10C55 10 50 25 50 25Z",
                                "M50 20C30 20 15 35 15 50C15 65 30 75 45 75C60 75 55 60 70 60C85 60 95 45 95 30C95 15 80 5 65 5C50 5 50 20 50 20Z",
                            ],
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Bottom Right Blob (Darker Blue) */}
                    <motion.path
                        d="M50 80C70 80 85 65 85 50C85 35 70 25 55 25C40 25 45 40 30 40C15 40 5 55 5 70C5 85 20 95 35 95C50 95 50 80 50 80Z"
                        fill="url(#blob2Grad)"
                        className="mix-blend-multiply opacity-90"
                        initial={{ d: "M50 80C70 80 85 65 85 50C85 35 70 25 55 25C40 25 45 40 30 40C15 40 5 55 5 70C5 85 20 95 35 95C50 95 50 80 50 80Z" }}
                        animate={{
                            d: [
                                "M50 80C70 80 85 65 85 50C85 35 70 25 55 25C40 25 45 40 30 40C15 40 5 55 5 70C5 85 20 95 35 95C50 95 50 80 50 80Z",
                                "M50 75C70 75 80 60 80 45C80 30 65 20 50 20C35 20 40 35 25 35C10 35 0 50 0 65C0 80 15 90 30 90C45 90 45 75 50 75Z",
                                "M50 80C70 80 85 65 85 50C85 35 70 25 55 25C40 25 45 40 30 40C15 40 5 55 5 70C5 85 20 95 35 95C50 95 50 80 50 80Z",
                            ],
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    />
                </svg>
            </motion.div>

            <div className="flex flex-col -space-y-1">
                <span
                    className="font-display font-black text-xl tracking-tighter uppercase transition-colors duration-300"
                    style={{ color: textColor }}
                >
                    Creative
                </span>
                <span
                    className={`font-display font-black text-xl tracking-tighter uppercase transition-colors duration-300 ${isLight ? "text-white/80" : "text-sky"}`}
                >
                    Lab
                </span>
            </div>
        </div>
    );
}
