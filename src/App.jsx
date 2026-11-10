import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Check,
  ChevronLeft,
  ChevronRight,
  CirclePause,
  CirclePlay,
  ClipboardCheck,
  Cpu,
  GraduationCap,
  Layers,
  Maximize2,
  Minimize2,
  RotateCcw,
  Target,
  Users,
  Zap,
} from 'lucide-react'
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from 'framer-motion'
import './App.css'

const photos = {
  america:
    'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1400&q=85',
  classroom:
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1100&q=80',
  collaboration:
    'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1100&q=80',
  workshop:
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1100&q=80',
  technology:
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1100&q=80',
  digital:
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1100&q=80',
  educator:
    'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=1100&q=80',
  city:
    'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1100&q=80',
}

const slides = [
  {
    kind: 'cover',
    section: 'PENDIDIKAN VOKASI',
    title: 'Skills that\\nmove a nation.',
    lead:
      'Membaca sistem Career and Technical Education Amerika Serikat—dan menemukan pelajaran yang relevan untuk Indonesia.',
    image: photos.america,
    imageAlt: 'Kawasan perkotaan sebagai pengantar topik pendidikan vokasi Amerika Serikat',
    visualLabel: 'A FIELD GUIDE TO',
    visualTitle: 'Career & Technical Education',
    visualNote: 'AMERIKA SERIKAT  /  INDONESIA',
    tags: ['Sistem & kebijakan', 'Industri & keterampilan', 'Adaptasi Indonesia'],
  },
  {
    section: '01 / IDENTITAS & MODEL',
    title: 'Belajar untuk\\npekerjaan nyata.',
    lead:
      'Career and Technical Education (CTE) menghubungkan pengetahuan akademik dengan keterampilan teknis yang dibutuhkan dunia kerja.',
    image: photos.classroom,
    imageAlt: 'Mahasiswa belajar bersama di lingkungan pendidikan',
    visualLabel: 'MODEL PEMBELAJARAN',
    visualTitle: 'Dari kelas ke tempat kerja',
    visualNote: 'Teori + praktik + pengalaman kerja',
    cards: [
      ['CTE', 'Pengetahuan akademik dan keterampilan teknis dalam satu jalur.'],
      ['Beragam jalur', 'Sekolah menengah, community college, technical college, dan pelatihan kerja.'],
      ['Terdesentralisasi', 'Federal, negara bagian, lokal, dan institusi berbagi peran.'],
      ['Apprenticeship', 'Belajar di kelas sambil berlatih langsung di tempat kerja.'],
    ],
    visualType: 'path',
  },
  {
    section: '02 / KEBIJAKAN & KUALIFIKASI',
    title: 'Satu tujuan kerja,\\nberagam kredensial.',
    lead:
      'Kebijakan menghubungkan pendidikan dengan pengembangan tenaga kerja; kualifikasi mengikuti bidang dan ketentuan yang berlaku.',
    image: photos.city,
    imageAlt: 'Kawasan kota di Amerika Serikat',
    visualLabel: 'KEBIJAKAN PENGGERAK',
    visualTitle: 'Pendidikan ↔ tenaga kerja',
    visualNote: 'Kualifikasi tidak memakai satu kerangka nasional tunggal',
    cards: [
      ['Perkins V', 'Mendukung program pendidikan karier dan teknis yang relevan.'],
      ['WIOA 2014', 'Mendorong pelatihan keterampilan dan layanan ketenagakerjaan.'],
      ['Bentuk kualifikasi', 'Sertifikat, associate degree, sertifikasi industri, atau lisensi.'],
      ['Konteks Indonesia', 'KKNI memetakan jenjang; pengakuan perlu diselaraskan.'],
    ],
    visualType: 'policy',
  },
  {
    section: '03 / TATA KELOLA & KEMITRAAN',
    title: 'Industri ikut\\nmembentuk kelas.',
    lead:
      'Kemitraan yang kuat bukan sekadar nota kesepahaman. Masukan industri perlu hadir dalam kurikulum, pengalaman kerja, dan evaluasi.',
    image: photos.collaboration,
    imageAlt: 'Tim profesional berkolaborasi di tempat kerja',
    visualLabel: 'EKOSISTEM KEMITRAAN',
    visualTitle: 'Belajar bersama industri',
    visualNote: 'Perusahaan · pendidikan · pemerintah · tenaga kerja',
    cards: [
      ['Dengar kebutuhan', 'Industry Advisory Committees memberi masukan kompetensi dan teknologi.'],
      ['Rancang bersama', 'Industri membantu pembaruan materi sesuai pekerjaan.'],
      ['Belajar di lapangan', 'Pemagangan memberi ruang untuk menerapkan keterampilan.'],
      ['Ukur hasilnya', 'Evaluasi berkala memastikan kerja sama menghasilkan manfaat nyata.'],
    ],
    visualType: 'ecosystem',
  },
  {
    section: '04 / KURIKULUM & KOMPETENSI',
    title: 'Kompetensi tumbuh\\ndari praktik.',
    lead:
      'Pembelajaran menggabungkan akademik dan teknis, lalu mengujinya melalui pengalaman kerja yang relevan dengan kebutuhan wilayah.',
    image: photos.workshop,
    imageAlt: 'Peserta pelatihan menerapkan keterampilan teknis',
    visualLabel: 'ALUR BELAJAR',
    visualTitle: 'Dari konsep ke kompetensi',
    visualNote: 'National Career Clusters Framework mengelompokkan jalur karier',
    cards: [
      ['Pahami konsep', 'Dasar akademik mendukung pemahaman bidang keahlian.'],
      ['Latih keterampilan', 'Praktik menguatkan penerapan teori dan prosedur kerja.'],
      ['Kerjakan proyek', 'Work-Based Learning mencakup magang, pendampingan, dan proyek.'],
      ['Perbarui materi', 'Masukan industri membantu menjaga relevansi pembelajaran.'],
    ],
    visualType: 'path',
  },
  {
    section: '05 / TEKNOLOGI & INOVASI',
    title: 'Teknologi membuka\\nruang latihan baru.',
    lead:
      'Alat digital memperluas cara berlatih dan mengelola pembelajaran—dengan akses, biaya, infrastruktur, dan kesiapan pendidik tetap diperhatikan.',
    image: photos.digital,
    imageAlt: 'Visual teknologi digital untuk pembelajaran',
    visualLabel: 'PERANGKAT PEMBELAJARAN',
    visualTitle: 'Digital, sesuai kebutuhan',
    visualNote: 'Penerapan perlu mengikuti kesiapan institusi',
    cards: [
      ['Simulasi & AR/VR', 'Berlatih melalui lingkungan virtual sebelum situasi kerja nyata.'],
      ['Daring & blended', 'Memadukan pembelajaran tatap muka dan daring.'],
      ['LMS & e-portfolio', 'Mengelola kegiatan belajar sekaligus mendokumentasikan hasil.'],
      ['AI berpotensi', 'Mendukung umpan balik dan pembelajaran adaptif; perlu kesiapan.'],
    ],
    visualType: 'technology',
  },
  {
    section: '06 / ASESMEN & SERTIFIKASI',
    title: 'Buktikan apa yang\\nbisa dikerjakan.',
    lead:
      'Penilaian kompetensi memadukan pemahaman teori, demonstrasi praktik, proyek, dan dokumentasi hasil kerja.',
    image: photos.technology,
    imageAlt: 'Perangkat digital untuk menyimpan dan menampilkan bukti kerja',
    visualLabel: 'BUKTI KOMPETENSI',
    visualTitle: 'Lebih dari ujian tertulis',
    visualNote: 'Industry-Recognized Credentials dapat mengakui kompetensi tertentu',
    cards: [
      ['Pengetahuan', 'Tes mengukur pemahaman teori dan konsep.'],
      ['Kinerja', 'Tugas, simulasi, dan proyek memperlihatkan keterampilan.'],
      ['Dokumentasi', 'E-portfolio mengumpulkan hasil pekerjaan dan bukti capaian.'],
      ['Catatan penting', 'Sertifikat membantu pengakuan, tetapi tidak menjamin pekerjaan.'],
    ],
    visualType: 'evidence',
  },
  {
    section: '07 / PENDIDIK & PENGEMBANGAN',
    title: 'Pendidik perlu\\nterus bertumbuh.',
    lead:
      'Pendidik vokasi memadukan keahlian teknis dengan pedagogi, lalu memperbaruinya mengikuti perubahan pekerjaan dan teknologi.',
    image: photos.educator,
    imageAlt: 'Pendidik mempersiapkan materi pembelajaran',
    visualLabel: 'KOMPETENSI PENDIDIK',
    visualTitle: 'Teknis bertemu pedagogi',
    visualNote: 'Persyaratan dapat berbeda menurut negara bagian dan bidang',
    cards: [
      ['Keahlian bidang', 'Penguasaan teknis menjadi dasar pembelajaran vokasi.'],
      ['Kemampuan mengajar', 'Pedagogi membantu menyampaikan materi secara efektif.'],
      ['Upskilling', 'Pelatihan profesional memperbarui pengetahuan dan keterampilan.'],
      ['Belajar dari industri', 'Externship dan mentoring mendekatkan pendidik pada praktik terbaru.'],
    ],
    visualType: 'duo',
  },
  {
    section: '08 / ANALISIS SWOT',
    title: 'Fleksibel, namun\\ntidak tanpa tantangan.',
    lead:
      'Keberagaman jalur dan kemitraan membuka peluang—sementara kesenjangan sumber daya dan perubahan kebutuhan kerja perlu diantisipasi.',
    image: photos.workshop,
    imageAlt: 'Kegiatan praktik dalam lingkungan kerja',
    visualLabel: 'PETA SWOT',
    visualTitle: 'Kekuatan hingga ancaman',
    visualNote: 'Titik awal untuk menyusun langkah yang lebih terarah',
    cards: [
      ['S · Kekuatan', 'Jalur beragam, program fleksibel, industri terlibat.'],
      ['W · Kelemahan', 'Fasilitas dan kapasitas berbeda antardaerah.'],
      ['O · Peluang', 'AI, otomasi, dan teknologi digital membuka program baru.'],
      ['T · Ancaman', 'Perubahan kompetensi, kekurangan tenaga terampil, akses timpang.'],
    ],
    visualType: 'swot',
  },
  {
    section: '09 / STRATEGI DARI SWOT',
    title: 'Ubah temuan jadi\\nlangkah nyata.',
    lead:
      'Empat strategi menghubungkan kekuatan, kelemahan, peluang, dan ancaman agar sistem terus relevan dengan kebutuhan kerja.',
    image: photos.collaboration,
    imageAlt: 'Kolaborasi tim dalam mengembangkan strategi',
    visualLabel: 'EMPAT ARAH AKSI',
    visualTitle: 'Strategi yang saling melengkapi',
    visualNote: 'Teknologi · kurikulum · kemitraan · pemerataan',
    cards: [
      ['SO · Kembangkan', 'Gunakan kemitraan dan fleksibilitas untuk melatih AI, otomasi, dan digital.'],
      ['WO · Perluas akses', 'Manfaatkan teknologi dan kolaborasi untuk membantu institusi terbatas.'],
      ['ST · Tetap relevan', 'Perbarui kurikulum bersama industri saat pekerjaan berubah.'],
      ['WT · Perkuat fondasi', 'Tingkatkan evaluasi, koordinasi, dan pemerataan sumber daya.'],
    ],
    visualType: 'strategy',
  },
  {
    section: '10 / ADAPTABILITAS INDONESIA',
    title: 'Ambil pelajaran,\\nbukan menyalin.',
    lead:
      'Prinsip kemitraan dan pengalaman kerja sejalan dengan arah kebijakan Indonesia—penerapannya tetap perlu mengikuti konteks nasional.',
    image: photos.classroom,
    imageAlt: 'Suasana belajar untuk mengawali pembahasan penerapan di Indonesia',
    visualLabel: 'JEMBATAN AS → INDONESIA',
    visualTitle: 'Adaptasi sesuai konteks',
    visualNote: 'Kebutuhan daerah · fasilitas · kebijakan · KKNI',
    cards: [
      ['Perpres 68/2022', 'Salah satu dasar penguatan revitalisasi pendidikan dan pelatihan vokasi.'],
      ['Link and match 8+i', 'Mendorong kerja sama pendidikan dan industri.'],
      ['Wujudkan bersama', 'Magang, kurikulum bersama, praktisi mengajar, proyek, dan sertifikasi.'],
      ['Sesuaikan konteks', 'Pertimbangkan kondisi daerah, fasilitas, kebijakan, dan KKNI.'],
    ],
    visualType: 'bridge',
  },
  {
    section: '11 / REKOMENDASI IMPLEMENTASI',
    title: 'Mulai dari kerja\\nsama yang bermakna.',
    lead:
      'Dampak kemitraan terlihat dari bertambahnya kompetensi peserta didik—bukan semata dari jumlah dokumen kerja sama.',
    image: photos.workshop,
    imageAlt: 'Kegiatan praktik yang mencerminkan pembelajaran berbasis proyek',
    visualLabel: 'LANGKAH IMPLEMENTASI',
    visualTitle: 'Rancang · praktikkan · evaluasi',
    visualNote: 'Berangkat dari kebutuhan industri dan potensi daerah',
    cards: [
      ['Potensi daerah', 'Pilih mitra sesuai sektor pekerjaan yang berkembang di wilayah.'],
      ['Materi praktik', 'Tinjau dan perbarui agar mengikuti teknologi serta pekerjaan.'],
      ['Proyek nyata', 'Gunakan masalah relevan dan rubrik penilaian yang jelas.'],
      ['Pendidik & fasilitas', 'Dukung pengalaman industri dan teknologi sesuai kemampuan institusi.'],
      ['Evaluasi dampak', 'Ukur peningkatan kompetensi dan kualitas hasil belajar.'],
    ],
    visualType: 'checklist',
  },
  {
    section: '12 / KESIMPULAN',
    title: 'Dari belajar menjadi\\nsiap berkarya.',
    lead:
      'Vokasi yang kuat menghubungkan pembelajaran, keterampilan teknis, pengalaman kerja, teknologi, dan penilaian kompetensi.',
    image: photos.america,
    imageAlt: 'Kota New York sebagai penutup presentasi pendidikan vokasi AS',
    visualLabel: 'INTI PEMBELAJARAN',
    visualTitle: 'Relevan dengan dunia kerja',
    visualNote: 'Pelajaran terbaik adalah yang diadaptasi dengan bijak',
    cards: [
      ['Belajar terhubung', 'Industri dan pengalaman kerja memperkuat relevansi pembelajaran.'],
      ['Bukti kompetensi', 'Praktik dan proyek menunjukkan kemampuan yang dapat diterapkan.'],
      ['Adaptasi bijak', 'Sesuaikan praktik dengan daerah, fasilitas, pendidik, dan kebijakan.'],
      ['Tujuan bersama', 'Lulusan memahami teori sekaligus mampu menerapkannya.'],
    ],
    visualType: 'closing',
  },
]

