import { IBM_Plex_Sans, IBM_Plex_Serif, Literata, Source_Sans_3, Space_Grotesk } from "next/font/google";
import FontPairingPlayground from "@/components/FontPairingPlayground/FontPairingPlayground";

const spaceGrotesk = Space_Grotesk({ weight: ["400", "500", "600", "700"], subsets: ["latin"], display: "swap" });
const ibmPlexSans = IBM_Plex_Sans({ weight: ["400", "500", "600", "700"], subsets: ["latin"], display: "swap" });
const ibmPlexSerif = IBM_Plex_Serif({ weight: ["400", "500", "600", "700"], subsets: ["latin"], display: "swap" });
const literata = Literata({ weight: ["400", "500", "600", "700"], subsets: ["latin"], display: "swap" });
const sourceSans = Source_Sans_3({ weight: ["400", "500", "600", "700"], subsets: ["latin"], display: "swap" });

const pairings = [
  { id: "systems", name: "Systems voice", headingName: "Space Grotesk", bodyName: "IBM Plex Sans", headingClass: spaceGrotesk.className, bodyClass: ibmPlexSans.className, note: "Crisp, engineered headings with an open, steady reading face." },
  { id: "bridge", name: "Translator’s bridge", headingName: "IBM Plex Serif", bodyName: "IBM Plex Sans", headingClass: ibmPlexSerif.className, bodyClass: ibmPlexSans.className, note: "One family across two voices: editorial warmth above, precise utility below." },
  { id: "longform", name: "Longform clarity", headingName: "Literata", bodyName: "Source Sans 3", headingClass: literata.className, bodyClass: sourceSans.className, note: "A bookish headline with a calm, highly legible sans for everything around it." }
];

export default function FontPlaygroundPage() {
  return <FontPairingPlayground pairings={pairings} />;
}