import React, { useMemo, useState } from "react";
import { Copy, Globe, NotebookPen } from "lucide-react";

const CIRCUITS = {
  A: [1, 2, 3, 4, 5],
  B: [6, 7, 8, 9, 10],
};

const STATION_DATA = {
  1: {
    name: "Room 1",
    eng: {
      applicant1: {
        prompt: "You will be speaking to an evaluator about yourself.",
        say: [
          "Why do you want to study medicine at McGill?",
          "Tell me about a time you stepped outside your comfort zone.",
          "If time remains, ask a creative personal question (favorite book, quote, etc.)",
        ],
        feedback: [
          "Overall performance",
          "Reflection on journey and future in medicine",
          "Interpersonal reflection",
          "Clarity of communication",
        ],
      },
      applicant2: {
        prompt: "You will be speaking to an evaluator about yourself.",
        say: [
          "What does being a doctor mean to you?",
          "Describe a failure and what you learned",
          "If time remains, ask a creative personal question (favorite book, quote, etc.)",
        ],
        feedback: [
          "Overall performance",
          "Reflection on journey and future in medicine",
          "Interpersonal reflection",
          "Clarity of communication",
        ],
      },
    },
    fr: {
      applicant1: {
        prompt: "Vous allez discuter de vous-même avec un évaluateur.",
        say: [
          "Pourquoi souhaitez-vous faire des études de médecine à McGill ?",
          "Racontez une fois où vous êtes sorti de votre zone de confort",
          "S’il reste du temps, posez une question originale (livre, citation, etc.)",
        ],
        feedback: [
          "Performance globale",
          "Réflexion sur le parcours et l’avenir en médecine",
          "Réflexion interpersonnelle",
          "Clarté de communication",
        ],
      },
      applicant2: {
        prompt: "Vous allez discuter de vous-même avec un évaluateur.",
        say: [
          "Que signifie pour vous le métier de médecin ?",
          "Décrivez un échec et ce que vous en avez appris",
          "S’il reste du temps, posez une question originale (livre, citation, etc.)",
        ],
        feedback: [
          "Performance globale",
          "Réflexion sur le parcours et l’avenir en médecine",
          "Réflexion interpersonnelle",
          "Clarté de communication",
        ],
      },
    },
  },
  2: {
    name: "Room 2",
    eng: {
      applicant1: {
        prompt: `You have 1 minute to review the following figure (focus on the upper portion). You will then discuss it with the evaluator.\nhttps://www150.statcan.gc.ca/n1/pub/11-627-m/2024058/11-627-m2024058-eng.jpg`,
        say: [
          "Describe what the figure is depicting",
          "What are the main takeaways/messages?",
          "Strengths and limitations of the figure",
        ],
        feedback: [
          "Concise description of the figure",
          "Critical analysis",
          "Identifies strengths and limitations",
          "Explains implications",
          "Highlights interesting points",
        ],
      },
      applicant2: {
        prompt: `You have 1 minute to review the following figure (focus on the upper portion). You will then discuss it with the evaluator.\nhttps://www150.statcan.gc.ca/n1/pub/11-627-m/2026017/11-627-m2026017-eng.png`,
        say: [
          "Describe what the figure is depicting",
          "What are the main takeaways/messages?",
          "Strengths and limitations of the figure",
        ],
        feedback: [
          "Concise description of the figure",
          "Critical analysis",
          "Identifies strengths and limitations",
          "Explains implications",
          "Highlights interesting points",
        ],
      },
    },
    fr: {
      applicant1: {
        prompt: `Vous avez 1 minute pour examiner la figure suivante (concentrez-vous sur la partie supérieure). Vous en discuterez ensuite avec l’évaluateur.\nhttps://www150.statcan.gc.ca/n1/fr/pub/11-627-m/11-627-m2024058-fra.pdf?st=fSts2rHI`,
        say: [
          "Décrivez ce que représente la figure",
          "Quels sont les principaux messages ?",
          "Forces et limites de la figure",
        ],
        feedback: [
          "Description concise",
          "Analyse critique",
          "Identification des forces et limites",
          "Explication des implications",
          "Points pertinents ou intéressants",
        ],
      },
      applicant2: {
        prompt: `Vous avez 1 minute pour examiner la figure suivante (concentrez-vous sur la partie supérieure). Vous en discuterez ensuite avec l’évaluateur.\nhttps://www150.statcan.gc.ca/n1/fr/pub/11-627-m/11-627-m2026017-fra.pdf?st=8Ihc-igl`,
        say: [
          "Décrivez ce que représente la figure",
          "Quels sont les principaux messages ?",
          "Forces et limites de la figure",
        ],
        feedback: [
          "Description concise",
          "Analyse critique",
          "Identification des forces et limites",
          "Explication des implications",
          "Points pertinents ou intéressants",
        ],
      },
    },
  },
  3: {
    name: "Room 3",
    eng: {
      applicant1: {
        prompt: `You are working in a pair on a graded presentation that is due in three days. Despite plans to meet, your partner has repeatedly cancelled last-minute and been slow to respond. You’re concerned the presentation is not ready and that your grade may be affected. You’ve also noticed on social media that they have been going out with friends.\n\nYou ask to speak with them over a video call to clarify the situation. They agree to meet with you now.`,
        say: [
          "You have been cancelling meetings because your mother, who lives an hour away, was recently hospitalized and you’ve been traveling back and forth to help at home",
          "You did not want to tell classmates to avoid sympathy or special treatment",
          "Going out with friends is your way of coping and taking short mental breaks",
          "Be avoidant at first, then gradually open up",
        ],
        feedback: [
          "Establishes rapport",
          "Shows empathy and active listening (verbal and non-verbal)",
          "Communicates clearly",
          "Attempts to find a solution",
        ],
      },
      applicant2: {
        prompt: `You have been working part-time as a barista for a month. You’ve noticed the assistant manager is frequently coughing and blowing their nose, and does not wash their hands before serving customers. You learn that a food inspector will be visiting next week to verify hygiene protocols in the context of a recent influenza outbreak.\n\nYou decide to speak with the assistant manager about your concerns.`,
        say: [
          "You are the parent of a young child in daycare, which is how you got sick",
          "You have been running on very little sleep",
          "You cannot risk losing your job because you need to support your child",
          "Initially be defensive and dismissive",
        ],
        feedback: [
          "Establishes rapport",
          "Shows empathy and active listening (verbal and non-verbal)",
          "Communicates clearly",
          "Attempts to find a solution",
        ],
      },
    },
    fr: {
      applicant1: {
        prompt: `Vous travaillez en équipe de deux sur une présentation à remettre dans trois jours. Malgré vos plans, votre partenaire annule souvent à la dernière minute et répond peu à vos messages. Vous êtes inquiet que la présentation ne soit pas prête et que votre note en soit affectée. Vous avez aussi remarqué sur les réseaux sociaux que votre partenaire sortait souvent avec des amis.\n\nVous demandez à lui parler lors d’un appel vidéo afin de clarifier la situation. Il/elle accepte de vous rencontrer maintenant.`,
        say: [
          "Vous avez annulé vos rencontres parce que votre mère, qui vit à une heure de route, a récemment été hospitalisée et vous faites des allers-retours pour aider à la maison",
          "Vous ne vouliez pas en parler afin d’éviter la sympathie ou un traitement spécial",
          "Sortir avec des amis est votre façon de gérer la situation et de prendre des pauses",
          "Soyez d’abord évitant, puis ouvrez-vous progressivement",
        ],
        feedback: [
          "Établit un climat de confiance",
          "Fait preuve d’empathie et d’écoute active (verbale et non verbale)",
          "Communique clairement",
          "Tente de trouver une solution",
        ],
      },
      applicant2: {
        prompt: `Vous travaillez à temps partiel comme barista depuis un mois. Vous avez remarqué que votre gérant adjoint tousse fréquemment, se mouche le nez, et ne se lave pas les mains avant de servir les clients. Vous apprenez qu’un inspecteur sanitaire visitera le café la semaine prochaine pour vérifier les protocoles d’hygiène dans le contexte d’une récente éclosion d’influenza.\n\nVous décidez de parler au gérant adjoint de vos préoccupations.`,
        say: [
          "Vous êtes le parent d’un jeune enfant en garderie et c’est ainsi que vous êtes tombé malade",
          "Vous dormez très peu",
          "Vous ne pouvez pas vous permettre de perdre votre emploi",
          "Soyez sur la défensive et minimisez vos actions au départ",
        ],
        feedback: [
          "Établit un climat de confiance",
          "Fait preuve d’empathie et d’écoute active (verbale et non verbale)",
          "Communique clairement",
          "Tente de trouver une solution",
        ],
      },
    },
  },
  4: {
    name: "Room 4",
    eng: {
      applicant1: {
        prompt: `You are meeting to speak with a friend who is a policy advisor for the federal government.`,
        say: [
          "Hey! I wanted to call to speak to you about an issue I’ve been dealing with. Lately there’s been increasing concerns about terrorism, and the government is considering implementing a nationwide system to track citizens’ movements using digital data (such as mobile phones or ID cards) to improve public safety.",
          "I’m just conflicted on what to do because they expect me to implement this policy in the upcoming weeks. Do you think this is justified and, if so, how should it be implemented?",
          "NOTE: Let the candidate speak, limit cues after prompt (not a conversational station)",
        ],
        feedback: [
          "Establishes rapport",
          "Shows understanding and active listening (verbal and non-verbal)",
          "Identifies ethical dilemma clearly",
          "Assesses pros and cons",
          "Proposes alternative solutions",
        ],
      },
      applicant2: {
        prompt: `You are meeting to speak with a friend who is a policy advisor for the federal government.`,
        say: [
          "I’ve started creating a painting inspired by a sacred cultural tradition from a small village in (pick a country) after visiting this summer. The symbolism is beautiful and I think my work can introduce people to this culture.",
          "I’m worried some members of this culture may view it as inappropriate since I’m an outsider and plan to sell the painting.",
          "Do you think it’s okay to proceed?",
          "NOTE: Let the candidate speak, limit cues after prompt (not a conversational station)",
        ],
        feedback: [
          "Establishes rapport",
          "Shows understanding and active listening (verbal and non-verbal)",
          "Identifies ethical dilemma clearly",
          "Assesses pros and cons",
          "Proposes alternative solutions",
        ],
      },
    },
    fr: {
      applicant1: {
        prompt: `Vous rencontrez un ami qui est conseiller politique pour le gouvernement fédéral.`,
        say: [
          "Salut ! Je voulais te parler d’un problème. Les inquiétudes liées au terrorisme augmentent, et le gouvernement envisage un système national pour suivre les déplacements via des données numériques.",
          "On attend de moi que je mette en œuvre cette politique bientôt. Penses-tu que c’est justifié et comment faudrait-il l’implémenter ?",
          "NOTE : Laissez le candidat s’exprimer, limitez les interventions",
        ],
        feedback: [
          "Établit un climat de confiance",
          "Fait preuve de compréhension et d’écoute active",
          "Identifie le dilemme éthique",
          "Évalue avantages et inconvénients",
          "Propose des solutions alternatives",
        ],
      },
      applicant2: {
        prompt: `Vous rencontrez un ami qui est conseiller politique pour le gouvernement fédéral.`,
        say: [
          "J’ai commencé une peinture inspirée d’une tradition culturelle sacrée d’un petit village (choisis un pays).",
          "Je crains que cela soit inapproprié puisque je suis extérieure à cette culture et souhaite vendre l’œuvre.",
          "Penses-tu que je peux continuer ?",
          "NOTE : Laissez le candidat s’exprimer, limitez les interventions",
        ],
        feedback: [
          "Établit un climat de confiance",
          "Fait preuve de compréhension et d’écoute active",
          "Identifie le dilemme éthique",
          "Évalue avantages et inconvénients",
          "Propose des solutions alternatives",
        ],
      },
    },
  },
  5: {
    name: "Room 5",
    eng: {
      applicant1: {
        prompt: `You have 1 minute to read the following question. You will then explain your approach and solution to the interviewer.\nHow many liters of soft drinks were consumed in Canada in 2025?`,
        say: [
          "Ask applicant to walk you through their method",
          "What are some limitations of your calculation?",
          "Why/how they made certain assumptions",
          "How else could you have approached this question?",
        ],
        feedback: [
          "Explains approach in a methodical way",
          "Applies their knowledge from previous experiences",
          "Clarity and conciseness",
          "Explains limitations of calculation",
          "NO SPECIFIC NUMBER, AS LONG AS THE LOGIC MAKES SENSE",
        ],
      },
      applicant2: {
        prompt: `You have 1 minute to read the following question. You will then explain your approach and solution to the interviewer.\nHow many seconds does a student spend on campus during the entirety of their CEGEP studies?`,
        say: [
          "Ask applicant to walk you through their method",
          "What are some limitations of your calculation?",
          "Why/how they made certain assumptions",
          "How else could you have approached this question?",
        ],
        feedback: [
          "Explains approach in a methodical way",
          "Applies their knowledge from previous experiences",
          "Clarity and conciseness",
          "Explains limitations of calculation",
          "NO SPECIFIC NUMBER, AS LONG AS THE LOGIC MAKES SENSE",
        ],
      },
    },
    fr: {
      applicant1: {
        prompt: `Vous avez 1 minute pour lire la question suivante. Vous présenterez ensuite votre démarche et votre solution à l’évaluateur.\nCombien de litres de boissons gazeuses ont été consommés au Canada en 2025?`,
        say: [
          "Demandez au candidat d’expliquer sa démarche",
          "Quelles sont les limites/faiblesses de votre calcul ?",
          "Pourquoi/comment ils ont choisi certaines valeurs",
          "Auriez-vous pu résoudre cette question autrement ?",
          "NOTE : Laissez le candidat s’exprimer et limitez les interventions après avoir lu la consigne (ce n’est pas une station conversationnelle).",
        ],
        feedback: [
          "Explique de manière méthodique comment il/elle arrive à la solution",
          "Applique ses connaissances issues d’expériences antérieures",
          "Clarté et concision",
          "Explique les limites de son raisonnement",
          "AUCUN CHIFFRE PRÉCIS N’EST ATTENDU, TANT QUE LA LOGIQUE EST COHÉRENTE",
        ],
      },
      applicant2: {
        prompt: `Vous avez 1 minute pour lire la question suivante. Vous présenterez ensuite votre démarche et votre solution à l’évaluateur.\nCombien de secondes un étudiant passe-t-il sur le campus pendant toute la durée de ses études au Cégep ?`,
        say: [
          "Demandez au candidat d’expliquer sa démarche",
          "Quelles sont les limites/faiblesses de votre calcul ?",
          "Pourquoi/comment ils ont choisi certaines valeurs",
          "Auriez-vous pu résoudre cette question autrement ?",
          "NOTE : Laissez le candidat s’exprimer et limitez les interventions après avoir lu la consigne (ce n’est pas une station conversationnelle).",
        ],
        feedback: [
          "Explique de manière méthodique comment il/elle arrive à la solution",
          "Applique ses connaissances issues d’expériences antérieures",
          "Clarté et concision",
          "Explique les limites de son raisonnement",
          "AUCUN CHIFFRE PRÉCIS N’EST ATTENDU, TANT QUE LA LOGIQUE EST COHÉRENTE",
        ],
      },
    },
  },
  6: { name: "Room 6", eng: { applicant1: { prompt: "", say: [""], feedback: [""] }, applicant2: { prompt: "", say: [""], feedback: [""] } }, fr: { applicant1: { prompt: "", say: [""], feedback: [""] }, applicant2: { prompt: "", say: [""], feedback: [""] } } },
  7: { name: "Room 7", eng: { applicant1: { prompt: "", say: [""], feedback: [""] }, applicant2: { prompt: "", say: [""], feedback: [""] } }, fr: { applicant1: { prompt: "", say: [""], feedback: [""] }, applicant2: { prompt: "", say: [""], feedback: [""] } } },
  8: { name: "Room 8", eng: { applicant1: { prompt: "", say: [""], feedback: [""] }, applicant2: { prompt: "", say: [""], feedback: [""] } }, fr: { applicant1: { prompt: "", say: [""], feedback: [""] }, applicant2: { prompt: "", say: [""], feedback: [""] } } },
  9: { name: "Room 9", eng: { applicant1: { prompt: "", say: [""], feedback: [""] }, applicant2: { prompt: "", say: [""], feedback: [""] } }, fr: { applicant1: { prompt: "", say: [""], feedback: [""] }, applicant2: { prompt: "", say: [""], feedback: [""] } } },
  10: { name: "Room 10", eng: { applicant1: { prompt: "", say: [""], feedback: [""] }, applicant2: { prompt: "", say: [""], feedback: [""] } }, fr: { applicant1: { prompt: "", say: [""], feedback: [""] }, applicant2: { prompt: "", say: [""], feedback: [""] } } },
};

