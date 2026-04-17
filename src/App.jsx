import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float } from '@react-three/drei'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const CONFETTI_COUNT = 70

const seeded = (seed) => {
  const x = Math.sin(seed * 91.345 + 13.1) * 43758.5453
  return x - Math.floor(x)
}

gsap.registerPlugin(ScrollTrigger)

function AnimatedRings() {
  const ring1Ref = useRef()
  const ring2Ref = useRef()
  const ring3Ref = useRef()

  useFrame((_, delta) => {
    ;[ring1Ref, ring2Ref, ring3Ref].forEach((ringRef, index) => {
      if (!ringRef.current) return
      ringRef.current.rotation.y += delta * (0.07 + index * 0.015)
      ringRef.current.rotation.x += delta * (0.03 + index * 0.01)
    })
  })

  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[2, 4, 6]} intensity={8} color="#4f46e5" />
      <pointLight position={[-3, -2, 4]} intensity={5} color="#06b6d4" />
      <Environment preset="night" />

      <mesh ref={ring1Ref} position={[0, 0, -2.5]} rotation={[0.4, 0.1, 0]}>
        <torusGeometry args={[2.85, 0.035, 32, 200]} />
        <meshStandardMaterial color="#6366f1" transparent opacity={0.15} />
      </mesh>
      <mesh ref={ring2Ref} position={[0, 0, -2.7]} rotation={[0.85, 0.2, 0.3]}>
        <torusGeometry args={[3.5, 0.032, 32, 180]} />
        <meshStandardMaterial color="#8b5cf6" transparent opacity={0.13} />
      </mesh>
      <mesh ref={ring3Ref} position={[0, 0, -3.1]} rotation={[1.1, 0.4, -0.25]}>
        <torusGeometry args={[4.2, 0.03, 28, 180]} />
        <meshStandardMaterial color="#06b6d4" transparent opacity={0.12} />
      </mesh>
    </>
  )
}

