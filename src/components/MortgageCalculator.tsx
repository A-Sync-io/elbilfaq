import { useState, useMemo } from 'react';

const fmt = (n: number) =>
  n.toLocaleString('sv-SE', { maximumFractionDigits: 0 });

const fmtKr = (n: number) => `${fmt(n)} kr`;

const fmtPercent = (n: number, decimals = 1) =>
  `${n.toFixed(decimals).replace('.', ',')}%`;

export default function MortgageCalculator() {
  const [price, setPrice] = useState(3_000_000);
  const [downPaymentPct, setDownPaymentPct] = useState(15);
  const [interestRate, setInterestRate] = useState(3.5);
  const [loanTermYears, setLoanTermYears] = useState(30);
  const [grossIncome, setGrossIncome] = useState(600_000);

  const calc = useMemo(() => {
    const downPayment = price * (downPaymentPct / 100);
    const loan = price - downPayment;
    const ltv = price > 0 ? (loan / price) * 100 : 0;
    const dti = grossIncome > 0 ? loan / grossIncome : 0;

    // Amorteringskrav
    let amortPct = 0;
    const rules: string[] = [];
    if (ltv > 70) {
      amortPct += 2;
      rules.push('Belåningsgrad > 70%: 2% amortering');
    } else if (ltv > 50) {
      amortPct += 1;
      rules.push('Belåningsgrad 50–70%: 1% amortering');
    } else {
      rules.push('Belåningsgrad < 50%: inget krav');
    }
    if (dti > 4.5) {
      amortPct += 1;
      rules.push('Skuldkvot > 4,5x: ytterligare +1%');
    }

    // Monthly figures
    const monthlyInterest = (loan * (interestRate / 100)) / 12;
    const yearlyAmort = loan * (amortPct / 100);
    const monthlyAmort = yearlyAmort / 12;
    const monthlyTotal = monthlyInterest + monthlyAmort;

    // Ränteavdrag (30% tax deduction on interest)
    const yearlyInterest = loan * (interestRate / 100);
    const taxDeduction = yearlyInterest * 0.3;
    const monthlyAfterDeduction = monthlyTotal - taxDeduction / 12;

    // Over full loan term
    const totalInterest = yearlyInterest * loanTermYears;
    const totalAmort = yearlyAmort * loanTermYears;
    const remainingDebt = Math.max(0, loan - totalAmort);

    // Bar proportions
    const interestShare =
      monthlyTotal > 0 ? (monthlyInterest / monthlyTotal) * 100 : 0;
    const amortShare =
      monthlyTotal > 0 ? (monthlyAmort / monthlyTotal) * 100 : 0;

    return {
      loan,
      ltv,
      dti,
      amortPct,
      rules,
      monthlyInterest,
      monthlyAmort,
      monthlyTotal,
      taxDeduction,
      monthlyAfterDeduction,
      totalInterest,
      totalAmort,
      remainingDebt,
      interestShare,
      amortShare,
    };
  }, [price, downPaymentPct, interestRate, loanTermYears, grossIncome]);

  return (
    <div className="calc-entrance space-y-8">
      <style>{calcStyles}</style>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputGroup label="Bostadens pris" suffix="kr">
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            min={0}
            step={50000}
            className="calc-input"
          />
        </InputGroup>

        <InputGroup label="Bruttoinkomst per år" suffix="kr">
          <input
            type="number"
            value={grossIncome}
            onChange={(e) => setGrossIncome(Number(e.target.value))}
            min={0}
            step={10000}
            className="calc-input"
          />
        </InputGroup>

        <InputGroup
          label="Kontantinsats"
          suffix={fmtPercent(downPaymentPct, 0)}
        >
          <input
            type="range"
            min={15}
            max={100}
            value={downPaymentPct}
            onChange={(e) => setDownPaymentPct(Number(e.target.value))}
            className="calc-range w-full"
          />
          <div className="flex justify-between text-xs text-[var(--muted-foreground)] mt-1">
            <span>15%</span>
            <span className="font-medium text-[var(--foreground)]">
              {fmtKr(price * (downPaymentPct / 100))}
            </span>
            <span>100%</span>
          </div>
        </InputGroup>

        <InputGroup label="Ränta" suffix="%">
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            min={0}
            max={15}
            step={0.01}
            className="calc-input"
          />
        </InputGroup>

        <InputGroup
          label="Lånetid"
          suffix={`${loanTermYears} år`}
        >
          <input
            type="range"
            min={5}
            max={50}
            value={loanTermYears}
            onChange={(e) => setLoanTermYears(Number(e.target.value))}
            className="calc-range w-full"
          />
          <div className="flex justify-between text-xs text-[var(--muted-foreground)] mt-1">
            <span>5 år</span>
            <span>50 år</span>
          </div>
        </InputGroup>
      </div>

      {/* Info bar */}
      <div className="calc-stagger grid grid-cols-1 sm:grid-cols-3 gap-4">
        <InfoCard label="Lånebelopp" value={fmtKr(calc.loan)} />
        <InfoCard label="Belåningsgrad" value={fmtPercent(calc.ltv)} />
        <InfoCard label="Skuldkvot" value={`${calc.dti.toFixed(1).replace('.', ',')}x`} />
      </div>

      {/* Amorteringskrav */}
      <div className="calc-stagger bg-[var(--card)] border border-[var(--border)] rounded-lg p-5">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--primary)] mb-3">
          Amorteringskrav
        </h3>
        <div className="space-y-2">
          {calc.rules.map((rule, i) => (
            <div key={i} className="flex items-start gap-2 text-sm">
              <span
                className={`mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                  rule.includes('inget krav')
                    ? 'bg-[var(--muted)] text-[var(--muted-foreground)]'
                    : 'bg-[var(--primary)] text-white'
                }`}
              >
                {rule.includes('inget krav') ? '–' : '!'}
              </span>
              <span className="text-[var(--foreground)]">{rule}</span>
            </div>
          ))}
        </div>
        {calc.amortPct > 0 && (
          <p className="mt-3 text-sm font-semibold text-[var(--foreground)]">
            Totalt amorteringskrav: {calc.amortPct}% per år
          </p>
        )}
      </div>

      {/* Results */}
      <div className="calc-stagger bg-[var(--card)] border border-[var(--border)] rounded-lg p-5 space-y-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--primary)]">
          Månadskostnad
        </h3>

        <div className="space-y-3">
          <ResultRow label="Räntekostnad" value={fmtKr(Math.round(calc.monthlyInterest))} />
          <ResultRow label="Amortering" value={fmtKr(Math.round(calc.monthlyAmort))} />
          <div className="border-t border-[var(--border)] pt-3">
            <ResultRow
              label="Total månadskostnad"
              value={fmtKr(Math.round(calc.monthlyTotal))}
              bold
            />
          </div>
          <div className="pt-1">
            <ResultRow
              label="Efter ränteavdrag (30%)"
              value={fmtKr(Math.round(calc.monthlyAfterDeduction))}
              highlight
            />
          </div>
        </div>

        {/* Animated cost bar */}
        <div>
          <p className="text-xs text-[var(--muted-foreground)] mb-2">
            Fördelning ränta vs amortering
          </p>
          <div className="h-4 rounded-full overflow-hidden bg-[var(--muted)] flex">
            <div
              className="calc-bar bg-[var(--primary)] rounded-l-full"
              style={{ width: `${calc.interestShare}%` }}
              title={`Ränta: ${calc.interestShare.toFixed(0)}%`}
            />
            <div
              className="calc-bar rounded-r-full"
              style={{
                width: `${calc.amortShare}%`,
                backgroundColor: 'var(--primary)',
                opacity: 0.5,
              }}
              title={`Amortering: ${calc.amortShare.toFixed(0)}%`}
            />
          </div>
          <div className="flex justify-between text-xs mt-1 text-[var(--muted-foreground)]">
            <span>Ränta {calc.interestShare.toFixed(0)}%</span>
            <span>Amortering {calc.amortShare.toFixed(0)}%</span>
          </div>
        </div>
      </div>

      {/* Over full term */}
      <div className="calc-stagger bg-[var(--card)] border border-[var(--border)] rounded-lg p-5 space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--primary)] mb-1">
          Över hela lånetiden ({loanTermYears} år)
        </h3>
        <ResultRow label="Total ränta" value={fmtKr(Math.round(calc.totalInterest))} />
        <ResultRow label="Total amortering" value={fmtKr(Math.round(calc.totalAmort))} />
        <div className="border-t border-[var(--border)] pt-3">
          <ResultRow label="Kvarvarande skuld" value={fmtKr(Math.round(calc.remainingDebt))} bold />
        </div>
      </div>
    </div>
  );
}

