import AnimatedNumberCountdown from "@/components/custom/animated-number-countdown"
import BasicPagination from "@/components/custom/basic-pagination"
import SakalokaLogo from "@/components/custom/sakaloka-logo"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import dayjs from "dayjs"
import { Mail, MailOpen, MapPin, Send } from "lucide-react"
import { motion } from "motion/react"
import queryString from "query-string"
import { useRef, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useLocation, useParams } from "react-router"
import { HashLoader } from "react-spinners"
import * as z from "zod"

const formSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi."),
  message: z.string().max(500, "Pesan maksimal 500 karakter."),
})

function InvitationPage() {
  const totalPages = 5
  const initialPage = 1

  const [open, setOpen] = useState<boolean>(false)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const params = useParams()
  const location = useLocation()
  const searchParams = queryString.parse(location.search) as {
    [key: string]: string
  }
  const name = params.name
  console.log("name", name)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      message: "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data)
  }

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const handleOpenInvitation = () => {
    setOpen(!open)
    if (!open) {
      setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 100)

      // Auto play music
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true)
          })
          .catch((error) => {
            console.log("Audio autoplay failed:", error)
          })
      }
    }
  }

  const couple = {
    groom: {
      name: "Muhammad Khoirul Fatikin",
      photo: "/akin-nafisah/DSC06165.webp",
      title: "Putra",
      parent: "Bpk. H. Timur Rustamadji Achmad (alm) & Ibu Hj. Nurul Suhaevah",
    },
    bride: {
      name: "Nafisah",
      photo: "/akin-nafisah/DSC06154.webp",
      title: "Anak ke-2",
      parent: "Bpk. Taufik Hidayat (alm) & Ibu Suminah",
    },
  }

  const event = [
    {
      for: ["groom"],
      name: "Ramah Tamah",
      dateFrom: "2025-11-22T12:00:00.000Z",
      location:
        "JL. KH. Wahid Hasyim Gg. Gedhong (yayasan simthudduror) No.71, Kauman Ledok, Pekalongan Timur, Kota Pekalongan",
      locationUrl: "https://maps.app.goo.gl/etvrQRyxzuz18kFe7?g_st=aw",
    },
    {
      for: ["bride", "groom"],
      name: "Akad Nikah",
      dateFrom: "2025-11-23T00:00:00.000Z",
      dateTo: "2023-01-01T01:00:00.000Z",
      location: "JL. Matana, No.41 , Poncol, Pekalongan Timur, Kota Pekalongan",
      locationUrl: "https://maps.app.goo.gl/i4d8cdJj8LL1LUCH9?g_st=aw",
    },
    {
      for: ["bride"],
      name: "Resepsi",
      dateFrom: "2025-11-23T05:00:00.000Z",
      dateTo: "2023-01-01T07:00:00.000Z",
      location: "JL. Matana, No.41 , Poncol, Pekalongan Timur, Kota Pekalongan",
      locationUrl: "https://maps.app.goo.gl/i4d8cdJj8LL1LUCH9?g_st=aw",
    },
  ]

  const currentEvent = event.filter((e) => {
    if (!searchParams.event || searchParams.event === "all") return true

    return e.for.includes(searchParams.event)
  })

  const sortedEvent = currentEvent.sort((a, b) => {
    const aDate = new Date(a.dateFrom)
    const bDate = new Date(b.dateFrom)
    return aDate.getTime() - bDate.getTime()
  })

  const loveStory = [
    {
      title: "Mei 2025 - Pertemuan Dua Keluarga Besar",
      description:
        "Setelah melalui perjalanan yang penuh doa dan keyakinan, akhirnya dua keluarga besar kami dipertemukan dalam suasana hangat dan penuh kebahagiaan. Momen ini menjadi awal resmi langkah kami menuju masa depan bersama.",
    },
    {
      title: "Juli 2025 - Pertunangan",
      description:
        "Kami mengikat janji untuk saling menjaga dan mendukung satu sama lain. Sebuah simbol komitmen dan cinta yang kami rayakan bersama orang-orang terdekat.",
    },
    {
      title: "Oktober 2025 - Prewedding",
      description:
        "Kami mengabadikan kisah cinta ini dalam bingkai kenangan indah. Setiap senyum dan tatapan menjadi saksi betapa kami siap melangkah menuju hari bahagia.",
    },
    {
      title: "November 2025 — Menikah",
      description:
        "Inilah puncak perjalanan cinta kami — saat dua hati dipersatukan dalam satu ikatan suci. Semoga pernikahan ini menjadi awal kehidupan baru yang penuh berkah, cinta, dan kebahagiaan selamanya.",
    },
  ]

  const comments = [
    {
      author: "Andini",
      message:
        "Selamat atas pernikahannya! Semoga selalu diberi kebahagiaan dan cinta yang tak berkesudahan.",
      time: "2 menit yang lalu",
    },
    {
      author: "Budi Barakallah",
      message: "Semoga menjadi keluarga sakinah, mawaddah, warahmah.",
      time: "10 menit yang lalu",
    },
    {
      author: "Lina",
      message:
        "Ikut bahagia melihat kalian bersatu. Semoga langgeng sampai akhir hayat!",
      time: "30 menit yang lalu",
    },
  ]

  return (
    <div
      className={cn("flex w-full flex-col font-funnel", open && "lg:flex-row")}
    >
      <audio ref={audioRef} loop>
        <source
          src="/music/Wedding_Nasheed_Muhammad_Al_Muqit.mp3"
          type="audio/mpeg"
        />
      </audio>

      <button
        onClick={toggleMusic}
        className={cn(
          "fixed bottom-2 left-2 z-50 cursor-pointer transition-opacity duration-500",
          !open && "opacity-0",
          isPlaying && "animate-spin-slow"
        )}
      >
        <img src="/vinyl.png" alt="vinyl" className="w-14" />
      </button>

      <div className="sticky top-0 flex h-screen flex-1 flex-col items-center justify-center gap-4 text-center">
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-[#4a1325cc] to-[#4a13250]"></div>
        <div className="absolute inset-x-0 bottom-40 mt-60 flex flex-col items-center justify-center gap-4 text-center">
          <div className="space-y-2 font-tangerine font-bold text-white text-shadow-lg">
            <h2 className="text-[8vw] leading-[100%] font-bold md:text-5xl">
              Wedding Invitation
            </h2>
            <h1 className="text-[10vw] leading-[100%] font-bold md:text-7xl">
              Akin & Nafisah
            </h1>
          </div>
          <div className="min-w-80 space-y-2 rounded-lg p-4 text-white">
            <p>Kepada Yth.</p>
            <p className="font-quintessential text-2xl font-bold capitalize">
              {searchParams.to}
            </p>
            <div className="flex justify-center pt-4">
              <button
                onClick={handleOpenInvitation}
                className="group relative flex h-9 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-md bg-[#e3c3b1] px-6 font-medium text-[#4a1325] shadow"
              >
                {open ? (
                  <>
                    <MailOpen size={18} />
                    Tutup Undangan
                  </>
                ) : (
                  <>
                    <Mail size={18} />
                    Buka Undangan
                  </>
                )}

                <div className="absolute bottom-0 left-0 aspect-square w-full translate-y-full rounded-4xl bg-amber-500/20 transition-transform group-hover:translate-y-[50%]"></div>
              </button>
            </div>
          </div>
        </div>
        <div className="h-screen w-full">
          <img
            src="/akin-nafisah/DSC06225.webp"
            alt="akin-nafisah"
            className="h-screen w-full object-cover"
          />
        </div>
      </div>
      <div
        ref={ref}
        className={cn(
          "z-10 w-full max-w-none flex-none transition-all duration-500 lg:max-w-xl",
          !open && "-z-1 overflow-hidden lg:w-0"
        )}
      >
        <section className="flex min-h-screen items-center justify-center bg-[#4a1325]">
          <div className="space-y-4 text-center text-[#e3c3b1]">
            <motion.p
              initial={{ opacity: 0, transform: "translateY(-50px)" }}
              whileInView={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.8 }}
              className="text-lg font-extralight"
            >
              The Wedding Of
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col items-center justify-center font-tangerine text-8xl font-bold"
            >
              <span>Akin</span>
              <span> & </span>
              <span>Nafisah</span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, transform: "translateY(50px)" }}
              whileInView={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-lg font-extralight"
            >
              Ahad, 23 November 2025
            </motion.p>
          </div>
        </section>
        <section className="space-y-4 bg-[#e3c3b1] p-6">
          <div className="w-full space-y-4 rounded-lg bg-[#4a1325] p-4 pb-8 text-center text-balance text-[#e3c3b1]">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="flex justify-center"
            >
              <img src="/dove.png" alt="dove" className="w-60" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="space-y-2"
            >
              <p className="font-extralight">
                {`"Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."`}
              </p>
              <p className="font-semibold">{`(Ar-Rum: 21)`}</p>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="aspect-9/16 w-full overflow-hidden rounded-lg pr-14 pb-32"
          >
            <img
              src="/akin-nafisah/DSC06161.webp"
              alt="akin-nafisah"
              className="h-full scale-150 object-cover object-bottom-right"
            />
          </motion.div>
        </section>
        <section className="space-y-14 bg-[#4a1325] px-6 py-20 text-center text-[#e3c3b1]">
          <div>
            <motion.h1
              initial={{ opacity: 0, transform: "translateY(50px)" }}
              whileInView={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.8 }}
              className="font-tangerine text-7xl"
            >
              Couple
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, transform: "translateY(50px)" }}
              whileInView={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {`Dengan memohon ridho serta rahmat Allah Subhanahu Wa Ta’ala, Kami bermaksud mengundang Bapak/Ibu/Saudara(i), untuk menghadiri Resepsi Pernikahan`}
            </motion.p>
          </div>
          <div className="space-y-8">
            {couple.groom && (
              <div className="flex flex-col items-center justify-center gap-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="px-8"
                >
                  <img
                    src={couple.groom.photo}
                    alt={couple.groom.name}
                    className="aspect-9/16 w-full rounded-lg object-cover"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="w-full max-w-110 space-y-1 rounded-lg bg-[#e3c3b1] p-4 text-center text-[#4a1325]"
                >
                  <p className="font-tangerine text-4xl font-bold">
                    {couple.groom.name}
                  </p>
                  <p className="">{couple.groom.title} dari</p>
                  <p className="font-semibold">{couple.groom.parent}</p>
                </motion.div>
              </div>
            )}
            {couple.bride && (
              <>
                <motion.p
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="font-tangerine text-8xl leading-[100%] font-bold"
                >
                  &
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="flex flex-col items-center justify-center gap-8"
                >
                  <div className="px-8">
                    <img
                      src={couple.bride.photo}
                      alt={couple.bride.name}
                      className="aspect-9/16 w-full rounded-lg object-cover"
                    />
                  </div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-110 space-y-1 rounded-lg bg-[#e3c3b1] p-4 text-center text-[#4a1325]"
                  >
                    <p className="font-tangerine text-4xl font-bold">
                      {couple.bride.name}
                    </p>
                    <p className="">{couple.bride.title} dari</p>
                    <p className="font-semibold">{couple.bride.parent}</p>
                  </motion.div>
                </motion.div>
              </>
            )}
          </div>
        </section>
        <section className="space-y-8 bg-[#e3c3b1] px-6 py-20 text-center text-[#4a1325] sm:px-16">
          <div>
            <motion.h1
              initial={{ opacity: 0, transform: "translateY(50px)" }}
              whileInView={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.8 }}
              className="font-tangerine text-7xl"
            >
              Save The Date
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, transform: "translateY(50px)" }}
              whileInView={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >{`Yang InsyaAllah akan dilaksanakan pada`}</motion.p>
          </div>
          {sortedEvent.map((event) => (
            <motion.div
              key={event.name}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ margin: "0px 0px -200px 0px" }}
              className="space-y-4 border border-[#4a1325] bg-[#4a132518] p-6"
            >
              <h1 className="font-tangerine text-5xl font-bold">
                {event.name}
              </h1>
              <div className="">
                <p className="font-bold">
                  {dayjs(event.dateFrom).format("dddd, DD MMMM YYYY")}
                </p>
                <p>{`Pukul ${dayjs(event.dateFrom).format("HH:mm")} WIB${event.dateTo ? ` - ${dayjs(event.dateTo).format("HH:mm")}  WIB` : " - Selesai"}`}</p>
                <p>{event.location}</p>
              </div>
              <div className="flex justify-center">
                <a
                  href={event.locationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex h-9 items-center justify-center gap-2 overflow-hidden rounded-md bg-amber-50 px-6 font-medium shadow"
                >
                  <MapPin size={18} />
                  Lokasi Acara
                  <div className="absolute bottom-0 left-0 aspect-square w-full translate-y-full rounded-4xl bg-amber-500/20 transition-transform group-hover:translate-y-[50%]"></div>
                </a>
              </div>
            </motion.div>
          ))}
        </section>
        <section className="flex justify-center space-y-14 bg-[#4a1325] px-6 py-20 text-center text-[#e3c3b1]">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md overflow-hidden rounded-lg"
          >
            <img
              src="/akin-nafisah/DSC06209.webp"
              alt="akin-nafisah"
              className="aspect-9/16 w-full object-cover"
            />
            <div className="bg-[#e3c3b1] py-6 text-[#4a1325]">
              <motion.h1
                initial={{ opacity: 0, transform: "translateY(50px)" }}
                whileInView={{ opacity: 1, transform: "translateY(0px)" }}
                transition={{ duration: 0.6 }}
                className="font-tangerine text-6xl"
              >
                Counting Days
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, transform: "translateY(50px)" }}
                whileInView={{ opacity: 1, transform: "translateY(0px)" }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <AnimatedNumberCountdown
                  endDate={new Date("2025-11-23T00:00:00.000Z")}
                />
              </motion.div>
            </div>
          </motion.div>
        </section>
        <section className="space-y-8 bg-[#e3c3b1] px-6 py-20 text-center text-[#4a1325]">
          <motion.h1
            initial={{ opacity: 0, transform: "translateY(50px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.6 }}
            className="font-tangerine text-7xl"
          >
            Love Story
          </motion.h1>
          <div className="space-y-6">
            {loveStory.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="space-y-2 rounded-lg bg-[#4a1325] p-6 text-start text-[#e3c3b1]"
              >
                <h3 className="text-xl font-bold">{story.title}</h3>
                <p>{story.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
        <section className="relative flex h-180 items-center justify-center overflow-hidden bg-[#e3c3b1] py-20 text-center text-[#4a1325]">
          <img
            src="/gate.svg"
            alt="Gate"
            className="h-260 object-cover object-top"
          />
          <div className="absolute inset-0 mt-20 flex flex-col items-center justify-center gap-8">
            <motion.h1
              initial={{ opacity: 0, transform: "translateY(50px)" }}
              whileInView={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.8 }}
              className="font-quintessential text-6xl font-bold"
            >
              GIFTS
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, transform: "translateY(50px)" }}
              whileInView={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-96"
            >{`Terima kasih telah mengisi kebahagiaan dan kegembiraan di pernikahan kami dengan kehadiran dan hadiah indah Anda.`}</motion.p>
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex items-center gap-4 rounded-md bg-white px-4 py-2"
              >
                <img src="/bank/bca.svg" alt="bca" className="w-20" />
                <div className="text-start">
                  <p className="font-semibold">2380962317</p>
                  <p className="font-extralight">
                    A/N Muhammad Khoirul Fatikin
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="flex items-center gap-4 rounded-md bg-white px-4 py-2"
              >
                <img src="/bank/bsi.png" alt="bsi" className="w-20" />
                <div className="text-start">
                  <p className="font-semibold">1020302093</p>
                  <p className="font-extralight">A/N Nafisah</p>
                </div>
              </motion.div>
            </div>
            <motion.a
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              href={`https://api.whatsapp.com/send/?phone=${searchParams.contact}&text=Hai%2C%20Aku%20udah%20transfer%20ke%20kamu%20nih.%20Samawa%20ya%2C%20semoga%20dilancarkan%20sampai%20hari%20H.`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-9 items-center justify-center gap-2 overflow-hidden rounded-md bg-[#4a1325] px-6 font-medium text-[#e3c3b1] shadow"
            >
              Konfirmasi Transfer
              <div className="absolute bottom-0 left-0 aspect-square w-full translate-y-full rounded-4xl bg-amber-500/20 transition-transform group-hover:translate-y-[50%]"></div>
            </motion.a>
          </div>
        </section>
        <section className="space-y-4 border-t-80 border-[#4a1325] bg-[#e3c3b1] px-6 py-20 text-center text-[#4a1325]">
          <motion.h1
            initial={{ opacity: 0, transform: "translateY(50px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.8 }}
            className="font-tangerine text-7xl"
          >
            Comment
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 rounded-lg bg-[rgba(74,19,37,0.05)] py-8"
          >
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="px-4 text-start"
            >
              <FieldGroup>
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="name">Nama</FieldLabel>
                      <Input
                        {...field}
                        id="name"
                        aria-invalid={fieldState.invalid}
                        placeholder="Masukkan nama kamu"
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                        className="rounded-sm bg-white"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="message"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="message">Pesan</FieldLabel>
                      <InputGroup className="rounded-sm bg-white">
                        <InputGroupTextarea
                          {...field}
                          id="message"
                          placeholder="Sampaikan pesanmu untuk kedua mempelai pengantin"
                          rows={6}
                          className="min-h-24 resize-none"
                          aria-invalid={fieldState.invalid}
                        />
                        <InputGroupAddon align="block-end">
                          <InputGroupText
                            className={cn(
                              "tabular-nums",
                              fieldState.invalid && "text-destructive"
                            )}
                          >
                            {field.value.length}/500 Karakter
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Field orientation="horizontal">
                  <button
                    type="submit"
                    className="group relative flex h-9 w-full items-center justify-center gap-2 overflow-hidden rounded-md bg-[#4a1325] px-6 font-medium text-[#e3c3b1] shadow"
                  >
                    Kirim
                    <Send size={16} />
                    <div className="absolute bottom-0 left-0 aspect-square w-full translate-y-full rounded-4xl bg-amber-500/20 transition-transform group-hover:translate-y-[50%]"></div>
                  </button>
                </Field>
              </FieldGroup>
            </form>
            <div className="flex flex-col items-center gap-4 px-4">
              <HashLoader size={40} color="#4a1325" />
              {comments.map((comment, index) => (
                <div
                  key={index}
                  className="flex gap-2 rounded-md bg-white p-2 text-start"
                >
                  <div className="flex size-10 flex-none items-center justify-center rounded-full bg-gray-200">
                    {comment.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{comment.author}</p>
                    <p>{comment.message}</p>
                    <p className="text-sm font-extralight">{comment.time}</p>
                  </div>
                </div>
              ))}
              <BasicPagination
                totalPages={totalPages}
                initialPage={initialPage}
                onPageChange={(page) => console.log(page)}
              />
            </div>
          </motion.div>
        </section>
        <section className="relative flex h-screen flex-col items-center justify-start gap-8 overflow-hidden bg-[#e3c3b1] px-6 py-14 text-center text-[#4a1325]">
          <div className="absolute inset-x-0 bottom-0 z-10 h-3/4 bg-gradient-to-t from-[#4a1325cc] to-[#4a13250]"></div>
          <img
            src="/akin-nafisah/DSC06187.webp"
            alt=""
            className="absolute top-0 h-full w-full scale-150 object-cover object-[50%_20%]"
          />
          <div className="flex flex-col items-center justify-start gap-4">
            <motion.h1
              initial={{ opacity: 0, transform: "translateY(50px)" }}
              whileInView={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.8 }}
              className="font-quintessential text-5xl font-bold"
            >
              Terima Kasih
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, transform: "translateY(50px)" }}
              whileInView={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-96"
            >{`Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan do'a restu kepada kami.`}</motion.p>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <motion.h1
              initial={{ opacity: 0, transform: "translateY(50px)" }}
              whileInView={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.8 }}
              className="font-quintessential text-2xl font-bold"
            >
              Kami Yang Berbahagia
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, transform: "translateY(50px)" }}
              whileInView={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.8 }}
              className="font-tangerine text-5xl font-bold"
            >
              Akin & Nafisah
            </motion.h1>
          </div>
          <div className="absolute inset-x-0 bottom-10 z-20 flex flex-col items-center justify-center gap-2 text-white">
            <motion.p
              initial={{ opacity: 0, transform: "translateY(50px)" }}
              whileInView={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.5 }}
              className="text-xs"
            >
              Made With ❤️ by:
            </motion.p>
            <a
              href="https://sakaloka.id"
              target="_blank"
              rel="noreferrer"
              title="Sakaloka"
              className="block text-start"
            >
              <div className="flex items-center gap-2 tracking-tighter font-stretch-ultra-condensed">
                <motion.div
                  initial={{ scale: 0.8, rotate: -5000 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    bounce: 500,
                    stiffness: 200,
                    duration: 0.5,
                  }}
                >
                  <SakalokaLogo />
                </motion.div>
                <motion.div
                  initial={{ maxWidth: 0, maxHeight: 0, opacity: 0 }}
                  whileInView={{ maxWidth: 2, maxHeight: 40, opacity: 1 }}
                  transition={{
                    type: "spring",
                    bounce: 500,
                    stiffness: 200,
                    delay: 1,
                  }}
                  className="z-20 h-10 w-0.5 bg-[#f0b400]"
                />
                <div className="flex flex-col justify-center">
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      type: "spring",
                      bounce: 500,
                      stiffness: 200,
                      delay: 1.5,
                    }}
                    className="z-10 text-lg leading-[100%] font-semibold text-[#f0b400]"
                  >
                    SAKALOKA
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: -5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      type: "spring",
                      bounce: 500,
                      stiffness: 200,
                      delay: 1.8,
                    }}
                    className="font-lora text-[10px] leading-[100%] text-white"
                  >
                    DIGITAL
                  </motion.span>
                </div>
              </div>
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}

export default InvitationPage
