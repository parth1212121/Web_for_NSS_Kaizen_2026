"use client";

import { useEffect, useState, useCallback } from "react";
import { database } from "@/lib/firebase";
import { ref, onValue, runTransaction } from "firebase/database";
import confetti from "canvas-confetti";

export const dynamic = "force-static";

export default function Home() {
  const [count, setCount] = useState<number>(0);
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDbConnected, setIsDbConnected] = useState<boolean>(true);

  // Check localStorage on mount
  useEffect(() => {
    const voted = localStorage.getItem("kaizen_voted");
    if (voted === "true") {
      setHasVoted(true);
      setShowSuccess(true);
    }
  }, []);

  // Real-time listener for counter
  useEffect(() => {
    if (!database) {
      setIsDbConnected(false);
      setIsLoading(false);
      return;
    }

    const counterRef = ref(database, "counter");

    const unsubscribe = onValue(
      counterRef,
      (snapshot) => {
        const value = snapshot.exists() ? snapshot.val() : 0;
        setCount(value);
        setIsLoading(false);
      },
      (error) => {
        console.error("Firebase listener error:", error);
        setIsDbConnected(false);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Fire confetti
  const fireConfetti = useCallback(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ["#2563eb", "#3b82f6", "#f59e0b", "#10b981", "#8b5cf6", "#ec4899"];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    // Big initial burst
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.6 },
      colors,
    });

    frame();
  }, []);

  // Handle vote
  const handleVote = async () => {
    if (hasVoted || isAnimating || !database) return;

    setIsAnimating(true);

    try {
      const counterRef = ref(database, "counter");
      await runTransaction(counterRef, (currentValue) => {
        return (currentValue || 0) + 1;
      });

      localStorage.setItem("kaizen_voted", "true");
      setHasVoted(true);

      // Fire confetti
      fireConfetti();

      // Show success message after a brief delay
      setTimeout(() => {
        setShowSuccess(true);
        setIsAnimating(false);
      }, 500);
    } catch (error) {
      console.error("Error incrementing counter:", error);
      setIsAnimating(false);
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden">
      {/* Floating decorative particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="particle absolute rounded-full bg-blue-500/20"
            style={{
              width: `${8 + i * 6}px`,
              height: `${8 + i * 6}px`,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto text-center">
        {/* Logo / Badge */}
        <div className="animate-fade-in-up mb-6">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-blue-500/20 text-blue-300 border border-blue-500/30 backdrop-blur-sm">
            NSS IIT Delhi
          </span>
        </div>

        {/* Event Title */}
        <h1
          className="animate-fade-in-up text-5xl sm:text-6xl md:text-7xl font-black text-white mb-2 tracking-tight"
          style={{ animationDelay: "0.1s" }}
        >
          KAIZEN{" "}
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            2026
          </span>
        </h1>

        {/* Date badge */}
        <p
          className="animate-fade-in-up text-sm text-slate-400 mb-10 font-medium tracking-wide"
          style={{ animationDelay: "0.2s" }}
        >
          March 6 – 8, 2026
        </p>

        {/* Question or Success */}
        {!showSuccess ? (
          <div style={{ animationDelay: "0.3s" }} className="animate-fade-in-up">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white/90 mb-8 leading-relaxed">
              Are you going to stay back
              <br />
              for creating{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                impact
              </span>
              ?
            </h2>

            {/* Yes Button */}
            <button
              onClick={handleVote}
              disabled={hasVoted || isAnimating || !isDbConnected}
              className={`
                btn-shine group relative inline-flex items-center justify-center
                px-12 py-4 text-lg font-bold text-white rounded-2xl
                transition-all duration-300 transform
                ${hasVoted || !isDbConnected
                  ? "bg-slate-600 cursor-not-allowed opacity-50"
                  : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 active:scale-95 cursor-pointer"
                }
              `}
            >
              {isAnimating ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Counting you in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span className="text-2xl">✋</span>
                  Yes, I&apos;m in!
                </span>
              )}
            </button>
          </div>
        ) : (
          <div className="animate-scale-pop">
            {/* Success state */}
            <div className="relative">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
                Let&apos;s meet at{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Kaizen 2026!
                </span>
              </h2>
              <p className="text-slate-400 text-lg mb-2">
                You&apos;re part of something amazing.
              </p>
              <p className="text-slate-500 text-sm">
                March 6 – 8 &middot; IIT Delhi Campus
              </p>
            </div>
          </div>
        )}

        {/* Live Counter */}
        <div
          className="animate-fade-in-up mt-12"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="counter-glow inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="text-2xl">🔥</span>
            {isLoading ? (
              <span className="text-lg text-slate-400 font-medium">
                Loading...
              </span>
            ) : (
              <span className="text-lg sm:text-xl font-bold text-white">
                <span
                  key={count}
                  className="inline-block animate-bump text-3xl sm:text-4xl font-black bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent"
                >
                  {count.toLocaleString()}
                </span>{" "}
                students are staying back!
              </span>
            )}
          </div>
        </div>

        {/* Warning when DB is disconnected */}
        {!isDbConnected && (
          <p className="mt-4 text-amber-400/80 text-sm animate-fade-in-up">
            ⚠️ Unable to connect to database. Please check your Firebase
            configuration.
          </p>
        )}

        {/* Footer */}
        <div
          className="animate-fade-in-up mt-16 text-slate-500 text-xs"
          style={{ animationDelay: "0.7s" }}
        >
          <p>Made with ❤️ by NSS IIT Delhi</p>
        </div>
      </div>
    </main>
  );
}
