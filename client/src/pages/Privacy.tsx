/*
 * FYRO PRIVACY POLICY
 * Plain-language policy covering the website (demo booking, chat assistant)
 * and Fyro's internal LinkedIn publishing tool. LinkedIn's app review reads
 * this page, so keep the LinkedIn section accurate to what the tool does.
 */
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const EFFECTIVE_DATE = "September 27, 2026";
const CONTACT_EMAIL = "rj@fyroagents.com";

const SECTIONS: { heading: string; body: (string | string[])[] }[] = [
  {
    heading: "Who we are",
    body: [
      "Fyro is the business name of Fyroagents LLC, an AI consulting company based in Houston, Texas. This policy explains what information we collect through fyroagents.com and through the tools we use to run our own LinkedIn presence, and what we do with it.",
    ],
  },
  {
    heading: "Information you give us on this website",
    body: [
      "When you book a demo, through the contact page or the chat assistant, we collect the details you enter:",
      [
        "Your name and email address",
        "Your phone number, company, industry and company size, if you provide them",
        "The time slot you choose",
      ],
      "We use this only to schedule and hold the meeting and to follow up with you about it. Bookings are stored as events in our Google Calendar.",
    ],
  },
  {
    heading: "The chat assistant",
    body: [
      "The chat assistant on this site is powered by Anthropic's Claude. Messages you type are sent to Anthropic to generate a reply. We do not use your chat messages for advertising, and we do not sell them. Please do not share sensitive personal information in the chat.",
    ],
  },
  {
    heading: "Our LinkedIn publishing tool",
    body: [
      "Fyro uses an internal tool to draft, review, schedule and publish posts to the Fyro company Page on LinkedIn and to our founder's own LinkedIn profile. It is used only by Fyro. It is not offered to the public, and no one else signs in to it.",
      "When our Page admin connects the tool to LinkedIn, LinkedIn gives it an access token. With that connection the tool:",
      [
        "Publishes posts that a Fyro admin has written or reviewed and explicitly approved",
        "Reads the name, logo and admin roles of the Fyro Page, to confirm the connected account is allowed to post for it",
        "Reads the connected member's basic profile (name, profile photo and LinkedIn member ID), so posts are attributed to the right author",
        "Reads comments and engagement numbers on the Fyro Page's own posts, so we can see how posts perform and reply to people who comment",
      ],
      "The tool does not collect data about LinkedIn members in general, does not search or scrape LinkedIn, does not send messages or connection requests, and does not post anything a Fyro admin has not approved. It accesses LinkedIn only through LinkedIn's official APIs.",
      "Access tokens and post drafts are stored on our private server, reachable only by Fyro. Comments on Page posts may be sent to Anthropic's Claude to help us draft a reply; a person at Fyro reviews every reply before it is posted. Revoking the tool's access in your LinkedIn settings stops it immediately, and disconnecting it inside the tool deletes the stored tokens.",
    ],
  },
  {
    heading: "Who we share information with",
    body: [
      "We do not sell or rent personal information. We share it only with the service providers that run these features for us:",
      [
        "Google (calendar for demo bookings)",
        "Anthropic (the chat assistant and drafting help)",
        "Render (hosting for our website and tools)",
        "LinkedIn (publishing to our own Page and profile)",
      ],
      "We may also disclose information if the law requires it.",
    ],
  },
  {
    heading: "Cookies",
    body: [
      "This site does not use advertising or tracking cookies. Your browser may store a small setting, such as your light or dark theme preference, on your own device.",
    ],
  },
  {
    heading: "How long we keep information",
    body: [
      "We keep booking details for as long as we need them to work with you, and delete them on request. LinkedIn access tokens expire on LinkedIn's schedule and are deleted when the tool is disconnected.",
    ],
  },
  {
    heading: "Your choices",
    body: [
      `You can ask us to see, correct or delete the personal information we hold about you by emailing ${CONTACT_EMAIL}. We will respond within 30 days.`,
    ],
  },
  {
    heading: "Children",
    body: ["This site and our services are for businesses. We do not knowingly collect information from children under 13."],
  },
  {
    heading: "Changes to this policy",
    body: ["If we change this policy, we will update it on this page and change the effective date below."],
  },
  {
    heading: "Contact",
    body: [`Questions about this policy: ${CONTACT_EMAIL}. Fyroagents LLC, Houston, Texas.`],
  },
];

const bodyText = {
  fontFamily: "var(--fyro-font)",
  fontSize: "0.95rem",
  color: "var(--fyro-gray-mid)",
  lineHeight: 1.8,
};

const h2Style = {
  fontFamily: "var(--fyro-font)",
  fontSize: "1.35rem",
  fontWeight: 800,
  color: "var(--fyro-near-black)",
  letterSpacing: "-0.015em",
  lineHeight: 1.25,
  margin: "2.5rem 0 0.75rem",
};

export default function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Privacy Policy | Fyro";
  }, []);

  return (
    <div style={{ background: "var(--fyro-bg)", minHeight: "100vh" }}>
      <Navbar />

      <main style={{ maxWidth: 760, margin: "0 auto", padding: "8rem 1.5rem 6rem" }}>
        <h1
          style={{
            fontFamily: "var(--fyro-font)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 800,
            color: "var(--fyro-near-black)",
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
          }}
        >
          Privacy Policy
        </h1>
        <p style={{ ...bodyText, marginTop: "0.75rem" }}>Effective {EFFECTIVE_DATE}</p>

        {SECTIONS.map((s) => (
          <section key={s.heading}>
            <h2 style={h2Style}>{s.heading}</h2>
            {s.body.map((part, i) =>
              Array.isArray(part) ? (
                <ul key={i} style={{ ...bodyText, paddingLeft: "1.25rem", margin: "0 0 1rem", listStyle: "disc" }}>
                  {part.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p key={i} style={{ ...bodyText, margin: "0 0 1rem" }}>
                  {part}
                </p>
              )
            )}
          </section>
        ))}
      </main>

      <Footer />
    </div>
  );
}
