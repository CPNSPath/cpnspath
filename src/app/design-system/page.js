"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Input from "@/components/ui/Input";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

/* ── icons ── */
const IconSearch = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
);
const IconArrow = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

/* ── palette data — [step, hex, darkText] ── */
const primaryScale = [
  ["50",  "#EFF6FF", false], ["100", "#DBEAFE", false], ["200", "#BFDBFE", false],
  ["300", "#93C5FD", false], ["400", "#60A5FA", false], ["500", "#3B82F6", true],
  ["600", "#2563EB", true],  ["700", "#1D4ED8", true],  ["800", "#1E40AF", true],
  ["900", "#1E3A8A", true],  ["950", "#172554", true],
];
const accentScale = [
  ["50",  "#FFF7ED", false], ["100", "#FFEDD5", false], ["200", "#FED7AA", false],
  ["300", "#FDBA74", false], ["400", "#FB923C", false], ["500", "#F97316", false],
  ["600", "#EA580C", true],  ["700", "#C2410C", true],  ["800", "#9A3412", true],
  ["900", "#7C2D12", true],
];
const neutralScale = [
  ["50",  "#F8FAFC", false], ["100", "#F1F5F9", false], ["200", "#E2E8F0", false],
  ["300", "#CBD5E1", false], ["400", "#94A3B8", false], ["500", "#64748B", true],
  ["600", "#475569", true],  ["700", "#334155", true],  ["800", "#1E293B", true],
  ["900", "#0F172A", true],
];
const semanticScale = [
  { label: "Success",    hex: "#059669", bg: "#D1FAE5", darkBg: false },
  { label: "Warning",    hex: "#D97706", bg: "#FEF3C7", darkBg: false },
  { label: "Error",      hex: "#DC2626", bg: "#FEE2E2", darkBg: false },
  { label: "Info",       hex: "#2563EB", bg: "#DBEAFE", darkBg: false },
];

const spacingScale = [
  { step: 1, px: 4 }, { step: 2, px: 8 },  { step: 3, px: 12 }, { step: 4, px: 16 },
  { step: 5, px: 20 },{ step: 6, px: 24 }, { step: 8, px: 32 }, { step: 10, px: 40 },
  { step: 12, px: 48 },{ step: 16, px: 64 },{ step: 20, px: 80 },{ step: 24, px: 96 },
];

/* ── color card ── */
function ColorCard({ step, hex, dark }) {
  const text    = dark ? "rgba(255,255,255,0.95)" : "#0F172A";
  const subtext = dark ? "rgba(255,255,255,0.6)"  : "#64748B";
  return (
    <div
      className="rounded-lg p-4 flex flex-col justify-between min-h-[72px]"
      style={{ backgroundColor: hex, border: "1px solid rgba(0,0,0,0.08)" }}
    >
      <span style={{ color: text, fontWeight: 600, fontSize: "13px", lineHeight: 1.2 }}>
        {step}
      </span>
      <span style={{ color: subtext, fontSize: "10px", fontFamily: "monospace", letterSpacing: "0.02em" }}>
        {hex}
      </span>
    </div>
  );
}

/* ── palette group ── */
function PaletteGroup({ label, scale }) {
  return (
    <div className="mb-10">
      <p className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8] mb-3">{label}</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
        {scale.map(([step, hex, dark]) => (
          <ColorCard key={step} step={step} hex={hex} dark={dark} />
        ))}
      </div>
    </div>
  );
}

/* ── section title ── */
function SectionTitle({ children }) {
  return (
    <div className="mb-8 pb-4 border-b-2 border-[#E2E8F0]">
      <h2
        className="text-2xl font-bold text-[#0F172A]"
        style={{ fontFamily: "var(--font-plus-jakarta, sans-serif)" }}
      >
        {children}
      </h2>
    </div>
  );
}

