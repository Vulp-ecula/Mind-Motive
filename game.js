const {
  useState,
  useEffect,
  useRef
} = React;

// ═══════════════════════════════════════════════════════════════
// MIND & MOTIVE — terse edition
// Loop per case: 2-line brief → swipe clue cards → 3 fast profiling
// calls (1-line Q, few-word options, 1-line teaching hit) → name the
// suspect (1-line verdicts). XP + streak. No scene-search, no
// keystone, no walls of text. Punchy but thoughtful.
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
  amber: "#B8863B",
  steel: "#5f7d8c",
  ember: "#D8722C"
};
const mono = "'Courier New', monospace";

// ── sound (synth, muted by default) ────────────────────────────
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
    flip: () => tone(300, 0.05, "square", 0.02),
    tap: () => tone(440, 0.04, "square", 0.03),
    right: () => {
      tone(523, 0.09, "sine", 0.05);
      setTimeout(() => tone(784, 0.14, "sine", 0.05), 70);
    },
    wrong: () => tone(180, 0.24, "sawtooth", 0.05, 120),
    rank: () => {
      [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => tone(f, 0.15, "triangle", 0.05), i * 80));
    },
    arrest: () => {
      tone(660, 0.1, "sine", 0.05);
      setTimeout(() => tone(880, 0.18, "sine", 0.05), 90);
    }
  };
}

// ── ranks & badges ─────────────────────────────────────────────
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
  flawless: {
    name: "Flawless",
    note: "All 3 calls right in a case"
  },
  hotstreak: {
    name: "Hot Streak",
    note: "Reached a ×2 streak"
  },
  antibias: {
    name: "Against the Grain",
    note: "Resisted the 'looks the type' trap"
  }
};

