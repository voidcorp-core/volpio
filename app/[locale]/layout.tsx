import type { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import Script from "next/script"

import VolpioLogotype from "@/assets/Volpio_logotype.svg"
import { Toaster } from "@/components/ui/sonner"
import { locales } from "@/i18n/request"

import "styles/tailwind.css"

export function generateStaticParams() {
  // With localePrefix: "as-needed", the default locale (fr) is rendered at the root
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "metadata" })

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001"),
    title: t("title"),
    description: t("description"),
    icons: {
      icon: VolpioLogotype.src,
      apple: VolpioLogotype.src,
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      images: [VolpioLogotype.src],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [VolpioLogotype.src],
    },
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale)

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body>
        <Script
          src="https://umami.voidcorp.io/u.js"
          data-website-id="a43fb404-4a93-4a3b-8523-b493c1e7094c"
          strategy="afterInteractive"
        />
        <NextIntlClientProvider messages={messages}>
          {children}
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
