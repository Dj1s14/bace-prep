import React, { useState } from 'react';
import {
  Calculator,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Info,
  Sparkles,
  BookOpen,
  Award,
  ChevronDown,
  ChevronUp,
  Split,
  Percent,
  Layers,
  FlaskConical,
  Check,
  Scale,
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';

interface BenchMathTheoryLessonProps {
  onLaunchDrill?: () => void;
}

export const BenchMathTheoryLesson: React.FC<BenchMathTheoryLessonProps> = ({ onLaunchDrill }) => {
  const { benchStats, markBenchLessonComplete } = useApp?.() || {};
  const isCompleted = Boolean(benchStats?.lessonsCompleted?.['lesson_math']);

  const [activeCategory, setActiveCategory] = useState<'dilution' | 'molarity' | 'percent' | 'serial'>('dilution');
  const [expandedExamples, setExpandedExamples] = useState<Record<string, boolean>>({
    ex_dilution_1: true,
    ex_molarity_1: true,
    ex_percent_1: true,
    ex_serial_1: true,
  });

  const toggleExample = (id: string) => {
    setExpandedExamples((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Lesson Header Banner */}
      <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 rounded-2xl p-6 border border-emerald-800/60 shadow-lg text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              <Calculator className="w-3.5 h-3.5 text-emerald-400" />
              <span>BACE Written Domain 4 & Practical Bench Reagents</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Algorithmic Bench Math, Dilutions & Dimensional Analysis
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Step-by-step mathematical principles, unit conversion dimensional chains, and worked examples for $C_1V_1 = C_2V_2$, molarity mass formulas, % solutions, and serial dilutions.
            </p>
          </div>

          <div className="flex items-center space-x-3 self-start md:self-center shrink-0">
            <button
              onClick={() => markBenchLessonComplete?.('lesson_math', !isCompleted)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 transition-all cursor-pointer shadow-xs ${
                isCompleted
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/20'
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Lesson Certified Complete</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Mark Lesson as Complete</span>
                </>
              )}
            </button>

            {onLaunchDrill && (
              <button
                onClick={onLaunchDrill}
                className="px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white flex items-center space-x-2 transition-all cursor-pointer shadow-xs"
              >
                <span>Launch Math Drills</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Selection Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        {[
          {
            id: 'dilution',
            title: '1. C1V1 = C2V2 Dilutions',
            sub: 'Buffer Stocks & Aliquots',
            icon: Split,
            color: 'text-blue-600',
          },
          {
            id: 'molarity',
            title: '2. Molarity Mass (g)',
            sub: 'MW & Volumetric Solutes',
            icon: Scale,
            color: 'text-emerald-600',
          },
          {
            id: 'percent',
            title: '3. Percent Solutions',
            sub: '% w/v & % v/v Formulations',
            icon: Percent,
            color: 'text-amber-600',
          },
          {
            id: 'serial',
            title: '4. Serial Dilutions',
            sub: 'TDF, CDF & CFU/mL Plating',
            icon: Layers,
            color: 'text-purple-600',
          },
        ].map((tab) => {
          const active = activeCategory === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                active
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center space-x-2 mb-1">
                <Icon className={`w-4 h-4 ${active ? 'text-white' : tab.color}`} />
                <span className="font-bold text-xs">{tab.title}</span>
              </div>
              <p className={`text-[11px] ${active ? 'text-slate-300' : 'text-slate-500'}`}>{tab.sub}</p>
            </button>
          );
        })}
      </div>

      {/* CATEGORY 1: C1V1 = C2V2 DILUTIONS */}
      {activeCategory === 'dilution' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
            <div className="p-2.5 rounded-xl bg-blue-100 text-blue-800">
              <Split className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">
                Core Law: Conservation of Solute Mass (C1V1 = C2V2)
              </h3>
              <p className="text-xs text-slate-500">
                Used whenever diluting an existing concentrated stock solution into a lower working concentration.
              </p>
            </div>
          </div>

          {/* Formula & Rule Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs space-y-1">
              <span className="font-bold text-blue-900 block">The Governing Equation</span>
              <div className="font-mono text-sm font-black text-blue-950 py-1">C₁ × V₁ = C₂ × V₂</div>
              <p className="text-blue-800 text-[11px]">
                Where <strong>C₁</strong> = Stock Conc, <strong>V₁</strong> = Volume of stock needed, <strong>C₂</strong> = Desired Final Conc, <strong>V₂</strong> = Total Final Volume.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs space-y-1">
              <span className="font-bold text-amber-900 block">The Solvent Addition Step</span>
              <div className="font-mono text-sm font-black text-amber-950 py-1">V_solvent = V₂ - V₁</div>
              <p className="text-amber-800 text-[11px]">
                Always subtract the volume of stock reagent from the total volume to determine how much water/diluent buffer to add!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 text-xs space-y-1">
              <span className="font-bold text-purple-900 block">Unit Consistency Rule</span>
              <div className="font-mono text-sm font-black text-purple-950 py-1">Units(C₁) = Units(C₂)</div>
              <p className="text-purple-800 text-[11px]">
                If C₁ is in mg/mL, C₂ must be in mg/mL. If V₂ is in mL, V₁ will output in mL. Never mix units without converting first!
              </p>
            </div>
          </div>

          {/* Step-by-Step Worked Example 1 */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleExample('ex_dilution_1')}
              className="w-full bg-slate-50 hover:bg-slate-100 p-4 flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-mono text-xs font-bold">
                  Worked Example 1
                </span>
                <span className="text-xs font-bold text-slate-900">
                  Preparing 500 mL of 1X TAE Electrophoresis Buffer from 50X Stock
                </span>
              </div>
              {expandedExamples['ex_dilution_1'] ? (
                <ChevronUp className="w-4 h-4 text-slate-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-500" />
              )}
            </button>

            {expandedExamples['ex_dilution_1'] && (
              <div className="p-5 space-y-4 text-xs text-slate-700 bg-white">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
                  <strong>Scenario: </strong>
                  <span>
                    You need to prepare 500 mL of 1X TAE running buffer for an agarose gel. In the chemical stockroom, there is a carboy of 50X TAE concentrate. How much 50X stock and how much deionized water must you combine?
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="font-bold text-slate-900">Step 1: Identify Given Variables</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px]">
                    <div className="bg-slate-100 p-2 rounded">C₁ = 50X</div>
                    <div className="bg-slate-100 p-2 rounded">V₁ = ? (solve)</div>
                    <div className="bg-slate-100 p-2 rounded">C₂ = 1X</div>
                    <div className="bg-slate-100 p-2 rounded">V₂ = 500 mL</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="font-bold text-slate-900">Step 2: Rearrange and Solve for V₁</div>
                  <div className="bg-slate-900 text-teal-300 font-mono p-3 rounded-xl">
                    V₁ = (C₂ × V₂) ÷ C₁<br />
                    V₁ = (1X × 500 mL) ÷ 50X<br />
                    V₁ = 10.0 mL of 50X TAE Stock
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="font-bold text-slate-900">Step 3: Calculate Solvent Diluent (dH₂O)</div>
                  <div className="bg-slate-100 p-3 rounded-xl font-mono text-slate-800">
                    V_water = V_total - V_stock = 500 mL - 10 mL = <strong>490 mL of dH₂O</strong>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950">
                  <strong>Bench Execution Procedure (QS Method): </strong>
                  Measure ~400 mL of deionized water in a 500 mL graduated cylinder. Use a 10 mL serological pipette to add exactly 10.0 mL of 50X TAE. Bring to volume ("QS" = quantum satis) to the 500 mL line with dH₂O, cover with Parafilm, and invert 3 times to mix thoroughly.
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CATEGORY 2: MOLARITY CALCULATIONS */}
      {activeCategory === 'molarity' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
            <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">
                Molarity & Solid Solute Mass Calculations
              </h3>
              <p className="text-xs text-slate-500">
                Calculating the mass in grams required to prepare a specific molar concentration from dry powder or crystals.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-1">
              <span className="font-bold text-emerald-900 block">The Golden Molarity Formula</span>
              <div className="font-mono text-sm font-black text-emerald-950 py-1">Grams = M × V(L) × MW</div>
              <p className="text-emerald-800 text-[11px]">
                <strong>M</strong> = Molarity (mol/L), <strong>V(L)</strong> = Volume in LITERS, <strong>MW</strong> = Molecular Weight (g/mol).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs space-y-1">
              <span className="font-bold text-rose-900 block">#1 Most Common Student Trap</span>
              <div className="font-mono text-sm font-black text-rose-950 py-1">Liters = mL ÷ 1000</div>
              <p className="text-rose-800 text-[11px]">
                Never plug milliliters directly into the molarity formula! 250 mL must be converted to <strong>0.250 L</strong>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs space-y-1">
              <span className="font-bold text-blue-900 block">Dimensional Analysis Chain</span>
              <div className="font-mono text-[11px] text-blue-950 py-1">
                (mol / L) × L × (g / mol) = <strong>grams</strong>
              </div>
              <p className="text-blue-800 text-[11px]">
                Liters cancel Liters; Moles cancel Moles; leaving only mass in grams.
              </p>
            </div>
          </div>

          {/* Step-by-Step Worked Example */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleExample('ex_molarity_1')}
              className="w-full bg-slate-50 hover:bg-slate-100 p-4 flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-xs font-bold">
                  Worked Example 2
                </span>
                <span className="text-xs font-bold text-slate-900">
                  Preparing 250 mL of 0.50 M Tris Base (MW = 121.14 g/mol)
                </span>
              </div>
              {expandedExamples['ex_molarity_1'] ? (
                <ChevronUp className="w-4 h-4 text-slate-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-500" />
              )}
            </button>

            {expandedExamples['ex_molarity_1'] && (
              <div className="p-5 space-y-4 text-xs text-slate-700 bg-white">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
                  <strong>Scenario: </strong>
                  <span>
                    You are asked to prepare 250 mL of 0.50 M Tris buffer for enzymatic digestion. The bottle of Tris Base shows MW = 121.14 g/mol. How many grams of Tris must you weigh on the analytical balance?
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="font-bold text-slate-900">Step 1: Convert Milliliters to Liters</div>
                  <div className="bg-slate-100 p-2.5 rounded font-mono text-[11px]">
                    Volume = 250 mL ÷ 1000 = <strong>0.250 L</strong>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="font-bold text-slate-900">Step 2: Apply the Molarity Mass Formula</div>
                  <div className="bg-slate-900 text-emerald-300 font-mono p-3 rounded-xl space-y-1">
                    <div>Mass (g) = Molarity (mol/L) × Volume (L) × Molecular Weight (g/mol)</div>
                    <div>Mass (g) = 0.50 mol/L × 0.250 L × 121.14 g/mol</div>
                    <div>Mass (g) = 0.125 mol × 121.14 g/mol</div>
                    <div className="text-white font-black text-sm pt-1">Mass = 15.14 g of Tris Base</div>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950">
                  <strong>Bench Protocol Steps: </strong>
                  Tare a weigh boat on the balance. Weigh 15.14 g of Tris Base powder. Add to a beaker with ~180 mL of dH₂O and a magnetic stir bar. Adjust pH to 8.0 using concentrated HCl. Transfer to a 250 mL volumetric flask, QS with dH₂O to the 250 mL mark, and mix.
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CATEGORY 3: PERCENT SOLUTIONS */}
      {activeCategory === 'percent' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
            <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800">
              <Percent className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">
                Percent Solutions: % Weight/Volume & % Volume/Volume
              </h3>
              <p className="text-xs text-slate-500">
                By international bio-laboratory definition, percent means "parts per 100 parts total".
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs space-y-1.5">
              <span className="font-bold text-amber-900 block">% Weight/Volume (% w/v)</span>
              <div className="font-mono text-sm font-black text-amber-950">
                Grams Solute = (% w/v × Target Volume mL) ÷ 100
              </div>
              <p className="text-amber-800 text-[11px]">
                A 1% (w/v) solution contains <strong>1 gram of solute in 100 mL</strong> of total solution. Used for agarose gels, SDS, and NaCl salt solutions.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs space-y-1.5">
              <span className="font-bold text-blue-900 block">% Volume/Volume (% v/v)</span>
              <div className="font-mono text-sm font-black text-blue-950">
                mL Liquid Solute = (% v/v × Target Volume mL) ÷ 100
              </div>
              <p className="text-blue-800 text-[11px]">
                A 1% (v/v) solution contains <strong>1 mL of pure liquid solute in 100 mL</strong> of total solution. Used for alcohols (ethanol, isopropanol), glycerol, and Triton X-100.
              </p>
            </div>
          </div>

          {/* Step-by-Step Worked Example */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleExample('ex_percent_1')}
              className="w-full bg-slate-50 hover:bg-slate-100 p-4 flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-mono text-xs font-bold">
                  Worked Example 3
                </span>
                <span className="text-xs font-bold text-slate-900">
                  Casting a 1.5% (w/v) Agarose Gel in 40.0 mL of 1X TAE Buffer
                </span>
              </div>
              {expandedExamples['ex_percent_1'] ? (
                <ChevronUp className="w-4 h-4 text-slate-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-500" />
              )}
            </button>

            {expandedExamples['ex_percent_1'] && (
              <div className="p-5 space-y-4 text-xs text-slate-700 bg-white">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
                  <strong>Scenario: </strong>
                  <span>
                    For Station 3 Agarose Gel Electrophoresis, you must prepare a 1.5% agarose mini-gel with a total volume of 40.0 mL of 1X TAE buffer. How many grams of agarose powder should you weigh out?
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="font-bold text-slate-900">Step 1: Set Up the % (w/v) Equation</div>
                  <div className="bg-slate-900 text-amber-300 font-mono p-3 rounded-xl space-y-1">
                    <div>Mass (g) = (Percent % × Volume in mL) ÷ 100</div>
                    <div>Mass (g) = (1.5 × 40.0 mL) ÷ 100</div>
                    <div className="text-white font-black text-sm pt-1">Mass = 0.60 g of Agarose Powder</div>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-950">
                  <strong>Bench Tip: </strong>
                  Weigh exactly 0.60 g of agarose powder on an analytical balance. Add to an Erlenmeyer flask with 40.0 mL of 1X TAE buffer. Microwave in 15-second intervals with swirling until completely molten and crystal clear, cool to ~55°C, add DNA stain, and cast with comb.
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CATEGORY 4: SERIAL DILUTIONS */}
      {activeCategory === 'serial' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
            <div className="p-2.5 rounded-xl bg-purple-100 text-purple-800">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">
                Serial Dilutions: Tube Dilution Factors & Plating CFU/mL
              </h3>
              <p className="text-xs text-slate-500">
                Stepwise geometric reduction of analyte concentration across a sequence of tubes with identical diluent volumes.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 text-xs space-y-1">
              <span className="font-bold text-purple-900 block">Individual Tube Dilution (TDF)</span>
              <div className="font-mono text-sm font-black text-purple-950 py-1">
                TDF = V_transfer ÷ (V_transfer + V_diluent)
              </div>
              <p className="text-purple-800 text-[11px]">
                Example: 100 µL transfer into 900 µL water = 100 / 1000 = <strong>1:10 (or 10⁻¹)</strong>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs space-y-1">
              <span className="font-bold text-blue-900 block">Cumulative Dilution Factor (CDF)</span>
              <div className="font-mono text-sm font-black text-blue-950 py-1">CDF_n = CDF_(n-1) × TDF_n</div>
              <p className="text-blue-800 text-[11px]">
                Multiply each tube dilution factor sequentially: 10⁻¹ × 10⁻¹ × 10⁻¹ = <strong>10⁻³ (1:1,000)</strong>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-1">
              <span className="font-bold text-emerald-900 block">Bacterial Plating CFU/mL</span>
              <div className="font-mono text-sm font-black text-emerald-950 py-1">
                CFU/mL = Colonies ÷ (Vol_plated × CDF)
              </div>
              <p className="text-emerald-800 text-[11px]">
                Only plates with <strong>30 to 300 colonies</strong> are statistically valid (Biotility standard).
              </p>
            </div>
          </div>

          {/* Step-by-Step Worked Example */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleExample('ex_serial_1')}
              className="w-full bg-slate-50 hover:bg-slate-100 p-4 flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-mono text-xs font-bold">
                  Worked Example 4
                </span>
                <span className="text-xs font-bold text-slate-900">
                  Determining E. coli Stock Titer from a 10-Fold Serial Dilution Series
                </span>
              </div>
              {expandedExamples['ex_serial_1'] ? (
                <ChevronUp className="w-4 h-4 text-slate-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-500" />
              )}
            </button>

            {expandedExamples['ex_serial_1'] && (
              <div className="p-5 space-y-4 text-xs text-slate-700 bg-white">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
                  <strong>Scenario: </strong>
                  <span>
                    You perform a 10-fold serial dilution by transferring 100 µL into 900 µL of sterile saline across 5 tubes (Tubes 1–5). You plate 100 µL (0.10 mL) from Tube 4 (10⁻⁴ dilution) onto an LB agar plate. After incubation, you count <strong>142 colonies</strong>. What is the CFU/mL in the original culture?
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="font-bold text-slate-900">Step 1: Check Plate Validity</div>
                  <div className="bg-slate-100 p-2.5 rounded font-mono text-[11px]">
                    142 colonies falls within the valid BACE range of <strong>30 to 300 colonies</strong>.
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="font-bold text-slate-900">Step 2: Calculate Original CFU/mL</div>
                  <div className="bg-slate-900 text-purple-300 font-mono p-3 rounded-xl space-y-1">
                    <div>CFU/mL = Colonies Counted ÷ [Volume Plated (mL) × Cumulative Dilution]</div>
                    <div>CFU/mL = 142 ÷ [0.10 mL × 10⁻⁴]</div>
                    <div>CFU/mL = 142 ÷ [1.0 × 10⁻⁵]</div>
                    <div className="text-white font-black text-sm pt-1">
                      Titer = 1.42 × 10⁷ CFU/mL (or 14,200,000 CFU/mL)
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Lesson Footer Actions */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-500">
          {isCompleted ? (
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Lesson completed and verified! Practice with randomized algorithmic drill generators.
            </span>
          ) : (
            <span>Master all 4 formula archetypes before tackling timed calculations.</span>
          )}
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => markBenchLessonComplete?.('lesson_math', !isCompleted)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isCompleted
                ? 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs'
            }`}
          >
            {isCompleted ? 'Unmark Completion' : '✓ Mark Lesson as Complete'}
          </button>

          {onLaunchDrill && (
            <button
              onClick={onLaunchDrill}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white flex items-center space-x-1.5 transition-all cursor-pointer shadow-xs"
            >
              <span>Practice Math Drills</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
