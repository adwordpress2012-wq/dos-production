"use client";

import { useMemo, useState } from "react";

import { calculateQuote, type DiscountMode } from "./quote-calculations";
import {
  pricingConfig,
  type DmtTierId,
  type ModuleDefinition,
  type ModuleId,
} from "./pricing-config";
import styles from "./SaaSQuoteBuilder.module.css";

type ModuleQuoteState = {
  selected: boolean;
  quantity: number;
  setup: string;
  mrr: string;
  scopeNote: string;
};

type WebsiteScope = {
  type: "new" | "rebuild" | "custom";
  pages: number;
  includedPages: number;
  additionalPageFee: string;
  scopeAdjustment: string;
  options: string[];
};

type QuoteState = {
  company: string;
  contact: string;
  email: string;
  phone: string;
  industry: string;
  revenue: string;
  teamSize: string;
  locations: string;
  averageClientValue: string;
  monthlyLeads: string;
  clientNotes: string;
  internalNotes: string;
  validityDate: string;
  modules: Record<ModuleId, ModuleQuoteState>;
  flrLevel: string;
  website: WebsiteScope;
  dmtTier: DmtTierId;
  customDmt: string;
  bundleAdjustment: string;
  discountMode: DiscountMode;
  discountValue: string;
  finalBasOverride: string;
  recurringAdjustment: string;
  usageEstimate: string;
  usageNote: string;
};

const STORAGE_KEY = "dos-internal-quote-builder-v2";
const STORAGE_VERSION = 2;

function todayForInput() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60_000).toISOString().slice(0, 10);
}
function createModuleState(): Record<ModuleId, ModuleQuoteState> {
  return Object.fromEntries(
    pricingConfig.modules.map((module) => [
      module.id,
      {
        selected: false,
        quantity: 1,
        setup: module.defaultSetup?.toString() ?? "",
        mrr: module.defaultMRR?.toString() ?? "",
        scopeNote: "",
      },
    ])
  ) as Record<ModuleId, ModuleQuoteState>;
}

function createInitialState(): QuoteState {
  return {
    company: "",
    contact: "",
    email: "",
    phone: "",
    industry: "",
    revenue: "",
    teamSize: "",
    locations: "1",
    averageClientValue: "",
    monthlyLeads: "",
    clientNotes: "",
    internalNotes: "",
    validityDate: "",
    modules: createModuleState(),
    flrLevel: "level-1",
    website: {
      type: "new",
      pages: 5,
      includedPages: pricingConfig.websiteDefaults.includedPages,
      additionalPageFee: pricingConfig.websiteDefaults.additionalPageFee.toString(),
      scopeAdjustment: "0",
      options: [],
    },
    dmtTier: "none",
    customDmt: "",
    bundleAdjustment: "0",
    discountMode: "percent",
    discountValue: "0",
    finalBasOverride: "",
    recurringAdjustment: "0",
    usageEstimate: "",
    usageNote: "Additional usage applies where applicable.",
  };
}

