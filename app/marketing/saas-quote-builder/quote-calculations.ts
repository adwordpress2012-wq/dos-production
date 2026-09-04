export type DiscountMode = "percent" | "fixed";

export type QuoteCalculationInput = {
  moduleLines: Array<{ setup: number; monthly: number; quantity: number }>;
  bundleAdjustment: number;
  discountMode: DiscountMode;
  discountValue: number;
  finalBasOverride: number | null;
  dmtMonthly: number;
  dmtReplacesModuleMRR: boolean;
  recurringAdjustment: number;
};

export type QuoteCalculation = {
  standaloneSetup: number;
  moduleMonthly: number;
  adjustedBas: number;
  discountAmount: number;
  calculatedBas: number;
  finalBas: number;
  totalMonthly: number;
  commencementPayment: number;
  balancePayment: number;
  amountBeforeGoLive: number;
};

const money = (value: number) => Math.round((Number.isFinite(value) ? value : 0) * 100) / 100;
const nonNegative = (value: number) => Math.max(0, Number.isFinite(value) ? value : 0);

export function calculateQuote(input: QuoteCalculationInput): QuoteCalculation {
  const standaloneSetup = money(
    input.moduleLines.reduce(
      (total, line) => total + nonNegative(line.setup) * Math.max(1, line.quantity || 1),
      0
    )
  );
  const moduleMonthly = money(
    input.moduleLines.reduce(
      (total, line) => total + nonNegative(line.monthly) * Math.max(1, line.quantity || 1),
      0
    )
  );
  const adjustedBas = nonNegative(money(standaloneSetup + input.bundleAdjustment));
  const rawDiscount =
    input.discountMode === "percent"
      ? adjustedBas * (Math.min(100, nonNegative(input.discountValue)) / 100)
      : nonNegative(input.discountValue);
  const discountAmount = money(Math.min(adjustedBas, rawDiscount));
  const calculatedBas = money(adjustedBas - discountAmount);
  const finalBas = money(
    input.finalBasOverride === null ? calculatedBas : nonNegative(input.finalBasOverride)
  );
  const recurringBase = input.dmtReplacesModuleMRR
    ? nonNegative(input.dmtMonthly)
    : moduleMonthly;
  const totalMonthly = nonNegative(money(recurringBase + input.recurringAdjustment));
  const commencementPayment = money(finalBas * 0.6);
  const balancePayment = money(finalBas * 0.4);
  const amountBeforeGoLive = money(balancePayment + totalMonthly);

  return {
    standaloneSetup,
    moduleMonthly,
    adjustedBas,
    discountAmount,
    calculatedBas,
    finalBas,
    totalMonthly,
    commencementPayment,
    balancePayment,
    amountBeforeGoLive,
  };
}
