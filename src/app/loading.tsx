export default function Loading() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-slate-950">
            <div className="text-center">
                <div className="animate-fade-in-up mb-6">
                    <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        NSS IIT Delhi
                    </span>
                </div>
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-2 tracking-tight">
                    KAIZEN{" "}
                    <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                        2026
                    </span>
                </h1>
                <p className="text-sm text-slate-400 mb-10 font-medium tracking-wide">
                    March 6 – 8, 2026
                </p>
                <div className="mt-8">
                    <div className="inline-flex items-center gap-2 text-slate-400">
                        <svg
                            className="animate-spin h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                        </svg>
                        <span className="text-lg font-medium animate-pulse">
                            Loading...
                        </span>
                    </div>
                </div>
            </div>
        </main>
    );
}
