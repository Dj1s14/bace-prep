import React, { useState, useEffect } from 'react';
import {
  Calculator,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Flame,
  Award,
  Sparkles,
  BookOpen,
  Split,
  Percent,
  Layers,
  ArrowRightLeft,
  ChevronDown,
  ChevronUp,
  FileSpreadsheet,
  Delete,
} from 'lucide-react';
import { BenchMathCategory, BenchMathProblem } from './types';
import { useApp } from '../../context/AppContext';

// Common Lab Reagents with precise Molecular Weights
export const LAB_REAGENTS = [
  { name: 'Sodium Chloride (NaCl)', formula: 'NaCl', mw: 58.44, defaultMolarity: [0.15, 0.5, 1.0, 5.0] },
  { name: 'Tris Base (Hydroxymethyl aminomethane)', formula: 'C4H11NO3', mw: 121.14, defaultMolarity: [0.05, 0.1, 0.5, 1.0] },
  { name: 'EDTA Disodium Salt Dihydrate', formula: 'C10H14N2Na2O8·2H2O', mw: 372.24, defaultMolarity: [0.05, 0.2, 0.5] },
  { name: 'D-Glucose (Dextrose)', formula: 'C6H12O6', mw: 180.16, defaultMolarity: [0.05, 0.1, 0.25, 1.0] },
  { name: 'Sodium Hydroxide (NaOH)', formula: 'NaOH', mw: 40.00, defaultMolarity: [0.1, 0.5, 1.0, 5.0] },
  { name: 'Sodium Acetate Trihydrate', formula: 'CH3COONa·3H2O', mw: 136.08, defaultMolarity: [0.1, 0.3, 3.0] },
  { name: 'Ammonium Sulfate', formula: '(NH4)2SO4', mw: 132.14, defaultMolarity: [0.5, 1.0, 2.0] },
];

/**
 * Generator for authentic randomized Bench Math problems.
 */
