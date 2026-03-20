import{r as x}from"./index.DiEladB3.js";var w={exports:{}},b={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var P;function J(){if(P)return b;P=1;var r=Symbol.for("react.transitional.element"),l=Symbol.for("react.fragment");function n(h,s,i){var o=null;if(i!==void 0&&(o=""+i),s.key!==void 0&&(o=""+s.key),"key"in s){i={};for(var p in s)p!=="key"&&(i[p]=s[p])}else i=s;return s=i.ref,{$$typeof:r,type:h,key:o,ref:s!==void 0?s:null,props:i}}return b.Fragment=l,b.jsx=n,b.jsxs=n,b}var $;function L(){return $||($=1,w.exports=J()),w.exports}var e=L();const q=r=>r.toLocaleString("sv-SE",{maximumFractionDigits:0}),d=r=>`${q(r)} kr`,E=(r,l=1)=>`${r.toFixed(l).replace(".",",")}%`;function U(){const[r,l]=x.useState(3e6),[n,h]=x.useState(15),[s,i]=x.useState(3.5),[o,p]=x.useState(30),[j,C]=x.useState(6e5),t=x.useMemo(()=>{const a=r*(n/100),c=r-a,y=r>0?c/r*100:0,S=j>0?c/j:0;let g=0;const v=[];y>70?(g+=2,v.push("Belåningsgrad > 70%: 2% amortering")):y>50?(g+=1,v.push("Belåningsgrad 50–70%: 1% amortering")):v.push("Belåningsgrad < 50%: inget krav"),S>4.5&&(g+=1,v.push("Skuldkvot > 4,5x: ytterligare +1%"));const N=c*(s/100)/12,A=c*(g/100),k=A/12,u=N+k,T=c*(s/100),F=T*.3,I=u-F/12,D=T*o,M=A*o,_=Math.max(0,c-M),B=u>0?N/u*100:0,Y=u>0?k/u*100:0;return{loan:c,ltv:y,dti:S,amortPct:g,rules:v,monthlyInterest:N,monthlyAmort:k,monthlyTotal:u,taxDeduction:F,monthlyAfterDeduction:I,totalInterest:D,totalAmort:M,remainingDebt:_,interestShare:B,amortShare:Y}},[r,n,s,o,j]);return e.jsxs("div",{className:"calc-entrance space-y-8",children:[e.jsx("style",{children:z}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[e.jsx(f,{label:"Bostadens pris",suffix:"kr",children:e.jsx("input",{type:"number",value:r,onChange:a=>l(Number(a.target.value)),min:0,step:5e4,className:"calc-input"})}),e.jsx(f,{label:"Bruttoinkomst per år",suffix:"kr",children:e.jsx("input",{type:"number",value:j,onChange:a=>C(Number(a.target.value)),min:0,step:1e4,className:"calc-input"})}),e.jsxs(f,{label:"Kontantinsats",suffix:E(n,0),children:[e.jsx("input",{type:"range",min:15,max:100,value:n,onChange:a=>h(Number(a.target.value)),className:"calc-range w-full"}),e.jsxs("div",{className:"flex justify-between text-xs text-[var(--muted-foreground)] mt-1",children:[e.jsx("span",{children:"15%"}),e.jsx("span",{className:"font-medium text-[var(--foreground)]",children:d(r*(n/100))}),e.jsx("span",{children:"100%"})]})]}),e.jsx(f,{label:"Ränta",suffix:"%",children:e.jsx("input",{type:"number",value:s,onChange:a=>i(Number(a.target.value)),min:0,max:15,step:.01,className:"calc-input"})}),e.jsxs(f,{label:"Lånetid",suffix:`${o} år`,children:[e.jsx("input",{type:"range",min:5,max:50,value:o,onChange:a=>p(Number(a.target.value)),className:"calc-range w-full"}),e.jsxs("div",{className:"flex justify-between text-xs text-[var(--muted-foreground)] mt-1",children:[e.jsx("span",{children:"5 år"}),e.jsx("span",{children:"50 år"})]})]})]}),e.jsxs("div",{className:"calc-stagger grid grid-cols-1 sm:grid-cols-3 gap-4",children:[e.jsx(R,{label:"Lånebelopp",value:d(t.loan)}),e.jsx(R,{label:"Belåningsgrad",value:E(t.ltv)}),e.jsx(R,{label:"Skuldkvot",value:`${t.dti.toFixed(1).replace(".",",")}x`})]}),e.jsxs("div",{className:"calc-stagger bg-[var(--card)] border border-[var(--border)] rounded-lg p-5",children:[e.jsx("h3",{className:"text-sm font-bold uppercase tracking-wider text-[var(--primary)] mb-3",children:"Amorteringskrav"}),e.jsx("div",{className:"space-y-2",children:t.rules.map((a,c)=>e.jsxs("div",{className:"flex items-start gap-2 text-sm",children:[e.jsx("span",{className:`mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${a.includes("inget krav")?"bg-[var(--muted)] text-[var(--muted-foreground)]":"bg-[var(--primary)] text-white"}`,children:a.includes("inget krav")?"–":"!"}),e.jsx("span",{className:"text-[var(--foreground)]",children:a})]},c))}),t.amortPct>0&&e.jsxs("p",{className:"mt-3 text-sm font-semibold text-[var(--foreground)]",children:["Totalt amorteringskrav: ",t.amortPct,"% per år"]})]}),e.jsxs("div",{className:"calc-stagger bg-[var(--card)] border border-[var(--border)] rounded-lg p-5 space-y-6",children:[e.jsx("h3",{className:"text-sm font-bold uppercase tracking-wider text-[var(--primary)]",children:"Månadskostnad"}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(m,{label:"Räntekostnad",value:d(Math.round(t.monthlyInterest))}),e.jsx(m,{label:"Amortering",value:d(Math.round(t.monthlyAmort))}),e.jsx("div",{className:"border-t border-[var(--border)] pt-3",children:e.jsx(m,{label:"Total månadskostnad",value:d(Math.round(t.monthlyTotal)),bold:!0})}),e.jsx("div",{className:"pt-1",children:e.jsx(m,{label:"Efter ränteavdrag (30%)",value:d(Math.round(t.monthlyAfterDeduction)),highlight:!0})})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-xs text-[var(--muted-foreground)] mb-2",children:"Fördelning ränta vs amortering"}),e.jsxs("div",{className:"h-4 rounded-full overflow-hidden bg-[var(--muted)] flex",children:[e.jsx("div",{className:"calc-bar bg-[var(--primary)] rounded-l-full",style:{width:`${t.interestShare}%`},title:`Ränta: ${t.interestShare.toFixed(0)}%`}),e.jsx("div",{className:"calc-bar rounded-r-full",style:{width:`${t.amortShare}%`,backgroundColor:"var(--primary)",opacity:.5},title:`Amortering: ${t.amortShare.toFixed(0)}%`})]}),e.jsxs("div",{className:"flex justify-between text-xs mt-1 text-[var(--muted-foreground)]",children:[e.jsxs("span",{children:["Ränta ",t.interestShare.toFixed(0),"%"]}),e.jsxs("span",{children:["Amortering ",t.amortShare.toFixed(0),"%"]})]})]})]}),e.jsxs("div",{className:"calc-stagger bg-[var(--card)] border border-[var(--border)] rounded-lg p-5 space-y-3",children:[e.jsxs("h3",{className:"text-sm font-bold uppercase tracking-wider text-[var(--primary)] mb-1",children:["Över hela lånetiden (",o," år)"]}),e.jsx(m,{label:"Total ränta",value:d(Math.round(t.totalInterest))}),e.jsx(m,{label:"Total amortering",value:d(Math.round(t.totalAmort))}),e.jsx("div",{className:"border-t border-[var(--border)] pt-3",children:e.jsx(m,{label:"Kvarvarande skuld",value:d(Math.round(t.remainingDebt)),bold:!0})})]})]})}function f({label:r,suffix:l,children:n}){return e.jsxs("div",{className:"calc-stagger",children:[e.jsxs("div",{className:"flex items-baseline justify-between mb-2",children:[e.jsx("label",{className:"text-sm font-medium text-[var(--foreground)]",children:r}),e.jsx("span",{className:"text-xs font-semibold text-[var(--primary)]",children:l})]}),n]})}function R({label:r,value:l}){return e.jsxs("div",{className:"bg-[var(--muted)] rounded-lg p-4 text-center",children:[e.jsx("p",{className:"text-xs text-[var(--muted-foreground)] mb-1",children:r}),e.jsx("p",{className:"text-lg font-bold text-[var(--foreground)] calc-value",children:l})]})}function m({label:r,value:l,bold:n,highlight:h}){return e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:`text-sm ${n?"font-bold text-[var(--foreground)]":"text-[var(--muted-foreground)]"}`,children:r}),e.jsx("span",{className:`text-sm calc-value ${h?"font-bold text-[var(--primary)]":n?"font-bold text-[var(--foreground)]":"font-medium text-[var(--foreground)]"}`,children:l})]})}const z=`
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
`;export{U as default};
