"use client"

import { ArrowRight, Database, Layers, Zap } from "lucide-react"
import { motion, useScroll, useTransform } from "motion/react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import React, { useEffect } from "react"
import { toast } from "sonner"

import { AnimatedGradientBg } from "@/components/AnimatedGradientBg"
import { CapabilityCard } from "@/components/CapabilityCard"
import { EcosystemOrbit } from "@/components/EcosystemOrbit"
import { FlowVisualization } from "@/components/FlowVisualization"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { Button } from "@/components/ui/button"
import { VolpioLogo } from "@/components/VolpioLogo"
import VolpioLogoHorWhite from "@/assets/Volpio_logo-hor-white.svg"

const CONTACT_EMAIL = "florent.pellegrin@volpio.com"

export default function App() {
  const t = useTranslations()
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])

  const handleContactClick = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(CONTACT_EMAIL)
        .then(() => toast.success(t("cta.emailCopied")))
        .catch(() => {})
    }
  }

  useEffect(() => {
    // Add Google Fonts
    const link = document.createElement("link")
    link.href =
      "https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@700;900&family=IBM+Plex+Sans:wght@400;500;600&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)
  }, [])

  return (
    <div
      className="min-h-screen overflow-hidden bg-[#0a0a0f] text-white"
      style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
    >
      <LanguageSwitcher />
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <AnimatedGradientBg />

        <motion.div className="relative z-10 mx-auto max-w-5xl px-6 text-center" style={{ opacity, scale }}>
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <VolpioLogo className="mx-auto h-64 w-64" />
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-4"
            style={{
              fontFamily: "'Montserrat Alternates', sans-serif",
              fontSize: "3rem",
              fontWeight: 700,
            }}
          >
            {t("hero.headline")}
          </motion.h2>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mx-auto mb-6 max-w-2xl text-white/70"
            style={{ fontSize: "1.25rem" }}
          >
            {t("hero.subline")}
          </motion.p>

          {/* Tag */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="inline-block rounded-full border border-white/20 bg-white/5 px-4 py-2 backdrop-blur-sm"
          >
            <span className="text-sm text-white/60">
              {t("hero.voidcorp")}{" "}
              <a
                href="https://voidcorp.io"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white/80"
              >
                Void Corp
              </a>
            </span>
          </motion.div>
        </motion.div>

        {/* Scroll indicator - moved outside of motion.div */}
        <motion.div
          className="absolute bottom-12 left-1/2 z-20 -translate-x-1/2 transform"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/30 p-2">
            <motion.div
              className="h-1.5 w-1.5 rounded-full bg-white"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* About / Philosophy Section */}
      <section className="relative px-6 py-32">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="leading-relaxed text-white/80" style={{ fontSize: "1.5rem" }}>
              {t("about.intro")}
              <br />
              <span className="text-white">{t("about.highlight")}</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Capabilities Section */}
      <section className="relative bg-gradient-to-b from-transparent via-purple-950/10 to-transparent px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
            style={{
              fontFamily: "'Montserrat Alternates', sans-serif",
              fontSize: "2.5rem",
              fontWeight: 700,
            }}
          >
            {t("services.title")}
          </motion.h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <CapabilityCard
              icon={Zap}
              title={t("services.react.title")}
              description={t("services.react.description")}
              delay={0}
            />
            <CapabilityCard
              icon={Database}
              title={t("services.automation.title")}
              description={t("services.automation.description")}
              delay={0.2}
            />
            <CapabilityCard
              icon={Layers}
              title={t("services.audit.title")}
              description={t("services.audit.description")}
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* The Flow Section */}
      <section className="relative px-6 py-32">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-center"
            style={{
              fontFamily: "'Montserrat Alternates', sans-serif",
              fontSize: "2.5rem",
              fontWeight: 700,
            }}
          >
            {t("process.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-16 text-center text-white/60"
          >
            {t("process.subtitle")}
          </motion.p>

          <FlowVisualization />
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="relative bg-gradient-to-b from-transparent via-orange-950/10 to-transparent px-6 py-32">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-center"
            style={{
              fontFamily: "'Montserrat Alternates', sans-serif",
              fontSize: "2.5rem",
              fontWeight: 700,
            }}
          >
            {t("ecosystem.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-16 text-center text-white/60"
          >
            {t("ecosystem.subtitle")}
          </motion.p>

          <EcosystemOrbit />
        </div>
      </section>

      {/* Showcase Section */}
      <section className="relative px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
            style={{
              fontFamily: "'Montserrat Alternates', sans-serif",
              fontSize: "2.5rem",
              fontWeight: 700,
            }}
          >
            {t("projects.title")}
          </motion.h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                image:
                  "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
                title: t("projects.items.banking.title"),
                category: t("projects.items.banking.category"),
                metric: t("projects.items.banking.metric"),
              },
              {
                image:
                  "https://images.unsplash.com/photo-1563013544-824ae1b704d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
                title: t("projects.items.validation.title"),
                category: t("projects.items.validation.category"),
                metric: t("projects.items.validation.metric"),
              },
              {
                image:
                  "https://images.unsplash.com/photo-1626785774573-4b799315345d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
                title: t("projects.items.video.title"),
                category: t("projects.items.video.category"),
                metric: t("projects.items.video.metric"),
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                className="group relative overflow-hidden rounded-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover blur-sm filter transition-all duration-500 group-hover:scale-110 group-hover:blur-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-100 transition-opacity duration-500 group-hover:opacity-60" />
                </div>

                <div className="absolute right-0 bottom-0 left-0 p-6">
                  <div className="mb-1 text-xs text-orange-400">{project.category}</div>
                  <h3 className="mb-1 text-white">{project.title}</h3>
                  <div className="text-sm text-white/60">{project.metric}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / CTA Section */}
      <section className="relative px-6 py-32">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="mb-8"
              style={{
                fontFamily: "'Montserrat Alternates', sans-serif",
                fontSize: "2.5rem",
                fontWeight: 700,
              }}
            >
              {t("cta.title")}
            </h2>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                className="rounded-full border-0 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 px-8 py-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,107,53,0.5)]"
                style={{ fontSize: "1.125rem" }}
              >
                <a href={`mailto:${CONTACT_EMAIL}`} onClick={handleContactClick}>
                  {t("cta.button")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <Image src={VolpioLogoHorWhite} alt="Volpio" className="h-8 w-auto" />
              <span className="text-white/60">{t("footer.copyright")}</span>
            </div>
            <div className="text-white/40">{t("footer.location")}</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
