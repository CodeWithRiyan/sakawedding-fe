import AnimatedNumberCountdown from "@/components/custom/animated-number-countdown"
import dayjs from "dayjs"
import { MapPin } from "lucide-react"
import { motion } from "motion/react"
import queryString from "query-string"
import { useLocation, useParams } from "react-router"

function InvitationPage() {
  const params = useParams()
  const location = useLocation()
  const searchParams = queryString.parse(location.search) as {
    [key: string]: string
  }
  const name = params.name
  console.log("name", name)

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

  return (
    <div className="flex w-full flex-col font-funnel lg:flex-row">
      <div className="relative top-0 flex h-screen flex-1 flex-col items-center justify-center gap-4 text-center lg:sticky">
        <div className="absolute inset-x-0 bottom-40 mt-60 flex flex-col items-center justify-center gap-4 text-center">
          <div className="space-y-2 font-tangerine font-bold text-white text-shadow-lg">
            <h2 className="text-[8vw] leading-[100%] font-bold md:text-5xl">
              Wedding Invitation
            </h2>
            <h1 className="text-[10vw] leading-[100%] font-bold md:text-7xl">
              Akin & Nafisah
            </h1>
          </div>
          <div className="min-w-80 space-y-1 rounded-lg bg-white p-4 text-[#4a1325]">
            <p>Kepada Yth.</p>
            <p className="font-bold capitalize">{searchParams.to}</p>
            <p>Di Tempat</p>
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
      <div className="w-full max-w-none flex-none lg:max-w-xl">
        <section className="flex min-h-screen items-center justify-center bg-[#4a1325]">
          <div className="space-y-4 text-center text-[#e3c3b1]">
            <motion.p
              initial={{ opacity: 0, transform: "translateY(-50px)" }}
              whileInView={{ opacity: 1, transform: "translateY(0)" }}
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
              whileInView={{ opacity: 1, transform: "translateY(0)" }}
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
              whileInView={{ opacity: 1, transform: "translateY(0)" }}
              transition={{ duration: 0.8 }}
              className="font-tangerine text-7xl"
            >
              Couple
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, transform: "translateY(50px)" }}
              whileInView={{ opacity: 1, transform: "translateY(0)" }}
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
              whileInView={{ opacity: 1, transform: "translateY(0)" }}
              transition={{ duration: 0.8 }}
              className="font-tangerine text-7xl"
            >
              Save The Date
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, transform: "translateY(50px)" }}
              whileInView={{ opacity: 1, transform: "translateY(0)" }}
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
          <div className="w-full max-w-md overflow-hidden rounded-lg">
            <img
              src="/akin-nafisah/DSC06209.webp"
              alt="akin-nafisah"
              className="aspect-9/16 w-full object-cover"
            />
            <div className="bg-[#e3c3b1] py-6 text-[#4a1325]">
              <motion.h1
                initial={{ opacity: 0, transform: "translateY(50px)" }}
                whileInView={{ opacity: 1, transform: "translateY(0)" }}
                transition={{ duration: 0.6 }}
                className="font-tangerine text-6xl"
              >
                Counting Days
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, transform: "translateY(50px)" }}
                whileInView={{ opacity: 1, transform: "translateY(0)" }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <AnimatedNumberCountdown
                  endDate={new Date("2025-11-23T00:00:00.000Z")}
                />
              </motion.div>
            </div>
          </div>
        </section>
        <section className="space-y-8 bg-[#e3c3b1] px-6 py-20 text-center text-[#4a1325]">
          <motion.h1
            initial={{ opacity: 0, transform: "translateY(50px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0)" }}
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
              whileInView={{ opacity: 1, transform: "translateY(0)" }}
              transition={{ duration: 0.8 }}
              className="font-quintessential text-6xl font-bold"
            >
              GIFTS
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, transform: "translateY(50px)" }}
              whileInView={{ opacity: 1, transform: "translateY(0)" }}
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
                  <p className="font-semibold">XXXXXXXXXX</p>
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
                  <p className="font-semibold">XXXXXXXXXX</p>
                  <p className="font-extralight">A/N Nafisah</p>
                </div>
              </motion.div>
            </div>
            <motion.a
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              href="https://api.whatsapp.com/send/?phone=%2B628562770604&text=Hai%2C%20Aku%20udah%20transfer%20ke%20kamu%20nih.%20Samawa%20ya%2C%20semoga%20dilancarkan%20sampai%20hari%20H."
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-9 items-center justify-center gap-2 overflow-hidden rounded-md bg-[#4a1325] px-6 font-medium text-[#e3c3b1] shadow"
            >
              Konfirmasi Tranfer
              <div className="absolute bottom-0 left-0 aspect-square w-full translate-y-full rounded-4xl bg-amber-500/20 transition-transform group-hover:translate-y-[50%]"></div>
            </motion.a>
          </div>
        </section>
        <section className="flex justify-center space-y-8 border-t-80 border-[#4a1325] bg-[#e3c3b1] px-6 py-20 text-center text-[#e3c3b1]"></section>
      </div>
    </div>
  )
}

export default InvitationPage
