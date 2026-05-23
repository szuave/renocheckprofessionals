export type Category =
  | "Algemeen"
  | "Bouwers"
  | "Architecten"
  | "Vakspecialisten"
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
      "Renocheck Professionals is een regionaal partnerschap-netwerk in Vlaanderen voor architecten, vakspecialisten en bouwondernemers. We koppelen per regio één partner per rubriek, zodat bouwprojecten verlopen via mensen die elkaar al kennen.",
  },
  {
    category: "Algemeen",
    question: "In welke regio's zijn jullie actief?",
    answer:
      "Op dit moment in West-Vlaanderen, Oost-Vlaanderen, Antwerpen en Vlaams-Brabant. Per regio bouwen we een kring van architecten en vakspecialisten op die elkaar leren kennen via terugkerende partnerevents.",
  },
  {
    category: "Algemeen",
    question: "Wie zit er achter Renocheck Professionals?",
    answer:
      "Een onafhankelijk Belgisch team dat al jaren in de bouwsector werkt. We zijn geen makelaar en geen aannemer — we faciliteren enkel het netwerk en bewaken de standaard.",
  },
  {
    category: "Bouwers",
    question: "Wat kost het mij als bouwer om Renocheck te gebruiken?",
    answer:
      "Niets. Het netwerk is gratis te raadplegen voor particulieren en bouwheren. U betaalt enkel rechtstreeks aan de architect of vakman waarmee u in zee gaat — Renocheck zit nooit tussen de offertes.",
  },
  {
    category: "Bouwers",
    question: "Hoe matched mijn vraag met de juiste partners?",
    answer:
      "U vertelt ons uw regio en de scope van uw project. Wij stellen één architect en de relevante vakspecialisten voor uit uw regio die elkaar al kennen — geen lijst van twintig namen, maar een coherent team.",
  },
  {
    category: "Bouwers",
    question: "Krijg ik garanties op de kwaliteit van het werk?",
    answer:
      "Onze partners worden geselecteerd op vakkennis, regionale reputatie en hoe ze met andere partners samenwerken. We bewaken die standaard actief: een partner die uit de toon valt, blijft niet in het netwerk.",
  },
  {
    category: "Architecten",
    question: "Hoe word ik aangenomen als architect-partner?",
    answer:
      "Via een gesprek en een referentie van een bestaand netwerklid in uw regio. We selecteren één tot maximaal drie architecten per regio, dus opname is afhankelijk van beschikbare plaats én aansluiting bij onze standaard.",
  },
  {
    category: "Architecten",
    question: "Wat krijg ik concreet als architect-partner?",
    answer:
      "Een vaste kring van vakspecialisten die u kent en vertrouwt, doorverwijzingen van bouwers in uw regio, en toegang tot maandelijkse partnerevents waar u in een rustige setting met andere bureaus en uitvoerders aan tafel zit.",
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
      "Eén. Dat is bewust — het garandeert exclusiviteit voor de partner én duidelijkheid voor de bouwer. Een tweede dakwerker in dezelfde regio nemen we pas op als de eerste vertrekt of structureel overboekt is.",
  },
  {
    category: "Partnerschap",
    question: "Wat zijn de voorwaarden om partner te worden?",
    answer:
      "Een actieve onderneming in de bouwsector, BTW-plichtig, met aantoonbare referenties. Daarbovenop verwachten we dat u deelneemt aan minstens vier van de zes jaarlijkse partnerevents in uw regio.",
  },
  {
    category: "Partnerschap",
    question: "Wat kost een partnerschap?",
    answer:
      "We werken met een jaarlijkse bijdrage die de events en de regionale werking dekt. De exacte bedragen lichten we toe in een kennismakingsgesprek — geen verborgen commissies op opdrachten.",
  },
  {
    category: "Partnerschap",
    question: "Kan ik me uitschrijven?",
    answer:
      "Ja, op het einde van elk werkjaar. Lopende projecten met andere partners blijven uiteraard uw verantwoordelijkheid.",
  },
  {
    category: "Events",
    question: "Hoe vaak organiseren jullie events?",
    answer:
      "Per regio één partnerevent per twee maanden — zes per jaar. Daarnaast één of twee grotere bijeenkomsten waar alle regio's samenkomen.",
  },
  {
    category: "Events",
    question: "Wie kan deelnemen aan een event?",
    answer:
      "Partnerevents zijn voorbehouden aan leden en hun rechtstreekse uitgenodigde architecten of bouwheren. Bouwers die met een partner samenwerken zijn welkom als die hen meeneemt.",
  },
];
