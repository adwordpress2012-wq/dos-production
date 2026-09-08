
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TalkToMicahButton from "./components/TalkToMicahButton";
import { SuperMicahLeadFormTrigger } from "./components/SuperMicahLeadForm";
import MicahVoiceOrb from "./components/MicahVoiceOrb";
import { createPageMetadata } from "./lib/seo";
import styles from "./home.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "Directive OS | Business Automation — Done For You",
  description:
    "DOS builds and manages practical business automation systems that help you capture more enquiries, respond faster and follow up automatically.",
});

function CheckButton() {
  return (
    <SuperMicahLeadFormTrigger className={styles.primary}>
      Find My Biggest Revenue Leak
      <ArrowRight size={18} aria-hidden />
    </SuperMicahLeadFormTrigger>
  );
}

export default function Home() {
  return (
    <main className={styles.home}>
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div>
            <p className={styles.eyebrow}>
              Business automation — done for you
            </p>

            <h1 id="hero-title">
              Stop Losing Enquiries to Slow Follow-Up and Manual Work.
            </h1>

            <p className={styles.intro}>
              DOS builds and manages practical business automation systems that
              help you capture more enquiries, respond faster and follow up
              automatically.
            </p>

            <div className={styles.actions}>
              <CheckButton />

              <TalkToMicahButton
                context="homepage-hero"
                className={styles.secondary}
              >
                Talk to Micah
              </TalkToMicahButton>
            </div>

            <p className={styles.micro}>
              Free 60-second Business Systems Check
            </p>
          </div>

          <div className={styles.heroOrb}>
            <MicahVoiceOrb />
          </div>
        </div>

        <svg
          className={styles.wave}
          viewBox="0 0 1440 75"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            fill="#c7abed"
            d="M0 5C360 105 830-45 1440 15V75H0Z"
          />
          <path
            fill="#e4d5f7"
            d="M0 22C360 105 830-25 1440 32V75H0Z"
          />
          <path
            fill="#fff"
            d="M0 35C460 110 940-25 1440 55V75H0Z"
          />
        </svg>
      </section>

      <section className={styles.section} aria-labelledby="pain-title">
        <div className={styles.container}>
          <p className={styles.eyebrow}>Find the friction</p>

          <h2 id="pain-title">
            Where Is Your Business Losing Time or Opportunity?
          </h2>

          <div className={styles.pains}>
            {[
              "Enquiries aren't followed up quickly",
              "Staff repeat the same admin",
              "Website traffic doesn't become enquiries",
              "Opportunities disappear between systems",
            ].map((pain, i) => (
              <p key={pain}>
                <span>0{i + 1}</span>
                {pain}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.lavender}`}
        aria-labelledby="outcomes-title"
      >
        <div className={styles.container}>
          <p className={styles.eyebrow}>Less chasing. More opportunity.</p>

          <h2 id="outcomes-title">
            Three outcomes. One connected business.
          </h2>

          <div className={styles.cards}>
            {[
              [
                "Capture More",
                "Turn website visits, calls and enquiries into organised opportunities.",
              ],
              [
                "Respond Faster",
                "Give customers useful responses without waiting for staff availability.",
              ],
              [
                "Follow Up Automatically",
                "Keep reminders, bookings and opportunities moving without manual chasing.",
              ],
            ].map(([title, copy], i) => (
              <article key={title}>
                <span className={styles.number}>0{i + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.dark}`}
        aria-labelledby="proof-title"
      >
        <div className={styles.container}>
          <div className={styles.proofHeading}>
            <div>
              <p className={styles.eyebrow}>Real business. Working system.</p>

              <h2 id="proof-title">
                Scaffolding Australia <span>× DOS</span>
              </h2>
            </div>

            <Image
              src="/clients/scaffolding-australia-logo.jpg"
              alt="Scaffolding Australia"
              width={267}
              height={113}
              className={styles.clientLogo}
            />
          </div>

          <p className={styles.proofCopy}>
            A connected enquiry system that captures opportunities, reduces
            repetitive administration and keeps the team in control.
          </p>

          <div className={styles.proofAreas}>
            {[
              ["Capture", "Website + enquiry pathways"],
              ["Respond", "Micah chat + phone handling"],
              ["Manage", "CRM + pipeline + follow-up"],
            ].map(([title, copy]) => (
              <div key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            ))}
          </div>

          <Link
            href="/business-spotlight#business-spotlight"
            className={styles.proofLink}
          >
            See The System
            <ArrowRight size={18} aria-hidden />
          </Link>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="process-title">
        <div className={styles.container}>
          <p className={styles.eyebrow}>How DOS works</p>

          <h2 id="process-title">Discover → Build → Manage</h2>

          <ol className={styles.process}>
            {[
              ["Discover", "Find the real bottleneck."],
              ["Build", "Install the practical automation system."],
              ["Manage", "DOS monitors, improves and supports it."],
            ].map(([title, copy], i) => (
              <li key={title}>
                <span className={styles.number}>0{i + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.dark}`}
        aria-labelledby="micah-title"
      >
        <div className={`${styles.container} ${styles.micahGrid}`}>
          <Image
            src="/micah/micah-official-profile.png"
            alt="Micah, the DOS business assistant"
            width={1254}
            height={1254}
            sizes="(max-width: 700px) 160px, 240px"
            className={styles.micahImage}
          />

          <div>
            <p className={styles.eyebrow}>Experience DOS</p>

            <h2 id="micah-title">See Business Automation Working Live</h2>

            <p className={styles.intro}>
              Ask Micah about DOS, explain a business problem, or see how a
              customer enquiry can be captured and guided automatically.
            </p>

            <TalkToMicahButton
              context="homepage-live"
              className={styles.primary}
            >
              Talk to Micah
              <ArrowRight size={18} aria-hidden />
            </TalkToMicahButton>
          </div>
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.final}`}
        aria-labelledby="final-title"
      >
        <div className={styles.container}>
          <p className={styles.eyebrow}>Start with one useful change</p>

          <h2 id="final-title">
            Where Is Your Business Losing Revenue or Time?
          </h2>

          <p className={styles.intro}>
            Complete the free 60-second check and DOS will identify the best
            place to start.
          </p>

          <CheckButton />
        </div>
      </section>
    </main>
  );
}