export function generateMathProblem(category?: BenchMathCategory): BenchMathProblem {
  const categories: BenchMathCategory[] = ['dilution', 'molarity', 'percent', 'serial'];
  const cat = category || categories[Math.floor(Math.random() * categories.length)];

  if (cat === 'dilution') {
    // C1V1 = C2V2
    const subTypes = ['find_v1', 'find_c2', 'buffer_x'];
    const subType = subTypes[Math.floor(Math.random() * subTypes.length)];

    if (subType === 'buffer_x') {
      // Stock concentrated buffer, e.g. 50X TAE to 1X in 500 mL or 1000 mL
      const stockFactors = [10, 20, 50, 100];
      const stockX = stockFactors[Math.floor(Math.random() * stockFactors.length)];
      const targetVolMl = [250, 500, 1000, 2000][Math.floor(Math.random() * 4)];
      const answerV1Ml = targetVolMl / stockX;
      const bufferName = stockX === 50 ? '50X TAE Buffer' : stockX === 10 ? '10X PBS Buffer' : `${stockX}X SSC Buffer`;

      return {
        id: `dil_${Date.now()}_${Math.random()}`,
        category: 'dilution',
        categoryTitle: 'Buffer Dilution (C1V1 = C2V2)',
        title: `Preparing 1X Working Solution from ${stockX}X Stock`,
        scenario: `You are assigned to run an agarose gel electrophoresis or wash membrane blots. You need to prepare ${targetVolMl} mL of a 1X working buffer from a concentrated ${bufferName} stock solution.`,
        question: `How many mL of the concentrated ${stockX}X stock buffer must be measured?`,
        targetUnit: 'mL',
        correctAnswer: answerV1Ml,
        tolerance: 0.1,
        formulaName: 'Dilution Equation',
        formulaLatex: 'C₁V₁ = C₂V₂ \\implies V₁ = (C₂ \\times V₂) / C₁',
        givenVariables: [
          { label: 'Stock Concentration (C₁)', value: `${stockX}X` },
          { label: 'Desired Concentration (C₂)', value: '1X' },
          { label: 'Desired Final Volume (V₂)', value: `${targetVolMl} mL` },
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Identify the known variables',
            explanation: 'Assign given values into standard dilution notation.',
            mathExpression: `C₁ = ${stockX}X, \\quad C₂ = 1X, \\quad V₂ = ${targetVolMl}\\text{ mL}`,
          },
          {
            stepNumber: 2,
            title: 'Rearrange equation for stock volume (V₁)',
            explanation: 'Divide both sides by stock concentration C₁.',
            mathExpression: `V₁ = \\frac{C₂ \\times V₂}{C₁} = \\frac{1X \\times ${targetVolMl}\\text{ mL}}{${stockX}X}`,
          },
          {
            stepNumber: 3,
            title: 'Compute final stock aliquot',
            explanation: `Divide ${targetVolMl} by ${stockX}.`,
            mathExpression: `V₁ = ${answerV1Ml}\\text{ mL}`,
          },
        ],
        practicalTip: `Measure ${answerV1Ml} mL of ${stockX}X stock using a graduated cylinder. Add ${targetVolMl - answerV1Ml} mL of deionized water to reach exactly ${targetVolMl} mL final volume.`,
        baceCompetency: 'Domain 4: Applied Mathematics - Dilution Equations & Volumetric Transfers',
      };
    } else if (subType === 'find_v1') {
      // Stock Molarity to Working Molarity: e.g. 5.0 M NaCl to 150 mM in 200 mL
      const c1M = [1.0, 2.0, 3.0, 5.0][Math.floor(Math.random() * 4)];
      const c2Mm = [50, 100, 150, 200, 250][Math.floor(Math.random() * 5)];
      const c2M = c2Mm / 1000;
      const v2Ml = [100, 250, 500][Math.floor(Math.random() * 3)];
      const answerV1Ml = Math.round(((c2M * v2Ml) / c1M) * 100) / 100;

      return {
        id: `dil_${Date.now()}_${Math.random()}`,
        category: 'dilution',
        categoryTitle: 'Molar Solution Dilution',
        title: `Preparing ${c2Mm} mM Solution from ${c1M} M Stock`,
        scenario: `A molecular biology assay requires ${v2Ml} mL of a ${c2Mm} mM NaCl working solution. You have a bottle of ${c1M}.0 M NaCl stock solution on the chemical shelf.`,
        question: `What volume (in mL) of the ${c1M}.0 M NaCl stock solution is required?`,
        targetUnit: 'mL',
        correctAnswer: answerV1Ml,
        tolerance: 0.1,
        formulaName: 'Dilution Equation with Unit Conversion',
        formulaLatex: 'C₁V₁ = C₂V₂',
        givenVariables: [
          { label: 'Stock Concentration (C₁)', value: `${c1M}.0 M` },
          { label: 'Target Working Concentration (C₂)', value: `${c2Mm} mM = ${c2M} M` },
          { label: 'Final Working Volume (V₂)', value: `${v2Ml} mL` },
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Convert units to match',
            explanation: 'Both concentrations must be in the same unit (Molar). Divide mM by 1000.',
            mathExpression: `${c2Mm}\\text{ mM} \\div 1000 = ${c2M}\\text{ M}`,
          },
          {
            stepNumber: 2,
            title: 'Substitute into C₁V₁ = C₂V₂',
            explanation: 'Solve for the required stock volume V₁ in mL.',
            mathExpression: `V₁ = \\frac{${c2M}\\text{ M} \\times ${v2Ml}\\text{ mL}}{${c1M}.0\\text{ M}}`,
          },
          {
            stepNumber: 3,
            title: 'Calculate stock volume',
            explanation: 'Perform arithmetic and round to two decimal places.',
            mathExpression: `V₁ = ${answerV1Ml}\\text{ mL}`,
          },
        ],
        practicalTip: `Always confirm your units match before multiplying: 1 M = 1,000 mM = 1,000,000 µM. Pipette ${answerV1Ml} mL of stock, then q.s. (quantum satis) with purified water to ${v2Ml} mL.`,
        baceCompetency: 'Domain 4: Applied Mathematics - Stock to Working Dilution',
      };
    } else {
      // Find final concentration C2: e.g. 50 µL of 10 mg/mL BSA diluted into 950 µL water
      const c1 = [2, 5, 10, 20][Math.floor(Math.random() * 4)]; // mg/mL
      const v1U = [20, 25, 50, 100][Math.floor(Math.random() * 4)]; // µL
      const diluentU = [180, 475, 950, 900][Math.floor(Math.random() * 4)]; // µL
      const v2U = v1U + diluentU;
      const c2 = Math.round(((c1 * v1U) / v2U) * 1000) / 1000;

      return {
        id: `dil_${Date.now()}_${Math.random()}`,
        category: 'dilution',
        categoryTitle: 'Protein Standard Dilution',
        title: 'Determining Working Concentration (C₂)',
        scenario: `For a Bradford protein quantitation assay, a candidate adds ${v1U} µL of a ${c1} mg/mL Bovine Serum Albumin (BSA) stock into a microcentrifuge tube containing ${diluentU} µL of deionized water.`,
        question: `What is the final concentration of BSA in the diluted sample in mg/mL?`,
        targetUnit: 'mg/mL',
        correctAnswer: c2,
        tolerance: 0.02,
        formulaName: 'Final Concentration Equation',
        formulaLatex: 'C₂ = (C₁ \\times V₁) / V_\\text{total}',
        givenVariables: [
          { label: 'Stock Concentration (C₁)', value: `${c1} mg/mL` },
          { label: 'Aliquot Volume (V₁)', value: `${v1U} µL` },
          { label: 'Diluent Volume', value: `${diluentU} µL` },
          { label: 'Total Volume (V₂)', value: `${v1U} + ${diluentU} = ${v2U} µL` },
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Calculate total final volume (V₂)',
            explanation: 'Total volume is the aliquot plus the added diluent.',
            mathExpression: `V₂ = ${v1U}\\text{ µL} + ${diluentU}\\text{ µL} = ${v2U}\\text{ µL}`,
          },
          {
            stepNumber: 2,
            title: 'Apply C₁V₁ = C₂V₂',
            explanation: 'Isolate C₂ by dividing numerator by total volume.',
            mathExpression: `C₂ = \\frac{${c1}\\text{ mg/mL} \\times ${v1U}\\text{ µL}}{${v2U}\\text{ µL}}`,
          },
          {
            stepNumber: 3,
            title: 'Solve for working concentration',
            explanation: 'Compute result.',
            mathExpression: `C₂ = ${c2}\\text{ mg/mL}`,
          },
        ],
        practicalTip: 'Notice how the µL units in the numerator and denominator cancel out, leaving mg/mL directly. Never forget to add aliquot volume to diluent volume to find total V₂!',
        baceCompetency: 'Domain 4: Applied Mathematics - Spectrophotometry & Protein Assay Dilutions',
      };
    }
  } else if (cat === 'molarity') {
    // g = M * L * MW
    const reagent = LAB_REAGENTS[Math.floor(Math.random() * LAB_REAGENTS.length)];
    const targetM = reagent.defaultMolarity[Math.floor(Math.random() * reagent.defaultMolarity.length)];
    const targetVolMl = [100, 250, 500, 1000][Math.floor(Math.random() * 4)];
    const targetVolL = targetVolMl / 1000;
    const requiredGrams = Math.round(targetM * targetVolL * reagent.mw * 100) / 100;

    return {
      id: `mol_${Date.now()}_${Math.random()}`,
      category: 'molarity',
      categoryTitle: 'Molarity & Solute Mass',
      title: `Preparing ${targetVolMl} mL of ${targetM} M ${reagent.name}`,
      scenario: `You are instructed by the SOP to prepare ${targetVolMl} mL of a ${targetM} M solution of ${reagent.name} (${reagent.formula}). The molecular weight (MW) printed on the chemical container is ${reagent.mw} g/mol.`,
      question: `How many grams (g) of ${reagent.name} must be weighed out on the analytical balance?`,
      targetUnit: 'g',
      correctAnswer: requiredGrams,
      tolerance: 0.05,
      formulaName: 'Solute Mass Formula (Molarity)',
      formulaLatex: '\\text{Mass (g)} = \\text{Molarity (mol/L)} \\times \\text{Volume (L)} \\times \\text{MW (g/mol)}',
      givenVariables: [
        { label: 'Target Molarity (M)', value: `${targetM} mol/L` },
        { label: 'Target Volume', value: `${targetVolMl} mL = ${targetVolL} L` },
        { label: 'Molecular Weight (MW)', value: `${reagent.mw} g/mol` },
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Convert volume from mL to Liters (L)',
          explanation: 'Molarity is moles per liter, so milliliters must be converted to liters.',
          mathExpression: `${targetVolMl}\\text{ mL} \\div 1000 = ${targetVolL}\\text{ L}`,
        },
        {
          stepNumber: 2,
          title: 'Dimensional Analysis Setup',
          explanation: 'Multiply Molarity (mol/L) × Volume (L) × Molecular Weight (g/mol).',
          mathExpression: `\\text{Mass} = (${targetM}\\text{ mol/L}) \\times (${targetVolL}\\text{ L}) \\times (${reagent.mw}\\text{ g/mol})`,
        },
        {
          stepNumber: 3,
          title: 'Calculate Grams Required',
          explanation: 'Liters cancel, moles cancel, leaving grams.',
          mathExpression: `\\text{Mass} = ${requiredGrams}\\text{ grams}`,
        },
      ],
      practicalTip: `Bench Technique: Weigh ${requiredGrams} g into a weigh boat. Dissolve in ~70-80% of the target water volume (${Math.round(targetVolMl * 0.75)} mL) with a magnetic stir bar. Adjust pH if specified in the SOP, then transfer to a volumetric flask and q.s. to exactly ${targetVolMl} mL.`,
      baceCompetency: 'Domain 4: Applied Mathematics - Molarity Calculations & Solution Preparation',
    };
  } else if (cat === 'percent') {
    // w/v or v/v
    const isWv = Math.random() > 0.4;

    if (isWv) {
      // Agarose gel or SDS: e.g. 1.2% (w/v) in 50 mL or 2.0% in 150 mL
      const pct = [0.8, 1.0, 1.2, 1.5, 2.0, 10.0][Math.floor(Math.random() * 6)];
      const volMl = [50, 60, 100, 150, 250, 500][Math.floor(Math.random() * 6)];
      const grams = Math.round(pct * (volMl / 100) * 100) / 100;
      const solute = pct === 10.0 ? 'Sodium Dodecyl Sulfate (SDS)' : pct <= 2.0 ? 'Agarose powder' : 'LB Agar';

      return {
        id: `pct_${Date.now()}_${Math.random()}`,
        category: 'percent',
        categoryTitle: 'Weight-to-Volume (% w/v)',
        title: `Casting a ${pct}% (w/v) ${solute} Solution`,
        scenario: `Before running a restriction digest analysis, a candidate must prepare ${volMl} mL of a ${pct}% (w/v) ${solute} solution in 1X running buffer.`,
        question: `How many grams of ${solute} powder should be weighed out?`,
        targetUnit: 'g',
        correctAnswer: grams,
        tolerance: 0.02,
        formulaName: '% (w/v) Concentration Equation',
        formulaLatex: '\\% (w/v) = \\frac{\\text{grams solute}}{100\\text{ mL solution}} \\implies \\text{grams} = \\% \\times \\frac{\\text{Volume (mL)}}{100}',
        givenVariables: [
          { label: 'Percent Concentration', value: `${pct}% (w/v) = ${pct} g / 100 mL` },
          { label: 'Required Solution Volume', value: `${volMl} mL` },
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Recall definition of % (w/v)',
            explanation: '1% (w/v) is defined as 1 gram of solute in 100 mL of solution.',
            mathExpression: `${pct}\\%\\text{ (w/v)} = \\frac{${pct}\\text{ g}}{100\\text{ mL}}`,
          },
          {
            stepNumber: 2,
            title: 'Set up proportion for total volume',
            explanation: `Multiply grams per 100 mL by ${volMl} mL / 100 mL.`,
            mathExpression: `\\text{Grams} = ${pct}\\text{ g} \\times \\left(\\frac{${volMl}\\text{ mL}}{100\\text{ mL}}\\right) = ${pct} \\times ${volMl / 100}`,
          },
          {
            stepNumber: 3,
            title: 'Calculate solute mass',
            explanation: 'Perform arithmetic.',
            mathExpression: `\\text{Grams} = ${grams}\\text{ g}`,
          },
        ],
        practicalTip: 'For agarose gels: add agarose to buffer, microwave with loose cap until completely transparent and free of optical flecks, cool to ~55°C before adding DNA stain (e.g. GelGreen / Ethidium Bromide) and pouring into casting tray.',
        baceCompetency: 'Domain 4: Applied Mathematics - Percent Solutions (w/v)',
      };
    } else {
      // v/v percent solution: e.g. 70% ethanol from 95% or 100% stock
      const stockPct = [95, 100][Math.floor(Math.random() * 2)];
      const targetPct = [70, 75][Math.floor(Math.random() * 2)];
      const totalVolMl = [200, 500, 1000][Math.floor(Math.random() * 3)];
      const stockMl = Math.round(((targetPct * totalVolMl) / stockPct) * 10) / 10;

      return {
        id: `pct_${Date.now()}_${Math.random()}`,
        category: 'percent',
        categoryTitle: 'Volume-to-Volume (% v/v)',
        title: `Preparing ${totalVolMl} mL of ${targetPct}% (v/v) Ethanol from ${stockPct}% Stock`,
        scenario: `To sanitize a biosafety cabinet (BSC) and bench surfaces, a biotechnician needs to prepare ${totalVolMl} mL of a ${targetPct}% (v/v) ethanol disinfectant solution using a stock bottle of ${stockPct}% (v/v) reagent-grade ethanol.`,
        question: `How many mL of ${stockPct}% ethanol stock solution must be measured?`,
        targetUnit: 'mL',
        correctAnswer: stockMl,
        tolerance: 0.2,
        formulaName: 'Volume-to-Volume Dilution (C1V1 = C2V2)',
        formulaLatex: 'C₁V₁ = C₂V₂ \\implies V₁ = (C₂ \\times V₂) / C₁',
        givenVariables: [
          { label: 'Stock Concentration (C₁)', value: `${stockPct}% (v/v)` },
          { label: 'Desired Sanitizing Concentration (C₂)', value: `${targetPct}% (v/v)` },
          { label: 'Total Volume Required (V₂)', value: `${totalVolMl} mL` },
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Apply C₁V₁ = C₂V₂ with percentage values',
            explanation: 'Both concentrations are expressed as % (v/v).',
            mathExpression: `(${stockPct}\\%)(V₁) = (${targetPct}\\%)(${totalVolMl}\\text{ mL})`,
          },
          {
            stepNumber: 2,
            title: 'Isolate stock volume V₁',
            explanation: `Divide numerator by ${stockPct}.`,
            mathExpression: `V₁ = \\frac{${targetPct} \\times ${totalVolMl}}{${stockPct}} = \\frac{${targetPct * totalVolMl}}{${stockPct}}`,
          },
          {
            stepNumber: 3,
            title: 'Calculate stock aliquot volume',
            explanation: 'Round to 1 decimal place.',
            mathExpression: `V₁ = ${stockMl}\\text{ mL}`,
          },
        ],
        practicalTip: `Measure ${stockMl} mL of ${stockPct}% ethanol in a graduated cylinder. Add deionized water until the meniscus reaches the ${totalVolMl} mL graduation mark. Note: 70% ethanol is more effective than 100% because water enables cell membrane penetration and coagulates bacterial proteins.`,
        baceCompetency: 'Domain 4: Applied Mathematics - Percent Solutions (v/v) & Aseptic Disinfection',
      };
    }
  } else {
    // Serial Dilutions
    const fold = [2, 5, 10][Math.floor(Math.random() * 3)];
    const numTubes = [4, 5, 6][Math.floor(Math.random() * 3)];
    const targetTube = Math.floor(Math.random() * (numTubes - 2)) + 2; // Tube 2, 3, or 4

    if (fold === 10) {
      // 10-fold serial dilution (e.g. bacterial colony counting)
      const stockCfu = [2.5, 3.2, 4.0, 5.5, 8.0][Math.floor(Math.random() * 5)];
      const exponent = [6, 7, 8][Math.floor(Math.random() * 3)]; // 10^6, 10^7, etc.
      // Tube 1 is undiluted stock, Tube 2 is 10^-1, Tube 3 is 10^-2, etc.
      // In Tube targetTube, dilution factor is 10^(-(targetTube - 1))
      const dilutionPower = targetTube - 1;
      const expectedCfu = Math.round(stockCfu * Math.pow(10, exponent - dilutionPower));

      return {
        id: `ser_${Date.now()}_${Math.random()}`,
        category: 'serial',
        categoryTitle: 'Serial Dilution (10-Fold)',
        title: `Bacterial CFU/mL in Tube #${targetTube}`,
        scenario: `A candidate sets up a 10-fold serial dilution series across ${numTubes} tubes. Tube 1 contains overnight E. coli culture with ${stockCfu} × 10^${exponent} CFU/mL. Exactly 100 µL is transferred from Tube 1 into 900 µL sterile saline in Tube 2, mixed thoroughly, and 100 µL is transferred sequentially down to Tube ${numTubes}.`,
        question: `What is the expected bacterial concentration in Tube #${targetTube} (in CFU/mL)? Enter the full integer or scientific number (e.g. if 40000 enter 40000).`,
        targetUnit: 'CFU/mL',
        correctAnswer: expectedCfu,
        tolerance: expectedCfu * 0.05,
        formulaName: 'Serial Dilution Factor Formula',
        formulaLatex: '\\text{DF}_\\text{tube} = (\\text{Individual DF})^{\\text{steps}}',
        givenVariables: [
          { label: 'Stock Concentration', value: `${stockCfu} × 10^${exponent} CFU/mL` },
          { label: 'Individual Dilution per Tube', value: '100 µL / (100 µL + 900 µL) = 1:10 (10⁻¹)' },
          { label: 'Target Tube', value: `Tube #${targetTube} (${dilutionPower} serial transfer steps)` },
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Determine individual tube dilution factor',
            explanation: 'Individual DF = Transfer Volume / Total Volume in Tube.',
            mathExpression: `\\text{DF} = \\frac{100\\text{ µL}}{1000\\text{ µL}} = \\frac{1}{10} = 10^{-1}`,
          },
          {
            stepNumber: 2,
            title: 'Calculate cumulative dilution factor for target tube',
            explanation: `Tube #${targetTube} has undergone ${dilutionPower} sequential 10-fold dilution steps.`,
            mathExpression: `\\text{Cumulative DF} = (10^{-1})^{${dilutionPower}} = 10^{-${dilutionPower}}`,
          },
          {
            stepNumber: 3,
            title: 'Multiply stock concentration by cumulative DF',
            explanation: 'Compute final CFU/mL.',
            mathExpression: `(${stockCfu} \\times 10^{${exponent}}) \\times 10^{-${dilutionPower}} = ${stockCfu} \\times 10^{${exponent - dilutionPower}} = ${expectedCfu}\\text{ CFU/mL}`,
          },
        ],
        practicalTip: 'Always change pipette tips between every serial transfer step! Using the same tip carries over residual liquid on the tip exterior, destroying the mathematical dilution gradient.',
        baceCompetency: 'Domain 4: Applied Mathematics - Serial Dilutions & Viable Plate Counting',
      };
    } else {
      // 2-fold serial dilution (e.g. antibody titer in ELISA)
      const stockUg = [160, 200, 320, 400, 640][Math.floor(Math.random() * 5)];
      const dilutionPower = targetTube - 1; // 2^dilutionPower
      const answer = Math.round((stockUg / Math.pow(2, dilutionPower)) * 100) / 100;

      return {
        id: `ser_${Date.now()}_${Math.random()}`,
        category: 'serial',
        categoryTitle: 'Two-Fold (1:2) Serial Dilution',
        title: `Antibody Titer Concentration in Tube #${targetTube}`,
        scenario: `For an ELISA antibody titer protocol, Tube 1 contains primary antibody stock at ${stockUg} µg/mL. Tubes 2 through ${numTubes} each contain 500 µL of assay diluent. A candidate transfers 500 µL sequentially from tube to tube (a 1:2 dilution at each step).`,
        question: `What is the antibody concentration in Tube #${targetTube} in µg/mL?`,
        targetUnit: 'µg/mL',
        correctAnswer: answer,
        tolerance: 0.1,
        formulaName: 'Two-Fold Serial Dilution Equation',
        formulaLatex: 'C_n = C_1 \\times \\left(\\frac{1}{2}\\right)^{n-1}',
        givenVariables: [
          { label: 'Stock Concentration (Tube 1)', value: `${stockUg} µg/mL` },
          { label: 'Individual Dilution Factor', value: '500 µL / 1000 µL = 1:2 (0.5)' },
          { label: 'Target Tube', value: `Tube #${targetTube} (${dilutionPower} dilution transfers)` },
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Identify number of 2-fold dilution transfers',
            explanation: `From Tube 1 to Tube #${targetTube} is ${dilutionPower} serial steps.`,
            mathExpression: `\\text{Dilution Factor} = 2^{${dilutionPower}} = ${Math.pow(2, dilutionPower)}`,
          },
          {
            stepNumber: 2,
            title: 'Divide stock concentration by dilution factor',
            explanation: `Divide ${stockUg} µg/mL by ${Math.pow(2, dilutionPower)}.`,
            mathExpression: `C_{${targetTube}} = \\frac{${stockUg}\\text{ µg/mL}}{${Math.pow(2, dilutionPower)}} = ${answer}\\text{ µg/mL}`,
          },
        ],
        practicalTip: 'Remember to mix each tube thoroughly (pipetting up and down 5 times or vortexing gently) before aspirating the aliquot for the next tube in the series.',
        baceCompetency: 'Domain 4: Applied Mathematics - Two-Fold Serial Dilution Series',
      };
    }
  }
}

