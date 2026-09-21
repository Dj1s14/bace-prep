import React, { useState } from 'react';
import {
  X,
  Search,
  Copy,
  Check,
  Calculator,
  FlaskConical,
  Zap,
  Scale,
  Sparkles,
  BookOpen,
  Info,
  Layers,
  Percent,
  Split,
} from 'lucide-react';

interface FormulaSheetDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormulaCard {
  id: string;
  category: 'solutions' | 'spectro' | 'centrifuge' | 'molecular' | 'cell';
  categoryLabel: string;
  title: string;
  formula: string;
  latex?: string;
  variables: { name: string; desc: string }[];
  description: string;
  baceContext: string;
  example: string;
}

const FORMULAS: FormulaCard[] = [
  {
    id: 'dilution',
    category: 'solutions',
    categoryLabel: 'Solutions & Buffers',
    title: 'Conservation of Mass (Dilutions)',
    formula: 'C₁ × V₁ = C₂ × V₂',
    variables: [
      { name: 'C₁', desc: 'Concentration of concentrated stock solution' },
      { name: 'V₁', desc: 'Volume of concentrated stock to pipet/measure' },
      { name: 'C₂', desc: 'Desired final working concentration' },
      { name: 'V₂', desc: 'Total desired final volume' },
      { name: 'V_solvent', desc: 'Diluent/water volume = V₂ - V₁' },
    ],
    description: 'Calculates the volume of stock solution required to prepare a less concentrated working solution.',
    baceContext: 'Station 1 preparation, 50X TAE buffer dilution to 1X, 10X PBS to 1X, antibiotic stocks.',
    example: 'To make 500 mL of 1X TAE from 50X stock: V₁ = (1X × 500 mL) ÷ 50X = 10 mL stock + 490 mL dH₂O.',
  },
  {
    id: 'molarity',
    category: 'solutions',
    categoryLabel: 'Solutions & Buffers',
    title: 'Molarity Mass Calculation',
    formula: 'Mass (grams) = M × V(L) × MW',
    variables: [
      { name: 'M', desc: 'Desired Molarity in moles per Liter (mol/L)' },
      { name: 'V(L)', desc: 'Solution volume in LITERS (mL ÷ 1000)' },
      { name: 'MW', desc: 'Molecular weight / formula weight in g/mol' },
    ],
    description: 'Determines the grams of solid crystalline solute to weigh on an analytical or top-loading balance.',
    baceContext: 'Domain 4 Bench Math: Tris base, NaCl, EDTA, SDS powder reagent formulations.',
    example: '250 mL of 0.50 M Tris Base (MW 121.14 g/mol): Mass = 0.50 × 0.250 L × 121.14 = 15.14 g.',
  },
  {
    id: 'percent_wv',
    category: 'solutions',
    categoryLabel: 'Solutions & Buffers',
    title: 'Percent Weight/Volume (% w/v)',
    formula: 'Mass (grams) = (% w/v × Target Volume mL) ÷ 100',
    variables: [
      { name: '% w/v', desc: 'Grams of solid solute per 100 mL total solution' },
      { name: 'Target Volume', desc: 'Total volume in milliliters (mL)' },
    ],
    description: 'Standard bio-laboratory percentage formula where 1% = 1.0 g per 100 mL of solution.',
    baceContext: 'Agarose gels (0.8% - 2.0%), SDS stocks (10% w/v), LB agar media.',
    example: 'Casting a 1.5% agarose gel in 40 mL buffer: Mass = (1.5 × 40) ÷ 100 = 0.60 g agarose.',
  },
  {
    id: 'percent_vv',
    category: 'solutions',
    categoryLabel: 'Solutions & Buffers',
    title: 'Percent Volume/Volume (% v/v)',
    formula: 'Volume Solute (mL) = (% v/v × Target Volume mL) ÷ 100',
    variables: [
      { name: '% v/v', desc: 'Milliliters of pure liquid solute per 100 mL solution' },
      { name: 'Target Volume', desc: 'Total volume in milliliters (mL)' },
      { name: 'V_solvent', desc: 'Solvent volume = Target Volume - Solute Volume' },
    ],
    description: 'Calculates the volume of liquid solute (ethanol, isopropanol, glycerol, detergents).',
    baceContext: '70% ethanol bench disinfectant, 10% glycerol cryoprotectant, 0.1% Triton X-100.',
    example: 'Making 200 mL of 70% ethanol: Volume pure ethanol = (70 × 200) ÷ 100 = 140 mL + 60 mL dH₂O.',
  },
  {
    id: 'beer_lambert',
    category: 'spectro',
    categoryLabel: 'Spectrophotometry',
    title: 'Beer-Lambert Law (Absorbance)',
    formula: 'A = ε × c × l',
    variables: [
      { name: 'A', desc: 'Absorbance (dimensionless optical density units)' },
      { name: 'ε (epsilon)', desc: 'Molar absorptivity / extinction coefficient (L·mol⁻¹·cm⁻¹)' },
      { name: 'c', desc: 'Concentration of analyte (mol/L or mg/mL)' },
      { name: 'l', desc: 'Path length of the cuvette (standard = 1.0 cm)' },
      { name: '%T', desc: 'Transmittance: %T = 10^(-A) × 100%' },
    ],
    description: 'Linear relationship between light absorption and the concentration of an absorbing solute.',
    baceContext: 'Standard curve quantification, Bradford BSA assays, NanoDrop nucleic acid quantification.',
    example: 'If slope m = 0.00125 A/(µg/mL) and blank-corrected A = 0.375, then c = 0.375 ÷ 0.00125 = 300 µg/mL.',
  },
  {
    id: 'purity_ratios',
    category: 'spectro',
    categoryLabel: 'Spectrophotometry',
    title: 'Nucleic Acid Purity Ratios (A260 / A280)',
    formula: 'Ratio = Absorbance at 260 nm ÷ Absorbance at 280 nm',
    variables: [
      { name: 'A260', desc: 'Absorption peak for purine/pyrimidine aromatic rings in DNA/RNA' },
      { name: 'A280', desc: 'Absorption peak for aromatic amino acids (Trp, Tyr, Phe) in proteins' },
      { name: 'Pure DNA', desc: 'Ratio = 1.80 (acceptable range: 1.70 - 1.90)' },
      { name: 'Pure RNA', desc: 'Ratio = 2.00 (acceptable range: 1.90 - 2.10)' },
      { name: '< 1.60', desc: 'Indicates residual protein or phenol contamination' },
    ],
    description: 'Evaluates quality and purity of extracted plasmid DNA or total cellular RNA.',
    baceContext: 'Station 3 DNA extraction QC, PCR template qualification.',
    example: 'Plasmid sample: A260 = 0.900, A280 = 0.500 → Ratio = 1.80 (pure double-stranded DNA).',
  },
  {
    id: 'centrifuge_rcf',
    category: 'centrifuge',
    categoryLabel: 'Centrifugation',
    title: 'Relative Centrifugal Force (RCF / g-force)',
    formula: 'RCF = 1.118 × 10⁻⁵ × r × (RPM)²',
    variables: [
      { name: 'RCF', desc: 'Relative centrifugal force in units of gravity (× g)' },
      { name: 'r', desc: 'Rotor radius measured in CENTIMETERS (cm) from central axis to tube bottom' },
      { name: 'RPM', desc: 'Rotations per minute of the centrifuge rotor' },
      { name: 'Solve RPM', desc: 'RPM = √[ RCF ÷ (1.118 × 10⁻⁵ × r) ]' },
    ],
    description: 'Converts instrument speed (RPM) to true gravitational force (RCF) for cross-lab protocol reproducibility.',
    baceContext: 'Domain 7 Standard Equipment: Pellet collection, plasmid miniprep spin columns, cell harvest.',
    example: 'Rotor with r = 8.0 cm spinning at 14,000 RPM: RCF = 1.118×10⁻⁵ × 8.0 × (14000)² = 17,530 × g.',
  },
  {
    id: 'semi_log_gel',
    category: 'molecular',
    categoryLabel: 'Gel Electrophoresis',
    title: 'Semi-Log DNA Band Sizing Interpolation',
    formula: 'log₁₀(Size in bp) = -m × (Migration Distance in mm) + b',
    variables: [
      { name: 'Distance (mm)', desc: 'Linear migration distance from well bottom to band center' },
      { name: 'log₁₀(bp)', desc: 'Log base 10 of DNA fragment molecular weight' },
      { name: 'Linearity', desc: 'Inverse linear relationship between log(bp) and distance in pore matrix' },
    ],
    description: 'Accurately determines unknown DNA fragment or PCR amplicon sizes from a standard molecular weight ladder.',
    baceContext: 'Station 3 Agarose Gel Electrophoresis, restriction digest mapping.',
    example: 'Band migrating 34 mm interpolates to log₁₀(bp) = 3.301 → Size = 10^(3.301) = 2,000 bp.',
  },
  {
    id: 'cfu_plating',
    category: 'cell',
    categoryLabel: 'Microbiology & Plating',
    title: 'Colony Forming Units Titer (CFU/mL)',
    formula: 'CFU/mL = Colonies Counted ÷ [Volume Plated (mL) × Cumulative Dilution]',
    variables: [
      { name: 'Colonies', desc: 'Count must be between 30 and 300 colonies for statistical validity' },
      { name: 'Volume Plated', desc: 'Volume spread on agar plate in mL (e.g. 100 µL = 0.10 mL)' },
      { name: 'Cumulative Dilution', desc: 'Total dilution factor of the plated tube (e.g. 10⁻⁴ or 1:10,000)' },
    ],
    description: 'Quantifies viable bacterial cell density from serial dilution plating.',
    baceContext: 'Station 2 bacterial transformation efficiency, cell banking bioburden.',
    example: '142 colonies on plate from 0.10 mL of 10⁻⁴ dilution: CFU/mL = 142 ÷ (0.10 × 10⁻⁴) = 1.42 × 10⁷ CFU/mL.',
  },
];

