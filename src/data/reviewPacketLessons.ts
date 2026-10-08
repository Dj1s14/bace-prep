import { Lesson, Question, Topic } from '../types/database';
// Original teaching material adapted from the uploaded BACE review packet.
// Packet page numbers refer to PDF order, including worksheets and answer keys.
type Case = [string,string,string[],string];
type Unit = {id:string;domain:string;title:string;pages:string;terms:string[][];sections:string[][];examples:string[][];cases:Case[]};
const units: Unit[] = [
  {
    "id": "microbial_identification",
    "domain": "d1",
    "title": "Microbial Media, Stains & Identification",
    "pages": "67–92",
    "terms": [
      [
        "Selective medium",
        "A medium that favors some organisms while inhibiting others."
      ],
      [
        "Differential medium",
        "A medium that makes a detectable biochemical difference visible."
      ],
      [
        "Dichotomous key",
        "A sequence of paired choices used to narrow an identification."
      ],
      [
        "Endospore",
        "A resistant dormant structure formed by some bacteria; not a reproductive offspring."
      ]
    ],
    "sections": [
      [
        "From cell shape to evidence",
        "Record cell shape, arrangement, staining response, and colony appearance as separate observations. Cocci are spherical, bacilli rod-shaped, and spiral forms curved or helical. A colony describes growth on a particular medium under particular conditions; its color, margin, elevation, or texture is not a unique species name. A pure isolate reduces mixed-organism interference, but apparent uniformity alone does not prove purity. Use approved teaching organisms and the local containment SOP."
      ],
      [
        "Choose media by the question",
        "General-purpose media support a range of organisms. Selective ingredients inhibit some groups; differential indicators reveal a trait such as carbohydrate fermentation. A medium can do both. MacConkey agar is commonly selective for many Gram-negative enteric organisms and differential for lactose fermentation. A pink colony supports lactose fermentation under the specified conditions; it does not identify a species. Include appropriate growth and reaction controls rather than assuming failure to grow proves absence."
      ],
      [
        "Interpret stains with controls",
        "Gram-positive cells typically retain the crystal violet–iodine complex because of their thick peptidoglycan wall; Gram-negative cells typically show the counterstain after decolorization and have an outer membrane. Culture age, smear thickness, and decolorization affect results. Simple stains emphasize shape. Capsule, acid-fast, and endospore stains answer different structural questions. Evaluate known controls before interpreting an unexpected unknown result; no single stain establishes clinical diagnosis."
      ],
      [
        "Combine biochemical evidence",
        "A biochemical test asks whether a sample produces a defined metabolic reaction. SIM combines sulfur reduction, indole production, and motility observations; each has its own readout. A dichotomous key should use actual observations and the specified test conditions. Missing, ambiguous, or contradictory results require follow-up rather than choosing the desired branch. Koch’s postulates historically connected microorganisms to disease, but limitations include unculturable agents, asymptomatic carriage, and ethical restrictions."
      ]
    ],
    "examples": [
      [
        "Two functions in one plate",
        "An isolate grows on selective medium and turns the lactose indicator pink.",
        "Growth supports tolerance of the selective conditions; pink supports the differential reaction. Neither observation alone identifies the organism."
      ],
      [
        "Control failure",
        "Both a known Gram-positive control and an unknown appear pink.",
        "Investigate staining conditions before calling the unknown Gram-negative. A failed control invalidates that interpretation."
      ]
    ],
    "cases": [
      [
        "A medium inhibits many Gram-positive bacteria and changes color with lactose fermentation. How is it classified?",
        "Both selective and differential",
        [
          "Only selective",
          "Only differential",
          "A species-identification test by itself"
        ],
        "Inhibition is selection; the indicator reaction is differentiation."
      ],
      [
        "An unknown follows two conflicting branches in a biochemical key. What is the best response?",
        "Review controls and repeat or clarify the conflicting tests",
        [
          "Choose the branch matching colony color",
          "Average the organism names",
          "Treat the first result as automatically correct"
        ],
        "Identification depends on valid observations, not forcing an answer."
      ]
    ]
  },
  {
    "id": "antimicrobial_interpretation",
    "domain": "d2",
    "title": "Antibiotic Mechanisms, Resistance & Zone Interpretation",
    "pages": "95–97",
    "terms": [
      [
        "Bacteriostatic",
        "Inhibiting bacterial growth under stated conditions."
      ],
      [
        "Bactericidal",
        "Killing bacteria under stated conditions."
      ],
      [
        "MIC",
        "Minimum inhibitory concentration: the lowest tested concentration preventing defined visible growth."
      ],
      [
        "Breakpoint",
        "An interpretive threshold tied to a specified organism, drug, method, and clinical context."
      ]
    ],
    "sections": [
      [
        "Connect targets to selectivity",
        "Antibacterial drugs can interfere with cell-wall synthesis, bacterial ribosomes, nucleic-acid processes, metabolic pathways, or membrane integrity. Bacterial targets differ from human targets, but selectivity is not a guarantee of zero toxicity. Broad spectrum refers to activity against a wider range of bacteria; it does not mean a drug treats viruses or every bacterial species. Antibiotics and antiseptics are not interchangeable categories."
      ],
      [
        "How resistance changes a result",
        "Resistance can involve drug-inactivating enzymes, altered targets, reduced entry, or active efflux. Resistant variants may already exist or arise through genetic change; exposure selects among variants. Resistance genes may spread through horizontal transfer. A change in susceptibility is not proof of a particular genetic mechanism. Link phenotype to additional molecular evidence before making that claim."
      ],
      [
        "Read zones using the right criteria",
        "A disk diffusion zone is the diameter of inhibited growth under a standardized method. Disk content, diffusion, organism, inoculum, medium, and conditions affect the result. Compare a measured zone with current criteria for that organism–drug combination and validated method. Do not rank different antibiotics by raw zone size. EUCAST interpretation requires its methods or appropriately calibrated systems and its current breakpoint tables."
      ],
      [
        "Check validity before interpretation",
        "Review control performance and method conformity before classifying a result. No zone, an unusual edge, or colonies within a zone require the applicable reading instructions and investigation. A classroom worksheet can teach comparison with supplied fictional thresholds, but those thresholds are not clinical recommendations. Susceptibility testing supports a defined decision; it does not independently select treatment for a patient."
      ]
    ],
    "examples": [
      [
        "Fictional training threshold",
        "A worksheet defines susceptible as at least 20 mm for a fictional organism–drug pair. The valid measured zone is 22 mm.",
        "22 ≥ 20, so the worksheet category is susceptible. This invented threshold must not be reused for actual organisms or drugs."
      ],
      [
        "Cross-drug comparison",
        "Drug A gives 24 mm and drug B 18 mm on the same isolate.",
        "These diameters alone do not show A is clinically superior. Interpret each using its own method-specific organism–drug criteria."
      ]
    ],
    "cases": [
      [
        "Two antibiotics produce different zone diameters. What should be compared first?",
        "Each zone with its own organism–drug interpretive criteria",
        [
          "Which zone is larger without other information",
          "Only the drug price",
          "Both zones with a single universal threshold"
        ],
        "Diffusion and interpretive criteria differ between drugs."
      ],
      [
        "A resistance phenotype appears after antibiotic exposure. Which explanation is defensible?",
        "Exposure can select resistant variants; the mechanism needs further evidence",
        [
          "The antibiotic intentionally teaches bacteria to resist",
          "Every surviving cell must have an efflux pump",
          "A larger colony proves a new species"
        ],
        "Selection is distinct from demonstrating a specific resistance mechanism."
      ]
    ]
  },
  {
    "id": "gene_transfer_viruses",
    "domain": "d5",
    "title": "Horizontal Gene Transfer & Viral Life Cycles",
    "pages": "98–101, 143–144",
    "terms": [
      [
        "Transformation",
        "Uptake of extracellular DNA by a cell."
      ],
      [
        "Conjugation",
        "Transfer of genetic material through cell-to-cell contact."
      ],
      [
        "Transduction",
        "Transfer of bacterial DNA mediated by bacteriophages."
      ],
      [
        "Prophage",
        "A phage genome maintained in a lysogenic host, often integrated into its chromosome."
      ]
    ],
    "sections": [
      [
        "Three routes, three kinds of evidence",
        "Transformation uses extracellular DNA and a competent recipient; competence can be natural or induced in laboratory-prepared cells. Conjugation requires contact and transfer machinery, frequently associated with a conjugative plasmid. Transduction uses a phage as a carrier. These routes move genetic information horizontally rather than only from parent to offspring. Their relative importance depends on the organism and setting; there is no universal most-common route."
      ],
      [
        "Lytic versus lysogenic",
        "Viruses require host machinery for replication. In a lytic phage cycle, viral components are produced, assembled, and released, often by host lysis. In lysogeny, a temperate phage genome persists with the host rather than immediately producing a burst of particles. Induction can switch a lysogenic infection toward lytic growth. Not all viruses infect bacteria or follow this exact pattern."
      ],
      [
        "Plasmids and selection",
        "A plasmid is a replicating DNA element that may carry selectable markers, transfer functions, or an engineered gene. Selection shows a phenotype consistent with marker function. It does not prove the intended insert, correct sequence, or expression level. Verify those separately. Antibiotic resistance markers are teaching tools only within approved organisms, containment, and procedures."
      ],
      [
        "Distinguish transfer from inheritance",
        "A new trait in a recipient may reflect DNA acquisition, mutation, or contamination. Appropriate controls and identity checks help separate these explanations. A useful conceptual experiment contrasts available free DNA, contact, and phage involvement. Conclusions must match the observed dependencies; a shared resistance phenotype alone cannot identify the transfer route."
      ]
    ],
    "examples": [
      [
        "Route recognition",
        "A bacterial gene reaches a recipient inside a bacteriophage particle.",
        "This is transduction. Contact-mediated transfer is conjugation, and uptake of free DNA is transformation."
      ],
      [
        "Persistent phage DNA",
        "A cell divides while maintaining a temperate phage genome without releasing new particles.",
        "This is consistent with lysogeny. Immediate lysis is not required for persistence."
      ]
    ],
    "cases": [
      [
        "Which route specifically uses cell-to-cell contact?",
        "Conjugation",
        [
          "Transformation",
          "Transduction",
          "Translation"
        ],
        "Conjugation transfers genetic material through contact and transfer machinery."
      ],
      [
        "An antibiotic-selected colony contains an engineered plasmid. What remains to verify?",
        "Insert identity, sequence, and intended expression",
        [
          "Nothing; selection proves every construct feature",
          "Only colony size",
          "That all DNA is viral"
        ],
        "A marker phenotype does not establish the full construct."
      ]
    ]
  },
  {
    "id": "macromolecule_structure",
    "domain": "d5",
    "title": "Macromolecules, Protein Structure & Denaturation",
    "pages": "47, 104–110, 204–206",
    "terms": [
      [
        "Monomer",
        "A molecular building block of a larger polymer."
      ],
      [
        "Peptide bond",
        "A covalent linkage joining amino-acid residues."
      ],
      [
        "Denaturation",
        "Loss of native macromolecular structure, often with loss of function."
      ],
      [
        "Amphipathic",
        "Having both hydrophilic and hydrophobic regions."
      ]
    ],
    "sections": [
      [
        "Match structure with function",
        "Carbohydrates support energy storage and structure; proteins provide catalysts, transport, signaling, and scaffolds; nucleic acids store or transmit sequence information. Lipids include fats, phospholipids, and steroids and are not all repeating-monomer polymers. Dehydration reactions can form covalent links while hydrolysis breaks them using water. The category alone does not tell you where a molecule is located or how it behaves in a particular assay."
      ],
      [
        "Four levels of protein structure",
        "Primary structure is amino-acid sequence. Secondary structure includes alpha helices and beta sheets stabilized by backbone hydrogen bonding. Tertiary structure is the overall three-dimensional arrangement of one polypeptide, influenced by hydrophobic interactions, hydrogen bonds, ionic interactions, and sometimes disulfide bonds. Quaternary structure describes arrangements of multiple subunits; a single-chain protein need not have it."
      ],
      [
        "Why folding matters",
        "Active sites and binding interfaces depend on shape and chemical environment. Heat, extreme pH, and some chemicals can disrupt native structure. Denaturation usually does not mean every peptide bond has been hydrolyzed. Some proteins can refold; others aggregate irreversibly. Loss of activity can occur even while a concentration assay still detects protein, so amount and function require different measurements."
      ],
      [
        "Membrane chemistry explains transport",
        "Phospholipids are amphipathic and assemble into bilayers with hydrophobic interiors. Small nonpolar molecules cross more readily than ions and many large polar molecules. Channels and carriers enable selective transport. Osmosis describes water movement across a selectively permeable membrane; water potential and solute permeability matter. Primary active transport uses energy directly, while secondary active transport couples movement to an existing gradient."
      ]
    ],
    "examples": [
      [
        "Amount versus activity",
        "A heated enzyme still gives a Bradford signal but no longer catalyzes its reaction.",
        "The assay detects protein amount, while the activity result suggests loss of functional conformation. Presence is not proof of activity."
      ],
      [
        "Levels of organization",
        "A functional protein contains two folded polypeptide chains.",
        "Each chain has primary, secondary, and tertiary structure; their assembly adds quaternary structure."
      ]
    ],
    "cases": [
      [
        "A protein loses function after heating. Which conclusion is best supported?",
        "Its native structure may have been disrupted",
        [
          "All peptide bonds were necessarily broken",
          "Its amino-acid sequence necessarily changed",
          "Its concentration must be zero"
        ],
        "Denaturation affects conformation without necessarily destroying primary structure."
      ],
      [
        "Which interaction directly supports alpha-helical secondary structure?",
        "Hydrogen bonding between backbone groups",
        [
          "Only bonds between separate protein subunits",
          "DNA base pairing",
          "Phospholipid bilayer formation"
        ],
        "Secondary structure is stabilized by backbone hydrogen bonding."
      ]
    ]
  },
  {
    "id": "energy_metabolism",
    "domain": "d5",
    "title": "Cellular Respiration, Fermentation & Photosynthesis",
    "pages": "115–126",
    "terms": [
      [
        "Redox",
        "Coupled electron-transfer reactions involving oxidation and reduction."
      ],
      [
        "Chemiosmosis",
        "ATP production coupled to ion flow down an electrochemical gradient."
      ],
      [
        "Fermentation",
        "Regeneration of electron carriers through organic electron acceptors without a respiratory electron-transport chain."
      ],
      [
        "Carbon fixation",
        "Incorporation of inorganic carbon into organic molecules."
      ]
    ],
    "sections": [
      [
        "Follow matter and electrons",
        "Glycolysis in the cytosol converts one glucose to two pyruvates with a net gain of two ATP and two NADH. Pyruvate oxidation supplies acetyl-CoA, and the citric acid cycle releases carbon dioxide while producing reduced electron carriers and a small amount of ATP or GTP. In eukaryotes these later processes are associated with mitochondria. Prokaryotes lack mitochondria but can perform respiratory processes using their cell membrane."
      ],
      [
        "Gradient to ATP",
        "An electron-transport chain transfers electrons and supports a proton gradient. ATP synthase couples proton flow to ATP formation. Oxygen is the terminal electron acceptor in aerobic respiration and is reduced to water. ATP yield varies with cell type, shuttle systems, transport costs, and coupling efficiency; an old fixed 36–38 ATP value is not a universal measurement. Follow the specified assumptions in calculation questions."
      ],
      [
        "Fermentation is not anaerobic respiration",
        "Fermentation regenerates NAD+ so glycolysis can continue. Lactate fermentation reduces pyruvate; alcoholic fermentation produces ethanol and carbon dioxide. In the standard glucose-to-lactate or glucose-to-ethanol model, ATP comes from glycolysis, net two per glucose. Anaerobic respiration instead uses a respiratory chain with a terminal acceptor other than oxygen. Both can occur without oxygen, but they are different processes."
      ],
      [
        "Photosynthesis links light and carbon",
        "Light-dependent reactions in chloroplast thylakoids support ATP and NADPH formation and release oxygen from water. The Calvin cycle in the stroma uses ATP and NADPH to fix carbon dioxide and produce carbohydrate precursors such as G3P. Light-independent means light is not directly absorbed in those reactions, not that they only occur in darkness. Plants also respire; photosynthesis does not replace their need for ATP-generating metabolism."
      ]
    ],
    "examples": [
      [
        "Net glycolytic ATP",
        "Glycolysis invests two ATP and produces four ATP per glucose.",
        "Net ATP = 4 − 2 = 2. Counting only the production phase overstates the net yield."
      ],
      [
        "Fermentation link",
        "An oxygen-limited yeast culture continues glycolysis while producing ethanol.",
        "Regeneration of NAD+ allows glycolysis to continue. Fermentation does not add a respiratory ATP yield to this model."
      ]
    ],
    "cases": [
      [
        "What does fermentation restore so glycolysis can continue?",
        "NAD+",
        [
          "Molecular oxygen",
          "A chloroplast",
          "An unlimited ATP supply"
        ],
        "Reducing organic intermediates oxidizes NADH back to NAD+."
      ],
      [
        "What does the Calvin cycle use to fix carbon dioxide?",
        "ATP and NADPH from the light-dependent reactions",
        [
          "Oxygen alone",
          "Only darkness",
          "A bacterial cell wall"
        ],
        "Carbon fixation consumes energy and reducing power supplied by the light reactions."
      ]
    ]
  },
  {
    "id": "signaling_cell_division",
    "domain": "d5",
    "title": "Cell Signaling, Stem Cells & Cell Division",
    "pages": "127–142, 164–167, 184",
    "terms": [
      [
        "Signal transduction",
        "Conversion of a detected signal into intracellular responses."
      ],
      [
        "Differentiation",
        "Development of specialized cellular characteristics."
      ],
      [
        "Meiosis",
        "Cell division producing haploid products after one DNA replication and two divisions."
      ],
      [
        "Allele",
        "An alternative version of a genetic locus."
      ]
    ],
    "sections": [
      [
        "Reception, relay, response",
        "A receptor detects a ligand, intracellular pathways relay the signal, and the cell changes activity or gene expression. Receptor expression and downstream machinery determine whether a cell responds. Quorum sensing links microbial responses to accumulated signaling molecules and population context. Signal concentration is evidence about a pathway, not proof every cell responds identically."
      ],
      [
        "Stem cells and specialization",
        "Stem cells combine self-renewal with the ability to produce differentiated descendants. Totipotent, pluripotent, and multipotent describe different developmental potentials. Most specialized cells share substantially the same genome but differ in gene expression and regulation. An induced pluripotent stem cell is reprogrammed from a differentiated cell; it is not automatically equivalent to every embryonic cell type. Culture identity, contamination, and differentiation state need independent checks."
      ],
      [
        "Track chromosome number carefully",
        "DNA replicates during S phase before mitosis or the first meiotic division. Mitosis usually preserves chromosome number in the daughter nuclei. Meiosis separates homologous chromosomes in division I and sister chromatids in division II, reducing ploidy and generating variation through recombination and assortment. Count chromosomes by centromeres; doubling DNA content is not automatically doubling chromosome number. Cytokinesis divides the cytoplasm."
      ],
      [
        "Inheritance predicts probabilities",
        "A Punnett square models possible offspring genotypes under stated assumptions. Dominance describes phenotype relationships, not allele frequency or quality. For an autosomal recessive condition with two heterozygous parents, each child has a one-quarter chance of the recessive genotype; earlier children do not force the next outcome. Sex-linked inheritance requires tracking the relevant chromosomes. Genetic testing needs consent, privacy, and recognition of uncertain or incompletely predictive results."
      ]
    ],
    "examples": [
      [
        "Heterozygous cross",
        "Two parents are Aa for an autosomal recessive trait.",
        "Aa × Aa gives AA, Aa, Aa, aa: 25% AA, 50% Aa, 25% aa per pregnancy under the model."
      ],
      [
        "DNA versus chromosome count",
        "A diploid cell has 46 chromosomes before S phase. What follows replication before separation?",
        "There are still 46 chromosomes counted by centromeres, each with two sister chromatids; DNA content has doubled."
      ]
    ],
    "cases": [
      [
        "Why can two cell types with the same genome have different functions?",
        "They express and regulate genes differently",
        [
          "Every cell type has a completely unrelated genome",
          "Only neurons contain DNA",
          "Differentiation always removes all chromosomes"
        ],
        "Cell identity commonly reflects regulated expression rather than a different genome."
      ],
      [
        "Two Aa parents already had one aa child. What is the next child’s aa probability in the model?",
        "25%",
        [
          "0%",
          "50%",
          "100%"
        ],
        "Independent pregnancies retain the same genotype probabilities."
      ]
    ]
  },
  {
    "id": "sequencing_expression",
    "domain": "d2",
    "title": "Sequencing, Microarrays & Bioinformatics Interpretation",
    "pages": "169, 178–183, 219",
    "terms": [
      [
        "Chromatogram",
        "A trace of detected sequencing signals used to infer bases."
      ],
      [
        "Hybridization",
        "Pairing of complementary nucleic-acid strands."
      ],
      [
        "Alignment",
        "A comparison arranging sequences to examine matching and differing positions."
      ],
      [
        "SNP",
        "A single-nucleotide polymorphism at a defined genomic position."
      ]
    ],
    "sections": [
      [
        "Read sequence quality before variants",
        "Sanger sequencing infers a sequence from labeled termination products. In a chromatogram, clear separated peaks support confident base calls. Overlapping or weak peaks can reflect mixed templates, poor sequence quality, or real variation depending on context. Determine which strand was read and whether reverse complementation is required before comparing a reference. A difference at one position is not automatically a pathogenic variant."
      ],
      [
        "RFLP and SNP are different descriptions",
        "A restriction fragment length polymorphism is a difference in fragment lengths detected after restriction digestion. A sequence variant can create or remove a restriction site, but not every SNP changes a site. Interpret fragment patterns using the enzyme, sequence context, digestion controls, and expected fragment sizes. Partial digestion can mimic an unexpected pattern."
      ],
      [
        "Interpret expression arrays conditionally",
        "Expression microarrays estimate relative transcript abundance by hybridization to probes, often using cDNA derived from RNA. For a two-color array, first identify which sample received which dye. Red and green have no universal healthy/disease meaning. Similar channel signals may appear yellow; weak signals can mean below detection rather than absolute absence of transcription. Normalize and inspect background and controls before comparing expression. Transcript abundance does not directly establish protein abundance or causation."
      ],
      [
        "Use bioinformatics with provenance",
        "Record sequence source, reference version, software, parameters, and filtering decisions. An alignment match suggests sequence similarity; its meaning depends on coverage, identity, and database context. A statistically strong similarity is not experimental proof of function. Protect identifiers in human sequence data and distinguish educational examples from clinical interpretation. Report ambiguous bases or uncertain results rather than silently selecting a convenient answer."
      ]
    ],
    "examples": [
      [
        "Two-color ratio",
        "Sample A is red-labeled and sample B green-labeled. A valid spot has red signal 800 and green signal 200 after normalization.",
        "A/B = 800/200 = 4. The target transcript is estimated fourfold higher in A under this assay’s assumptions; the color alone does not identify disease."
      ],
      [
        "Reverse complement",
        "A read gives 5′-ATGC-3′ on the opposite strand from a reference display.",
        "Its reverse complement is 5′-GCAT-3′. Compare like orientations before calling a difference."
      ]
    ],
    "cases": [
      [
        "What must be known before interpreting a red microarray spot?",
        "Which sample was labeled red and how signals were processed",
        [
          "That red always means cancer",
          "That red is a DNA mutation",
          "That the gene must be absent from the green sample"
        ],
        "Dye assignments and valid signal processing determine the comparison."
      ],
      [
        "A chromatogram has overlapping peaks in a low-quality region. What is best?",
        "Flag ambiguity and investigate quality or template mixture",
        [
          "Call every overlap a pathogenic SNP",
          "Delete the region without recording it",
          "Treat the tallest peak as infallible"
        ],
        "Signal quality and template context must be assessed before variant claims."
      ]
    ]
  },
  {
    "id": "recombinant_design",
    "domain": "d2",
    "title": "Recombinant DNA, Vector Design & Gene Regulation",
    "pages": "168, 185–195",
    "terms": [
      [
        "Vector",
        "A DNA vehicle used to carry genetic material into or within a host."
      ],
      [
        "Promoter",
        "A regulatory DNA region involved in initiating transcription."
      ],
      [
        "Selectable marker",
        "A genetic feature enabling selection under specified conditions."
      ],
      [
        "Guide RNA",
        "An RNA that directs a CRISPR-associated system to a complementary target."
      ]
    ],
    "sections": [
      [
        "Design a construct for its purpose",
        "A plasmid vector commonly needs an origin compatible with the host, a selectable marker, and a region for an insert. Expression also needs appropriate regulatory elements and reading-frame context. Restriction enzymes cut defined recognition sequences; compatible ends and ligase can assemble DNA. A correctly sized insert is not enough if its orientation, sequence, or coding frame is wrong."
      ],
      [
        "Separate construction from verification",
        "Selection enriches cells with a functional marker. Screening distinguishes candidate constructs; sequence verification checks identity and unintended changes. Expression analysis asks whether RNA or protein is produced, while an activity assay asks whether the product works. These are separate questions. Use an unmodified or empty-vector comparison and relevant assay controls when attributing a result to the inserted gene."
      ],
      [
        "The lac operon integrates signals",
        "In the usual E. coli model, the lac repressor reduces transcription without inducer. Allolactose relieves repression. Low glucose favors cAMP–CAP activation, supporting stronger transcription when lactose is available. High glucose can reduce activation even when repression is relieved. An inducer and a selectable marker serve different roles: one affects expression, the other survival under selection."
      ],
      [
        "Editing, cloning, and therapy differ",
        "CRISPR systems use sequence targeting to modify or regulate nucleic acids; nuclease-based editing depends on targeting and cellular repair and can produce unintended outcomes. Gene therapy aims to alter gene function for therapeutic benefit and is not limited to one editing technology. Molecular cloning copies a DNA construct; organismal cloning aims to produce an organism with a related nuclear genome. None of these terms guarantees identical phenotype, perfect efficiency, or absence of risk."
      ]
    ],
    "examples": [
      [
        "Expression failure",
        "A colony survives selection and has the intended insert but produces no detectable protein.",
        "Check promoter/host compatibility, induction, reading frame, and assay validity. Selection does not demonstrate expression."
      ],
      [
        "Two environmental inputs",
        "Lactose is available but glucose remains high.",
        "Repression can be relieved while cAMP–CAP activation remains reduced. Do not treat lactose alone as a guarantee of maximal expression."
      ]
    ],
    "cases": [
      [
        "Which construct element most directly initiates transcription?",
        "Promoter",
        [
          "Origin of replication alone",
          "Antibiotic disk",
          "Centrifuge rotor"
        ],
        "A promoter supports transcription initiation; the origin supports replication."
      ],
      [
        "A verified plasmid produces a detectable protein band. What is still unproven?",
        "That the protein has the intended biological activity",
        [
          "That any protein is present",
          "That the band was detected",
          "That the gel had a lane"
        ],
        "Detection or size does not establish functional activity."
      ]
    ]
  },
  {
    "id": "blood_immunity",
    "domain": "d5",
    "title": "Blood Components, ABO/Rh & Immune Memory",
    "pages": "224–235",
    "terms": [
      [
        "Antigen",
        "A molecular feature recognized by immune receptors or antibodies."
      ],
      [
        "Agglutination",
        "Visible clumping caused by cross-linking particles such as red blood cells."
      ],
      [
        "Innate immunity",
        "Rapid defenses based on broadly shared patterns and barriers."
      ],
      [
        "Adaptive immunity",
        "Antigen-specific responses involving lymphocytes and memory."
      ]
    ],
    "sections": [
      [
        "Blood is a mixture of components",
        "Plasma carries dissolved substances and proteins; red cells transport oxygen using hemoglobin; white cells participate in defense; platelets support hemostasis. In mammals, mature red cells lack nuclei. Serum is the fluid remaining after clotting and differs from plasma in clotting-related components. Cell counts, protein assays, and blood typing measure different properties."
      ],
      [
        "ABO typing asks which antigens are present",
        "In a forward typing teaching assay, anti-A agglutination supports A antigen and anti-B agglutination supports B antigen. Both support AB, neither supports O only when controls and the assay are valid. Anti-D tests the D antigen commonly used for Rh-positive/negative classification; the Rh system includes additional antigens. Agglutination and precipitation are distinct readouts. Actual transfusion decisions require validated testing and compatibility checks, not a classroom table alone."
      ],
      [
        "Innate and adaptive responses cooperate",
        "Barriers, phagocytes, complement, and inflammation provide innate defenses. B lymphocytes can differentiate into antibody-secreting plasma cells, and T lymphocytes provide functions including help and cytotoxic responses. Antibodies bind specific epitopes and can support neutralization, opsonization, and complement activation depending on their class and context. Antibodies do not directly swallow microorganisms."
      ],
      [
        "Memory and antibody engineering",
        "A secondary response can be faster and more effective because of antigen-specific memory. Vaccination aims to establish useful protection without requiring the full disease experience; response varies with vaccine and host. Monoclonal antibodies originate from a defined clone or engineered sequence, while polyclonal preparations recognize multiple epitopes. Humanized antibodies retain selected binding regions with more human sequence; they are not simply antibodies collected from a human donor."
      ]
    ],
    "examples": [
      [
        "Teaching blood type",
        "Valid forward typing shows anti-A clumping, no anti-B clumping, and anti-D clumping.",
        "The teaching interpretation is A, D-positive (often written A+). This does not replace complete clinical compatibility testing."
      ],
      [
        "Specific memory",
        "A vaccinated person later encounters the same antigen and mounts a faster response.",
        "Antigen-specific memory supports the response; innate barriers alone do not explain its specificity."
      ]
    ],
    "cases": [
      [
        "With valid controls, anti-A and anti-B both cause agglutination. What does this support?",
        "Both A and B antigens are present",
        [
          "No ABO antigens are present",
          "Only O blood is possible",
          "The person necessarily has an infection"
        ],
        "Forward typing detects antigens through reagent-specific agglutination."
      ],
      [
        "Which cells can become antibody-secreting plasma cells?",
        "B lymphocytes",
        [
          "Red blood cells",
          "Platelets",
          "Every epithelial cell"
        ],
        "Activated B cells can differentiate into plasma cells."
      ]
    ]
  },
  {
    "id": "antibody_assay_formats",
    "domain": "d2",
    "title": "Antibody Labels, Immunodiffusion & Tissue Assays",
    "pages": "236–246",
    "terms": [
      [
        "Epitope",
        "The part of an antigen recognized by a binding site."
      ],
      [
        "Secondary antibody",
        "An antibody that binds the primary antibody in an indirect detection format."
      ],
      [
        "Equivalence zone",
        "A range of antigen–antibody proportions favorable for lattice formation and precipitation."
      ],
      [
        "Multiplex assay",
        "An assay measuring multiple targets in one analytical run."
      ]
    ],
    "sections": [
      [
        "Match the label to the detector",
        "Antibodies may carry enzymes, fluorophores, or other detectable labels. Enzyme-linked detection needs a compatible substrate; fluorescence needs suitable excitation and emission settings. An indirect assay uses a secondary antibody matched to the primary antibody’s species and class. Cross-reactivity, background, and loss of activity after labeling can change interpretation. The brightest signal is not automatically the most specific."
      ],
      [
        "Immunodiffusion measures antigenic relationships",
        "In Ouchterlony double diffusion, antigen and antibody diffuse through gel and can form visible precipitin lines near equivalence. A fused line supports identity relative to the antibody specificity used, crossing lines support nonidentity, and a spur supports partial identity. The spur points toward the antigen lacking the additional recognized determinant. This is not proof of complete molecular identity. No visible line can reflect concentration, diffusion, or reagent failure as well as lack of recognition."
      ],
      [
        "Localize a signal in cells or tissue",
        "Immunocytochemistry examines cells and immunohistochemistry examines tissue sections. Interpretation includes location, staining pattern, morphology, and controls. A known positive sample checks that detection can work, and an appropriate negative control helps assess nonspecific signal. Fixation and antigen accessibility affect results. A colored area alone is not a diagnosis or a direct measurement of gene expression."
      ],
      [
        "Multiplexing adds efficiency and validation demands",
        "Bead-based assays can distinguish bead populations and detect several analytes. Each target needs valid calibration, specificity, range, and controls; shared wells do not make those requirements disappear. Overlapping fluorescence channels, cross-reactivity, and matrix effects can cause misleading signals. Compare an unknown only within validated assay conditions and investigate control failures before releasing results."
      ]
    ],
    "examples": [
      [
        "Secondary compatibility",
        "The primary antibody is rabbit IgG; the available detector is anti-mouse IgG.",
        "This is not a suitable species match for detecting the rabbit primary. Choose an appropriately validated anti-rabbit detector and controls."
      ],
      [
        "Missing precipitin line",
        "A positive control also fails to form a line.",
        "The unknown cannot be called antigen-negative from this run. Investigate concentration, diffusion, reagents, and method performance."
      ]
    ],
    "cases": [
      [
        "An immunodiffusion spur points toward one antigen well. What does the spur direction indicate?",
        "The antigen lacking the additional recognized determinant",
        [
          "The antigen with every extra determinant",
          "A universal higher concentration",
          "That both molecules are chemically identical"
        ],
        "Partial identity concerns determinants recognized by the antibody reagent; the spur points toward the simpler antigenic pattern."
      ],
      [
        "A multiplex assay’s control for one target fails while others pass. What is appropriate?",
        "Withhold interpretation of the affected target and investigate its control failure",
        [
          "Declare all targets valid because they shared a well",
          "Replace the failed value with the group average",
          "Ignore target-specific controls"
        ],
        "Each target requires its own valid analytical performance."
      ]
    ]
  },
  {
    "id": "reaction_solution_math",
    "domain": "d4",
    "title": "Compound Solutions, Stock Factors & Reaction-Specific Normality",
    "pages": "52–65",
    "terms": [
      [
        "Final volume",
        "Total volume of the completed solution, including dissolved solute."
      ],
      [
        "Stock factor",
        "A concentration expressed relative to a working concentration, such as 10X."
      ],
      [
        "Normality",
        "Equivalents per liter for a specified reaction."
      ],
      [
        "Equivalent factor",
        "The reaction-specific number of equivalents supplied per mole."
      ]
    ],
    "sections": [
      [
        "Calculate each component independently",
        "A compound solution may specify several solutes. For each, use mass = molarity × final volume in liters × formula mass. Choose the actual hydrate or salt form and keep units visible. Solutes contribute to solution volume, so dissolve in less solvent than the target and bring to the specified final volume. Adding the target volume of water to weighed solute does not establish the target solution volume."
      ],
      [
        "Stock factors describe relative concentration",
        "A 10X stock is ten times its designated 1X working formulation, not automatically 10 mol/L. Use stock factor × stock volume = working factor × final volume when diluting the same formulation. Specify whether a ratio means stock:final volume or stock:diluent; ambiguous 1:10 labels can cause tenfold versus elevenfold confusion. Mixed recipes still need compatible components and a stated final volume."
      ],
      [
        "Normality requires a reaction",
        "N = M × n, where n is equivalents per mole for the specified reaction. Complete acid–base neutralization of sulfuric acid can use n = 2, but equivalent factors change with the reaction and endpoint. Do not infer a universal n merely by counting every hydrogen or oxygen in a formula. Molarity describes amount of substance per volume; normality describes reactive equivalents in a defined context."
      ],
      [
        "Check basis, units, and rounding",
        "Percent w/v is grams per 100 mL final solution; v/v is volume per 100 volume units of final solution; w/w is mass per 100 mass units. A percentage without a basis is incomplete. Carry useful precision through intermediate calculations and round the final result to justified precision. Estimate the order of magnitude before weighing or dispensing and record actual values rather than overwriting them with target values."
      ]
    ],
    "examples": [
      [
        "Two-solute formulation",
        "Prepare 250 mL containing 0.100 M NaCl (58.44 g/mol) and 0.0500 M glucose (180.16 g/mol).",
        "NaCl: 0.100 × 0.250 × 58.44 = 1.461 g. Glucose: 0.0500 × 0.250 × 180.16 = 2.252 g. Nominal targets are 1.46 g and 2.25 g; dissolve and bring the combined solution to 250 mL."
      ],
      [
        "Stock and normality",
        "Find the 10X stock volume for 80 mL of 1X buffer, and the normality of 0.200 M H2SO4 for complete two-proton neutralization.",
        "Stock volume = (1 × 80)/10 = 8.0 mL, then bring to 80 mL final volume. For the stated reaction, N = 0.200 × 2 = 0.400 N. These are separate concentration conventions."
      ]
    ],
    "cases": [
      [
        "How much 20X stock is needed for 100 mL of 1X working solution?",
        "5.0 mL, brought to 100 mL final volume",
        [
          "20 mL plus 100 mL water",
          "100 mL stock",
          "5.0 mL plus exactly 100 mL water"
        ],
        "20 × V = 1 × 100, so V = 5.0 mL; final volume is 100 mL."
      ],
      [
        "What must be stated to interpret normality correctly?",
        "The reaction and equivalent factor",
        [
          "Only the number of oxygen atoms",
          "Only the solution color",
          "A universal two-equivalent rule"
        ],
        "Equivalents per mole depend on the specified reaction."
      ]
    ]
  },
  {
    "id": "biotech_ethics_development",
    "domain": "d6",
    "title": "Biotechnology Development, Evidence & Bioethics",
    "pages": "12–21, 249–250",
    "terms": [
      [
        "Preclinical research",
        "Studies before human clinical evaluation, including relevant laboratory and animal work."
      ],
      [
        "Informed consent",
        "A process supporting a voluntary decision with understandable information."
      ],
      [
        "Conflict of interest",
        "An interest that could influence professional judgment."
      ],
      [
        "Benefit–risk assessment",
        "Evaluation of anticipated benefits and possible harms for a defined use."
      ]
    ],
    "sections": [
      [
        "Follow a product through development",
        "Discovery, preclinical evaluation, clinical investigation, manufacturing, and regulatory review answer different questions. A promising laboratory result is not proof of safety or effectiveness in humans. Process development considers reproducibility, scale, contamination control, and quality specifications. Regulatory responsibilities differ by product and jurisdiction: drugs, devices, food, and environmental applications do not all follow one pathway."
      ],
      [
        "Coordinate roles without confusing responsibilities",
        "Research develops hypotheses and methods; manufacturing executes controlled processes; quality control measures against specifications; quality assurance oversees the quality system. Regulatory affairs coordinates required submissions and commitments. A quality result cannot be replaced by a marketing claim. Traceable records connect product identity, test validity, deviations, and release decisions. Animal research oversight and human research ethics review have distinct purposes and are not interchangeable approvals."
      ],
      [
        "Build a reasoned ethical assessment",
        "State the proposed use, stakeholders, alternatives, benefits, harms, uncertainty, and distribution of costs and access. Consider autonomy and informed choice, welfare, fairness, privacy, and environmental consequences. Separate empirical questions from value judgments: evidence can estimate risk but does not alone decide which tradeoff is fair. Disclose conflicts and identify what additional evidence could change the decision."
      ],
      [
        "Apply the framework to genetic information",
        "A genetic result can affect relatives as well as the tested person. Explain purpose, limitations, who can access data, retention, and secondary uses. De-identification reduces some risks but is not a promise that genetic data can never be linked back to someone. Avoid overstating predictive power or pressuring participation. Ethical analysis remains necessary even when an activity is legally permitted; current legal requirements must be checked for the relevant setting."
      ]
    ],
    "examples": [
      [
        "Early evidence",
        "A therapy works in one cell model and a sponsor calls it proven in humans.",
        "The claim exceeds the evidence. Human safety and effectiveness need appropriately designed evaluation; development stage matters."
      ],
      [
        "Fair access",
        "A proposed genetic screening program excludes people unable to pay.",
        "Evaluate access, downstream care, informed choice, privacy, and alternatives alongside test performance. A technically accurate assay can still create inequitable outcomes."
      ]
    ],
    "cases": [
      [
        "A positive preclinical result most directly supports which conclusion?",
        "Further evaluation may be justified, within its evidence limits",
        [
          "The product is automatically approved",
          "Human safety is proven",
          "Manufacturing variability no longer matters"
        ],
        "Preclinical evidence is not equivalent to human clinical evidence or regulatory approval."
      ],
      [
        "What belongs in a biotechnology ethics analysis?",
        "Stakeholders, benefits, harms, alternatives, uncertainty, and fairness",
        [
          "Only whether the method is technically possible",
          "Only the sponsor’s preference",
          "Only the most optimistic outcome"
        ],
        "Ethical reasoning evaluates consequences and values with transparent evidence and limitations."
      ]
    ]
  }
];

