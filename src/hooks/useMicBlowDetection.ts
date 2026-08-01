"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface BlowDetectionOptions {
  threshold?: number; // 0-1 RMS amplitude required to count as a "blow"
  sustainMs?: number; // how long the threshold must be sustained
  onBlow?: () => void;
}

/**
 * Requests mic access and reports a `blown` state once sustained loud input
 * (a real puff of air, roughly) is detected. Falls back gracefully — call
 * `requestAccess` from a user gesture (button tap) since browsers require it.
 */
export function useMicBlowDetection({
  threshold = 0.18,
  sustainMs = 500,
  onBlow,
}: BlowDetectionOptions = {}) {
  const [supported, setSupported] = useState(true);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [blown, setBlown] = useState(false);
  const [level, setLevel] = useState(0);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number | null>(null);
  const sustainStartRef = useRef<number | null>(null);

  const requestAccess = useCallback(async () => {
    if (typeof window === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setSupported(false);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      interface WindowWithWebkitAudio extends Window {
        webkitAudioContext?: typeof AudioContext;
      }
      const AudioCtx =
        window.AudioContext || (window as WindowWithWebkitAudio).webkitAudioContext;
      if (!AudioCtx) {
        setSupported(false);
        return;
      }
      const ctx = new AudioCtx();
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      source.connect(analyser);
      audioCtxRef.current = ctx;
      analyserRef.current = analyser;

      const data = new Uint8Array(analyser.frequencyBinCount);
      const tick = () => {
        analyser.getByteTimeDomainData(data);
        let sumSquares = 0;
        for (let i = 0; i < data.length; i++) {
          const norm = (data[i] - 128) / 128;
          sumSquares += norm * norm;
        }
        const rms = Math.sqrt(sumSquares / data.length);
        setLevel(rms);

        if (rms > threshold) {
          if (sustainStartRef.current === null) sustainStartRef.current = performance.now();
          if (performance.now() - sustainStartRef.current >= sustainMs) {
            setBlown(true);
            onBlow?.();
          }
        } else {
          sustainStartRef.current = null;
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      tick();
    } catch {
      setPermissionDenied(true);
    }
  }, [threshold, sustainMs, onBlow]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      audioCtxRef.current?.close();
    };
  }, []);

  return { supported, permissionDenied, blown, level, requestAccess, setBlown };
}
