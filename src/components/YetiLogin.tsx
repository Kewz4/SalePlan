import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

export default function YetiLogin({ onLogin }: { onLogin: () => void }) {
  // SVG element refs
  const svgRef       = useRef<SVGSVGElement>(null);
  const twoFingersRef = useRef(null);
  const armLRef      = useRef(null);
  const armRRef      = useRef(null);
  const eyeLRef      = useRef(null);
  const eyeRRef      = useRef(null);
  const noseRef      = useRef(null);
  const mouthRef     = useRef(null);
  const chinRef      = useRef(null);
  const faceRef      = useRef(null);
  const eyebrowRef   = useRef(null);
  const outerEarLRef = useRef(null);
  const outerEarRRef = useRef(null);
  const earHairLRef  = useRef(null);
  const earHairRRef  = useRef(null);
  const hairRef      = useRef(null);
  const bodyBGRef         = useRef(null);
  const bodyBGchangedRef  = useRef(null);

  // Input refs
  const emailRef     = useRef<HTMLInputElement>(null);
  const passwordRef  = useRef<HTMLInputElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  // State
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  // Mutable flags — avoid re-renders for animation state
  const activeRef   = useRef<string | null>(null); // 'email' | 'password' | 'toggle' | null
  const coveredRef  = useRef(false);
  const showPassRef = useRef(false);
  useEffect(() => { showPassRef.current = showPassword; }, [showPassword]);

  // --- GSAP initial setup (once) ---
  useEffect(() => {
    gsap.set([armLRef.current, armRRef.current], { visibility: 'hidden' });
    gsap.set(armLRef.current, { x: -93, y: 220, rotation: 105, transformOrigin: 'top left' });
    gsap.set(armRRef.current, { x: -93, y: 220, rotation: -105, transformOrigin: 'top right' });
    gsap.set(mouthRef.current, { transformOrigin: '50% 50%', scaleY: 0.1, scaleX: 0.8 });
    gsap.set([eyeLRef.current, eyeRRef.current], { transformOrigin: '50% 50%', scaleY: 1, scaleX: 1 });

    return () => {
      gsap.killTweensOf([
        eyeLRef.current, eyeRRef.current, noseRef.current, mouthRef.current,
        chinRef.current, faceRef.current, eyebrowRef.current,
        outerEarLRef.current, outerEarRRef.current,
        earHairLRef.current, earHairRRef.current, hairRef.current,
        armLRef.current, armRRef.current, twoFingersRef.current,
      ]);
    };
  }, []);

  // --- Blink loop — pauses while eyes are covered ---
  useEffect(() => {
    if (isPasswordFocused) return;
    let blinkCall: ReturnType<typeof gsap.delayedCall>;
    const scheduleBlink = (delay: number) => {
      blinkCall = gsap.delayedCall(delay, () => {
        gsap.to([eyeLRef.current, eyeRRef.current], {
          scaleY: 0, duration: 0.08, yoyo: true, repeat: 1, ease: 'power2.inOut',
          onComplete: () => scheduleBlink(2.5 + Math.random() * 3),
        });
      });
    };
    scheduleBlink(2);
    return () => blinkCall?.kill();
  }, [isPasswordFocused]);

  // --- Measure caret X on screen (mirrors the CodePen getPosition approach) ---
  const getCaretX = (): number => {
    const el = emailRef.current;
    if (!el) return 0;
    const carPos = el.selectionEnd ?? el.value.length;
    const cs = window.getComputedStyle(el);
    const mirror = document.createElement('div');
    Object.assign(mirror.style, {
      position: 'fixed', left: '-9999px', top: '0',
      whiteSpace: 'pre', visibility: 'hidden', display: 'inline-block',
      fontFamily: cs.fontFamily, fontSize: cs.fontSize,
      fontWeight: cs.fontWeight, letterSpacing: cs.letterSpacing,
    });
    mirror.textContent = el.value.slice(0, carPos) || ' ';
    document.body.appendChild(mirror);
    const mw = mirror.getBoundingClientRect().width;
    document.body.removeChild(mirror);
    const r = el.getBoundingClientRect();
    const pl = parseFloat(cs.paddingLeft) || 16;
    return Math.min(r.left + pl + mw - el.scrollLeft, r.right - 8);
  };

  // --- Full face physics — translated from CodePen JS (TweenMax → GSAP 3) ---
  const moveFace = () => {
    if (!svgRef.current || !emailRef.current) return;
    const sr  = svgRef.current.getBoundingClientRect();
    const er  = emailRef.current.getBoundingClientRect();
    const cx  = getCaretX();
    const cy  = er.top + er.height / 2;
    const sc  = sr.width / 200;  // SVG viewBox is 200×200
    const dy  = 18 * sc;         // compensate for g transform="translate(0,18)"

    // Anchor points of face elements in screen space
    const eyeL  = { x: sr.left + 85  * sc, y: sr.top + 80  * sc + dy };
    const eyeR  = { x: sr.left + 115 * sc, y: sr.top + 80  * sc + dy };
    const nose  = { x: sr.left + 100 * sc, y: sr.top + 83  * sc + dy };
    const mouth = { x: sr.left + 100 * sc, y: sr.top + 102 * sc + dy };
    const svgCx = sr.left + sr.width / 2;
    const dFromC = svgCx - cx;
    const tx = Math.min(cx, er.right);

    const ang = (p: { x: number; y: number }) => Math.atan2(p.y - cy, p.x - tx);
    const elA = ang(eyeL), erA = ang(eyeR), nA = ang(nose), mA = ang(mouth);

    const elX = Math.cos(elA) * 20, elY = Math.sin(elA) * 10;
    const erX = Math.cos(erA) * 20, erY = Math.sin(erA) * 10;
    const nX  = Math.cos(nA)  * 23, nY  = Math.sin(nA)  * 10;
    const mX  = Math.cos(mA)  * 23, mY  = Math.sin(mA)  * 10;
    const mR  = Math.cos(mA)  * 6;
    const cX  = mX * 0.8, cY = mY * 0.5;
    let cS = 1 - (dFromC * 0.15 / 100);
    if (cS > 1) { cS = 1 - (cS - 1); if (cS < 0.5) cS = 0.5; }
    const fX = mX * 0.3, fY = mY * 0.4;
    const fSk = Math.cos(mA) * 5, ebSk = Math.cos(mA) * 25;
    const eX = Math.cos(mA) * 4, eY = Math.cos(mA) * 5;
    const hX = Math.cos(mA) * 6;

    const d = 1, e = 'expo.out';
    gsap.to(eyeLRef.current,      { duration: d, x: -elX, y: -elY, ease: e });
    gsap.to(eyeRRef.current,      { duration: d, x: -erX, y: -erY, ease: e });
    gsap.to(noseRef.current,      { duration: d, x: -nX, y: -nY, rotation: mR, transformOrigin: 'center center', ease: e });
    gsap.to(mouthRef.current,     { duration: d, x: -mX, y: -mY, rotation: mR, transformOrigin: 'center center', ease: e });
    gsap.to(chinRef.current,      { duration: d, x: -cX, y: -cY, scaleY: cS, ease: e });
    gsap.to(faceRef.current,      { duration: d, x: -fX, y: -fY, skewX: -fSk, transformOrigin: 'center top', ease: e });
    gsap.to(eyebrowRef.current,   { duration: d, x: -fX, y: -fY, skewX: -ebSk, transformOrigin: 'center top', ease: e });
    gsap.to(outerEarLRef.current, { duration: d, x: eX, y: -eY, ease: e });
    gsap.to(outerEarRRef.current, { duration: d, x: eX, y:  eY, ease: e });
    gsap.to(earHairLRef.current,  { duration: d, x: -eX, y: -eY, ease: e });
    gsap.to(earHairRRef.current,  { duration: d, x: -eX, y:  eY, ease: e });
    gsap.to(hairRef.current,      { duration: d, x: hX, scaleY: 1.2, transformOrigin: 'center bottom', ease: e });
  };

  // --- Simulated mouth morphing (no MorphSVGPlugin needed) ---
  const updateMouth = (value: string) => {
    const d = 1, e = 'expo.out';
    if (value.length === 0) {
      gsap.to(mouthRef.current, { duration: d, scaleY: 0.1, scaleX: 0.8, ease: e });
      gsap.to([eyeLRef.current, eyeRRef.current], { duration: d, scaleX: 1, scaleY: 1, ease: e });
    } else if (value.includes('@')) {
      // Full smile — squinted eyes
      gsap.to(mouthRef.current, { duration: d, scaleY: 1.0, scaleX: 1.0, ease: e });
      gsap.to([eyeLRef.current, eyeRRef.current], { duration: d, scaleX: 0.65, scaleY: 0.65, transformOrigin: 'center center', ease: e });
    } else {
      // Medium opening
      gsap.to(mouthRef.current, { duration: d, scaleY: 0.55, scaleX: 0.95, ease: e });
      gsap.to([eyeLRef.current, eyeRRef.current], { duration: d, scaleX: 0.85, scaleY: 0.85, ease: e });
    }
  };

  // --- Reset face to neutral ---
  const resetFace = () => {
    const d = 1, e = 'expo.out';
    gsap.to([eyeLRef.current, eyeRRef.current], { duration: d, x: 0, y: 0, scaleX: 1, scaleY: 1, ease: e });
    gsap.to(noseRef.current,  { duration: d, x: 0, y: 0, rotation: 0, ease: e });
    gsap.to(mouthRef.current, { duration: d, x: 0, y: 0, rotation: 0, scaleY: 0.1, scaleX: 0.8, ease: e });
    gsap.to(chinRef.current,  { duration: d, x: 0, y: 0, scaleY: 1, ease: e });
    gsap.to([faceRef.current, eyebrowRef.current], { duration: d, x: 0, y: 0, skewX: 0, ease: e });
    gsap.to([outerEarLRef.current, outerEarRRef.current, earHairLRef.current, earHairRRef.current], { duration: d, x: 0, y: 0, ease: e });
    gsap.to(hairRef.current, { duration: d, x: 0, scaleY: 1, ease: e });
  };

  // --- Eye cover / uncover ---
  const coverEyes = () => {
    if (coveredRef.current) return;
    coveredRef.current = true;
    gsap.killTweensOf([armLRef.current, armRRef.current]);
    gsap.set([armLRef.current, armRRef.current], { visibility: 'visible' });
    gsap.to(armLRef.current, { duration: 0.45, x: -93, y: 25, rotation: 0, ease: 'power2.out' });
    gsap.to(armRRef.current, { duration: 0.45, x: -93, y: 25, rotation: 0, ease: 'power2.out', delay: 0.1 });
    if (bodyBGRef.current)        (bodyBGRef.current as any).style.display = 'none';
    if (bodyBGchangedRef.current) (bodyBGchangedRef.current as any).style.display = 'block';
  };

  const uncoverEyes = () => {
    if (!coveredRef.current) return;
    coveredRef.current = false;
    gsap.killTweensOf([armLRef.current, armRRef.current, twoFingersRef.current]);
    gsap.to(armLRef.current, { duration: 1.35, y: 220, x: -93, rotation: 105, ease: 'power2.out' });
    gsap.to(armRRef.current, {
      duration: 1.35, y: 220, x: -93, rotation: -105, ease: 'power2.out', delay: 0.1,
      onComplete: () => gsap.set([armLRef.current, armRRef.current], { visibility: 'hidden' }),
    });
    gsap.to(twoFingersRef.current, { duration: 0.3, rotation: 0, x: 0, y: 0, transformOrigin: 'bottom left', ease: 'power2.inOut' });
    if (bodyBGRef.current)        (bodyBGRef.current as any).style.display = 'block';
    if (bodyBGchangedRef.current) (bodyBGchangedRef.current as any).style.display = 'none';
  };

  // --- Email handlers ---
  const handleEmailFocus = () => {
    activeRef.current = 'email';
    if (coveredRef.current) { uncoverEyes(); setIsPasswordFocused(false); }
    moveFace();
    updateMouth(emailRef.current?.value ?? '');
  };

  const handleEmailInput = () => {
    moveFace();
    updateMouth(emailRef.current?.value ?? '');
  };

  const handleEmailBlur = () => {
    activeRef.current = null;
    setTimeout(() => {
      if (activeRef.current !== null) return;
      resetFace();
    }, 100);
  };

  // --- Password handlers ---
  const handlePasswordFocus = () => {
    activeRef.current = 'password';
    setIsPasswordFocused(true);
    resetFace();
    coverEyes();
    if (showPassRef.current) {
      gsap.to(twoFingersRef.current, { duration: 0.35, transformOrigin: 'bottom left', rotation: 30, x: -9, y: -2, ease: 'power2.inOut', delay: 0.2 });
    }
  };

  const handlePasswordBlur = () => {
    activeRef.current = null;
    setTimeout(() => {
      if (activeRef.current === 'password' || activeRef.current === 'toggle') return;
      uncoverEyes();
      setIsPasswordFocused(false);
    }, 100);
  };

  // --- Toggle handlers ---
  const handleToggleFocus = () => {
    activeRef.current = 'toggle';
    if (!coveredRef.current) coverEyes();
  };

  const handleToggleBlur = () => {
    activeRef.current = null;
    setTimeout(() => {
      if (activeRef.current !== null) return;
      uncoverEyes();
      setIsPasswordFocused(false);
    }, 100);
  };

  const handleTogglePassword = () => {
    const next = !showPassRef.current;
    setShowPassword(next);
    activeRef.current = 'password'; // claim focus before blur fires
    if (next) {
      gsap.to(twoFingersRef.current, { duration: 0.35, transformOrigin: 'bottom left', rotation: 30, x: -9, y: -2, ease: 'power2.inOut' });
    } else {
      gsap.to(twoFingersRef.current, { duration: 0.35, transformOrigin: 'bottom left', rotation: 0, x: 0, y: 0, ease: 'power2.inOut' });
    }
    setTimeout(() => passwordRef.current?.focus(), 50);
  };

  return (
    <div className="w-full flex justify-center flex-col items-center">
      <div className="relative w-48 h-48 mx-auto -mt-6 -mb-6 rounded-full bg-white shadow-md border-[3px] border-[#253884]" style={{ zIndex: 10 }}>
        <svg ref={svgRef} className="absolute left-0 top-0 w-full h-full rounded-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
          <defs>
            <circle id="armMaskPath" cx="100" cy="100" r="100" />
          </defs>
          <clipPath id="armMask">
            <use href="#armMaskPath" overflow="visible" />
          </clipPath>

          <circle cx="100" cy="100" r="100" fill="#e6eaf8" />

          <g transform="translate(0, 18)">
            <g>
              <path ref={bodyBGchangedRef} style={{ display: 'none' }} fill="#ffffff" stroke="#253884" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M200,122h-35h-14.9V72c0-27.6-22.4-50-50-50s-50,22.4-50,50v50H35.8H0l0,91h200L200,122z" />
              <path ref={bodyBGRef} stroke="#253884" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="#ffffff" d="M200,158.5c0-20.2-14.8-36.5-35-36.5h-14.9V72.8c0-27.4-21.7-50.4-49.1-50.8c-28-0.5-50.9,22.1-50.9,50v50 H35.8C16,122,0,138,0,157.8L0,213h200L200,158.5z" />
              <path fill="#eef1fa" d="M100,156.4c-22.9,0-43,11.1-54.1,27.7c15.6,10,34.2,15.9,54.1,15.9s38.5-5.8,54.1-15.9 C143,167.5,122.9,156.4,100,156.4z" />
            </g>

            {/* Ears */}
            <g className="earL">
              <g ref={outerEarLRef} fill="#eef1fa" stroke="#253884" strokeWidth="2.5">
                <circle cx="47" cy="83" r="11.5" />
                <path d="M46.3 78.9c-2.3 0-4.1 1.9-4.1 4.1 0 2.3 1.9 4.1 4.1 4.1" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              <g ref={earHairLRef}>
                <rect x="51" y="64" fill="#ffffff" width="15" height="35" />
                <path d="M53.4 62.8C48.5 67.4 45 72.2 42.8 77c3.4-.1 6.8-.1 10.1.1-4 3.7-6.8 7.6-8.2 11.6 2.1 0 4.2 0 6.3.2-2.6 4.1-3.8 8.3-3.7 12.5 1.2-.7 3.4-1.4 5.2-1.9" fill="#ffffff" stroke="#253884" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </g>
            <g className="earR">
              <g ref={outerEarRRef} fill="#eef1fa" stroke="#253884" strokeWidth="2.5">
                <circle cx="153" cy="83" r="11.5" />
                <path d="M153.7,78.9c2.3,0,4.1,1.9,4.1,4.1c0,2.3-1.9,4.1-4.1,4.1" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              <g ref={earHairRRef}>
                <rect x="134" y="64" fill="#ffffff" width="15" height="35" />
                <path fill="#ffffff" stroke="#253884" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M146.6,62.8c4.9,4.6,8.4,9.4,10.6,14.2c-3.4-0.1-6.8-0.1-10.1,0.1c4,3.7,6.8,7.6,8.2,11.6c-2.1,0-4.2,0-6.3,0.2c2.6,4.1,3.8,8.3,3.7,12.5c-1.2-0.7-3.4-1.4-5.2-1.9" />
              </g>
            </g>

            {/* Chin */}
            <path ref={chinRef} d="M84.1 121.6c2.7 2.9 6.1 5.4 9.8 7.5l.9-4.5c2.9 2.5 6.3 4.8 10.2 6.5 0-1.9-.1-3.9-.2-5.8 3 1.2 6.2 2 9.7 2.5-.3-2.1-.7-4.1-1.2-6.1" fill="none" stroke="#253884" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

            {/* Face shape */}
            <path ref={faceRef} fill="#eef1fa" d="M134.5,46v35.5c0,21.815-15.446,39.5-34.5,39.5s-34.5-17.685-34.5-39.5V46" />

            {/* Hair */}
            <path ref={hairRef} fill="#ffffff" stroke="#253884" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M81.457,27.929c1.755-4.084,5.51-8.262,11.253-11.77c0.979,2.565,1.883,5.14,2.712,7.723c3.162-4.265,8.626-8.27,16.272-11.235c-0.737,3.293-1.588,6.573-2.554,9.837c4.857-2.116,11.049-3.64,18.428-4.156c-2.403,3.23-5.021,6.391-7.852,9.474" />

            {/* Eyebrow */}
            <g ref={eyebrowRef}>
              <path fill="#ffffff" d="M138.142,55.064c-4.93,1.259-9.874,2.118-14.787,2.599c-0.336,3.341-0.776,6.689-1.322,10.037c-4.569-1.465-8.909-3.222-12.996-5.226c-0.98,3.075-2.07,6.137-3.267,9.179c-5.514-3.067-10.559-6.545-15.097-10.329c-1.806,2.889-3.745,5.73-5.816,8.515c-7.916-4.124-15.053-9.114-21.296-14.738l1.107-11.768h73.475V55.064z" />
              <path fill="#ffffff" stroke="#253884" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M63.56,55.102c6.243,5.624,13.38,10.614,21.296,14.738c2.071-2.785,4.01-5.626,5.816-8.515c4.537,3.785,9.583,7.263,15.097,10.329c1.197-3.043,2.287-6.104,3.267-9.179c4.087,2.004,8.427,3.761,12.996,5.226c0.545-3.348,0.986-6.696,1.322-10.037c4.913-0.481,9.857-1.34,14.787-2.599" />
            </g>

            {/* Eyes */}
            <g ref={eyeLRef}>
              <circle cx="85" cy="80" r="7.5" fill="#253884" />
              <circle cx="82" cy="77" r="2.5" fill="#fff" />
            </g>
            <g ref={eyeRRef}>
              <circle cx="115" cy="80" r="7.5" fill="#253884" />
              <circle cx="112" cy="77" r="2.5" fill="#fff" />
            </g>

            {/* Mouth */}
            <g ref={mouthRef}>
              <defs>
                <path id="mouthMaskPath2" d="M100 110.2c-9 0-16.2-7.3-16.2-16.2 0-2.3 1.9-4.2 4.2-4.2h24c2.3 0 4.2 1.9 4.2 4.2 0 9-7.2 16.2-16.2 16.2z" />
              </defs>
              <clipPath id="mouthMask2">
                <use href="#mouthMaskPath2" overflow="visible" />
              </clipPath>
              <path fill="#4a5ea8" d="M100 110.2c-9 0-16.2-7.3-16.2-16.2 0-2.3 1.9-4.2 4.2-4.2h24c2.3 0 4.2 1.9 4.2 4.2 0 9-7.2 16.2-16.2 16.2z" />
              <g clipPath="url(#mouthMask2)">
                <circle cx="100" cy="107" r="8" fill="#cc4a6c" />
                <ellipse cx="100" cy="100.5" rx="3" ry="1.5" opacity=".1" fill="#fff" />
                <path fill="#ffffff" d="M106,97h-4c-1.1,0-2-0.9-2-2v-2h8v2C108,96.1,107.1,97,106,97z" />
              </g>
              <path fill="none" stroke="#253884" strokeWidth="2.5" strokeLinejoin="round" d="M100 110.2c-9 0-16.2-7.3-16.2-16.2 0-2.3 1.9-4.2 4.2-4.2h24c2.3 0 4.2 1.9 4.2 4.2 0 9-7.2 16.2-16.2 16.2z" />
            </g>

            {/* Nose */}
            <path ref={noseRef} d="M97.7 79.9h4.7c1.9 0 3 2.2 1.9 3.7l-2.3 3.3c-.9 1.3-2.9 1.3-3.8 0l-2.3-3.3c-1.3-1.6-.2-3.7 1.8-3.7z" fill="#253884" />

            {/* Arms — clipped to circle */}
            <g clipPath="url(#armMask)">
              <g ref={armLRef} style={{ visibility: 'hidden' }}>
                <polygon fill="#eef1fa" stroke="#253884" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" points="121.3,98.4 111,59.7 149.8,49.3 169.8,85.4" />
                <path fill="#eef1fa" stroke="#253884" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M134.4,53.5l19.3-5.2c2.7-0.7,5.4,0.9,6.1,3.5v0c0.7,2.7-0.9,5.4-3.5,6.1l-10.3,2.8" />
                <path fill="#eef1fa" stroke="#253884" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M150.9,59.4l26-7c2.7-0.7,5.4,0.9,6.1,3.5v0c0.7,2.7-0.9,5.4-3.5,6.1l-21.3,5.7" />
                <g ref={twoFingersRef}>
                  <path fill="#eef1fa" stroke="#253884" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M158.3,67.8l23.1-6.2c2.7-0.7,5.4,0.9,6.1,3.5v0c0.7,2.7-0.9,5.4-3.5,6.1l-23.1,6.2" />
                  <path fill="#c5cef5" d="M180.1,65l2.2-0.6c1.1-0.3,2.2,0.3,2.4,1.4v0c0.3,1.1-0.3,2.2-1.4,2.4l-2.2,0.6L180.1,65z" />
                  <path fill="#eef1fa" stroke="#253884" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M160.8,77.5l19.4-5.2c2.7-0.7,5.4,0.9,6.1,3.5v0c0.7,2.7-0.9,5.4-3.5,6.1l-18.3,4.9" />
                  <path fill="#c5cef5" d="M178.8,75.7l2.2-0.6c1.1-0.3,2.2,0.3,2.4,1.4v0c0.3,1.1-0.3,2.2-1.4,2.4l-2.2,0.6L178.8,75.7z" />
                </g>
                <path fill="#c5cef5" d="M175.5,55.9l2.2-0.6c1.1-0.3,2.2,0.3,2.4,1.4v0c0.3,1.1-0.3,2.2-1.4,2.4l-2.2,0.6L175.5,55.9z" />
                <path fill="#c5cef5" d="M152.1,50.4l2.2-0.6c1.1-0.3,2.2,0.3,2.4,1.4v0c0.3,1.1-0.3,2.2-1.4,2.4l-2.2,0.6L152.1,50.4z" />
                <path fill="#ffffff" stroke="#253884" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M123.5,97.8c-41.4,14.9-84.1,30.7-108.2,35.5L1.2,81c33.5-9.9,71.9-16.5,111.9-21.8" />
                <path fill="#ffffff" stroke="#253884" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M108.5,60.4c7.7-5.3,14.3-8.4,22.8-13.2c-2.4,5.3-4.7,10.3-6.7,15.1c4.3,0.3,8.4,0.7,12.3,1.3c-4.2,5-8.1,9.6-11.5,13.9c3.1,1.1,6,2.4,8.7,3.8c-1.4,2.9-2.7,5.8-3.9,8.5c2.5,3.5,4.6,7.2,6.3,11c-4.9-0.8-9-0.7-16.2-2.7" />
                <path fill="#ffffff" stroke="#253884" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M94.5,103.8c-0.6,4-3.8,8.9-9.4,14.7c-2.6-1.8-5-3.7-7.2-5.7c-2.5,4.1-6.6,8.8-12.2,14c-1.9-2.2-3.4-4.5-4.5-6.9c-4.4,3.3-9.5,6.9-15.4,10.8c-0.2-3.4,0.1-7.1,1.1-10.9" />
                <path fill="#ffffff" stroke="#253884" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M97.5,63.9c-1.7-2.4-5.9-4.1-12.4-5.2c-0.9,2.2-1.8,4.3-2.5,6.5c-3.8-1.8-9.4-3.1-17-3.8c0.5,2.3,1.2,4.5,1.9,6.8c-5-0.6-11.2-0.9-18.4-1c2,2.9,0.9,3.5,3.9,6.2" />
              </g>
              <g ref={armRRef} style={{ visibility: 'hidden' }}>
                <path fill="#eef1fa" stroke="#253884" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2.5" d="M265.4 97.3l10.4-38.6-38.9-10.5-20 36.1z" />
                <path fill="#eef1fa" stroke="#253884" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2.5" d="M252.4 52.4L233 47.2c-2.7-.7-5.4.9-6.1 3.5-.7 2.7.9 5.4 3.5 6.1l10.3 2.8M226 76.4l-19.4-5.2c-2.7-.7-5.4.9-6.1 3.5-.7 2.7.9 5.4 3.5 6.1l18.3 4.9M228.4 66.7l-23.1-6.2c-2.7-.7-5.4.9-6.1 3.5-.7 2.7.9 5.4 3.5 6.1l23.1 6.2M235.8 58.3l-26-7c-2.7-.7-5.4.9-6.1 3.5-.7 2.7.9 5.4 3.5 6.1l21.3 5.7" />
                <path fill="#c5cef5" d="M207.9 74.7l-2.2-.6c-1.1-.3-2.2.3-2.4 1.4-.3 1.1.3 2.2 1.4 2.4l2.2.6 1-3.8zM206.7 64l-2.2-.6c-1.1-.3-2.2.3-2.4 1.4-.3 1.1.3 2.2 1.4 2.4l2.2.6 1-3.8zM211.2 54.8l-2.2-.6c-1.1-.3-2.2.3-2.4 1.4-.3 1.1.3 2.2 1.4 2.4l2.2.6 1-3.8zM234.6 49.4l-2.2-.6c-1.1-.3-2.2.3-2.4 1.4-.3 1.1.3 2.2 1.4 2.4l2.2.6 1-3.8z" />
                <path fill="#ffffff" stroke="#253884" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M263.3 96.7c41.4 14.9 84.1 30.7 108.2 35.5l14-52.3C352 70 313.6 63.5 273.6 58.1" />
                <path fill="#ffffff" stroke="#253884" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M278.2 59.3l-18.6-10 2.5 11.9-10.7 6.5 9.9 8.7-13.9 6.4 9.1 5.9-13.2 9.2 23.1-.9M284.5 100.1c-.4 4 1.8 8.9 6.7 14.8 3.5-1.8 6.7-3.6 9.7-5.5 1.8 4.2 5.1 8.9 10.1 14.1 2.7-2.1 5.1-4.4 7.1-6.8 4.1 3.4 9 7 14.7 11 1.2-3.4 1.8-7 1.7-10.9" />
              </g>
            </g>
          </g>
        </svg>
      </div>

      <div className="w-full bg-white p-8 subtle-shadow rounded-3xl relative card-shadow mt-2">
        <div className="space-y-5 relative z-20">
          {/* Email */}
          <div className="relative">
            <input
              ref={emailRef}
              onFocus={handleEmailFocus}
              onBlur={handleEmailBlur}
              onInput={handleEmailInput}
              type="text"
              autoComplete="email"
              placeholder=" "
              className="peer w-full px-4 pt-6 pb-2 border-2 border-gray-100 bg-gray-50 outline-none text-lg font-semibold rounded-xl text-[#253884] focus:border-[#253884] focus:bg-white transition-[border-color,background-color]"
            />
            <label className="absolute left-4 top-4 text-gray-400 font-semibold text-sm pointer-events-none transition-all peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-[#253884] peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm">
              E-mail o ID de usuario
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              ref={passwordRef}
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder=" "
              className="peer w-full px-4 pt-6 pb-2 pr-12 border-2 border-gray-100 bg-gray-50 outline-none text-lg font-semibold rounded-xl text-[#253884] focus:border-[#253884] focus:bg-white transition-[border-color,background-color]"
            />
            <label className="absolute left-4 top-4 text-gray-400 font-semibold text-sm pointer-events-none transition-all peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-[#253884] peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm">
              Contraseña
            </label>
            <button
              ref={toggleBtnRef}
              type="button"
              onFocus={handleToggleFocus}
              onBlur={handleToggleBlur}
              onClick={handleTogglePassword}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-[#253884] opacity-50 active:opacity-100 transition-opacity"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
              )}
            </button>
          </div>

          <button onClick={onLogin} type="button" className="w-full py-4 bg-[#253884] shadow-md text-white font-heading text-xl rounded-2xl mt-6 active:scale-[0.97] transition-transform">
            INGRESAR
          </button>
        </div>
      </div>
    </div>
  );
}
