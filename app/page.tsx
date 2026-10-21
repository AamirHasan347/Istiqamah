"use client";

import { track } from '@vercel/analytics';
import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Moon,
  Sun,
  Sparkles,
  Flame,
  ShieldCheck,
  HeartHandshake,
  BookOpen,
  Droplets,
  Footprints,
  Clock,
  CheckCircle2,
  Compass,
  Send,
  Calendar,
  Eye,
  Download,
  ChevronRight,
  RotateCcw,
  Award,
  Volume2,
  Feather,
  Layers,
} from "lucide-react";
import {
  RubElHizbLogo,
  ShamsaMedallion,
  SanctuaryLantern,
  MihrabArchDecoration,
} from "@/app/components/IslamicGeometrySVGs";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ============================================================================
// DATA PRESETS FOR INTERACTIVE LIVE DEMOS
// ============================================================================

const SANCTUARY_PILLARS = [
  {
    id: "deen",
    badge: "PILLAR 01 • DEEN CONNECTION",
    title: "Anchor Your Day Around the 5 Timeless Calls",
    arabicTitle: "الصَّلَاةُ وَالذِّكْرُ",
    subtitle:
      "Track Fard prayers on time, Tahajjud in the last third of the night, weekly Surah Al-Baqarah flow, and morning/evening Adhkar without mechanical guilt.",
    completion: 92,
    streakLabel: "19 Days Fard On-Time",
    quote:
      "“Guard strictly your prayers, especially the Middle Prayer, and stand before Allah in devout obedience.” — Surah Al-Baqarah 2:238",
    metrics: [
      { label: "5 Daily Salah (On-Time)", value: "5 / 5 Completed", done: true },
      { label: "Tahajjud Sanctuary", value: "2 Rak'ahs before Fajr", done: true },
      { label: "Surah Al-Baqarah Fortress", value: "Verses 1–141 (Juz 1)", done: true },
      { label: "Daily Quran Wird", value: "1/2 Para Recited", done: true },
      { label: "Morning & Evening Adhkar", value: "Fortress Sealed", done: true },
    ],
  },
  {
    id: "body",
    badge: "PILLAR 02 • BODY SANCTUARY (AMANAH)",
    title: "Honor the Physical Vessel Entrusted to Your Soul",
    arabicTitle: "أَمَانَةُ الْجَسَدِ",
    subtitle:
      "Log strength & mobility, your daily step vault, 8-glass Sunnah hydration, clean whole-food nourishment, zero-refined-sugar streaks, and automatic 24h sleep calculation.",
    completion: 86,
    streakLabel: "14 Days Clean Fuel",
    quote:
      "“Verily, your body has a right over you, and your soul has a right over you.” — Sahih al-Bukhari",
    metrics: [
      { label: "Movement & Strength", value: "45m Calisthenics + Walk", done: true },
      { label: "Step Counter Vault", value: "8,420 / 8,000 Steps", done: true },
      { label: "Sunnah Hydration", value: "7 / 8 Glasses Logged", done: true },
      { label: "Whole-Food & No Sugar", value: "Day 14 Sugar-Free", done: true },
    ],
  },
  {
    id: "mind",
    badge: "PILLAR 03 • MINDFUL SERENITY",
    title: "Reclaim Your Attention From Algorithmic Noise",
    arabicTitle: "سَكِينَةُ الْقَلْبِ",
    subtitle:
      "Drag the Screen-Time Auto-Judge slider below to test how Istiqamah evaluates digital hygiene alongside daily book reading and guarding the eyes and tongue.",
    completion: 88,
    streakLabel: "Screen Detox Active",
    quote:
      "“Part of the perfection of a person’s Islam is leaving that which does not concern him.” — Jami` at-Tirmidhi",
    metrics: [
      { label: "Deep Book Reading", value: "24 Pages (Imam Al-Ghazali)", done: true },
      { label: "Guarding Eyes & Ears", value: "Zero Doomscrolling", done: true },
      { label: "Evening Digital Sunset", value: "Phone Docked 10:15 PM", done: true },
    ],
  },
  {
    id: "growth",
    badge: "PILLAR 04 • DAILY GROWTH (IHSAN)",
    title: "Compound Quiet Excellence One Honest Brick at a Time",
    arabicTitle: "الإِحْسَانُ وَالإِتْقَانُ",
    subtitle:
      "Measure distraction-free deep focus blocks, deliberate skill acquisition, 'One Thing I Learned Today', and 'One Concrete Step Toward My Horizon'.",
    completion: 95,
    streakLabel: "180m Deep Focus",
    quote:
      "“Allah loves, when one of you does a work, that he does it with Itqan (excellence).” — Al-Bayhaqi",
    metrics: [
      { label: "Deep Work Sanctuary", value: "180 mins Unbroken Focus", done: true },
      { label: "Skill Mastery Log", value: "Arabic Morphology + Systems", done: true },
      { label: "One Thing I Learned", value: "Tawakkul requires tying the camel", done: true },
      { label: "One Step Toward Goals", value: "Shipped Architecture Spec", done: true },
    ],
  },
];

const JOURNAL_PRESETS = [
  {
    label: "📚 Physics Exam Exhaustion",
    text: "Exhausted from studying for my physics finals all afternoon. Still grateful my mother brought warm mint tea to my desk, that I prayed Maghrib and Isha on time at the masjid, and finished 20 pages of problem sets. Tomorrow I must wake up at 5:00 AM to revise electromagnetism before class.",
    organized: {
      blessings: [
        "Warm mint tea brought with love by my mother during study hours",
        "Prayed both Maghrib and Isha in congregation on time",
        "Strength and focus to complete 20 pages of physics problem sets",
      ],
      victory: "Guarded my evening prayers despite intense exam pressure.",
      tomorrowIntention: "5:00 AM Fajr & Electromagnetism Final Revision Block",
      propheticComfort: {
        arabic: "اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا",
        transliteration: "Allahumma la sahla illa ma ja'altahu sahla...",
        translation:
          "O Allah, nothing is easy except what You make easy, and You make the difficult easy if You will.",
      },
    },
  },
  {
    label: "🌧️ Overwhelmed at Work & Seeking Barakah",
    text: "Felt pulled in ten directions with client deadlines today and worried about family finances. Alhamdulillah I paused at Dhuhr to breathe, helped a junior teammate debug their code without rushing, and took a 20-minute sunset walk without my phone. Tomorrow I will finish the Q3 architecture proposal before opening Slack.",
    organized: {
      blessings: [
        "Paused at Dhuhr to anchor my heart in remembrance",
        "Patience to mentor a junior teammate with ihsan",
        "20-minute device-free sunset walk to clear mental fog",
      ],
      victory: "Chose patience and service over reactive stress.",
      tomorrowIntention: "Complete Q3 Architecture Proposal Before Opening Messages",
      propheticComfort: {
        arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ",
        transliteration: "Wa man yattaqillaha yaj'al lahu makhraja...",
        translation:
          "And whoever is mindful of Allah, He will make a way out for him, and provide for him from where he does not expect. (Quran 65:2-3)",
      },
    },
  },
];

