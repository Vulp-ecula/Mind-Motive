const {
  useState,
  useEffect,
  useRef
} = React;
const GLOSS = {
  victimology: "Who the victim was determines who could reach them. A low-risk victim killed anyway means the risk rode in with a trusted person.",
  signature: "Behavior beyond what the kill required — a psychological need the offender can't suppress. It stays constant across crimes.",
  staging: "Altering a scene to mislead investigators. Betrays a killer composed enough to arrange it, with something specific to hide.",
  origin: "In arson, the point a fire is set. Placed at the only exit, it converts 'burn the building' into 'kill the people'.",
  geographic: "Offenders based inside a ring of crimes (a 'marauder') won't foul their own doorstep — the clean centre points to home.",
  overkill: "Force far past what death required. Reads as personal: rage, intimacy, a specific grudge. Strangers rarely overkill.",
  escalation: "Rising boldness and shrinking gaps between crimes. Signals growing confidence and predicts a sooner next strike.",
  posing: "Arranging a body to send a message (vs. staging, which hides). The symbolism decodes the offender's motive.",
  linkage: "Tying crimes to one offender by consistent behavior — or recognizing when TWO offenders acted on one scene.",
  bias: "'Looks the type' is a stereotype, not evidence. Profiling narrows a pool; only hard evidence names a person.",
  mo: "Modus operandi — the practical method a crime required. It changes as an offender learns; it isn't the psychological constant.",
  cooling: "The 'cooling-off' period between serial crimes. Its length, and whether it shrinks, is itself a behavioral signal.",
  profile_tool: "A profile narrows a suspect pool by behavior and pattern — but it does not, by itself, identify a person. Only individuating evidence can.",
  undoing: "'Undoing' — the offender symbolically reverses the crime out of remorse: covering the face, laying the body out, cleaning a wound. It marks a close, conflicted relationship, not a stranger.",
  precipitation: "Victim precipitation — the victim's own actions (a threat, a provocation) shaped how the encounter escalated. It explains the dynamic; it never means the victim was at fault or deserved harm.",
  self_bias: "The profiler's own bias is the error. Training to see a pattern can make you force one onto a scene that doesn't hold it. The discipline includes doubting your own first read.",
  mission: "A mission-oriented offender kills to punish a category of person they deem unworthy, framing murder as duty. The symbolism broadcasts the ideology — when it is real.",
  nocrime: "Sometimes there is no crime: a natural death, an accident, or the victim's own harmless activity misread as sinister. Concluding 'no offender' is a valid, disciplined result."
};
const CASES = [{
  id: 1,
  title: "The Widow's Tea",
  tag: "POISONING",
  teaches: "Victimology · Signature",
  difficulty: 1,
  brief: "Eleanor Fitch, 68, widowed and wealthy, is found slumped in her parlour chair, the tea things laid for two. No forced door, nothing taken, no struggle — she poured for her killer and drank alongside them. A new will sits unsigned on the desk.",
  diagram: "<svg viewBox=\"0 0 420 190\" width=\"100%\" style=\"border-radius:8px;background:#100e0a;display:block\"><rect x=\"6\" y=\"6\" width=\"408\" height=\"178\" rx=\"6\" fill=\"none\" stroke=\"#2a2118\" stroke-width=\"1\"/><path d=\"M14 6 V14 M6 14 H14 M406 6 V14 M414 14 H406 M14 184 V176 M6 176 H14 M406 184 V176 M414 176 H406\" stroke=\"#3a2f22\" stroke-width=\"1\" fill=\"none\"/><text x=\"210\" y=\"24\" text-anchor=\"middle\" fill=\"#9a8a6a\" font-family=\"Georgia,serif\" font-size=\"11\" letter-spacing=\"2\">THE PARLOUR</text><ellipse cx=\"210\" cy=\"96\" rx=\"70\" ry=\"30\" fill=\"none\" stroke=\"#C8B48A\" stroke-width=\"1.4\"/><ellipse cx=\"210\" cy=\"96\" rx=\"70\" ry=\"30\" fill=\"#9E2B23\" opacity=\"0.04\"/><ellipse cx=\"160\" cy=\"96\" rx=\"10\" ry=\"4.5\" fill=\"none\" stroke=\"#C8B48A\" stroke-width=\"1.2\"/><ellipse cx=\"260\" cy=\"96\" rx=\"10\" ry=\"4.5\" fill=\"none\" stroke=\"#C8B48A\" stroke-width=\"1.2\"/><circle cx=\"210\" cy=\"96\" r=\"9\" fill=\"#B8863B\" opacity=\"0.85\"/><path d=\"M210 96 q6 -12 0 -20\" stroke=\"#5f7d8c\" stroke-width=\"1\" fill=\"none\" opacity=\"0.5\"/><circle cx=\"160\" cy=\"58\" r=\"9\" fill=\"#9E2B23\"/><text x=\"160\" y=\"46\" text-anchor=\"middle\" fill=\"#c9a9a6\" font-family=\"Georgia,serif\" font-size=\"9\">widow †</text><circle cx=\"260\" cy=\"58\" r=\"9\" fill=\"none\" stroke=\"#4E7A5E\" stroke-width=\"1.6\" stroke-dasharray=\"3 2\"/><text x=\"260\" y=\"46\" text-anchor=\"middle\" fill=\"#8fbfa0\" font-family=\"Georgia,serif\" font-size=\"9\">guest — survived</text><line x1=\"335\" y1=\"70\" x2=\"300\" y2=\"88\" stroke=\"#B8863B\" stroke-width=\"0.8\" opacity=\"0.6\"/><rect x=\"330\" y=\"52\" width=\"70\" height=\"30\" rx=\"3\" fill=\"none\" stroke=\"#B8863B\" stroke-width=\"1\"/><text x=\"365\" y=\"65\" text-anchor=\"middle\" fill=\"#d4a95e\" font-family=\"Georgia,serif\" font-size=\"8\">atropine</text><text x=\"365\" y=\"76\" text-anchor=\"middle\" fill=\"#9a8a6a\" font-family=\"Georgia,serif\" font-size=\"7.5\">(antidote)</text><text x=\"70\" y=\"132\" text-anchor=\"middle\" fill=\"#7f93a0\" font-family=\"Georgia,serif\" font-size=\"8\">no forced entry</text><text x=\"70\" y=\"144\" text-anchor=\"middle\" fill=\"#7f93a0\" font-family=\"Georgia,serif\" font-size=\"8\">will in locked drawer</text><text x=\"16\" y=\"178\" fill=\"#6b5d48\" font-family=\"Georgia,serif\" font-style=\"italic\" font-size=\"9\">exhibit — tea laid for two</text></svg>",
  clues: [{
    tag: "THE POT",
    text: "Dosed at the source — both cups poured from it, both drunk. The killer shared the pot and lived."
  }, {
    tag: "THE DRAWER",
    text: "A locked desk drawer, forced open. Inside: a new will, unsigned, that would have left everything to charity. The old will splits the estate between nephew and companion."
  }, {
    tag: "THE BASIN",
    text: "A rinsed vial of atropine upstairs — the antidote to this exact poison. Taken beforehand, it lets you drink the tea and live."
  }, {
    tag: "THE CABINET",
    text: "Only two people knew where the atropine was kept and how to dose it: the physician who prescribed it, and the companion who administered it to Eleanor daily for years."
  }],
  report: ["The offender is ", {
    slot: "t1",
    type: "trait"
  }, " and ", {
    slot: "t2",
    type: "trait"
  }, ". They ", {
    slot: "m1",
    type: "method"
  }, " the widow to secure the ", {
    slot: "mo1",
    type: "motive"
  }, ". Sitting to drink from the same poisoned pot is a ", {
    slot: "c1",
    type: "concept"
  }, " — a need beyond the kill itself. Surviving it took knowing the antidote and having it to hand, which names ", {
    slot: "n1",
    type: "name"
  }, "."],
  answer: {
    t1: "composed",
    t2: "insider",
    m1: "poisoned",
    mo1: "inheritance",
    c1: "signature",
    n1: "companion"
  },
  bank: [{
    id: "victimology",
    text: "victimology",
    type: "concept"
  }, {
    id: "signature",
    text: "signature",
    type: "concept"
  }, {
    id: "impulsive",
    text: "impulsive",
    type: "trait"
  }, {
    id: "composed",
    text: "composed",
    type: "trait"
  }, {
    id: "outsider",
    text: "an outsider",
    type: "trait"
  }, {
    id: "insider",
    text: "a trusted insider",
    type: "trait"
  }, {
    id: "strangled",
    text: "strangled",
    type: "method"
  }, {
    id: "poisoned",
    text: "poisoned",
    type: "method"
  }, {
    id: "revenge",
    text: "a sudden revenge",
    type: "motive"
  }, {
    id: "inheritance",
    text: "inheritance",
    type: "motive"
  }, {
    id: "nephew",
    text: "the nephew",
    type: "name"
  }, {
    id: "physician",
    text: "the physician",
    type: "name"
  }, {
    id: "companion",
    text: "the companion",
    type: "name"
  }],
  concepts: ["signature", "victimology"],
  hitLine: "Victimology put the killer at her table; the shared pot was the signature. Only the companion had both the knowledge of the antidote and daily access to it — the physician prescribed it but never sat down to tea.",
  partner: {
    wrong: {
      "impulsive": "Impulsive? She poured two cups and sat down. That's patience, not temper.",
      "outsider": "An outsider doesn't get invited to tea. Whoever did this, she trusted.",
      "nephew": "The nephew's loud about the money. Loud men rage — they don't share a laced pot and live.",
      "physician": "He knew the antidote — he prescribed it. But he never sat down to share the pot. Knowledge without a seat at the tea isn't enough.",
      "strangled": "No marks on her throat. Look again at the pot.",
      "revenge": "Revenge is hot and fast. This was cold and poured. Different animal.",
      "victimology": "Victimology's how you got here — it's not the trick in the pot. Wrong slot."
    },
    nudge: ["That doesn't sit right. Read the scene again.", "No. The evidence says otherwise."],
    praise: "Composed, trusted, knew the antidote. You built her before the boots confirmed it. Good.",
    consequence: "You hang the wrong soul, and the companion pours tea for her next widow."
  }
}, {
  id: 2,
  title: "The Forged Farewell",
  tag: "STAGED SUICIDE",
  teaches: "Staging · Required skill",
  difficulty: 1,
  brief: "Judge Hallam is found at his desk, a razor in his hand and a note beneath it confessing to a despair no one who knew him had ever glimpsed. Days earlier he had reopened an old conviction he'd come to believe was rotten — a case that, if it falls, drags down everyone whose name is on it. His death would be a tidy end to that inquiry. Too tidy.",
  diagram: "<svg viewBox=\"0 0 420 190\" width=\"100%\" style=\"border-radius:8px;background:#100e0a;display:block\"><rect x=\"6\" y=\"6\" width=\"408\" height=\"178\" rx=\"6\" fill=\"none\" stroke=\"#2a2118\" stroke-width=\"1\"/><path d=\"M14 6 V14 M6 14 H14 M406 6 V14 M414 14 H406 M14 184 V176 M6 176 H14 M406 184 V176 M414 176 H406\" stroke=\"#3a2f22\" stroke-width=\"1\" fill=\"none\"/><text x=\"210\" y=\"24\" text-anchor=\"middle\" fill=\"#9a8a6a\" font-family=\"Georgia,serif\" font-size=\"11\" letter-spacing=\"2\">THE CHAMBERS</text><rect x=\"150\" y=\"70\" width=\"120\" height=\"42\" rx=\"2\" fill=\"none\" stroke=\"#C8B48A\" stroke-width=\"1.3\"/><text x=\"210\" y=\"95\" text-anchor=\"middle\" fill=\"#9a8a6a\" font-family=\"Georgia,serif\" font-size=\"9\">desk · note · razor</text><circle cx=\"210\" cy=\"56\" r=\"9\" fill=\"#9E2B23\"/><text x=\"210\" y=\"44\" text-anchor=\"middle\" fill=\"#c9a9a6\" font-family=\"Georgia,serif\" font-size=\"9\">judge †</text><path d=\"M232 60 q14 -6 20 -16\" stroke=\"#D8722C\" stroke-width=\"1.6\" fill=\"none\" marker-end=\"url(#ar2)\"/><defs><marker id=\"ar2\" markerWidth=\"7\" markerHeight=\"7\" refX=\"4\" refY=\"3\" orient=\"auto\"><path d=\"M0 0 L6 3 L0 6 z\" fill=\"#D8722C\"/></marker></defs><text x=\"285\" y=\"40\" fill=\"#d8722c\" font-family=\"Georgia,serif\" font-size=\"8\">wound: from</text><text x=\"285\" y=\"51\" fill=\"#d8722c\" font-family=\"Georgia,serif\" font-size=\"8\">behind, upward</text><text x=\"60\" y=\"128\" fill=\"#7f93a0\" font-family=\"Georgia,serif\" font-size=\"8.5\">three faced ruin:</text><circle cx=\"55\" cy=\"145\" r=\"5\" fill=\"none\" stroke=\"#5f7d8c\" stroke-width=\"1.2\"/><text x=\"66\" y=\"149\" fill=\"#9a8a6a\" font-family=\"Georgia,serif\" font-size=\"8\">Vane — could forge the hand</text><circle cx=\"55\" cy=\"160\" r=\"5\" fill=\"none\" stroke=\"#5f7d8c\" stroke-width=\"1.2\"/><text x=\"66\" y=\"164\" fill=\"#6b5d48\" font-family=\"Georgia,serif\" font-size=\"8\">Kell — barely letters ✗   Marlow — stamps only ✗</text><text x=\"16\" y=\"178\" fill=\"#6b5d48\" font-family=\"Georgia,serif\" font-style=\"italic\" font-size=\"9\">exhibit — a suicide that isn't</text></svg>",
  clues: [{
    tag: "THE NOTE",
    text: "The confession is in Hallam's own hand — or a patient imitation of it. The forger got the loops right but not the life: the pen bears down with the same even pressure through every stroke, where a man unravelling toward his own throat writes in tremors and blots. A calm hand wrote this pretending to be a broken one. That takes composure, and time, and a close familiarity with how the judge formed his letters."
  }, {
    tag: "THE WOUND",
    text: "The cut runs low-to-high and back-to-front, drawn across the throat from behind and to one side. No man kills himself at that angle; the razor was worked by another hand while Hallam sat. This was murder, arranged afterward to read as a private grief."
  }, {
    tag: "THE ROTTEN CASE",
    text: "The conviction Hallam reopened was old but not forgotten. If it collapses, three men are exposed to ruin: PROSECUTOR VANE, who tried it; SERGEANT KELL, the arresting officer who swore to evidence now in doubt; and MARLOW, the trial clerk who logged and kept that evidence. All three had cause to want the inquiry dead with the judge."
  }, {
    tag: "WHO COULD FORGE IT",
    text: "Ask not only who wanted him dead, but who could have written that note. Kell is a blunt, barely-lettered man of the street who signs with difficulty. Marlow keeps the records but never saw the judge socially and knew his signature only from stamped filings. Vane sat across a bench from Hallam for twenty years, read his hand daily, dined at his table — the one man among the three both cool enough to stage this and close enough to counterfeit it."
  }],
  report: ["This death is a ", {
    slot: "c1",
    type: "concept"
  }, ", a murder dressed as suicide by someone ", {
    slot: "t1",
    type: "trait"
  }, " and ", {
    slot: "t2",
    type: "trait"
  }, ". They ", {
    slot: "m1",
    type: "method"
  }, " the judge to ", {
    slot: "mo1",
    type: "motive"
  }, ". Three men faced ruin, but only one had both the composure to stage it and the long closeness to forge that hand. That is ", {
    slot: "n1",
    type: "name"
  }, "."],
  answer: {
    c1: "staging",
    t1: "composed",
    t2: "insider",
    m1: "murdered",
    mo1: "bury_case",
    n1: "prosecutor"
  },
  bank: [{
    id: "signature",
    text: "signature",
    type: "concept"
  }, {
    id: "staging",
    text: "staging",
    type: "concept"
  }, {
    id: "stranger",
    text: "a stranger",
    type: "trait"
  }, {
    id: "composed",
    text: "composed",
    type: "trait"
  }, {
    id: "frenzied",
    text: "frenzied",
    type: "trait"
  }, {
    id: "insider",
    text: "long close to the judge",
    type: "trait"
  }, {
    id: "poisoned",
    text: "poisoned",
    type: "method"
  }, {
    id: "murdered",
    text: "murdered",
    type: "method"
  }, {
    id: "old_grudge",
    text: "settle an old grudge",
    type: "motive"
  }, {
    id: "bury_case",
    text: "bury the reopened case",
    type: "motive"
  }, {
    id: "clerk",
    text: "Marlow, the clerk",
    type: "name"
  }, {
    id: "prosecutor",
    text: "Vane, the prosecutor",
    type: "name"
  }, {
    id: "groundskeeper",
    text: "Kell, the officer",
    type: "name"
  }],
  concepts: ["staging", "signature"],
  hitLine: "All three faced ruin if the case fell, so motive alone couldn't name the killer. The forged note is what narrowed it: Kell can barely sign his name, and Marlow knew Hallam's hand only from stamped filings — neither could counterfeit a lifetime of penmanship. Only Vane, twenty years across the bench and at the judge's own table, was both composed enough to stage a suicide and close enough to forge one. The skill named him, once the motive couldn't.",
  partner: {
    wrong: {
      "frenzied": "A frenzied man leaves a butchered scene, not a forged farewell with the pen-pressure just so. Whoever did this was calm enough to counterfeit a dying man's hand. That's composure, not frenzy.",
      "stranger": "A stranger has no share in that rotten old case and no way to fake the judge's writing. This was someone with everything to lose and years of closeness to spend.",
      "clerk": "Marlow had the motive, I grant you — the evidence was his to keep. But he knew Hallam's hand only from stamped filings, never socially. You can't forge a life's penmanship off a rubber stamp. He couldn't have written that note.",
      "groundskeeper": "Kell swore to the evidence and he'd hang if the case fell — motive enough. But the man can barely sign his own name. The one thing this killer had to do was forge a judge's hand, and Kell simply couldn't. Rule him out on the skill, not the grudge.",
      "poisoned": "No poison in this — the wound's the tell, drawn from behind at an angle no suicide could reach. He was murdered, then staged.",
      "old_grudge": "All three carried a grudge and a fear. A grudge doesn't narrow it. Ask what the killing was FOR — to kill the inquiry by killing the judge. That's the motive that fits the staging.",
      "signature": "Signature's a repeated need across crimes. This is one murder hidden inside a fake suicide — a thing dressed up to deceive us. The word for that is staging."
    },
    nudge: ["All three wanted him dead. Stop weighing motive and ask who could have forged that hand.", "Two of the three couldn't have written the note. Find them, and one man is left."],
    praise: "Motive couldn't separate them — all three faced ruin. You let the forged hand do the work: the officer can't write, the clerk knew only stamped filings, and only Vane was close enough for twenty years to counterfeit the judge. Reasoning from skill, not just grudge. Sharp.",
    consequence: "You charge Kell on his grudge, or Marlow on his keeping of the evidence — and Vane, the one man who could forge that farewell, walks free with the inquiry safely buried beside the judge."
  }
}, {
  id: 3,
  title: "The Tenement Blaze",
  tag: "ARSON",
  teaches: "Point of origin · MO vs. motive",
  difficulty: 2,
  brief: "Fire takes the Curran tenement before dawn; a landlord and two lodgers die of smoke. The char tells a colder story than an accident — the burn climbs from one deliberate point, and the reek of oil hangs in the timber.",
  diagram: "<svg viewBox=\"0 0 420 190\" width=\"100%\" style=\"border-radius:8px;background:#100e0a;display:block\"><rect x=\"6\" y=\"6\" width=\"408\" height=\"178\" rx=\"6\" fill=\"none\" stroke=\"#2a2118\" stroke-width=\"1\"/><path d=\"M14 6 V14 M6 14 H14 M406 6 V14 M414 14 H406 M14 184 V176 M6 176 H14 M406 184 V176 M414 176 H406\" stroke=\"#3a2f22\" stroke-width=\"1\" fill=\"none\"/><text x=\"210\" y=\"24\" text-anchor=\"middle\" fill=\"#9a8a6a\" font-family=\"Georgia,serif\" font-size=\"11\" letter-spacing=\"2\">THE TENEMENT</text><rect x=\"120\" y=\"40\" width=\"180\" height=\"120\" fill=\"none\" stroke=\"#C8B48A\" stroke-width=\"1.3\"/><line x1=\"120\" y1=\"80\" x2=\"300\" y2=\"80\" stroke=\"#C8B48A\" stroke-width=\"0.7\" opacity=\"0.5\"/><line x1=\"120\" y1=\"120\" x2=\"300\" y2=\"120\" stroke=\"#C8B48A\" stroke-width=\"0.7\" opacity=\"0.5\"/><rect x=\"195\" y=\"40\" width=\"30\" height=\"120\" fill=\"none\" stroke=\"#C8B48A\" stroke-width=\"0.9\" stroke-dasharray=\"2 2\"/><text x=\"210\" y=\"55\" text-anchor=\"middle\" fill=\"#9a8a6a\" font-family=\"Georgia,serif\" font-size=\"7.5\">STAIR</text><path d=\"M210 158 q-10 -18 0 -30 q10 12 0 30\" fill=\"#D8722C\" opacity=\"0.35\"/><path d=\"M210 158 q-5 -12 0 -20 q5 8 0 20\" fill=\"#D8722C\" opacity=\"0.7\"/><line x1=\"240\" y1=\"150\" x2=\"225\" y2=\"150\" stroke=\"#D8722C\" stroke-width=\"1\"/><text x=\"245\" y=\"146\" fill=\"#d8722c\" font-family=\"Georgia,serif\" font-size=\"8.5\">origin —</text><text x=\"245\" y=\"157\" fill=\"#d8722c\" font-family=\"Georgia,serif\" font-size=\"8.5\">the only exit</text><text x=\"70\" y=\"70\" text-anchor=\"middle\" fill=\"#c9a9a6\" font-family=\"Georgia,serif\" font-size=\"8\">3 dead †</text><text x=\"72\" y=\"92\" text-anchor=\"middle\" fill=\"#7f93a0\" font-family=\"Georgia,serif\" font-size=\"8\">insurance</text><text x=\"72\" y=\"103\" text-anchor=\"middle\" fill=\"#7f93a0\" font-family=\"Georgia,serif\" font-size=\"8\">lapsed</text><text x=\"16\" y=\"178\" fill=\"#6b5d48\" font-family=\"Georgia,serif\" font-style=\"italic\" font-size=\"9\">exhibit — arson · point of origin</text></svg>",
  clues: [{
    tag: "THE ORIGIN",
    text: "The burn climbs from the base of the only staircase — the sole way out."
  }, {
    tag: "THE TRAIL",
    text: "A poured line of accelerant runs the length of the hall. Deliberate, directional."
  }, {
    tag: "THE LEDGER",
    text: "The building's fire insurance lapsed a month ago, the policy left to expire unpaid."
  }, {
    tag: "THE CROWD",
    text: "Held back behind the constables' line with the rest of the gawpers, one man stood out — not for being close, but for his face. Where the others wore the horror of neighbours watching a family burn, he watched with a rapt, glassy fixation, lips parted, and gave a false name when the constable took witnesses. He was seen again the next morning, drawn back to pick through the cold, wet char after the crowd had gone."
  }],
  report: ["The ", {
    slot: "c1",
    type: "concept"
  }, " at the only exit shows the ", {
    slot: "c2",
    type: "concept"
  }, " was to ", {
    slot: "m1",
    type: "method"
  }, ", not to collect money. With no payout to be had, the motive was ", {
    slot: "mo1",
    type: "motive"
  }, " — the mark of a ", {
    slot: "t1",
    type: "trait"
  }, ", ", {
    slot: "t2",
    type: "trait"
  }, " setter. Among the crowd, ", {
    slot: "n1",
    type: "name"
  }, " fits."],
  answer: {
    c1: "origin",
    c2: "mo",
    m1: "trap_kill",
    mo1: "thrill",
    t1: "planner",
    t2: "local",
    n1: "watcher"
  },
  bank: [{
    id: "signature",
    text: "signature",
    type: "concept"
  }, {
    id: "geographic",
    text: "geographic profile",
    type: "concept"
  }, {
    id: "origin",
    text: "point of origin",
    type: "concept"
  }, {
    id: "mo",
    text: "practical method",
    type: "concept"
  }, {
    id: "opportunist",
    text: "opportunistic",
    type: "trait"
  }, {
    id: "acquisitive",
    text: "money-driven",
    type: "trait"
  }, {
    id: "local",
    text: "local",
    type: "trait"
  }, {
    id: "planner",
    text: "methodical",
    type: "trait"
  }, {
    id: "scare_off",
    text: "scare off the tenants",
    type: "method"
  }, {
    id: "trap_kill",
    text: "trap and kill the lodgers",
    type: "method"
  }, {
    id: "burn_shell",
    text: "burn the empty shell",
    type: "method"
  }, {
    id: "eviction",
    text: "revenge for an eviction",
    type: "motive"
  }, {
    id: "thrill",
    text: "the thrill of watching",
    type: "motive"
  }, {
    id: "profit",
    text: "an insurance payout",
    type: "motive"
  }, {
    id: "partner",
    text: "the landlord's partner",
    type: "name"
  }, {
    id: "tenant",
    text: "the evicted tenant",
    type: "name"
  }, {
    id: "watcher",
    text: "the lingering watcher",
    type: "name"
  }],
  concepts: ["origin", "mo", "geographic", "signature"],
  hitLine: "Origin at the exit meant murder, not property; the method isn't the motive; the lapsed policy rules out profit. What's left is the man who watched a family burn with hunger instead of horror, gave a false name, and crept back to the cold ashes the next day — the setter who lives for the fire.",
  partner: {
    wrong: {
      "burn_shell": "Burn the shell? He fired the only stair. That's not property — that's people.",
      "scare_off": "A scare doesn't block the exit. He wanted them in there.",
      "profit": "Check the ledger. Insurance lapsed a month back. No payout — no profit motive.",
      "acquisitive": "Money-driven? There's no money in this fire. Look at why he stayed to watch.",
      "opportunist": "An opportunist takes what's there. This one poured a trail and planned the trap.",
      "partner": "The partner wanted a payout that doesn't exist. Dead end.",
      "tenant": "One grudge burns one building and runs. This one lingered in the heat, savouring it. That's not revenge — it's appetite.",
      "geographic": "Geography's a different case. Here it's where the fire starts that talks.",
      "signature": "Signature's not the read. It's where he lit it — the origin."
    },
    nudge: ["The char tells a different story.", "No. Follow the origin, not the obvious."],
    praise: "Origin at the exit, a motive that isn't money, and a man who watched with hunger where others watched with horror. You read the fire, and the face in the crowd, like a page.",
    consequence: "The watcher walks, and lights the next one just to feel the heat."
  }
}, {
  id: 4,
  title: "The Harbour Ring",
  tag: "SERIAL",
  teaches: "Geographic profiling · Linkage",
  difficulty: 2,
  brief: "Four dock workers, pulled from the water in six weeks, each with the same thin ligature furrow pressed into the throat. The harbour district is a warren of a thousand souls, and any of them could be the one. But there is a shape to the killings that most eyes slide right past — a shape that only shows itself when you stop asking who had reason, and start asking where.",
  diagram: "<svg viewBox=\"0 0 420 190\" width=\"100%\" style=\"border-radius:8px;background:#100e0a;display:block\"><rect x=\"6\" y=\"6\" width=\"408\" height=\"178\" rx=\"6\" fill=\"none\" stroke=\"#2a2118\" stroke-width=\"1\"/><path d=\"M14 6 V14 M6 14 H14 M406 6 V14 M414 14 H406 M14 184 V176 M6 176 H14 M406 184 V176 M414 176 H406\" stroke=\"#3a2f22\" stroke-width=\"1\" fill=\"none\"/><text x=\"210\" y=\"22\" text-anchor=\"middle\" fill=\"#9a8a6a\" font-family=\"Georgia,serif\" font-size=\"11\" letter-spacing=\"2\">THE HARBOUR</text><circle cx=\"200\" cy=\"100\" r=\"62\" fill=\"none\" stroke=\"#5f7d8c\" stroke-width=\"1\" stroke-dasharray=\"5 4\" opacity=\"0.8\"/><circle cx=\"200\" cy=\"42\" r=\"5.5\" fill=\"#9E2B23\"/><circle cx=\"258\" cy=\"86\" r=\"5.5\" fill=\"#9E2B23\"/><circle cx=\"236\" cy=\"152\" r=\"5.5\" fill=\"#9E2B23\"/><circle cx=\"150\" cy=\"146\" r=\"5.5\" fill=\"#9E2B23\"/><circle cx=\"200\" cy=\"100\" r=\"20\" fill=\"#4E7A5E\" opacity=\"0.10\"/><circle cx=\"200\" cy=\"100\" r=\"20\" fill=\"none\" stroke=\"#4E7A5E\" stroke-width=\"0.8\" stroke-dasharray=\"2 3\"/><circle cx=\"200\" cy=\"100\" r=\"4\" fill=\"#4E7A5E\"/><text x=\"200\" y=\"104\" text-anchor=\"middle\" fill=\"#8fbfa0\" font-family=\"Georgia,serif\" font-size=\"7\">Wren</text><text x=\"200\" y=\"124\" text-anchor=\"middle\" fill=\"#8fbfa0\" font-family=\"Georgia,serif\" font-size=\"8\">clean hollow = his home</text><text x=\"335\" y=\"70\" fill=\"#6b5d48\" font-family=\"Georgia,serif\" font-size=\"8\">Fenn ▸ far shore</text><text x=\"335\" y=\"84\" fill=\"#6b5d48\" font-family=\"Georgia,serif\" font-size=\"8\">Rooke ▸ north</text><text x=\"335\" y=\"98\" fill=\"#6b5d48\" font-family=\"Georgia,serif\" font-size=\"8\">Hale ▸ outer quay</text><text x=\"35\" y=\"46\" fill=\"#c9a9a6\" font-family=\"Georgia,serif\" font-size=\"8\">4 dead</text><text x=\"16\" y=\"178\" fill=\"#6b5d48\" font-family=\"Georgia,serif\" font-style=\"italic\" font-size=\"9\">exhibit — geographic — the marauder's ring</text></svg>",
  clues: [{
    tag: "THE MARK",
    text: "The same ligature furrow on every throat — a thin, waxed cord, drawn from behind, knotted the same way each time. One method, one hand, four dead. These killings belong together."
  }, {
    tag: "THE MAP",
    text: "Pin the four recovery sites to a chart and a pattern surfaces: they fall on the rim of a rough circle around the old basin. The streets in the middle of that circle — the tight knot of lanes by the cistern — have seen nothing. No body, no struggle, no alarm. A hole in the heart of the killing ground."
  }, {
    tag: "THE APPROACH",
    text: "No cart-rut, no hoofprint, no boat scraped ashore at any site. Every victim was walked to the water on foot, in the dark, by someone who knew the lanes well enough to move through them unseen and unhurried."
  }, {
    tag: "THE FOUR",
    text: "Four men fall under suspicion. NICHOLAS FENN, a ferryman, strong-handed, who works the crossing and beds down on the far shore each night. ABEL ROOKE, a corn-merchant with debts to two of the dead, who lodges in the prosperous streets two districts north. TOBIAS HALE, a carter who hauls along the outer quays and sleeps above his stable at the harbour's edge. And SILAS WREN, a lamplighter whose round is the inner lanes by the cistern, where he lives above a chandler's shop — the only one of the four whose bed lies within the ring."
  }],
  report: ["The matching ligature is a ", {
    slot: "c1",
    type: "concept"
  }, ", binding four deaths to a single hand. The circle of sites with an untouched hollow at its heart is a ", {
    slot: "c2",
    type: "concept"
  }, " pattern — the sign of a ", {
    slot: "t1",
    type: "trait"
  }, ", ", {
    slot: "t2",
    type: "trait"
  }, " offender who will not hunt on his own doorstep and so leaves it clean. Weighed against the map, three of the men live too far out to fit; only one sleeps inside the ring. Charge ", {
    slot: "n1",
    type: "name"
  }, "."],
  answer: {
    c1: "linkage",
    c2: "geographic",
    t1: "local",
    t2: "planner",
    n1: "lamplighter"
  },
  bank: [{
    id: "escalation",
    text: "escalation",
    type: "concept"
  }, {
    id: "linkage",
    text: "linkage",
    type: "concept"
  }, {
    id: "signature",
    text: "signature",
    type: "concept"
  }, {
    id: "geographic",
    text: "marauder",
    type: "concept"
  }, {
    id: "opportunist",
    text: "opportunistic",
    type: "trait"
  }, {
    id: "local",
    text: "locally-based",
    type: "trait"
  }, {
    id: "mobile",
    text: "a travelling commuter",
    type: "trait"
  }, {
    id: "planner",
    text: "methodical",
    type: "trait"
  }, {
    id: "ferryman",
    text: "Fenn, the ferryman",
    type: "name"
  }, {
    id: "lamplighter",
    text: "Wren, the lamplighter",
    type: "name"
  }, {
    id: "carter",
    text: "Hale, the carter",
    type: "name"
  }, {
    id: "merchant",
    text: "Rooke, the merchant",
    type: "name"
  }],
  concepts: ["linkage", "geographic", "escalation", "signature"],
  hitLine: "The ligature bound the four into one series; the marauder's clean hollow marked his home ground. Fenn beds across the water, Rooke two districts north, Hale at the outer quays — only Wren sleeps inside the ring, walking its lanes each night with a cord in his pocket. The geometry named him, not the motive.",
  partner: {
    wrong: {
      "mobile": "A commuter travels in to hunt and travels out. This one leaves the centre of his own circle untouched — that's a man who lives there and won't soil his doorstep.",
      "opportunist": "Four identical knots in six weeks? That's not chance-taking. That's a man with a method and the patience to repeat it.",
      "ferryman": "Fenn's strong enough, granted. But he beds across the water every night — the whole far shore between him and the ring. Look where the sites hollow out.",
      "merchant": "Rooke owed two of them money, I know. But he lodges two districts north, and money buys a knife in an alley, not four matched knots by the water. Wrong shape.",
      "carter": "Hale works the outer quays and sleeps at the harbour's edge — outside the rim. The killer's bed is in the hollow, not on the edge of it.",
      "escalation": "They didn't quicken — they encircled. It's not about the tempo here, it's about the map.",
      "signature": "The matching cord links them into one series, true — but the thing the map is shouting is geography. That's the slot that matters here."
    },
    nudge: ["Stop asking who had reason. Ask where he'd feel safe enough to leave a body.", "The empty middle is the loudest thing on that chart. Who sleeps in it?"],
    praise: "You didn't chase the debts or the strong hands. You read the hollow at the centre for what it was — a man protecting his own doorstep — and only Wren lives there. That's geographic profiling done right.",
    consequence: "You charge one of the outsiders and the file closes. But Wren lights his lamps that same evening, walks his quiet lanes, and the cord stays in his pocket for the fifth."
  }
}, {
  id: 5,
  title: "The Mallet and the Nail",
  tag: "BLUNT FORCE",
  teaches: "Overkill · Signature · Deception",
  difficulty: 2,
  brief: "Silas Reed, master carpenter, lies dead at his own bench, his skull broken open by blow after blow — struck long past the point that killing needed. The workshop looks ransacked: drawers hang open, tools scattered, a strongbox forced. It reads at a glance like a robbery gone savage. But two things in the room refuse to fit that story, and once you see them, the ransacking starts to look like a costume the scene was dressed in.",
  diagram: "<svg viewBox=\"0 0 420 190\" width=\"100%\" style=\"border-radius:8px;background:#100e0a;display:block\"><rect x=\"6\" y=\"6\" width=\"408\" height=\"178\" rx=\"6\" fill=\"none\" stroke=\"#2a2118\" stroke-width=\"1\"/><path d=\"M14 6 V14 M6 14 H14 M406 6 V14 M414 14 H406 M14 184 V176 M6 176 H14 M406 184 V176 M414 176 H406\" stroke=\"#3a2f22\" stroke-width=\"1\" fill=\"none\"/><text x=\"210\" y=\"22\" text-anchor=\"middle\" fill=\"#9a8a6a\" font-family=\"Georgia,serif\" font-size=\"11\" letter-spacing=\"2\">THE WORKSHOP</text><rect x=\"40\" y=\"78\" width=\"90\" height=\"34\" fill=\"none\" stroke=\"#C8B48A\" stroke-width=\"1.3\"/><text x=\"85\" y=\"99\" text-anchor=\"middle\" fill=\"#9a8a6a\" font-family=\"Georgia,serif\" font-size=\"8.5\">bench</text><circle cx=\"85\" cy=\"56\" r=\"9\" fill=\"#9E2B23\"/><text x=\"85\" y=\"44\" text-anchor=\"middle\" fill=\"#c9a9a6\" font-family=\"Georgia,serif\" font-size=\"9\">Reed †</text><text x=\"150\" y=\"54\" fill=\"#d8722c\" font-family=\"Georgia,serif\" font-size=\"8.5\">12+ blows —</text><text x=\"150\" y=\"65\" fill=\"#d8722c\" font-family=\"Georgia,serif\" font-size=\"8.5\">overkill</text><rect x=\"270\" y=\"44\" width=\"130\" height=\"80\" fill=\"none\" stroke=\"#C8B48A\" stroke-width=\"1\"/><text x=\"335\" y=\"40\" text-anchor=\"middle\" fill=\"#9a8a6a\" font-family=\"Georgia,serif\" font-size=\"7.5\">TOOL WALL</text><rect x=\"288\" y=\"58\" width=\"16\" height=\"8\" fill=\"none\" stroke=\"#C8B48A\" stroke-width=\"0.8\"/><rect x=\"316\" y=\"58\" width=\"16\" height=\"8\" fill=\"none\" stroke=\"#C8B48A\" stroke-width=\"0.8\"/><rect x=\"344\" y=\"58\" width=\"20\" height=\"9\" fill=\"none\" stroke=\"#4E7A5E\" stroke-width=\"1.6\"/><text x=\"354\" y=\"84\" text-anchor=\"middle\" fill=\"#8fbfa0\" font-family=\"Georgia,serif\" font-size=\"7.5\">mallet:</text><text x=\"354\" y=\"94\" text-anchor=\"middle\" fill=\"#8fbfa0\" font-family=\"Georgia,serif\" font-size=\"7.5\">wiped, re-hung</text><text x=\"150\" y=\"132\" fill=\"#7f93a0\" font-family=\"Georgia,serif\" font-size=\"8\">strongbox forced · silver &amp; coin left = robbery is costume</text><text x=\"16\" y=\"178\" fill=\"#6b5d48\" font-family=\"Georgia,serif\" font-style=\"italic\" font-size=\"9\">exhibit — rage and order, one hand</text></svg>",
  clues: [{
    tag: "THE BLOWS",
    text: "The coroner counts more than a dozen hammer-strikes to the head, most delivered after the first three had already killed him. This is not a man silencing a witness or clearing a path to the strongbox. This is someone emptying a lifetime of fury into a body that had already stopped moving."
  }, {
    tag: "THE MALLET",
    text: "The weapon is Reed's own heavy joiner's mallet — and here is the strange thing. It was not dropped, not flung aside, not carried off. It was wiped clean of blood and hung back on its numbered peg on the tool wall, seated exactly within the painted outline that marks its place. A man fleeing a killing does not pause to tidy the murder weapon."
  }, {
    tag: "THE STRONGBOX",
    text: "Forced open, yes — but the day's takings still sit inside, and Reed's silver is untouched on the shelf above. Whoever pulled these drawers open wanted the room to look robbed. They did not actually want anything in it."
  }, {
    tag: "THE MASTERWORK",
    text: "On the bench sits a guild medal, newly won — for a carved altarpiece the whole city has praised, entered and awarded under REED'S name. But the apprentice who served him fifteen years is whispered in the trade to have carved every inch of it himself, his master's signature laid over his work like a brand. Reed took the credit, the medal, and the commissions that followed. The apprentice got his name erased. He is known too as painfully precise — a man who cannot abide a tool left out of its place. The rival joiner two doors down, loud and long-feuding with Reed over trade, is the name the district mutters instead."
  }],
  report: ["The blows struck long past death are ", {
    slot: "c1",
    type: "concept"
  }, ", the mark of someone ", {
    slot: "t1",
    type: "trait"
  }, " rather than a thief. The ransacked room takes untouched silver, so the robbery is only ", {
    slot: "mo1",
    type: "motive"
  }, ". But the weapon wiped and re-hung in its exact place is a ", {
    slot: "c2",
    type: "concept"
  }, " no thief would leave — the tell of a ", {
    slot: "t2",
    type: "trait"
  }, " mind that cannot abide disorder. That names ", {
    slot: "n1",
    type: "name"
  }, "."],
  answer: {
    c1: "overkill",
    t1: "personal",
    mo1: "frameup",
    c2: "signature",
    t2: "ritualist",
    n1: "apprentice"
  },
  bank: [{
    id: "mo",
    text: "practical method",
    type: "concept"
  }, {
    id: "signature",
    text: "compulsive signature",
    type: "concept"
  }, {
    id: "overkill",
    text: "overkill",
    type: "concept"
  }, {
    id: "staging",
    text: "staging",
    type: "concept"
  }, {
    id: "stranger",
    text: "a cold stranger",
    type: "trait"
  }, {
    id: "personal",
    text: "personally enraged",
    type: "trait"
  }, {
    id: "frenzied",
    text: "randomly frenzied",
    type: "trait"
  }, {
    id: "ritualist",
    text: "compulsively orderly",
    type: "trait"
  }, {
    id: "true_lead",
    text: "the real motive",
    type: "motive"
  }, {
    id: "frameup",
    text: "a staged disguise",
    type: "motive"
  }, {
    id: "rival",
    text: "the feuding rival",
    type: "name"
  }, {
    id: "robber",
    text: "a passing robber",
    type: "name"
  }, {
    id: "apprentice",
    text: "the uncredited apprentice",
    type: "name"
  }],
  concepts: ["overkill", "signature", "staging", "mo"],
  hitLine: "Overkill past death made it personal, not profit. The forced strongbox with the silver left behind made the robbery a costume. And no thief wipes a murder weapon and hangs it back on its peg — that compulsion for order belonged to the apprentice whose masterwork Reed had signed as his own, not the rival the street wanted to blame. A man erased from his own finest work, killing to be seen, then setting the room right.",
  partner: {
    wrong: {
      "stranger": "A stranger kills and runs. He doesn't stay to hang the mallet back on its peg like it's closing time. Whoever did this couldn't leave the room untidy — that's not a stranger, that's a habit.",
      "frenzied": "There's fury here, yes, but look at the wall. A man in a blind frenzy doesn't wipe the weapon and seat it in its painted outline. Rage and order, both hands the same man.",
      "rival": "The whole street wants it to be the rival — loud, feuding, obvious. That's exactly why I don't trust it. The rival would leave the mallet where it fell. This killer put it away.",
      "robber": "A robber who leaves the silver and the day's takings? The strongbox was forced to make a story, not to steal. Nothing left that room in a thief's pocket.",
      "staging": "Close — the robbery IS staging. But the re-hung mallet isn't part of the disguise; he'd have hidden that if he were thinking. It's the thing he couldn't help doing. That's signature.",
      "mo": "The method's just a mallet. What names him is the compulsion to set it right afterward — and that's signature, not method.",
      "true_lead": "The ransacking isn't the real motive — the silver's still here. It's a costume pulled over the real reason. A disguise."
    },
    nudge: ["Two things don't fit the robbery story. Find them and the costume falls off.", "Ask why a fleeing killer would tidy the weapon. Only one kind of man does that."],
    praise: "You saw past the staged robbery to the two things that betrayed it — the untouched silver and the mallet hung back in its place. The street blamed the loud rival; you found the precise, wounded apprentice whose masterwork Reed had stolen. That's the work.",
    consequence: "The apprentice hangs the mallet back on its peg, and the rival — loud, feuding, innocent — takes the rope for a scene that was dressed to point at him."
  }
}, {
  id: 6,
  title: "The Marked Page",
  tag: "SERIAL",
  teaches: "Communicative signature · Escalation",
  difficulty: 3,
  hideLabels: true,
  brief: "Three deaths, three cities, across a single year. Each victim an older man of letters — a schoolmaster, a college tutor, a choirmaster — each found without a mark of violence, seated as if asleep among his books. And at each scene, one volume left open, a single passage scored beneath in the same patient hand. The killer takes nothing, breaks nothing, leaves nothing but the line he wants read.",
  diagram: "<svg viewBox=\"0 0 420 190\" width=\"100%\" style=\"border-radius:8px;background:#100e0a;display:block\"><rect x=\"6\" y=\"6\" width=\"408\" height=\"178\" rx=\"6\" fill=\"none\" stroke=\"#2a2118\" stroke-width=\"1\"/><path d=\"M14 6 V14 M6 14 H14 M406 6 V14 M414 14 H406 M14 184 V176 M6 176 H14 M406 184 V176 M414 176 H406\" stroke=\"#3a2f22\" stroke-width=\"1\" fill=\"none\"/><text x=\"210\" y=\"24\" text-anchor=\"middle\" fill=\"#9a8a6a\" font-family=\"Georgia,serif\" font-size=\"11\" letter-spacing=\"2\">THREE CITIES · ONE YEAR</text><line x1=\"55\" y1=\"86\" x2=\"365\" y2=\"86\" stroke=\"#C8B48A\" stroke-width=\"1\"/><circle cx=\"70\" cy=\"86\" r=\"7\" fill=\"#9E2B23\"/><circle cx=\"205\" cy=\"86\" r=\"7\" fill=\"#9E2B23\"/><circle cx=\"335\" cy=\"86\" r=\"7\" fill=\"#9E2B23\"/><text x=\"70\" y=\"108\" text-anchor=\"middle\" fill=\"#9a8a6a\" font-family=\"Georgia,serif\" font-size=\"8\">tutor †</text><text x=\"205\" y=\"108\" text-anchor=\"middle\" fill=\"#9a8a6a\" font-family=\"Georgia,serif\" font-size=\"8\">master †</text><text x=\"335\" y=\"108\" text-anchor=\"middle\" fill=\"#9a8a6a\" font-family=\"Georgia,serif\" font-size=\"8\">choirmaster †</text><text x=\"137\" y=\"76\" text-anchor=\"middle\" fill=\"#5f7d8c\" font-family=\"Georgia,serif\" font-size=\"8\">— 6 months —</text><text x=\"270\" y=\"76\" text-anchor=\"middle\" fill=\"#D8722C\" font-family=\"Georgia,serif\" font-size=\"8\">5 weeks ↓</text><text x=\"70\" y=\"66\" text-anchor=\"middle\" fill=\"#B8863B\" font-family=\"Georgia,serif\" font-size=\"9\">✎</text><text x=\"205\" y=\"66\" text-anchor=\"middle\" fill=\"#B8863B\" font-family=\"Georgia,serif\" font-size=\"9\">✎</text><text x=\"335\" y=\"66\" text-anchor=\"middle\" fill=\"#B8863B\" font-family=\"Georgia,serif\" font-size=\"9\">✎</text><text x=\"210\" y=\"138\" text-anchor=\"middle\" fill=\"#8fbfa0\" font-family=\"Georgia,serif\" font-size=\"8.5\">underlined line at each scene · gap shrinking = escalation</text><text x=\"210\" y=\"152\" text-anchor=\"middle\" fill=\"#6b5d48\" font-family=\"Georgia,serif\" font-size=\"8\">only Callow could stand in all three</text><text x=\"16\" y=\"178\" fill=\"#6b5d48\" font-family=\"Georgia,serif\" font-style=\"italic\" font-size=\"9\">exhibit — the killer speaks in the margins</text></svg>",
  clues: [{
    tag: "THE PASSAGES",
    text: "Three underlined lines, gathered side by side, read almost as one voice. The first: 'the pupil raised up, then cast down by the very hand that lifted him.' The second: 'he called me his finest, and sold my name for his own advancement.' The third, scored twice over: 'a teacher's love is a debt he collects in ruin.' The words do nothing to kill. They are the reason for it."
  }, {
    tag: "THE VICTIMS",
    text: "Not chosen at random. Each of the three, in his day, had taken a brilliant student under his wing — and each, records show, had later broken that protégé: a scholarship withdrawn, a promised post handed to another, a reputation quietly poisoned. Every victim was, to someone, a mentor who betrayed."
  }, {
    tag: "THE PACE",
    text: "Nearly six months lay between the first death and the second. Only five weeks between the second and the third. The hand grows less patient; the hunger that waited half a year now waits barely a month."
  }, {
    tag: "THE THREE",
    text: "Three men had cause and connection. AUGUSTIN VOSS (no relation), a bookbinder whose trade carries him city to city selling to libraries, was in each town in the right season. HENRICK LODE, a local schoolmaster in the third city, nursed a famous grudge against its victim but has never in his life left its walls. And PIERS CALLOW, a former divinity student, ruined years ago by a mentor's betrayal — though which mentor, and where he has been these two years, no one can say."
  }],
  report: ["The underlined lines accomplish nothing toward the killing, so they are a ", {
    slot: "c1",
    type: "concept"
  }, " — the offender speaking through the page. The gap between deaths, a ", {
    slot: "c2",
    type: "concept"
  }, " period, is collapsing, which is ", {
    slot: "c3",
    type: "concept"
  }, ". He is ", {
    slot: "t1",
    type: "trait"
  }, " and ", {
    slot: "t2",
    type: "trait"
  }, ", killing the kind of mentor who once ruined him. Only one suspect could have stood in all three cities. Charge ", {
    slot: "n1",
    type: "name"
  }, "."],
  answer: {
    c1: "signature",
    c2: "cooling",
    c3: "escalation",
    t1: "mobile",
    t2: "ritualist",
    n1: "lecturer"
  },
  bank: [{
    id: "staging",
    text: "staging",
    type: "concept"
  }, {
    id: "escalation",
    text: "escalation",
    type: "concept"
  }, {
    id: "cooling",
    text: "cooling-off",
    type: "concept"
  }, {
    id: "signature",
    text: "communicative signature",
    type: "concept"
  }, {
    id: "victimology",
    text: "victimology",
    type: "concept"
  }, {
    id: "pragmatic",
    text: "coldly pragmatic",
    type: "trait"
  }, {
    id: "mobile",
    text: "moving city to city",
    type: "trait"
  }, {
    id: "local",
    text: "rooted in one city",
    type: "trait"
  }, {
    id: "ritualist",
    text: "ritualistic",
    type: "trait"
  }, {
    id: "teacher",
    text: "Lode, the schoolmaster",
    type: "name"
  }, {
    id: "lecturer",
    text: "Callow, the ruined student",
    type: "name"
  }, {
    id: "apprentice",
    text: "Voss, the bookbinder",
    type: "name"
  }],
  concepts: ["signature", "cooling", "escalation", "staging", "victimology"],
  hitLine: "The scored passages were a confession, not a method — the killer speaking through other men's words. The shrinking gap between deaths marked his escalation. The bookbinder travelled but had no wound; the schoolmaster had the wound but never left his city. Only Callow, ruined by a mentor and unaccounted-for for two years, had both the grief and the freedom to move — and he killed the kind of man who made him.",
  partner: {
    wrong: {
      "staging": "Staging hides a thing. This displays it — three lines chosen and scored for us to read. He's not covering the killing, he's explaining it. That's a signature.",
      "victimology": "The victims matter, but the thing on the page isn't victimology — it's him, talking. Read what he underlined.",
      "local": "Rooted in one city? Three cities buried these men. Whoever did it could move between them freely.",
      "pragmatic": "There's nothing pragmatic about underlining a line of verse over a corpse. It's need, it's ritual — he can't not do it.",
      "apprentice": "Voss the bookbinder travelled to all three, true. But where's his wound? He was never anyone's ruined protégé. He had the road but not the reason.",
      "teacher": "Lode had the grudge, and it was bitter — but he's never once left his own city, and two of these men died a hundred miles from it. The wound without the road.",
      "cooling": "Right idea, wrong blank — the span between kills is the cooling-off period. The fact that it's shrinking is what we call escalation."
    },
    nudge: ["Read the three lines as one. Whose wound is that?", "Two of them each have half of it — a wound, or the freedom to travel. Only one has both."],
    praise: "You read the passages as a confession and matched the wound to the man. The bookbinder had the road, the schoolmaster had the grudge — but only Callow had both, and the shrinking gaps said he wouldn't wait long for a fourth.",
    consequence: "You take the bookbinder on his travels alone, or the schoolmaster on his grudge alone. Callow reads of the arrest, waits out the fright, and in five weeks underlines again."
  }
}, {
  id: 7,
  title: "The Posed Penitent",
  tag: "POSED BODY",
  teaches: "Posing · Linkage · Two offenders",
  difficulty: 3,
  hideLabels: true,
  brief: "Bartholomew Crane, a moneylender, is found in a shuttered chapel long fallen out of use. He did not die there — that much is plain from the smear of dried blood that leads in from the door. He lies beneath the altar cross, his hands folded upon his breast, two copper coins laid over his closed eyes, his face composed into something like peace. His full purse sits untouched at his belt. Someone went to a great deal of trouble that had nothing to do with killing him.",
  diagram: "<svg viewBox=\"0 0 420 190\" width=\"100%\" style=\"border-radius:8px;background:#100e0a;display:block\"><rect x=\"6\" y=\"6\" width=\"408\" height=\"178\" rx=\"6\" fill=\"none\" stroke=\"#2a2118\" stroke-width=\"1\"/><path d=\"M14 6 V14 M6 14 H14 M406 6 V14 M414 14 H406 M14 184 V176 M6 176 H14 M406 184 V176 M414 176 H406\" stroke=\"#3a2f22\" stroke-width=\"1\" fill=\"none\"/><text x=\"210\" y=\"22\" text-anchor=\"middle\" fill=\"#9a8a6a\" font-family=\"Georgia,serif\" font-size=\"11\" letter-spacing=\"2\">A MILE APART</text><rect x=\"30\" y=\"72\" width=\"74\" height=\"52\" fill=\"none\" stroke=\"#5f7d8c\" stroke-width=\"1\"/><text x=\"67\" y=\"66\" text-anchor=\"middle\" fill=\"#9a8a6a\" font-family=\"Georgia,serif\" font-size=\"8\">ALLEY</text><circle cx=\"67\" cy=\"98\" r=\"7\" fill=\"#9E2B23\"/><text x=\"67\" y=\"140\" text-anchor=\"middle\" fill=\"#c58a6a\" font-family=\"Georgia,serif\" font-size=\"7.5\">crude blow</text><text x=\"67\" y=\"151\" text-anchor=\"middle\" fill=\"#6b5d48\" font-family=\"Georgia,serif\" font-size=\"7.5\">pragmatic hand</text><rect x=\"316\" y=\"60\" width=\"76\" height=\"66\" fill=\"none\" stroke=\"#C8B48A\" stroke-width=\"1.2\"/><path d=\"M354 70 v18 M346 78 h16\" stroke=\"#C8B48A\" stroke-width=\"1.4\"/><text x=\"354\" y=\"54\" text-anchor=\"middle\" fill=\"#9a8a6a\" font-family=\"Georgia,serif\" font-size=\"8\">CHAPEL</text><circle cx=\"354\" cy=\"106\" r=\"7\" fill=\"#9E2B23\" opacity=\"0.6\"/><text x=\"354\" y=\"140\" text-anchor=\"middle\" fill=\"#8fbfa0\" font-family=\"Georgia,serif\" font-size=\"7.5\">posed · coins</text><text x=\"354\" y=\"151\" text-anchor=\"middle\" fill=\"#8fbfa0\" font-family=\"Georgia,serif\" font-size=\"7.5\">ritual hand</text><path d=\"M78 100 C 160 118, 250 118, 320 104\" stroke=\"#D8722C\" stroke-width=\"1.4\" fill=\"none\" stroke-dasharray=\"5 3\" marker-end=\"url(#ar7)\"/><defs><marker id=\"ar7\" markerWidth=\"7\" markerHeight=\"7\" refX=\"4\" refY=\"3\" orient=\"auto\"><path d=\"M0 0 L6 3 L0 6 z\" fill=\"#D8722C\"/></marker></defs><text x=\"200\" y=\"128\" text-anchor=\"middle\" fill=\"#d8722c\" font-family=\"Georgia,serif\" font-size=\"8\">dragged a mile</text><text x=\"200\" y=\"96\" text-anchor=\"middle\" fill=\"#8fbfa0\" font-family=\"Georgia,serif\" font-size=\"8.5\">two moods = two hands</text><text x=\"16\" y=\"178\" fill=\"#6b5d48\" font-family=\"Georgia,serif\" font-style=\"italic\" font-size=\"9\">exhibit — posing, not staging</text></svg>",
  clues: [{
    tag: "THE ARRANGEMENT",
    text: "Consider what was done to the body after death, and by whose logic. The folded hands of a penitent. Coins upon the eyes — the old toll paid to ferry a soul. A usurer, a man who dealt in money and interest, laid out beneath the cross with copper on his eyes. Every element speaks; none of it was needed to end his life. This is a statement being made about the man, in the grammar of judgment and faith."
  }, {
    tag: "THE PURSE",
    text: "Heavy with coin, still buckled to his belt, plainly visible. Whoever arranged him here stepped over a fortune to fold his hands. Money was never the point — for this person. The point was the meaning of the scene."
  }, {
    tag: "THE WOUND",
    text: "Crane died of a single graceless blow to the back of the skull, struck in a filthy alley a full mile from the chapel — the kind of hurried, brutal, unthinking violence that ends a robbery or a quarrel. There is nothing composed or reverent about how he died. It sits utterly at odds with how he was laid out."
  }, {
    tag: "THE TRAIL & THE THREE",
    text: "The blood-smear proves the body was dragged the long mile from alley to chapel and then, unhurried, arranged with care — two moods, surely two hands. Three names surface. A DESPERATE DEBTOR, ruined by Crane's interest, seen near the alley that night, a violent and pragmatic man with every reason to want him dead and none to pray over him. A RIVAL LENDER who profits by Crane's death, cold and commercial. And a LAY-PREACHER of the district, gentle and strange, who tends the poor Crane bankrupted and speaks often, softly, of sin and penance and the weighing of souls."
  }],
  report: ["Read by its own logic, the chapel scene is ", {
    slot: "c1",
    type: "concept"
  }, ", not ", {
    slot: "c2",
    type: "concept"
  }, " — a message about the dead man, not a trick to mislead us. The graceless wound a mile away, so unlike the reverent arrangement, is ", {
    slot: "c3",
    type: "concept"
  }, " of two hands. Profile the one who posed him: ", {
    slot: "t1",
    type: "trait"
  }, " and ", {
    slot: "t2",
    type: "trait"
  }, ". That is ", {
    slot: "n1",
    type: "name"
  }, ", who sanctified the body another had struck down."],
  answer: {
    c1: "posing",
    c2: "staging",
    c3: "linkage",
    t1: "ideological",
    t2: "ritualist",
    n1: "preacher"
  },
  bank: [{
    id: "staging",
    text: "staging",
    type: "concept"
  }, {
    id: "overkill",
    text: "overkill",
    type: "concept"
  }, {
    id: "signature",
    text: "signature",
    type: "concept"
  }, {
    id: "posing",
    text: "posing",
    type: "concept"
  }, {
    id: "linkage",
    text: "the linked work",
    type: "concept"
  }, {
    id: "pragmatic",
    text: "coldly pragmatic",
    type: "trait"
  }, {
    id: "ideological",
    text: "driven by belief",
    type: "trait"
  }, {
    id: "ritualist",
    text: "ritualistic",
    type: "trait"
  }, {
    id: "acquisitive",
    text: "money-driven",
    type: "trait"
  }, {
    id: "debtor",
    text: "the ruined debtor",
    type: "name"
  }, {
    id: "rival",
    text: "the rival lender",
    type: "name"
  }, {
    id: "preacher",
    text: "the lay-preacher",
    type: "name"
  }],
  concepts: ["posing", "staging", "linkage", "overkill", "signature"],
  hitLine: "The coins and folded hands were posing — a sermon preached over the corpse of a usurer — not staging to fool anyone. The crude alley wound, a mile from that reverent scene, betrayed a second hand entirely. The debtor struck Crane down in fury; but only the preacher, steeped in sin and penance, would carry him to a chapel and pay his soul's toll. You profiled the poser, not the killer.",
  partner: {
    wrong: {
      "staging": "Staging is meant to fool us — to hide a thing. This was meant to be seen and understood. Coins on a usurer's eyes, hands folded in penance — he's preaching, not hiding. That's posing.",
      "overkill": "One blow to the back of the head isn't overkill — it's barely enough. The meaning isn't in the wound, it's in the chapel. Look at what was done after.",
      "acquisitive": "A full purse, left on the body. Whoever arranged him stepped over money to fold his hands. Money drove the man in the alley, maybe — not the one at the altar.",
      "pragmatic": "Pragmatic describes the hand that struck him in the alley — quick, brutal, done. But you're asked to profile the one who carried him a mile and prayed over him. Different mind entirely.",
      "debtor": "He had the fury and the reason, and I'd wager he struck the blow. But a desperate man doesn't drag a corpse a mile to lay coins on its eyes. He killed. He didn't pose.",
      "rival": "The rival profits, cold and quiet. But there's no profit in this chapel and no belief either — he'd never trouble himself with a usurer's soul.",
      "signature": "Close — a signature is a need repeated across crimes. What's in front of us is a single body arranged to send a message. The word for that is posing."
    },
    nudge: ["The wound and the arrangement don't match. That mismatch is the whole case.", "Who among the three would care about a usurer's soul enough to pay its toll?"],
    praise: "You separated the two hands — the brute in the alley and the believer at the altar — and profiled the right one. The coins and the cross were a sermon, and only the preacher speaks that language. Rare and clean work.",
    consequence: "You charge the debtor who struck the blow and call it closed. But the hands that folded Crane's and paid his toll go free — and the preacher finds another sinner to lay beneath the cross."
  }
}, {
  id: 8,
  title: "The Two Who Fit",
  tag: "THE LIMITS",
  teaches: "Bias · When profiling fails",
  difficulty: 3,
  hideLabels: true,
  brief: "A moneylender is knifed in a lightless alley, his purse gone. The wounds are hurried, the scene bare — nothing to read. Two men fit the thin profile, and both had cause. This is the case that teaches what profiling cannot do.",
  diagram: "<svg viewBox=\"0 0 420 190\" width=\"100%\" style=\"border-radius:8px;background:#100e0a;display:block\"><rect x=\"6\" y=\"6\" width=\"408\" height=\"178\" rx=\"6\" fill=\"none\" stroke=\"#2a2118\" stroke-width=\"1\"/><path d=\"M14 6 V14 M6 14 H14 M406 6 V14 M414 14 H406 M14 184 V176 M6 176 H14 M406 184 V176 M414 176 H406\" stroke=\"#3a2f22\" stroke-width=\"1\" fill=\"none\"/><text x=\"210\" y=\"22\" text-anchor=\"middle\" fill=\"#9a8a6a\" font-family=\"Georgia,serif\" font-size=\"11\" letter-spacing=\"2\">THE ALLEY</text><circle cx=\"80\" cy=\"76\" r=\"8\" fill=\"#9E2B23\"/><text x=\"80\" y=\"60\" text-anchor=\"middle\" fill=\"#c9a9a6\" font-family=\"Georgia,serif\" font-size=\"8.5\">lender †</text><text x=\"80\" y=\"100\" text-anchor=\"middle\" fill=\"#7f93a0\" font-family=\"Georgia,serif\" font-size=\"8\">purse gone</text><ellipse cx=\"200\" cy=\"70\" rx=\"12\" ry=\"20\" fill=\"none\" stroke=\"#B8863B\" stroke-width=\"1.4\"/><ellipse cx=\"200\" cy=\"86\" rx=\"7\" ry=\"9\" fill=\"none\" stroke=\"#B8863B\" stroke-width=\"1.4\"/><text x=\"200\" y=\"112\" text-anchor=\"middle\" fill=\"#d4a95e\" font-family=\"Georgia,serif\" font-size=\"8\">print: size 8, rolled edge</text><text x=\"300\" y=\"60\" fill=\"#6b5d48\" font-family=\"Georgia,serif\" font-size=\"8.5\">porter → size 11 ✗ cleared</text><text x=\"300\" y=\"76\" fill=\"#9a8a6a\" font-family=\"Georgia,serif\" font-size=\"8.5\">clerk → size 8… but so</text><text x=\"300\" y=\"88\" fill=\"#9a8a6a\" font-family=\"Georgia,serif\" font-size=\"8.5\">does half the district</text><text x=\"210\" y=\"150\" text-anchor=\"middle\" fill=\"#c58a6a\" font-family=\"Georgia,serif\" font-size=\"9\">suggestive, not conclusive — no honest charge</text><text x=\"16\" y=\"178\" fill=\"#6b5d48\" font-family=\"Georgia,serif\" font-style=\"italic\" font-size=\"9\">exhibit — the limit of the method</text></svg>",
  clues: [{
    tag: "THE SCENE",
    text: "Hurried, shallow wounds, purse taken. Ordinary — nothing distinctive to profile from."
  }, {
    tag: "TWO MEN",
    text: "Both local, both in debt to the victim, both able. The thin profile fits either equally."
  }, {
    tag: "THE MUD",
    text: "One boot-print: narrow, size 8, weight thrown onto the outer edge."
  }, {
    tag: "THE FEET",
    text: "The porter wears a broad size 11 — cleared. The clerk's gait matches the print — but so does half the district's."
  }],
  report: ["This thin scene supports only a ", {
    slot: "t1",
    type: "trait"
  }, " profile, and the man who 'looks the type' is a ", {
    slot: "c1",
    type: "concept"
  }, " trap. The print clears the porter but is only ", {
    slot: "mo1",
    type: "motive"
  }, " against the clerk, shared by half the district. The ", {
    slot: "c2",
    type: "concept"
  }, " has narrowed the field, yet the honest call is to charge ", {
    slot: "n1",
    type: "name"
  }, "."],
  answer: {
    t1: "weak",
    c1: "bias",
    mo1: "suggestive",
    c2: "profile_tool",
    n1: "noone"
  },
  bank: [{
    id: "signature",
    text: "signature",
    type: "concept"
  }, {
    id: "linkage",
    text: "linkage",
    type: "concept"
  }, {
    id: "profile_tool",
    text: "profile",
    type: "concept"
  }, {
    id: "bias",
    text: "stereotype (bias)",
    type: "concept"
  }, {
    id: "certain",
    text: "confident, naming",
    type: "trait"
  }, {
    id: "weak",
    text: "loosely-held",
    type: "trait"
  }, {
    id: "definitive",
    text: "a definitive match",
    type: "motive"
  }, {
    id: "suggestive",
    text: "suggestive, not conclusive",
    type: "motive"
  }, {
    id: "porter",
    text: "the porter",
    type: "name"
  }, {
    id: "clerk",
    text: "the clerk",
    type: "name"
  }, {
    id: "noone",
    text: "no one — insufficient evidence",
    type: "name"
  }],
  concepts: ["bias", "profile_tool", "signature", "linkage"],
  hitLine: "The porter merely looked the type; the clerk's gait was suggestive, not conclusive. Neither reaches the bar. The craft is knowing when to hold.",
  partner: {
    wrong: {
      "certain": "Certain? On a scene this thin? Confidence like that convicts innocent men.",
      "signature": "There's no signature in a hurried robbery. That's the point — there's almost nothing here.",
      "linkage": "Nothing to link. One thin scene. Don't invent a pattern.",
      "definitive": "A definitive match? Half the district shares that gait. Suggestive at best.",
      "porter": "He looks the part. That's the trap. His boot's the wrong size — cleared.",
      "clerk": "His gait fits the print. So does half the district's. You can't hang a man on 'so does half.'"
    },
    nudge: ["Careful. This is where good men convict the wrong one.", "No. Ask what the evidence actually proves."],
    praise: "You looked past the man who 'fit' and saw the evidence was too thin. Holding is the hardest call. You made it.",
    consequence: "You charge on a hunch, and a court believes you. The wrong man swings. This is exactly how it happens."
  }
},
// ═══ 9 · UNDOING — difficulty 3, labels+colour hidden ═══
{
  id: 9,
  title: "The Covered Face",
  tag: "STRANGULATION",
  teaches: "Undoing · Remorse",
  difficulty: 3,
  hideLabels: true,
  brief: "Clara Ashe, twenty-four, is found dead in her own bed, strangled. But the scene refuses the ugliness of the act. Her body has been straightened, her limbs arranged, her hands folded one over the other upon her breast. A square of linen has been placed over her face. A pillow, unneeded by the dead, has been set beneath her head. Someone throttled the life out of this woman — and then, it seems, could not leave her as she fell.",
  diagram: "<svg viewBox=\"0 0 420 190\" width=\"100%\" style=\"border-radius:8px;background:#100e0a;display:block\"><rect x=\"6\" y=\"6\" width=\"408\" height=\"178\" rx=\"6\" fill=\"none\" stroke=\"#2a2118\" stroke-width=\"1\"/><path d=\"M14 6 V14 M6 14 H14 M406 6 V14 M414 14 H406 M14 184 V176 M6 176 H14 M406 184 V176 M414 176 H406\" stroke=\"#3a2f22\" stroke-width=\"1\" fill=\"none\"/><text x=\"210\" y=\"22\" text-anchor=\"middle\" fill=\"#9a8a6a\" font-family=\"Georgia,serif\" font-size=\"11\" letter-spacing=\"2\">THE BEDCHAMBER</text><rect x=\"130\" y=\"66\" width=\"160\" height=\"58\" rx=\"4\" fill=\"none\" stroke=\"#C8B48A\" stroke-width=\"1.3\"/><rect x=\"130\" y=\"66\" width=\"26\" height=\"58\" fill=\"none\" stroke=\"#C8B48A\" stroke-width=\"0.8\"/><ellipse cx=\"168\" cy=\"95\" rx=\"15\" ry=\"10\" fill=\"#100e0a\" stroke=\"#4E7A5E\" stroke-width=\"1.4\"/><text x=\"168\" y=\"98\" text-anchor=\"middle\" fill=\"#8fbfa0\" font-family=\"Georgia,serif\" font-size=\"7\">veiled</text><line x1=\"200\" y1=\"88\" x2=\"235\" y2=\"88\" stroke=\"#C8B48A\" stroke-width=\"1\"/><line x1=\"200\" y1=\"102\" x2=\"235\" y2=\"102\" stroke=\"#C8B48A\" stroke-width=\"1\"/><text x=\"150\" y=\"52\" fill=\"#c58a6a\" font-family=\"Georgia,serif\" font-size=\"8\">strangled †</text><text x=\"210\" y=\"140\" text-anchor=\"middle\" fill=\"#8fbfa0\" font-family=\"Georgia,serif\" font-size=\"8.5\">hands folded · pillow set · face covered = undoing</text><text x=\"330\" y=\"70\" fill=\"#7f93a0\" font-family=\"Georgia,serif\" font-size=\"8\">door: no force,</text><text x=\"330\" y=\"82\" fill=\"#7f93a0\" font-family=\"Georgia,serif\" font-size=\"8\">let in at night</text><text x=\"210\" y=\"154\" text-anchor=\"middle\" fill=\"#6b5d48\" font-family=\"Georgia,serif\" font-size=\"8\">violence + tenderness = one intimate hand</text><text x=\"16\" y=\"178\" fill=\"#6b5d48\" font-family=\"Georgia,serif\" font-style=\"italic\" font-size=\"9\">exhibit — he could not leave her exposed</text></svg>",
  clues: [{
    tag: "THE FACE",
    text: "The linen over her face served no purpose in the killing and conceals nothing from us — we lifted it in a moment. It was laid there after she was dead, by someone who, having killed her, could no longer meet her open eyes. Consider what kind of person needs to cover the face of someone they have just destroyed."
  }, {
    tag: "THE ARRANGING",
    text: "The straightened limbs, the folded hands, the pillow beneath the head — none of it was necessary, none of it was for us. These are the gestures one makes for someone mourned: the tending of a body by a hand that cared what became of it, even in the same hour it killed."
  }, {
    tag: "THE DOOR",
    text: "No forced entry, no theft, nothing disturbed beyond the bed itself. Clara let this person into her rooms late at night without alarm, without a struggle at the threshold. Whoever came was expected, and trusted, and known."
  }, {
    tag: "THE THREE",
    text: "A BURGLAR is the easy answer, but nothing was taken and nothing forced. A JILTED SUITOR she had refused months ago made ugly threats in public, but he is a stranger to her rooms and to her hours. And her BETROTHED, with whom the maid reports a violent, tearful quarrel three nights past — a man who loved her to the point of possession, and who has not been seen since the night she died."
  }],
  report: ["The covered face and folded hands are ", {
    slot: "c1",
    type: "concept"
  }, " — the killer symbolically caring for the body in remorse, the act of someone ", {
    slot: "t1",
    type: "trait"
  }, ", never a ", {
    slot: "t2",
    type: "trait"
  }, ". She admitted him without alarm, and he ", {
    slot: "m1",
    type: "method"
  }, " her in a surge of ", {
    slot: "mo1",
    type: "motive"
  }, ", then could not bear what he had done. This names ", {
    slot: "n1",
    type: "name"
  }, "."],
  answer: {
    c1: "undoing",
    t1: "personal",
    t2: "stranger",
    m1: "strangled",
    mo1: "passion",
    n1: "fiance"
  },
  bank: [{
    id: "staging",
    text: "staging",
    type: "concept"
  }, {
    id: "undoing",
    text: "undoing",
    type: "concept"
  }, {
    id: "signature",
    text: "signature",
    type: "concept"
  }, {
    id: "posing",
    text: "posing",
    type: "concept"
  }, {
    id: "ritualist",
    text: "a ritualist",
    type: "trait"
  }, {
    id: "personal",
    text: "intimate with the victim",
    type: "trait"
  }, {
    id: "stranger",
    text: "a cold stranger",
    type: "trait"
  }, {
    id: "poisoned",
    text: "poisoned",
    type: "method"
  }, {
    id: "strangled",
    text: "strangled",
    type: "method"
  }, {
    id: "greed",
    text: "cold greed",
    type: "motive"
  }, {
    id: "passion",
    text: "a lover's rage",
    type: "motive"
  }, {
    id: "burglar",
    text: "the burglar",
    type: "name"
  }, {
    id: "fiance",
    text: "the betrothed",
    type: "name"
  }, {
    id: "stranger_n",
    text: "the jilted suitor",
    type: "name"
  }],
  concepts: ["undoing", "posing", "staging", "signature"],
  hitLine: "The covered face was not a message for us (posing) nor a lie to mislead us (staging) — it was undoing, the guilt of a hand that killed what it loved and could not leave it exposed. She admitted her killer without fear; the burglar takes and flees, the jilted suitor was a stranger to her rooms. Only the betrothed had both the trust to be let in and the love to grieve what his own rage had done.",
  partner: {
    wrong: {
      "posing": "Posing is a message aimed at us — arranged to be found and read. But this tenderness hides nothing and says nothing to a stranger's eye. It's private, it's guilt. That's undoing.",
      "staging": "Staging is a lie told to the investigator. Covering her face fools no one — we lifted the cloth at once. He didn't cover her for us. He covered her because he couldn't look. Undoing.",
      "signature": "A signature repeats across a series — a need carried from kill to kill. This is one death, one act of remorse, by a man undone by what he did once. Not signature.",
      "stranger": "A stranger throttles and runs. He doesn't fold the hands, set the pillow, veil the face. That care is the mark of someone who knew her — loved her, even.",
      "ritualist": "It looks like ritual, but ritual serves the killer's need. This served his grief. He wasn't performing — he was mourning. That's undoing.",
      "poisoned": "No poison in this. The marks on her throat are plain — she was strangled, and then tended.",
      "greed": "Greed doesn't slip a pillow beneath a dead girl's head. Nothing was taken. What killed her came from the heart, not the purse.",
      "burglar": "Nothing forced, nothing stolen, and the hands of the dead folded with care. No burglar in history has tucked in his victim. Not him.",
      "stranger_n": "The jilted suitor made his threats in the street — a stranger to her rooms and her hours. She'd not have let him in at midnight without a sound. This was someone she trusted at her door."
    },
    nudge: ["The killing is savage; the aftermath is tender. One hand did both. Who kills what he loves?", "She opened her door to him at midnight without fear. Who could that be?"],
    praise: "You read the tenderness for what it was — not a message, not a mask, but the grief of a man who destroyed what he loved. The trust at the door and the care of the body both point one way: the betrothed. Hard-won, that one.",
    consequence: "You take the burglar or the spurned suitor, and the betrothed weeps at her graveside, unsuspected. The one truth he left on the scene — that he could not bear to see her face — goes unread."
  }
},
// ═══ 10 · VICTIM PRECIPITATION — difficulty 3, labels+colour hidden ═══
{
  id: 10,
  title: "The Man Who Swung First",
  tag: "TAVERN KILLING",
  teaches: "Victim precipitation",
  difficulty: 3,
  hideLabels: true,
  brief: "Dax Holloway, a docker with a reputation for his fists, is found dead in the yard behind the Anchor tavern, killed by a single knife-wound. He was a large, violent man who had put two others in their beds that month. Beside his body kneels a slight tavern lad of sixteen, bruised and shaking, who has made no attempt to run. The question the yard poses is not only who ended Dax's life, but who began the fight that cost it.",
  diagram: "<svg viewBox=\"0 0 420 190\" width=\"100%\" style=\"border-radius:8px;background:#100e0a;display:block\"><rect x=\"6\" y=\"6\" width=\"408\" height=\"178\" rx=\"6\" fill=\"none\" stroke=\"#2a2118\" stroke-width=\"1\"/><path d=\"M14 6 V14 M6 14 H14 M406 6 V14 M414 14 H406 M14 184 V176 M6 176 H14 M406 184 V176 M414 176 H406\" stroke=\"#3a2f22\" stroke-width=\"1\" fill=\"none\"/><text x=\"210\" y=\"22\" text-anchor=\"middle\" fill=\"#9a8a6a\" font-family=\"Georgia,serif\" font-size=\"11\" letter-spacing=\"2\">THE TAVERN YARD</text><path d=\"M40 40 L40 150 L370 150\" fill=\"none\" stroke=\"#C8B48A\" stroke-width=\"1.4\"/><text x=\"120\" y=\"142\" fill=\"#6b5d48\" font-family=\"Georgia,serif\" font-size=\"7.5\">tavern wall — no retreat behind</text><circle cx=\"72\" cy=\"104\" r=\"7\" fill=\"none\" stroke=\"#4E7A5E\" stroke-width=\"1.5\"/><text x=\"72\" y=\"90\" text-anchor=\"middle\" fill=\"#8fbfa0\" font-family=\"Georgia,serif\" font-size=\"8\">boy (16)</text><circle cx=\"175\" cy=\"98\" r=\"10\" fill=\"#9E2B23\" opacity=\"0.85\"/><text x=\"175\" y=\"82\" text-anchor=\"middle\" fill=\"#c9a9a6\" font-family=\"Georgia,serif\" font-size=\"8.5\">Dax †</text><path d=\"M150 100 L92 103\" stroke=\"#D8722C\" stroke-width=\"1.2\" stroke-dasharray=\"4 2\" marker-end=\"url(#ar10)\"/><defs><marker id=\"ar10\" markerWidth=\"7\" markerHeight=\"7\" refX=\"4\" refY=\"3\" orient=\"auto\"><path d=\"M0 0 L6 3 L0 6 z\" fill=\"#D8722C\"/></marker></defs><text x=\"120\" y=\"60\" fill=\"#d8722c\" font-family=\"Georgia,serif\" font-size=\"8\">he advanced, armed →</text><path d=\"M168 106 l-10 -8\" stroke=\"#D8722C\" stroke-width=\"1.6\"/><text x=\"240\" y=\"96\" fill=\"#d4a95e\" font-family=\"Georgia,serif\" font-size=\"8.5\">wound drives ↗ upward</text><text x=\"240\" y=\"110\" fill=\"#d4a95e\" font-family=\"Georgia,serif\" font-size=\"8.5\">knife = DAX'S own</text><text x=\"210\" y=\"170\" text-anchor=\"middle\" fill=\"#8fbfa0\" font-family=\"Georgia,serif\" font-size=\"8\">victim precipitation — the dead man forced it</text><text x=\"16\" y=\"178\" fill=\"#6b5d48\" font-family=\"Georgia,serif\" font-style=\"italic\" font-size=\"9\">exhibit — who swung first</text></svg>",
  clues: [{
    tag: "THE KNIFE",
    text: "Only one blade in the yard, and it is Dax's own — his initials are cut into the horn handle. It killed him. This tells us the weapon was brought by the dead man, drawn by the dead man, and at some point in the struggle turned back against him."
  }, {
    tag: "THE WOUND",
    text: "The fatal thrust enters low and drives upward, beneath the ribs — the angle of someone smaller striking up at a larger man bearing down on them, not the level or downward stroke of an attacker in command of the fight. Dax also bears defensive grazes on his knuckles; the boy's forearms are bruised in the pattern of someone who was warding off blows, not landing them."
  }, {
    tag: "THE YARD",
    text: "Overturned crates and a scuffle confined to one corner — the boy's corner, by the tavern wall, with no path of retreat behind him. Dax's blood is his own and his alone. Whatever happened here, the boy was backed against the wall when it did."
  }, {
    tag: "THE THREE",
    text: "Three readings are offered. That the TAVERN BOY, cornered and unarmed, wrested the drawn knife from a man twice his size and struck to live. That a RIVAL BRAWLER settled an old score and slipped away, leaving the boy to take the blame. Or that the evidence of a fight the dead man armed and started is so plain that no charge for murder can honestly stand at all."
  }],
  report: ["This killing turns on ", {
    slot: "c1",
    type: "concept"
  }, ": the dead man armed himself, drew, and forced the fight, shaping his own end. The low upward wound from his own blade is ", {
    slot: "m1",
    type: "method"
  }, ", the act of someone ", {
    slot: "t1",
    type: "trait"
  }, " rather than ", {
    slot: "t2",
    type: "trait"
  }, ". The motive was ", {
    slot: "mo1",
    type: "motive"
  }, ". The evidence points to ", {
    slot: "n1",
    type: "name"
  }, ", though the law must weigh who forced the fight."],
  answer: {
    c1: "precipitation",
    m1: "self_defence",
    t1: "cornered",
    t2: "predatory",
    mo1: "survival",
    n1: "potboy"
  },
  bank: [{
    id: "escalation",
    text: "escalation",
    type: "concept"
  }, {
    id: "precipitation",
    text: "victim precipitation",
    type: "concept"
  }, {
    id: "staging",
    text: "staging",
    type: "concept"
  }, {
    id: "signature",
    text: "signature",
    type: "concept"
  }, {
    id: "opportunist",
    text: "an opportunist",
    type: "trait"
  }, {
    id: "cornered",
    text: "cornered and reacting",
    type: "trait"
  }, {
    id: "predatory",
    text: "coldly predatory",
    type: "trait"
  }, {
    id: "ambush",
    text: "a planned ambush",
    type: "method"
  }, {
    id: "self_defence",
    text: "defensive",
    type: "method"
  }, {
    id: "revenge",
    text: "premeditated revenge",
    type: "motive"
  }, {
    id: "survival",
    text: "survival, not malice",
    type: "motive"
  }, {
    id: "noone",
    text: "no one — self-defence, no charge",
    type: "name"
  }, {
    id: "potboy",
    text: "the tavern boy",
    type: "name"
  }, {
    id: "rival_brawler",
    text: "a rival brawler",
    type: "name"
  }],
  concepts: ["precipitation", "escalation", "signature", "staging"],
  hitLine: "The knife was Dax's own, drawn by Dax, in a corner the boy could not flee. The upward wound and the boy's warding bruises tell a fight forced by the larger, armed man and survived by the smaller. That is victim precipitation — Dax shaped his own death. Understanding the victim's part is not the same as blaming him, nor does it make the boy a murderer.",
  partner: {
    wrong: {
      "ambush": "An ambush is patient and planned, struck from advantage. This wound drives upward from a cornered crouch, with the dead man's own knife. Nobody ambushes a bigger man with the blade that man brought.",
      "predatory": "Predatory? Look at the size of them, and whose knife it was. The boy was backed to the wall, warding blows. Dax was the hunter here — right up until he wasn't.",
      "opportunist": "There's no opportunity seized in this yard, just a fight survived. The boy didn't go looking. He was cornered with nowhere behind him.",
      "revenge": "Premeditated revenge brings its own weapon. This boy used the knife Dax drew on him — turned it in the struggle. That's not a plan, that's a reflex to live.",
      "rival_brawler": "A tidy story — the rival does it and vanishes. But the blood's all Dax's, the fight's all in the boy's corner, and the boy stayed. Invent a phantom and you ignore the yard in front of you.",
      "escalation": "Escalation is a pattern across time. This is one fight, on one night, lit by the man who died in it. The word for the victim's part is precipitation.",
      "signature": "No ritual, no repeated need, no signature. Just a big man who drew a knife and a small one who lived. Read who forced it.",
      "staging": "Nothing's dressed up here. The crates fell where they fell, the blood lies where it spilled. An honest, ugly scuffle — no staging."
    },
    nudge: ["Whose knife was it, and who was backed against the wall? Start there.", "Ask who forced the fight before you ask who ended it."],
    praise: "You read the yard honestly: Dax's own blade, the upward wound, the boy cornered and warding blows. Victim precipitation — the dead man shaped his death — without pretending a frightened boy is a murderer. That balance is the whole lesson.",
    consequence: "You charge the boy for murder, and the court never hears whose knife it was or who forced him to the wall. A frightened child hangs for surviving."
  }
},
// ═══ 11 · THE UNRELIABLE PROFILER — capstone, difficulty 3, labels+colour hidden ═══
{
  id: 11,
  title: "The Mirror",
  tag: "CAPSTONE",
  teaches: "Your own bias is the twist",
  difficulty: 3,
  hideLabels: true,
  brief: "Old Professor Merrick, a recluse who spent forty years studying the history of occult belief, is found dead at his study desk. A heavy grimoire lies open before him. Chalk figures cover the floorboards. A black candle has guttered to a stub, and the air is stale and cold. Every case you have worked has trained your eye to read a scene like this — the symbols, the ritual staging, the mind that arranges a body to send a message. Read it, then. But read it honestly.",
  diagram: "<svg viewBox=\"0 0 420 190\" width=\"100%\" style=\"border-radius:8px;background:#100e0a;display:block\"><rect x=\"6\" y=\"6\" width=\"408\" height=\"178\" rx=\"6\" fill=\"none\" stroke=\"#2a2118\" stroke-width=\"1\"/><path d=\"M14 6 V14 M6 14 H14 M406 6 V14 M414 14 H406 M14 184 V176 M6 176 H14 M406 184 V176 M414 176 H406\" stroke=\"#3a2f22\" stroke-width=\"1\" fill=\"none\"/><text x=\"210\" y=\"22\" text-anchor=\"middle\" fill=\"#9a8a6a\" font-family=\"Georgia,serif\" font-size=\"11\" letter-spacing=\"2\">THE SEALED STUDY</text><rect x=\"120\" y=\"38\" width=\"180\" height=\"120\" fill=\"none\" stroke=\"#C8B48A\" stroke-width=\"1.3\"/><rect x=\"116\" y=\"88\" width=\"10\" height=\"20\" fill=\"#4E7A5E\" opacity=\"0.5\"/><path d=\"M126 98 h14\" stroke=\"#4E7A5E\" stroke-width=\"2\"/><text x=\"150\" y=\"128\" fill=\"#8fbfa0\" font-family=\"Georgia,serif\" font-size=\"7.5\">bolted from within</text><rect x=\"285\" y=\"60\" width=\"15\" height=\"26\" fill=\"none\" stroke=\"#5f7d8c\" stroke-width=\"1\"/><line x1=\"285\" y1=\"73\" x2=\"300\" y2=\"73\" stroke=\"#5f7d8c\" stroke-width=\"0.8\"/><text x=\"292\" y=\"98\" text-anchor=\"middle\" fill=\"#6b5d48\" font-family=\"Georgia,serif\" font-size=\"6.5\">sealed</text><rect x=\"170\" y=\"66\" width=\"70\" height=\"26\" fill=\"none\" stroke=\"#C8B48A\" stroke-width=\"0.9\"/><circle cx=\"205\" cy=\"56\" r=\"7\" fill=\"#9E2B23\" opacity=\"0.55\"/><text x=\"205\" y=\"44\" text-anchor=\"middle\" fill=\"#9a8a6a\" font-family=\"Georgia,serif\" font-size=\"8\">scholar †</text><path d=\"M150 130 l7 7 m0 -7 l-7 7 M255 130 l7 7 m0 -7 l-7 7\" stroke=\"#B8863B\" stroke-width=\"1.1\"/><circle cx=\"205\" cy=\"134\" r=\"8\" fill=\"none\" stroke=\"#B8863B\" stroke-width=\"1\"/><text x=\"210\" y=\"150\" text-anchor=\"middle\" fill=\"#d4a95e\" font-family=\"Georgia,serif\" font-size=\"8\">chalk = plates from his OWN book</text><text x=\"345\" y=\"120\" text-anchor=\"middle\" fill=\"#c58a6a\" font-family=\"Georgia,serif\" font-size=\"9\">no wound</text><text x=\"345\" y=\"133\" text-anchor=\"middle\" fill=\"#c58a6a\" font-family=\"Georgia,serif\" font-size=\"9\">weak heart</text><text x=\"16\" y=\"178\" fill=\"#6b5d48\" font-family=\"Georgia,serif\" font-style=\"italic\" font-size=\"9\">exhibit — is there a crime at all?</text></svg>",
  clues: [{
    tag: "THE SYMBOLS",
    text: "The chalk figures on the floor are elaborate, deliberate, and unsettling to look upon. They are also, line for line, identical to the diagrams printed in Merrick's own published book, which sits on the shelf above him — the plates he drew by hand and lectured from for thirty years. Chalk dust greys his own fingertips, and it is days old, not fresh."
  }, {
    tag: "THE BODY",
    text: "The surgeon is thorough. No wound. No ligature mark, no bruise, no petechiae of strangling. No smell of poison, no disarranged clothing, no sign of any struggle whatever. The heart, he notes, was gravely enlarged — the heart of a man who might have died at his desk on any given night, and on this one, did."
  }, {
    tag: "THE DOOR",
    text: "The study door was bolted from the inside, the single window painted shut years ago and still sealed. The maid broke the bolt to enter that morning. Whatever you decide happened in this room, it happened with no one else in it."
  }, {
    tag: "THE POSSIBLE HANDS",
    text: "The district offers up suspects, as districts always will. There is a local sect that Merrick had written sharply against, and would have reason to loathe him. There is a younger scholar, ambitious and resentful, who coveted the old man's papers and his standing. Either could be pursued and pressed. Whether either could have been in this sealed room is another question, and one the evidence has already answered."
  }],
  report: ["The scene presents as ", {
    slot: "c1",
    type: "concept"
  }, ", and the temptation to read it that way at once is itself ", {
    slot: "c2",
    type: "concept"
  }, ". Weigh instead what the room actually holds. The chalk figures are ", {
    slot: "m1",
    type: "method"
  }, ". The surgeon's findings and the bolted door point to ", {
    slot: "c3",
    type: "concept"
  }, ". Charge ", {
    slot: "n1",
    type: "name"
  }, "."],
  answer: {
    c1: "mission",
    c2: "self_bias",
    m1: "innocent",
    c3: "nocrime",
    n1: "noone"
  },
  bank: [{
    id: "linkage",
    text: "a linked series",
    type: "concept"
  }, {
    id: "posing",
    text: "a posed body",
    type: "concept"
  }, {
    id: "nocrime",
    text: "no crime at all",
    type: "concept"
  }, {
    id: "mission",
    text: "a ritual killing",
    type: "concept"
  }, {
    id: "self_bias",
    text: "your own trained bias",
    type: "concept"
  }, {
    id: "staging_m",
    text: "an intruder's staging",
    type: "method"
  }, {
    id: "innocent",
    text: "the dead man's own hand",
    type: "method"
  }, {
    id: "student",
    text: "the resentful scholar",
    type: "name"
  }, {
    id: "noone",
    text: "no one — a natural death",
    type: "name"
  }, {
    id: "cultist",
    text: "the local cult",
    type: "name"
  }],
  concepts: ["mission", "self_bias", "posing", "nocrime", "linkage"],
  hitLine: "There was no killer, and no crime. The chalk matched the plates in his own book; the door was sealed from within; his heart gave out as it had long threatened to. Every occult 'clue' was the honest residue of a scholar's life — and the pattern you nearly saw was the one twenty cases had trained your eye to find. The last lesson is the hardest: your own expectation is the most dangerous evidence in any room.",
  partner: {
    wrong: {
      "mission": "A mission killer punishing the unworthy — I know, it fits everything you've learned. But whose hand drew those symbols? His own, over thirty years. The scene you're reading is a life, not a murder.",
      "posing": "No one posed him. He slumped at his own desk, over his own book, with the door bolted from inside. There's no arranging hand here but the reaper's.",
      "linkage": "Link it to what? There's one dead scholar and one bad heart. You're reaching across empty air for a pattern because you're trained to find one.",
      "staging_m": "Staging needs a stager. That chalk matches the plates in his published book — he drew it himself, for his work. No killer dressed this room.",
      "cultist": "He wrote against a cult, sure, and you could go and rattle their door. But nobody entered this room and nobody left it. You'd be chasing them to satisfy the scene, not the facts.",
      "student": "The rival scholar wanted his papers — and a bolted door, a sealed window, and a failing heart gave them to nobody. There's no way in. There's no wound. There's no crime for him to have committed."
    },
    nudge: ["Everything you've trained says ritual murder. That reflex is precisely what this case is testing.", "Before you name a killer — is there even a crime here? Look again at the body and the door."],
    praise: "You felt the pull toward a ritual killer and refused it. A sealed room, a failing heart, chalk from his own book — no wound, no intruder, no crime. You doubted your own trained eye, and that doubt is the whole of the discipline. Case closed, Inspector.",
    consequence: "You conjure a killer to match the candles and the chalk, and some cultist or rival is dragged in to fit the story you needed to be true. There was never a crime here — only an old man's heart, and your certainty."
  }
}];