export const FormulaSheetDrawer: React.FC<FormulaSheetDrawerProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'All Formulas' },
    { id: 'solutions', label: 'Solutions & Math' },
    { id: 'spectro', label: 'Spectrophotometry' },
    { id: 'centrifuge', label: 'Centrifugation' },
    { id: 'molecular', label: 'Gel & Molecular' },
    { id: 'cell', label: 'Microbiology' },
  ];

  const filtered = FORMULAS.filter((f) => {
    const matchesCategory = selectedCategory === 'all' || f.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      f.title.toLowerCase().includes(q) ||
      f.formula.toLowerCase().includes(q) ||
      f.description.toLowerCase().includes(q) ||
      f.baceContext.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (formula: FormulaCard) => {
    navigator.clipboard?.writeText?.(formula.formula);
    setCopiedId(formula.id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity cursor-pointer"
      />

      {/* Slide-over Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-white shadow-2xl flex flex-col border-l border-slate-200">
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white flex items-center justify-between">
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30">
                <BookOpen className="w-3 h-3 text-blue-400" />
                <span>BACE Exam Reference Quick-Sheet</span>
              </div>
              <h3 className="text-xl font-black text-white">Laboratory Metrology & Formulas</h3>
              <p className="text-xs text-slate-300">
                Authorized equations, unit conversions, and constants for written & practical stations.
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Close Reference Sheet"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="p-4 border-b border-slate-200 bg-slate-50 space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search formulas, variables, Beer-Lambert, RCF, dilutions..."
                className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Formulas List (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {filtered.length === 0 ? (
              <div className="text-center py-12 text-slate-500 space-y-2">
                <Info className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-sm font-semibold">No formulas matched your search</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="text-xs text-blue-600 font-bold hover:underline"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              filtered.map((formula) => (
                <div
                  key={formula.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                        {formula.categoryLabel}
                      </span>
                      <h4 className="text-sm font-black text-slate-900 mt-1">{formula.title}</h4>
                    </div>

                    <button
                      onClick={() => handleCopy(formula)}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center space-x-1 transition-colors cursor-pointer"
                      title="Copy formula text"
                    >
                      {copiedId === formula.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-bold">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Formula Callout Box */}
                  <div className="bg-slate-900 text-emerald-300 p-3.5 rounded-xl font-mono text-sm sm:text-base font-bold text-center tracking-wide shadow-inner">
                    {formula.formula}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed">{formula.description}</p>

                  {/* Variables Legend */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      Variables & Definitions:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
                      {formula.variables.map((v, i) => (
                        <div key={i} className="flex items-start space-x-1.5">
                          <span className="font-mono font-bold text-blue-900 shrink-0">{v.name}:</span>
                          <span className="text-slate-600">{v.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Worked Example */}
                  <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/60 text-xs text-amber-950 space-y-1">
                    <span className="font-bold text-amber-900 flex items-center gap-1 text-[11px]">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Worked BACE Example:</span>
                    </span>
                    <p className="text-[11px] text-amber-900/90 leading-relaxed font-mono">
                      {formula.example}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Note */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span>Formulas conform to Biotility BACE Academic Standards</span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold cursor-pointer transition-colors"
            >
              Close Quick-Sheet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
