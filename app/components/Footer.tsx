import Link from "next/link";
import Logo from "./Logo";
import TrackedLink from "./TrackedLink";

const GROUPS = [
  {
    title: "Directive OS",
    links: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/#simplify-automate-scale", label: "Simplify" },
      { href: "/#simplify-automate-scale", label: "Automate" },
      { href: "/#simplify-automate-scale", label: "Scale" },
      { href: "/start-here", label: "Start Here" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { href: "/solutions#micah", label: "Micah" },
      { href: "/solutions#smart-chat", label: "Smart Chat Widget" },
      { href: "/solutions#communication", label: "Customer Communication" },
      { href: "/solutions#bookings", label: "Booking Automation" },
      { href: "/solutions#websites", label: "Website Systems" },
      { href: "/solutions#pipelines", label: "CRM and Pipelines" },
      { href: "/solutions#reputation", label: "Reputation" },
      { href: "/solutions#automation", label: "Workflow Automation" },
    ],
  },
  {
    title: "Industries",
    links: [
      { href: "/industries/recruitment", label: "Recruitment" },
      { href: "/industries/restaurants", label: "Restaurants" },
      { href: "/industries/transport", label: "Transport" },
      { href: "/industries/scaffolding", label: "Scaffolding" },
      { href: "/industries/real-estate", label: "Real Estate" },
      { href: "/industries/tourism", label: "Tourism" },
      { href: "/industries/trades", label: "Trades" },
      { href: "/industries/medical", label: "Medical" },
      { href: "/industries/beauty", label: "Beauty" },
      { href: "/industries/professional-services", label: "Professional Services" },
      { href: "/industries", label: "View All Industries" },
    ],
  },
  {
    title: "Ecosystem",
    links: [
      { href: "https://supermicah.com.au", label: "Micah", external: true },
      { href: "https://chatos.com.au", label: "ChatOS", external: true },
      { href: "https://realtyos.com.au", label: "RealtyOS", external: true },
      { href: "https://tourismos.com.au", label: "TourismOS", external: true },
      { href: "https://restaurantos.au", label: "RestaurantOS", external: true },
      { href: "https://transportos.com.au", label: "TransportOS", external: true },
      { href: "https://doshub.com.au", label: "DOS Hub", external: true },
      { href: "/ecosystem", label: "View Ecosystem" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/insights", label: "DOS Insights" },
      { href: "/business-spotlight", label: "Business Spotlight" },
      { href: "/industries", label: "Industry Guides" },
      { href: "/resources", label: "Business Resources" },
      { href: "https://api.leadconnectorhq.com/widget/booking/QAKm8ZjgD7oceOc8nN0b", label: "Business Discovery", external: true },
      { href: "/start-here", label: "Start Here" },
    ],
  },
  {
    title: "DOS Access",
    links: [
      { href: "https://doshub.com.au", label: "DOS Hub", external: true },
      { href: "https://command.directiveos.com.au", label: "Command Centre", external: true },
    ],
  },
] as const;

const LEGAL = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
  { href: "/cancellation-policy", label: "Cancellation Policy" },
  { href: "/acceptable-use", label: "Acceptable Use" },
  { href: "/number-policy", label: "Number Policy" },
];

export default function Footer() {
  return (
    <footer className="relative mt-10 border-t border-white/[0.07] bg-[#070815]/90">
      <div className="divider-glow absolute inset-x-0 top-0" />
      <div className="mx-auto max-w-[1480px] px-6 py-16">
        <div className="grid gap-12 xl:grid-cols-[1.25fr_3fr]">
          <div>
            <Link href="/" aria-label="Directive OS home" className="inline-flex">
              <Logo className="h-16 w-[138px]" />
            </Link>
            <p className="mt-5 text-lg font-semibold text-white">Business Before Technology.</p>
            <p className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-violet-200">
              Simplify. Automate. Scale.
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-muted">
              Practical business systems that improve customer communication, reduce repetitive work and help growing businesses scale.
            </p>
            <div className="mt-6 grid gap-2 text-sm">
              <a href="tel:0485071000" className="w-fit text-white transition hover:text-violet-200">
                0485 071 000
              </a>
              <a href="mailto:hello@directiveos.com.au" className="w-fit text-white transition hover:text-violet-200">
                hello@directiveos.com.au
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 xl:grid-cols-6">
            {GROUPS.map((group) => (
              <div key={group.title}>
                <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-white">{group.title}</h2>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={`${link.label}-${link.href}`}>
                      {"external" in link && link.external ? (
                        <TrackedLink
                          href={link.href}
                          external
                          eventName={
                            group.title === "Ecosystem" || group.title === "DOS Access"
                              ? "ecosystem_outbound_click"
                              : "resource_click"
                          }
                          eventSource="footer"
                          eventLabel={link.label}
                          className="text-sm leading-snug text-ink-muted transition hover:text-white"
                        >
                          {link.label}
                        </TrackedLink>
                      ) : (
                        <Link href={link.href} className="text-sm leading-snug text-ink-muted transition hover:text-white">
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-white/[0.07] pt-7 text-xs text-ink-dim lg:flex-row lg:items-center lg:justify-between">
          <p>© {new Date().getFullYear()} Directive Operating Systems Pty Ltd. All rights reserved.</p>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2">
            {LEGAL.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-white">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
