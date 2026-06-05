export type Category =
  | "Algemeen"
  | "Architecten"
  | "Vakspecialisten"
  | "Bouwondernemers"
  | "Partnerschap"
  | "Events";

export type FAQItem = {
  category: Category;
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FAQItem[] = [
  {
    category: "Algemeen",
    question: "Wat is Renocheck Professionals?",
    answer:
      "Renocheck Professionals is een gesloten partnerschap-netwerk in Vlaanderen voor architectenbureaus, vakspecialisten en bouwondernemers. Per regio nemen we één partner per rubriek op — een vaste kring die elkaar leert kennen via terugkerende partnerevents en samen werven coördineert.",
  },
  {
    category: "Algemeen",
    question: "In welke regio's zijn jullie actief?",
    answer:
      "West-Vlaanderen, Oost-Vlaanderen, Antwerpen en Vlaams-Brabant. Per regio bouwen we één kring op met een architectenbureau, veertien vakspecialisten (één per rubriek) en bouwondernemers die in elkaars werforganisatie passen.",
  },
  {
    category: "Algemeen",
    question: "Wie zit er achter Renocheck Professionals?",
    answer:
      "Een onafhankelijk Belgisch team dat al jaren in de bouwsector werkt. We zijn geen makelaar en geen lead-veiling — we faciliteren enkel het netwerk, bewaken de selectiestandaard en organiseren de regionale partnerevents.",
  },
  {
    category: "Algemeen",
    question: "Hoe verschilt Renocheck van andere bouwplatformen?",
    answer:
      "De meeste platformen verkopen leads aan iedereen die betaalt. Wij werken omgekeerd: één partner per rubriek per regio, exclusief. Geen vier concurrenten op dezelfde offerte, geen lead-veiling. Wat via het netwerk binnenkomt, gaat naar één partner.",
  },
  {
    category: "Architecten",
    question: "Hoe word ik aangenomen als architect-partner?",
    answer:
      "Via een kennismakingsgesprek en een referentie van een bestaand netwerklid in uw regio. We selecteren één tot maximaal drie architectenbureaus per regio, dus opname is afhankelijk van beschikbare plaats én aansluiting bij onze standaard rond stijl, proces en samenwerking met uitvoerders.",
  },
  {
    category: "Architecten",
    question: "Wat krijg ik concreet als architect-partner?",
    answer:
      "Een vaste kring vakspecialisten en bouwondernemers die uw projecten kennen, doorverwijzingen vanuit het netwerk, en zes regionale partnerevents per jaar waar u in een rustige setting met andere bureaus en uitvoerders aan tafel zit. Geen offerte-veiling, wel vaste partners.",
  },
  {
    category: "Architecten",
    question: "Moet ik exclusief met het netwerk samenwerken?",
    answer:
      "Nee. U houdt uw bestaande netwerk en klantenportefeuille volledig zelf. Renocheck Professionals is een aanvullend kanaal: voor opdrachten waarbij u toch al een sanitair-, dakwerken- of elektriciteitspartner moet zoeken, hebt u via het netwerk een vaste keuze die uw werforganisatie kent.",
  },
  {
    category: "Vakspecialisten",
    question: "Welke rubrieken erkennen jullie?",
    answer:
      "Veertien rubrieken: dakwerken, ramen & deuren, elektriciteit, sanitair, verwarming & airco, tegels & natuursteen, schrijnwerk, schilderwerken, vloeren, isolatie, tuinaanleg, zonnepanelen, zwembaden en keukens.",
  },
  {
    category: "Vakspecialisten",
    question: "Hoeveel partners per rubriek per regio?",
    answer:
      "Eén. Dat is bewust — het garandeert exclusiviteit voor de partner en voorkomt interne concurrentie. Een tweede dakwerker in dezelfde regio nemen we pas op als de eerste vertrekt of structureel overboekt is.",
  },
  {
    category: "Vakspecialisten",
    question: "Kan ik in meerdere regio's actief zijn?",
    answer:
      "Ja. Een vakspecialist die over regiogrenzen heen werkt — bijvoorbeeld actief in zowel West- als Oost-Vlaanderen — kan in elke regio waar nog plek vrij is opgenomen worden. Dat regelt u één keer bij aansluiting.",
  },
  {
    category: "Vakspecialisten",
    question: "Wat als mijn rubriek vol is in mijn regio?",
    answer:
      "Dan plaatsen we u op een wachtlijst voor uw rubriek. Bij vertrek of structurele overboeking van de huidige partner is de wachtlijst onze eerste belrij. Aanmelden mag dus zelfs als een plek bezet lijkt.",
  },
  {
    category: "Bouwondernemers",
    question: "Wat als algemeen aannemer bij Renocheck Professionals?",
    answer:
      "Als bouwondernemer trekt u volledige werven — sleutel-op-de-deur of casco. Binnen het netwerk hebt u toegang tot een vaste kring vakspecialisten in de regio waarvan u de werforganisatie kent. Doorverwijzingen vanuit architecten van het netwerk gaan eerst naar u.",
  },
  {
    category: "Bouwondernemers",
    question: "Concurreer ik met de vakspecialisten in mijn regio?",
    answer:
      "Nee, integendeel. U coördineert volledige projecten, vakspecialisten leveren hun specifieke vak. Het is een keten, geen concurrentieveld. Bij projecten die via het netwerk binnenkomen krijgt u één vaste set onderaannemers — geen vier offertes per rubriek.",
  },
  {
    category: "Partnerschap",
    question: "Wat zijn de voorwaarden om partner te worden?",
    answer:
      "Een actieve onderneming in de bouwsector, BTW-plichtig, met aantoonbare referenties (minstens drie afgewerkte projecten in de eigen provincie). Daarbovenop verwachten we deelname aan minstens vier van de zes jaarlijkse partnerevents in uw regio.",
  },
  {
    category: "Partnerschap",
    question: "Wat kost een partnerschap?",
    answer:
      "We werken met een jaarlijkse bijdrage die de regionale werking en events dekt. De exacte bedragen lichten we toe in het kennismakingsgesprek — geen verborgen commissies op opdrachten, geen pay-per-lead.",
  },
  {
    category: "Partnerschap",
    question: "Kan ik me uitschrijven?",
    answer:
      "Ja, op het einde van elk werkjaar. Lopende projecten met andere netwerkleden blijven uiteraard uw verantwoordelijkheid.",
  },
  {
    category: "Partnerschap",
    question: "Hoe wordt nieuwe partners gevalideerd?",
    answer:
      "Drie stappen: (1) kennismakingsgesprek met het Renocheck-team, (2) referentie-check via één bestaand netwerklid in uw regio, (3) eerste partnerevent waar u de andere partners ontmoet. Pas na die drie stappen wordt u toegevoegd aan de doorverwijslijst.",
  },
  {
    category: "Events",
    question: "Hoe vaak organiseren jullie partnerevents?",
    answer:
      "Per regio één partnerevent per twee maanden — zes per jaar. Daarnaast één tot twee grotere bijeenkomsten waar alle regio's samenkomen. Inschrijven gebeurt via het partnerportaal.",
  },
  {
    category: "Events",
    question: "Zijn de partnerevents verplicht?",
    answer:
      "We verwachten deelname aan minstens vier van de zes regionale events per jaar. Wie structureel afwezig is, mist de doorverwijzingen die op events ontstaan — en op termijn de aansluiting bij de kring.",
  },
  {
    category: "Events",
    question: "Wie kan deelnemen aan een event?",
    answer:
      "Enkel netwerkleden van die regio plus uitgenodigden — bijvoorbeeld een architectuurbureau dat overweegt aan te sluiten, of een specifieke partner uit een andere regio. Geen externe genodigden zonder voorafgaande afstemming.",
  },
];