const DUA_CATALOG = [
  {
    id: "exams",
    category: "Exams, Memory & Difficult Study",
    keywords: ["exam", "study", "physics", "test", "memory", "forget", "focus"],
    arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي يَفْقَهُوا قَوْلِي",
    transliteration:
      "Rabbi-shrah li sadri, wa yassir li amri, wahlul 'uqdatan min lisani yafqahu qawli.",
    translation:
      "My Lord, expand for me my breast [with assurance], ease for me my task, and untie the knot from my tongue that they may understand my speech.",
    source: "Surah Taha • 20:25–28",
    rahmahNote:
      "Prophet Musa (AS) whispered this before the hardest mission of his life. Breathe deeply—your effort is seen, and outcomes belong to Al-Fattah (The Opener).",
  },
  {
    id: "mother",
    category: "Sick Mother / Parents' Healing",
    keywords: ["mother", "mom", "parent", "sick", "healing", "health", "hospital", "father"],
    arabic: "اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَاسَ، اشْفِ أَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا",
    transliteration:
      "Allahumma Rabban-nasi adhhibil-ba'sa, ishfi Antash-Shafi, la shifa'a illa shifa'uka, shifa'an la yughadiru saqama.",
    translation:
      "O Allah, Lord of mankind, remove the affliction and grant healing, for You are the Healer. There is no healing except Your healing—a healing that leaves no trace of illness.",
    source: "Sahih al-Bukhari • 5675",
    rahmahNote:
      "Place your hand gently or hold your parent in your heart as you recite this. Every moment of care for your mother is a gate of Jannah.",
  },
  {
    id: "anxiety",
    category: "Heavy Chest, Anxiety & Overthinking",
    keywords: ["anxiety", "worry", "fear", "sad", "chest", "overwhelmed", "stress", "future"],
    arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
    transliteration: "Hasbunallahu wa ni'mal-Wakil.",
    translation:
      "Sufficient for us is Allah, and [He is] the best Disposer of affairs.",
    source: "Surah Ali 'Imran • 3:173",
    rahmahNote:
      "Said by Ibrahim (AS) when thrown into the fire, and by the believers when told the world had gathered against them. You do not carry tomorrow alone.",
  },
  {
    id: "rizq",
    category: "Job Search, Debt & Barakah in Rizq",
    keywords: ["job", "rizq", "money", "debt", "work", "career", "provision", "income"],
    arabic: "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ",
    transliteration:
      "Allahummak-fini bihalalika 'an haramika, wa aghnini bifadlika 'amman siwak.",
    translation:
      "O Allah, suffice me with what You have made lawful against what You have made unlawful, and enrich me by Your grace so that I am independent of all besides You.",
    source: "Jami` at-Tirmidhi • 3563",
    rahmahNote:
      "Even if debt feels like a mountain, the Prophet ﷺ promised that sincere reliance with this supplication opens doors of dignified provision.",
  },
  {
    id: "insomnia",
    category: "Restless Night & Insomnia",
    keywords: ["sleep", "insomnia", "night", "awake", "tired", "rest"],
    arabic: "اللَّهُمَّ غَارَتِ النُّجُومُ وَهَدَأَتِ الْعُيُونُ وَأَنْتَ حَيٌّ قَيُّومٌ لَا تَأْخُذُكَ سِنَةٌ وَلَا نَوْمٌ، يَا حَيُّ يَا قَيُّومُ أَهْدِئْ لَيْلِي وَأَنِمْ عَيْنِي",
    transliteration:
      "Allahumma gharatil-nujumu wa hada'atil-'uyunu wa Anta Hayyun Qayyum... Ya Hayyu Ya Qayyum ahdi' layli wa anim 'ayni.",
    translation:
      "O Allah, the stars have receded and eyes have grown still, and You are the Ever-Living, Sustainer of all, untouched by slumber or sleep. O Ever-Living, calm my night and grant rest to my eyes.",
    source: "Al-Muwatta / Ibn al-Sunni",
    rahmahNote:
      "Taught to Zaid ibn Thabit (RA) when he suffered from sleeplessness. Let your shoulders drop and release the day's ledger to Al-Qayyum.",
  },
  {
    id: "indecision",
    category: "Major Life Decision & Istikharah Clarity",
    keywords: ["decision", "choice", "confused", "marriage", "move", "path", "istikharah"],
    arabic: "اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ",
    transliteration:
      "Allahumma inni astakhiruka bi'ilmika, wa astaqdiruka biqudratika, wa as'aluka min fadlikal-'azim...",
    translation:
      "O Allah, I seek Your guidance through Your knowledge, and I seek ability through Your power, and I ask You of Your immense grace.",
    source: "Sahih al-Bukhari • 1166",
    rahmahNote:
      "When you consult the Knower of the unseen, you cannot lose: either He opens the door with blessing, or He gently turns you toward something far better.",
  },
];

interface MatrixTask {
  id: string;
  title: string;
  quadrant: "do" | "grow" | "quick" | "light";
  cadence: "Daily" | "Today Only";
}