function numeric(value: string | number | null | undefined) {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function optionalNumeric(value: string) {
  return value.trim() === "" ? null : numeric(value);
}

function formatMoney(value: number) {
  const fractionDigits = Number.isInteger(value) ? 0 : 2;
  return `A$${value.toLocaleString("en-AU", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: 2,
  })}`;
}

function defaultPriceLabel(value: number | null, mode: ModuleDefinition["setupMode"]) {
  if (value === null) return "Custom price";
  return `${formatMoney(value)}${mode === "from" ? "+" : ""}`;
}

function safeStoredState(value: unknown): QuoteState | null {
  if (!value || typeof value !== "object") return null;
  const candidate = value as Partial<QuoteState>;
  if (!candidate.modules || typeof candidate.modules !== "object") return null;

  const initial = createInitialState();
  return {
    ...initial,
    ...candidate,
    modules: Object.fromEntries(
      pricingConfig.modules.map((module) => [
        module.id,
        {
          ...initial.modules[module.id],
          ...(candidate.modules?.[module.id] ?? {}),
        },
      ])
    ) as Record<ModuleId, ModuleQuoteState>,
    website: { ...initial.website, ...(candidate.website ?? {}) },
  };
}

function readStoredQuote(raw: string): QuoteState | null {
  const parsed = JSON.parse(raw) as unknown;
  if (!parsed || typeof parsed !== "object") return null;
  const envelope = parsed as { version?: unknown; quote?: unknown };
  if (envelope.version === STORAGE_VERSION) return safeStoredState(envelope.quote);
  return safeStoredState(parsed);
}

export default function SaaSQuoteBuilder() {
  const [quote, setQuote] = useState<QuoteState>(createInitialState);
  const [savedMessage, setSavedMessage] = useState("");
  const [usageOpen, setUsageOpen] = useState(false);

  const selectedModules = useMemo(
    () => pricingConfig.modules.filter((module) => quote.modules[module.id].selected),
    [quote.modules]
  );

  const dmtTier = pricingConfig.dmtTiers.find((tier) => tier.id === quote.dmtTier)!;
  const dmtMonthly = quote.dmtTier === "custom" ? numeric(quote.customDmt) : dmtTier.monthly ?? 0;
  const dmtSelected = quote.dmtTier !== "none";

  const totals = calculateQuote({
    moduleLines: selectedModules.map((module) => ({
      setup: numeric(quote.modules[module.id].setup),
      monthly: numeric(quote.modules[module.id].mrr),
      quantity: quote.modules[module.id].quantity,
    })),
    bundleAdjustment: numeric(quote.bundleAdjustment),
    discountMode: quote.discountMode,
    discountValue: numeric(quote.discountValue),
    finalBasOverride: optionalNumeric(quote.finalBasOverride),
    dmtMonthly,
    dmtReplacesModuleMRR: dmtSelected,
    recurringAdjustment: numeric(quote.recurringAdjustment),
  });

  const srwRecommendation = useMemo(() => {
    const website = quote.website;
    const extraPages = Math.max(0, website.pages - website.includedPages);
    return Math.max(
      0,
      pricingConfig.websiteDefaults.baseSetup +
        extraPages * numeric(website.additionalPageFee) +
        numeric(website.scopeAdjustment)
    );
  }, [quote.website]);

  const sheltonWarnings = useMemo(() => {
    const guidance = pricingConfig.sheltonGuidance;
    const warnings: string[] = [];
    if (numeric(quote.revenue) >= guidance.highRevenue) warnings.push("HIGH VALUE CLIENT");
    if (numeric(quote.monthlyLeads) >= guidance.highMonthlyLeads) warnings.push("HIGH LEAD VOLUME");
    if (numeric(quote.locations) >= guidance.multiLocationCount) warnings.push("MULTI-LOCATION");
    if (numeric(quote.teamSize) >= guidance.enterpriseTeamSize) warnings.push("ENTERPRISE REVIEW RECOMMENDED");
    if (selectedModules.length >= guidance.routingModuleCount)
      warnings.push("CUSTOM ROUTING MAY REQUIRE HIGHER PVF");
    if (selectedModules.some((module) => module.usageApplicable)) warnings.push("USAGE RISK");
    return warnings;
  }, [quote.locations, quote.monthlyLeads, quote.revenue, quote.teamSize, selectedModules]);

  function setField<K extends keyof QuoteState>(field: K, value: QuoteState[K]) {
    setQuote((current) => ({ ...current, [field]: value }));
  }

  function updateModule(id: ModuleId, patch: Partial<ModuleQuoteState>) {
    setQuote((current) => ({
      ...current,
      modules: {
        ...current.modules,
        [id]: { ...current.modules[id], ...patch },
      },
    }));
  }

  function selectFlrLevel(levelId: string) {
    const nextLevel = pricingConfig.flrLevels.find((level) => level.id === levelId);
    const currentLevel = pricingConfig.flrLevels.find((level) => level.id === quote.flrLevel);
    if (!nextLevel) return;

    const currentFlr = quote.modules.flr;
    const setupWasDefault = !currentLevel || numeric(currentFlr.setup) === currentLevel.setup;
    const mrrWasDefault = !currentLevel || numeric(currentFlr.mrr) === currentLevel.monthly;
    setQuote((current) => ({
      ...current,
      flrLevel: levelId,
      modules: {
        ...current.modules,
        flr: {
          ...current.modules.flr,
          setup: setupWasDefault ? nextLevel.setup.toString() : current.modules.flr.setup,
          mrr: mrrWasDefault ? nextLevel.monthly.toString() : current.modules.flr.mrr,
        },
      },
    }));
  }

  function toggleWebsiteOption(option: string) {
    setQuote((current) => ({
      ...current,
      website: {
        ...current.website,
        options: current.website.options.includes(option)
          ? current.website.options.filter((item) => item !== option)
          : [...current.website.options, option],
      },
    }));
  }

  function saveLocally() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ version: STORAGE_VERSION, quote })
      );
      setSavedMessage("Saved on this device.");
    } catch {
      setSavedMessage("Local save is unavailable in this browser.");
    }
  }

  function loadLocalQuote() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const next = raw ? readStoredQuote(raw) : null;
      if (!next) {
        setSavedMessage("No saved quote found.");
        return;
      }
      setQuote(next);
      setSavedMessage("Saved quote loaded.");
    } catch {
      setSavedMessage("The saved quote could not be loaded.");
    }
  }

  function resetQuote() {
    setQuote(createInitialState());
    setUsageOpen(false);
    setSavedMessage("Quote reset. Saved copy kept until you save again.");
  }

  const quoteDate = todayForInput();
  const hasRecurringAdjustment = numeric(quote.recurringAdjustment) !== 0;
  const usageApplies = selectedModules.some((module) => module.usageApplicable);

  return (
    <main className={styles.shell}>
      <header className={styles.header}>
        <div>
          <div className={styles.brandLine}>
            <span className={styles.brandMark}>DOS</span>
            <span>DIRECTIVE OS</span>
            <span className={styles.internalBadge}>INTERNAL</span>
          </div>
          <h1>DOS Quote Builder</h1>
          <p>BAS + DMT pricing calculator. The calculator assists; Jaze decides.</p>
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.secondaryButton} onClick={loadLocalQuote}>
            Load saved
          </button>
          <button type="button" className={styles.secondaryButton} onClick={saveLocally}>
            Save locally
          </button>
          <button type="button" className={styles.printButton} onClick={() => window.print()}>
            Print / Save PDF
          </button>
          <button type="button" className={styles.resetButton} onClick={resetQuote}>
            Reset quote
          </button>
        </div>
      </header>

      {savedMessage ? <div className={styles.statusMessage}>{savedMessage}</div> : null}

      <div className={styles.workspace}>
        <div className={styles.editor}>
          <Section number="01" title="Company" subtitle="Client details and internal scope signals.">
            <div className={styles.fieldGrid}>
              <Field label="Company Name" value={quote.company} onChange={(value) => setField("company", value)} />
              <Field label="Contact Name" value={quote.contact} onChange={(value) => setField("contact", value)} />
              <Field label="Email" type="email" value={quote.email} onChange={(value) => setField("email", value)} />
              <Field label="Phone" type="tel" value={quote.phone} onChange={(value) => setField("phone", value)} />
              <Field label="Industry" value={quote.industry} onChange={(value) => setField("industry", value)} />
              <Field
                label="Team Size"
                type="number"
                min="0"
                value={quote.teamSize}
                onChange={(value) => setField("teamSize", value)}
              />
              <Field
                label="Locations"
                type="number"
                min="1"
                value={quote.locations}
                onChange={(value) => setField("locations", value)}
              />
              <Field
                label="Validity Date"
                type="date"
                value={quote.validityDate}
                onChange={(value) => setField("validityDate", value)}
              />
            </div>
            <details className={styles.disclosure}>
              <summary>Internal pricing guidance</summary>
              <div className={styles.fieldGrid}>
                <MoneyField
                  label="Approx Company Revenue"
                  value={quote.revenue}
                  onChange={(value) => setField("revenue", value)}
                />
                <MoneyField
                  label="Average Client Value"
                  value={quote.averageClientValue}
                  onChange={(value) => setField("averageClientValue", value)}
                />
                <Field
                  label="Approx Monthly Leads"
                  type="number"
                  min="0"
                  value={quote.monthlyLeads}
                  onChange={(value) => setField("monthlyLeads", value)}
                />
                <label className={styles.fieldWide}>
                  <span>Internal Notes</span>
                  <textarea
                    rows={3}
                    value={quote.internalNotes}
                    onChange={(event) => setField("internalNotes", event.target.value)}
                  />
                </label>
              </div>
            </details>
          </Section>

          <Section number="02" title="DOS Modules" subtitle="Select only what belongs in this quote.">
            <div className={styles.moduleList}>
              {pricingConfig.modules.map((module) => (
                <ModuleRow
                  key={module.id}
                  module={module}
                  state={quote.modules[module.id]}
                  onToggle={() => updateModule(module.id, { selected: !quote.modules[module.id].selected })}
                  onChange={(patch) => updateModule(module.id, patch)}
                >
                  {module.id === "flr" ? (
                    <div className={styles.scopePanel}>
                      <label className={styles.field}>
                        <span>FLR Level</span>
                        <select value={quote.flrLevel} onChange={(event) => selectFlrLevel(event.target.value)}>
                          {pricingConfig.flrLevels.map((level) => (
                            <option key={level.id} value={level.id}>
                              {level.name} - {formatMoney(level.setup)} / {formatMoney(level.monthly)} MRR
                            </option>
                          ))}
                        </select>
                      </label>
                      <p className={styles.helperText}>
                        Level is selected manually. Company size signals guidance only.
                      </p>
                    </div>
                  ) : null}

                  {module.id === "srw" ? (
                    <WebsiteScopePanel
                      website={quote.website}
                      recommendation={srwRecommendation}
                      onChange={(patch) =>
                        setQuote((current) => ({
                          ...current,
                          website: { ...current.website, ...patch },
                        }))
                      }
                      onToggleOption={toggleWebsiteOption}
                      onUseRecommendation={() => updateModule("srw", { setup: srwRecommendation.toString() })}
                    />
                  ) : null}

                  {module.id === "soos" ? (
                    <div className={styles.customPriceNotice}>
                      <strong>Custom Pricing Required</strong>
                      <span>No approved SOOS price exists in this project. Enter setup and MRR manually.</span>
                    </div>
                  ) : null}
                </ModuleRow>
              ))}
            </div>
          </Section>

          <Section number="03" title="DMT" subtitle="Choose the approved managed technology level, or leave standalone MRR.">
            <div className={styles.dmtGrid}>
              {pricingConfig.dmtTiers.map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  data-testid={`dmt-${tier.id}`}
                  className={quote.dmtTier === tier.id ? styles.dmtActive : styles.dmtOption}
                  onClick={() => setField("dmtTier", tier.id)}
                >
                  <strong>{tier.name}</strong>
                  <span>{tier.monthly === null ? "Manual MRR" : `${formatMoney(tier.monthly)} / month`}</span>
                </button>
              ))}
            </div>
            {quote.dmtTier === "custom" ? (
              <MoneyField
                label="Custom DMT Monthly"
                value={quote.customDmt}
                onChange={(value) => setField("customDmt", value)}
              />
            ) : null}
            <p className={styles.helperText}>
              A selected DMT tier becomes the final managed monthly amount in place of standalone module MRR.
            </p>
          </Section>

          <Section number="04" title="Commercial Adjustment" subtitle="Keep bundle and discount decisions manual.">
            <div className={styles.fieldGrid}>
              <SignedMoneyField
                label="Bundle Adjustment"
                value={quote.bundleAdjustment}
                onChange={(value) => setField("bundleAdjustment", value)}
              />
              <label className={styles.field}>
                <span>Discount Type</span>
                <select
                  value={quote.discountMode}
                  onChange={(event) => setField("discountMode", event.target.value as DiscountMode)}
                >
                  <option value="percent">Percentage</option>
                  <option value="fixed">Dollar amount</option>
                </select>
              </label>
              <Field
                label={quote.discountMode === "percent" ? "Discount %" : "Discount A$"}
                type="number"
                min="0"
                max={quote.discountMode === "percent" ? "100" : undefined}
                value={quote.discountValue}
                onChange={(value) => setField("discountValue", value)}
              />
              <MoneyField
                label="Final BAS Override (optional)"
                value={quote.finalBasOverride}
                placeholder={formatMoney(totals.calculatedBas)}
                onChange={(value) => setField("finalBasOverride", value)}
              />
              <SignedMoneyField
                label="Recurring Adjustment"
                value={quote.recurringAdjustment}
                onChange={(value) => setField("recurringAdjustment", value)}
              />
            </div>
            {hasRecurringAdjustment ? (
              <div className={styles.warningBanner}>DOS standard: reduce scope before reducing recurring DMT.</div>
            ) : null}
          </Section>

          {usageApplies ? (
            <Section number="05" title="Usage" subtitle={pricingConfig.usageDefaults.label}>
              <button type="button" className={styles.textButton} onClick={() => setUsageOpen((open) => !open)}>
                {usageOpen ? "Hide usage detail" : "Add usage estimate or note"}
              </button>
              {usageOpen ? (
                <div className={styles.scopePanel}>
                  <div className={styles.usageTags}>
                    {pricingConfig.usageDefaults.channels.map((channel) => (
                      <span key={channel}>{channel}</span>
                    ))}
                  </div>
                  <MoneyField
                    label="Estimated Monthly Usage Cost"
                    value={quote.usageEstimate}
                    onChange={(value) => setField("usageEstimate", value)}
                  />
                  <label className={styles.fieldWide}>
                    <span>Custom Usage Note</span>
                    <textarea
                      rows={2}
                      value={quote.usageNote}
                      onChange={(event) => setField("usageNote", event.target.value)}
                    />
                  </label>
                  <p className={styles.helperText}>Usage estimate is shown separately and is not added to committed MRR.</p>
                </div>
              ) : null}
            </Section>
          ) : null}

          <Section number={usageApplies ? "06" : "05"} title="Review Notes" subtitle="Only short client-safe notes print.">
            <label className={styles.fieldWide}>
              <span>Short Quote Notes</span>
              <textarea
                rows={4}
                value={quote.clientNotes}
                onChange={(event) => setField("clientNotes", event.target.value)}
                placeholder="Optional scope, validity or delivery note."
              />
            </label>
            <div className={styles.sheltonPanel}>
              <div>
                <span className={styles.sheltonTitle}>Shelton pricing assist</span>
                <p>If this succeeds, what problem could this create next?</p>
              </div>
              <div className={styles.warningTags}>
                {sheltonWarnings.length ? (
                  sheltonWarnings.map((warning) => <span key={warning}>{warning}</span>)
                ) : (
                  <span>NO REVIEW SIGNALS YET</span>
                )}
              </div>
            </div>
          </Section>
        </div>

        <aside className={styles.summary} aria-label="Live quote summary">
          <QuoteSummary
            quote={quote}
            selectedModules={selectedModules}
            dmtName={dmtTier.name}
            dmtSelected={dmtSelected}
            totals={totals}
          />
        </aside>
      </div>

      <PrintQuote
        quote={quote}
        quoteDate={quoteDate}
        selectedModules={selectedModules}
        dmtName={dmtTier.name}
        dmtSelected={dmtSelected}
        dmtMonthly={dmtMonthly}
        totals={totals}
      />
    </main>
  );
}

