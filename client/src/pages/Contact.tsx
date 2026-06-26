/**
 * FYRO CONTACT PAGE
 * 15-minute free discovery call intake form
 * Left: form fields  |  Right: calendar slot picker → books directly to Google Calendar
 */
import { useEffect, useState, useCallback } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Calendar, Clock, CheckCircle2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

// ── Types ───────────────────────────────────────────────────────────────────
type AvailSlot = { label: string; startISO: string; available: boolean };

function toDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function formatDateLong(d: Date): string {
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

// ── Mini calendar ────────────────────────────────────────────────────────────
function MiniCalendar({ selected, onSelect }: { selected: Date; onSelect: (d: Date) => void }) {
  const [viewMonth, setViewMonth] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const dayNames = ["Su","Mo","Tu","We","Th","Fr","Sa"];

  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  return (
    <div style={{ padding: "1rem 1.25rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.85rem" }}>
        <button
          onClick={() => setViewMonth(new Date(year, month - 1, 1))}
          style={{ background: "none", border: "none", cursor: "pointer", padding: "0.25rem", color: "var(--fyro-gray-mid)", display: "flex", alignItems: "center" }}
        >
          <ChevronLeft size={16} />
        </button>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "var(--fyro-near-black)" }}>
          {monthNames[month]} {year}
        </span>
        <button
          onClick={() => setViewMonth(new Date(year, month + 1, 1))}
          style={{ background: "none", border: "none", cursor: "pointer", padding: "0.25rem", color: "var(--fyro-gray-mid)", display: "flex", alignItems: "center" }}
        >
          <ChevronRight size={16} />
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px", marginBottom: "4px" }}>
        {dayNames.map((d) => (
          <div key={d} style={{ textAlign: "center" as const, fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: "var(--fyro-gray-light)", padding: "2px 0" }}>{d}</div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px" }}>
        {cells.map((day, i) => {
          if (!day) return <div key={`e${i}`} />;
          const isToday = day.getTime() === today.getTime();
          const isPast = day < today;
          const isSelected = toDateStr(day) === toDateStr(selected);
          const isWeekend = day.getDay() === 0 || day.getDay() === 6;
          return (
            <button
              key={day.toISOString()}
              disabled={isPast || isWeekend}
              onClick={() => !isPast && !isWeekend && onSelect(day)}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.78rem",
                width: "100%",
                aspectRatio: "1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "4px",
                border: isToday ? "1px solid var(--fyro-red)" : "1px solid transparent",
                background: isSelected ? "var(--fyro-red)" : "transparent",
                color: isSelected ? "#fff" : isPast || isWeekend ? "var(--fyro-gray-light)" : "var(--fyro-near-black)",
                cursor: isPast || isWeekend ? "default" : "pointer",
                opacity: isPast || isWeekend ? 0.35 : 1,
                transition: "background 0.15s, color 0.15s",
              }}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Booking sidebar ──────────────────────────────────────────────────────────
function BookingSidebar({
  onSlotSelected,
  selectedSlot,
}: {
  onSlotSelected: (slot: { label: string; startISO: string; date: string }) => void;
  selectedSlot: { label: string; startISO: string; date: string } | null;
}) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  while (tomorrow.getDay() === 0 || tomorrow.getDay() === 6) {
    tomorrow.setDate(tomorrow.getDate() + 1);
  }

  const [selectedDate, setSelectedDate] = useState<Date>(tomorrow);
  const [slots, setSlots] = useState<AvailSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAvailability = useCallback(async (date: Date) => {
    setLoading(true);
    setError(null);
    setSlots([]);
    try {
      const dateStr = toDateStr(date);
      const res = await fetch(`/api/availability?date=${dateStr}`);
      if (!res.ok) throw new Error("Could not load availability.");
      const data = await res.json() as { date: string; slots: AvailSlot[] };
      setSlots(data.slots);
    } catch {
      setError("Could not load availability. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAvailability(selectedDate);
  }, [selectedDate, fetchAvailability]);

  const availableSlots = slots.filter((s) => s.available);

  return (
    <div
      style={{
        background: "var(--fyro-white)",
        border: "1px solid var(--fyro-border)",
        borderRadius: "6px",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--fyro-border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <Calendar size={14} color="var(--fyro-red)" />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "var(--fyro-red)", fontWeight: 500 }}>
            Pick a Time
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e" }} />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "var(--fyro-gray-mid)" }}>Accepting calls</span>
        </div>
      </div>

      {/* Duration */}
      <div style={{ padding: "0.9rem 1.5rem", borderBottom: "1px solid var(--fyro-border)", display: "flex", alignItems: "center", gap: "0.5rem", background: "var(--fyro-bg)" }}>
        <Clock size={13} color="var(--fyro-gray-mid)" />
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "var(--fyro-gray-mid)" }}>
          15-minute free discovery call · Eastern Time
        </span>
      </div>

      {/* Calendar */}
      <div style={{ borderBottom: "1px solid var(--fyro-border)" }}>
        <MiniCalendar selected={selectedDate} onSelect={setSelectedDate} />
      </div>

      {/* Slots */}
      <div style={{ padding: "1.25rem 1.5rem", minHeight: 120 }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "var(--fyro-gray-dark)", marginBottom: "0.85rem" }}>
          {formatDateLong(selectedDate)}
        </div>

        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--fyro-gray-mid)" }}>
            <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem" }}>Loading availability…</span>
          </div>
        )}

        {error && !loading && (
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "var(--fyro-red)" }}>{error}</p>
        )}

        {!loading && !error && slots.length > 0 && (
          <>
            {availableSlots.length === 0 ? (
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "var(--fyro-gray-mid)" }}>
                No available slots on this day. Please select another date.
              </p>
            ) : (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {availableSlots.map((slot) => {
                  const isChosen = selectedSlot?.startISO === slot.startISO;
                  return (
                    <button
                      key={slot.startISO}
                      onClick={() =>
                        onSlotSelected({
                          label: slot.label,
                          startISO: slot.startISO,
                          date: formatDateLong(selectedDate),
                        })
                      }
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.78rem",
                        color: isChosen ? "#fff" : "var(--fyro-near-black)",
                        background: isChosen ? "var(--fyro-red)" : "var(--fyro-bg)",
                        border: isChosen ? "1px solid var(--fyro-red)" : "1px solid var(--fyro-border)",
                        borderRadius: "4px",
                        padding: "0.3rem 0.65rem",
                        cursor: "pointer",
                        transition: "all 0.15s",
                      }}
                    >
                      {slot.label}
                    </button>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      {/* Selected slot confirmation */}
      {selectedSlot && (
        <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid var(--fyro-border)", background: "#f0fdf4" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <CheckCircle2 size={14} color="#16a34a" />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "#15803d", fontWeight: 500 }}>
              {selectedSlot.label} · {selectedSlot.date}
            </span>
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "#16a34a", margin: "0.25rem 0 0", opacity: 0.8 }}>
            Slot selected — fill out the form and submit to confirm.
          </p>
        </div>
      )}

      {/* Footer */}
      <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid var(--fyro-border)", background: "var(--fyro-bg)" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "var(--fyro-gray-light)", margin: 0 }}>
          Times shown in Eastern Time (ET). Selecting a slot books it directly on RJ's calendar.
        </p>
      </div>
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────
export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<{ label: string; startISO: string; date: string } | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    companySize: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) {
      setSubmitError("Please select a time slot from the calendar on the right before submitting.");
      return;
    }
    setSubmitError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          slotStartISO: selectedSlot.startISO,
          slotLabel: selectedSlot.label,
          slotDate: selectedSlot.date,
        }),
      });
      if (!res.ok) {
        const data = await res.json() as { error?: string };
        throw new Error(data.error || "Booking failed. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const sectionStyle = { maxWidth: 1200, margin: "0 auto", padding: "0 2.5rem" };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.9rem",
    color: "var(--fyro-near-black)",
    background: "var(--fyro-white)",
    border: "1px solid var(--fyro-border)",
    borderRadius: "4px",
    padding: "0.75rem 1rem",
    outline: "none",
    transition: "border-color 0.18s ease",
    appearance: "none" as const,
    boxSizing: "border-box" as const,
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "'DM Mono', monospace",
    fontSize: "0.65rem",
    fontWeight: 500,
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color: "var(--fyro-gray-dark)",
    marginBottom: "0.5rem",
  };

  return (
    <div style={{ background: "var(--fyro-bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ paddingTop: 64, background: "var(--fyro-bg)" }}>
        <div style={{ ...sectionStyle, padding: "5rem 2.5rem 4rem" }}>
          <div className="fade-up" style={{ marginBottom: "1.75rem" }}>
            <span className="fyro-category-pill">Book a Free 15-Minute Discovery Call</span>
          </div>
          <h1
            className="fade-up"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(2.25rem, 5vw, 4rem)",
              fontWeight: 800,
              color: "var(--fyro-near-black)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              maxWidth: 700,
              marginBottom: "1.25rem",
            }}
          >
            15 minutes. No pitch. Just clarity.
          </h1>
          <p
            className="fade-up"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1.05rem",
              color: "var(--fyro-gray-mid)",
              lineHeight: 1.75,
              maxWidth: 520,
            }}
          >
            Pick a time that works for you, fill in a few details, and your call gets booked
            directly on RJ's calendar — no back-and-forth, no waiting.
          </p>
        </div>
      </section>

      {/* ── FORM + SIDEBAR ── */}
      <section
        style={{
          padding: "0 0 7rem",
          background: "var(--fyro-bg)",
          borderTop: "1px solid var(--fyro-border)",
        }}
      >
        <div
          style={{
            ...sectionStyle,
            display: "grid",
            gridTemplateColumns: "1fr 400px",
            gap: "5rem",
            paddingTop: "4rem",
          }}
          id="contact-grid"
        >
          {/* ── LEFT: FORM ── */}
          <div className="fade-up">
            {submitted ? (
              <div
                style={{
                  padding: "3.5rem",
                  background: "var(--fyro-white)",
                  border: "1px solid var(--fyro-border)",
                  borderRadius: "6px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: "var(--fyro-red)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.5rem",
                  }}
                >
                  <CheckCircle2 size={24} color="white" />
                </div>
                <h2
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "1.6rem",
                    fontWeight: 700,
                    color: "var(--fyro-near-black)",
                    letterSpacing: "-0.02em",
                    marginBottom: "0.75rem",
                  }}
                >
                  You're booked.
                </h2>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.95rem",
                    color: "var(--fyro-gray-mid)",
                    lineHeight: 1.7,
                    maxWidth: 380,
                    margin: "0 auto 0.5rem",
                  }}
                >
                  Your 15-minute discovery call has been added to RJ's calendar.
                  {selectedSlot && (
                    <><br /><strong>{selectedSlot.label} · {selectedSlot.date}</strong></>
                  )}
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.85rem",
                    color: "var(--fyro-gray-light)",
                    marginBottom: "2rem",
                  }}
                >
                  Check <strong>{form.email}</strong> for a calendar invite. Talk soon.
                </p>
                <Link href="/" className="fyro-btn-outline">
                  Back to home
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>

                {/* Selected slot banner */}
                {selectedSlot ? (
                  <div
                    style={{
                      padding: "0.85rem 1.25rem",
                      background: "#f0fdf4",
                      border: "1px solid #bbf7d0",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                    }}
                  >
                    <CheckCircle2 size={16} color="#16a34a" />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "#15803d", fontWeight: 500 }}>
                      {selectedSlot.label} · {selectedSlot.date} (ET)
                    </span>
                  </div>
                ) : (
                  <div
                    style={{
                      padding: "0.85rem 1.25rem",
                      background: "var(--fyro-bg)",
                      border: "1px solid var(--fyro-border)",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                    }}
                  >
                    <Calendar size={15} color="var(--fyro-gray-mid)" />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "var(--fyro-gray-mid)" }}>
                      Select a time slot from the calendar →
                    </span>
                  </div>
                )}

                {/* Row 1: Name + Email */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }} id="form-row-1">
                  <div>
                    <label style={labelStyle}>Full name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jane Smith"
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "var(--fyro-near-black)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--fyro-border)")}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Work email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "var(--fyro-near-black)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--fyro-border)")}
                    />
                  </div>
                </div>

                {/* Row 2: Phone + Company */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }} id="form-row-2">
                  <div>
                    <label style={labelStyle}>Phone number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "var(--fyro-near-black)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--fyro-border)")}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Company name *</label>
                    <input
                      type="text"
                      name="company"
                      required
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Acme Corp"
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "var(--fyro-near-black)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--fyro-border)")}
                    />
                  </div>
                </div>

                {/* Row 3: Industry + Team size */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }} id="form-row-3">
                  <div>
                    <label style={labelStyle}>Industry *</label>
                    <input
                      type="text"
                      name="industry"
                      required
                      value={form.industry}
                      onChange={handleChange}
                      placeholder="Government contracting, consulting..."
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "var(--fyro-near-black)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--fyro-border)")}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Team size</label>
                    <select
                      name="companySize"
                      value={form.companySize}
                      onChange={handleChange}
                      style={{ ...inputStyle, cursor: "pointer" }}
                      onFocus={(e) => (e.target.style.borderColor = "var(--fyro-near-black)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--fyro-border)")}
                    >
                      <option value="">Select team size</option>
                      <option value="1-5">1–5 employees</option>
                      <option value="6-20">6–20 employees</option>
                      <option value="21-50">21–50 employees</option>
                      <option value="51-200">51–200 employees</option>
                      <option value="200+">200+ employees</option>
                    </select>
                  </div>
                </div>

                {/* Error */}
                {submitError && (
                  <div
                    style={{
                      padding: "0.85rem 1.25rem",
                      background: "#fff1f2",
                      border: "1px solid #fecdd3",
                      borderRadius: "6px",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.85rem",
                      color: "#be123c",
                    }}
                  >
                    {submitError}
                  </div>
                )}

                {/* Submit */}
                <div style={{ paddingTop: "0.5rem" }}>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="fyro-btn-primary"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontSize: "0.9rem",
                      padding: "0.9rem 2.25rem",
                      opacity: submitting ? 0.7 : 1,
                      cursor: submitting ? "not-allowed" : "pointer",
                    }}
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} />
                        Booking your call…
                      </>
                    ) : (
                      <>
                        Book my discovery call
                        <ArrowRight size={15} />
                      </>
                    )}
                  </button>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.78rem",
                      color: "var(--fyro-gray-light)",
                      marginTop: "0.85rem",
                    }}
                  >
                    No spam, no commitment. Your slot is reserved the moment you submit.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* ── RIGHT: BOOKING SIDEBAR ── */}
          <div className="fade-up" id="contact-sidebar">
            <div
              style={{
                position: "sticky",
                top: 88,
                display: "flex",
                flexDirection: "column",
                gap: "1.75rem",
              }}
            >
              {/* Calendar slot picker */}
              <BookingSidebar onSlotSelected={setSelectedSlot} selectedSlot={selectedSlot} />

              {/* What happens next */}
              <div
                style={{
                  background: "var(--fyro-near-black)",
                  borderRadius: "6px",
                  padding: "1.75rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.65rem",
                    letterSpacing: "0.15em",
                    color: "var(--fyro-red)",
                    textTransform: "uppercase",
                    marginBottom: "1.25rem",
                  }}
                >
                  What happens next
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {[
                    { step: "01", title: "Pick a time & submit", body: "Select an open slot and fill in your details. Takes 60 seconds." },
                    { step: "02", title: "Instant calendar invite", body: "Your call is booked directly on RJ's calendar — no waiting." },
                    { step: "03", title: "Discovery call", body: "We talk through your business, your team, and your goals." },
                    { step: "04", title: "Custom proposal", body: "If it's a fit, we walk you through exactly what we'd build." },
                  ].map((s) => (
                    <div key={s.step} style={{ display: "flex", gap: "0.85rem" }}>
                      <span
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: "0.7rem",
                          color: "var(--fyro-red)",
                          flexShrink: 0,
                          paddingTop: "0.1rem",
                        }}
                      >
                        {s.step}
                      </span>
                      <div>
                        <div
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            color: "rgba(255,255,255,0.9)",
                            marginBottom: "0.2rem",
                          }}
                        >
                          {s.title}
                        </div>
                        <div
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "0.8rem",
                            color: "rgba(255,255,255,0.5)",
                            lineHeight: 1.6,
                          }}
                        >
                          {s.body}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Direct contact info */}
              <div
                style={{
                  background: "var(--fyro-near-black)",
                  borderRadius: "6px",
                  padding: "1.5rem 1.75rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.65rem",
                    letterSpacing: "0.15em",
                    color: "var(--fyro-red)",
                    textTransform: "uppercase",
                    marginBottom: "1rem",
                  }}
                >
                  Reach us directly
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <a
                    href="tel:+18322697511"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      color: "rgba(255,255,255,0.85)",
                      textDecoration: "none",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                    }}
                  >
                    <span style={{ color: "var(--fyro-red)", fontSize: "1rem" }}>📞</span>
                    (832) 269-7511
                  </a>
                  <a
                    href="mailto:rj@fyroagents.com"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      color: "rgba(255,255,255,0.85)",
                      textDecoration: "none",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                    }}
                  >
                    <span style={{ color: "var(--fyro-red)", fontSize: "1rem" }}>✉️</span>
                    rj@fyroagents.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @media (max-width: 900px) {
            #contact-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
            #contact-sidebar { order: -1; }
          }
          @media (max-width: 560px) {
            #form-row-1, #form-row-2, #form-row-3 { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      <Footer />
    </div>
  );
}