const sectionIcons = [BookOpen, GraduationCap, Briefcase, Layers, Cpu, ClipboardCheck, Users, Target, Zap, ArrowRight, Check, Award]
const shortTitles = [
  'Pembuka',
  'Model CTE',
  'Kebijakan',
  'Kemitraan',
  'Kurikulum',
  'Teknologi',
  'Asesmen',
  'Pendidik',
  'SWOT',
  'Strategi',
  'Adaptasi',
  'Implementasi',
  'Kesimpulan',
]

function SlideCards({ cards }) {
  return (
    <div className={`slide-cards ${cards.length === 5 ? 'slide-cards-five' : ''}`}>
      {cards.map(([title, description], index) => {
        const Icon = sectionIcons[index % sectionIcons.length]
        return (
          <div className="info-card" key={title}>
            <span className="info-card-icon" aria-hidden="true">
              <Icon size={15} strokeWidth={1.8} />
            </span>
            <div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function VisualDiagram({ type }) {
  if (type === 'swot') {
    return (
      <div className="visual-diagram swot-diagram" aria-hidden="true">
        <div><b>S</b><span>Strengths</span><i>Industry links</i></div>
        <div><b>W</b><span>Weaknesses</span><i>Uneven resources</i></div>
        <div><b>O</b><span>Opportunities</span><i>AI & digital</i></div>
        <div><b>T</b><span>Threats</span><i>Shifting skills</i></div>
      </div>
    )
  }

  if (type === 'strategy') {
    return (
      <div className="visual-diagram strategy-diagram" aria-hidden="true">
        <div><b>SO</b><span>Build on strengths</span><i>01</i></div>
        <div><b>WO</b><span>Widen access</span><i>02</i></div>
        <div><b>ST</b><span>Keep skills relevant</span><i>03</i></div>
        <div><b>WT</b><span>Strengthen foundations</span><i>04</i></div>
      </div>
    )
  }

  const diagramContent = {
    path: ['TEORI', 'PRAKTIK', 'DUNIA KERJA'],
    policy: ['PERKINS V', 'WIOA 2014', 'KREDENSIAL'],
    ecosystem: ['INDUSTRI', 'PENDIDIKAN', 'PEMERINTAH'],
    technology: ['SIMULASI', 'LMS', 'E-PORTFOLIO', 'AI'],
    evidence: ['PENGETAHUAN', 'DEMONSTRASI', 'PORTOFOLIO'],
    duo: ['KOMPETENSI TEKNIS', 'PEDAGOGI'],
    bridge: ['MAGANG', 'KURIKULUM', 'PROYEK', 'SERTIFIKASI'],
    checklist: ['POTENSI DAERAH', 'PROYEK NYATA', 'EVALUASI DAMPAK'],
    closing: ['BELAJAR', 'MENERAPKAN', 'BERKARYA'],
  }[type]

  if (!diagramContent) return null

  return (
    <div className={`visual-diagram flow-diagram flow-${type}`} aria-hidden="true">
      {diagramContent.map((label, index) => (
        <div className="flow-node" key={label}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <b>{label}</b>
          {index < diagramContent.length - 1 && <i />}
        </div>
      ))}
    </div>
  )
}

function VisualPanel({ slide, isCover }) {
  return (
    <motion.div
      layoutId="morph-visual"
      className={`visual-panel ${isCover ? 'visual-panel-cover' : ''}`}
      style={{ backgroundImage: `url("${slide.image}")` }}
      role="img"
      aria-label={slide.imageAlt}
      transition={{ type: 'spring', stiffness: 90, damping: 22 }}
    >
      <div className="visual-grain" />
      <div className="visual-topline">
        <span className="visual-star" aria-hidden="true">✦</span>
        <span>{slide.visualLabel}</span>
      </div>
      {!isCover && <VisualDiagram type={slide.visualType} />}
      <div className="visual-caption">
        <span className="caption-rule" />
        <h2>{slide.visualTitle}</h2>
        <p>{slide.visualNote}</p>
      </div>
      {isCover ? (
        <div className="cover-coordinates">
          <span>USA / CTE</span>
          <span className="coordinate-label">FIELDNOTES · 01</span>
        </div>
      ) : (
        <span className="visual-index">USA / CTE</span>
      )}
    </motion.div>
  )
}

function SlideContent({ slide, index, prefersReducedMotion }) {
  const isCover = slide.kind === 'cover'
  return (
    <motion.article
      key={index}
      className={`slide-layout ${isCover ? 'slide-layout-cover' : ''}`}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
      transition={{ duration: prefersReducedMotion ? 0.01 : 0.35, ease: 'easeOut' }}
      aria-label={`Slide ${index + 1}: ${slide.section}`}
    >
      <div className={`slide-copy ${slide.cards?.length === 5 ? 'slide-copy-five' : ''}`}>
        <motion.div layoutId="morph-kicker" className="section-label">
          <span className="section-dot" />
          {slide.section}
        </motion.div>
        <motion.h1 layoutId="morph-title" className="slide-title">
          {slide.title.split('\\n').map((line, lineIndex) => (
            <span key={`${line}-${lineIndex}`}>{line}</span>
          ))}
        </motion.h1>
        <p className="slide-lead">{slide.lead}</p>
        {isCover ? (
          <>
            <div className="cover-tags">
              {slide.tags.map((tag) => (
                <span key={tag}><span className="tag-mark" />{tag}</span>
              ))}
            </div>
            <div className="cover-byline">
              <span className="byline-stroke" />
              <span>SEBUAH PRESENTASI INTERAKTIF</span>
            </div>
          </>
        ) : (
          <SlideCards cards={slide.cards} />
        )}
      </div>
      <VisualPanel slide={slide} isCover={isCover} />
    </motion.article>
  )
}

function App() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [fullscreenError, setFullscreenError] = useState('')
  const shellRef = useRef(null)
  const touchStart = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const slide = slides[activeSlide]
  const progress = ((activeSlide + 1) / slides.length) * 100

  const goToSlide = (nextIndex) => {
    setActiveSlide(Math.max(0, Math.min(slides.length - 1, nextIndex)))
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return
      if (event.key === 'ArrowRight' || event.key === 'PageDown') {
        event.preventDefault()
        setActiveSlide((current) => Math.min(slides.length - 1, current + 1))
      } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault()
        setActiveSlide((current) => Math.max(0, current - 1))
      } else if (event.key === 'Home') {
        setActiveSlide(0)
      } else if (event.key === 'End') {
        setActiveSlide(slides.length - 1)
      } else if (event.code === 'Space' && !['BUTTON', 'A'].includes(document.activeElement?.tagName)) {
        event.preventDefault()
        setIsPlaying((playing) => !playing)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (!isPlaying) return undefined
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length)
    }, 6500)
    return () => window.clearInterval(timer)
  }, [isPlaying])

  useEffect(() => {
    const syncFullscreen = () => setIsFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', syncFullscreen)
    return () => document.removeEventListener('fullscreenchange', syncFullscreen)
  }, [])

  const toggleFullscreen = async () => {
    setFullscreenError('')
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen()
      } else if (shellRef.current?.requestFullscreen) {
        await shellRef.current.requestFullscreen()
      } else {
        setFullscreenError('Mode layar penuh tidak tersedia di browser ini.')
      }
    } catch (error) {
      setFullscreenError(`Tidak dapat membuka mode layar penuh: ${error.message}`)
    }
  }

  const handleTouchStart = (event) => {
    touchStart.current = event.changedTouches[0]?.clientX ?? null
  }

  const handleTouchEnd = (event) => {
    if (touchStart.current === null) return
    const delta = event.changedTouches[0].clientX - touchStart.current
    if (Math.abs(delta) > 48) goToSlide(activeSlide + (delta < 0 ? 1 : -1))
    touchStart.current = null
  }

  return (
    <main className="presentation-shell min-h-screen flex flex-col" ref={shellRef}>
      <header className="topbar">
        <button
          className="brand-lockup"
          type="button"
          onClick={() => goToSlide(0)}
          aria-label="Kembali ke slide pembuka"
        >
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span className="brand-name">FIELD<span>NOTES</span></span>
        </button>
        <div className="topbar-center">
          <span className="live-dot" />
          <span>EDUCATION / UNITED STATES</span>
        </div>
        <div className="topbar-right">
          <span className="edition-label">A PRESENTATION</span>
          <span className="topbar-divider" />
          <span className="current-chapter">{String(activeSlide + 1).padStart(2, '0')} <span>/ {String(slides.length).padStart(2, '0')}</span></span>
        </div>
      </header>

      <section
        className="presentation-stage"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        aria-label="Area presentasi"
      >
        <div className="stage-progress" aria-hidden="true">
          <motion.span
            animate={{ scaleX: progress / 100 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.35, ease: 'easeOut' }}
          />
        </div>
        <LayoutGroup>
          <AnimatePresence mode="sync" initial={false}>
            <SlideContent
              key={activeSlide}
              slide={slide}
              index={activeSlide}
              prefersReducedMotion={prefersReducedMotion}
            />
          </AnimatePresence>
        </LayoutGroup>
        <div className="stage-stamp" aria-hidden="true">
          <span>US</span>
          <span>✦</span>
          <span>ED.</span>
        </div>
      </section>

      <nav className="presentation-controls" aria-label="Kontrol presentasi">
        <div className="control-primary">
          <button
            className="control-icon home-control"
            onClick={() => { goToSlide(0); setIsPlaying(false) }}
            type="button"
            aria-label="Kembali ke slide pertama"
            title="Kembali ke awal"
          >
            <RotateCcw size={16} />
          </button>
          <span className="control-separator" />
          <button
            className="control-icon"
            onClick={() => goToSlide(activeSlide - 1)}
            disabled={activeSlide === 0}
            type="button"
            aria-label="Slide sebelumnya"
            title="Previous (←)"
          >
            <ChevronLeft size={19} />
          </button>
          <button
            className="play-control"
            onClick={() => setIsPlaying((playing) => !playing)}
            type="button"
            aria-label={isPlaying ? 'Jeda presentasi otomatis' : 'Putar presentasi otomatis'}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <CirclePause size={18} /> : <CirclePlay size={18} />}
            <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
          </button>
          <button
            className="control-icon"
            onClick={() => goToSlide(activeSlide + 1)}
            disabled={activeSlide === slides.length - 1}
            type="button"
            aria-label="Slide berikutnya"
            title="Next (→)"
          >
            <ChevronRight size={19} />
          </button>
          <span className="control-separator" />
          <span className="slide-counter"><b>{String(activeSlide + 1).padStart(2, '0')}</b><span> / {String(slides.length).padStart(2, '0')}</span></span>
        </div>

        <div className="thumbnail-rail" role="tablist" aria-label="Pilih slide">
          {slides.map((item, index) => (
            <button
              className={`thumbnail ${activeSlide === index ? 'thumbnail-active' : ''}`}
              key={item.section}
              onClick={() => goToSlide(index)}
              type="button"
              role="tab"
              aria-selected={activeSlide === index}
              aria-label={`Slide ${index + 1}: ${shortTitles[index]}`}
              title={`${String(index + 1).padStart(2, '0')} · ${shortTitles[index]}`}
            >
              <span className="thumbnail-number">{String(index + 1).padStart(2, '0')}</span>
              <span className="thumbnail-lines"><i /><i /><i /></span>
              <span className="thumbnail-accent" />
            </button>
          ))}
        </div>

        <div className="control-utilities">
          <span className="keyboard-hint"><kbd>←</kbd><kbd>→</kbd><span>navigate</span></span>
          <button
            className="control-icon fullscreen-control"
            onClick={toggleFullscreen}
            type="button"
            aria-label={isFullscreen ? 'Keluar dari layar penuh' : 'Tampilkan layar penuh'}
            title="Fullscreen"
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </nav>

      {fullscreenError && (
        <p className="fullscreen-error" role="alert">{fullscreenError}</p>
      )}

      <footer className="bottomline">
        <span><span className="footer-star">✦</span> A FIELD GUIDE TO VOCATIONAL EDUCATION</span>
        <span>DESIGNED TO MOVE IDEAS FORWARD <ArrowRight size={12} /></span>
      </footer>
    </main>
  )
}

export default App