function InputGroup({
  label,
  suffix,
  children,
}: {
  label: string;
  suffix: string;
  children: React.ReactNode;
}) {
  return (
    <div className="calc-stagger">
      <div className="flex items-baseline justify-between mb-2">
        <label className="text-sm font-medium text-[var(--foreground)]">
          {label}
        </label>
        <span className="text-xs font-semibold text-[var(--primary)]">
          {suffix}
        </span>
      </div>
      {children}
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[var(--muted)] rounded-lg p-4 text-center">
      <p className="text-xs text-[var(--muted-foreground)] mb-1">{label}</p>
      <p className="text-lg font-bold text-[var(--foreground)] calc-value">
        {value}
      </p>
    </div>
  );
}

function ResultRow({
  label,
  value,
  bold,
  highlight,
}: {
  label: string;
  value: string;
  bold?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span
        className={`text-sm ${
          bold
            ? 'font-bold text-[var(--foreground)]'
            : 'text-[var(--muted-foreground)]'
        }`}
      >
        {label}
      </span>
      <span
        className={`text-sm calc-value ${
          highlight
            ? 'font-bold text-[var(--primary)]'
            : bold
              ? 'font-bold text-[var(--foreground)]'
              : 'font-medium text-[var(--foreground)]'
        }`}
      >
        {value}
      </span>
    </div>
  );
}