// Rotate answer positions deterministically while keeping stable choice IDs.
function caseOptions(c: Case, offset: number) {
 const answers = [c[1], ...c[2]].map((text,index)=>({text,index,correct:index===0}));
 const rotation = offset % answers.length;
 return [...answers.slice(rotation), ...answers.slice(0,rotation)];
}
export const REVIEW_TOPICS: Topic[] = units.map((u,i)=>({id:`t_review_${u.id}`,domain_id:u.domain,name:u.title,description:`Review packet pages ${u.pages}: ${u.sections.map(s=>s[0]).join('; ')}.`,display_order:200+i}));
export const REVIEW_LESSONS: Lesson[] = units.map((u,i)=>({
 id:`les_review_${u.id}`,topic_id:`t_review_${u.id}`,domain_id:u.domain,title:u.title,
 description:`Build understanding through explanations, worked examples, and evidence-based decisions. Adapted from review packet pages ${u.pages}.`,estimated_minutes:25,display_order:200+i,active:true,
 key_vocabulary:u.terms.map(([term,definition])=>({term,definition})),important_concepts:u.sections.map(s=>s[0]),sections:u.sections.map(([title,content])=>({title,content})),
 worked_examples:u.examples.map(([title,scenario,solution])=>({title,scenario,solution})),common_mistakes:u.cases.map(c=>c[2][0]),
 bace_exam_tip:'Identify what the observation supports, check units and controls, and distinguish a supported conclusion from an unverified assumption. These review topics supplement the official exam domains; packet page counts do not change exam weights.',
 references:[...(u.id==='antibody_assay_formats'?[{title:'OpenStax Microbiology: Detecting antigen–antibody complexes',url:'https://openstax.org/books/microbiology/pages/20-2-detecting-antigen-antibody-complexes'}]:[]),...(u.id==='recombinant_design'?[{title:'NHGRI: Cloning Fact Sheet',url:'https://www.genome.gov/about-genomics/fact-sheets/Cloning-Fact-Sheet'},{title:'NHGRI: CRISPR',url:'https://www.genome.gov/genetics-glossary/CRISPR'}]:[]),{title:'OpenStax Biology 2e: foundational biology',url:'https://openstax.org/details/books/biology-2e'},...(u.id==='antimicrobial_interpretation'?[{title:'EUCAST: methods and quality control',url:'https://www.eucast.org/bacteria/methodology-and-instructions/disk-diffusion-and-quality-control/'},{title:'EUCAST: current interpretation tables',url:'https://www.eucast.org/bacteria/clinical-breakpoints-and-interpretation/clinical-breakpoint-tables/'}]:[])],
 lab_activities:u.cases.map((c,j)=>({id:`lab_review_${u.id}_${j}`,title:`Apply the evidence ${j+1}`,scenario:c[0],bace_competency:u.title,explanation:c[3],options:caseOptions(c,i+j).map(o=>({id:`review_${u.id}_${j}_${o.index}`,text:o.text,is_correct:o.correct,feedback:o.correct?c[3]:`Reconsider: ${c[3]}`}))}))
}));
export const REVIEW_QUESTIONS: Question[] = units.flatMap((u,i)=>u.cases.map((c,j)=>({
 id:`q_review_${u.id}_${j}`,domain_id:u.domain,topic_id:`t_review_${u.id}`,lesson_id:`les_review_${u.id}`,difficulty:'Medium' as const,question_type:'multiple_choice' as const,active:true,question_text:c[0],explanation:c[3],
 choices:caseOptions(c,i+j).map((o,k)=>({id:`q_review_${u.id}_${j}_${o.index}`,choice_text:o.text,is_correct:o.correct,display_order:k+1,explanation:o.correct?c[3]:`This conclusion is unsupported. ${c[3]}`}))
})));
const updates: Record<string,[string,string,string]> = {
  "les_controls_variables": [
    "1–8",
    "Hypotheses, theories, laws, and graphs",
    "A hypothesis is a testable proposed explanation. A theory is a broad explanation supported by converging evidence; a law describes a pattern or relationship. Theories do not graduate into laws, and both remain open to revision. Match a graph to the question: categories suit bars, distributions suit histograms, time trends suit line plots, and paired quantitative measurements suit scatterplots. Label axes with variables and units. Correlation alone does not demonstrate causation."
  ],
  "les_microscopy": [
    "67–92",
    "Staining observations versus identification",
    "Separate cell shape, arrangement, Gram reaction, and colony traits. A known positive and negative staining control check whether the run is interpretable. Over-decolorization can make a Gram-positive control appear pink; under-decolorization can make Gram-negative cells retain purple. Special stains ask about structures such as capsules, acid-fast envelopes, and endospores. A stain alone cannot identify a species or establish a clinical diagnosis. See Microbial Media, Stains & Identification for combined evidence."
  ],
  "les_math_molarity": [
    "52–65",
    "Final solution volume is the denominator",
    "Molarity is moles per liter of final solution, not molecules per liter or moles per liter of solvent added. For 850 mL of 2.50 M NaCl using 58.44 g/mol: mass = 2.50 × 0.850 × 58.44 = 124.185 g, approximately 124 g at three significant figures. Dissolve in less than 850 mL of suitable solvent and then bring to 850 mL final volume. Verify actual reagent form and the approved preparation tolerance."
  ],
  "les_central_dogma": [
    "148–163",
    "Reading frames and RNA processing",
    "Transcription makes RNA from a DNA template; translation reads an mRNA codon sequence to build a polypeptide. Read mRNA 5′ to 3′ in the specified frame and use RNA codons containing U, not T. Eukaryotic pre-mRNA processing can include a 5′ cap, splicing, and a poly(A) tail. Introns removed from RNA are not deleted from genomic DNA. A codon change can be synonymous, missense, or nonsense depending on the resulting coding sequence."
  ],
  "les_chromatography": [
    "196–200",
    "Stationary phases explain different separations",
    "Affinity chromatography uses a specific binding interaction; ion exchange separates by charge interactions; size exclusion separates by access to pores; hydrophobic interaction uses differences in exposed hydrophobic regions under defined buffer conditions. TLC compares migration on a plate: Rf = distance traveled by analyte / distance traveled by solvent front. Compare only compatible conditions. A clean-looking fraction still needs identity, purity, recovery, and activity assessment."
  ],
  "les_protein_methods": [
    "204–223",
    "Choose a readout for the actual question",
    "Bradford assays estimate protein concentration from dye binding relative to suitable standards. SDS-PAGE primarily resolves denatured polypeptides by size; reducing conditions can separate disulfide-linked chains. Western blots add antibody-based target recognition, Northern blots examine RNA, and Southern blots examine DNA. A band at an expected size is supporting evidence, not complete proof of identity or activity. A concentration measurement and a functional assay answer different questions."
  ],
  "les_immunoassay_validation": [
    "224–246",
    "Interpret antibody binding with valid controls",
    "Direct, indirect, sandwich, and competitive formats differ in what binds and how signal relates to target. Do not assume every assay has a signal that rises with concentration: competitive assays commonly show decreasing signal as target increases. Check calibrators, blanks, positive and negative controls, working range, and matrix effects. No detectable signal does not prove absolute absence, and a failed positive control prevents an antigen-negative interpretation."
  ],
  "les_cell_physiology": [
    "103–144",
    "Transport and energy are linked but distinct",
    "Passive transport follows electrochemical gradients and can use channels or carriers. Primary active transport directly couples transport to energy, often ATP hydrolysis; secondary active transport couples one gradient to movement of another solute. Endocytosis and exocytosis move material in vesicles. Cells also require regulated signaling, nutrient supply, and energy metabolism. Plants respire as well as photosynthesize; fermentation and anaerobic respiration are different processes."
  ],
  "les_sops": [
    "15, 35, 258",
    "Connect instructions to a completed record",
    "An SOP should identify purpose, scope, responsibilities, required materials, hazards, steps, acceptance criteria, records, and revision control as appropriate. A blank controlled form is not the completed record. Record actual dates, unambiguous 24-hour times, reagent lots, equipment identity, results, and deviations contemporaneously. Corrections must preserve the original entry and the reason. The packet’s worksheets are study exercises, not authorization to replace a laboratory’s approved SOP."
  ],
  "les_sds_ghs": [
    "22–31",
    "Read hazards before selecting controls",
    "Identify hazards from labels, the SDS, task, and exposure routes. A pictogram indicates a hazard class but does not alone specify all required PPE or disposal steps. Sterilization aims to eliminate viable microorganisms including resistant forms under validated conditions; disinfection has a different defined purpose and does not automatically establish sterility. Biological safety levels describe containment practices, facilities, and equipment selected through risk assessment."
  ],
  "les_standard_curves": [
    "211–216",
    "Blank correction and the valid range",
    "A calibration curve links known concentration to a measured signal. Define whether the stated regression already uses blank-corrected signals; do not subtract a blank twice. For A = 0.020c + 0.050 and a raw unknown A = 0.450, c = (0.450 − 0.050)/0.020 = 20.0 in the concentration units used for the standards. If the unknown was diluted fivefold, original concentration is 100 in those units. Confirm the value lies in the valid range before reporting."
  ],
  "les_culture_counting": [
    "93–94",
    "CFU, optical density, and total cells differ",
    "A colony can arise from one cell or a cluster, so CFU is not automatically an exact individual-cell count. For 80 colonies from 0.10 mL of a 10^-4 dilution: original CFU/mL = 80 / (0.10 × 10^-4) = 8.0 × 10^6. Check the procedure’s acceptable counting range and replicate handling. Optical density includes light scattering and needs a culture-specific relationship to estimate cells; it does not directly establish viable count."
  ],
  "les_ph_spec": [
    "48, 213–216, 255",
    "Logarithmic pH and optical measurements",
    "pH is related to hydrogen-ion activity on a logarithmic scale; a one-unit decrease corresponds to an approximately tenfold increase in hydrogen-ion activity under the usual simplified classroom model. Calibrate a pH meter with suitable standards and follow electrode care instructions. Absorbance and transmittance are different quantities. Use the appropriate wavelength, blank, path length, and working range; a reading without a valid method is not a defensible concentration."
  ],
  "les_lab_documentation": [
    "9–11, 35–46, 251–258",
    "Readable units, time, and observed precision",
    "Convert 9:05 PM to 21:05 and record the date and time zone where needed. Scientific notation preserves scale: 0.000450 L = 4.50 × 10^-4 L = 450 µL, with three significant figures in the stated liter value. Exact conversion factors do not limit precision; measured values do. Use actual balance readings and instrument identifiers, and check whether accuracy and precision satisfy the task rather than equating display digits with reliability."
  ]
};
export function enrichFromReview(lesson: Lesson): Lesson {
 const update = updates[lesson.id];
 if (!update) return lesson;
 return {...lesson,estimated_minutes:lesson.estimated_minutes+5,sections:[...lesson.sections,{title:`Review packet application: ${update[1]} (pages ${update[0]})`,content:update[2]}]};
}
