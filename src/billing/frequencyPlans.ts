import type { Dayjs } from 'dayjs';

export type BillingFrequencyId = 'annually' | 'semiAnnually' | 'quarterly' | 'monthly';

export type DiscountType = 'percentage' | 'fixed';

/**
 * Recurring billing plans. `months` drives both the period price (monthly
 * recurring x months) and the payment schedule; `discountPct` is the term
 * discount a customer earns for paying further ahead.
 */
export const BILLING_FREQUENCY_PLANS: {
  id: BillingFrequencyId;
  label: string;
  months: number;
  discountPct: number;
  cadence: string;
}[] = [
  { id: 'annually', label: 'Annually', months: 12, discountPct: 10, cadence: 'year' },
  { id: 'semiAnnually', label: 'Semi-Annually', months: 6, discountPct: 0, cadence: 'six months' },
  { id: 'quarterly', label: 'Quarterly', months: 3, discountPct: 5, cadence: 'quarter' },
  { id: 'monthly', label: 'Monthly', months: 1, discountPct: 0, cadence: 'month' },
];

export function formatBillingAmount(n: number) {
  return n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

/** Period price per plan: monthly recurring x months, less the term discount. */
export function buildBillingPlanPricing(monthlyTotal: number) {
  return BILLING_FREQUENCY_PLANS.map((plan) => {
    const listPrice = monthlyTotal * plan.months;
    return { ...plan, listPrice, price: listPrice * (1 - plan.discountPct / 100) };
  });
}

/** Applies the manually entered discount on top of a term price. */
export function applyBillingDiscount(amount: number, entered: number, type: DiscountType) {
  if (!Number.isFinite(entered) || entered <= 0) return amount;
  const off = type === 'percentage' ? amount * (entered / 100) : entered;
  return Math.max(0, amount - off);
}

/** Guard against a runaway loop on a very long contract with a short period. */
const MAX_PERIODS = 240;

/** Dates on which a payment falls, from `start` until `end`, every `months`. */
export function buildBillingSchedule(
  start: Dayjs | null,
  end: Dayjs | null,
  months: number,
): Dayjs[] {
  if (!start || !end || !start.isValid() || !end.isValid() || !end.isAfter(start)) return [];
  const dates: Dayjs[] = [];
  for (let i = 0; i < MAX_PERIODS; i += 1) {
    const next = start.add(i * months, 'month');
    if (next.isAfter(end)) break;
    dates.push(next);
  }
  return dates;
}

/** How many service visits fall between `start` and `end` at `stepMonths` apart. */
export function countServiceVisits(
  start: Dayjs | null,
  end: Dayjs | null,
  stepMonths: number,
): number {
  const step = Number.isFinite(stepMonths) && stepMonths > 0 ? stepMonths : 1;
  return buildBillingSchedule(start, end, step).length;
}