/* ── variant row ── */
function Row({ label, children }) {
  return (
    <div className="mb-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8] mb-3">{label}</p>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

/* ─────────────────────────────────────────── */

export default function DesignSystemPage() {
  const [inputVal, setInputVal] = useState("");
  const [inputErr, setInputErr] = useState("");

  function triggerError() {
    setInputErr(inputVal.trim() === "" ? "This field is required." : "");
  }

  return (
    /* override body's dark background scoped to this page only */
    <div style={{ backgroundColor: "#F8FAFC", minHeight: "100vh", overflowX: "hidden" }}>

      {/* ── HERO (dark section, bounded) ── */}
      <div style={{ backgroundColor: "#1E3A8A" }} className="py-14">
        <Container>
          <Badge variant="accent" className="mb-4">Design System Preview</Badge>
          <h1 className="heading-hero text-balance mb-4" style={{ color: "#ffffff" }}>
            CPNS Path UI Kit
          </h1>
          <p className="body-large max-w-xl" style={{ color: "#BFDBFE" }}>
            UWorld-style design system — Navy + Orange. Halaman ini dihapus setelah Tahap 4 selesai.
          </p>
        </Container>
      </div>

      {/* ── MAIN CONTENT ── */}
      <Container className="py-16">
        <div className="space-y-20">

          {/* COLOR PALETTE */}
          <section>
            <SectionTitle>Color Palette</SectionTitle>
            <PaletteGroup label="Primary — Navy Blue" scale={primaryScale} />
            <PaletteGroup label="Accent — Orange"     scale={accentScale} />
            <PaletteGroup label="Neutral — Slate"     scale={neutralScale} />

            <div className="mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8] mb-3">
                Semantic Colors
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {semanticScale.map(({ label, hex, bg }) => (
                  <div
                    key={label}
                    className="rounded-lg p-4 flex flex-col gap-2"
                    style={{ backgroundColor: bg, border: "1px solid rgba(0,0,0,0.08)" }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: hex }} />
                      <span className="text-sm font-semibold" style={{ color: hex }}>{label}</span>
                    </div>
                    <span className="text-[10px] font-mono" style={{ color: "#475569" }}>{hex}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* TYPOGRAPHY */}
          <section>
            <SectionTitle>Typography Scale</SectionTitle>
            <div className="space-y-6 overflow-x-auto">
              {[
                ["heading-hero", "Juara CPNS Bareng CPNS Path",    "clamp(2rem → 3.75rem) / 800"],
                ["heading-1",    "Latihan SKD & SKB Terlengkap",   "clamp(1.75rem → 2.5rem) / 700"],
                ["heading-2",    "Ribuan soal terverifikasi",       "clamp(1.5rem → 2rem) / 700"],
                ["heading-3",    "Analisis hasil mendalam",         "clamp(1.125rem → 1.5rem) / 600"],
              ].map(([cls, text, note]) => (
                <div key={cls} className="flex items-start gap-4 flex-wrap sm:flex-nowrap">
                  <div className="shrink-0 w-40">
                    <span className="text-xs font-mono text-[#94A3B8] block">.{cls}</span>
                    <span className="text-[10px] text-[#CBD5E1] block mt-0.5">{note}</span>
                  </div>
                  <p className={cls} style={{ color: "#0F172A" }}>{text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              {[
                ["body-large", "body-large — 18px / 1.75 — Inter — Long-form readable content"],
                ["body-base",  "body-base — 16px / 1.6 — Inter — Default paragraph text"],
                ["body-small", "body-small — 14px / 1.5 — Inter — Helper text & captions"],
              ].map(([cls, text]) => (
                <div key={cls} className="flex items-center gap-4">
                  <span className="text-xs font-mono text-[#94A3B8] w-28 shrink-0">.{cls}</span>
                  <p className={cls} style={{ color: "#334155" }}>{text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SPACING */}
          <section>
            <SectionTitle>Spacing Scale</SectionTitle>
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-3 items-end">
              {spacingScale.map(({ step, px }) => (
                <div key={step} className="flex flex-col items-center gap-1">
                  <div
                    className="rounded"
                    style={{
                      width: Math.min(px, 48) + "px",
                      height: Math.min(px, 48) + "px",
                      backgroundColor: "#BFDBFE",
                      border: "1px solid #93C5FD",
                    }}
                  />
                  <span className="text-[10px] font-mono text-[#64748B] text-center leading-tight">
                    {step}<br/>{px}px
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* BUTTONS */}
          <section>
            <SectionTitle>Button</SectionTitle>
            <Row label="Variants">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </Row>
            <Row label="Sizes">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </Row>
            <Row label="States">
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
            </Row>
            <Row label="With Icons">
              <Button leftIcon={<IconSearch />}>Search</Button>
              <Button variant="secondary" rightIcon={<IconArrow />}>Continue</Button>
              <Button variant="outline" leftIcon={<IconSearch />} rightIcon={<IconArrow />}>Both</Button>
            </Row>
            <Row label="Full Width">
              <div className="w-full max-w-sm">
                <Button fullWidth>Full Width Button</Button>
              </div>
            </Row>
          </section>

          {/* CARDS */}
          <section>
            <SectionTitle>Card</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {["default", "elevated", "bordered", "feature"].map((variant) => (
                <Card key={variant} variant={variant}>
                  <Card.Header>
                    <p className="text-xs font-mono text-[#94A3B8]">.{variant}</p>
                    <h3 className="font-semibold text-[#0F172A] mt-1">Card {variant}</h3>
                  </Card.Header>
                  <Card.Body>
                    <p className="text-sm text-[#475569]">
                      Contoh konten card variant {variant}. Hover untuk lihat efeknya.
                    </p>
                  </Card.Body>
                  <Card.Footer>
                    <Button size="sm" variant="outline" fullWidth>Action</Button>
                  </Card.Footer>
                </Card>
              ))}
            </div>
          </section>

          {/* BADGES */}
          <section>
            <SectionTitle>Badge</SectionTitle>
            <Row label="Variants (md)">
              {["default","primary","accent","success","warning","error","popular"].map((v) => (
                <Badge key={v} variant={v}>{v}</Badge>
              ))}
            </Row>
            <Row label="With dot indicator">
              {["default","primary","accent","success","warning","error"].map((v) => (
                <Badge key={v} variant={v} dot>{v}</Badge>
              ))}
            </Row>
            <Row label="Small size">
              {["primary","accent","success","popular"].map((v) => (
                <Badge key={v} variant={v} size="sm" dot>{v}</Badge>
              ))}
            </Row>
          </section>

          {/* INPUT */}
          <section>
            <SectionTitle>Input</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
              <Input label="Default" placeholder="Masukkan nama lengkap" />
              <Input
                label="With helper"
                placeholder="nama@email.com"
                type="email"
                helperText="Kami tidak pernah membagikan email Anda."
              />
              <Input label="With left icon" placeholder="Cari soal..." leftIcon={<IconSearch />} />
              <Input label="Required field" placeholder="Nomor registrasi" required />
              <Input
                label="Error state"
                placeholder="Isi field ini"
                errorMessage="Field ini wajib diisi."
              />
              <Input label="Disabled" placeholder="Tidak bisa diedit" disabled value="read-only value" />
            </div>

            <div className="mt-6 max-w-sm">
              <p className="text-sm font-semibold text-[#334155] mb-3">Interactive validation</p>
              <div className="flex flex-col gap-3">
                <Input
                  label="Coba ketik sesuatu"
                  placeholder="Kosongkan & klik Validate..."
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  errorMessage={inputErr}
                />
                <Button onClick={triggerError} variant="outline" size="sm">Validate</Button>
              </div>
            </div>
          </section>

          {/* SECTION & CONTAINER */}
          <section>
            <SectionTitle>Section & Container</SectionTitle>
            <div className="rounded-xl overflow-hidden border border-[#E2E8F0] text-sm">
              <Section variant="default" className="py-8">
                <Container>
                  <p className="text-[#475569]">
                    <strong>Section default</strong> — bg-white + Container (max-w-7xl, px-4/6/8)
                  </p>
                </Container>
              </Section>
              <Section variant="alternate" className="py-8">
                <Container>
                  <p className="text-[#475569]">
                    <strong>Section alternate</strong> — bg-neutral-50 — section bergantian di homepage
                  </p>
                </Container>
              </Section>
            </div>
          </section>

          {/* ANIMATIONS */}
          <section>
            <SectionTitle>Animations</SectionTitle>
            <p className="text-sm text-[#64748B] mb-6">
              Gunakan class{" "}
              <code className="bg-[#F1F5F9] px-1.5 py-0.5 rounded text-[#1E3A8A] font-mono text-xs">
                .animate-*
              </code>{" "}
              pada elemen. Otomatis dinonaktifkan jika user mengaktifkan{" "}
              <em>prefers-reduced-motion</em>.
            </p>
            <div className="flex flex-wrap gap-4">
              {[
                { cls: "animate-fade-in",  label: "fade-in" },
                { cls: "animate-scale-in", label: "scale-in" },
                { cls: "animate-slide-up", label: "slide-up" },
              ].map(({ cls, label }) => (
                <Card key={cls} variant="bordered" className="p-6 min-w-40">
                  <p className={`text-sm font-medium text-[#1E3A8A] ${cls}`}>.{label}</p>
                </Card>
              ))}
            </div>
          </section>

        </div>
      </Container>

      {/* footer */}
      <div className="border-t border-[#E2E8F0] py-6" style={{ backgroundColor: "#ffffff" }}>
        <Container>
          <p className="text-sm text-[#94A3B8] text-center">
            CPNS Path Design System — Tahap 3. Halaman ini akan dihapus setelah Tahap 4 selesai.
          </p>
        </Container>
      </div>

    </div>
  );
}
