/**
 * FYRO — ARTICLE PAGE
 * Renders full article content for each Insights piece
 * Design: off-white bg, near-black text, red accent, DM Sans body
 */
import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const ARTICLES: Record<string, {
  slug: string;
  category: string;
  date: string;
  read: string;
  title: string;
  subtitle: string;
  body: { type: "p" | "h2" | "h3" | "blockquote" | "ul"; content: string | string[] }[];
}> = {
  "why-89-percent-of-ai-agent-projects-never-reach-production": {
    slug: "why-89-percent-of-ai-agent-projects-never-reach-production",
    category: "AI AGENTS",
    date: "MAY 2026",
    read: "8 min read",
    title: "Why 89% of AI Agent Projects Never Reach Production",
    subtitle: "The gap between a working demo and a deployed system is where most AI initiatives die. Here's what actually goes wrong — and how to avoid it.",
    body: [
      { type: "p", content: "Every week, another company announces they're 'building AI agents.' Executives are excited. Demos are impressive. The pilot runs smoothly in a controlled environment. Then, six months later, nothing is live. The project is quietly shelved, the budget is reallocated, and the team moves on to the next initiative." },
      { type: "p", content: "This is not a rare story. By most industry estimates, fewer than 15% of enterprise AI agent projects ever reach sustained production deployment. The other 85% fail — not because the technology doesn't work, but because of a set of predictable, avoidable mistakes that almost every company makes the first time." },
      { type: "h2", content: "The Demo Trap" },
      { type: "p", content: "The most common failure mode is what I call the demo trap. A team builds an agent that works beautifully in a controlled demo environment — clean data, predictable inputs, a narrow use case. Leadership sees it, gets excited, and approves a full rollout. Then the agent hits the real world." },
      { type: "p", content: "Real data is messy. Real users ask questions the agent wasn't trained to handle. Edge cases appear constantly. The agent that looked brilliant in the demo starts failing in ways nobody anticipated, and the team doesn't have the infrastructure to monitor, debug, or fix it at scale." },
      { type: "blockquote", content: "The gap between a working demo and a deployed system is not a technical gap. It's an operational one. Most teams are excellent at building. Very few are prepared to run." },
      { type: "h2", content: "The Integration Problem" },
      { type: "p", content: "The second most common failure is integration. An AI agent that can't connect to your actual systems — your CRM, your document management platform, your communication tools — is just an expensive chatbot. The value of an agent comes from its ability to take action inside your existing workflows, not from its ability to answer questions in isolation." },
      { type: "p", content: "Most off-the-shelf agent platforms are built for generic use cases. They connect to a handful of popular tools and assume your data is structured in a standard way. When your company uses a custom ERP, a legacy database, or a proprietary workflow system, the integration work becomes the entire project — and it's work that most vendors aren't equipped to do." },
      { type: "h2", content: "The Ownership Gap" },
      { type: "p", content: "Even when an agent is technically functional and properly integrated, it often fails because nobody owns it. The consulting firm that built it is gone. The internal champion who drove the project has moved to a different initiative. The IT team doesn't know how to maintain it. The business users don't trust it because they don't understand it." },
      { type: "p", content: "An AI agent is not a piece of software you install and forget. It requires ongoing monitoring, tuning, and adaptation as your business changes. Without a clear owner and a maintenance plan, even the best-built agents degrade over time." },
      { type: "h2", content: "What Actually Works" },
      { type: "p", content: "The companies that successfully deploy AI agents share a few common characteristics. First, they start with a specific, high-value problem — not a broad 'let's add AI to everything' mandate. Second, they invest in integration before they invest in capability. Third, they build internal ownership from day one, training the people who will actually use and maintain the system." },
      { type: "p", content: "Most importantly, they treat the agent as a system that lives inside their business — not a product they purchased from a vendor. That shift in mindset is the difference between a demo and a deployment." },
      { type: "h2", content: "The Fyro Approach" },
      { type: "p", content: "At Fyro, we don't build agents and hand them off. We embed inside your company, learn your workflows, and build systems that your team actually owns. Every agent we build is designed for the specific environment it will run in — your tools, your data, your processes. That's why our deployments stick." },
    ],
  },
  "the-difference-between-ai-experimentation-and-ai-transformation": {
    slug: "the-difference-between-ai-experimentation-and-ai-transformation",
    category: "IMPLEMENTATION",
    date: "APRIL 2026",
    read: "11 min read",
    title: "The Difference Between AI Experimentation and AI Transformation",
    subtitle: "Most companies are stuck in permanent pilot mode. Here's what it takes to move from experimenting with AI to actually transforming how your business operates.",
    body: [
      { type: "p", content: "There is a version of AI adoption that looks like progress but produces no results. It involves a series of pilots, proofs of concept, and exploratory projects that generate excitement, consume budget, and leave the company exactly where it started — except with a growing collection of slide decks about AI potential." },
      { type: "p", content: "This is AI experimentation. It's not worthless, but it's not transformation. And the difference between the two is not a matter of scale or ambition — it's a matter of intent, infrastructure, and organizational commitment." },
      { type: "h2", content: "What Experimentation Looks Like" },
      { type: "p", content: "AI experimentation is characterized by isolated projects with no connection to core business processes. A marketing team tests an AI writing tool. An operations team runs a pilot with an automation platform. A product team explores a chatbot integration. Each project is evaluated on its own terms, and the results rarely propagate across the organization." },
      { type: "p", content: "Experimentation is also characterized by a lack of data infrastructure. The AI tools are tested on sample data, not live production data. The integrations are manual and brittle. The results are measured in demos and user satisfaction surveys, not in business outcomes." },
      { type: "h2", content: "What Transformation Requires" },
      { type: "p", content: "Transformation requires a fundamentally different starting point. Instead of asking 'what can AI do?' you ask 'what does our business need to do better, faster, or at lower cost — and how can AI enable that?' The question is business-first, not technology-first." },
      { type: "blockquote", content: "Transformation is not about adding AI to your existing processes. It's about redesigning your processes around what AI makes possible." },
      { type: "p", content: "This distinction matters enormously in practice. Adding AI to an existing process usually produces marginal improvement. Redesigning the process around AI capabilities can produce order-of-magnitude improvement. But it requires a willingness to change how work is done — not just the tools used to do it." },
      { type: "h2", content: "The Infrastructure Question" },
      { type: "p", content: "Transformation also requires data infrastructure that most companies don't have when they start. Your AI systems are only as good as the data they can access. If your customer data is fragmented across five different systems, your AI agent will produce fragmented results. If your document management system is a shared drive with inconsistent naming conventions, your document processing agent will struggle." },
      { type: "p", content: "Before deploying AI at scale, most companies need to do unglamorous foundational work — cleaning data, standardizing processes, building integrations, establishing governance. This work is not exciting. It doesn't make for good demos. But it's the difference between AI that works in a pilot and AI that works in production." },
      { type: "h2", content: "The People Problem" },
      { type: "p", content: "The most underestimated challenge in AI transformation is not technical — it's human. The people whose jobs will change when AI is deployed are often the same people whose cooperation is required to make the deployment successful. If they don't understand the technology, don't trust it, or feel threatened by it, they will find ways to work around it." },
      { type: "p", content: "Successful AI transformation requires deliberate change management. People need to understand not just what the AI does, but why it was built the way it was, what its limitations are, and how their role changes as a result. This is not a one-time training session — it's an ongoing conversation." },
      { type: "h2", content: "Moving from Experimentation to Transformation" },
      { type: "p", content: "The path from experimentation to transformation starts with a clear-eyed assessment of where your business actually is. What are your highest-value workflows? Where are you losing time, money, or quality to manual processes? What data do you have, and what data do you need? Who in your organization has the authority and the will to drive real change?" },
      { type: "p", content: "The answers to these questions determine where to start — and more importantly, where not to start. Transformation is not about doing everything at once. It's about finding the right place to go deep, building something that actually works, and using that success as the foundation for everything that follows." },
    ],
  },
  "how-to-map-your-workflows-before-you-automate-them": {
    slug: "how-to-map-your-workflows-before-you-automate-them",
    category: "AUTOMATION",
    date: "APRIL 2026",
    read: "7 min read",
    title: "How to Map Your Workflows Before You Automate Them",
    subtitle: "Automating a broken process just makes it break faster. Before you build, you need to understand exactly what you're building — and why.",
    body: [
      { type: "p", content: "One of the most expensive mistakes in automation is also one of the most common: automating a process before you understand it. The result is a system that faithfully replicates every inefficiency, workaround, and exception in the original process — except now it does so at machine speed, and the problems are much harder to fix." },
      { type: "p", content: "Workflow mapping is the practice of documenting exactly how work actually gets done in your organization — not how it's supposed to get done, not how the process diagram says it gets done, but how it actually happens on a Tuesday afternoon when three people are out sick and a client is waiting." },
      { type: "h2", content: "Start With the People, Not the Process" },
      { type: "p", content: "The most important rule of workflow mapping is to start with the people who do the work, not the managers who oversee it. Managers often have an idealized view of how processes work. The people doing the work know where the shortcuts are, where the exceptions happen, and where the process actually breaks down." },
      { type: "p", content: "Sit with your team. Watch them work. Ask them to narrate what they're doing and why. Ask them what they do when the standard process doesn't apply. Ask them what takes longer than it should, and what they've learned to do differently from how they were trained." },
      { type: "blockquote", content: "The gap between the documented process and the actual process is where automation projects go to die. Close that gap before you write a single line of code." },
      { type: "h2", content: "Document Every Decision Point" },
      { type: "p", content: "Most workflow maps focus on the linear flow of work — step 1, step 2, step 3. But the most important parts of any workflow are the decision points: the moments where a human makes a judgment call about what to do next. These are the places where automation is hardest, and where the most value is often locked." },
      { type: "p", content: "For each decision point in your workflow, document: what information is used to make the decision, what the possible outcomes are, how often each outcome occurs, and what happens downstream when each decision is made. This information is essential for building an AI system that can handle the decision reliably." },
      { type: "h2", content: "Identify the Exceptions" },
      { type: "p", content: "Every workflow has exceptions — cases that don't fit the standard process. In most organizations, these exceptions are handled by experienced people who know what to do because they've seen it before. When you automate, you need to decide: should the system handle exceptions automatically, or should it escalate to a human?" },
      { type: "p", content: "The answer depends on the frequency and cost of the exception. High-frequency, low-cost exceptions should be automated. Low-frequency, high-cost exceptions should escalate to a human. The key is to be explicit about this decision before you build — not after you discover that your automation is making expensive mistakes on edge cases." },
      { type: "h2", content: "Build the Map, Then Build the System" },
      { type: "p", content: "Once you have a complete workflow map — including the actual process, all decision points, and all exception cases — you're ready to design your automation. The map tells you what the system needs to do, what data it needs to access, and where human oversight is required." },
      { type: "p", content: "This is the work that separates automation that works from automation that creates new problems. It takes time. It requires conversations that are sometimes uncomfortable. But it's the foundation of every successful system we've built at Fyro." },
    ],
  },
  "build-vs-buy-when-off-the-shelf-ai-tools-stop-working": {
    slug: "build-vs-buy-when-off-the-shelf-ai-tools-stop-working",
    category: "STRATEGY",
    date: "MARCH 2026",
    read: "9 min read",
    title: "Build vs. Buy: When Off-the-Shelf AI Tools Stop Working for Your Business",
    subtitle: "SaaS AI tools are fast to deploy and easy to justify. But there's a point where every growing service company outgrows them — and the cost of staying is higher than the cost of building.",
    body: [
      { type: "p", content: "The default answer to most AI questions in 2026 is 'there's a tool for that.' And for many use cases, that's true. The ecosystem of AI-powered SaaS tools has never been richer — there are platforms for sales automation, customer service, document processing, scheduling, and dozens of other functions that used to require custom development." },
      { type: "p", content: "For early-stage companies and simple use cases, buying makes obvious sense. The tools are fast to deploy, the costs are predictable, and the vendor handles the maintenance. But there's a point — and most growing service companies hit it sooner than they expect — where off-the-shelf tools stop working." },
      { type: "h2", content: "The Limits of Generic Tools" },
      { type: "p", content: "Generic AI tools are built for the median use case. They work well when your processes look like everyone else's processes. They start to break down when your business has specific requirements — a unique workflow, a proprietary data format, a regulatory requirement, or a client expectation — that the tool wasn't designed to handle." },
      { type: "p", content: "The most common symptom is the workaround. Your team starts doing manual work to compensate for what the tool can't do. A person is assigned to review every output before it goes to a client. A second tool is added to handle the cases the first tool misses. The automation that was supposed to save time starts requiring more oversight than the manual process it replaced." },
      { type: "blockquote", content: "When your team is spending more time managing your AI tools than doing the work the tools were supposed to replace, it's time to build." },
      { type: "h2", content: "The Hidden Costs of Buy" },
      { type: "p", content: "The sticker price of a SaaS AI tool is rarely the full cost. As your usage grows, per-seat or per-transaction pricing can scale faster than your revenue. Data portability becomes a concern — your business logic and training data are locked inside a vendor's platform. Integration costs accumulate as you try to connect multiple tools that weren't designed to work together." },
      { type: "p", content: "There's also a strategic cost. When your core business processes run on a vendor's platform, you're dependent on their roadmap, their pricing decisions, and their continued existence. For non-critical functions, this is an acceptable trade-off. For the workflows that differentiate your business, it's a risk." },
      { type: "h2", content: "When to Build" },
      { type: "p", content: "Building makes sense when the workflow is core to your business model, when the generic tool requires significant workarounds to fit your process, when the data involved is proprietary or sensitive, or when the cost of the SaaS tool at scale exceeds the cost of a custom build." },
      { type: "p", content: "It also makes sense when you need the system to learn and improve over time based on your specific data. Generic tools are trained on generic data. A custom system trained on your past proposals, your client communications, and your historical outcomes will outperform any generic tool in your specific context." },
      { type: "h2", content: "The Right Framework" },
      { type: "p", content: "The build vs. buy decision should be made at the workflow level, not the company level. Most companies should buy tools for generic functions — scheduling, basic communication, standard reporting — and build custom systems for the workflows that are core to their competitive advantage." },
      { type: "p", content: "At Fyro, we help companies make this distinction clearly. We're not in the business of replacing every tool in your stack. We're in the business of building the systems that your business depends on — the ones where generic doesn't cut it." },
    ],
  },
  "voice-agents-are-not-just-chatbots": {
    slug: "voice-agents-are-not-just-chatbots",
    category: "VOICE AI",
    date: "MARCH 2026",
    read: "6 min read",
    title: "Voice Agents Are Not Just Chatbots — Here's What Changes",
    subtitle: "The shift from text to voice is not a cosmetic upgrade. It changes everything about how an AI agent needs to be designed, trained, and deployed.",
    body: [
      { type: "p", content: "When most people hear 'AI voice agent,' they picture a chatbot with a text-to-speech layer on top. Type in a question, get a response, now it talks. This is not a voice agent. This is a chatbot with a voice skin, and it fails in all the ways you'd expect — awkward pauses, robotic phrasing, an inability to handle the natural flow of human conversation." },
      { type: "p", content: "A real voice agent is designed from the ground up for spoken interaction. The difference is not cosmetic. It's architectural, and it changes almost every aspect of how the system needs to be built." },
      { type: "h2", content: "The Latency Problem" },
      { type: "p", content: "In a text interface, a two-second response time is acceptable. In a voice conversation, two seconds of silence feels like an eternity. Users assume the call has dropped, or that the system is broken. Real voice agents need to respond in under 800 milliseconds — fast enough to feel like a natural conversation, not a system query." },
      { type: "p", content: "Achieving this latency requires a fundamentally different architecture. The speech-to-text, language model, and text-to-speech components all need to be optimized for speed, and the system needs to be able to start generating a response before it has fully processed the input." },
      { type: "h2", content: "The Interruption Problem" },
      { type: "p", content: "People interrupt each other constantly in conversation. They change their mind mid-sentence, add clarifications, or redirect the conversation before the other person has finished speaking. A voice agent that can't handle interruptions feels unnatural and frustrating." },
      { type: "blockquote", content: "A voice agent that makes callers feel heard is worth ten times more than one that merely answers questions correctly." },
      { type: "p", content: "Handling interruptions requires the agent to continuously monitor the audio stream even while it's speaking, detect when the user has started talking, stop its own response, and process the new input. This is technically complex and requires careful tuning to avoid false positives — stopping when there's background noise, for example." },
      { type: "h2", content: "The Context Problem" },
      { type: "p", content: "Voice conversations are inherently ambiguous. People use pronouns without clear antecedents, refer to things mentioned earlier in the conversation, and assume shared context that isn't explicitly stated. A voice agent needs to maintain a rich model of the conversation state — not just the last message, but the full context of what has been discussed and what the caller is trying to accomplish." },
      { type: "p", content: "This is where most generic voice AI platforms fall short. They're optimized for simple, transactional interactions — 'press 1 for sales, press 2 for support' with natural language instead of button presses. They struggle with the kind of nuanced, multi-turn conversations that actually characterize business interactions." },
      { type: "h2", content: "Building Voice Agents That Work" },
      { type: "p", content: "At Fyro, we've built voice agents for companies across several industries — from security firms to professional services companies. The most important lesson we've learned is that a voice agent needs to be designed around the specific conversations it will have, not around a generic conversation model." },
      { type: "p", content: "That means understanding the most common call types, the most common objections and questions, the information the agent needs to collect, and the actions it needs to take. It means training the agent on real call recordings from your business. And it means building in graceful escalation paths for the cases the agent can't handle — because no agent handles everything." },
    ],
  },
  "what-makes-an-rfp-agent-actually-useful": {
    slug: "what-makes-an-rfp-agent-actually-useful",
    category: "AI AGENTS",
    date: "FEBRUARY 2026",
    read: "10 min read",
    title: "What Makes an RFP Agent Actually Useful for Government Contractors",
    subtitle: "There's a wide gap between an AI tool that can summarize an RFP and one that can actually help you win contracts. Here's what separates them.",
    body: [
      { type: "p", content: "Government contracting is a volume game. The firms that win consistently are the ones that can identify the right opportunities, respond quickly, and produce proposals that are both technically compliant and strategically compelling. All three of these capabilities are constrained by the same resource: time." },
      { type: "p", content: "An RFP agent that actually works doesn't just save time — it changes the economics of the business. Instead of choosing between responding to three opportunities or five, a contractor can respond to fifteen. Instead of spending three weeks on a proposal, they can spend three days. The constraint shifts from capacity to capability." },
      { type: "h2", content: "What Most RFP Tools Get Wrong" },
      { type: "p", content: "Most AI tools marketed to government contractors are document summarizers with a proposal template on top. They can extract the key requirements from a solicitation, identify the evaluation criteria, and generate a generic response structure. This is useful, but it's not an RFP agent — it's a starting point that still requires most of the actual work." },
      { type: "p", content: "The problem is that winning proposals are not generic. They're written in the contractor's voice, grounded in their specific past performance, and tailored to the specific agency's priorities and history. A generic template, however well-structured, reads like a generic template — and contracting officers can tell." },
      { type: "h2", content: "The Capability Statement Problem" },
      { type: "p", content: "The most important document in government contracting is not the proposal — it's the capability statement. This document defines who you are, what you do, and why you're qualified. An RFP agent that isn't deeply integrated with your capability statement will produce proposals that don't reflect your actual strengths." },
      { type: "blockquote", content: "The best RFP agent is one that knows your company better than most of your employees do — your past performance, your differentiators, your writing style, and your win history." },
      { type: "p", content: "At Fyro, every RFP agent we build is trained on the client's capability statement, their past proposals, and their historical award data. The agent learns to write in their voice, to emphasize their specific differentiators, and to structure responses in the way that has worked for them in the past." },
      { type: "h2", content: "The Opportunity Scoring Problem" },
      { type: "p", content: "Most contractors spend too much time on opportunities they're unlikely to win. They respond to solicitations where they're not competitive, where the incumbent is entrenched, or where the evaluation criteria favor capabilities they don't have. This is not just a waste of time — it's a strategic error that dilutes the quality of the proposals they do submit." },
      { type: "p", content: "An effective RFP agent needs to score opportunities before the team decides to pursue them. This requires integrating with historical award data from USASpending, analyzing the incumbent situation, assessing the competitive landscape, and comparing the opportunity requirements against the contractor's actual capabilities." },
      { type: "h2", content: "The Human Gate" },
      { type: "p", content: "The most important design decision in an RFP agent is where to put the human. The agent should handle the work that benefits from machine speed and scale — scanning platforms, scoring opportunities, drafting responses, checking compliance. The human should handle the decisions that require judgment — which opportunities to pursue, whether the draft reflects the company's strategic positioning, whether the pricing is right." },
      { type: "p", content: "Getting this balance right is the difference between an agent that augments your team and one that creates new problems. The goal is not to remove humans from the process — it's to focus human attention on the decisions that actually matter." },
      { type: "h2", content: "What a Real RFP Agent Looks Like" },
      { type: "p", content: "The RFP agent we've built at Fyro scans SAM.gov, GovWin IQ, and other platforms continuously, scores every opportunity against the client's capability statement and past performance, delivers a scored summary to the decision-maker, drafts the full proposal response upon approval, and tracks the submission through the award cycle." },
      { type: "p", content: "The result is not just faster proposals — it's better proposals, because the agent is drawing on the full history of what has worked for that specific contractor. And it's more proposals, because the capacity constraint has been removed." },
    ],
  },
};