function getPromptLabel(room) {
  const labels = {
    1: "A + B",
    6: "A + B",
    2: "C + D",
    7: "C + D",
    3: "E + F",
    8: "E + F",
    4: "G + H",
    9: "G + H",
    5: "I + J",
    10: "I + J",
  };
  return labels[room];
}

function getCircuit(room) {
  return room <= 5 ? "A" : "B";
}

function getRotation(room) {
  const circuit = CIRCUITS[getCircuit(room)];
  const idx = circuit.indexOf(room);
  return [...circuit.slice(idx), ...circuit.slice(0, idx)];
}

function getSayLabel(room) {
  const label = getPromptLabel(room);
  if (label === "A + B" || label === "C + D" || label === "I + J") return "What to ask";
  if (label === "E + F") return "Backstory / pointers for actor";
  if (label === "G + H") return "What to say";
  return "Notes";
}

function copyText(text) {
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text);
  }
}

function PromptBlock({ text }) {
  return (
    <div className="prompt-text">
      {text.split("\n").map((line, i) =>
        line.startsWith("http") ? (
          <a key={i} href={line} target="_blank" rel="noreferrer">
            {line}
          </a>
        ) : (
          <p key={i}>{line || "\u00A0"}</p>
        )
      )}
    </div>
  );
}

