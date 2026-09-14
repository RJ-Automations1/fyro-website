/*
 * WHAT FYRO HAS BUILT.
 *
 * Clients are described by industry and state, never by name. Several are under
 * NDA, and this site is public and indexed — so the rule is that a reader should
 * be able to judge the work without being able to identify the client.
 *
 * Every entry describes a system that actually exists. If something here stops
 * being true, change it here rather than letting the site drift.
 */

export type WorkStatus = "live" | "in_build";

export type WorkItem = {
  slug: string;
  /** Anonymized: industry + geography only. */
  client: string;
  title: string;
  /** One line for cards and strips. */
  summary: string;
  /** The longer telling, for the Building page. */
  detail: string;
  status: WorkStatus;
  /** When it shipped, or when work started for in_build. */
  date: string;
  graphic: GraphicKind;
  /** Concrete, verifiable specifics. No invented metrics. */
  facts: string[];
};

export type GraphicKind =
  | "filing"
  | "documents"
  | "fieldops"
  | "crm"
  | "rfp"
  | "scheduling";

export const WORK: WorkItem[] = [
  {
    slug: "state-regulatory-filing-agent",
    client: "Environmental services firm · Georgia",
    title: "State regulatory filing agent",
    summary:
      "Files asbestos abatement notifications in the state portal, then stops and waits for a human to pay.",
    detail:
      "The agent reads the completed inspection report, pulls the materials, quantities and dates, calculates the regulatory fee, and drives three pages of the state environmental portal. It stops before the payment screen every time — any control whose label looks like a payment or a final submit is blocked before the click happens. A person reviews and pays.",
    status: "live",
    date: "2026",
    graphic: "filing",
    facts: [
      "Fee engine: per-unit rate, floor and cap, computed from the report",
      "Screenshots every page it touches, as the audit trail",
      "Resumes a saved draft instead of creating a duplicate filing",
      "Never estimates a quantity — a missing field stops the run",
    ],
  },
  {
    slug: "closeout-packet-builder",
    client: "Environmental services firm · Georgia",
    title: "Close-out packet builder",
    summary:
      "Fills the client's own Word templates by finding printed labels, so the letterhead and signature blocks survive.",
    detail:
      "Instead of rebuilding client forms with placeholder tokens, the builder finds the printed label on the real document and writes after it. The filed paperwork keeps its own letterhead, fonts and signature blocks — which matters, because the printed form is the legal record. Pre-printed constants like license and landfill permit numbers are verified, never overwritten.",
    status: "live",
    date: "2026",
    graphic: "documents",
    facts: [
      "Writes into the client's real .docx, not a rebuilt copy",
      "Friability of the material decides which waste manifest is generated",
      "A job with both friable and non-friable material gets both",
      "Output is pinned by test against a packet that was actually accepted",
    ],
  },
  {
    slug: "field-operations-invoicing",
    client: "Electrical contractor · Texas",
    title: "Field operations & invoicing",
    summary:
      "Crew logins, daily reports, job phases, and invoicing that reconciles to the cent.",
    detail:
      "Foremen log in from the field, file daily reports and photos against a job, and the office bills from the same record. Money is stored as integer cents with an explicit override layer, because documents recompute on every render and a typed-in number has to be able to win. The invoice math is pinned by a golden test against a real invoice.",
    status: "live",
    date: "2026",
    graphic: "fieldops",
    facts: [
      "19 tables, 36 migrations, in production",
      "Money as integer cents — never floats",
      "Customer reviews their invoice by signed link, with no login",
      "Halfway-point progress check runs on a schedule, asks once",
    ],
  },
  {
    slug: "autonomous-fire-protection-crm",
    client: "Fire protection startup · Texas",
    title: "Autonomous fire protection CRM",
    summary:
      "Register a fire system and its NFPA-cited inspection schedule appears on its own.",
    detail:
      "The operator never types a due date. Registering a sprinkler riser or an alarm panel generates the full recurring inspection schedule from seeded NFPA task templates, each carrying its citation. A nightly scan turns anything inside thirty days into a work order and queues the customer notice. Agents propose their actions to an audit table for a week before they are allowed to execute anything.",
    status: "in_build",
    date: "Started August 2026",
    graphic: "crm",
    facts: [
      "17 Texas permit jurisdictions seeded, with each city's adopted fire code",
      "42 NFPA inspection tasks, every one flagged unverified until a human confirms it",
      "Four workspaces, each supervised by its own agent",
      "Ships with every outbound channel switched off by default",
    ],
  },
  {
    slug: "rfp-response-agents",
    client: "Government contractors · multiple",
    title: "RFP response agents",
    summary:
      "Monitors procurement portals, scores fit against past performance, and drafts the response.",
    detail:
      "The agent watches procurement boards continuously, reads the full solicitation rather than the summary, and scores it against the firm's actual past performance and capacity. Only bids worth pursuing reach a person. The draft is assembled from a knowledge base of the firm's real prior work, not generic template language.",
    status: "live",
    date: "2026",
    graphic: "rfp",
    facts: [
      "Reads the whole solicitation — scope, scoring criteria, deadlines",
      "Scores fit before a human opens the file",
      "Drafts from the firm's own past performance, not boilerplate",
      "Deployed for several contractors across different verticals",
    ],
  },
  {
    slug: "booking-staffing-site",
    client: "Events company · Georgia",
    title: "Booking & staffing site",
    summary:
      "Public booking against live calendar availability, staff assignment, and an email pipeline that cannot double-send.",
    detail:
      "Customers book against real calendar availability rather than a request form. Staff are assigned to events, and the notification pipeline is idempotent by database constraint — a retry, a double cron fire, or an impatient refresh all collapse to one message. Nobody gets the same email twice.",
    status: "live",
    date: "2026",
    graphic: "scheduling",
    facts: [
      "Books against live calendar free/busy, not a contact form",
      "One email per event per kind, enforced by a unique index",
      "Deposit and final payment tracked through the booking record",
      "Runs its daily sweep in the business's own timezone",
    ],
  },
];

export const LIVE_COUNT = WORK.filter((w) => w.status === "live").length;