// ── cases (terse) ──────────────────────────────────────────────
// clues: {tag, text} short cards. calls: {q, opts:[{t,ok,hit}]}.
// hit = the 1-line teaching payoff. suspects:{name,tell,ok,line}.
const C = [{
  id: 1,
  title: "The Widow's Tea",
  tag: "POISONING",
  teaches: "Victimology · Signature",
  brief: "Eleanor Fitch, 68, widowed six months and worth a fortune, is found slumped in her parlour chair, the tea things still laid for two. No forced door, nothing taken, no sign she struggled — she poured for her killer and drank alongside them. On the desk, a new will sits unsigned. Whoever did this was someone she was glad to see.",
  clues: [{
    tag: "THE POT",
    text: "Dosed — two cups poured, both drunk from. The killer shared it and lived."
  }, {
    tag: "HER HANDS",
    text: "No defensive wounds. She never fought."
  }, {
    tag: "THE DESK",
    text: "A new will, unsigned — leaves all to charity. The old one splits the estate."
  }, {
    tag: "UPSTAIRS",
    text: "A rinsed antidote vial in the basin."
  }],
  calls: [{
    q: "Low-risk victim, killed anyway. So the killer…",
    opts: [{
      t: "Was a stranger",
      ok: false,
      hit: "Strangers don't get invited to tea. Access was the whole crime."
    }, {
      t: "Had trusted access",
      ok: true,
      hit: "Right — a low-risk victim relocates the risk onto someone she trusted."
    }, {
      t: "Chose her at random",
      ok: false,
      hit: "No — the shared cup rules out opportunism."
    }]
  }, {
    q: "Sharing a poisoned pot and surviving is…",
    opts: [{
      t: "Just the method (MO)",
      ok: false,
      hit: "The poison is MO. Sharing it is extra — that's the tell."
    }, {
      t: "Signature — a private need",
      ok: true,
      hit: "Yes — behavior beyond the kill: a need to sit safe as she died."
    }, {
      t: "An accident",
      ok: false,
      hit: "No — the antidote vial proves it was planned."
    }]
  }, {
    q: "Drinking safely means the killer had…",
    opts: [{
      t: "A strong stomach",
      ok: false,
      hit: "No — that's the antidote's job, not luck."
    }, {
      t: "Antidote knowledge + nerve",
      ok: true,
      hit: "Exactly — composure and know-how, not a hot temper."
    }, {
      t: "A second clean pot",
      ok: false,
      hit: "No — both cups came from the dosed pot."
    }]
  }],
  deepdive: {
    q: "The antidote vial was rinsed and put back. What does that tidiness tell you?",
    opts: [{
      t: "The killer panicked and cleaned up",
      ok: false,
      hit: "No — panic doesn't rinse and reshelve. This is composure."
    }, {
      t: "An organized mind that plans and covers",
      ok: true,
      hit: "Yes — the cleanup is as controlled as the poisoning. Organized, not frantic."
    }, {
      t: "Someone else tidied later",
      ok: false,
      hit: "No — the vial ties to the killing itself, not a bystander."
    }]
  },
  profile: "Composed. Trusted. Knew an antidote.",
  followup: {
    q: "You caught her. But what actually ruled the physician OUT?",
    opts: [{
      t: "He had no motive",
      ok: false,
      hit: "He had means and proximity — motive wasn't the discriminator."
    }, {
      t: "He arrived after death — no opportunity",
      ok: true,
      hit: "Right — means without opportunity. Timing cleared him, not character."
    }, {
      t: "He seemed too gentle",
      ok: false,
      hit: "Never profile on 'seeming' — that's the bias. It was the timeline."
    }]
  },
  suspects: [{
    name: "The nephew",
    tell: "Ruined by the new will, was in the house that afternoon, quarrelled with her over money.",
    ok: false,
    line: "The strongest motive and real opportunity — a tempting pick. But poisoning that shares the cup and survives is patient, composed work. His grief-to-rage temperament doesn't match the calm of the scene."
  }, {
    name: "The physician",
    tell: "Supplied her antidote. Arrived after the collapse.",
    ok: false,
    line: "Had the means, not the moment — he came after she was dead."
  }, {
    name: "The companion",
    tell: "Nursed her for years. Inherits under the old will.",
    ok: true,
    line: "Composed, trusted, and knew the antidote cold. She fits every clue."
  }],
  answer: 2
}, {
  id: 2,
  title: "The Forged Farewell",
  tag: "STAGED SUICIDE",
  teaches: "Staging · Skill",
  brief: "Judge Aldous Hallam is found at his study desk, a razor in his hand and a note confessing despair. It would read as a sad end to a hard career — except the wound beneath his jaw travels the wrong way, and the shaking hand of the note is a shade too even. Days before, he had reopened a conviction he'd come to doubt. Someone wanted him silent, and tidy.",
  clues: [{
    tag: "THE WOUND",
    text: "Track ascends back-to-front. No man does that to himself."
  }, {
    tag: "THE NOTE",
    text: "His hand, imitated — but the pen pressure never wavers."
  }, {
    tag: "THE CASE",
    text: "He'd just reopened a conviction built on buried evidence."
  }],
  calls: [{
    q: "Faking a suicide over a murder means the killer was…",
    opts: [{
      t: "Panicked, random",
      ok: false,
      hit: "Panic can't stage. This took time and nerve."
    }, {
      t: "Calm, connected, hiding something",
      ok: true,
      hit: "Yes — staging betrays exactly what they need unseen."
    }, {
      t: "A stranger",
      ok: false,
      hit: "No — a stranger has no note to forge, no case to bury."
    }]
  }, {
    q: "A flawless forgery of his hand points to…",
    opts: [{
      t: "Anyone under pressure",
      ok: false,
      hit: "No — a coroner-fooling hand needs practice and samples."
    }, {
      t: "Someone close to his writing",
      ok: true,
      hit: "Right — required skill filters the pool hard."
    }, {
      t: "Nothing useful",
      ok: false,
      hit: "Skill is evidence — it narrows who could've done it."
    }]
  }, {
    q: "The motive is whoever…",
    opts: [{
      t: "Disliked the judge",
      ok: false,
      hit: "Dislike is cheap. Look for existential stakes."
    }, {
      t: "Faces ruin if the case reopens",
      ok: true,
      hit: "Yes — reconstruct motive from consequence, not grudges."
    }, {
      t: "A passing burglar",
      ok: false,
      hit: "No — nothing was stolen; this was about the case."
    }]
  }],
  deepdive: {
    q: "The forged note's pen pressure is unnaturally even. Why does that matter?",
    opts: [{
      t: "It proves he was calm",
      ok: false,
      hit: "Close, but the point is sharper — a despairing man's hand shakes."
    }, {
      t: "A real suicide note wavers; this was copied cold",
      ok: true,
      hit: "Yes — the steadiness betrays a forger imitating, not a man breaking."
    }, {
      t: "It means nothing",
      ok: false,
      hit: "No — it's the detail that unmasks the forgery."
    }]
  },
  profile: "Calm. Knew his hand. Ruined if the case reopens.",
  followup: {
    q: "The groundskeeper had a grudge and access. Why wasn't he the fit?",
    opts: [{
      t: "He couldn't forge a judge's hand",
      ok: true,
      hit: "Right — the required skill filtered him out. Motive alone isn't enough."
    }, {
      t: "He wasn't angry enough",
      ok: false,
      hit: "Anger wasn't the issue — capability was."
    }, {
      t: "He had an alibi",
      ok: false,
      hit: "It wasn't an alibi — it was that the crime needed a skill he lacked."
    }]
  },
  suspects: [{
    name: "The clerk",
    tell: "Knew his handwriting. Timid. No stake in the case.",
    ok: false,
    line: "Access, but no nerve to stage a death and no reason to."
  }, {
    name: "The groundskeeper",
    tell: "A grudge over a firing. Can barely read.",
    ok: false,
    line: "The grudge is bait — he can't forge a judge's hand."
  }, {
    name: "The prosecutor",
    tell: "Drafted beside him 20 years. The case means prison for him.",
    ok: true,
    line: "Knew the hand, had the calm, faced ruin. Every axis lands."
  }],
  answer: 2
}, {
  id: 3,
  title: "The Tenement Blaze",
  tag: "ARSON",
  teaches: "Origin · Motive",
  brief: "Fire takes the Curran tenement in the black hours before dawn; a landlord and two lodgers die of smoke before the flames ever reach them. What's left of the timber tells a colder story than an accident — the burn climbs from one deliberate point, and a smell of oil hangs in the char. This fire was built to do exactly what it did.",
  clues: [{
    tag: "ORIGIN",
    text: "Set at the base of the only stair — the sole exit."
  }, {
    tag: "THE HALL",
    text: "A poured accelerant trail. Deliberate, not a spark."
  }, {
    tag: "THE LEDGER",
    text: "Insurance lapsed a month ago. No payout to gain."
  }, {
    tag: "THE CROWD",
    text: "One watcher gave a false name, lingered after the rest left."
  }],
  calls: [{
    q: "Fire set at the only exit means…",
    opts: [{
      t: "An accident by the stair",
      ok: false,
      hit: "No — accelerant makes it deliberate."
    }, {
      t: "Meant to kill, not just burn",
      ok: true,
      hit: "Yes — origin at the exit blocks escape. Placement is intent."
    }, {
      t: "A warning gone wrong",
      ok: false,
      hit: "No — trapping the exit is a plan, not a scare."
    }]
  }, {
    q: "No insurance, deaths intended. The motive is…",
    opts: [{
      t: "Profit",
      ok: false,
      hit: "No payout existed — profit's off the table."
    }, {
      t: "Not money — thrill or mission",
      ok: true,
      hit: "Right — rule out profit and the excitement type rises."
    }, {
      t: "Pure accident",
      ok: false,
      hit: "No — the poured trail says otherwise."
    }]
  }, {
    q: "The watcher who lingered fits because…",
    opts: [{
      t: "Everyone watches fires",
      ok: false,
      hit: "Not with a false name, staying after the crowd goes."
    }, {
      t: "Excitement-setters return to watch",
      ok: true,
      hit: "Yes — they come back to witness their own work."
    }, {
      t: "He's a firefighter",
      ok: false,
      hit: "No — the false name gives him away."
    }]
  }],
  deepdive: {
    q: "Why does firing the ONLY staircase change the whole read?",
    opts: [{
      t: "It was the easiest spot to light",
      ok: false,
      hit: "No — convenience wouldn't target the one exit. This was chosen."
    }, {
      t: "Blocking the exit means killing was the goal",
      ok: true,
      hit: "Yes — origin at the sole exit turns arson into murder. Placement is intent."
    }, {
      t: "It tells us nothing",
      ok: false,
      hit: "Origin is the first thing a fire read reveals — and here it means death."
    }]
  },
  profile: "Kills for the thrill, not money. Lingers to watch.",
  followup: {
    q: "The evicted tenant had a burning grudge. Why did you look past him?",
    opts: [{
      t: "Revenge doesn't set fires",
      ok: false,
      hit: "It can — but one grudge doesn't explain a district-wide pattern."
    }, {
      t: "Nothing tied him to the OTHER fires",
      ok: true,
      hit: "Right — the series points to a repeat setter, not a one-off avenger."
    }, {
      t: "He had an alibi",
      ok: false,
      hit: "It was the pattern, not an alibi, that cleared him."
    }]
  },
  suspects: [{
    name: "The landlord's partner",
    tell: "Would've split an insurance payout — if one existed.",
    ok: false,
    line: "The profit motive is the trap. There was no payout."
  }, {
    name: "An evicted tenant",
    tell: "Bitter, recently thrown out.",
    ok: false,
    line: "Plausible revenge, but nothing ties him to the other fires."
  }, {
    name: "The lingering watcher",
    tell: "False name, stayed to watch, linked to past fires.",
    ok: true,
    line: "Returns to watch, tied to a series — the excitement setter."
  }],
  answer: 2
}, {
  id: 4,
  title: "The Harbour Ring",
  tag: "SERIAL",
  teaches: "Geographic profiling",
  brief: "In six weeks, four dock workers are pulled from the harbour water, each throat marked by the same thin ligature. Alone, each looked like a waterfront misfortune. Laid on a map together, the recovery sites trace a rough circle around the old basin — and dead in the middle of that circle, a patch of streets where nothing ever happened.",
  clues: [{
    tag: "THE MARK",
    text: "Identical ligature on all four. One hand."
  }, {
    tag: "THE MAP",
    text: "Sites form a rough circle. The centre stays clean."
  }, {
    tag: "ON FOOT",
    text: "No cart, no horse, no boat traces. All on foot."
  }],
  calls: [{
    q: "Four identical killings means…",
    opts: [{
      t: "Four killers",
      ok: false,
      hit: "No — identical method is one hand."
    }, {
      t: "One offender (linkage)",
      ok: true,
      hit: "Yes — consistency links the series."
    }, {
      t: "Coincidence",
      ok: false,
      hit: "An identical mark four times isn't chance."
    }]
  }, {
    q: "A ring of sites with a clean centre is a…",
    opts: [{
      t: "Commuter (travels in)",
      ok: false,
      hit: "No — commuters cluster away from home."
    }, {
      t: "Marauder (base inside)",
      ok: true,
      hit: "Yes — the hollow centre is the comfort zone he won't foul."
    }, {
      t: "Random pattern",
      ok: false,
      hit: "A clean centre is the opposite of random."
    }]
  }, {
    q: "So look for him…",
    opts: [{
      t: "In a distant district",
      ok: false,
      hit: "That's a commuter. The geometry points inward."
    }, {
      t: "At the ring's hollow centre",
      ok: true,
      hit: "Yes — ~85% of marauders live inside their circle."
    }, {
      t: "Can't be narrowed",
      ok: false,
      hit: "Location is the strongest lead a series gives."
    }]
  }],
  deepdive: {
    q: "Why is the CLEAN centre of the ring the most telling part?",
    opts: [{
      t: "He ran out of victims there",
      ok: false,
      hit: "No — the empty centre is deliberate, not incidental."
    }, {
      t: "It's his comfort zone — too close to home to foul",
      ok: true,
      hit: "Yes — marauders won't offend on their own doorstep. The gap is the tell."
    }, {
      t: "It's random",
      ok: false,
      hit: "A clean centre inside a ring of bodies is the opposite of random."
    }]
  },
  profile: "Lives at the centre. Kills outward, on foot.",
  followup: {
    q: "The ferryman was strong and knew the water. What ruled him out?",
    opts: [{
      t: "He lived across the harbour — a commuter",
      ok: true,
      hit: "Right — his base sits outside the ring. Geography, not strength, decided it."
    }, {
      t: "He was too old",
      ok: false,
      hit: "Capability wasn't the issue — his home location was."
    }, {
      t: "He had no motive",
      ok: false,
      hit: "Plenty could have motive. The spatial pattern is what named the chandler."
    }]
  },
  suspects: [{
    name: "The ferryman",
    tell: "Crosses the water to sleep each night.",
    ok: false,
    line: "Sleeps outside the ring — a commuter. And no boat traces."
  }, {
    name: "The chandler",
    tell: "Shop at the harbour's dead centre. Walks everywhere.",
    ok: true,
    line: "The hollow centre is his shop. On foot to every site."
  }, {
    name: "The merchant",
    tell: "Lives two districts north. Comes by carriage.",
    ok: false,
    line: "Base outside the circle, and a carriage leaves traces."
  }],
  answer: 1
}, {
  id: 5,
  title: "The Returned Tool",
  tag: "BLUNT FORCE",
  teaches: "Overkill · Signature",
  brief: "Silas Reed, master carpenter, lies beaten to death at his own bench, struck far more times than dying required. The rage in it is unmistakable. And yet the tool that killed him — one of his own chisels — has been wiped clean and hung back precisely in its painted outline on the wall. Fury and tidiness, in the same room, by the same hand.",
  clues: [{
    tag: "THE BLOWS",
    text: "Continued long past death. Personal fury."
  }, {
    tag: "THE CHISEL",
    text: "Wiped and seated exactly in its painted outline."
  }, {
    tag: "THE SHOP",
    text: "Nothing taken. No forced entry."
  }],
  calls: [{
    q: "Force far past death signals…",
    opts: [{
      t: "A cold professional",
      ok: false,
      hit: "No — pros are efficient. Overkill is emotional."
    }, {
      t: "Rage, a personal grudge",
      ok: true,
      hit: "Yes — strangers rarely overkill. He knew the victim."
    }, {
      t: "Nothing",
      ok: false,
      hit: "Degree of violence is a real signal."
    }]
  }, {
    q: "Re-hanging the weapon neatly is…",
    opts: [{
      t: "Hiding it",
      ok: false,
      hit: "No — fleeing is faster. This is compulsion."
    }, {
      t: "A compulsion for order",
      ok: true,
      hit: "Yes — ritual restoration points to an obsessive mind."
    }, {
      t: "Random",
      ok: false,
      hit: "Exact placement is deliberate — signature."
    }]
  }, {
    q: "Rage + tidiness together means…",
    opts: [{
      t: "Two killers",
      ok: false,
      hit: "No — one person can hold both."
    }, {
      t: "Personal rage in an orderly mind",
      ok: true,
      hit: "Yes — the 'mixed' scene: he snapped, then set it right."
    }, {
      t: "It can't be read",
      ok: false,
      hit: "The contradiction is the profile."
    }]
  }],
  deepdive: {
    q: "Overkill AND a neatly re-hung weapon. How do you hold both?",
    opts: [{
      t: "Two different attackers",
      ok: false,
      hit: "No — one person can rage, then compulsively set things right."
    }, {
      t: "Rage in the act, compulsion in the aftermath — one mind",
      ok: true,
      hit: "Yes — the 'mixed' scene: he lost control, then his nature reasserted."
    }, {
      t: "The tidiness is a coincidence",
      ok: false,
      hit: "Exact replacement in an outline is no accident — it's who he is."
    }]
  },
  profile: "Knew him. Enraged. But rigidly, obsessively neat.",
  followup: {
    q: "The hot-tempered rival fit the rage perfectly. Why not him?",
    opts: [{
      t: "He works messy — he'd never re-hang the tool",
      ok: true,
      hit: "Right — he matched the fury but not the order. The signature cleared him."
    }, {
      t: "He wasn't angry enough",
      ok: false,
      hit: "He was plenty angry — that's what made him tempting. The neatness didn't fit."
    }, {
      t: "He was elsewhere",
      ok: false,
      hit: "It wasn't location — it was that his nature contradicts the tidy scene."
    }]
  },
  suspects: [{
    name: "The apprentice",
    tell: "Passed over for the inheritance. Meticulously tidy.",
    ok: true,
    line: "Personal wound, obsessive order — he snapped, then re-hung the chisel."
  }, {
    name: "The rival",
    tell: "A bitter public feud, threatened him openly, capable of this fury.",
    ok: false,
    line: "He fits the overkill so well it's tempting to stop here. But every scene he leaves is chaos — he'd never wipe the tool and hang it back in its outline. He owns the rage and not the order."
  }, {
    name: "A burglar",
    tell: "Workshops get robbed.",
    ok: false,
    line: "Nothing taken, no entry, and the rage is personal. Not a burglar."
  }],
  answer: 0
}, {
  id: 6,
  title: "The Marked Page",
  tag: "SERIAL",
  teaches: "Communicative signature",
  brief: "A librarian is found among the evening stacks, unmarked but for the calm of the body, and one book left open with a single passage underlined. It is the third such death in three cities this year — three libraries, three quiet victims, three underlined lines in the same deliberate hand. The killer isn't hiding. He's leaving something to be read.",
  clues: [{
    tag: "THE PAGE",
    text: "One passage underlined, same hand — in all three cities."
  }, {
    tag: "THE THEME",
    text: "Every passage: betrayal by a mentor."
  }, {
    tag: "THE PACE",
    text: "Intervals shrinking. The last was bold, in daylight."
  }],
  calls: [{
    q: "The same ritual across three cities is…",
    opts: [{
      t: "Coincidence",
      ok: false,
      hit: "No — an identical ritual thrice is a signature."
    }, {
      t: "One offender's signature",
      ok: true,
      hit: "Yes — it fingerprints him across places."
    }, {
      t: "Three copycats",
      ok: false,
      hit: "The same exact hand says one person."
    }]
  }, {
    q: "A chosen, underlined passage is him…",
    opts: [{
      t: "Hiding evidence",
      ok: false,
      hit: "No — underlining adds a message, not cover."
    }, {
      t: "Sending a message",
      ok: true,
      hit: "Yes — a communicative signature. Read the theme."
    }, {
      t: "Killing time",
      ok: false,
      hit: "Too consistent to be idle."
    }]
  }, {
    q: "Shrinking intervals mean he's…",
    opts: [{
      t: "Losing interest",
      ok: false,
      hit: "No — bolder and faster is rising need."
    }, {
      t: "Escalating",
      ok: true,
      hit: "Yes — escalation forecasts a faster next strike."
    }, {
      t: "Done",
      ok: false,
      hit: "The boldest was the latest — he's not done."
    }]
  }],
  deepdive: {
    q: "The underlined passages all name betrayal by a mentor. That theme is…",
    opts: [{
      t: "A coincidence of book choice",
      ok: false,
      hit: "No — three cities, one theme, one hand. That's chosen."
    }, {
      t: "The killer telling you his motive",
      ok: true,
      hit: "Yes — a communicative signature. He's writing his grievance into the scene."
    }, {
      t: "Meant to frame the authors",
      ok: false,
      hit: "No — it points inward, at his own wound, not outward at blame."
    }]
  },
  profile: "Mobile, literate, betrayed by a mentor — and speeding up.",
  followup: {
    q: "The local apprentice was bitter at his master too. Why not him?",
    opts: [{
      t: "He never left the city; the series didn't",
      ok: true,
      hit: "Right — the killings span three cities. His grievance was real but grounded."
    }, {
      t: "He wasn't literate",
      ok: false,
      hit: "Literacy wasn't the block — his lack of mobility was."
    }, {
      t: "He was too young",
      ok: false,
      hit: "Age wasn't it — he simply couldn't have made the distant kills."
    }]
  },
  suspects: [{
    name: "The local apprentice",
    tell: "Bitter at his master. Never left the city.",
    ok: false,
    line: "The series spans three cities — he never left this one."
  }, {
    name: "The travelling scholar",
    tell: "Lectured in all three cities on the right dates. Cast off by his mentors.",
    ok: true,
    line: "Mobile, literate, living the betrayed-junior theme. He wrote the message."
  }, {
    name: "The retired teacher",
    tell: "Once dismissed a student. Too frail to travel.",
    ok: false,
    line: "Can't travel the series — and he's the victim type, not the killer."
  }],
  answer: 1
}, {
  id: 7,
  title: "The Posed Penitent",
  tag: "POSED BODY",
  teaches: "Posing · Mission",
  brief: "Bartholomew Crane, a moneylender the district's pulpits loved to condemn, is found in a shuttered chapel — not where he died, but where he was carried. He lies beneath the cross, hands folded on his breast, two coins laid over his eyes. His purse is untouched. None of this was needed to kill him. All of it was needed by whoever did.",
  clues: [{
    tag: "THE POSE",
    text: "Hands folded, body straight. Arranged, not fallen."
  }, {
    tag: "THE COINS",
    text: "Two coins on the eyes. The victim was a usurer."
  }, {
    tag: "THE PURSE",
    text: "Untouched. Nothing stolen."
  }],
  calls: [{
    q: "Posing a body (vs. hiding it) means the killer…",
    opts: [{
      t: "Wants to mislead police",
      ok: false,
      hit: "That's staging. Posing conceals nothing — it declares."
    }, {
      t: "Is sending a message",
      ok: true,
      hit: "Yes — the pose is speech. Read its content."
    }, {
      t: "Was interrupted",
      ok: false,
      hit: "No — folded hands and coins are deliberate."
    }]
  }, {
    q: "Coins on a usurer's eyes, laid penitent, is…",
    opts: [{
      t: "Decoration",
      ok: false,
      hit: "No — the symbol names his 'sin' exactly."
    }, {
      t: "A judgment passed",
      ok: true,
      hit: "Yes — the killer casts himself as justice."
    }, {
      t: "A robbery clue",
      ok: false,
      hit: "No — the purse is untouched."
    }]
  }, {
    q: "A killer who judges and cleanses is driven by…",
    opts: [{
      t: "Profit",
      ok: false,
      hit: "No — he left the money and posed the body."
    }, {
      t: "A mission",
      ok: true,
      hit: "Yes — the mission type kills to punish a 'sinner.'"
    }, {
      t: "Thrill alone",
      ok: false,
      hit: "The coherent moral symbol says mission, not thrill."
    }]
  }],
  deepdive: {
    q: "Coins on a usurer's eyes, laid penitent. This posing is…",
    opts: [{
      t: "An attempt to mislead police",
      ok: false,
      hit: "That's staging. This conceals nothing — it announces."
    }, {
      t: "A message: the sin named, judgment passed",
      ok: true,
      hit: "Yes — the pose is speech. He's declaring why the man deserved it."
    }, {
      t: "Random cruelty",
      ok: false,
      hit: "No — the symbol matches the 'sin' too precisely to be random."
    }]
  },
  profile: "Believes he's justice. Punishing a 'sinner.' No interest in money.",
  followup: {
    q: "A rival lender profited from the death. Why wasn't he the fit?",
    opts: [{
      t: "The pose is ideological, not commercial",
      ok: true,
      hit: "Right — a rival kills quietly for gain. He doesn't sermonize over the body."
    }, {
      t: "He didn't know the victim",
      ok: false,
      hit: "He knew him well — but profit doesn't explain the penitent staging."
    }, {
      t: "He had an alibi",
      ok: false,
      hit: "It was the meaning of the pose, not an alibi, that pointed elsewhere."
    }]
  },
  suspects: [{
    name: "A robbed debtor",
    tell: "Owed the usurer, argued over money.",
    ok: false,
    line: "The money grudge is bait. A debtor flees — he doesn't sermonize over the body."
  }, {
    name: "A rival lender",
    tell: "Gained business by the death.",
    ok: false,
    line: "Gains from it, but the pose is ideological — a rival kills quietly."
  }, {
    name: "The lay-preacher",
    tell: "Rails against usurers from the pulpit. Believes the trade damns souls.",
    ok: true,
    line: "He carried the sinner to holy ground and posed a judgment. Murder as mission."
  }],
  answer: 2
}, {
  id: 8,
  title: "The Two Who Fit",
  tag: "THE LIMITS",
  teaches: "Bias · When profiling fails",
  brief: "A moneylender is knifed in a lightless alley and left for the rats, his purse gone. The wounds are shallow and hurried, the scene otherwise bare — no ritual, no message, nothing to read. Two men fit what little the profile offers, and both had cause to want him dead. This is the case that teaches you what profiling can't do.",
  clues: [{
    tag: "THE SCENE",
    text: "Hurried wounds, purse taken. Ordinary — nothing to profile from."
  }, {
    tag: "TWO MEN",
    text: "Both local, both able, both in debt to the victim. Both fit."
  }, {
    tag: "THE MUD",
    text: "One boot-print: narrow, size 8, weight thrown onto the outer edge."
  }],
  calls: [{
    q: "A thin scene means the profile should be…",
    opts: [{
      t: "Confident — it'll name him",
      ok: false,
      hit: "That's the myth. Profiling narrows; it doesn't identify."
    }, {
      t: "Held loosely — defer to evidence",
      ok: true,
      hit: "Yes — a broad scene supports only a weak profile."
    }, {
      t: "Thrown out",
      ok: false,
      hit: "Too far — it still narrows the pool."
    }]
  }, {
    q: "A suspect who 'looks the type' should make you…",
    opts: [{
      t: "Trust it more",
      ok: false,
      hit: "That's the bias — stereotypes convict the innocent."
    }, {
      t: "Check harder",
      ok: true,
      hit: "Yes — when someone fits too neatly, scrutinize."
    }, {
      t: "Ignore the profile",
      ok: false,
      hit: "Don't discard it — just don't let 'the type' rule."
    }]
  }, {
    q: "When the profile fits two, what decides?",
    opts: [{
      t: "Whoever fits better",
      ok: false,
      hit: "A profile that fits two can't rank them."
    }, {
      t: "Hard evidence — the boot-print",
      ok: true,
      hit: "Yes — only individuating evidence breaks the tie."
    }, {
      t: "A gut call",
      ok: false,
      hit: "Gut is where the bias lives."
    }]
  }],
  deepdive: {
    q: "You have a boot-print from the mud. How should a profiler use it?",
    opts: [{
      t: "Assume it fits the rough, likely suspect",
      ok: false,
      hit: "That's the trap — fitting evidence to your hunch instead of testing it."
    }, {
      t: "Measure it against EACH man, let it decide",
      ok: true,
      hit: "Yes — the print is individuating evidence. Match it; don't assume it."
    }, {
      t: "Ignore it — profiles matter more",
      ok: false,
      hit: "Backwards — when the profile ties, only hard evidence breaks the tie."
    }]
  },
  profile: "Fits two men. The profile can't choose — only the boot-print can.",
  followup: {
    q: "The porter looked guilty and you were tempted. What's the lesson?",
    opts: [{
      t: "Trust the profile when a suspect fits it",
      ok: false,
      hit: "No — 'fits the type' is exactly how the innocent get charged."
    }, {
      t: "'Looks the type' isn't evidence — the print is",
      ok: true,
      hit: "Right — the stereotype tempted you; the measured print cleared him."
    }, {
      t: "There's never a right answer",
      ok: false,
      hit: "There was — the evidence named the clerk. Bias nearly hid it."
    }]
  },
  suspects: [{
    name: "The porter",
    tell: "Rough, brawls, deep in debt — and a broad size-11 boot, worn even.",
    ok: false,
    line: "Everything about him fits the picture except the one thing that matters: his foot is far too big for a narrow size 8. The stereotype tempted you; the print clears him."
  }, {
    name: "The clerk",
    tell: "Mild, respectable, in debt. Walks with a slight outward roll; small feet.",
    ok: true,
    line: "Nothing about him 'looks the type' — but a narrow size 8 worn on the outer edge is his gait exactly. The evidence names him where the profile never could."
  }, {
    name: "Charge no one",
    tell: "The profile fits both — wait for more before acting.",
    ok: false,
    line: "Cautious, but you already hold the deciding evidence. The print fits one man's foot and not the other's. Read it, and act."
  }],
  answer: 1
}];
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
@keyframes mm_in{from{opacity:0;transform:translateX(var(--dx,20px)) rotate(var(--dr,2deg));}to{opacity:1;transform:none;}}
.mm-rise{animation:mm_rise .35s ease both;}
.mm-pop{animation:mm_pop .4s cubic-bezier(.2,1.5,.4,1) both;}
.mm-slam{animation:mm_slam .5s cubic-bezier(.2,1.4,.4,1) both;}
.mm-card{animation:mm_in .3s ease both;}
`;
function pill(bg, color, extra = {}) {
  return {
    background: bg,
    color,
    border: "none",
    padding: "13px 26px",
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
function rankFor(xp) {
  let r = RANKS[0];
  for (const c of RANKS) if (xp >= c.at) r = c;
  return r;
}
function nextRank(xp) {
  for (const c of RANKS) if (xp < c.at) return c;
  return null;
}
function MindMotive() {
  const audioRef = useRef(null);
  if (!audioRef.current) audioRef.current = makeAudio();
  const S = audioRef.current;
  const [sound, setSound] = useState(false);
  const beep = n => {
    if (sound && S[n]) {
      S.resume();
      S[n]();
    }
  };
  const [ci, setCi] = useState(0);
  const [phase, setPhase] = useState("brief"); // brief | clues | calls | suspects
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [badges, setBadges] = useState({});
  const [toast, setToast] = useState(null);
  const [log, setLog] = useState([]);
  const [done, setDone] = useState(false);
  const [clue, setClue] = useState(0);
  const [callI, setCallI] = useState(0);
  const [callPick, setCallPick] = useState(null);
  const [callLock, setCallLock] = useState(false);
  const [callRights, setCallRights] = useState(0);
  const [ddPick, setDdPick] = useState(null);
  const [ddLock, setDdLock] = useState(false);
  const [fuPick, setFuPick] = useState(null);
  const [fuLock, setFuLock] = useState(false);
  const [pick, setPick] = useState(null);
  const [lock, setLock] = useState(false);
  const [right, setRight] = useState(false);

  // swipe
  const dragX = useRef(0);
  const [drag, setDrag] = useState(0);
  const c = C[ci];
  const call = c.calls[callI];
  const mult = 1 + Math.min(streak, 4) * 0.25;
  function award(n, why) {
    setXp(x => {
      const before = x,
        after = Math.max(0, x + n);
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
  function resetCase(i) {
    setCi(i);
    setPhase("brief");
    setClue(0);
    setCallI(0);
    setCallPick(null);
    setCallLock(false);
    setDdPick(null);
    setDdLock(false);
    setFuPick(null);
    setFuLock(false);
    setCallRights(0);
    setPick(null);
    setLock(false);
    setDrag(0);
  }

  // clue swipe
  function nextClue(dir) {
    beep("flip");
    setClue(n => Math.max(0, Math.min(c.clues.length - 1, n + dir)));
    setDrag(0);
  }
  const onDown = e => {
    dragX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };
  const onMove = e => {
    if (dragX.current == null) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    setDrag(x - dragX.current);
  };
  const onUp = () => {
    if (drag < -50 && clue < c.clues.length - 1) nextClue(1);else if (drag > 50 && clue > 0) nextClue(-1);else setDrag(0);
    dragX.current = null;
  };
  function lockCall() {
    if (callPick == null) return;
    const ok = call.opts[callPick].ok;
    setCallLock(true);
    if (ok) {
      const g = Math.round(20 * mult);
      award(g, "read");
      setStreak(k => {
        const nk = k + 1;
        if (nk >= 4) badge("hotstreak");
        return nk;
      });
      setCallRights(r => r + 1);
      beep("right");
    } else {
      award(-8, "misread");
      setStreak(0);
      beep("wrong");
    }
  }
  function nextCall() {
    if (callI < c.calls.length - 1) {
      setCallI(callI + 1);
      setCallPick(null);
      setCallLock(false);
    } else {
      if (callRights === c.calls.length) badge("flawless");
      setPhase("deepdive");
    }
  }
  function lockDd() {
    if (ddPick == null) return;
    setDdLock(true);
    const ok = c.deepdive.opts[ddPick].ok;
    if (ok) {
      award(Math.round(15 * mult), "insight");
      setStreak(k => k + 1);
      beep("right");
    } else {
      award(-6, "misread");
      setStreak(0);
      beep("wrong");
    }
  }
  function lockFu() {
    if (fuPick == null) return;
    setFuLock(true);
    const ok = c.followup.opts[fuPick].ok;
    if (ok) {
      award(Math.round(15 * mult), "principle");
      setStreak(k => k + 1);
      beep("right");
    } else {
      award(-6, "missed the why");
      setStreak(0);
      beep("wrong");
    }
  }
  function accuse() {
    if (pick == null) return;
    const ok = pick === c.answer;
    setLock(true);
    setRight(ok);
    beep(ok ? "arrest" : "wrong");
    award(ok ? 40 : -15, ok ? "arrest holds" : "wrong arrest");
    if (ok && c.id === 8) badge("antibias");
    setLog(L => [...L, {
      id: c.id,
      title: c.title,
      ok,
      calls: callRights
    }]);
  }
  function proceed() {
    if (ci < C.length - 1) resetCase(ci + 1);else setDone(true);
  }
  function restart() {
    setXp(0);
    setStreak(0);
    setBadges({});
    setLog([]);
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
    }, r.name, streak > 1 && /*#__PURE__*/React.createElement("span", {
      style: {
        color: T.ember
      }
    }, "  ×", mult.toFixed(2))), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: mono,
        fontSize: 10.5,
        color: T.paperDim
      }
    }, xp, nr ? ` · ${nr.at - xp}→${nr.name.split(" ")[0]}` : " · MAX")), /*#__PURE__*/React.createElement("div", {
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

  // ── DONE ──
  if (done) {
    const arrests = log.filter(r => r.ok).length;
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
        fontSize: 13,
        color: T.paperDim,
        margin: "16px 0"
      }
    }, arrests, "/", log.length, " ARRESTS HELD"), Object.keys(badges).length > 0 && /*#__PURE__*/React.createElement("div", {
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
    }, "Real profiling is messier than any game. It narrows a suspect pool — it doesn't name a person. The last case is the honest one: trust the boot-print over the man who looks the part."), /*#__PURE__*/React.createElement("button", {
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
      maxWidth: 560,
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
  }, "CASE ", String(c.id).padStart(2, "0"), "/", String(C.length).padStart(2, "0"), " · ", c.tag), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "2px 0 0",
      fontSize: 21,
      letterSpacing: "-0.3px"
    }
  }, c.title)), /*#__PURE__*/React.createElement("button", {
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
  }, sound ? "♪ ON" : "♪ OFF")), /*#__PURE__*/React.createElement(XpBar, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      marginBottom: 18
    }
  }, ["brief", "clues", "calls", "deepdive", "suspects"].map((p, i) => {
    const order = {
      brief: 0,
      clues: 1,
      calls: 2,
      deepdive: 3,
      suspects: 4
    };
    const on = order[phase] >= i;
    return /*#__PURE__*/React.createElement("div", {
      key: p,
      style: {
        flex: 1,
        height: 3,
        borderRadius: 2,
        background: on ? T.amber : T.ink3
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
      fontSize: 17,
      lineHeight: 1.5,
      fontWeight: 600
    }
  }, c.brief)), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setPhase("clues");
      beep("tap");
    },
    style: {
      ...pill(T.red, T.paper),
      marginTop: 18,
      width: "100%"
    }
  }, "See the evidence ▸")), phase === "clues" && /*#__PURE__*/React.createElement("div", {
    className: "mm-rise"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: mono,
      fontSize: 11,
      letterSpacing: 1.5,
      color: T.paperDim,
      marginBottom: 10,
      textAlign: "center"
    }
  }, "CLUE ", clue + 1, " / ", c.clues.length, " · swipe or use arrows"), /*#__PURE__*/React.createElement("div", {
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
      "--dx": `${drag ? 0 : 20}px`,
      transform: `translateX(${drag}px) rotate(${drag * 0.02}deg)`,
      background: T.ink2,
      border: `1.5px solid ${T.amber}55`,
      borderRadius: 14,
      padding: "30px 24px",
      minHeight: 150,
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
      fontSize: 19,
      lineHeight: 1.45
    }
  }, c.clues[clue].text))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => nextClue(-1),
    disabled: clue === 0,
    style: {
      ...pill(clue === 0 ? T.ink2 : T.ink3, clue === 0 ? T.paperDim : T.paper),
      padding: "10px 18px"
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
    onClick: () => nextClue(1),
    style: {
      ...pill(T.ink3, T.paper),
      padding: "10px 18px"
    }
  }, "▸") : /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setPhase("calls");
      beep("tap");
    },
    style: {
      ...pill(T.red, T.paper),
      padding: "10px 18px"
    }
  }, "Profile ▸"))), phase === "calls" && /*#__PURE__*/React.createElement("div", {
    className: "mm-rise",
    key: callI
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: mono,
      fontSize: 11,
      letterSpacing: 1.5,
      color: T.paperDim,
      marginBottom: 12
    }
  }, "CALL ", callI + 1, " / ", c.calls.length), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 16px",
      fontSize: 19,
      lineHeight: 1.4,
      fontWeight: 600
    }
  }, call.q), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 10
    }
  }, call.opts.map((o, i) => {
    const isP = callPick === i;
    let bg = T.ink2,
      bd = T.manila + "3a",
      ac = T.paper;
    if (callLock) {
      if (o.ok) {
        bg = "rgba(78,122,94,0.2)";
        bd = T.green;
      } else if (isP) {
        bg = "rgba(158,43,35,0.18)";
        bd = T.red;
      } else {
        bd = T.manila + "1e";
        ac = T.paperDim;
      }
    } else if (isP) {
      bg = "rgba(184,134,59,0.14)";
      bd = T.amber;
    }
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      onClick: () => {
        if (!callLock) {
          setCallPick(i);
          beep("tap");
        }
      },
      disabled: callLock,
      style: {
        textAlign: "left",
        background: bg,
        border: `1.5px solid ${bd}`,
        color: ac,
        padding: "15px 16px",
        borderRadius: 10,
        cursor: callLock ? "default" : "pointer",
        fontFamily: "inherit",
        fontSize: 16,
        fontWeight: 600
      }
    }, o.t, callLock && (isP || o.ok) && /*#__PURE__*/React.createElement("div", {
      className: "mm-rise",
      style: {
        marginTop: 7,
        fontSize: 13,
        fontWeight: 400,
        fontStyle: "italic",
        color: o.ok ? T.green : T.redBright
      }
    }, o.hit));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18
    }
  }, !callLock ? /*#__PURE__*/React.createElement("button", {
    onClick: lockCall,
    disabled: callPick == null,
    style: {
      ...pill(callPick == null ? T.ink2 : T.red, callPick == null ? T.paperDim : T.paper),
      width: "100%"
    }
  }, "Lock it in") : /*#__PURE__*/React.createElement("button", {
    onClick: nextCall,
    style: {
      ...pill(T.red, T.paper),
      width: "100%"
    }
  }, callI < c.calls.length - 1 ? "Next ▸" : "Dig deeper ▸"))), phase === "deepdive" && /*#__PURE__*/React.createElement("div", {
    className: "mm-rise"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: mono,
      fontSize: 11,
      letterSpacing: 1.5,
      color: T.ember,
      marginBottom: 12
    }
  }, "◆ DEEPER READ"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 16px",
      fontSize: 19,
      lineHeight: 1.4,
      fontWeight: 600
    }
  }, c.deepdive.q), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 10
    }
  }, c.deepdive.opts.map((o, i) => {
    const isP = ddPick === i;
    let bg = T.ink2,
      bd = T.manila + "3a",
      ac = T.paper;
    if (ddLock) {
      if (o.ok) {
        bg = "rgba(78,122,94,0.2)";
        bd = T.green;
      } else if (isP) {
        bg = "rgba(158,43,35,0.18)";
        bd = T.red;
      } else {
        bd = T.manila + "1e";
        ac = T.paperDim;
      }
    } else if (isP) {
      bg = "rgba(184,134,59,0.14)";
      bd = T.amber;
    }
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      onClick: () => {
        if (!ddLock) {
          setDdPick(i);
          beep("tap");
        }
      },
      disabled: ddLock,
      style: {
        textAlign: "left",
        background: bg,
        border: `1.5px solid ${bd}`,
        color: ac,
        padding: "15px 16px",
        borderRadius: 10,
        cursor: ddLock ? "default" : "pointer",
        fontFamily: "inherit",
        fontSize: 16,
        fontWeight: 600
      }
    }, o.t, ddLock && (isP || o.ok) && /*#__PURE__*/React.createElement("div", {
      className: "mm-rise",
      style: {
        marginTop: 7,
        fontSize: 13,
        fontWeight: 400,
        fontStyle: "italic",
        color: o.ok ? T.green : T.redBright
      }
    }, o.hit));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18
    }
  }, !ddLock ? /*#__PURE__*/React.createElement("button", {
    onClick: lockDd,
    disabled: ddPick == null,
    style: {
      ...pill(ddPick == null ? T.ink2 : T.red, ddPick == null ? T.paperDim : T.paper),
      width: "100%"
    }
  }, "Lock it in") : /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setPhase("suspects");
      beep("tap");
    },
    style: {
      ...pill(T.red, T.paper),
      width: "100%"
    }
  }, "Name a suspect ▸"))), phase === "suspects" && /*#__PURE__*/React.createElement("div", {
    className: "mm-rise"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: T.ink3,
      borderRadius: 10,
      padding: "12px 16px",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: mono,
      fontSize: 10.5,
      letterSpacing: 1.5,
      color: T.steel
    }
  }, "PROFILE · "), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontStyle: "italic"
    }
  }, c.profile)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 10
    }
  }, c.suspects.map((s, i) => {
    const isP = pick === i,
      isA = i === c.answer;
    let bg = T.ink2,
      bd = T.manila + "3a",
      ac = T.paper;
    if (lock) {
      if (isA) {
        bg = "rgba(78,122,94,0.2)";
        bd = T.green;
      } else if (isP) {
        bg = "rgba(158,43,35,0.18)";
        bd = T.red;
      } else {
        bd = T.manila + "1e";
        ac = T.paperDim;
      }
    } else if (isP) {
      bg = "rgba(184,134,59,0.14)";
      bd = T.amber;
    }
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      onClick: () => {
        if (!lock) {
          setPick(i);
          beep("tap");
        }
      },
      disabled: lock,
      style: {
        textAlign: "left",
        background: bg,
        border: `1.5px solid ${bd}`,
        color: ac,
        padding: "15px 16px",
        borderRadius: 10,
        cursor: lock ? "default" : "pointer",
        fontFamily: "inherit"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 16.5,
        fontWeight: 700
      }
    }, s.name), lock && isA && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: T.green,
        fontFamily: mono
      }
    }, "◀ GUILTY"), lock && isP && !isA && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: T.red,
        fontFamily: mono
      }
    }, "YOUR PICK")), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "5px 0 0",
        fontSize: 13.5,
        color: T.paperDim
      }
    }, s.tell), lock && /*#__PURE__*/React.createElement("p", {
      className: "mm-rise",
      style: {
        margin: "8px 0 0",
        fontSize: 13.5,
        fontStyle: "italic",
        color: isA ? T.green : T.redBright
      }
    }, s.line));
  })), !lock && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: accuse,
    disabled: pick == null,
    style: {
      ...pill(pick == null ? T.ink2 : T.red, pick == null ? T.paperDim : T.paper),
      width: "100%"
    }
  }, "Make the arrest")), lock && /*#__PURE__*/React.createElement("div", {
    className: "mm-rise",
    style: {
      marginTop: 20,
      background: T.ink2,
      border: `1.5px solid ${T.ember}55`,
      borderRadius: 12,
      padding: "16px 18px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: mono,
      fontSize: 10.5,
      letterSpacing: 1.5,
      color: T.ember,
      marginBottom: 10
    }
  }, "◆ WHY IT WORKS"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 14px",
      fontSize: 16.5,
      lineHeight: 1.4,
      fontWeight: 600
    }
  }, c.followup.q), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 9
    }
  }, c.followup.opts.map((o, i) => {
    const isP = fuPick === i;
    let bg = T.ink3,
      bd = T.manila + "3a",
      ac = T.paper;
    if (fuLock) {
      if (o.ok) {
        bg = "rgba(78,122,94,0.2)";
        bd = T.green;
      } else if (isP) {
        bg = "rgba(158,43,35,0.18)";
        bd = T.red;
      } else {
        bd = T.manila + "1e";
        ac = T.paperDim;
      }
    } else if (isP) {
      bg = "rgba(184,134,59,0.14)";
      bd = T.amber;
    }
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      onClick: () => {
        if (!fuLock) {
          setFuPick(i);
          beep("tap");
        }
      },
      disabled: fuLock,
      style: {
        textAlign: "left",
        background: bg,
        border: `1.5px solid ${bd}`,
        color: ac,
        padding: "13px 15px",
        borderRadius: 9,
        cursor: fuLock ? "default" : "pointer",
        fontFamily: "inherit",
        fontSize: 15,
        fontWeight: 600
      }
    }, o.t, fuLock && (isP || o.ok) && /*#__PURE__*/React.createElement("div", {
      className: "mm-rise",
      style: {
        marginTop: 6,
        fontSize: 12.5,
        fontWeight: 400,
        fontStyle: "italic",
        color: o.ok ? T.green : T.redBright
      }
    }, o.hit));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, !fuLock ? /*#__PURE__*/React.createElement("button", {
    onClick: lockFu,
    disabled: fuPick == null,
    style: {
      ...pill(fuPick == null ? T.ink3 : T.ember, fuPick == null ? T.paperDim : T.ink),
      width: "100%"
    }
  }, "Lock it in") : /*#__PURE__*/React.createElement("button", {
    onClick: proceed,
    style: {
      ...pill(right ? T.green : T.red, T.paper),
      width: "100%"
    }
  }, ci < C.length - 1 ? "Next case ▸" : "Close the casebook ▸"))))));
}
window.MindMotive = MindMotive;