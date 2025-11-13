import dayjs from "dayjs"
import { MapPin } from "lucide-react"
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
      title: "Putra pertama",
      parent: "Bpk. H. Timur Rustamadji Achmad (alm) & Ibu Hj. Nurul Suhaevah",
    },
    bride: {
      name: "Nafisah",
      photo: "/akin-nafisah/DSC06154.webp",
      title: "Putri pertama",
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
          <div className="min-w-80 space-y-1 rounded-lg bg-white p-4">
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
            <p className="text-lg font-extralight">The Wedding Of</p>
            <div className="flex flex-col items-center justify-center font-tangerine text-8xl font-bold">
              <span>Akin</span>
              <span> & </span>
              <span>Nafisah</span>
            </div>
            <p className="text-lg font-extralight">Ahad, 23 November 2025</p>
          </div>
        </section>
        <section className="space-y-4 bg-[#e3c3b1] p-6">
          <div className="w-full space-y-4 rounded-lg bg-[#4a1325] p-4 pb-8 text-center text-balance text-[#e3c3b1]">
            <div className="flex justify-center">
              <img src="/dove.png" alt="dove" className="w-60" />
            </div>
            <div className="space-y-2">
              <p className="font-extralight">
                {`"Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."`}
              </p>
              <p className="font-semibold">{`(Ar-Rum: 21)`}</p>
            </div>
          </div>
          <div className="aspect-9/16 w-full overflow-hidden rounded-lg pr-14 pb-32">
            <img
              src="/akin-nafisah/DSC06161.webp"
              alt="akin-nafisah"
              className="h-full scale-150 object-cover object-bottom-right"
            />
          </div>
        </section>
        <section className="space-y-14 bg-[#4a1325] px-6 py-20 text-center text-[#e3c3b1]">
          <div>
            <h1 className="font-tangerine text-7xl">Couple</h1>
            <p>{`Dengan memohon ridho serta rahmat Allah Subhanahu Wa Ta’ala, Kami bermaksud mengundang Bapak/Ibu/Saudara(i), untuk menghadiri Resepsi Pernikahan`}</p>
          </div>
          <div className="space-y-8">
            {couple.groom && (
              <div className="flex flex-col items-center justify-center gap-8">
                <div className="px-8">
                  <img
                    src={couple.groom.photo}
                    alt={couple.groom.name}
                    className="aspect-9/16 w-full rounded-lg object-cover"
                  />
                </div>
                <div className="w-full max-w-110 space-y-1 rounded-lg bg-[#e3c3b1] p-4 text-center text-[#4a1325]">
                  <p className="font-tangerine text-4xl font-bold">
                    {couple.groom.name}
                  </p>
                  <p className="">{couple.groom.title} dari</p>
                  <p className="font-semibold">{couple.groom.parent}</p>
                </div>
              </div>
            )}
            {couple.bride && (
              <>
                <p className="font-tangerine text-8xl leading-[100%] font-bold">
                  &
                </p>
                <div className="flex flex-col items-center justify-center gap-8">
                  <div className="px-8">
                    <img
                      src={couple.bride.photo}
                      alt={couple.bride.name}
                      className="aspect-9/16 w-full rounded-lg object-cover"
                    />
                  </div>
                  <div className="w-full max-w-110 space-y-1 rounded-lg bg-[#e3c3b1] p-4 text-center text-[#4a1325]">
                    <p className="font-tangerine text-4xl font-bold">
                      {couple.bride.name}
                    </p>
                    <p className="">{couple.bride.title} dari</p>
                    <p className="font-semibold">{couple.bride.parent}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
        <section className="space-y-8 bg-[#e3c3b1] px-6 py-20 text-center text-[#4a1325] sm:px-16">
          <div>
            <h1 className="font-tangerine text-7xl">Save The Date</h1>
            <p>{`Yang InsyaAllah akan dilaksanakan pada`}</p>
          </div>
          {sortedEvent.map((event) => (
            <div
              key={event.name}
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
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}

export default InvitationPage