function Section({
  number,
  title,
  subtitle,
  children,
}: {
  number: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <span>{number}</span>
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  min,
  max,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  min?: string;
  max?: string;
  placeholder?: string;
}) {
  return (
    <label className={styles.field}>
      <span>{label}</span>
      <input
        aria-label={label}
        type={type}
        min={min}
        max={max}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function MoneyField(props: Omit<React.ComponentProps<typeof Field>, "type">) {
  return (
    <label className={styles.field}>
      <span>{props.label}</span>
      <div className={styles.moneyInput}>
        <span>A$</span>
        <input
          aria-label={props.label}
          type="number"
          min="0"
          step="0.01"
          value={props.value}
          placeholder={props.placeholder}
          onChange={(event) => props.onChange(event.target.value)}
        />
      </div>
    </label>
  );
}

function SignedMoneyField(props: Omit<React.ComponentProps<typeof Field>, "type">) {
  return (
    <label className={styles.field}>
      <span>{props.label}</span>
      <div className={styles.moneyInput}>
        <span>A$</span>
        <input
          aria-label={props.label}
          type="number"
          step="0.01"
          value={props.value}
          placeholder={props.placeholder}
          onChange={(event) => props.onChange(event.target.value)}
        />
      </div>
    </label>
  );
}

function ModuleRow({
  module,
  state,
  onToggle,
  onChange,
  children,
}: {
  module: ModuleDefinition;
  state: ModuleQuoteState;
  onToggle: () => void;
  onChange: (patch: Partial<ModuleQuoteState>) => void;
  children?: React.ReactNode;
}) {
  const setupOverridden = numeric(state.setup) !== (module.defaultSetup ?? 0);
  const mrrOverridden = numeric(state.mrr) !== (module.defaultMRR ?? 0);

  return (
    <article className={state.selected ? styles.moduleSelected : styles.moduleRow} data-module={module.id}>
      <button type="button" className={styles.moduleToggle} onClick={onToggle} aria-pressed={state.selected}>
        <span className={styles.checkmark}>{state.selected ? "✓" : ""}</span>
        <span className={styles.moduleIdentity}>
          <strong>{module.acronym}</strong>
          <span>{module.name}</span>
          <small>{module.businessOutcome}</small>
        </span>
        <span className={styles.modulePrice}>
          <strong>{defaultPriceLabel(module.defaultSetup, module.setupMode)}</strong>
          <small>setup</small>
          <strong>{defaultPriceLabel(module.defaultMRR, module.mrrMode)}</strong>
          <small>MRR</small>
        </span>
      </button>

      {state.selected ? (
        <div className={styles.moduleControls}>
          <div className={styles.modulePriceFields}>
            <Field
              label="Quantity"
              type="number"
              min="1"
              value={state.quantity.toString()}
              onChange={(value) => onChange({ quantity: Math.max(1, numeric(value)) })}
            />
            <MoneyField label="Final Setup" value={state.setup} onChange={(value) => onChange({ setup: value })} />
            <MoneyField label="Final MRR" value={state.mrr} onChange={(value) => onChange({ mrr: value })} />
          </div>
          {setupOverridden || mrrOverridden ? <span className={styles.overrideBadge}>MANUAL OVERRIDE</span> : null}
          {module.minimumSetup !== null && numeric(state.setup) < module.minimumSetup ? (
            <p className={styles.inlineWarning}>Setup is below the current working minimum.</p>
          ) : null}
          {module.minimumMRR !== null && numeric(state.mrr) < module.minimumMRR ? (
            <p className={styles.inlineWarning}>MRR is below the current working minimum.</p>
          ) : null}
          {module.usageApplicable ? (
            <p className={styles.usageLine}>Usage: {pricingConfig.usageDefaults.label}</p>
          ) : null}
          {children}
          <label className={styles.fieldWide}>
            <span>Scope Notes</span>
            <textarea
              rows={2}
              value={state.scopeNote}
              onChange={(event) => onChange({ scopeNote: event.target.value })}
            />
          </label>
        </div>
      ) : null}
    </article>
  );
}

function WebsiteScopePanel({
  website,
  recommendation,
  onChange,
  onToggleOption,
  onUseRecommendation,
}: {
  website: WebsiteScope;
  recommendation: number;
  onChange: (patch: Partial<WebsiteScope>) => void;
  onToggleOption: (option: string) => void;
  onUseRecommendation: () => void;
}) {
  return (
    <div className={styles.scopePanel}>
      <div className={styles.segmented}>
        {[
          ["new", "New Website"],
          ["rebuild", "Website Rebuild"],
          ["custom", "Custom Scope"],
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            className={website.type === value ? styles.segmentActive : ""}
            onClick={() => onChange({ type: value as WebsiteScope["type"] })}
          >
            {label}
          </button>
        ))}
      </div>
      <div className={styles.fieldGrid}>
        <Field
          label="Number of Pages"
          type="number"
          min="1"
          value={website.pages.toString()}
          onChange={(value) => onChange({ pages: Math.max(1, numeric(value)) })}
        />
        <Field
          label="Included Pages"
          type="number"
          min="0"
          value={website.includedPages.toString()}
          onChange={(value) => onChange({ includedPages: Math.max(0, numeric(value)) })}
        />
        <MoneyField
          label="Additional Page Fee"
          value={website.additionalPageFee}
          onChange={(value) => onChange({ additionalPageFee: value })}
        />
        <SignedMoneyField
          label="Scope Adjustment"
          value={website.scopeAdjustment}
          onChange={(value) => onChange({ scopeAdjustment: value })}
        />
      </div>
      <p className={styles.helperText}>No additional-page price is assumed. Enter one only when commercially approved.</p>
      <div className={styles.optionGrid}>
        {pricingConfig.websiteDefaults.scopeOptions.map((option) => (
          <label key={option}>
            <input
              type="checkbox"
              checked={website.options.includes(option)}
              onChange={() => onToggleOption(option)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
      <div className={styles.recommendationRow}>
        <span>
          Recommended SRW setup <strong>{formatMoney(recommendation)}</strong>
        </span>
        <button type="button" className={styles.textButton} onClick={onUseRecommendation}>
          Use recommendation
        </button>
      </div>
    </div>
  );
}

type Totals = ReturnType<typeof calculateQuote>;

function QuoteSummary({
  quote,
  selectedModules,
  dmtName,
  dmtSelected,
  totals,
}: {
  quote: QuoteState;
  selectedModules: ModuleDefinition[];
  dmtName: string;
  dmtSelected: boolean;
  totals: Totals;
}) {
  return (
    <div className={styles.summaryCard}>
      <div className={styles.summaryHeader}>
        <div>
          <span>DIRECTIVE OS</span>
          <h2>Internal Quote</h2>
        </div>
        <span className={styles.liveDot}>LIVE</span>
      </div>
      <p className={styles.clientName}>{quote.company || "Untitled client"}</p>

      <div className={styles.summaryBlock}>
        <h3>DOS BAS</h3>
        {selectedModules.length ? (
          selectedModules.map((module) => {
            const state = quote.modules[module.id];
            return (
              <SummaryLine
                key={module.id}
                label={`${module.acronym}${state.quantity > 1 ? ` × ${state.quantity}` : ""}`}
                value={formatMoney(numeric(state.setup) * state.quantity)}
              />
            );
          })
        ) : (
          <p className={styles.emptyText}>No modules selected.</p>
        )}
        <SummaryLine label="Standalone value" value={formatMoney(totals.standaloneSetup)} muted />
        {numeric(quote.bundleAdjustment) !== 0 ? (
          <SummaryLine label="Bundle adjustment" value={formatSignedMoney(numeric(quote.bundleAdjustment))} muted />
        ) : null}
        {totals.discountAmount > 0 ? (
          <SummaryLine label="Discount" value={`-${formatMoney(totals.discountAmount)}`} muted />
        ) : null}
      </div>

      <div className={styles.heroTotal}>
        <span>Setup</span>
        <strong data-testid="total-setup">{formatMoney(totals.finalBas)}</strong>
      </div>
      <div className={styles.heroTotalSecondary}>
        <span>{dmtSelected ? dmtName : "Standalone MRR"}</span>
        <strong data-testid="total-monthly">{formatMoney(totals.totalMonthly)} / mo</strong>
      </div>

      <div className={styles.summaryBlock}>
        <h3>PAYMENT</h3>
        <SummaryLine label="60% commencement" value={formatMoney(totals.commencementPayment)} />
        <SummaryLine label="40% balance" value={formatMoney(totals.balancePayment)} />
        <SummaryLine
          label="First DMT / MRR before go-live"
          value={formatMoney(totals.totalMonthly)}
        />
        <div className={styles.beforeLive}>
          <span>Required before go-live</span>
          <strong data-testid="before-go-live">{formatMoney(totals.amountBeforeGoLive)}</strong>
        </div>
      </div>

      {quote.usageEstimate.trim() ? (
        <p className={styles.usageEstimate}>Estimated usage: {formatMoney(numeric(quote.usageEstimate))} / month</p>
      ) : null}

      <button type="button" className={styles.summaryPrintButton} onClick={() => window.print()}>
        Print / Save PDF
      </button>
      <p className={styles.standardTerms}>60% to commence. 40% + first DMT/MRR before go-live.</p>
    </div>
  );
}

function SummaryLine({
  label,
  value,
  muted = false,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className={muted ? styles.summaryLineMuted : styles.summaryLine}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function formatSignedMoney(value: number) {
  if (value < 0) return `-${formatMoney(Math.abs(value))}`;
  return `+${formatMoney(value)}`;
}

function PrintQuote({
  quote,
  quoteDate,
  selectedModules,
  dmtName,
  dmtSelected,
  dmtMonthly,
  totals,
}: {
  quote: QuoteState;
  quoteDate: string;
  selectedModules: ModuleDefinition[];
  dmtName: string;
  dmtSelected: boolean;
  dmtMonthly: number;
  totals: Totals;
}) {
  return (
    <article className={styles.printQuote} aria-hidden="true">
      <header>
        <div>
          <strong>DIRECTIVE OS</strong>
          <span>INTERNAL QUOTE</span>
        </div>
        <dl>
          <div>
            <dt>Quote date</dt>
            <dd>{quoteDate}</dd>
          </div>
          {quote.validityDate ? (
            <div>
              <dt>Valid until</dt>
              <dd>{quote.validityDate}</dd>
            </div>
          ) : null}
        </dl>
      </header>

      <section>
        <h2>{quote.company || "Client quote"}</h2>
        <div className={styles.printCompany}>
          {quote.contact ? <span>{quote.contact}</span> : null}
          {quote.email ? <span>{quote.email}</span> : null}
          {quote.phone ? <span>{quote.phone}</span> : null}
          {quote.industry ? <span>{quote.industry}</span> : null}
        </div>
      </section>

      <section>
        <h3>DOS BAS / SETUP INVESTMENT</h3>
        <table>
          <thead>
            <tr>
              <th>Module</th>
              <th>Scope</th>
              <th>Setup</th>
              <th>MRR</th>
            </tr>
          </thead>
          <tbody>
            {selectedModules.map((module) => {
              const state = quote.modules[module.id];
              return (
                <tr key={module.id}>
                  <td>
                    <strong>{module.acronym}</strong> - {module.name}
                  </td>
                  <td>{state.quantity > 1 ? `Quantity ${state.quantity}` : state.scopeNote || "Included"}</td>
                  <td>{formatMoney(numeric(state.setup) * state.quantity)}</td>
                  <td>{formatMoney(numeric(state.mrr) * state.quantity)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className={styles.printTotals}>
          <SummaryLine label="Standalone value" value={formatMoney(totals.standaloneSetup)} />
          {numeric(quote.bundleAdjustment) !== 0 ? (
            <SummaryLine label="Bundle adjustment" value={formatSignedMoney(numeric(quote.bundleAdjustment))} />
          ) : null}
          {totals.discountAmount > 0 ? (
            <SummaryLine label="Discount" value={`-${formatMoney(totals.discountAmount)}`} />
          ) : null}
          <SummaryLine label="Final BAS" value={formatMoney(totals.finalBas)} />
        </div>
      </section>

      <section className={styles.printPaymentGrid}>
        <div>
          <h3>MONTHLY</h3>
          <SummaryLine
            label={dmtSelected ? dmtName : "Standalone module MRR"}
            value={`${formatMoney(dmtSelected ? dmtMonthly : totals.moduleMonthly)} / month`}
          />
          {numeric(quote.recurringAdjustment) !== 0 ? (
            <SummaryLine
              label="Recurring adjustment"
              value={formatSignedMoney(numeric(quote.recurringAdjustment))}
            />
          ) : null}
          <SummaryLine label="Final DMT / MRR" value={`${formatMoney(totals.totalMonthly)} / month`} />
        </div>
        <div>
          <h3>PAYMENT</h3>
          <SummaryLine label="60% commencement" value={formatMoney(totals.commencementPayment)} />
          <SummaryLine label="40% balance" value={formatMoney(totals.balancePayment)} />
          <SummaryLine label="First DMT / MRR" value={formatMoney(totals.totalMonthly)} />
          <SummaryLine label="Required before go-live" value={formatMoney(totals.amountBeforeGoLive)} />
        </div>
      </section>

      {quote.usageNote || quote.usageEstimate ? (
        <section>
          <h3>USAGE</h3>
          <p>{quote.usageNote || "Additional usage applies where applicable."}</p>
          {quote.usageEstimate ? <p>Estimated monthly usage: {formatMoney(numeric(quote.usageEstimate))}</p> : null}
        </section>
      ) : null}

      {quote.clientNotes ? (
        <section>
          <h3>NOTES</h3>
          <p>{quote.clientNotes}</p>
        </section>
      ) : null}

      <footer>
        <p>60% setup fee is due to commence.</p>
        <p>40% remaining setup fee plus the first DMT/MRR payment is due before go-live.</p>
        <p>Recurring DMT begins the following month. Scope changes are quoted separately.</p>
      </footer>
    </article>
  );
}