function SectionList({ title, items }) {
  return (
    <div className="subcard">
      <h3>{title}</h3>
      <ul>
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  const [language, setLanguage] = useState("eng");
  const [startingRoom, setStartingRoom] = useState("1");
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedApplicant, setSelectedApplicant] = useState("applicant1");
  const [notes, setNotes] = useState({});

  const roomNumber = Number(startingRoom);
  const rotation = useMemo(() => getRotation(roomNumber), [roomNumber]);
  const currentRoom = rotation[currentStep];
  const promptSetRoom = roomNumber;
  const currentStation = STATION_DATA[promptSetRoom][language];
  const data = currentStation[selectedApplicant];
  const noteKey = `${currentRoom}-${selectedApplicant}`;

  const nextRoom = () => {
    setCurrentStep((prev) => Math.min(prev + 1, rotation.length - 1));
    setSelectedApplicant("applicant1");
  };

  return (
    <div className="page">
      <div className="container">
        <header className="header">
          <div>
            <h1>Mock MMI Volunteer Helper</h1>
            <p>Pick your starting room. Your prompts stay the same throughout the circuit.</p>
          </div>

          <div className="controls-grid">
            <div>
              <label htmlFor="starting-room">Starting room</label>
              <select
                id="starting-room"
                value={startingRoom}
                onChange={(e) => {
                  setStartingRoom(e.target.value);
                  setCurrentStep(0);
                  setSelectedApplicant("applicant1");
                }}
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((room) => (
                  <option key={room} value={room}>
                    Room {room}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Language</label>
              <div className="segmented">
                <button
                  className={language === "eng" ? "active" : ""}
                  onClick={() => setLanguage("eng")}
                >
                  ENG
                </button>
                <button
                  className={language === "fr" ? "active" : ""}
                  onClick={() => setLanguage("fr")}
                >
                  FR
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="layout">
          <section className="card sidebar-card">
            <h2>Your rotation</h2>

            <div className="pill-card">
              <div className="muted">Prompts</div>
              <div className="big">{getPromptLabel(roomNumber)}</div>
            </div>

            <div>
              <div className="section-label">Room sequence</div>
              <div className="room-buttons">
                {rotation.map((room, idx) => (
                  <button
                    key={room}
                    className={idx === currentStep ? "room-btn active" : "room-btn"}
                    onClick={() => {
                      setCurrentStep(idx);
                      setSelectedApplicant("applicant1");
                    }}
                  >
                    {room}
                  </button>
                ))}
              </div>
            </div>

            <button className="primary-btn" onClick={nextRoom} disabled={currentStep === rotation.length - 1}>
              Next room
            </button>
          </section>

          <section className="main-column">
            <div className="card">
              <div className="card-head spread">
                <h2>{STATION_DATA[currentRoom].name}</h2>
                <div className="badge">
                  <Globe size={16} /> {language === "eng" ? "English" : "Français"}
                </div>
              </div>

              <div className="segmented applicant-tabs">
                <button
                  className={selectedApplicant === "applicant1" ? "active" : ""}
                  onClick={() => setSelectedApplicant("applicant1")}
                >
                  Applicant 1
                </button>
                <button
                  className={selectedApplicant === "applicant2" ? "active" : ""}
                  onClick={() => setSelectedApplicant("applicant2")}
                >
                  Applicant 2
                </button>
              </div>

              <div className="prompt-card">
                <div className="spread block-head">
                  <h3>Prompt</h3>
                  <button className="ghost-btn" onClick={() => copyText(data.prompt)}>
                    <Copy size={16} /> Copy
                  </button>
                </div>

                <PromptBlock text={data.prompt} />

                <div className="two-col">
                  <SectionList title={getSayLabel(roomNumber)} items={data.say} />
                  <SectionList title="Evaluation criteria" items={data.feedback} />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-head">
                <h2 className="notes-title">
                  <NotebookPen size={18} /> Notes
                </h2>
              </div>
              <textarea
                className="notes-box"
                value={notes[noteKey] || ""}
                onChange={(e) => setNotes((prev) => ({ ...prev, [noteKey]: e.target.value }))}
                placeholder={language === "eng" ? "Write notes for this applicant..." : "Écrivez vos notes pour ce candidat..."}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