function FloatingParticles() {
  const pointsRef = useRef()
  const points = useMemo(() => {
    const temp = []
    for (let i = 0; i < 140; i += 1) {
      temp.push((seeded(i + 1) - 0.5) * 18)
      temp.push((seeded(i + 102) - 0.5) * 11)
      temp.push((seeded(i + 777) - 0.5) * 8 - 2)
    }
    return new Float32Array(temp)
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
    pointsRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.08
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#a5b4fc" size={0.03} transparent opacity={0.22} />
    </points>
  )
}

function Scissor({ scissorRef }) {
  return (
    <div ref={scissorRef} className="fixed left-0 top-0 z-40 pointer-events-none">
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
        <circle cx="18" cy="18" r="9" stroke="#d1d5db" strokeWidth="3" />
        <circle cx="18" cy="52" r="9" stroke="#d1d5db" strokeWidth="3" />
        <path d="M26 23L57 9" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
        <path d="M26 47L57 63" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
        <circle cx="26" cy="35" r="3.3" fill="#f8fafc" />
      </svg>
    </div>
  )
}

function CalendarIcon() {
  return (
    <svg className="h-9 w-9 text-cyan-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </svg>
  )
}

function CodeIcon() {
  return (
    <svg className="h-5 w-5 text-indigo-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3" y="4" width="18" height="14" rx="2.5" />
      <path d="M9 22h6M12 18v4M10 10l-2 2 2 2M14 10l2 2-2 2" />
    </svg>
  )
}

function TrophyIcon() {
  return (
    <svg className="h-4 w-4 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M8 4h8v3a4 4 0 0 1-8 0V4Z" />
      <path d="M6 7H4a2 2 0 0 0 2 2M18 7h2a2 2 0 0 1-2 2M12 11v4M9 19h6" />
    </svg>
  )
}

function CertificateIcon() {
  return (
    <svg className="h-4 w-4 text-cyan-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="3" width="16" height="18" rx="3" />
      <path d="M8 8h8M8 12h8M9 16h6" />
    </svg>
  )
}

function MedalIcon() {
  return (
    <svg className="h-4 w-4 text-violet-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M8 3h8l-2.5 5h-3z" />
      <circle cx="12" cy="15.5" r="4.5" />
      <path d="m10.8 15.5.8.9 1.6-1.8" />
    </svg>
  )
}

function App() {
  const [showMessage, setShowMessage] = useState(false)
  const [showLandingContent, setShowLandingContent] = useState(false)
  const [isCutState, setIsCutState] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showPresencePopup, setShowPresencePopup] = useState(false)
  const [spotlight, setSpotlight] = useState(false)
  const isCutRef = useRef(false)

  const ribbonRef = useRef(null)
  const ribbonLeftRef = useRef(null)
  const ribbonRightRef = useRef(null)
  const bowRef = useRef(null)
  const flashRef = useRef(null)
  const glowRef = useRef(null)
  const messageRef = useRef(null)
  const landingWrapRef = useRef(null)
  const detailsCardRef = useRef(null)
  const detailsItemsWrapRef = useRef(null)
  const detailsButtonRef = useRef(null)
  const scissorRef = useRef(null)

  const pointer = useRef({ x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 })
  const smoothPointer = useRef({ x: window.innerWidth * 0.5, y: window.innerHeight * 0.5, vx: 0 })
  const isPointerDown = useRef(false)
  const rafRef = useRef(0)

  const playCutSound = useCallback(() => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const gain = audioContext.createGain()
    const highPass = audioContext.createBiquadFilter()
    const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.18, audioContext.sampleRate)
    const data = noiseBuffer.getChannelData(0)

    for (let i = 0; i < data.length; i += 1) {
      data[i] = (seeded(i + 333) * 2 - 1) * (1 - i / data.length)
    }

    const noise = audioContext.createBufferSource()
    noise.buffer = noiseBuffer
    highPass.type = 'highpass'
    highPass.frequency.value = 1400

    const osc = audioContext.createOscillator()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(720, audioContext.currentTime)
    osc.frequency.exponentialRampToValueAtTime(380, audioContext.currentTime + 0.12)

    gain.gain.setValueAtTime(0.001, audioContext.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.24, audioContext.currentTime + 0.015)
    gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.18)

    noise.connect(highPass)
    highPass.connect(gain)
    osc.connect(gain)
    gain.connect(audioContext.destination)

    noise.start()
    osc.start()
    noise.stop(audioContext.currentTime + 0.18)
    osc.stop(audioContext.currentTime + 0.18)
  }, [])

  const triggerCut = useCallback(() => {
    // Explicit cut lock required by interaction logic.
    let isCut = isCutRef.current
    if (isCut) return
    isCut = true
    isCutRef.current = isCut
    setIsCutState(true)
    setSpotlight(true)
    setShowConfetti(true)
    playCutSound()

    const tl = gsap.timeline()
    tl.to(flashRef.current, { opacity: 1, scale: 1.8, duration: 0.14, ease: 'power2.out' })
      .to(flashRef.current, { opacity: 0, scale: 0.8, duration: 0.32, ease: 'power3.out' }, '<')
      .to(glowRef.current, { opacity: 0.95, duration: 0.2 }, '<0.02')
      .to(glowRef.current, { opacity: 0, duration: 0.8, ease: 'power2.out' }, '<0.08')
      .to(
        ribbonLeftRef.current,
        { xPercent: -120, rotation: -11, duration: 1.05, ease: 'power3.inOut' },
        0
      )
      .to(
        ribbonRightRef.current,
        { xPercent: 120, rotation: 11, duration: 1.05, ease: 'power3.inOut' },
        0
      )
      .to(bowRef.current, { x: -1, y: -6, rotation: -6, duration: 0.08, repeat: 3, yoyo: true }, 0.03)
      .to(bowRef.current, { y: 170, rotation: 22, duration: 1.15, ease: 'power3.in' }, 0.28)
      .to(bowRef.current, { opacity: 0, duration: 0.22 }, 1.2)
      .to(ribbonRef.current, { opacity: 0, duration: 0.28 }, 1.15)
      .add(() => setShowMessage(true), 0.6)
  }, [playCutSound])

  const proceedToLanding = useCallback(() => {
    if (!showMessage || !messageRef.current) return
    gsap.to(messageRef.current, {
      opacity: 0,
      duration: 0.45,
      onComplete: () => {
        setShowMessage(false)
        setShowLandingContent(true)
      },
    })
  }, [showMessage])

  useEffect(() => {
    const currentScissor = scissorRef.current
    if (!currentScissor) return undefined

    const updatePointer = (event) => {
      pointer.current.x = event.clientX
      pointer.current.y = event.clientY
    }

    const onDown = () => {
      isPointerDown.current = true
    }

    const onUp = () => {
      isPointerDown.current = false
    }

    const tick = () => {
      smoothPointer.current.vx = pointer.current.x - smoothPointer.current.x
      smoothPointer.current.x += smoothPointer.current.vx * 0.16
      smoothPointer.current.y += (pointer.current.y - smoothPointer.current.y) * 0.16

      gsap.set(currentScissor, {
        x: smoothPointer.current.x - 24,
        y: smoothPointer.current.y - 28,
        rotation: gsap.utils.clamp(-25, 25, smoothPointer.current.vx * 0.11),
        transformOrigin: '26px 35px',
      })

      if (!isCutRef.current && isPointerDown.current && ribbonRef.current) {
        const rect = ribbonRef.current.getBoundingClientRect()
        const intersects =
          smoothPointer.current.x > rect.left &&
          smoothPointer.current.x < rect.right &&
          smoothPointer.current.y > rect.top &&
          smoothPointer.current.y < rect.bottom

        if (intersects) {
          triggerCut()
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', updatePointer)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', updatePointer)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      cancelAnimationFrame(rafRef.current)
    }
  }, [triggerCut])

  useEffect(() => {
    if (!ribbonRef.current) return undefined
    const idle = gsap.to(ribbonRef.current, {
      y: 3,
      duration: 2.1,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    return () => idle.kill()
  }, [])

  useEffect(() => {
    if (!showMessage || !messageRef.current) return

    const lines = messageRef.current.querySelectorAll('.message-line')
    const tl = gsap.timeline()
    tl.fromTo(
      lines,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.62, ease: 'power2.out', stagger: 0.32 }
    )
      .to(messageRef.current, { opacity: 1, duration: 0.2 })

    const onRightClick = (event) => {
      event.preventDefault()
      proceedToLanding()
    }
    window.addEventListener('contextmenu', onRightClick)

    return () => {
      tl.kill()
      window.removeEventListener('contextmenu', onRightClick)
    }
  }, [showMessage, proceedToLanding])

  useEffect(() => {
    if (!showLandingContent) return undefined
    if (!landingWrapRef.current || !detailsCardRef.current || !detailsItemsWrapRef.current || !detailsButtonRef.current) {
      return undefined
    }

    const items = detailsItemsWrapRef.current.querySelectorAll('.reveal-item')
    gsap.set([detailsCardRef.current, ...items, detailsButtonRef.current], { opacity: 0, y: 50 })
    const timelineSection = landingWrapRef.current.querySelector('.timeline-section')
    const timelineItems = landingWrapRef.current.querySelectorAll('.timeline-item')
    if (timelineSection) {
      gsap.set(timelineSection, { opacity: 0, y: 50 })
      gsap.set(timelineItems, { opacity: 0, y: 35 })
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: detailsCardRef.current,
        start: 'top 78%',
        toggleActions: 'play none none reverse',
      },
    })

    tl.to(detailsCardRef.current, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' })
      .to(items, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.2 }, '-=0.35')
      .to(detailsButtonRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.2')

    const floatAnim = gsap.to(detailsCardRef.current, {
      y: 8,
      duration: 2.6,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
      paused: true,
    })

    ScrollTrigger.create({
      trigger: detailsCardRef.current,
      start: 'top center',
      onEnter: () => floatAnim.play(),
      onLeaveBack: () => floatAnim.pause(),
    })

    let timelineTl
    if (timelineSection) {
      timelineTl = gsap.timeline({
        scrollTrigger: {
          trigger: timelineSection,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      })
      timelineTl
        .to(timelineSection, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' })
        .to(timelineItems, { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', stagger: 0.2 }, '-=0.35')
    }

    return () => {
      tl.kill()
      timelineTl?.kill()
      floatAnim.kill()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [showLandingContent])

  const confettiBits = useMemo(
    () =>
      Array.from({ length: CONFETTI_COUNT }, (_, i) => ({
        id: i,
        x: (seeded(i + 300) - 0.5) * 320,
        y: (seeded(i + 600) - 0.5) * 60,
        rotate: seeded(i + 900) * 180,
        size: 5 + seeded(i + 1200) * 8,
        duration: 1.6 + seeded(i + 1500) * 1.4,
        delay: seeded(i + 1800) * 0.24,
        color: ['#f59e0b', '#60a5fa', '#a78bfa'][Math.floor(seeded(i + 2100) * 3)],
      })),
    []
  )

  const popupConfettiBits = useMemo(
    () =>
      Array.from({ length: 46 }, (_, i) => ({
        id: i,
        x: (seeded(i + 5000) - 0.5) * 260,
        y: (seeded(i + 5200) - 0.5) * 40,
        rotate: seeded(i + 5400) * 180,
        size: 4 + seeded(i + 5600) * 6,
        duration: 1.4 + seeded(i + 5800) * 1.2,
        delay: seeded(i + 6000) * 0.22,
        color: ['#facc15', '#60a5fa', '#a78bfa'][Math.floor(seeded(i + 6200) * 3)],
      })),
    []
  )

  return (
    <main className={`relative min-h-screen bg-[#05070f] text-white font-[Inter,sans-serif] ${!isCutState ? 'cut-active' : ''}`}>
      <div className="pointer-events-none fixed inset-0 z-0 opacity-65">
        <Canvas camera={{ position: [0, 0, 6.8], fov: 50 }}>
          <AnimatedRings />
          <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.15}>
            <FloatingParticles />
          </Float>
        </Canvas>
      </div>

      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.14),rgba(5,7,15,0.86)_58%)]" />
      <div className="pointer-events-none fixed left-1/2 top-1/2 z-0 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500/20 via-cyan-400/15 to-purple-500/20 blur-3xl" />
      <div className="pointer-events-none fixed left-1/2 top-1/2 z-0 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5 blur-lg" />
      <div
        className={`pointer-events-none fixed inset-0 z-10 transition-opacity duration-700 ${
          spotlight ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="spotlight absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2" />
      </div>

      {!isCutState && <Scissor scissorRef={scissorRef} />}
      <div className="floating-dot fixed left-[18%] top-[26%] z-10 h-2 w-2 rounded-full bg-cyan-300/75 shadow-[0_0_14px_rgba(34,211,238,0.8)]" />
      <div className="floating-dot fixed right-[20%] top-[30%] z-10 h-1.5 w-1.5 rounded-full bg-indigo-300/70 shadow-[0_0_14px_rgba(129,140,248,0.8)] [animation-delay:0.4s]" />
      <div className="floating-dot fixed left-[24%] bottom-[24%] z-10 h-2 w-2 rounded-full bg-violet-300/70 shadow-[0_0_14px_rgba(196,181,253,0.8)] [animation-delay:0.8s]" />
      <div className="floating-shape fixed right-[24%] bottom-[20%] z-10 h-5 w-5 rotate-45 rounded-md border border-cyan-300/30 bg-cyan-400/10" />

      <section className="relative z-20 flex min-h-screen flex-col">
        {!showLandingContent && !showMessage && (
          <div className="flex w-full items-start justify-center pt-10 md:pt-12">
            <div className="rounded-2xl border border-cyan-300/35 bg-[#070b24]/80 p-2 shadow-[0_12px_30px_rgba(0,0,0,0.46)] backdrop-blur-sm">
              <img src="/sbu-logo.png" alt="SBU logo" className="w-24 object-contain md:w-32" />
            </div>
          </div>
        )}
        <div className="relative flex h-screen items-center justify-center px-6">
        <div
          ref={ribbonRef}
            className={`absolute h-24 w-[min(760px,88vw)] transition-opacity duration-500 ${
            isCutState ? 'pointer-events-none' : ''
          }`}
        >
          <div className="absolute left-0 top-[38px] h-10 w-full ribbon-shell" />
          <div
            ref={ribbonLeftRef}
            className="absolute left-0 top-[38px] h-10 w-1/2 origin-right rounded-l-full border border-rose-200/30 bg-gradient-to-r from-rose-700 via-rose-500 to-rose-400 shadow-[0_0_22px_rgba(251,113,133,0.35)]"
          />
          <div
            ref={ribbonRightRef}
            className="absolute right-0 top-[38px] h-10 w-1/2 origin-left rounded-r-full border border-rose-200/30 bg-gradient-to-r from-rose-400 via-rose-500 to-rose-700 shadow-[0_0_22px_rgba(251,113,133,0.35)]"
          />

          <div ref={bowRef} className="absolute left-1/2 top-[9px] -translate-x-1/2">
            <div className="relative h-20 w-28">
              <div className="absolute left-[26px] top-[30px] h-8 w-8 rounded-lg border border-rose-200/40 bg-rose-500 shadow-[0_0_18px_rgba(244,63,94,0.35)]" />
              <div className="absolute left-0 top-[18px] h-11 w-12 -rotate-12 rounded-[40%_60%_58%_42%] border border-rose-200/30 bg-gradient-to-tr from-rose-700 to-rose-400" />
              <div className="absolute right-0 top-[18px] h-11 w-12 rotate-12 rounded-[60%_40%_42%_58%] border border-rose-200/30 bg-gradient-to-tl from-rose-700 to-rose-400" />
              <div className="absolute left-[24px] top-[56px] h-10 w-5 -rotate-12 rounded-b-lg bg-rose-500/95" />
              <div className="absolute left-[42px] top-[56px] h-10 w-5 rotate-12 rounded-b-lg bg-rose-500/95" />
            </div>
          </div>
          {!isCutState && (
            <p className="absolute left-1/2 top-[98px] -translate-x-1/2 formal-script text-4xl text-cyan-100/95 drop-shadow-[0_0_12px_rgba(56,189,248,0.4)]">
              Click Here
            </p>
          )}

          <div
            ref={flashRef}
            className="pointer-events-none absolute left-1/2 top-[43px] h-8 w-8 -translate-x-1/2 rounded-full bg-white opacity-0 blur-[1px]"
          />
          <div
            ref={glowRef}
            className="pointer-events-none absolute left-1/2 top-[28px] h-20 w-20 -translate-x-1/2 rounded-full bg-rose-300/60 opacity-0 blur-xl"
          />
        </div>

          {showLandingContent && (
            <div className="flex flex-col items-center justify-center gap-6 text-center">
              <div className="mt-6 flex w-full justify-center md:mt-10">
                <img
                  src="/sbu-logo.png"
                  alt="SBU logo"
                  className="w-24 object-contain md:w-32"
                />
              </div>
              <h1 className="max-w-4xl bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text font-[Poppins,sans-serif] text-5xl font-extrabold text-transparent drop-shadow-[0_0_25px_rgba(59,130,246,0.6)] md:text-6xl">
                SBU CODING CHALLENGE
              </h1>
              <p className="font-[Poppins,sans-serif] text-2xl font-semibold tracking-wide text-cyan-100 md:text-3xl">
                Problem Solving Edition
              </p>
              <p className="max-w-xl font-[Poppins,sans-serif] text-base leading-relaxed text-slate-300 drop-shadow-[0_0_10px_rgba(56,189,248,0.15)]">
                A formal coding event experience crafted for clarity, depth, and modern visual hierarchy.
              </p>
              <p className="scroll-bounce mt-8 text-sm tracking-wide text-gray-400">Scroll to explore ↓</p>
            </div>
          )}
        </div>

        {showConfetti && (
          <div className="pointer-events-none fixed left-1/2 top-1/2 z-30">
            {confettiBits.map((piece) => (
              <span
                key={piece.id}
                className="confetti-piece"
                style={{
                  left: `${piece.x}px`,
                  top: `${piece.y}px`,
                  width: `${piece.size}px`,
                  height: `${piece.size * 1.8}px`,
                  backgroundColor: piece.color,
                  transform: `rotate(${piece.rotate}deg)`,
                  animationDuration: `${piece.duration}s`,
                  animationDelay: `${piece.delay}s`,
                  '--dx': piece.x * 0.22,
                }}
              />
            ))}
          </div>
        )}

        {showMessage && (
          <div
            ref={messageRef}
            className="fixed left-1/2 top-1/2 z-30 flex w-[min(860px,90vw)] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4 text-center text-slate-200 opacity-0"
          >
            <div className="mt-6 flex w-full justify-center md:mt-10">
              <img src="/sbu-logo.png" alt="SBU logo" className="w-24 object-contain md:w-32" />
            </div>
            <p className="message-line text-xs uppercase tracking-[0.34em] text-cyan-200/80">Respected</p>
            <p className="message-line bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text font-[Poppins,sans-serif] text-3xl font-semibold text-transparent drop-shadow-[0_0_18px_rgba(59,130,246,0.55)] md:text-4xl">
              Director General, Prof. Gopal Pathak Sir
            </p>
            <p className="message-line bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text font-[Poppins,sans-serif] text-3xl font-semibold text-transparent drop-shadow-[0_0_18px_rgba(59,130,246,0.55)] md:text-4xl">
              Vice Chancellor, Prof. C. Jeganathan Sir
            </p>
            <p className="message-line bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text font-[Poppins,sans-serif] text-3xl font-semibold text-transparent drop-shadow-[0_0_18px_rgba(59,130,246,0.55)] md:text-4xl">
              Registrar, Prof. SB Dandin Sir
            </p>
            <p className="message-line mt-2 text-xl font-medium text-cyan-100/90">& all the Dignitaries</p>
            <p className="message-line mt-2 max-w-xl formal-script text-xl leading-relaxed text-cyan-100/95 md:text-2xl">
              With great respect, we invite you to inaugurate our Coding Club event and inspire
              the next generation of tech enthusiasts.
            </p>
            <p className="message-line text-xs tracking-[0.22em] text-gray-400">
              Right click to continue
            </p>
          </div>
        )}

        {showLandingContent && (
          <div ref={landingWrapRef} className="relative z-20 px-6 py-24 md:py-28">
            <div className="relative mx-auto w-full max-w-4xl">
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-r from-indigo-500/35 via-cyan-500/30 to-purple-500/35 blur-3xl" />
            <article
              ref={detailsCardRef}
              className="rounded-2xl border border-indigo-300/20 bg-[#070b24]/70 p-8 md:p-10 shadow-[0_25px_90px_rgba(0,0,0,0.68),0_0_40px_rgba(56,189,248,0.14)] backdrop-blur-lg transition duration-300 hover:shadow-[0_32px_110px_rgba(0,0,0,0.75),0_0_52px_rgba(99,102,241,0.22)]"
            >
              <div className="flex flex-col items-center text-center gap-8">
                <div className="reveal-item flex flex-col items-center gap-2">
                  <p className="text-xs uppercase tracking-[0.34em] text-cyan-200/80">Event Details</p>
                  <h2 className="max-w-2xl bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text font-[Poppins,sans-serif] text-3xl font-bold leading-tight text-transparent md:text-4xl">
                    Invitation Overview
                  </h2>
                  <p className="text-base text-gray-300">Everything appears progressively as you scroll.</p>
                </div>

                <div ref={detailsItemsWrapRef} className="grid w-full max-w-3xl gap-4 md:grid-cols-2">
                  <div className="reveal-item rounded-xl bg-white/5 p-4 text-left transition duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-[0_18px_40px_rgba(15,23,42,0.66),0_0_24px_rgba(34,211,238,0.18)]">
                    <div className="mb-3 flex items-center gap-3">
                      <CalendarIcon />
                      <p className="font-[Poppins,sans-serif] text-sm font-semibold tracking-wide text-cyan-100 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">
                        Event Details
                      </p>
                    </div>
                    <div className="space-y-2 text-sm text-gray-300">
                      <p>Date: 18 April 2026 (Saturday)</p>
                      <p>Time: 10:00 AM onwards</p>
                      <p>Venue: A2 303/304</p>
                    </div>
                  </div>
                  <div className="reveal-item rounded-xl bg-white/5 p-4 text-left transition duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-[0_18px_40px_rgba(15,23,42,0.66),0_0_24px_rgba(129,140,248,0.22)]">
                    <div className="mb-3 flex items-center gap-3">
                      <CodeIcon />
                      <p className="font-[Poppins,sans-serif] text-sm font-semibold tracking-wide text-cyan-100 drop-shadow-[0_0_10px_rgba(129,140,248,0.3)]">
                        Format
                      </p>
                    </div>
                    <div className="space-y-2 text-sm text-gray-300">
                      <p>Round 1: 10 MCQs</p>
                      <p>Round 2: 3 out of 5 DSA problems</p>
                    </div>
                  </div>
                </div>

                <div className="reveal-item flex flex-col items-center gap-4">
                  <p className="font-[Poppins,sans-serif] text-sm font-semibold tracking-wide text-cyan-100 drop-shadow-[0_0_10px_rgba(250,204,21,0.24)]">
                    Rewards
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <span className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-gray-200 transition duration-300 hover:-translate-y-1 hover:bg-white/15 hover:shadow-[0_14px_30px_rgba(15,23,42,0.62),0_0_22px_rgba(250,204,21,0.24)]">
                      <TrophyIcon />
                      Trophies (Top 3)
                    </span>
                    <span className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-gray-200 transition duration-300 hover:-translate-y-1 hover:bg-white/15 hover:shadow-[0_14px_30px_rgba(15,23,42,0.62),0_0_22px_rgba(34,211,238,0.24)]">
                      <CertificateIcon />
                      Printed Certificates (Top 5)
                    </span>
                    <span className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-gray-200 transition duration-300 hover:-translate-y-1 hover:bg-white/15 hover:shadow-[0_14px_30px_rgba(15,23,42,0.62),0_0_22px_rgba(167,139,250,0.24)]">
                      <MedalIcon />
                      E-Certificates (All)
                    </span>
                  </div>
                </div>

                <div className="reveal-item space-y-1 text-gray-300">
                  <p className="font-[Poppins,sans-serif] text-sm font-semibold tracking-wide text-cyan-100 drop-shadow-[0_0_10px_rgba(56,189,248,0.26)]">
                    Contact
                  </p>
                  <p>Rishikant Kumar</p>
                  <p>President, Coding Club SBU</p>
                  <p>+91-6207383145</p>
                </div>

                <button
                  ref={detailsButtonRef}
                  onClick={() => setShowPresencePopup(true)}
                  className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-6 py-3 text-sm font-semibold tracking-wide text-white shadow-lg shadow-cyan-500/30 transition duration-300 hover:scale-105 hover:shadow-[0_0_38px_rgba(56,189,248,0.7)] active:scale-100"
                >
                  Confirm To Your Presence
                </button>
              </div>
            </article>
            <section className="timeline-section mt-16 rounded-2xl border border-indigo-300/20 bg-[#070b24]/70 p-8 shadow-[0_20px_70px_rgba(0,0,0,0.58)] backdrop-blur-xl transition duration-400 hover:-translate-y-1 hover:border-cyan-300/35 hover:shadow-[0_30px_90px_rgba(15,23,42,0.72),0_0_42px_rgba(56,189,248,0.2)] md:p-10">
              <div className="flex flex-col items-center gap-3 text-center">
                <p className="timeline-item text-xs uppercase tracking-[0.34em] text-indigo-200/70">How It Works</p>
                <h3 className="timeline-item bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text font-[Poppins,sans-serif] text-3xl font-bold text-transparent md:text-5xl">
                  Rounds Timeline
                </h3>
                <p className="timeline-item max-w-xl font-[Poppins,sans-serif] text-sm leading-relaxed text-slate-300 drop-shadow-[0_0_10px_rgba(96,165,250,0.16)] md:text-base">
                  Structured progression from aptitude screening to deep problem solving.
                </p>
              </div>
              <div className="relative mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
                <div className="timeline-item flex flex-col items-center rounded-xl border border-transparent p-4 text-center transition duration-300 hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-white/5 hover:shadow-[0_16px_38px_rgba(15,23,42,0.62),0_0_24px_rgba(56,189,248,0.2)]">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-cyan-300/50 bg-indigo-500/30 text-xl font-bold text-white shadow-[0_0_28px_rgba(99,102,241,0.6)]">1</div>
                  <h4 className="text-xl font-semibold text-white">Round 1 - MCQ Sprint</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    10 MCQs focused on programming fundamentals, algorithmic thinking, and speed.
                  </p>
                </div>
                <div className="timeline-item flex flex-col items-center rounded-xl border border-transparent p-4 text-center transition duration-300 hover:-translate-y-1 hover:border-indigo-300/35 hover:bg-white/5 hover:shadow-[0_16px_38px_rgba(15,23,42,0.62),0_0_24px_rgba(129,140,248,0.2)]">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-cyan-300/50 bg-indigo-500/30 text-xl font-bold text-white shadow-[0_0_28px_rgba(99,102,241,0.6)]">2</div>
                  <h4 className="text-xl font-semibold text-white">Round 2 - DSA Core</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    Solve 3 out of 5 coding problems emphasizing data structures, logic, and optimization.
                  </p>
                </div>
              </div>
            </section>
            </div>
          </div>
        )}
      </section>

      {showPresencePopup && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/65 px-6 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-cyan-200/25 bg-[#090f2f]/90 p-8 shadow-[0_30px_100px_rgba(0,0,0,0.72),0_0_60px_rgba(56,189,248,0.22)]">
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-violet-500/10" />
            <div className="pointer-events-none absolute left-1/2 top-7 h-28 w-60 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-2xl" />
            <div className="pointer-events-none absolute left-1/2 top-1/2">
              {popupConfettiBits.map((piece) => (
                <span
                  key={piece.id}
                  className="confetti-piece"
                  style={{
                    left: `${piece.x}px`,
                    top: `${piece.y}px`,
                    width: `${piece.size}px`,
                    height: `${piece.size * 1.7}px`,
                    backgroundColor: piece.color,
                    transform: `rotate(${piece.rotate}deg)`,
                    animationDuration: `${piece.duration}s`,
                    animationDelay: `${piece.delay}s`,
                    '--dx': piece.x * 0.18,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 flex flex-col items-center gap-6 text-center">
              <h4 className="bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text font-[Poppins,sans-serif] text-3xl font-bold text-transparent drop-shadow-[0_0_16px_rgba(56,189,248,0.4)] md:text-4xl">
                Presence Confirmed
              </h4>
              <p className="font-[Poppins,sans-serif] text-lg leading-relaxed text-cyan-50/95 md:text-xl">
                Thank you for confirming your presence with us. It is an Honour to have you join us
                for this event.
              </p>
              <button
                onClick={() => setShowPresencePopup(false)}
                className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-6 py-2.5 text-sm font-semibold tracking-wide text-white shadow-lg shadow-cyan-500/35 transition duration-300 hover:scale-105 hover:shadow-[0_0_34px_rgba(56,189,248,0.75)] active:scale-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default App