// ═══════════════════════════════════════════════════════════════
// MIND & MOTIVE — engine v6 (Golden Idol reconstruction)
// Loop: brief → free clue cards → fill the CASE REPORT by dragging
// words from a shared bank into typed slots → submit; correct words
// lock green, wrong ones bounce back. Whole report must be right.
// Tap-to-place fallback for accessibility/mobile. No paid clues.
// ═══════════════════════════════════════════════════════════════

const T = {
  ink: "#0C0A08",
  ink2: "#171310",
  ink3: "#211b16",
  manila: "#C8B48A",
  paper: "#ECE4D4",
  paperDim: "#B2A892",
  red: "#9E2B23",
  redBright: "#C4392E",
  green: "#4E7A5E",
  greenBright: "#6DA37E",
  amber: "#B8863B",
  steel: "#5f7d8c",
  ember: "#D8722C"
};
const mono = "'Courier New', monospace";

// ── DEV ONLY — remove before shipping ──────────────────────────
// Lets us jump straight to any case while building. Flip to false
// (or delete the dev bar in the render) to lock players to sequential play.
const DEV_MODE = true;

// type → accent colour, so slots and words read as categories (Golden-Idol style)
const TYPE_COLOR = {
  trait: T.amber,
  method: T.red,
  motive: T.ember,
  concept: T.steel,
  name: T.greenBright,
  clue: T.manila
};
const TYPE_LABEL = {
  trait: "TRAIT",
  method: "METHOD",
  motive: "MOTIVE",
  concept: "CONCEPT",
  name: "SUSPECT",
  clue: "CLUE"
};
function makeAudio() {
  let ctx = null;
  const ensure = () => {
    if (!ctx) {
      try {
        ctx = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) {
        ctx = null;
      }
    }
    return ctx;
  };
  const tone = (f, d, type = "sine", g = 0.05, slide = null) => {
    const c = ensure();
    if (!c) return;
    const o = c.createOscillator(),
      gain = c.createGain();
    o.type = type;
    o.frequency.value = f;
    if (slide) o.frequency.exponentialRampToValueAtTime(slide, c.currentTime + d);
    gain.gain.value = g;
    gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + d);
    o.connect(gain);
    gain.connect(c.destination);
    o.start();
    o.stop(c.currentTime + d);
  };
  return {
    resume: () => {
      const c = ensure();
      if (c && c.state === "suspended") c.resume();
    },
    tap: () => tone(440, 0.04, "square", 0.03),
    place: () => tone(360, 0.06, "sine", 0.04),
    flip: () => tone(300, 0.05, "square", 0.02),
    lock: () => {
      tone(523, 0.09, "sine", 0.05);
      setTimeout(() => tone(784, 0.14, "sine", 0.05), 70);
    },
    bounce: () => tone(200, 0.2, "sawtooth", 0.045, 130),
    solve: () => {
      [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => tone(f, 0.16, "triangle", 0.05), i * 80));
    },
    rank: () => {
      [440, 587, 880].forEach((f, i) => setTimeout(() => tone(f, 0.14, "triangle", 0.05), i * 90));
    }
  };
}

