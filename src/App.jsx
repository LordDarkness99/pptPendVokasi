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
  X,
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
    section: '02 / CONTOH INDUSTRI & DUNIA KERJA',
    title: 'Dari ruang kelas\\nke dunia kerja.',
    lead:
      'Industri dapat membantu pendidikan vokasi melatih keterampilan yang benar-benar dipakai—lalu memberi peserta didik cara untuk membuktikannya.',
    image: photos.digital,
    imageAlt: 'Pembelajaran teknologi digital yang relevan dengan keterampilan industri',
    visualLabel: 'CONTOH JALUR KETERAMPILAN',
    visualTitle: 'Latih · buktikan · terapkan',
    visualNote: 'Contoh program industri, bukan jaminan penempatan kerja',
    cards: [
      ['NVIDIA · AI & komputasi', 'NVIDIA Deep Learning Institute menyediakan pelatihan praktik di AI, data science, dan accelerated computing.'],
      ['AWS Academy · cloud', 'Kurikulum cloud untuk perguruan tinggi membantu mahasiswa membangun keterampilan dan mengejar sertifikasi industri.'],
      ['Belajar di tempat kerja', 'Magang dan apprenticeship memberi latihan tugas nyata dengan bimbingan, berdampingan dengan pembelajaran di kelas.'],
      ['Dampaknya ke pekerjaan', 'Proyek, praktik, dan kredensial dapat membuat kompetensi lebih terlihat dan membantu kesiapan kerja—tetapi tidak menjamin pekerjaan.'],
    ],
    visualType: 'industry',
    visualItems: [
      [
        '01',
        'NVIDIA DLI',
        'AI · data · accelerated computing',
        'NVIDIA Deep Learning Institute menyediakan kelas dan lokakarya praktik untuk membangun keterampilan AI, data science, dan accelerated computing.',
      ],
      [
        '02',
        'AWS ACADEMY',
        'Cloud skills · industry credentials',
        'AWS Academy menyediakan kurikulum cloud untuk institusi pendidikan tinggi. Materi belajar dapat membantu peserta mengejar sertifikasi industri.',
      ],
      [
        '03',
        'WORK-BASED',
        'Praktik · proyek · pengalaman kerja',
        'Magang, proyek, dan apprenticeship memberi kesempatan berlatih pada tugas kerja dengan bimbingan, sambil menghubungkan pengalaman itu dengan materi kelas.',
      ],
    ],
    sources: [
      ['NVIDIA Deep Learning Institute', 'https://www.nvidia.com/en-us/training/'],
      ['AWS Academy', 'https://aws.amazon.com/training/awsacademy/'],
    ],
  },
  {
    section: '03 / KEBIJAKAN & KUALIFIKASI',
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
    section: '04 / TATA KELOLA & KEMITRAAN',
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
    section: '05 / KURIKULUM & KOMPETENSI',
    title: 'Kurikulum adaptif\\nberbasis kerja.',
    lead:
      'Memadukan standar akademik, praktik teknis, dan Work-Based Learning dengan pembaruan berlapis.',
    image: photos.workshop,
    imageAlt: 'Peserta pelatihan menerapkan keterampilan teknis',
    visualLabel: 'WEWENANG KURIKULUM | USA / CTE',
    visualTitle: 'Kewenangan Berlapis',
    visualNote: 'Kecepatan adopsi teknologi baru bergantung pada kebijakan tiap negara bagian',
    cards: [
      ['Pendekatan Terpadu', 'Menggabungkan akademik, kompetensi teknis, dan WBL (magang, job shadowing, proyek).'],
      ['Acuan Klaster Karier', 'National Career Clusters Framework menyelaraskan jalur pendidikan dan kebutuhan industri.'],
      ['Kecepatan Pembaruan', 'Bertahap per negara bagian; pembaruan kerangka nasional butuh ±1,5 tahun (15 iterasi).'],
      ['Respons Teknologi Baru', 'Integrasi literasi AI dan teknologi terkini divalidasi berkala bersama mitra industri.'],
    ],
    visualType: 'authority',
    visualItems: [
      [
        '01',
        'FEDERAL',
        'Arah kebijakan & dana Perkins V',
        'Pemerintah federal memberi arah dan dukungan pendanaan, termasuk melalui Perkins V. Syarat program terkait dana membantu menjaga keterkaitan CTE dengan standar akademik dan kebutuhan karier.',
      ],
      [
        '02',
        'NEGARA BAGIAN',
        'Adopsi kerangka & validasi program',
        'Negara bagian menyetujui dan memantau program, mengadopsi kerangka seperti National Career Clusters Framework, serta menyesuaikan penerapan dengan kebutuhan regional. Kerangka karier bersama tetap diterapkan menurut keputusan masing-masing negara bagian.',
      ],
      [
        '03',
        'DISTRIK / SEKOLAH',
        'Penyusunan & pelaksanaan kurikulum',
        'Distrik dan sekolah menerjemahkan kerangka serta kebijakan menjadi kurikulum, mata pelajaran, praktik, dan pengalaman kerja untuk peserta didik.',
      ],
      [
        '04',
        'INDUSTRI',
        'Validator standar & kebutuhan kerja',
        'Mitra industri memberi masukan tentang standar kerja, teknologi, dan kredensial, lalu meninjau relevansi program secara berkala. Masukan dapat membantu pembaruan AI dan teknologi baru, tetapi akses alat serta kesiapan pendidik berbeda-beda.',
      ],
    ],
  },
  {
    section: '06 / TEKNOLOGI & INOVASI',
    title: 'Siasati alat mahal\\ndengan simulasi.',
    lead:
      'Strategi laboratorium virtual, pendanaan eksternal, dan ekosistem digital untuk merekam kompetensi.',
    image: photos.digital,
    imageAlt: 'Visual teknologi digital untuk pembelajaran',
    visualLabel: 'EKOSISTEM DIGITAL | USA / CTE',
    visualTitle: 'Dari Latihan ke Rekam Jejak',
    visualNote: 'Mengatasi kendala biaya alat sekaligus mendokumentasikan capaian belajar',
    cards: [
      ['Simulasi & AR/VR', 'Pelengkap latihan awal sebelum memakai alat dan bahan praktik fisik yang mahal.'],
      ['Hibah & Pembelajaran Daring', 'Dukungan hibah negara bagian serta video demonstrasi dan blended learning.'],
      ['LMS & Analitik AI', 'Canvas/Moodle melacak kemajuan belajar dan memberi umpan balik adaptif.'],
      ['E-Portfolio Terverifikasi', 'Transkrip keterampilan merekam proyek, lencana digital, dan sertifikasi siswa.'],
    ],
    visualType: 'digital',
    visualItems: [
      [
        '01',
        'SIMULASI AR/VR',
        'Latihan virtual hemat risiko',
        'Simulasi membantu peserta mencoba prosedur dan menerima umpan balik sebelum praktik dengan alat sebenarnya. Pada pelatihan teknis, simulasi melengkapi—bukan menggantikan—latihan langsung.',
      ],
      [
        '02',
        'HIBAH & DARING',
        'Solusi keterbatasan fasilitas',
        'Hibah dapat membantu institusi menyediakan peralatan atau simulator. Materi daring dan simulasi virtual juga dapat memperluas kesempatan latihan saat fasilitas atau akses ke tempat kerja terbatas.',
      ],
      [
        '03',
        'LMS + AI',
        'Pelacakan kompetensi adaptif',
        'LMS seperti Canvas atau Moodle mengelola materi, aktivitas, dan kemajuan belajar. Analitik dapat menandai bagian yang belum dikuasai dan memberi umpan balik; penggunaan AI tetap memerlukan kesiapan pendidik, perlindungan data, dan akses yang memadai.',
      ],
      [
        '04',
        'E-PORTFOLIO',
        'Rekam jejak bukti karya',
        'E-portfolio atau skills-based transcript dapat menyimpan proyek, sertifikasi, dan pengalaman belajar sebelumnya sebagai rekam jejak kompetensi yang dapat ditunjukkan kepada calon pemberi kerja.',
      ],
    ],
  },
  {
    section: '07 / ASESMEN & SERTIFIKASI',
    title: 'Diuji industri,\\ndibuktikan karya.',
    lead:
      'Sertifikasi diterbitkan pihak ketiga independen dengan penilaian seimbang antara teori, praktik, dan portofolio.',
    image: photos.technology,
    imageAlt: 'Perangkat digital untuk menyimpan dan menampilkan bukti kerja',
    visualLabel: 'KOMPONEN ASESMEN | USA / CTE',
    visualTitle: 'Industry-Recognized Credentials',
    visualNote: 'Sekolah menyiapkan kurikulum, pihak ketiga menguji dan menerbitkan sertifikat',
    cards: [
      ['Penguji Pihak Ketiga', 'Asosiasi industri/profesi & lembaga independen (mis. Precision Exams) menerbitkan IRC.'],
      ['Tes Kognitif & Kinerja', 'Ujian teori dan skill demonstration berbasis rubrik direkomendasikan berbobot setara.'],
      ['Kulminasi E-Portfolio', 'Merangkum proyek nyata, sertifikasi industri, resume, dan refleksi karier siswa.'],
      ['Dampak Pasar Kerja', 'IRC mendukung pengakuan kompetensi dan penghasilan, namun tidak otomatis menjamin kerja.'],
    ],
    visualType: 'assessment',
    visualItems: [
      [
        '01',
        'TES KOGNITIF',
        'Pemahaman teori (bobot setara)',
        'Tes mengukur pemahaman konsep dan pengetahuan bidang. Hasilnya paling informatif bila dibaca bersama bukti praktik, bukan sebagai satu-satunya ukuran kompetensi.',
      ],
      [
        '02',
        'DEMONSTRASI',
        'Praktik & simulasi (bobot setara)',
        'Skill demonstration menilai cara peserta menerapkan keterampilan, memecahkan masalah, dan menyelesaikan tugas atau proyek dengan kriteria yang jelas.',
      ],
      [
        '03',
        'E-PORTFOLIO',
        'Kulminasi proyek & IRC',
        'Kredensial dapat diuji dan diterbitkan oleh lembaga independen, dewan profesi, atau asosiasi industri, sementara institusi pendidikan menyiapkan pembelajarannya. E-portfolio merangkum proyek, sertifikasi, resume, dan refleksi karier. Kredensial dapat mendukung pengakuan kompetensi, tetapi tidak menjamin pekerjaan atau kecocokan bidang kerja.',
      ],
    ],
  },
  {
    section: '08 / PENDIDIK & PENGEMBANGAN',
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
    section: '09 / ANALISIS SWOT',
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
    section: '10 / STRATEGI DARI SWOT',
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
    section: '11 / ADAPTABILITAS INDONESIA',
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
    section: '12 / REKOMENDASI IMPLEMENTASI',
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
    section: '13 / KESIMPULAN',
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
  'Industri',
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

function SlideSources({ sources }) {
  if (!sources?.length) return null

  return (
    <div className="slide-sources" aria-label="Sumber informasi">
      <span>Sumber:</span>
      {sources.map(([label, url]) => (
        <a href={url} key={url} target="_blank" rel="noreferrer">
          {label}
        </a>
      ))}
    </div>
  )
}

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

const diagramDetails = {
  path: [
    'CTE memadukan pengetahuan akademik yang mengikuti standar negara bagian dengan keterampilan teknis dan persiapan karier. Program dapat tersedia di sekolah menengah maupun institusi pascasekolah menengah.',
    'Keterampilan diperkuat lewat latihan terapan, proyek, simulasi, job shadowing, atau mentoring. Community college dan technical college juga menawarkan pelatihan teknis, sertifikat, serta associate degree.',
    'Magang dan Registered Apprenticeship menghubungkan pembelajaran dengan pekerjaan nyata. Apprenticeship memadukan pelatihan di tempat kerja dengan pembelajaran teknis terstruktur; hasilnya tetap bergantung pada mutu program dan kebutuhan wilayah.',
  ],
  policy: [
    'Perkins V mendukung program CTE di jenjang menengah dan pascasekolah menengah. Pendanaan federal mendorong kualitas, akses, dan keselarasan program dengan kebutuhan peserta didik serta pasar kerja.',
    'WIOA menghubungkan pengembangan keterampilan dengan layanan tenaga kerja. Pelatihan dapat diarahkan pada kebutuhan pekerjaan dan layanan ketenagakerjaan di wilayah.',
    'Kualifikasi dapat berupa sertifikat teknis, associate degree, sertifikasi profesional, atau lisensi. AS tidak memiliki satu kerangka kualifikasi nasional universal seperti KKNI, sehingga pengakuan perlu dilihat menurut bidang dan penerbitnya.',
  ],
  ecosystem: [
    'Komite penasihat industri dapat memberi masukan tentang kompetensi, teknologi, peralatan, standar kerja, dan kredensial. Masukan perlu ditinjau berkala agar pembelajaran tidak tertinggal.',
    'Sekolah, community college, technical college, dan penyedia pelatihan menerjemahkan kebutuhan tersebut menjadi kurikulum, program berbasis kerja, dan jalur kualifikasi. Institusi tetap bertanggung jawab atas mutu pengajaran.',
    'Pemerintah dan organisasi tenaga kerja membantu kebijakan, koordinasi, serta dukungan program. Bentuk keterlibatan dan tanggung jawab berbeda menurut program; kemitraan perlu memiliki kegiatan serta evaluasi nyata.',
  ],
  duo: [
    'Persyaratan pendidik CTE tidak seragam secara nasional. Negara bagian atau institusi dapat menggabungkan pendidikan formal, pengalaman kerja tervalidasi, lisensi atau sertifikasi bidang, asesmen, dan pelatihan keguruan; jalur alternatif berbasis industri juga tersedia di sejumlah wilayah.',
    'Pengalaman industri menjaga materi dekat dengan praktik kerja, tetapi tidak otomatis menggantikan kemampuan mengajar. Mentoring, induksi setelah mulai mengajar, pelatihan pedagogi, dan externship membantu pendidik mengembangkan kedua sisi kompetensi. Kebutuhan pengembangan profesional dan kekurangan guru CTE tetap menjadi tantangan.',
  ],
  bridge: [
    'Magang memberi pengalaman menerapkan keterampilan di lingkungan kerja. Perpres Nomor 68 Tahun 2022 dan link and match 8+i mendorong kolaborasi pendidikan vokasi dengan industri, termasuk pengalaman kerja dan praktisi mengajar.',
    'Kurikulum bersama membantu sekolah dan industri menyelaraskan kompetensi, teknologi, dan prosedur kerja yang dipelajari. Penerapan di Indonesia tetap menyesuaikan kebijakan nasional serta kebutuhan daerah.',
    'Proyek nyata melatih peserta memecahkan masalah, bekerja dengan standar yang jelas, dan menunjukkan hasil. Proyek dapat dirancang bersama pemberi kerja atau komunitas.',
    'Sertifikasi industri dapat menjadi bukti tambahan kompetensi. Pengakuan dan kesetaraannya perlu dipetakan ke sistem nasional seperti KKNI; sertifikat sendiri tidak menjamin pekerjaan.',
  ],
  checklist: [
    'Pilih mitra berdasarkan potensi ekonomi dan kebutuhan sektor kerja setempat. Forum atau kemitraan regional dapat membantu sekolah, perguruan tinggi, pemerintah, dan perusahaan berbagi informasi serta fasilitas.',
    'Tinjau kurikulum secara berkala bersama industri. Proyek perlu menggunakan masalah kerja yang relevan, sasaran kompetensi, pembimbing, dan rubrik penilaian yang dipahami peserta.',
    'Nilai kerja sama dari peningkatan kompetensi dan kualitas hasil belajar—bukan hanya jumlah perjanjian. Catat tindak lanjut, kesenjangan fasilitas, pengalaman peserta, dan kebutuhan pelatihan pendidik.',
  ],
  closing: [
    'Ekosistem TVET AS menggabungkan CTE, community college, technical college, dan apprenticeship. Keberagaman membuka pilihan jalur, tetapi membutuhkan koordinasi agar mutu dan pengakuan kompetensi tidak terlalu timpang.',
    'Pembelajaran teori, praktik, simulasi, dan proyek membantu peserta mengubah pengetahuan menjadi kompetensi. Kemitraan industri dan pengalaman kerja menjaga latihan tetap relevan.',
    'Portofolio, sertifikasi, dan pengalaman kerja membuat kemampuan lebih mudah ditunjukkan kepada pemberi kerja. Adaptasi untuk Indonesia perlu sesuai kebutuhan daerah, kapasitas institusi, dan KKNI.',
  ],
}

const diagramLabels = {
  path: ['TEORI', 'PRAKTIK', 'DUNIA KERJA'],
  policy: ['PERKINS V', 'WIOA 2014', 'KREDENSIAL'],
  ecosystem: ['INDUSTRI', 'PENDIDIKAN', 'PEMERINTAH'],
  duo: ['KOMPETENSI TEKNIS', 'PEDAGOGI'],
  bridge: ['MAGANG', 'KURIKULUM', 'PROYEK', 'SERTIFIKASI'],
  checklist: ['POTENSI DAERAH', 'PROYEK NYATA', 'EVALUASI DAMPAK'],
  closing: ['BELAJAR', 'MENERAPKAN', 'BERKARYA'],
}

const swotItems = [
  [
    'S',
    'Kekuatan',
    'Jalur beragam · industri terlibat',
    'CTE, community college, technical college, dan Registered Apprenticeship memberi beragam jalur. Integrasi akademik, keterampilan teknis, dan pengalaman kerja membantu peserta memilih kompetensi sesuai tujuan karier. Fleksibilitas program juga memungkinkan penyesuaian dengan ekonomi regional.',
  ],
  [
    'W',
    'Kelemahan',
    'Sumber daya tidak merata',
    'Desentralisasi menyebabkan kapasitas, fasilitas, dan sumber daya berbeda antardaerah dan lembaga. Beragamnya standar serta kredensial dapat menyulitkan penyelarasan dan pengakuan kompetensi. Pembelajaran berbasis kerja juga bergantung pada kapasitas pemberi kerja dan mitra.',
  ],
  [
    'O',
    'Peluang',
    'AI · otomasi · digital',
    'AI, otomasi, dan teknologi digital membuka peluang reskilling dan upskilling. Kemitraan dapat mengembangkan program baru, memperbarui kompetensi, serta memperluas apprenticeship agar perusahaan membangun jalur tenaga kerja terampil.',
  ],
  [
    'T',
    'Ancaman',
    'Kesenjangan tenaga terampil',
    'Kekurangan tenaga terampil, perubahan kebutuhan kompetensi, dan ketimpangan akses menekan relevansi sistem. Di manufaktur, konstruksi, dan pekerjaan terampil, masa pensiun dapat menambah kebutuhan pengganti. Perusahaan kecil juga dapat terkendala kapasitas apprenticeship, jangkauan, serta pemahaman masyarakat tentang jalur ini.',
    'U.S. Department of Labor: employer strategies for Registered Apprenticeship',
    'https://www.dol.gov/resource-library/strategies-engage-employers-registered-apprenticeship-programs-takeaways-seven',
  ],
]

const strategyItems = [
  [
    '01',
    'SO',
    'Perluas program berbasis peluang',
    'Manfaatkan keberagaman jalur dan kemitraan industri untuk mengembangkan pelatihan AI, otomasi, dan teknologi digital sesuai kebutuhan pasar kerja. Perluasan Registered Apprenticeship juga dapat membantu perusahaan membangun jalur rekrutmen tenaga kerja terampil.',
  ],
  [
    '02',
    'WO',
    'Tutup kesenjangan kapasitas',
    'Gunakan teknologi, pendanaan yang tersedia, dan kerja sama lintas sektor untuk memperbaiki fasilitas, memperluas akses, serta meningkatkan kapasitas penyelenggara. Pemetaan kompetensi dan penyelarasan sertifikasi membantu industri mengenali hasil belajar.',
  ],
  [
    '03',
    'ST',
    'Perbarui keterampilan kerja',
    'Gunakan fleksibilitas kurikulum, masukan industri, dan pemagangan untuk memperbarui kompetensi saat teknologi berubah. Kemitraan juga dapat mendukung transfer pengetahuan dari pekerja berpengalaman kepada generasi tenaga kerja berikutnya.',
  ],
  [
    '04',
    'WT',
    'Perkuat pemerataan dan koordinasi',
    'Perkuat evaluasi kurikulum, pemerataan sumber daya, dan koordinasi antarlembaga. Kemitraan regional, penggunaan fasilitas praktik bersama, serta sosialisasi jalur vokasi dapat memperluas partisipasi dan mengurangi kesenjangan keterampilan.',
  ],
]

function getDiagramNodes(type, items = []) {
  if (['authority', 'digital', 'assessment', 'industry'].includes(type)) {
    return items.map(([number, title, summary, description]) => ({
      number,
      title,
      summary,
      description: description || summary,
    }))
  }

  if (type === 'swot') {
    return swotItems.map(([number, title, summary, description, sourceLabel, sourceUrl]) => ({
      number,
      title,
      summary,
      description,
      source: sourceLabel && { label: sourceLabel, url: sourceUrl },
    }))
  }

  if (type === 'strategy') {
    return strategyItems.map(([number, title, summary, description]) => ({
      number,
      title,
      dialogTitle: `Strategi ${title}`,
      summary,
      description,
    }))
  }

  return (diagramLabels[type] || []).map((title, index) => ({
    number: String(index + 1).padStart(2, '0'),
    title,
    description:
      diagramDetails[type]?.[index] ||
      `${title} merupakan bagian dari alur pembelajaran dan pengembangan kompetensi.`,
  }))
}

function DiagramButton({
  number,
  title,
  summary,
  description,
  source,
  dialogTitle,
  onSelect,
  className = '',
}) {
  return (
    <button
      className={className}
      type="button"
      aria-haspopup="dialog"
      aria-label={`Buka penjelasan: ${title}`}
      onClick={() =>
        onSelect({
          number,
          title: dialogTitle || title,
          description: description || summary,
          source,
        })
      }
    >
      {number && <span>{number}</span>}
      <b>{title}</b>
      {summary && <i>{summary}</i>}
      <small className="diagram-hint">ⓘ Penjelasan</small>
    </button>
  )
}

function VisualDiagram({ type, items = [], onSelect }) {
  const nodes = getDiagramNodes(type, items)
  if (!nodes.length) return null
  const numberedTypes = ['authority', 'digital', 'assessment', 'industry']
  const className = numberedTypes.includes(type)
    ? `numbered-diagram numbered-${type}`
    : type === 'swot' || type === 'strategy'
      ? `${type}-diagram`
      : `flow-diagram flow-${type}`

  return (
    <div className={`visual-diagram ${className}`}>
      {nodes.map((node) => (
        <DiagramButton
          className={numberedTypes.includes(type) ? 'numbered-card' : type === 'swot' ? 'diagram-square' : type === 'strategy' ? 'strategy-card' : 'flow-node'}
          description={node.description}
          key={node.number}
          number={node.number}
          onSelect={onSelect}
          source={node.source}
          dialogTitle={node.dialogTitle}
          summary={node.summary}
          title={node.title}
        />
      ))}
    </div>
  )
}

function MobileDiagramAccess({ type, items, onSelect }) {
  const nodes = getDiagramNodes(type, items)

  if (!nodes.length) return null

  return (
    <button
      className="mobile-diagram-trigger"
      type="button"
      aria-haspopup="dialog"
      aria-label="Buka penjelasan diagram"
      onClick={() =>
        onSelect({
          title: 'Pilih bagian diagram',
          description: 'Pilih tahapan yang ingin dipelajari.',
          nodes,
        })
      }
    >
      LIHAT ALUR <span aria-hidden="true">+</span>
    </button>
  )
}

function VisualPanel({ slide, isCover, onSelectDetail }) {
  return (
    <motion.div
      layoutId="morph-visual"
      className={`visual-panel ${isCover ? 'visual-panel-cover' : ''}`}
      style={{ backgroundImage: `url("${slide.image}")` }}
      role="group"
      aria-label={slide.imageAlt}
      transition={{ type: 'spring', stiffness: 90, damping: 22 }}
    >
      <div className="visual-grain" />
      <div className="visual-topline">
        <span className="visual-star" aria-hidden="true">✦</span>
        <span>{slide.visualLabel}</span>
      </div>
      {!isCover && (
        <VisualDiagram
          type={slide.visualType}
          items={slide.visualItems}
          onSelect={onSelectDetail}
        />
      )}
      {!isCover && (
        <MobileDiagramAccess
          type={slide.visualType}
          items={slide.visualItems}
          onSelect={onSelectDetail}
        />
      )}
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

function SlideContent({ slide, index, prefersReducedMotion, onSelectDetail }) {
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
          <>
            <SlideCards cards={slide.cards} />
            <SlideSources sources={slide.sources} />
          </>
        )}
      </div>
      <VisualPanel
        slide={slide}
        isCover={isCover}
        onSelectDetail={onSelectDetail}
      />
    </motion.article>
  )
}