const calcStyles = `
  @keyframes calcFadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .calc-entrance { animation: calcFadeUp 0.4s ease-out both; }

  .calc-stagger {
    animation: calcFadeUp 0.4s ease-out both;
  }
  .calc-stagger:nth-child(1) { animation-delay: 0.05s; }
  .calc-stagger:nth-child(2) { animation-delay: 0.10s; }
  .calc-stagger:nth-child(3) { animation-delay: 0.15s; }
  .calc-stagger:nth-child(4) { animation-delay: 0.20s; }
  .calc-stagger:nth-child(5) { animation-delay: 0.25s; }
  .calc-stagger:nth-child(6) { animation-delay: 0.30s; }

  .calc-value {
    transition: all 0.3s ease;
  }

  .calc-bar {
    transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .calc-input {
    width: 100%;
    padding: 0.625rem 0.75rem;
    border-radius: 0.5rem;
    border: 1px solid var(--border);
    background: var(--background);
    color: var(--foreground);
    font-size: 0.875rem;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .calc-input:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 20%, transparent);
  }

  .calc-range {
    -webkit-appearance: none;
    appearance: none;
    height: 6px;
    border-radius: 9999px;
    background: var(--muted);
    outline: none;
    cursor: pointer;
  }
  .calc-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--primary);
    border: 2px solid white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    cursor: pointer;
    transition: transform 0.15s ease;
  }
  .calc-range::-webkit-slider-thumb:hover {
    transform: scale(1.15);
  }
  .calc-range::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--primary);
    border: 2px solid white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    cursor: pointer;
  }
`;