const INITIAL_MATRIX_TASKS: MatrixTask[] = [
  { id: "1", title: "Pray Fajr + 15m Quran Wird", quadrant: "do", cadence: "Daily" },
  { id: "2", title: "Submit Physics Lab Report by 4 PM", quadrant: "do", cadence: "Today Only" },
  { id: "3", title: "90m Deep Focus: System Architecture", quadrant: "grow", cadence: "Daily" },
  { id: "4", title: "Call Mother & Check Her Medication", quadrant: "grow", cadence: "Daily" },
  { id: "5", title: "Reply to Academic Advisor Email", quadrant: "quick", cadence: "Today Only" },
  { id: "6", title: "Pay Monthly Utility Invoice", quadrant: "quick", cadence: "Today Only" },
  { id: "7", title: "Reorganize Bookshelf Notes", quadrant: "light", cadence: "Today Only" },
];

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function IstiqamahFlagshipLandingPage() {
  // 1. Global Day/Night Masjid Theme State
  const [isNightMode, setIsNightMode] = useState(false);

  // 2. Hero Interactive State (12-Pointed Shamsa Pearls + Detox Day)
  const [activePearls, setActivePearls] = useState<number>(10);
  const [heroStreak, setHeroStreak] = useState<number>(14);

  // 3. Pinned 4 Sanctuaries Interactive State
  const [activePillarIndex, setActivePillarIndex] = useState<number>(0);
  const [screenHours, setScreenHours] = useState<number>(2.2);
  const [sleepBedtime, setSleepBedtime] = useState<number>(22.5); // 10:30 PM
  const [sleepWake, setSleepWake] = useState<number>(5.25); // 5:15 AM

  // 4. Whisper-Quiet AI Interactive State (3 Playable Tabs)
  const [aiTab, setAiTab] = useState<"journal" | "dua" | "matrix">("journal");
  const [journalInput, setJournalInput] = useState<string>(JOURNAL_PRESETS[0].text);
  const [organizedData, setOrganizedData] = useState(JOURNAL_PRESETS[0].organized);
  const [isOrganizing, setIsOrganizing] = useState<boolean>(false);

  const [duaQuery, setDuaQuery] = useState<string>("");
  const [selectedDua, setSelectedDua] = useState(DUA_CATALOG[0]);

  const [brainDumpInput, setBrainDumpInput] = useState<string>(
    "Memorize 5 lines of Surah Mulk daily, Finish API deployment today, Order groceries, Clean desktop icons"
  );
  const [matrixTasks, setMatrixTasks] = useState<MatrixTask[]>(INITIAL_MATRIX_TASKS);

  // 5. Tactile Tasbih & Zikr Vault State
  const [todayZikr, setTodayZikr] = useState<number>(342);
  const [allTimeZikr, setAllTimeZikr] = useState<number>(14820);
  const [activeDhikrPhrase, setActiveDhikrPhrase] = useState<string>(
    "أَسْتَغْفِرُ اللَّهَ (Astaghfirullah)"
  );
  const [burstParticles, setBurstParticles] = useState<
    { id: number; x: number; y: number; label: string }[]
  >([]);

  // 6. Rahmah & Family Halaqah Bento Interactive State
  const [mercyModeActive, setMercyModeActive] = useState<boolean>(false);
  const [familyZikrCount, setFamilyZikrCount] = useState<number>(12640);
  const [duaNudgeToast, setDuaNudgeToast] = useState<string | null>(null);
  const [sadaqahDone, setSadaqahDone] = useState<boolean>(false);
  const [elderFontScale, setElderFontScale] = useState<boolean>(false);

  // Refs for GSAP Choreographies
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);
  const pinnedSectionRef = useRef<HTMLDivElement>(null);
  const tasbihPearlRef = useRef<HTMLButtonElement>(null);

  // Calculate 24h Sleep Duration
  const computedSleepDuration = ((24 - sleepBedtime + sleepWake) % 24).toFixed(1);

  // Screen-Time Verdict Logic
  const getScreenVerdict = (hours: number) => {
    if (hours < 3) {
      return {
        label: "Excellent (< 3h)",
        color: "bg-[#246A56] text-[#F5F0E8] border-[#58C4A3]",
        desc: "Your heart and eyes are guarded. High presence for salah & deep work.",
      };
    }
    if (hours <= 5) {
      return {
        label: "Okay (3h – 5h)",
        color: "bg-[#C48F3F]/25 text-[#C48F3F] border-[#C48F3F]",
        desc: "Moderate digital drift. Consider docking your phone 45 mins before Isha.",
      };
    }
    return {
      label: "Needs Care (> 5h)",
      color: "bg-[#B85D43]/25 text-[#B85D43] border-[#B85D43]",
      desc: "Gentle reminder: Heavy screen exposure scatters khushu'. Activate Nightly Detox.",
    };
  };

  // GSAP ScrollTrigger & Entrance Animations
  useGSAP(
    () => {
      // Hero floating lanterns parallax
      gsap.to(".lantern-float-slow", {
        y: -22,
        rotation: 2,
        duration: 4.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".lantern-float-fast", {
        y: -16,
        rotation: -2.5,
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.8,
      });

      // Scroll-reactive Shamsa pearls in Hero
      ScrollTrigger.create({
        trigger: ".hero-trigger",
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          const count = Math.max(6, Math.min(12, Math.round(6 + self.progress * 6)));
          setActivePearls(count);
        },
      });
    },
    { scope: pageContainerRef }
  );

  // 3D Tilt handler for Hero Emerald Card
  const handleHeroCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroCardRef.current) return;
    const rect = heroCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(heroCardRef.current, {
      rotateY: (x / rect.width) * 12,
      rotateX: -(y / rect.height) * 12,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleHeroCardMouseLeave = () => {
    if (!heroCardRef.current) return;
    gsap.to(heroCardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.5)",
    });
  };

  // AI Journal Auto-Organizer Handler
  const handleAutoOrganizeJournal = () => {
    setIsOrganizing(true);
    setTimeout(() => {
      // If user typed custom text not matching preset, dynamically extract lines
      const matchedPreset = JOURNAL_PRESETS.find((p) => p.text === journalInput);
      if (matchedPreset) {
        setOrganizedData(matchedPreset.organized);
      } else {
        const sentences = journalInput
          .split(/[.!?]+/)
          .map((s) => s.trim())
          .filter(Boolean);
        setOrganizedData({
          blessings: [
            sentences[0] || "Paused tonight for honest Muhasabah before Allah",
            sentences[1] || "Health and breath to seek steadiness today",
            "A heart that still cares about returning to the Straight Path",
          ],
          victory:
            sentences[2] || "Refused to let today end without quiet reflection.",
          tomorrowIntention:
            sentences[sentences.length - 1] ||
            "Begin tomorrow with Fajr on time and 1 focused step",
          propheticComfort: JOURNAL_PRESETS[0].organized.propheticComfort,
        });
      }
      setIsOrganizing(false);
      gsap.fromTo(
        ".organized-card-item",
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "power3.out" }
      );
    }, 350);
  };

  // Contextual Dua Search Handler
  useEffect(() => {
    if (!duaQuery.trim()) return;
    const q = duaQuery.toLowerCase();
    const found = DUA_CATALOG.find(
      (item) =>
        item.category.toLowerCase().includes(q) ||
        item.keywords.some((k) => q.includes(k) || k.includes(q))
    );
    if (found) setSelectedDua(found);
  }, [duaQuery]);

  // Priority Matrix Auto-Sort Handler
  const handleSortBrainDump = () => {
    const rawItems = brainDumpInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (rawItems.length === 0) return;

    const newTasks: MatrixTask[] = rawItems.map((item, idx) => {
      const lower = item.toLowerCase();
      const isDaily =
        lower.includes("daily") ||
        lower.includes("surah") ||
        lower.includes("quran") ||
        lower.includes("pray") ||
        lower.includes("workout");

      let quadrant: MatrixTask["quadrant"] = "grow";
      if (
        lower.includes("today") ||
        lower.includes("urgent") ||
        lower.includes("submit") ||
        lower.includes("deploy") ||
        lower.includes("exam")
      ) {
        quadrant = "do";
      } else if (
        lower.includes("order") ||
        lower.includes("email") ||
        lower.includes("reply") ||
        lower.includes("pay")
      ) {
        quadrant = "quick";
      } else if (
        lower.includes("clean") ||
        lower.includes("icon") ||
        lower.includes("organize")
      ) {
        quadrant = "light";
      }

      return {
        id: `custom-${Date.now()}-${idx}`,
        title: item,
        quadrant,
        cadence: isDaily ? "Daily" : "Today Only",
      };
    });

    setMatrixTasks([...newTasks, ...INITIAL_MATRIX_TASKS.slice(0, 4)]);
    setTimeout(() => {
      gsap.fromTo(
        ".matrix-task-pill",
        { scale: 0.88, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.06, duration: 0.4, ease: "back.out(1.7)" }
      );
    }, 30);
  };

  // Tactile Tasbih Increment Handler with Particle Burst
  const handleTasbihIncrement = (amount: number) => {
    setTodayZikr((prev) => prev + amount);
    setAllTimeZikr((prev) => prev + amount);

    if (tasbihPearlRef.current) {
      gsap.fromTo(
        tasbihPearlRef.current,
        { scale: 0.92 },
        { scale: 1, duration: 0.45, ease: "elastic.out(1.2, 0.4)" }
      );
    }

    const id = Date.now() + Math.random();
    const randomX = Math.floor(Math.random() * 120 - 60);
    const randomY = Math.floor(Math.random() * -70 - 30);

    setBurstParticles((prev) => [
      ...prev.slice(-6),
      { id, x: randomX, y: randomY, label: `+${amount}` },
    ]);
  };

  // Send Family Halaqah Dua Nudge
  const triggerDuaNudge = (recipient: string) => {
    setFamilyZikrCount((prev) => prev + 33);
    setDuaNudgeToast(
      `🤲 Sent a warm Dua Nudge to ${recipient}: "May Allah fill your night with Sakinah & Barakah!"`
    );
    setTimeout(() => setDuaNudgeToast(null), 4200);
  };

  const currentPillar = SANCTUARY_PILLARS[activePillarIndex];
  const screenVerdict = getScreenVerdict(screenHours);

  return (
    <div
      ref={pageContainerRef}
      className={`min-h-screen transition-colors duration-700 bg-parchment-grain ${
        isNightMode
          ? "bg-[#0E1715] text-[#F5F0E8]"
          : "bg-[#FAF7F2] text-[#111A17]"
      } ${elderFontScale ? "text-[108%]" : "text-base"}`}
    >
      {/* =====================================================================
          A. FLOATING GLASSMORPHIC MIHRAB NAVBAR
      ===================================================================== */}
      <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
        <nav
          aria-label="Primary Navigation"
          className={`w-full max-w-6xl rounded-full px-4 sm:px-6 py-3 backdrop-blur-xl border transition-all duration-500 flex items-center justify-between shadow-lg ${
            isNightMode
              ? "bg-[#172622]/85 border-[#C48F3F]/30 text-[#F5F0E8]"
              : "bg-[#FAF7F2]/85 border-[#164A3B]/15 text-[#111A17]"
          }`}
        >
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <RubElHizbLogo className="w-9 h-9" />
            <div>
              <span className="font-display text-xl sm:text-2xl font-bold tracking-wider block leading-none">
                ISTIQAMAH
              </span>
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#C48F3F] block mt-0.5">
                Alhambra Sanctuary
              </span>
            </div>
          </a>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-7 text-sm font-medium">
            <a
              href="#sanctuaries"
              className="hover:text-[#C48F3F] transition-colors"
            >
              The 4 Sanctuaries
            </a>
            <a
              href="#ai-reflexes"
              className="hover:text-[#C48F3F] transition-colors"
            >
              AI Reflexes
            </a>
            <a
              href="#tasbih-vault"
              className="hover:text-[#C48F3F] transition-colors"
            >
              Tasbih & Dua
            </a>
            <a
              href="#rahmah-bento"
              className="hover:text-[#C48F3F] transition-colors"
            >
              Family Halaqah
            </a>
          </div>

          {/* Right Controls: Theme Toggle + CTA */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => setIsNightMode(!isNightMode)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                isNightMode
                  ? "bg-[#0E1715] border-[#58C4A3]/40 text-[#58C4A3]"
                  : "bg-[#F1EAE0] border-[#164A3B]/20 text-[#164A3B]"
              }`}
              title="Toggle Daytime Courtyard / Nightly Masjid Theme"
            >
              {isNightMode ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#C48F3F]" />
                  <span className="hidden sm:inline">Night Masjid</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-[#C48F3F]" />
                  <span className="hidden sm:inline">Day Courtyard</span>
                </>
              )}
            </button>

            <a
              href="/Istiqamah.apk" download="Istiqamah.apk"
              onClick={() => track('Downloaded APK')}
              className="px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-[#164A3B] hover:bg-[#246A56] text-[#F5F0E8] border border-[#C48F3F]/40 shadow-md hover:shadow-xl transition-all flex items-center gap-2"
            >
              <span>Download APK</span>
              <Download className="w-3.5 h-3.5 text-[#C48F3F]" />
            </a>
          </div>
        </nav>
      </header>

      {/* =====================================================================
          B. HERO SECTION: "STEADFASTNESS IN A DISTRACTED WORLD"
      ===================================================================== */}
      <section className="hero-trigger relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Floating Sanctuary Lanterns (Left & Right) */}
        <div className="hidden xl:block absolute top-6 left-6 pointer-events-none lantern-float-slow opacity-85">
          <SanctuaryLantern className="w-16 h-52" />
        </div>
        <div className="hidden xl:block absolute top-12 right-10 pointer-events-none lantern-float-fast opacity-85">
          <SanctuaryLantern className="w-14 h-44" />
        </div>

        {/* Top Bismillah Calligraphic Badge */}
        <div className="flex flex-col items-center text-center mb-10">
          <div
            className={`inline-flex items-center gap-3 px-6 py-2.5 rounded-full border mb-6 ${
              isNightMode
                ? "bg-[#172622]/90 border-[#C48F3F]/40"
                : "bg-[#F1EAE0] border-[#C48F3F]/40 shadow-xs"
            }`}
          >
            <span className="text-[#C48F3F] text-xs">✦</span>
            <p
              dir="rtl"
              className="font-arabic text-lg sm:text-xl md:text-2xl gold-shimmer-text font-semibold tracking-wide"
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <span className="text-[#C48F3F] text-xs">✦</span>
          </div>

          <span
            className={`text-xs uppercase tracking-[0.28em] font-semibold mb-4 ${
              isNightMode ? "text-[#58C4A3]" : "text-[#246A56]"
            }`}
          >
            DEEN • BODY • MIND • DAILY GROWTH
          </span>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight max-w-4xl leading-[1.08]">
            Not Just a Habit Tracker.{" "}
            <span className="italic font-normal text-[#C48F3F]">
              A Nightly Sanctuary
            </span>{" "}
            for Your Soul, Mind & Discipline.
          </h1>

          <p
            className={`mt-6 max-w-2xl text-base sm:text-lg leading-relaxed ${
              isNightMode ? "text-[#F5F0E8]/80" : "text-[#3A4B44]"
            }`}
          >
            Inspired by the tranquil courtyards of the Alhambra and the timeless
            practice of nightly <em className="font-semibold">Muhasabah</em>{" "}
            (self-accountability). Replace cold productivity guilt with sacred
            rhythm, Mercy Mode, and whisper-quiet AI.
          </p>

          {/* Hero CTA Row */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/Istiqamah.apk" download="Istiqamah.apk"
              onClick={() => track('Downloaded APK')}
              className="px-7 py-4 rounded-full bg-[#164A3B] hover:bg-[#246A56] text-[#F5F0E8] font-semibold text-sm sm:text-base border border-[#C48F3F]/50 shadow-xl flex items-center gap-3 transition-transform active:scale-95"
            >
              <Download className="w-4 h-4 text-[#C48F3F]" />
              <span>Download Android APK (v2.4 Sanctuary)</span>
            </a>
            <a
              href="#ai-reflexes"
              className={`px-7 py-4 rounded-full font-semibold text-sm sm:text-base border transition-all flex items-center gap-2 ${
                isNightMode
                  ? "bg-[#172622] border-[#C48F3F]/30 text-[#F5F0E8] hover:border-[#C48F3F]"
                  : "bg-[#F1EAE0] border-[#164A3B]/20 text-[#164A3B] hover:bg-[#E5DDD0]"
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#C48F3F]" />
              <span>Experience Live Interactive Sanctuary</span>
            </a>
          </div>
        </div>

        {/* Interactive 3D Phone Mockup & Signature Emerald Glassmorphic Journey Card */}
        <div className="mt-12 flex flex-col items-center">
          <div
            ref={heroCardRef}
            onMouseMove={handleHeroCardMouseMove}
            onMouseLeave={handleHeroCardMouseLeave}
            style={{ transformStyle: "preserve-3d" }}
            className="w-full max-w-4xl rounded-[32px] p-6 sm:p-10 emerald-glass-card text-[#F5F0E8] relative overflow-hidden transition-shadow duration-500"
          >
            {/* Ambient Gold & Luminous Jade Bokeh Orbs */}
            <div className="absolute -top-24 -left-20 w-72 h-72 rounded-full bg-[#C48F3F]/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-28 -right-20 w-80 h-80 rounded-full bg-[#246A56]/35 blur-3xl pointer-events-none" />

            {/* Card Top Bar: Hijri Date + Detox Pill + Streak */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[#C48F3F]/25">
              <div className="flex items-center gap-2.5">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#0E1715]/60 border border-[#C48F3F]/40 text-[#C48F3F]">
                  ☪ 14 Ramadan 1448 AH
                </span>
                <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#246A56]/50 border border-[#58C4A3]/40 text-[#58C4A3]">
                  🌿 {activePearls}/30 Detox
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setHeroStreak((s) => s + 1)}
                  className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#B85D43]/30 border border-[#C48F3F]/50 text-[#F5F0E8] flex items-center gap-1.5 cursor-pointer hover:bg-[#B85D43]/50 transition"
                  title="Click to test streak increment"
                >
                  <Flame className="w-3.5 h-3.5 text-[#C48F3F]" />
                  <span>🔥 {heroStreak} Day Istiqamah Streak</span>
                </button>
              </div>
            </div>

            {/* Main Journey Card Grid */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6">
              {/* Left Column: Day Headline + Interactive Pillar Progress */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-5xl sm:text-6xl font-bold text-[#F5F0E8]">
                    Day 1
                  </span>
                  <span className="text-sm font-medium text-[#58C4A3]">
                    • Nightly Muhasabah Sanctuary Open
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[#F5F0E8]/80 leading-relaxed">
                  Each golden pearl on your <strong>12-Pointed Shamsa Medallion</strong>{" "}
                  illuminates as you fulfill your daily amanah across Deen, Body,
                  Mind, and Ihsan. Click any pearl on the medallion to test live illumination!
                </p>

                {/* 4 Mini Sanctuary Progress Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {[
                    { name: "🕌 Deen", pct: "5/5 Salah" },
                    { name: "🌿 Body", pct: "8.4k Steps" },
                    { name: "🌙 Mind", pct: "2.1h Screen" },
                    { name: "✨ Growth", pct: "3h Focus" },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className="rounded-2xl p-3 bg-[#0E1715]/55 border border-[#C48F3F]/25"
                    >
                      <div className="text-xs text-[#F5F0E8]/70">{item.name}</div>
                      <div className="text-sm font-bold text-[#C48F3F] mt-1">
                        {item.pct}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Yesterday's Goal Bridge Banner */}
                <div className="rounded-2xl p-4 bg-[#172622]/90 border border-[#58C4A3]/30 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#58C4A3] font-semibold block">
                      🌉 Carried Over From Last Night’s Journal
                    </span>
                    <p className="text-sm font-medium text-[#F5F0E8] mt-0.5">
                      “Pray Fajr at the Masjid & revise Physics Electromagnetism before 8 AM”
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#246A56] text-[#F5F0E8] shrink-0">
                    Active
                  </span>
                </div>
              </div>

              {/* Right Column: Interactive 12-Pointed Shamsa Medallion */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center">
                <div className="relative flex items-center justify-center">
                  <ShamsaMedallion
                    activePearls={activePearls}
                    onTogglePearl={(count) => setActivePearls(count)}
                    className="w-56 h-56 sm:w-64 sm:h-64"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                    <span className="font-arabic text-lg text-[#C48F3F]">
                      الاسْتِقَامَة
                    </span>
                    <span className="font-display text-2xl font-bold text-[#F5F0E8]">
                      {activePearls}/12
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-[#58C4A3]">
                      Pearls Lit
                    </span>
                  </div>
                </div>
                <span className="text-xs text-[#C48F3F]/90 mt-2">
                  ↑ Click any of the 12 golden pearls to toggle illumination
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          C. GSAP SCROLL-STORY: "THE 4 HOLISTIC SANCTUARIES"
      ===================================================================== */}
      <section
        id="sanctuaries"
        ref={pinnedSectionRef}
        className={`py-24 px-4 sm:px-6 lg:px-8 border-y transition-colors ${
          isNightMode
            ? "bg-[#172622]/40 border-[#C48F3F]/20"
            : "bg-[#F1EAE0]/70 border-[#164A3B]/10"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="max-w-3xl mb-14">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C48F3F] font-bold">
              HOLISTIC SELF-ACCOUNTABILITY
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-semibold mt-2 leading-tight">
              Four Sacred Sanctuaries. One Unified Life.
            </h2>
            <p
              className={`mt-4 text-base sm:text-lg ${
                isNightMode ? "text-[#F5F0E8]/75" : "text-[#3A4B44]"
              }`}
            >
              A believer does not compartmentalize prayer from physical health,
              mental clarity, or professional excellence. Explore all 4 pillars
              below—and interact with the live <strong>24h Sleep Calculator</strong>{" "}
              and <strong>Screen-Time Auto-Judge Slider</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Sticky Live Sanctuary Preview Card */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="mihrab-arch-card emerald-glass-card p-6 sm:p-8 text-[#F5F0E8] relative overflow-hidden">
                <MihrabArchDecoration className="absolute inset-0 w-full h-full pointer-events-none opacity-40" />

                <div className="relative z-10 pt-8 text-center">
                  <span className="font-arabic text-2xl text-[#C48F3F] block mb-1">
                    {currentPillar.arabicTitle}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#58C4A3] font-semibold">
                    {currentPillar.badge}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold mt-2">
                    {currentPillar.title}
                  </h3>
                </div>

                {/* Progress Bar */}
                <div className="relative z-10 mt-6 bg-[#0E1715]/60 rounded-2xl p-4 border border-[#C48F3F]/30">
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="text-[#58C4A3] font-semibold">
                      {currentPillar.streakLabel}
                    </span>
                    <span className="text-[#C48F3F] font-bold">
                      {currentPillar.completion}% Sanctuary Harmony
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-[#172622] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#246A56] via-[#58C4A3] to-[#C48F3F] transition-all duration-500"
                      style={{ width: `${currentPillar.completion}%` }}
                    />
                  </div>
                </div>

                {/* Dynamic Checklist Metrics */}
                <div className="relative z-10 mt-5 space-y-2.5">
                  {currentPillar.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#0E1715]/55 border border-[#C48F3F]/20 text-xs sm:text-sm"
                    >
                      <span className="flex items-center gap-2.5 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-[#58C4A3] shrink-0" />
                        {m.label}
                      </span>
                      <span className="text-[#C48F3F] font-semibold">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Prophetic / Quranic Reflection Footer */}
                <blockquote className="relative z-10 mt-6 p-4 rounded-xl bg-[#172622]/80 border-l-2 border-[#C48F3F] text-xs italic text-[#F5F0E8]/85 leading-relaxed">
                  {currentPillar.quote}
                </blockquote>
              </div>
            </div>

            {/* Right Interactive Pillar Cards & Built-In Calculators */}
            <div className="lg:col-span-7 space-y-6">
              {SANCTUARY_PILLARS.map((pillar, index) => {
                const isSelected = activePillarIndex === index;
                return (
                  <div
                    key={pillar.id}
                    onClick={() => setActivePillarIndex(index)}
                    className={`rounded-3xl p-6 sm:p-8 border transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? isNightMode
                          ? "bg-[#172622] border-[#C48F3F] shadow-xl"
                          : "bg-[#FAF7F2] border-[#164A3B] shadow-xl"
                        : isNightMode
                          ? "bg-[#0E1715]/60 border-[#C48F3F]/20 hover:border-[#C48F3F]/50"
                          : "bg-[#FAF7F2]/60 border-[#164A3B]/15 hover:border-[#164A3B]/40"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-bold uppercase tracking-widest text-[#C48F3F]">
                        {pillar.badge}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          isSelected
                            ? "bg-[#164A3B] text-[#F5F0E8]"
                            : "bg-[#C48F3F]/15 text-[#C48F3F]"
                        }`}
                      >
                        {isSelected ? "● Live in Phone Preview" : "Click to Inspect"}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-semibold mt-2">
                      {pillar.title}
                    </h3>
                    <p
                      className={`mt-2 text-sm sm:text-base leading-relaxed ${
                        isNightMode ? "text-[#F5F0E8]/75" : "text-[#3A4B44]"
                      }`}
                    >
                      {pillar.subtitle}
                    </p>

                    {/* INTERACTIVE WIDGET 1: 24h Sleep Duration Auto-Calculator inside Pillar 2 */}
                    {pillar.id === "body" && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className={`mt-6 p-5 rounded-2xl border ${
                          isNightMode
                            ? "bg-[#0E1715] border-[#58C4A3]/30"
                            : "bg-[#F1EAE0] border-[#164A3B]/20"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-bold uppercase tracking-wider text-[#246A56] flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-[#C48F3F]" />
                            Interactive 24h Sleep Duration Auto-Calculator
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#164A3B] text-[#F5F0E8]">
                            🌙 {computedSleepDuration} hrs Rest
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                          <div>
                            <label className="font-semibold block mb-1">
                              Bedtime After Isha: {Math.floor(sleepBedtime)}:
                              {sleepBedtime % 1 === 0.5 ? "30" : "00"} (24h)
                            </label>
                            <input
                              type="range"
                              min={20}
                              max={24}
                              step={0.5}
                              value={sleepBedtime}
                              onChange={(e) =>
                                setSleepBedtime(parseFloat(e.target.value))
                              }
                              className="w-full accent-[#164A3B] cursor-pointer"
                            />
                          </div>
                          <div>
                            <label className="font-semibold block mb-1">
                              Fajr Wake Time: 0{Math.floor(sleepWake)}:
                              {sleepWake % 1 === 0.25
                                ? "15"
                                : sleepWake % 1 === 0.5
                                  ? "30"
                                  : "00"}{" "}
                              AM
                            </label>
                            <input
                              type="range"
                              min={3.5}
                              max={7.5}
                              step={0.25}
                              value={sleepWake}
                              onChange={(e) =>
                                setSleepWake(parseFloat(e.target.value))
                              }
                              className="w-full accent-[#C48F3F] cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* INTERACTIVE WIDGET 2: Screen-Time Auto-Judge Slider inside Pillar 3 */}
                    {pillar.id === "mind" && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className={`mt-6 p-5 rounded-2xl border ${
                          isNightMode
                            ? "bg-[#0E1715] border-[#C48F3F]/35"
                            : "bg-[#F1EAE0] border-[#164A3B]/20"
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                            <Eye className="w-4 h-4 text-[#C48F3F]" />
                            Live Screen-Time Auto-Judge Slider:{" "}
                            <strong className="text-[#C48F3F]">
                              {screenHours.toFixed(1)}h
                            </strong>
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold border ${screenVerdict.color}`}
                          >
                            {screenVerdict.label}
                          </span>
                        </div>

                        <input
                          type="range"
                          min={0}
                          max={10}
                          step={0.2}
                          value={screenHours}
                          onChange={(e) =>
                            setScreenHours(parseFloat(e.target.value))
                          }
                          className="w-full accent-[#164A3B] cursor-pointer"
                        />
                        <div className="flex justify-between text-[11px] opacity-70 mt-1">
                          <span>0h (Digital Fast)</span>
                          <span>3h Threshold</span>
                          <span>5h Threshold</span>
                          <span>10h</span>
                        </div>
                        <p className="text-xs mt-2.5 font-medium opacity-90">
                          {screenVerdict.desc}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          D. INTERACTIVE LIVE DEMO 1: "WHISPER-QUIET AI THAT FEELS LIKE A NATURAL REFLEX"
      ===================================================================== */}
      <section
        id="ai-reflexes"
        className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.26em] text-[#C48F3F] font-bold">
            WHISPER-QUIET INTELLIGENCE
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-semibold mt-2">
            AI Designed With <em className="italic text-[#C48F3F]">Rahmah</em>,
            Never Intrusive Chatbots.
          </h2>
          <p
            className={`mt-4 text-base sm:text-lg ${
              isNightMode ? "text-[#F5F0E8]/75" : "text-[#3A4B44]"
            }`}
          >
            Test all three live sanctuaries below. Write freely on warm
            parchment, search any life struggle for an authentic Prophetic Dua,
            or brain-dump your tasks into the Eisenhower Matrix.
          </p>

          {/* 3 Playable Tab Switchers */}
          <div className="mt-8 inline-flex flex-wrap justify-center gap-2 p-1.5 rounded-2xl bg-[#164A3B]/10 border border-[#C48F3F]/30">
            {[
              {
                id: "journal",
                label: "1. Open-Parchment Nightly Journal",
                icon: Feather,
              },
              {
                id: "dua",
                label: "2. 18-Category Contextual Dua Composer",
                icon: BookOpen,
              },
              {
                id: "matrix",
                label: "3. Effortless Priority Grid",
                icon: Layers,
              },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = aiTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() =>
                    setAiTab(tab.id as "journal" | "dua" | "matrix")
                  }
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    active
                      ? "bg-[#164A3B] text-[#F5F0E8] shadow-md"
                      : "hover:bg-[#C48F3F]/15"
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#C48F3F]" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* TAB 1: THE OPEN-PARCHMENT NIGHTLY JOURNAL */}
        {aiTab === "journal" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Open Parchment Canvas */}
            <div
              className={`lg:col-span-6 rounded-3xl p-6 sm:p-8 border flex flex-col justify-between ${
                isNightMode
                  ? "bg-[#172622] border-[#C48F3F]/30"
                  : "bg-[#F1EAE0] border-[#164A3B]/20 shadow-lg"
              }`}
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#C48F3F]">
                    📜 ANTI-GOOGLE-FORM PARCHMENT CANVAS
                  </span>
                  <div className="flex gap-2">
                    {JOURNAL_PRESETS.map((preset) => (
                      <button
                        key={preset.label}
                        onClick={() => setJournalInput(preset.text)}
                        className="text-xs px-3 py-1 rounded-full bg-[#164A3B]/15 hover:bg-[#164A3B] hover:text-[#F5F0E8] border border-[#C48F3F]/30 transition cursor-pointer"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="block font-display text-2xl font-semibold mb-3">
                  Pour out your night without rigid boxes...
                </label>

                <textarea
                  rows={6}
                  value={journalInput}
                  onChange={(e) => setJournalInput(e.target.value)}
                  placeholder="Write freely about your exhaustion, small blessings, or tomorrow's intentions..."
                  className={`w-full rounded-2xl p-4 text-sm sm:text-base leading-relaxed border focus:outline-none focus:ring-2 focus:ring-[#C48F3F] ${
                    isNightMode
                      ? "bg-[#0E1715] border-[#C48F3F]/30 text-[#F5F0E8]"
                      : "bg-[#FAF7F2] border-[#164A3B]/20 text-[#111A17]"
                  }`}
                />
              </div>

              <div className="mt-6 flex items-center justify-between gap-4">
                <span className="text-xs opacity-75">
                  On-device & privacy-first extraction • Zero cloud profiling
                </span>
                <button
                  onClick={handleAutoOrganizeJournal}
                  disabled={isOrganizing}
                  className="px-6 py-3.5 rounded-full bg-[#164A3B] hover:bg-[#246A56] text-[#F5F0E8] font-semibold text-sm border border-[#C48F3F]/50 shadow-lg flex items-center gap-2 cursor-pointer transition-transform active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-[#C48F3F]" />
                  <span>
                    {isOrganizing
                      ? "Distilling Sanctuary Page..."
                      : "✨ Auto-Organize Page"}
                  </span>
                </button>
              </div>
            </div>

            {/* Right Extracted Sanctuary Artifacts */}
            <div className="lg:col-span-6 space-y-4">
              {/* 3 Alhamdulillah Blessings */}
              <div className="organized-card-item rounded-2xl p-5 emerald-glass-card text-[#F5F0E8]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C48F3F] block mb-2">
                  🌿 3 Alhamdulillah Blessings Extracted
                </span>
                <ul className="space-y-2 text-sm">
                  {organizedData.blessings.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-[#58C4A3] font-bold">0{i + 1}.</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Today's Quiet Victory & Tomorrow's Primary Intention */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  className={`organized-card-item rounded-2xl p-5 border ${
                    isNightMode
                      ? "bg-[#172622] border-[#58C4A3]/30"
                      : "bg-[#F1EAE0] border-[#164A3B]/20"
                  }`}
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-[#246A56] block mb-1">
                    🏆 Today’s Quiet Victory
                  </span>
                  <p className="text-sm font-medium">{organizedData.victory}</p>
                </div>

                <div
                  className={`organized-card-item rounded-2xl p-5 border ${
                    isNightMode
                      ? "bg-[#172622] border-[#C48F3F]/40"
                      : "bg-[#F1EAE0] border-[#C48F3F]/40"
                  }`}
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C48F3F] block mb-1">
                    🌅 Tomorrow’s Intention Bridge
                  </span>
                  <p className="text-sm font-semibold">
                    {organizedData.tomorrowIntention}
                  </p>
                </div>
              </div>

              {/* Matched Prophetic Comfort Card */}
              <div className="organized-card-item rounded-2xl p-6 bg-[#0E1715] border border-[#C48F3F]/45 text-[#F5F0E8]">
                <span className="text-[11px] uppercase tracking-widest text-[#58C4A3] font-semibold">
                  🤍 Matched Prophetic Comfort Card
                </span>
                <p
                  dir="rtl"
                  className="font-arabic text-xl sm:text-2xl text-[#C48F3F] mt-2 leading-loose"
                >
                  {organizedData.propheticComfort.arabic}
                </p>
                <p className="text-xs italic text-[#F5F0E8]/70 mt-1">
                  {organizedData.propheticComfort.transliteration}
                </p>
                <p className="text-sm text-[#F5F0E8] mt-2">
                  “{organizedData.propheticComfort.translation}”
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: THE 18-CATEGORY CONTEXTUAL DUA COMPOSER */}
        {aiTab === "dua" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div
              className={`lg:col-span-5 rounded-3xl p-6 sm:p-8 border ${
                isNightMode
                  ? "bg-[#172622] border-[#C48F3F]/30"
                  : "bg-[#F1EAE0] border-[#164A3B]/20"
              }`}
            >
              <span className="text-xs font-bold uppercase tracking-widest text-[#C48F3F]">
                18-CATEGORY HEART COMPASS
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold mt-2">
                What weighs on your heart tonight?
              </h3>
              <input
                type="text"
                value={duaQuery}
                onChange={(e) => setDuaQuery(e.target.value)}
                placeholder="Type: exams, sick mother, anxiety, job/rizq, insomnia..."
                className={`mt-4 w-full px-4 py-3.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#C48F3F] ${
                  isNightMode
                    ? "bg-[#0E1715] border-[#C48F3F]/30 text-[#F5F0E8]"
                    : "bg-[#FAF7F2] border-[#164A3B]/20 text-[#111A17]"
                }`}
              />

              <div className="mt-5 flex flex-wrap gap-2">
                {DUA_CATALOG.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedDua(item);
                      setDuaQuery(item.id);
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                      selectedDua.id === item.id
                        ? "bg-[#164A3B] text-[#F5F0E8] border-[#C48F3F]"
                        : "border-[#C48F3F]/30 hover:bg-[#C48F3F]/15"
                    }`}
                  >
                    {item.category}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 emerald-glass-card rounded-3xl p-7 sm:p-10 text-[#F5F0E8]">
              <div className="flex items-center justify-between border-b border-[#C48F3F]/25 pb-4">
                <span className="text-xs uppercase tracking-widest text-[#58C4A3] font-bold">
                  {selectedDua.category}
                </span>
                <span className="text-xs text-[#C48F3F] font-semibold">
                  {selectedDua.source}
                </span>
              </div>

              <p
                dir="rtl"
                className="font-arabic text-2xl sm:text-4xl text-[#C48F3F] leading-[1.9] my-6 text-right"
              >
                {selectedDua.arabic}
              </p>

              <p className="text-sm italic text-[#58C4A3] mb-3">
                {selectedDua.transliteration}
              </p>

              <p className="text-base sm:text-lg font-medium text-[#F5F0E8] leading-relaxed">
                “{selectedDua.translation}”
              </p>

              <div className="mt-6 p-4 rounded-2xl bg-[#0E1715]/70 border border-[#C48F3F]/30 text-xs sm:text-sm text-[#F5F0E8]/85">
                <strong className="text-[#C48F3F] block mb-1">
                  🌿 Sanctuary Rahmah Reflection:
                </strong>
                {selectedDua.rahmahNote}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: THE EFFORTLESS PRIORITY GRID (EISENHOWER MATRIX) */}
        {aiTab === "matrix" && (
          <div className="space-y-8">
            <div
              className={`rounded-3xl p-6 border flex flex-col md:flex-row items-center gap-4 ${
                isNightMode
                  ? "bg-[#172622] border-[#C48F3F]/30"
                  : "bg-[#F1EAE0] border-[#164A3B]/20"
              }`}
            >
              <input
                type="text"
                value={brainDumpInput}
                onChange={(e) => setBrainDumpInput(e.target.value)}
                placeholder="Type comma-separated tasks..."
                className={`flex-1 w-full px-4 py-3.5 rounded-xl border text-sm ${
                  isNightMode
                    ? "bg-[#0E1715] border-[#C48F3F]/30 text-[#F5F0E8]"
                    : "bg-[#FAF7F2] border-[#164A3B]/20 text-[#111A17]"
                }`}
              />
              <button
                onClick={handleSortBrainDump}
                className="px-6 py-3.5 rounded-xl bg-[#164A3B] hover:bg-[#246A56] text-[#F5F0E8] font-semibold text-sm border border-[#C48F3F]/50 shrink-0 cursor-pointer"
              >
                ⚡ Fly Tasks Into 4 Quadrants
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  key: "do",
                  title: "🔥 Do First (Important & Urgent)",
                  accent: "border-[#B85D43]/50",
                },
                {
                  key: "grow",
                  title: "🌱 Focus & Grow (Important, Not Urgent)",
                  accent: "border-[#58C4A3]/50",
                },
                {
                  key: "quick",
                  title: "⚡ Quick & Delegate (Urgent, Low Weight)",
                  accent: "border-[#C48F3F]/50",
                },
                {
                  key: "light",
                  title: "🍃 Light & Optional (Low Restorative Tasks)",
                  accent: "border-[#3A4B44]/40",
                },
              ].map((q) => (
                <div
                  key={q.key}
                  className={`rounded-3xl p-6 border-2 ${q.accent} ${
                    isNightMode ? "bg-[#172622]/90" : "bg-[#FAF7F2]"
                  }`}
                >
                  <h4 className="font-display text-xl font-bold mb-4">
                    {q.title}
                  </h4>
                  <div className="space-y-2.5">
                    {matrixTasks
                      .filter((t) => t.quadrant === q.key)
                      .map((task) => (
                        <div
                          key={task.id}
                          className={`matrix-task-pill p-3.5 rounded-xl border flex items-center justify-between gap-2 text-sm ${
                            isNightMode
                              ? "bg-[#0E1715] border-[#C48F3F]/20"
                              : "bg-[#F1EAE0] border-[#164A3B]/15"
                          }`}
                        >
                          <span className="font-medium">{task.title}</span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold shrink-0 ${
                              task.cadence === "Daily"
                                ? "bg-[#164A3B] text-[#58C4A3]"
                                : "bg-[#C48F3F]/25 text-[#C48F3F]"
                            }`}
                          >
                            {task.cadence === "Daily"
                              ? "🔁 Daily"
                              : "📌 Today Only"}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* =====================================================================
          E. INTERACTIVE LIVE DEMO 2: "THE BUILT-IN TACTILE TASBIH & ZIKR VAULT"
      ===================================================================== */}
      <section
        id="tasbih-vault"
        className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      >
        <div className="emerald-glass-card rounded-[36px] p-8 sm:p-14 text-[#F5F0E8] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Info & Treasury Counter */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C48F3F]">
                TACTILE DHIKR TREASURY
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-bold leading-tight">
                Every Whispered Remembrance, Preserved Forever.
              </h2>
              <p className="text-sm sm:text-base text-[#F5F0E8]/80 leading-relaxed">
                Tap the giant Emerald & Sultani Gold Pearl (or use the{" "}
                <code>+33</code>, <code>+100</code>, <code>+1,000</code> quick
                chips after completing a physical tasbih session) to build your
                lifelong Zikr Vault.
              </p>

              {/* Phrase Selector Pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  "أَسْتَغْفِرُ اللَّهَ (Astaghfirullah)",
                  "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ (SubhanAllahi wa bihamdihi)",
                  "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ (Salawat)",
                ].map((phrase) => (
                  <button
                    key={phrase}
                    onClick={() => setActiveDhikrPhrase(phrase)}
                    className={`px-3.5 py-2 rounded-full text-xs font-semibold border transition cursor-pointer ${
                      activeDhikrPhrase === phrase
                        ? "bg-[#C48F3F] text-[#0E1715] border-[#C48F3F]"
                        : "bg-[#0E1715]/60 text-[#F5F0E8] border-[#C48F3F]/30 hover:border-[#C48F3F]"
                    }`}
                  >
                    {phrase}
                  </button>
                ))}
              </div>

              {/* Live Counters */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="rounded-2xl p-5 bg-[#0E1715]/70 border border-[#58C4A3]/30">
                  <span className="text-xs uppercase tracking-wider text-[#58C4A3]">
                    Today’s Count
                  </span>
                  <div className="font-display text-4xl sm:text-5xl font-bold text-[#F5F0E8] mt-1">
                    {todayZikr.toLocaleString()}
                  </div>
                </div>
                <div className="rounded-2xl p-5 bg-[#0E1715]/70 border border-[#C48F3F]/40">
                  <span className="text-xs uppercase tracking-wider text-[#C48F3F]">
                    All-Time Zikr Treasury
                  </span>
                  <div className="font-display text-4xl sm:text-5xl font-bold text-[#C48F3F] mt-1">
                    {allTimeZikr.toLocaleString()}+
                  </div>
                </div>
              </div>

              {/* Quick Increment Chips */}
              <div className="flex flex-wrap items-center gap-3">
                {[
                  { label: "+33 Post-Salah", val: 33 },
                  { label: "+100 Morning Wird", val: 100 },
                  { label: "+1,000 Majlis Vault", val: 1000 },
                ].map((chip) => (
                  <button
                    key={chip.label}
                    onClick={() => handleTasbihIncrement(chip.val)}
                    className="px-4 py-2.5 rounded-full text-xs font-bold bg-[#246A56] hover:bg-[#58C4A3] hover:text-[#0E1715] text-[#F5F0E8] border border-[#C48F3F]/40 transition cursor-pointer"
                  >
                    {chip.label}
                  </button>
                ))}
                <button
                  onClick={() => setTodayZikr(0)}
                  className="p-2.5 rounded-full bg-[#0E1715]/60 text-[#F5F0E8]/70 hover:text-[#F5F0E8] border border-[#C48F3F]/20 cursor-pointer"
                  title="Reset Today's Counter"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Giant Clickable Tactile Tasbih Pearl */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              {/* Floating Burst Particles */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                {burstParticles.map((p) => (
                  <span
                    key={p.id}
                    style={{
                      transform: `translate(${p.x}px, ${p.y}px)`,
                    }}
                    className="absolute text-lg font-bold text-[#C48F3F] animate-ping"
                  >
                    {p.label}
                  </span>
                ))}
              </div>

              <button
                ref={tasbihPearlRef}
                onClick={() => handleTasbihIncrement(1)}
                className="w-56 h-56 sm:w-64 sm:h-64 rounded-full relative flex flex-col items-center justify-center cursor-pointer select-none shadow-[0_0_70px_rgba(196,143,63,0.35)] border-4 border-[#C48F3F] transition-shadow hover:shadow-[0_0_95px_rgba(196,143,63,0.6)]"
                style={{
                  background:
                    "radial-gradient(circle at 35% 30%, #58C4A3 0%, #164A3B 48%, #0E1715 92%)",
                }}
              >
                <span className="font-arabic text-2xl text-[#C48F3F] mb-1">
                  سبحة
                </span>
                <span className="font-display text-3xl font-bold text-[#F5F0E8]">
                  TAP PEARL
                </span>
                <span className="text-xs uppercase tracking-widest text-[#58C4A3] mt-1">
                  +1 Dhikr Bead
                </span>
              </button>
              <p className="text-xs text-[#C48F3F] mt-4 text-center">
                Active: {activeDhikrPhrase}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          F. "DESIGNED WITH RAHMAH (MERCY) & FAMILY CONNECTION" (BENTO GRID)
      ===================================================================== */}
      <section
        id="rahmah-bento"
        className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="max-w-3xl mb-14">
          <span className="text-xs uppercase tracking-[0.26em] text-[#C48F3F] font-bold">
            BEYOND RIGID WESTERN STREAKS
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-semibold mt-2">
            Built With <em className="italic text-[#C48F3F]">Rahmah</em> (Mercy)
            & Family Connection.
          </h2>
        </div>

        {/* Live Toast Notification for Family Dua Nudge */}
        {duaNudgeToast && (
          <div className="fixed bottom-6 right-6 z-50 max-w-md rounded-2xl p-4 emerald-glass-card text-[#F5F0E8] border border-[#C48F3F] shadow-2xl flex items-center gap-3 animate-bounce">
            <HeartHandshake className="w-6 h-6 text-[#C48F3F] shrink-0" />
            <p className="text-xs sm:text-sm font-medium">{duaNudgeToast}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* BENTO 1: Mercy Mode (Rukhsah) */}
          <div
            className={`lg:col-span-6 rounded-3xl p-7 sm:p-9 border transition-all ${
              mercyModeActive
                ? "bg-[#164A3B] text-[#F5F0E8] border-[#C48F3F] shadow-xl"
                : isNightMode
                  ? "bg-[#172622] border-[#C48F3F]/30"
                  : "bg-[#F1EAE0] border-[#164A3B]/20"
            }`}
          >
            <div className="flex items-center justify-between gap-4 mb-4">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#C48F3F]/20 text-[#C48F3F]">
                🌿 MERCY MODE (RUKHSAH)
              </span>
              <button
                onClick={() => setMercyModeActive(!mercyModeActive)}
                className={`px-4 py-2 rounded-full text-xs font-bold border transition cursor-pointer ${
                  mercyModeActive
                    ? "bg-[#C48F3F] text-[#0E1715] border-[#C48F3F]"
                    : "bg-[#164A3B] text-[#F5F0E8] border-[#C48F3F]/40"
                }`}
              >
                {mercyModeActive
                  ? "✓ Mercy Mode Active (Streak Protected)"
                  : "Tap to Activate Mercy Mode"}
              </button>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold">
              Compassion Over Cold 0% Penalties
            </h3>
            <p className="mt-2 text-sm sm:text-base opacity-85 leading-relaxed">
              Western apps punish illness, travel, or a Sister’s excuse days by
              shattering your streak. Istiqamah’s 1-tap{" "}
              <strong>Mercy Mode</strong> pauses Fard Salah checkboxes while
              keeping your Adhkar & heart sanctuary glowing—honoring Allah’s{" "}
              <em>Rukhsah</em> (concession).
            </p>

            <div className="mt-6 p-4 rounded-2xl bg-[#0E1715]/40 border border-[#C48F3F]/30 flex items-center justify-between text-xs sm:text-sm">
              <span>
                {mercyModeActive
                  ? "🤍 Salah Excused with Rahmah • Dhikr & Gratitude Active"
                  : "🕌 Standard 5/5 Fard Accountability Mode"}
              </span>
              <span className="font-bold text-[#C48F3F]">
                🔥 14-Day Streak Intact
              </span>
            </div>
          </div>

          {/* BENTO 2: Private Family Halaqah & Pacesetter Leaderboard */}
          <div
            className={`lg:col-span-6 rounded-3xl p-7 sm:p-9 border ${
              isNightMode
                ? "bg-[#172622] border-[#C48F3F]/30"
                : "bg-[#F1EAE0] border-[#164A3B]/20"
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#246A56]/20 text-[#246A56]">
                🤝 PRIVATE FAMILY HALAQAH
              </span>
              <span className="text-xs font-bold text-[#C48F3F]">
                Shared Goal: {familyZikrCount.toLocaleString()} / 15,000 Zikr
              </span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold">
              Fastabiqul Khairat With Your Mother & Circle
            </h3>
            <p className="mt-2 text-sm opacity-80">
              Race gently toward good without public social media vanity. Track a
              shared family Zikr treasury and send a 1-tap{" "}
              <strong>🤲 Dua Nudge</strong>.
            </p>

            <div className="mt-5 space-y-2.5">
              {[
                { name: "Ummi (Mother)", role: "🌟 Pacesetter • 96% Harmony" },
                { name: "You", role: "🔥 14-Day Streak • 91% Harmony" },
              ].map((member) => (
                <div
                  key={member.name}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between ${
                    isNightMode
                      ? "bg-[#0E1715] border-[#C48F3F]/20"
                      : "bg-[#FAF7F2] border-[#164A3B]/15"
                  }`}
                >
                  <div>
                    <div className="font-bold text-sm">{member.name}</div>
                    <div className="text-xs text-[#C48F3F]">{member.role}</div>
                  </div>
                  <button
                    onClick={() => triggerDuaNudge(member.name)}
                    className="px-3.5 py-2 rounded-xl bg-[#164A3B] hover:bg-[#246A56] text-[#F5F0E8] text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>🤲 Send Dua Nudge</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* BENTO 3: Sunnah Calendar & Yesterday's Goal Bridge */}
          <div
            className={`lg:col-span-6 rounded-3xl p-7 sm:p-9 border ${
              isNightMode
                ? "bg-[#172622] border-[#C48F3F]/30"
                : "bg-[#F1EAE0] border-[#164A3B]/20"
            }`}
          >
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#C48F3F]/20 text-[#C48F3F]">
              🗓️ SUNNAH CALENDAR & GOAL BRIDGE
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold mt-3">
              Mondays, Thursdays & Jumu’ah Illuminated
            </h3>
            <p className="mt-2 text-sm opacity-80 leading-relaxed">
              Automatically highlights Sunnah fasting days, Ayam al-Beed (the 3
              white moon nights), and Surah Al-Kahf on Fridays—while bridging
              last night’s journal intention straight to your morning header.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#164A3B] text-[#F5F0E8]">
                🌙 Monday Sunnah Fast Reminder
              </span>
              <span className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#C48F3F]/25 text-[#C48F3F]">
                🕌 Friday Surah Al-Kahf Light
              </span>
            </div>
          </div>

          {/* BENTO 4: Daily Sadaqah Micro-Deeds & Glasses-Free Accessibility */}
          <div
            className={`lg:col-span-6 rounded-3xl p-7 sm:p-9 border ${
              isNightMode
                ? "bg-[#172622] border-[#C48F3F]/30"
                : "bg-[#F1EAE0] border-[#164A3B]/20"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#B85D43]/20 text-[#B85D43]">
                💝 MICRO-SADAQAH & ELDER ACCESSIBILITY
              </span>
              <button
                onClick={() => setElderFontScale(!elderFontScale)}
                className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#164A3B] text-[#F5F0E8] cursor-pointer"
              >
                {elderFontScale
                  ? "🔍 Standard Text Size"
                  : "👓 Test Mother/Elder Glasses-Free Scale"}
              </button>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold mt-3">
              Effortless for Mothers, Elders & Youth Alike
            </h3>
            <p className="mt-2 text-sm opacity-80 leading-relaxed">
              High-contrast warm ink and instant typography scaling let parents
              read without straining for glasses. Plus, complete a 1-tap{" "}
              <strong>Daily Sadaqah Micro-Deed</strong> every morning.
            </p>

            <div className="mt-5">
              <button
                onClick={() => setSadaqahDone(!sadaqahDone)}
                className={`w-full py-3 px-4 rounded-2xl font-semibold text-xs sm:text-sm border transition cursor-pointer flex items-center justify-between ${
                  sadaqahDone
                    ? "bg-[#246A56] text-[#F5F0E8] border-[#58C4A3]"
                    : "bg-[#FAF7F2] text-[#111A17] border-[#C48F3F]/40"
                }`}
              >
                <span>
                  💝 Today’s Micro-Sadaqah: Remove an obstacle or send secret
                  charity
                </span>
                <span>{sadaqahDone ? "✓ Recorded" : "Tap to Complete"}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          G. DRAMATIC DAY-TO-NIGHT TRANSITION & FINAL CTA SANCTUARY ARCH
      ===================================================================== */}
      <footer
        id="final-sanctuary-cta"
        className="relative bg-[#0E1715] text-[#F5F0E8] pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-[#C48F3F]/30"
      >
        {/* Starry Masjid Night Sky Dots */}
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(#C48F3F 1.2px, transparent 1.2px), radial-gradient(#58C4A3 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            backgroundPosition: "0 0, 24px 24px",
          }}
        />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="mihrab-arch-card emerald-glass-card p-8 sm:p-16 text-center relative overflow-hidden">
            <MihrabArchDecoration className="absolute inset-0 w-full h-full pointer-events-none opacity-45" />

            <div className="relative z-10 flex flex-col items-center">
              <RubElHizbLogo className="w-14 h-14 mb-6" />

              <p
                dir="rtl"
                className="font-arabic text-2xl sm:text-3xl text-[#C48F3F] mb-3"
              >
                أَحَبُّ الأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ
              </p>

              <blockquote className="font-display italic text-xl sm:text-2xl text-[#F5F0E8]/90 max-w-2xl">
                “The most beloved of deeds to Allah are those that are most
                consistent, even if they are small.”
              </blockquote>
              <cite className="text-xs uppercase tracking-[0.25em] text-[#58C4A3] mt-2 not-italic font-semibold">
                — Sahih al-Bukhari & Muslim
              </cite>

              <h2 className="font-display text-4xl sm:text-6xl font-bold mt-8 leading-tight">
                Enter Your Nightly Sanctuary Tonight.
              </h2>

              <p className="mt-4 text-sm sm:text-base text-[#F5F0E8]/75 max-w-xl">
                Free from ads, dark-pattern dopamine traps, and noisy feeds.
                Built for sincere seekers striving for{" "}
                <strong className="text-[#C48F3F]">Istiqamah</strong>.
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="/Istiqamah.apk" download="Istiqamah.apk"
                  onClick={() => track('Downloaded APK')}
                  className="px-8 py-4 rounded-full bg-[#C48F3F] hover:bg-[#d8a350] text-[#0E1715] font-bold text-sm sm:text-base shadow-2xl flex items-center gap-2.5 transition-transform active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Android APK (Direct Sanctuary Build)</span>
                </a>
                <button
                  onClick={() =>
                    triggerDuaNudge("Your Future Steadfast Self")
                  }
                  className="px-7 py-4 rounded-full bg-[#172622] hover:bg-[#246A56] text-[#F5F0E8] font-semibold text-sm sm:text-base border border-[#C48F3F]/40 cursor-pointer transition"
                >
                  🤲 Make Intention for Tonight’s Muhasabah
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Architectural Colophon */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F5F0E8]/60 border-t border-[#C48F3F]/20 pt-8">
            <div className="flex items-center gap-2">
              <span className="text-[#C48F3F]">✦</span>
              <span>
                ISTIQAMAH — Alhambra Sanctuary Edition • Crafted with Ihsan &
                Rahmah
              </span>
            </div>
            <div>Deen • Body • Mind • Daily Growth</div>
          </div>
        </div>
      </footer>
    </div>
  );
}