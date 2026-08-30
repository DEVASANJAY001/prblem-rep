import React, { useState, useEffect, useRef } from "react";
import { ShieldCheck, Check, RotateCcw, AlertCircle, Lock, Sparkles } from "lucide-react";

interface HumanVerificationProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  className?: string;
  theme?: "light" | "dark" | "auto";
  label?: string;
}

const EMOJI_CHALLENGES = [
  { question: "Select the Rocket", target: "🚀", options: ["🚀", "💡", "⚡", "🎯"] },
  { question: "Select the Lightbulb", target: "💡", options: ["🔥", "💡", "🛡️", "🌊"] },
  { question: "Select the Shield", target: "🛡️", options: ["🌲", "📱", "🛡️", "🚗"] },
  { question: "Select the Target", target: "🎯", options: ["🎯", "🍎", "🔑", "🚀"] },
  { question: "Select the Key", target: "🔑", options: ["⭐", "🔑", "📦", "🎨"] },
];

export const HumanVerification: React.FC<HumanVerificationProps> = ({
  onVerify,
  onExpire,
  className = "",
  label = "I'm not a robot",
}) => {
  const [status, setStatus] = useState<"idle" | "verifying" | "challenge" | "verified" | "error">("idle");
  const [challenge, setChallenge] = useState<typeof EMOJI_CHALLENGES[0] | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Behavioral metrics for anti-bot detection
  const mountTime = useRef<number>(Date.now());
  const mouseMoves = useRef<number>(0);
  const touchEvents = useRef<number>(0);

  useEffect(() => {
    mountTime.current = Date.now();
    const handleMove = () => {
      mouseMoves.current += 1;
    };
    const handleTouch = () => {
      touchEvents.current += 1;
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("touchstart", handleTouch, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchstart", handleTouch);
    };
  }, []);

  const generateHumanToken = (): string => {
    const payload = {
      timestamp: Date.now(),
      entropy: mouseMoves.current + touchEvents.current,
      client: "prblms_human_v1",
      nonce: Math.random().toString(36).substring(2, 10),
    };
    return btoa(JSON.stringify(payload));
  };

  const handleCheckboxClick = () => {
    if (status === "verifying" || status === "verified") return;

    setStatus("verifying");
    setErrorMsg(null);

    const elapsed = Date.now() - mountTime.current;
    const isHeadless = (window.navigator as any).webdriver || !(window as any).chrome && !(window as any).safari && !(window as any).fetch;
    const isBotVelocity = elapsed < 350 && mouseMoves.current === 0 && touchEvents.current === 0;

    // Simulate cryptographic challenge verification
    setTimeout(() => {
      if (isHeadless || isBotVelocity) {
        // If suspicious bot metrics detected, prompt quick 1-click human verification puzzle
        const randomChallenge = EMOJI_CHALLENGES[Math.floor(Math.random() * EMOJI_CHALLENGES.length)];
        setChallenge(randomChallenge);
        setStatus("challenge");
      } else {
        // Legitimate human interaction confirmed
        completeVerification();
      }
    }, 750);
  };

  const completeVerification = () => {
    setStatus("verified");
    const token = generateHumanToken();
    onVerify(token);

    // Tokens naturally expire after 15 minutes
    setTimeout(() => {
      setStatus("idle");
      if (onExpire) onExpire();
    }, 15 * 60 * 1000);
  };

  const handleChallengePick = (selectedEmoji: string) => {
    if (!challenge) return;
    if (selectedEmoji === challenge.target) {
      completeVerification();
    } else {
      setErrorMsg("Incorrect selection. Please try again.");
      const nextChallenge = EMOJI_CHALLENGES[Math.floor(Math.random() * EMOJI_CHALLENGES.length)];
      setChallenge(nextChallenge);
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {/* ── Main Checkbox Widget ────────────────────────────────────────────── */}
      <div
        className={`w-full max-w-[320px] p-3 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-3 shadow-2xs select-none ${
          status === "verified"
            ? "bg-emerald-50/70 border-emerald-300 text-emerald-950"
            : status === "error"
            ? "bg-rose-50/70 border-rose-300 text-rose-950"
            : "bg-surface-container-lowest border-outline-variant/40 text-on-surface hover:border-primary/40 hover:bg-surface-container/20"
        }`}
      >
        {/* Interactive Checkbox */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCheckboxClick}
            disabled={status === "verifying" || status === "verified"}
            aria-label="Human verification checkbox"
            className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all cursor-pointer ${
              status === "verified"
                ? "bg-emerald-600 border-emerald-600 text-white shadow-2xs scale-105"
                : status === "verifying"
                ? "border-primary bg-primary/10"
                : "border-gray-300 bg-white hover:border-primary"
            }`}
          >
            {status === "verifying" && (
              <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            )}
            {status === "verified" && <Check className="w-4 h-4 stroke-[3]" />}
          </button>

          <span
            onClick={handleCheckboxClick}
            className="text-xs font-semibold text-on-surface cursor-pointer select-none"
          >
            {status === "verified" ? "Human Verified" : label}
          </span>
        </div>

        {/* Security Badge Attribution */}
        <div className="flex flex-col items-end shrink-0 text-right opacity-80">
          <div className="flex items-center gap-1 text-[10px] font-bold text-primary">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            <span>ProblemAtlas</span>
          </div>
          <span className="text-[8px] text-on-surface-variant">Bot Shield</span>
        </div>
      </div>

      {/* ── Interactive Emoji Challenge (Triggers Only If Bot Heuristics Fail) ─ */}
      {status === "challenge" && challenge && (
        <div className="w-full max-w-[320px] p-4 rounded-2xl bg-surface-container-lowest border border-primary/40 shadow-md animate-scale-up flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-on-surface flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Quick Verification: {challenge.question}</span>
            </span>
            <button
              type="button"
              onClick={() => {
                const next = EMOJI_CHALLENGES[Math.floor(Math.random() * EMOJI_CHALLENGES.length)];
                setChallenge(next);
              }}
              className="text-gray-400 hover:text-primary transition-colors p-1"
              title="New Challenge"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {challenge.options.map((emoji, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleChallengePick(emoji)}
                className="h-11 rounded-xl bg-surface-container hover:bg-primary/10 hover:border-primary/40 border border-outline-variant/30 text-xl flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                {emoji}
              </button>
            ))}
          </div>

          {errorMsg && (
            <p className="text-[11px] text-error font-semibold flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errorMsg}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
};
