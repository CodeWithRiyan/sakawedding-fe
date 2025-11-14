"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

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
import queryString from "query-string"
import { useState } from "react"
import { Helmet } from "react-helmet"

const eventFor = [
  { label: "Mempelai Laki-laki", value: "groom" },
  { label: "Mempelai Perempuan", value: "bride" },
  { label: "Kedua Mempelai", value: "all" },
] as const

const formSchema = z.object({
  slug: z.string().min(1, "Slug wajib diisi."),
  event: z.string(),
  contact: z.string().min(1, "No Whatsapp wajib diisi."),
  to: z.string().min(1, "Nama Penerima wajib diisi."),
})

export default function ShareLinkPage() {
  const [url, setUrl] = useState("")
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      slug: "akin-nafisah",
      event: "all",
      contact: "",
      to: "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    const slug = encodeURIComponent(data.slug.toLowerCase())

    setUrl(
      `https://wedding.sakaloka.id/invitation/${slug}?${queryString.stringify({
        to: data.to,
        event: data.event || undefined,
      })}&contact=${data.contact}`
    )
  }

  return (
    <>
      <Helmet>
        <title>Buat Undangan Pesan Whatsapp</title>
      </Helmet>
      <div className="grid min-h-screen w-full grid-cols-1 flex-col gap-4 bg-secondary p-4 font-funnel text-secondary-foreground md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Buat Undangan</CardTitle>
            <CardDescription>Buat undangan pesan whatsapp.</CardDescription>
          </CardHeader>
          <CardContent>
            <form id="form-rhf-select" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <Controller
                  name="slug"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="slug">Slug</FieldLabel>
                      <Input
                        {...field}
                        id="slug"
                        aria-invalid={fieldState.invalid}
                        placeholder="Masukkan slug (contoh: akin-nafisah)"
                        disabled
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
                  name="event"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      orientation="vertical"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldContent>
                        <FieldLabel htmlFor="form-rhf-select-event">
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
                          id="form-rhf-select-event"
                          aria-invalid={fieldState.invalid}
                          className="min-w-[120px]"
                        >
                          <SelectValue placeholder="Pilih" />
                        </SelectTrigger>
                        <SelectContent position="item-aligned">
                          {eventFor.map((language) => (
                            <SelectItem
                              key={language.value}
                              value={language.value}
                            >
                              {language.label}
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
                        {`No Whatsapp (Untuk Konfirmasi TF)`}
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
              </FieldGroup>
            </form>
          </CardContent>
          <CardFooter>
            <Field orientation="horizontal">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
              >
                Reset
              </Button>
              <Button type="submit" form="form-rhf-select">
                Generate
              </Button>
            </Field>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Hasil Generate</CardTitle>
            <CardDescription>
              Hasil generate undangan pesan whatsapp.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {form.formState.isSubmitSuccessful && (
              <div className="rounded-md bg-gray-100 p-4 font-mono text-sm wrap-break-word whitespace-pre-wrap">
                {`Kepada Yth.
  Bapak/Ibu/Saudara/i
  *${form.getValues("to")}*

  ___________________

  *Assalamu'alaikum Warahmatullahi Wabarakatuh*

  Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i, teman sekaligus sahabat, untuk menghadiri acara pernikahan kami.

  Berikut link undangan kami, untuk info selengkapnya bisa dilihat melalui:

  ${url}

  Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu.

  *Wassalamu'alaikum Warahmatullahi Wabarakatuh*

  Terima Kasih

  Kami yang berbahagia,
  *Akin & Nafisah*

  __________________`}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