function App() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [fullscreenError, setFullscreenError] = useState('')
  const [activeDetail, setActiveDetail] = useState(null)
  const shellRef = useRef(null)
  const detailCloseRef = useRef(null)
  const detailTriggerRef = useRef(null)
  const touchStart = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const slide = slides[activeSlide]
  const progress = ((activeSlide + 1) / slides.length) * 100

  const goToSlide = (nextIndex) => {
    setActiveSlide(Math.max(0, Math.min(slides.length - 1, nextIndex)))
  }

  const openDetail = (detail) => {
    detailTriggerRef.current = document.activeElement
    setIsPlaying(false)
    setActiveDetail(detail)
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return
      if (activeDetail) {
        if (event.key === 'Escape') {
          event.preventDefault()
          setActiveDetail(null)
        }
        return
      }

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
  }, [activeDetail])

  useEffect(() => {
    if (!activeDetail) return undefined

    const trigger = detailTriggerRef.current
    detailCloseRef.current?.focus()
    return () => trigger?.focus()
  }, [activeDetail])

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
              onSelectDetail={openDetail}
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

      <AnimatePresence>
        {activeDetail && (
          <motion.div
            className="detail-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.18 }}
            onClick={() => setActiveDetail(null)}
          >
            <motion.section
              className="detail-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="detail-dialog-title"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.2 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="detail-close"
                type="button"
                aria-label="Tutup penjelasan"
                ref={detailCloseRef}
                onClick={() => setActiveDetail(null)}
              >
                <X size={17} />
              </button>
              <p className="detail-dialog-kicker">
                PENJELASAN{activeDetail.number ? ` · ${activeDetail.number}` : ''}
              </p>
              <h2 id="detail-dialog-title">{activeDetail.title}</h2>
              <p>{activeDetail.description}</p>
              {activeDetail.source && (
                <a
                  className="detail-source"
                  href={activeDetail.source.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Sumber: {activeDetail.source.label}
                </a>
              )}
              {activeDetail.nodes && (
                <div className="detail-choice-list">
                  {activeDetail.nodes.map((node) => (
                    <button
                      type="button"
                      key={node.number}
                      onClick={() =>
                        setActiveDetail({
                          ...node,
                          title: node.dialogTitle || node.title,
                        })
                      }
                    >
                      <span>{node.number}</span>
                      <b>{node.title}</b>
                      <ArrowRight size={15} aria-hidden="true" />
                    </button>
                  ))}
                </div>
              )}
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

export default App