// ── Voss's voice — Web Speech API, deep/slow/gravelly ──────────
function makeVoice() {
  const synth = typeof window !== "undefined" && window.speechSynthesis;
  let chosen = null;
  // Known MALE voices across desktop AND mobile (iOS/Android/Samsung/Google).
  // NOTE: never put bare "man"/"male" here — "saMANtha" and "feMALE" match them.
  const MALE = ["daniel", "arthur", "rishi", "oliver", "fred", "aaron", "rocko", "gordon", "alex", "google uk english male", "microsoft guy", "microsoft david", "microsoft mark", "microsoft george", "(male)", " male", "_male", "-male"];
  // Known FEMALE voices to REJECT even if they'd otherwise win a fallback.
  const FEMALE = ["samantha", "victoria", "karen", "moira", "tessa", "fiona", "susan", "allison", "ava", "nicky", "google uk english female", "google us english", "microsoft zira", "microsoft hazel", "microsoft susan", "female", "woman", "catherine", "serena", "kate", "martha", "amelie", "anna", "google español"];
  const isFemale = n => FEMALE.some(f => n.includes(f));
  // female check wins: a name that looks female is never treated as male
  const isMale = n => !isFemale(n) && MALE.some(m => n.includes(m));
  function pick() {
    if (!synth) return null;
    const voices = synth.getVoices() || [];
    if (!voices.length) return null;
    const named = voices.map(v => ({
      v,
      n: (v.name || "").toLowerCase(),
      lang: (v.lang || "").toLowerCase()
    }));
    // 1) explicit male, prefer English
    const maleEn = named.find(x => isMale(x.n) && /^en/.test(x.lang));
    if (maleEn) return maleEn.v;
    const maleAny = named.find(x => isMale(x.n));
    if (maleAny) return maleAny.v;
    // 2) English voice that is NOT known-female (better a neutral than a clear woman)
    const enNotFemale = named.find(x => /^en/.test(x.lang) && !isFemale(x.n));
    if (enNotFemale) return enNotFemale.v;
    // 3) any voice not known-female
    const notFemale = named.find(x => !isFemale(x.n));
    if (notFemale) return notFemale.v;
    // 4) last resort
    return named[0].v;
  }
  function ensure() {
    if (!chosen) chosen = pick();
    return chosen;
  }
  if (synth) {
    try {
      synth.onvoiceschanged = () => {
        chosen = pick();
      };
    } catch (e) {}
  }
  function doSpeak(text, attempt) {
    if (!synth) return;
    try {
      const v = ensure();
      // If voices haven't loaded yet, wait briefly and retry (Chrome loads them async)
      if (!v && attempt < 8) {
        setTimeout(() => doSpeak(text, attempt + 1), 200);
        return;
      }
      synth.cancel();
      const u = new SpeechSynthesisUtterance(text);
      if (v) u.voice = v;
      u.pitch = 0.8; // deep but natural — pairs with an actual male voice
      u.rate = 1.0; // natural cadence
      u.volume = 1.0;
      synth.speak(u);
      // Chrome sometimes pauses the queue; nudge it
      try {
        if (synth.paused) synth.resume();
      } catch (e) {}
    } catch (e) {}
  }
  return {
    ok: !!synth,
    speak: text => doSpeak(text, 0),
    stop: () => {
      try {
        synth && synth.cancel();
      } catch (e) {}
    },
    list: () => {
      try {
        return (synth.getVoices() || []).filter(x => /^en/i.test(x.lang || ""));
      } catch (e) {
        return [];
      }
    },
    current: () => ensure(),
    setVoice: name => {
      try {
        const vs = synth.getVoices() || [];
        const f = vs.find(x => x.name === name);
        if (f) chosen = f;
      } catch (e) {}
    }
  };
}
const RANKS = [{
  at: 0,
  name: "CADET"
}, {
  at: 100,
  name: "TRAINEE"
}, {
  at: 240,
  name: "ANALYST"
}, {
  at: 420,
  name: "PROFILER II"
}, {
  at: 640,
  name: "PROFILER I"
}, {
  at: 900,
  name: "LEAD"
}];
const BADGES = {
  clean: {
    name: "Clean Solve",
    note: "Solved a report with no wrong drops"
  },
  firsttry: {
    name: "First Pass",
    note: "Whole report right on the first submit"
  },
  hold: {
    name: "Restraint",
    note: "Correctly concluded no one could be charged"
  },
  scholar: {
    name: "Scholar",
    note: "Placed every concept term correctly across the casebook"
  }
};
function rankFor(xp) {
  let r = RANKS[0];
  for (const c of RANKS) if (xp >= c.at) r = c;
  return r;
}
function nextRank(xp) {
  for (const c of RANKS) if (xp < c.at) return c;
  return null;
}
const wrap = {
  minHeight: "100vh",
  background: T.ink,
  backgroundImage: "radial-gradient(circle at 16% -8%, rgba(158,43,35,0.14), transparent 42%), radial-gradient(circle at 94% 108%, rgba(95,125,140,0.11), transparent 46%)",
  color: T.paper,
  fontFamily: "'Georgia', serif",
  padding: "clamp(14px, 4vw, 40px)"
};
const CSS = `
@keyframes mm_rise{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:none;}}
@keyframes mm_pop{0%{transform:scale(0);}70%{transform:scale(1.2);}100%{transform:scale(1);}}
@keyframes mm_slam{0%{opacity:0;transform:scale(1.35) rotate(-2deg);}60%{opacity:1;transform:scale(.95) rotate(-2deg);}100%{transform:scale(1) rotate(-2deg);}}
@keyframes mm_bounce{0%,100%{transform:translateX(0);}20%{transform:translateX(-6px);}40%{transform:translateX(6px);}60%{transform:translateX(-4px);}80%{transform:translateX(4px);}}
@keyframes mm_lockin{0%{transform:scale(1.15);}100%{transform:scale(1);}}
@keyframes mm_in{from{opacity:0;transform:translateX(18px) rotate(1.5deg);}to{opacity:1;transform:none;}}
.mm-rise{animation:mm_rise .35s ease both;}
.mm-pop{animation:mm_pop .4s cubic-bezier(.2,1.5,.4,1) both;}
.mm-slam{animation:mm_slam .5s cubic-bezier(.2,1.4,.4,1) both;}
.mm-bounce{animation:mm_bounce .4s ease;}
.mm-lockin{animation:mm_lockin .3s ease;}
.mm-card{animation:mm_in .3s ease both;}
`;
function pill(bg, color, extra = {}) {
  return {
    background: bg,
    color,
    border: "none",
    padding: "13px 24px",
    borderRadius: 10,
    fontFamily: mono,
    fontSize: 13,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    cursor: "pointer",
    ...extra
  };
}
function Stamp({
  label,
  color
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: "mm-slam",
    style: {
      border: `2px solid ${color}`,
      color,
      padding: "3px 12px",
      borderRadius: 3,
      fontFamily: mono,
      fontSize: 12.5,
      letterSpacing: 2,
      textTransform: "uppercase",
      display: "inline-block",
      transform: "rotate(-2deg)"
    }
  }, label);
}
function MindMotive() {
  const audioRef = useRef(null);
  if (!audioRef.current) audioRef.current = makeAudio();
  const S = audioRef.current;
  const voiceRef = useRef(null);
  if (!voiceRef.current) voiceRef.current = makeVoice();
  const V = voiceRef.current;
  const [sound, setSound] = useState(false);
  const [voiceOn, setVoiceOn] = useState(true);
  const [showVoicePick, setShowVoicePick] = useState(false);
  const [voiceList, setVoiceList] = useState([]);
  const [voiceName, setVoiceName] = useState("");
  const beep = n => {
    if (sound && S[n]) {
      S.resume();
      S[n]();
    }
  };
  const [ci, setCi] = useState(0);
  const [phase, setPhase] = useState("brief"); // brief | clues | report | solved
  const [xp, setXp] = useState(0);
  const [badges, setBadges] = useState({});
  const [toast, setToast] = useState(null);
  const [log, setLog] = useState([]);
  const [done, setDone] = useState(false);
  const [clue, setClue] = useState(0);
  const [placed, setPlaced] = useState({}); // slot -> word id
  const [locked, setLocked] = useState({}); // slot -> true once correct-confirmed
  const [selected, setSelected] = useState(null); // tap-to-place: selected bank word id
  const [wrongPulse, setWrongPulse] = useState({}); // slot -> ts for bounce
  const [attempts, setAttempts] = useState(0);
  const [wrongDrops, setWrongDrops] = useState(0);
  const [solved, setSolved] = useState(false);
  const [partnerLine, setPartnerLine] = useState(null); // current partner speech
  const [miscarriages, setMiscarriages] = useState(0); // wrong-name charges across the run
  const dragX = useRef(null);
  const [drag, setDrag] = useState(0);
  const [dragWord, setDragWord] = useState(null); // html5 drag payload

  const c = CASES[ci];
  const slots = c.report.filter(p => p && p.slot);
  const bankById = {};
  c.bank.forEach(w => {
    bankById[w.id] = w;
  });
  const usedIds = Object.values(placed);
  const availableBank = c.bank.filter(w => !usedIds.includes(w.id));
  const allFilled = slots.every(sl => placed[sl.slot]);
  function award(n, why) {
    setXp(x => {
      const before = x,
        after = Math.max(0, Math.round(x + n));
      if (rankFor(after).name !== rankFor(before).name && after > before) {
        setToast({
          k: "rank",
          t: `PROMOTED · ${rankFor(after).name}`
        });
        beep("rank");
      } else if (why) setToast({
        k: n >= 0 ? "xp" : "bad",
        t: `${n >= 0 ? "+" : ""}${n} · ${why}`
      });
      return after;
    });
  }
  function badge(k) {
    setBadges(b => {
      if (b[k]) return b;
      setTimeout(() => setToast({
        k: "badge",
        t: `BADGE · ${BADGES[k].name}`
      }), 300);
      return {
        ...b,
        [k]: true
      };
    });
  }
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1900);
    return () => clearTimeout(t);
  }, [toast]);
  // Voss speaks his lines aloud (Web Speech), when voice is on
  useEffect(() => {
    if (partnerLine && voiceOn && V && V.ok) V.speak(partnerLine.text);
  }, [partnerLine]);
  // stop speech if voice toggled off
  useEffect(() => {
    if (!voiceOn && V) V.stop();
  }, [voiceOn]);
  function resetCase(i) {
    setCi(i);
    setPhase("brief");
    setClue(0);
    setPlaced({});
    setLocked({});
    setSelected(null);
    setWrongPulse({});
    setAttempts(0);
    setWrongDrops(0);
    setSolved(false);
    setDrag(0);
    setPartnerLine(null);
  }

  // place a word into a slot (from tap-select or drag)
  function placeWord(slot, wordId) {
    const sl = slots.find(s => s.slot === slot);
    const w = bankById[wordId];
    if (!sl || !w) {
      beep("bounce");
      return false;
    }
    // On scaffolded (easy) cases the slot only accepts its own type — a helpful guard.
    // On hideLabels (hard) cases we DROP that guard: any word can go in any blank, so the
    // accept/reject behaviour itself never leaks the category. Wrong type is just wrong, on submit.
    if (!c.hideLabels && w.type !== sl.type) {
      beep("bounce");
      return false;
    }
    if (locked[slot]) return false;
    setPlaced(p => {
      const next = {
        ...p
      };
      // if this word was in another slot, clear it there
      for (const k of Object.keys(next)) if (next[k] === wordId) delete next[k];
      next[slot] = wordId;
      return next;
    });
    beep("place");
    setSelected(null);
    return true;
  }
  function clearSlot(slot) {
    if (locked[slot]) return;
    setPlaced(p => {
      const n = {
        ...p
      };
      delete n[slot];
      return n;
    });
    beep("tap");
  }
  function tapBankWord(wordId) {
    if (selected === wordId) {
      setSelected(null);
      return;
    }
    setSelected(wordId);
    beep("tap");
  }
  function tapSlot(slot) {
    if (locked[slot]) return;
    if (selected) {
      placeWord(slot, selected);
    } else if (placed[slot]) {
      clearSlot(slot);
    }
  }
  function partnerReactToWrong(wrongSlots) {
    // find the most specific line: a wrong-placed word that has a keyed reaction
    const P = c.partner || {};
    for (const sl of wrongSlots) {
      const wid = placed[sl.slot];
      if (wid && P.wrong && P.wrong[wid]) {
        setPartnerLine({
          tone: "wrong",
          text: P.wrong[wid]
        });
        return;
      }
    }
    const n = P.nudge && P.nudge.length ? P.nudge[Math.floor(Math.random() * P.nudge.length)] : "That doesn't hold. Look again.";
    setPartnerLine({
      tone: "wrong",
      text: n
    });
  }
  function submitReport() {
    setAttempts(a => a + 1);
    const newLocked = {
      ...locked
    };
    let allRight = true,
      newlyWrong = 0;
    const pulse = {};
    const wrongSlots = [];
    slots.forEach(sl => {
      const correct = placed[sl.slot] === c.answer[sl.slot];
      if (correct) newLocked[sl.slot] = true;else {
        allRight = false;
        pulse[sl.slot] = Date.now();
        newlyWrong++;
        wrongSlots.push(sl);
      }
    });
    setLocked(newLocked);
    if (allRight) {
      const first = attempts === 0;
      const cleanRun = wrongDrops === 0;
      const bonus = (first ? 30 : 0) + (cleanRun ? 20 : 0);
      award(60 + bonus, "report solved");
      if (first) badge("firsttry");
      if (cleanRun) badge("clean");
      if (c.hold) badge("hold");
      setPartnerLine({
        tone: "praise",
        text: c.partner && c.partner.praise || "Good work."
      });
      setSolved(true);
      setPhase("solved");
      beep("solve");
      setLog(L => [...L, {
        id: c.id,
        title: c.title,
        attempts: attempts + 1,
        clean: cleanRun,
        hold: !!c.hold
      }]);
    } else {
      // Did the player charge the WRONG person? (name slot placed but incorrect) → real consequence
      const nameSlots = slots.filter(sl => sl.type === "name");
      const chargedWrongPerson = nameSlots.some(sl => placed[sl.slot] && placed[sl.slot] !== c.answer[sl.slot]);
      setWrongDrops(d => d + newlyWrong);
      setWrongPulse(pulse);
      award(-6 * newlyWrong, "misplaced");
      beep("bounce");
      if (chargedWrongPerson) {
        setMiscarriages(m => m + 1);
        setPartnerLine({
          tone: "consequence",
          text: c.partner && c.partner.consequence || "An innocent pays for your mistake."
        });
      } else {
        partnerReactToWrong(wrongSlots);
      }
      setTimeout(() => {
        setPlaced(p => {
          const n = {
            ...p
          };
          slots.forEach(sl => {
            if (!newLocked[sl.slot]) delete n[sl.slot];
          });
          return n;
        });
        setWrongPulse({});
      }, 450);
    }
  }
  function proceed() {
    // scholar badge: all concept slots correct across all cases played
    if (ci < CASES.length - 1) resetCase(ci + 1);else {
      checkScholar();
      setDone(true);
    }
  }
  function checkScholar() {
    const conceptCases = CASES.length;
    const solvedConcepts = log.length + 1; // rough: solved all
    if (log.length + 1 >= conceptCases) badge("scholar");
  }
  function restart() {
    setXp(0);
    setBadges({});
    setLog([]);
    setMiscarriages(0);
    setDone(false);
    resetCase(0);
  }
  const XpBar = () => {
    const r = rankFor(xp),
      nr = nextRank(xp),
      lo = r.at,
      hi = nr ? nr.at : r.at + 260;
    const pct = Math.min(100, (xp - lo) / (hi - lo) * 100);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 5
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: mono,
        fontSize: 11,
        letterSpacing: 2,
        color: T.amber
      }
    }, r.name), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: mono,
        fontSize: 10.5,
        color: T.paperDim
      }
    }, xp, " XP", nr ? ` · ${nr.at - xp}→${nr.name.split(" ")[0]}` : " · MAX")), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 7,
        background: T.ink2,
        borderRadius: 5,
        overflow: "hidden",
        border: `1px solid ${T.ink3}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: "100%",
        width: `${pct}%`,
        background: `linear-gradient(90deg,${T.amber},${T.ember})`,
        transition: "width .5s cubic-bezier(.3,1,.4,1)"
      }
    })));
  };
  const Toast = () => toast ? /*#__PURE__*/React.createElement("div", {
    className: "mm-pop",
    style: {
      position: "fixed",
      top: 14,
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 50,
      background: T.ink3,
      border: `1.5px solid ${toast.k === "rank" ? T.ember : toast.k === "badge" ? T.amber : toast.k === "bad" ? T.red : T.green}`,
      color: toast.k === "rank" ? T.ember : toast.k === "badge" ? T.amber : toast.k === "bad" ? T.red : T.green,
      fontFamily: mono,
      fontSize: 12,
      letterSpacing: 1.2,
      padding: "8px 16px",
      borderRadius: 8,
      boxShadow: "0 8px 26px rgba(0,0,0,.6)"
    }
  }, toast.t) : null;

  // clue swipe handlers
  function goClue(dir) {
    beep("flip");
    setClue(n => Math.max(0, Math.min(c.clues.length - 1, n + dir)));
    setDrag(0);
  }
  const onDown = e => {
    dragX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };
  const onMove = e => {
    if (dragX.current == null) return;
    setDrag((e.touches ? e.touches[0].clientX : e.clientX) - dragX.current);
  };
  const onUp = () => {
    if (drag < -50) goClue(1);else if (drag > 50) goClue(-1);else setDrag(0);
    dragX.current = null;
  };

  // ── DONE ──
  if (done) {
    const solvedN = log.length;
    const clean = log.filter(r => r.clean).length;
    return /*#__PURE__*/React.createElement("div", {
      style: wrap
    }, /*#__PURE__*/React.createElement("style", null, CSS), /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 560,
        margin: "0 auto",
        paddingTop: 30,
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement(Stamp, {
      label: "Casebook Closed",
      color: T.green
    }), /*#__PURE__*/React.createElement("h1", {
      style: {
        marginTop: 20,
        fontSize: 34
      }
    }, xp), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: mono,
        fontSize: 13,
        letterSpacing: 3,
        color: T.ember
      }
    }, rankFor(xp).name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: mono,
        fontSize: 12.5,
        color: T.paperDim,
        margin: "14px 0 6px"
      }
    }, solvedN, "/", CASES.length, " REPORTS SOLVED · ", clean, " CLEAN"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: mono,
        fontSize: 12.5,
        color: miscarriages === 0 ? T.green : T.redBright,
        marginBottom: 14
      }
    }, miscarriages === 0 ? "◆ NO INNOCENTS CHARGED — a clean conscience" : `✕ ${miscarriages} INNOCENT${miscarriages > 1 ? "S" : ""} WRONGLY CHARGED ALONG THE WAY`), Object.keys(badges).length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        flexWrap: "wrap",
        justifyContent: "center",
        marginBottom: 20
      }
    }, Object.keys(badges).map(k => /*#__PURE__*/React.createElement("span", {
      key: k,
      title: BADGES[k].note,
      style: {
        fontFamily: mono,
        fontSize: 11,
        color: T.amber,
        border: `1px solid ${T.amber}55`,
        borderRadius: 20,
        padding: "5px 12px"
      }
    }, "◆ ", BADGES[k].name))), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 13.5,
        lineHeight: 1.6,
        color: T.paperDim,
        textAlign: "left",
        background: T.ink3,
        borderLeft: `3px solid ${T.steel}`,
        borderRadius: "0 8px 8px 0",
        padding: "13px 16px"
      }
    }, "One report ends with no one to charge at all. Two scenes lied to you. One held two offenders. One had no crime at all. Real profiling is exactly this uncertain: it narrows a field, it does not hand you a name, and the discipline is knowing when the evidence stops short. That restraint is the whole craft."), /*#__PURE__*/React.createElement("button", {
      onClick: restart,
      style: {
        ...pill(T.red, T.paper),
        marginTop: 20
      }
    }, "Play again")));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: wrap
  }, /*#__PURE__*/React.createElement("style", null, CSS), /*#__PURE__*/React.createElement(Toast, null), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 620,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: mono,
      fontSize: 10.5,
      letterSpacing: 2,
      color: T.steel
    }
  }, "CASE ", String(c.id).padStart(2, "0"), "/", String(CASES.length).padStart(2, "0"), " · ", c.tag, " · ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.ember
    }
  }, "◆".repeat(c.difficulty || 1), "◇".repeat(3 - (c.difficulty || 1)))), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "2px 0 0",
      fontSize: 21,
      letterSpacing: "-0.3px"
    }
  }, c.title)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      const n = !voiceOn;
      setVoiceOn(n);
      if (!n && V) V.stop();
    },
    title: "Inspector Voss reads his lines aloud",
    style: {
      background: "transparent",
      border: `1px solid ${voiceOn ? T.ember : T.manila + "44"}`,
      color: voiceOn ? T.ember : T.paperDim,
      borderRadius: 6,
      padding: "5px 9px",
      fontFamily: mono,
      fontSize: 10,
      cursor: "pointer"
    }
  }, voiceOn ? "🔊 VOSS" : "🔇 VOSS"), voiceOn && V && V.ok && /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      const vs = V.list();
      setVoiceList(vs);
      const cur = V.current();
      setVoiceName(cur ? cur.name : "");
      setShowVoicePick(s => !s);
    },
    title: "Choose Voss's voice (device voices vary)",
    style: {
      background: "transparent",
      border: `1px solid ${T.manila}44`,
      color: T.paperDim,
      borderRadius: 6,
      padding: "5px 8px",
      fontFamily: mono,
      fontSize: 10,
      cursor: "pointer"
    }
  }, "⚙"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      const n = !sound;
      setSound(n);
      if (n) {
        S.resume();
        S.tap();
      }
    },
    style: {
      background: "transparent",
      border: `1px solid ${sound ? T.steel : T.manila + "44"}`,
      color: sound ? T.steel : T.paperDim,
      borderRadius: 6,
      padding: "5px 9px",
      fontFamily: mono,
      fontSize: 10,
      cursor: "pointer"
    }
  }, sound ? "♪ ON" : "♪ OFF"))), showVoicePick && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14,
      padding: "12px 14px",
      background: T.ink2,
      border: `1px solid ${T.ember}55`,
      borderRadius: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: mono,
      fontSize: 9.5,
      letterSpacing: 1.5,
      color: T.ember,
      marginBottom: 4
    }
  }, "VOSS · VOICE"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: T.paperDim,
      marginBottom: 10,
      lineHeight: 1.45
    }
  }, "Your device decides which voices exist, and some default to a woman's. Pick one that suits him — tap to hear it."), voiceList.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: T.paperDim,
      fontStyle: "italic"
    }
  }, "No voices reported by this browser.") : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 5,
      maxHeight: 190,
      overflowY: "auto"
    }
  }, voiceList.map(v => /*#__PURE__*/React.createElement("button", {
    key: v.name,
    onClick: () => {
      V.setVoice(v.name);
      setVoiceName(v.name);
      V.speak("Voss. Read the room, Inspector.");
    },
    style: {
      textAlign: "left",
      background: voiceName === v.name ? T.ember + "22" : "transparent",
      border: `1px solid ${voiceName === v.name ? T.ember : T.manila + "33"}`,
      color: voiceName === v.name ? T.ember : T.paper,
      borderRadius: 6,
      padding: "7px 9px",
      fontFamily: mono,
      fontSize: 11,
      cursor: "pointer"
    }
  }, voiceName === v.name ? "▸ " : "  ", v.name, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.paperDim
    }
  }, "· ", v.lang)))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowVoicePick(false),
    style: {
      ...pill(T.steel, T.paper),
      marginTop: 10,
      width: "100%",
      padding: "7px 0",
      fontSize: 11
    }
  }, "Done")), /*#__PURE__*/React.createElement(XpBar, null), DEV_MODE && !done && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 4,
      alignItems: "center",
      marginBottom: 14,
      padding: "8px 10px",
      background: "rgba(216,114,44,0.08)",
      border: `1px dashed ${T.ember}88`,
      borderRadius: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: mono,
      fontSize: 9.5,
      letterSpacing: 1,
      color: T.ember,
      marginRight: 4
    }
  }, "DEV · JUMP"), CASES.map((cc, i) => /*#__PURE__*/React.createElement("button", {
    key: cc.id,
    onClick: () => {
      resetCase(i);
      beep("tap");
    },
    title: cc.title,
    style: {
      background: i === ci ? T.ember : "transparent",
      color: i === ci ? T.ink : T.ember,
      border: `1px solid ${T.ember}77`,
      borderRadius: 5,
      width: 26,
      height: 24,
      fontFamily: mono,
      fontSize: 11,
      cursor: "pointer",
      padding: 0
    }
  }, cc.id))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      marginBottom: 18
    }
  }, ["brief", "clues", "report", "solved"].map((p, i) => {
    const order = {
      brief: 0,
      clues: 1,
      report: 2,
      solved: 3
    };
    return /*#__PURE__*/React.createElement("div", {
      key: p,
      style: {
        flex: 1,
        height: 3,
        borderRadius: 2,
        background: order[phase] >= i ? T.amber : T.ink3
      }
    });
  })), phase === "brief" && /*#__PURE__*/React.createElement("div", {
    className: "mm-rise"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: T.manila,
      color: T.ink,
      borderRadius: "2px 14px 2px 2px",
      padding: "20px 22px",
      boxShadow: "0 16px 40px rgba(0,0,0,.5)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: mono,
      fontSize: 10.5,
      letterSpacing: 2,
      color: T.red,
      marginBottom: 8
    }
  }, "TEACHES · ", c.teaches.toUpperCase()), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 16,
      lineHeight: 1.5
    }
  }, c.brief)), c.diagram && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      background: T.ink2,
      border: `1px solid ${T.steel}33`,
      borderRadius: 10,
      padding: "10px 12px 8px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: mono,
      fontSize: 9.5,
      letterSpacing: 1.5,
      color: T.steel,
      marginBottom: 6
    }
  }, "◫ SCENE DIAGRAM"), /*#__PURE__*/React.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: c.diagram
    }
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setPhase("clues");
      beep("tap");
    },
    style: {
      ...pill(T.red, T.paper),
      marginTop: 18,
      width: "100%"
    }
  }, "Examine the scene ▸")), phase === "clues" && /*#__PURE__*/React.createElement("div", {
    className: "mm-rise"
  }, Object.keys(placed).length > 0 && /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setPhase("report");
      beep("tap");
    },
    style: {
      background: "transparent",
      border: `1px solid ${T.red}88`,
      color: T.redBright,
      borderRadius: 7,
      padding: "7px 12px",
      fontFamily: mono,
      fontSize: 10.5,
      letterSpacing: 1,
      cursor: "pointer",
      marginBottom: 12,
      width: "100%"
    }
  }, "▸ RESUME REPORT (your placements are saved)"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: mono,
      fontSize: 11,
      letterSpacing: 1.5,
      color: T.paperDim,
      marginBottom: 10,
      textAlign: "center"
    }
  }, "CLUE ", clue + 1, " / ", c.clues.length, " · swipe or arrows · all free"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      userSelect: "none"
    },
    onMouseDown: onDown,
    onMouseMove: onMove,
    onMouseUp: onUp,
    onMouseLeave: () => dragX.current != null && onUp(),
    onTouchStart: onDown,
    onTouchMove: onMove,
    onTouchEnd: onUp
  }, /*#__PURE__*/React.createElement("div", {
    key: clue,
    className: "mm-card",
    style: {
      transform: `translateX(${drag}px) rotate(${drag * 0.02}deg)`,
      background: T.ink2,
      border: `1.5px solid ${T.amber}55`,
      borderRadius: 14,
      padding: "26px 22px",
      minHeight: 140,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      cursor: "grab",
      boxShadow: "0 12px 30px rgba(0,0,0,.4)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: mono,
      fontSize: 12,
      letterSpacing: 2,
      color: T.amber,
      marginBottom: 12
    }
  }, "◦ ", c.clues[clue].tag), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 18,
      lineHeight: 1.45
    }
  }, c.clues[clue].text))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => goClue(-1),
    disabled: clue === 0,
    style: {
      ...pill(clue === 0 ? T.ink2 : T.ink3, clue === 0 ? T.paperDim : T.paper),
      padding: "10px 16px"
    }
  }, "◂"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, c.clues.map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: i === clue ? T.amber : T.ink3
    }
  }))), clue < c.clues.length - 1 ? /*#__PURE__*/React.createElement("button", {
    onClick: () => goClue(1),
    style: {
      ...pill(T.ink3, T.paper),
      padding: "10px 16px"
    }
  }, "▸") : /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setPhase("report");
      beep("tap");
    },
    style: {
      ...pill(T.red, T.paper),
      padding: "10px 16px"
    }
  }, Object.keys(placed).length > 0 ? "Back to report ▸" : "Write the report ▸"))), (phase === "report" || phase === "solved") && /*#__PURE__*/React.createElement("div", {
    className: "mm-rise"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: mono,
      fontSize: 10.5,
      letterSpacing: 1.5,
      color: T.paperDim
    }
  }, phase === "solved" ? "CASE REPORT · FILED" : "FILL THE REPORT · tap a word then a blank, or drag"), phase === "report" && /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setPhase("clues");
      beep("flip");
    },
    style: {
      background: "transparent",
      border: `1px solid ${T.steel}66`,
      color: T.steel,
      borderRadius: 7,
      padding: "6px 11px",
      fontFamily: mono,
      fontSize: 10.5,
      letterSpacing: 1,
      cursor: "pointer",
      whiteSpace: "nowrap"
    }
  }, "◂ REVIEW CLUES")), partnerLine && /*#__PURE__*/React.createElement("div", {
    className: "mm-rise",
    style: {
      display: "flex",
      gap: 10,
      marginBottom: 14,
      alignItems: "flex-start",
      background: partnerLine.tone === "consequence" ? "rgba(158,43,35,0.12)" : partnerLine.tone === "praise" ? "rgba(78,122,94,0.12)" : T.ink2,
      border: `1px solid ${partnerLine.tone === "consequence" ? T.red : partnerLine.tone === "praise" ? T.green : T.steel + "55"}`,
      borderRadius: 12,
      padding: "12px 14px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      width: 34,
      height: 34,
      borderRadius: "50%",
      background: T.ink3,
      border: `1.5px solid ${T.steel}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 16
    }
  }, "🕵"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: mono,
      fontSize: 9.5,
      letterSpacing: 1.5,
      color: partnerLine.tone === "consequence" ? T.redBright : partnerLine.tone === "praise" ? T.greenBright : T.steel,
      marginBottom: 3
    }
  }, "INSPECTOR VOSS ", partnerLine.tone === "consequence" ? "· THE COST" : partnerLine.tone === "praise" ? "· A NOD" : ""), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      lineHeight: 1.5,
      color: T.paper,
      fontStyle: "italic"
    }
  }, "\"", partnerLine.text, "\""))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: T.ink2,
      border: `1px solid ${T.manila}22`,
      borderRadius: 12,
      padding: "20px 20px",
      fontSize: 17,
      lineHeight: 2.1,
      marginBottom: 18
    }
  }, c.report.map((part, idx) => {
    if (typeof part === "string") return /*#__PURE__*/React.createElement("span", {
      key: idx
    }, part);
    const sl = part;
    const wid = placed[sl.slot];
    const w = wid ? bankById[wid] : null;
    const isLocked = locked[sl.slot];
    const pulsing = wrongPulse[sl.slot];
    const col = c.hideLabels ? T.manila : TYPE_COLOR[sl.type];
    return /*#__PURE__*/React.createElement("span", {
      key: idx,
      className: pulsing ? "mm-bounce" : isLocked ? "mm-lockin" : "",
      onClick: () => phase === "report" && tapSlot(sl.slot),
      onDragOver: e => {
        if (phase === "report" && !isLocked) e.preventDefault();
      },
      onDrop: e => {
        e.preventDefault();
        if (phase === "report" && dragWord) {
          placeWord(sl.slot, dragWord);
          setDragWord(null);
        }
      },
      style: {
        display: "inline-block",
        minWidth: 96,
        textAlign: "center",
        margin: "0 3px",
        padding: "3px 12px",
        borderRadius: 8,
        cursor: phase === "report" && !isLocked ? "pointer" : "default",
        fontFamily: mono,
        fontSize: 14,
        verticalAlign: "middle",
        border: `1.5px ${w ? "solid" : "dashed"} ${isLocked ? T.green : w ? col : col + "66"}`,
        background: isLocked ? "rgba(78,122,94,0.2)" : w ? "rgba(255,255,255,0.04)" : "transparent",
        color: isLocked ? T.greenBright : w ? T.paper : col + "aa"
      }
    }, w ? w.text : c.hideLabels ? "______" : TYPE_LABEL[sl.type], isLocked && " ✓");
  })), phase === "report" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: mono,
      fontSize: 10.5,
      letterSpacing: 1.5,
      color: c.hideLabels ? T.ember : T.paperDim,
      marginBottom: 8
    }
  }, c.hideLabels ? "EVIDENCE WORDS — no category hints at this rank" : "EVIDENCE WORDS — some belong, some don't"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8,
      marginBottom: 18
    }
  }, availableBank.map(w => {
    const col = c.hideLabels ? T.manila : TYPE_COLOR[w.type];
    const sel = selected === w.id;
    return /*#__PURE__*/React.createElement("span", {
      key: w.id,
      draggable: true,
      onDragStart: () => setDragWord(w.id),
      onDragEnd: () => setDragWord(null),
      onClick: () => tapBankWord(w.id),
      title: TYPE_LABEL[w.type],
      style: {
        padding: "8px 13px",
        borderRadius: 9,
        cursor: "grab",
        fontFamily: mono,
        fontSize: 13.5,
        border: `1.5px solid ${sel ? col : col + "55"}`,
        background: sel ? "rgba(255,255,255,0.08)" : T.ink2,
        color: sel ? T.paper : T.paperDim,
        boxShadow: sel ? `0 0 12px ${col}66` : "none",
        transition: "box-shadow .15s"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: col,
        fontSize: 9,
        marginRight: 6,
        letterSpacing: 1,
        display: c.hideLabels ? "none" : "inline"
      }
    }, TYPE_LABEL[w.type]), w.text);
  })), /*#__PURE__*/React.createElement("button", {
    onClick: submitReport,
    disabled: !allFilled,
    style: {
      ...pill(allFilled ? T.red : T.ink2, allFilled ? T.paper : T.paperDim),
      width: "100%"
    }
  }, allFilled ? "File the report" : `Fill all ${slots.length} blanks (${Object.keys(placed).length}/${slots.length})`), attempts > 0 && !solved && /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 10,
      fontSize: 12.5,
      color: T.redBright,
      fontStyle: "italic",
      textAlign: "center"
    }
  }, "Some placements didn't hold. The correct ones locked green — rework the rest.")), phase === "solved" && /*#__PURE__*/React.createElement("div", {
    className: "mm-rise"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(Stamp, {
    label: c.hold ? "Rightly Held" : "Case Closed",
    color: T.green
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: T.ink3,
      borderLeft: `3px solid ${T.green}`,
      borderRadius: "0 8px 8px 0",
      padding: "13px 16px",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14.5,
      lineHeight: 1.6,
      color: T.paper
    }
  }, c.hitLine)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 16
    }
  }, (c.concepts || []).filter(k => Object.values(c.answer).includes(k)).map(k => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      background: T.ink2,
      border: `1px solid ${T.steel}33`,
      borderRadius: 8,
      padding: "10px 13px",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: mono,
      fontSize: 11,
      color: T.steel,
      letterSpacing: 1
    }
  }, "▸ ", k.toUpperCase()), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "5px 0 0",
      fontSize: 13,
      lineHeight: 1.5,
      color: T.paperDim
    }
  }, GLOSS[k])))), /*#__PURE__*/React.createElement("button", {
    onClick: proceed,
    style: {
      ...pill(T.green, T.paper),
      width: "100%"
    }
  }, ci < CASES.length - 1 ? "Next case ▸" : "Close the casebook ▸")))));
}
window.MindMotive = MindMotive;