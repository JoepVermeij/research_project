# Onderzoeksproject: QR-code-gebaseerde aanwezigheidsregistratie

**Vak:** 42TIW1140 Research Project (2025-26-PWTIW)  
**Begeleider:** Kris Hermans — Kris.Hermans@pxl.be

## Projectoverzicht

Dit onderzoeksproject richt zich op **aanwezigheidsregistratie via QR-codes** voor het Handshake-event van Hogeschool PXL. Het doel is een praktijkgericht onderzoek uit te voeren dat zowel theoretisch onderbouwd (literatuurstudie) als praktisch gevalideerd (proof of concept) is.

Een bestaand studentenproject bouwt momenteel een functioneel systeem met een **.NET backend** en **Vue.js frontend**, gericht op de functionele requirements. Ons onderzoek focust op de **niet-functionele requirements** voor een vervolgproject, namelijk:

| Vereiste | Beschrijving |
|---|---|
| **Fraudebestendigheid** | QR-codes mogen niet gekopieerd of gedeeld worden — de integriteit en betrouwbaarheid van aanwezigheidsdata moet gegarandeerd zijn. |
| **Robuustheid** | Het systeem moet operationeel blijven bij WiFi-uitval (enkele minuten) — dit omvat betrouwbaarheid, beschikbaarheid en performantie. |
| **Veiligheid** | Het systeem moet bestand zijn tegen hacking en persoonsgegevens adequaat beschermen. |

### Systeemcontext

- Bedrijven registreren zich voor het event
- Studenten en bedrijven hebben elk een unieke QR-code
- Bidirectioneel scannen: studenten scannen bedrijven en bedrijven scannen studenten
- Bedrijven kunnen na het scannen het CV van een student downloaden
- Statistieken worden gegenereerd (populaire bedrijven, inspanning van studenten, etc.)

## Onderzoeksaanpak

Het project volgt een gestructureerd onderzoeksproces:

1. **Context & Aanleiding** — De probleemcontext beschrijven aan de hand van de 6W-methode (Wat, Wie, Wanneer, Waarom, Waar, Hoe)
2. **Probleemomschrijving** — Een heldere centrale onderzoeksvraag en deelvragen formuleren (specifiek, afgebakend, ondubbelzinnig en niet-Googlebaar)
3. **Onderzoeksmethode** — Een concreet, pragmatisch stappenplan opstellen
4. **Literatuurstudie** — Relevante bronnen verzamelen, beoordelen (CRAAP-test) en synthetiseren
5. **Uitvoeringsfase** — Een zelfbedachte proof of concept bouwen (geen tutorial nagemaakt), experimenten documenteren en artefacten verzamelen
6. **Conclusie & Aanbevelingen** — Een gefundeerd advies formuleren op basis van de bevindingen

## Op te leveren

### Paperstructuur

| Onderdeel | Omvang |
|---|---|
| Titelpagina | — |
| Projectomschrijving | 1 pagina |
| Inhoudsopgave | 1 pagina |
| Lijst van afkortingen en termen | 1 pagina (indien van toepassing) |
| Onderzoeksvraag | 1 pagina |
| Onderzoeksmethode | 1 pagina |
| Bronbespreking | 2 pagina's |
| Conclusie, aanbevelingen, resultaten | 1 pagina |
| Verantwoording AI-gebruik | 1 pagina |
| Bibliografie | 1 pagina |

### Presentatie

- Toelichting realisatie
- Overzicht artefacten
- Live demonstratie van de POC
- Conclusie

### Individuele reflectie

Elk groepslid levert een individuele reflectie in over het doorlopen proces, aan de hand van een methode aangeleerd bij Communicatievaardigheden of een goedgekeurd alternatief.

## Planning

| Fase | Op te leveren | Activiteiten |
|---|---|---|
| **Contactmoment 1** | Draft 1 | Groepsindeling, onderzoeksvraag, onderzoeksmethode |
| **Contactmoment 2** | Draft 2 | Stand van zaken, bronbespreking, prototype (aanzet), voorlopige resultaten, feedback |
| **Contactmoment 3** | Definitieve paper + presentatie | Paper inleveren, individuele reflectie inleveren, presentatie geven |

## Beleid AI-gebruik

AI-tools mogen worden gebruikt, maar op een verantwoorde manier:

- **Wees kritisch** — Controleer elke door AI gesuggereerde bron met de CRAAP-methode om hallucinaties te elimineren (documenteer als artefact)
- **Wees transparant** — Beschrijf welke AI-tools je hebt gebruikt en voor welke taken, inclusief voorbeeldprompts en -output (documenteer als artefact)
- **Leer prompten** — Effectief gebruik van GenAI wordt beschouwd als een essentiële vaardigheid
- **Wees integer** — Neem nooit letterlijk teksten over van AI; toon aan dat je de output kunt verwerken tot een persoonlijke tekst

## Evaluatie

- Eerste examenkans: groepsopdracht met individuele beoordeling
- Tweede examenkans: individuele opdracht
- Aanwezigheid is verplicht voor alle contactmomenten (on campus)

## Proof of Concept (POC)

Voor dit onderzoek is een **Proof of Concept (POC)** ontwikkeld om de niet-functionele vereisten (Fraudebestendigheid, Robuustheid/Offline-first en Veiligheid/GDPR) in de praktijk te valideren. 
De POC is een Vue 3 (CDN-based) webapplicatie die lokaal gedraaid kan worden.

### Hoe de POC te starten:
1. Open een terminal en navigeer naar de map: `cd project/poc-app`
2. Start een lokale server: `python3 -m http.server`
3. Open je webbrowser en ga naar `http://localhost:8000`

Voor een gedetailleerde technische verantwoording over hoe de POC de literatuurstudie implementeert, zie het [EXPLANATION.md](project/poc-app/EXPLANATION.md) bestand in de poc-app map.

## Repositorystructuur

```
research_project/
├── course_material/       # Cursusdocumentatie en opdrachtbeschrijvingen
├── onderzoeksvraag/       # Uitwerking onderzoeksvraag en opties
├── project/
│   ├── poc-app/           # De Proof of Concept webapplicatie (Vue.js)
│   ├── images/            # Afbeeldingen ter ondersteuning van de POC
│   └── PXL.pdf            # Onderzoeksdocument
├── README.md              # Dit bestand
```