export const BenchMathGenerator: React.FC = () => {
  const { recordBenchActivity } = useApp?.() || {};

  const [selectedCategory, setSelectedCategory] = useState<BenchMathCategory | 'all'>('all');
  const [problem, setProblem] = useState<BenchMathProblem>(() => generateMathProblem());
  const [studentAnswer, setStudentAnswer] = useState<string>('');
  const [evaluation, setEvaluation] = useState<{
    submitted: boolean;
    isCorrect: boolean;
    difference: number;
  } | null>(null);

  // Scratchpad and Lab Calculator State
  const [isScratchpadOpen, setIsScratchpadOpen] = useState<boolean>(false);
  const [calcDisplay, setCalcDisplay] = useState<string>('0');
  const [calcFormula, setCalcFormula] = useState<string>('');
  const [scratchpadNotes, setScratchpadNotes] = useState<string>('');

  // Unit Converter State
  const [converterType, setConverterType] = useState<'volume' | 'moles' | 'mass'>('volume');
  const [convertInput, setConvertInput] = useState<string>('1');

  // Stats
  const [streak, setStreak] = useState<number>(0);
  const [totalAttempts, setTotalAttempts] = useState<number>(0);
  const [correctAttempts, setCorrectAttempts] = useState<number>(0);

  const handleNextProblem = (cat?: BenchMathCategory | 'all') => {
    const categoryToUse = cat !== undefined ? cat : selectedCategory;
    setProblem(generateMathProblem(categoryToUse === 'all' ? undefined : categoryToUse));
    setStudentAnswer('');
    setEvaluation(null);
  };

  const handleCategoryChange = (cat: BenchMathCategory | 'all') => {
    setSelectedCategory(cat);
    handleNextProblem(cat);
  };

  const handleSubmitAnswer = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!studentAnswer.trim()) return;

    const parsed = parseFloat(studentAnswer.trim());
    if (isNaN(parsed)) return;

    setTotalAttempts((prev) => prev + 1);
    const expected = problem.correctAnswer;
    const diff = Math.abs(parsed - expected);
    const isCorrect = diff <= problem.tolerance || (expected !== 0 && diff / Math.abs(expected) <= 0.05);

    if (isCorrect) {
      setCorrectAttempts((prev) => prev + 1);
      setStreak((prev) => prev + 1);
      setEvaluation({ submitted: true, isCorrect: true, difference: diff });
      recordBenchActivity?.('math', 1, 1, `Solved ${problem.categoryTitle}: ${parsed} ${problem.targetUnit}`);
    } else {
      setStreak(0);
      setEvaluation({ submitted: true, isCorrect: false, difference: diff });
      recordBenchActivity?.('math', 0, 1, `Failed ${problem.categoryTitle}: entered ${parsed} (expected ${expected} ${problem.targetUnit})`);
    }
  };

  // Calculator Buttons
  const handleCalcButton = (btn: string) => {
    if (btn === 'C') {
      setCalcDisplay('0');
      setCalcFormula('');
    } else if (btn === '=') {
      try {
        // Safe arithmetic eval
        const sanitized = (calcFormula + calcDisplay).replace(/×/g, '*').replace(/÷/g, '/');
        // eslint-disable-next-line no-eval
        const result = Function(`'use strict'; return (${sanitized})`)();
        const rounded = Math.round(result * 100000) / 100000;
        setCalcDisplay(String(rounded));
        setCalcFormula('');
      } catch {
        setCalcDisplay('Error');
      }
    } else if (['+', '-', '×', '÷'].includes(btn)) {
      setCalcFormula((prev) => `${prev} ${calcDisplay} ${btn}`);
      setCalcDisplay('0');
    } else {
      setCalcDisplay((prev) => (prev === '0' ? btn : prev + btn));
    }
  };

  const accuracyPct = totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 0;

  // Unit Converter Logic
  const val = parseFloat(convertInput) || 0;
  const volumeConversions = {
    uL: val,
    mL: val / 1000,
    L: val / 1000000,
  };
  const moleConversions = {
    uM: val,
    mM: val / 1000,
    M: val / 1000000,
  };
  const massConversions = {
    ug: val,
    mg: val / 1000,
    g: val / 1000000,
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
              Domain 4: Applied Mathematics
            </span>
            <span className="text-xs text-slate-500 font-medium">BACE Exam Weight 12%</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">Algorithmic Bench Math & Solution Prep</h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Endless randomized laboratory calculations for dilutions ($C_1V_1 = C_2V_2$), molarity ($g = M \times L \times MW$), percent solutions ($w/v$, $v/v$), and multi-tube serial dilutions.
          </p>
        </div>

        {/* Stats & Calculator Toggle */}
        <div className="flex items-center space-x-3">
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-400">Streak</div>
            <div className="text-lg font-black text-amber-600 flex items-center justify-center space-x-1">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>{streak}</span>
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-400">Math Accuracy</div>
            <div className="text-lg font-black text-slate-800">
              {accuracyPct}% <span className="text-xs font-normal text-slate-500">({correctAttempts}/{totalAttempts})</span>
            </div>
          </div>
          <button
            onClick={() => setIsScratchpadOpen(!isScratchpadOpen)}
            className={`px-3 py-2 text-xs font-semibold rounded-xl border flex items-center space-x-1.5 transition-colors cursor-pointer ${
              isScratchpadOpen
                ? 'bg-emerald-600 text-white border-emerald-700'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Scratchpad & Tools</span>
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'all', label: 'All Bench Math', icon: Calculator },
          { id: 'dilution', label: 'Dilutions (C₁V₁ = C₂V₂)', icon: Split },
          { id: 'molarity', label: 'Molarity (g = M × L × MW)', icon: Layers },
          { id: 'percent', label: 'Percent Solutions (w/v, v/v)', icon: Percent },
          { id: 'serial', label: 'Serial Dilutions', icon: ArrowRightLeft },
        ].map((tab) => {
          const active = selectedCategory === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => handleCategoryChange(tab.id as any)}
              className={`inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                active
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Problem Card & Optional Scratchpad Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Problem Card (8 or 12 Cols depending on scratchpad) */}
        <div className={isScratchpadOpen ? 'lg:col-span-8 space-y-6' : 'lg:col-span-12 space-y-6'}>
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
            {/* Problem Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                    {problem.categoryTitle}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">BACE Practice</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{problem.title}</h3>
              </div>

              <button
                onClick={() => handleNextProblem()}
                className="inline-flex items-center space-x-1 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>New Problem</span>
              </button>
            </div>

            {/* Scenario Narrative */}
            <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/80 text-slate-800 text-sm leading-relaxed">
              <p>{problem.scenario}</p>
            </div>

            {/* Question Prompt */}
            <div className="bg-blue-50/60 rounded-2xl p-4 border border-blue-200/70 text-blue-950 font-medium text-sm">
              <span className="font-bold text-blue-900 block mb-1">Calculation Task:</span>
              <p>{problem.question}</p>
            </div>

            {/* Given Variables Table */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Extract Given Variables
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {problem.givenVariables.map((v, i) => (
                  <div key={i} className="bg-white border border-slate-200 p-2.5 rounded-xl shadow-2xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">{v.label}</span>
                    <span className="text-xs font-mono font-bold text-slate-800 mt-0.5 block">{v.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Student Answer Input Form */}
            <form onSubmit={handleSubmitAnswer} className="pt-2">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative flex-1">
                  <input
                    type="number"
                    step="any"
                    value={studentAnswer}
                    onChange={(e) => setStudentAnswer(e.target.value)}
                    placeholder="Enter numerical answer..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-base font-bold text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all font-mono"
                    autoFocus
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-500">
                    {problem.targetUnit}
                  </span>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center space-x-2 shrink-0"
                >
                  <span>Submit Answer</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Step-by-Step Breakdown when submitted */}
            {evaluation?.submitted && (
              <div className="space-y-4 pt-4 border-t border-slate-200 animate-in fade-in duration-200">
                {/* Result banner */}
                <div
                  className={`rounded-2xl p-4 border ${
                    evaluation.isCorrect
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : 'bg-rose-50 border-rose-300 text-rose-950'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {evaluation.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h4 className="font-bold text-sm">
                        {evaluation.isCorrect ? 'Correct! Excellent Bench Math.' : 'Incorrect Calculation.'}
                      </h4>
                      <p className="text-xs mt-1">
                        Expected Answer: <strong>{problem.correctAnswer} {problem.targetUnit}</strong>
                        {!evaluation.isCorrect && ` (Your Answer: ${studentAnswer} ${problem.targetUnit})`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step-by-Step Math Solution */}
                <div className="bg-slate-900 text-slate-200 rounded-2xl p-5 space-y-4 shadow-lg">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Step-by-Step Dimensional Analysis Breakdown</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{problem.formulaName}</span>
                  </div>

                  <div className="space-y-3">
                    {problem.steps.map((step) => (
                      <div key={step.stepNumber} className="bg-slate-800/80 rounded-xl p-3.5 border border-slate-700/80">
                        <div className="text-xs font-bold text-white flex items-center space-x-2">
                          <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center font-bold">
                            {step.stepNumber}
                          </span>
                          <span>{step.title}</span>
                        </div>
                        <p className="text-[11px] text-slate-300 mt-1">{step.explanation}</p>
                        <div className="mt-2 bg-slate-950 p-2.5 rounded-lg font-mono text-xs text-emerald-300 border border-slate-800">
                          {step.mathExpression}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Practical Wet-Lab Tip */}
                  <div className="bg-amber-950/40 border border-amber-800/60 rounded-xl p-3.5 text-amber-200 text-xs">
                    <span className="font-bold text-amber-400 block mb-0.5">Technician Bench Tip:</span>
                    <p className="text-[11px] leading-relaxed">{problem.practicalTip}</p>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => handleNextProblem()}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      Next Problem →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Scratchpad & Lab Calculator Sidebar (4 Cols) */}
        {isScratchpadOpen && (
          <div className="lg:col-span-4 space-y-4 animate-in fade-in duration-150">
            {/* Calculator Card */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
                  <Calculator className="w-3.5 h-3.5 text-blue-600" />
                  <span>Lab Calculator</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400">Arithmetic Engine</span>
              </div>

              {/* Display */}
              <div className="bg-slate-950 rounded-xl p-3 text-right font-mono border border-slate-800">
                <div className="text-[10px] text-slate-400 h-4 truncate">{calcFormula}</div>
                <div className="text-xl font-bold text-white truncate">{calcDisplay}</div>
              </div>

              {/* Keypad */}
              <div className="grid grid-cols-4 gap-1.5 text-xs font-bold">
                {['C', '(', ')', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '00', '='].map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => handleCalcButton(k)}
                    className={`py-2 rounded-lg transition-colors cursor-pointer ${
                      k === '='
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : k === 'C'
                        ? 'bg-rose-100 hover:bg-rose-200 text-rose-800'
                        : ['+', '-', '×', '÷'].includes(k)
                        ? 'bg-blue-50 hover:bg-blue-100 text-blue-700'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    {k}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Unit Converter */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
                  <ArrowRightLeft className="w-3.5 h-3.5 text-teal-600" />
                  <span>Metric Unit Converter</span>
                </span>
                <div className="flex items-center space-x-1 text-[10px]">
                  <button
                    onClick={() => setConverterType('volume')}
                    className={`px-1.5 py-0.5 rounded cursor-pointer ${converterType === 'volume' ? 'bg-teal-600 text-white font-bold' : 'text-slate-500'}`}
                  >
                    Vol
                  </button>
                  <button
                    onClick={() => setConverterType('moles')}
                    className={`px-1.5 py-0.5 rounded cursor-pointer ${converterType === 'moles' ? 'bg-teal-600 text-white font-bold' : 'text-slate-500'}`}
                  >
                    Conc
                  </button>
                  <button
                    onClick={() => setConverterType('mass')}
                    className={`px-1.5 py-0.5 rounded cursor-pointer ${converterType === 'mass' ? 'bg-teal-600 text-white font-bold' : 'text-slate-500'}`}
                  >
                    Mass
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">
                  Input Value ({converterType === 'volume' ? 'µL' : converterType === 'moles' ? 'µM' : 'µg'} base):
                </label>
                <input
                  type="number"
                  value={convertInput}
                  onChange={(e) => setConvertInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold text-slate-800 mt-1"
                />
              </div>

              <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
                {converterType === 'volume' ? (
                  <>
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-400 block">µL</span>
                      <span className="font-mono font-bold text-slate-800 text-[11px]">{volumeConversions.uL}</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-400 block">mL</span>
                      <span className="font-mono font-bold text-slate-800 text-[11px]">{volumeConversions.mL}</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-400 block">L</span>
                      <span className="font-mono font-bold text-slate-800 text-[11px]">{volumeConversions.L}</span>
                    </div>
                  </>
                ) : converterType === 'moles' ? (
                  <>
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-400 block">µM</span>
                      <span className="font-mono font-bold text-slate-800 text-[11px]">{moleConversions.uM}</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-400 block">mM</span>
                      <span className="font-mono font-bold text-slate-800 text-[11px]">{moleConversions.mM}</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-400 block">M</span>
                      <span className="font-mono font-bold text-slate-800 text-[11px]">{moleConversions.M}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-400 block">µg</span>
                      <span className="font-mono font-bold text-slate-800 text-[11px]">{massConversions.ug}</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-400 block">mg</span>
                      <span className="font-mono font-bold text-slate-800 text-[11px]">{massConversions.mg}</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-400 block">g</span>
                      <span className="font-mono font-bold text-slate-800 text-[11px]">{massConversions.g}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Candidate Scratchpad Notes */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Lab Scratchpad</span>
                <button
                  onClick={() => setScratchpadNotes('')}
                  className="text-[10px] text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  Clear Notes
                </button>
              </div>
              <textarea
                value={scratchpadNotes}
                onChange={(e) => setScratchpadNotes(e.target.value)}
                placeholder="Jot down intermediate calculations, molar masses, or notes..."
                className="w-full h-24 bg-amber-50/50 border border-amber-200/80 rounded-xl p-2 text-xs font-mono text-slate-800 placeholder:text-slate-400 resize-none focus:outline-hidden focus:ring-1 focus:ring-amber-400"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
