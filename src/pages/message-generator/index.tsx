import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { invitationService, type Invitation } from "@/services/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, Copy } from "lucide-react"
import queryString from "query-string"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useParams } from "react-router"
import { HashLoader } from "react-spinners"
import * as z from "zod"

const eventFor = [
  { label: "Kedua Mempelai", value: "all" },
  { label: "Mempelai Laki-laki", value: "groom" },
  { label: "Mempelai Perempuan", value: "bride" },
] as const

const formSchema = z.object({
  to: z.string().min(1, "Nama penerima wajib diisi."),
  event: z.string(),
  contact: z.string().min(1, "No Whatsapp wajib diisi."),
})

function MessageGeneratorPage() {
  const { name } = useParams()
  const [invitation, setInvitation] = useState<Invitation | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<boolean>(false)
  const [generatedMessage, setGeneratedMessage] = useState<string>("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      to: "",
      event: "all",
      contact: "",
    },
  })

  // Fetch invitation data
  useEffect(() => {
    const fetchInvitation = async () => {
      if (!name) return

      try {
        setLoading(true)
        const data = await invitationService.getByName(name)
        setInvitation(data)
      } catch (err) {
        setError("Failed to load invitation data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchInvitation()
  }, [name])

  // Generate message on form submit
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (!invitation || !name) return

    const baseUrl = window.location.origin
    const url = `${baseUrl}/invitation/${name}?${queryString.stringify({
      to: data.to,
      event: data.event !== "all" ? data.event : undefined,
      contact: data.contact,
    })}`

    const groomName = "Akin"
    const brideName = invitation.couple.bride.name.split(" ")[0]

    const message = `Kepada Yth.
Bapak/Ibu/Saudara/i
*${data.to}*

___________________

*Assalamu'alaikum Warahmatullahi Wabarakatuh*

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i, teman sekaligus sahabat, untuk menghadiri acara pernikahan kami.

Berikut link undangan kami, untuk info selengkapnya bisa dilihat melalui:

${url}

Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu.

*Wassalamu'alaikum Warahmatullahi Wabarakatuh*

Terima Kasih

Kami yang berbahagia,
*${groomName} & ${brideName}*

__________________`

    setGeneratedMessage(message)
  }

  const handleCopyMessage = async () => {
    if (!generatedMessage) return

    try {
      await navigator.clipboard.writeText(generatedMessage)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
      alert("Failed to copy message")
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <HashLoader size={60} color="#4a1325" />
      </div>
    )
  }

  if (error || !invitation) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-500">{error || "Invitation not found"}</p>
      </div>
    )
  }

  const groomName = invitation.couple.groom.name.split(" ")[0]
  const brideName = invitation.couple.bride.name.split(" ")[0]

  return (
    <div className="grid min-h-screen w-full grid-cols-1 gap-4 bg-secondary p-4 font-funnel text-secondary-foreground md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Buat Undangan</CardTitle>
          <CardDescription>
            Buat pesan undangan WhatsApp untuk {groomName} & {brideName}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="form-message-generator"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FieldGroup>
              <Controller
                name="to"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="to">Nama Penerima</FieldLabel>
                    <Input
                      {...field}
                      id="to"
                      aria-invalid={fieldState.invalid}
                      placeholder="Masukkan nama penerima"
                      autoComplete="name"
                      className="rounded-sm bg-white"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="event"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    orientation="vertical"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldContent>
                      <FieldLabel htmlFor="form-message-generator-event">
                        Untuk Acara
                      </FieldLabel>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id="form-message-generator-event"
                        aria-invalid={fieldState.invalid}
                        className="min-w-[120px]"
                      >
                        <SelectValue placeholder="Pilih" />
                      </SelectTrigger>
                      <SelectContent position="item-aligned">
                        {eventFor.map((event) => (
                          <SelectItem key={event.value} value={event.value}>
                            {event.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />

              <Controller
                name="contact"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="contact">
                      No WhatsApp Mempelai Pengantin
                    </FieldLabel>
                    <Input
                      {...field}
                      id="contact"
                      aria-invalid={fieldState.invalid}
                      placeholder="Masukkan no whatsapp (contoh: 081234567890)"
                      autoComplete="mobile tel"
                      className="rounded-sm bg-white"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                form.reset()
                setGeneratedMessage("")
              }}
            >
              Reset
            </Button>
            <Button type="submit" form="form-message-generator">
              Generate
            </Button>
          </Field>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Hasil Generate</CardTitle>
              <CardDescription>
                Hasil generate undangan pesan whatsapp.
              </CardDescription>
            </div>
            {generatedMessage && (
              <button
                onClick={handleCopyMessage}
                className="flex items-center gap-2 rounded-md bg-[#4a1325] px-4 py-2 text-sm text-white transition-colors hover:bg-[#5a1835]"
              >
                {copied ? (
                  <>
                    <Check size={16} />
                    Tersalin!
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    Salin
                  </>
                )}
              </button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {form.formState.isSubmitSuccessful && generatedMessage ? (
            <div className="rounded-md bg-gray-100 p-4 font-mono text-sm break-words whitespace-pre-wrap">
              {generatedMessage}
            </div>
          ) : (
            <div className="rounded-md border-2 border-dashed border-gray-300 p-8 text-center text-gray-500">
              <p>Isi form dan klik Generate untuk membuat pesan undangan</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default MessageGeneratorPage