export default function Article() {
  const params = useParams<{ slug: string }>();
  const article = params.slug ? ARTICLES[params.slug] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.slug]);

  if (!article) {
    return (
      <div style={{ background: "var(--fyro-bg)", minHeight: "100vh" }}>
        <Navbar />
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "10rem 2rem", textAlign: "center" }}>
          <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "2rem", fontWeight: 800, color: "var(--fyro-near-black)", marginBottom: "1rem" }}>
            Article not found
          </h1>
          <Link href="/insights">
            <span style={{ color: "var(--fyro-red)", fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.08em", cursor: "pointer" }}>
              ← Back to Insights
            </span>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const slugs = Object.keys(ARTICLES);
  const currentIdx = slugs.indexOf(article.slug);
  const nextSlug = currentIdx < slugs.length - 1 ? slugs[currentIdx + 1] : null;
  const nextArticle = nextSlug ? ARTICLES[nextSlug] : null;

  return (
    <div style={{ background: "var(--fyro-bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* Article header */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "7rem 2rem 3rem" }}>
        <Link href="/insights">
          <span
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              fontSize: "0.7rem", color: "var(--fyro-gray-light)", letterSpacing: "0.08em",
              textTransform: "uppercase", cursor: "pointer", marginBottom: "2.5rem",
              fontFamily: "'DM Mono', monospace",
            }}
          >
            <ArrowLeft size={11} /> Back to Insights
          </span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
          <span
            style={{
              fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", fontWeight: 700,
              letterSpacing: "0.12em", color: "var(--fyro-red)",
            }}
          >
            {article.category}
          </span>
          <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--fyro-border)", display: "inline-block" }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: "var(--fyro-gray-light)", letterSpacing: "0.06em" }}>
            {article.date}
          </span>
          <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--fyro-border)", display: "inline-block" }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: "var(--fyro-gray-light)", letterSpacing: "0.06em" }}>
            {article.read}
          </span>
        </div>

        <h1
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 800,
            color: "var(--fyro-near-black)",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: "1.25rem",
          }}
        >
          {article.title}
        </h1>

        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "1.15rem",
            color: "var(--fyro-gray-mid)",
            lineHeight: 1.7,
            borderLeft: "3px solid var(--fyro-red)",
            paddingLeft: "1.25rem",
            marginBottom: "3rem",
          }}
        >
          {article.subtitle}
        </p>

        <div style={{ borderTop: "1px solid var(--fyro-border)", marginBottom: "3rem" }} />
      </div>

      {/* Article body */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 2rem 5rem" }}>
        {article.body.map((block, i) => {
          if (block.type === "p") {
            return (
              <p
                key={i}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1.05rem",
                  color: "var(--fyro-near-black)",
                  lineHeight: 1.85,
                  marginBottom: "1.5rem",
                }}
              >
                {block.content as string}
              </p>
            );
          }
          if (block.type === "h2") {
            return (
              <h2
                key={i}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1.4rem",
                  fontWeight: 800,
                  color: "var(--fyro-near-black)",
                  letterSpacing: "-0.02em",
                  marginTop: "3rem",
                  marginBottom: "1rem",
                }}
              >
                {block.content as string}
              </h2>
            );
          }
          if (block.type === "h3") {
            return (
              <h3
                key={i}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "var(--fyro-near-black)",
                  letterSpacing: "-0.015em",
                  marginTop: "2rem",
                  marginBottom: "0.75rem",
                }}
              >
                {block.content as string}
              </h3>
            );
          }
          if (block.type === "blockquote") {
            return (
              <blockquote
                key={i}
                style={{
                  borderLeft: "3px solid var(--fyro-red)",
                  paddingLeft: "1.5rem",
                  margin: "2.5rem 0",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1.15rem",
                  fontStyle: "italic",
                  color: "var(--fyro-near-black)",
                  lineHeight: 1.7,
                }}
              >
                {block.content as string}
              </blockquote>
            );
          }
          if (block.type === "ul" && Array.isArray(block.content)) {
            return (
              <ul key={i} style={{ margin: "1.5rem 0 1.5rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {(block.content as string[]).map((item, j) => (
                  <li
                    key={j}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "1.05rem",
                      color: "var(--fyro-near-black)",
                      lineHeight: 1.7,
                      listStyleType: "disc",
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            );
          }
          return null;
        })}

        {/* Author byline */}
        <div
          style={{
            borderTop: "1px solid var(--fyro-border)",
            paddingTop: "2.5rem",
            marginTop: "3rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "var(--fyro-near-black)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", fontWeight: 700, color: "#fff", letterSpacing: "0.04em" }}>RJ</span>
          </div>
          <div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", fontWeight: 700, color: "var(--fyro-near-black)" }}>
              Written by RJ — Founder, Fyro
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "var(--fyro-gray-light)", marginTop: "0.15rem" }}>
              AI consultant for service companies. Featured speaker at IBM New York and Morehouse College DreamMakers Summit.
            </div>
          </div>
        </div>

        {/* Next article */}
        {nextArticle && (
          <div
            style={{
              marginTop: "4rem",
              padding: "2rem",
              background: "#fff",
              border: "1px solid var(--fyro-border)",
              borderRadius: "8px",
            }}
          >
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: "var(--fyro-gray-light)", letterSpacing: "0.12em", marginBottom: "0.75rem" }}>
              NEXT ARTICLE
            </div>
            <Link href={`/insights/${nextArticle.slug}`}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
                <h3
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    color: "var(--fyro-near-black)",
                    letterSpacing: "-0.015em",
                    lineHeight: 1.4,
                    maxWidth: 500,
                  }}
                >
                  {nextArticle.title}
                </h3>
                <ArrowRight size={18} color="var(--fyro-red)" style={{ flexShrink: 0, marginLeft: "1rem" }} />
              </div>
            </Link>
          </div>
        )}

        {/* CTA */}
        <div
          style={{
            marginTop: "3rem",
            padding: "2.5rem",
            background: "var(--fyro-near-black)",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.12em", marginBottom: "0.5rem" }}>
              READY TO BUILD?
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", fontWeight: 600, color: "#fff", lineHeight: 1.4, maxWidth: 360 }}>
              Book a Free 15-Minute Discovery Call and we'll show you what this looks like for your operation.
            </p>
          </div>
          <Link href="/contact">
            <span
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: "var(--fyro-red)", color: "#fff",
                padding: "0.875rem 1.75rem", borderRadius: "6px",
                fontSize: "0.875rem", fontWeight: 600, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Book a Free 15-Minute Discovery Call <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
