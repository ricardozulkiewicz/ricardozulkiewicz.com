function BrandMark({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <div className="absolute border border-[#F7F5F0]/22" style={{ inset: "18% 6% 6% 18%" }} />
      <div className="absolute border border-[#F7F5F0]/22" style={{ inset: "10% 14% 14% 10%" }} />
      <div className="absolute border border-[#F7F5F0]/22" style={{ inset: "2% 22% 22% 2%" }} />
      <div
        className="absolute bg-[#0F4C5C] shadow-[0_0_28px_rgba(15,76,92,0.65)]"
        style={{ width: "18%", height: "18%", left: "28%", top: "56%" }}
      />
    </div>
  );
}

export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#1F1F1F] px-6 text-[#F7F5F0]">
      <div className="text-center">
        <BrandMark className="mx-auto h-16 w-16 animate-pulse" />
        <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#57a6b7]">Carregando</p>
        <p className="mt-4 max-w-sm text-sm leading-7 text-[#D8D8D8]/65">Preparando a experiência Ricardo Zulkiewicz.</p>
      </div>
    </main>
  );
}
