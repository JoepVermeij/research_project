# Onderzoeksvraag — Opties & Redenering

## Context

Hogeschool PXL organiseert het **Handshake-event**: een netwerkevenement waar studenten en bedrijven elkaar ontmoeten. Het systeem werkt als volgt:

- **Bedrijven** registreren zich voor het event
- **Studenten** en **bedrijven** hebben elk een unieke QR-code
- **Bidirectioneel scannen**: studenten scannen bedrijven (interesse tonen) en bedrijven scannen studenten (CV downloaden)
- **Matchmaking**: op basis van de scans wordt een koppeling gemaakt
- **Statistieken**: populaire bedrijven, inspanning van studenten, etc.

Er loopt momenteel een studentenproject dat dit systeem bouwt (.NET backend, Vue.js frontend) met focus op de **functionele requirements**. Ons onderzoek richt zich op de **niet-functionele requirements** voor een vervolgproject:

| NFR | Beschrijving |
|---|---|
| **Fraudebestendigheid** | QR-codes mogen niet gekopieerd of doorgestuurd worden — een scan moet een echte, fysieke aanwezigheid garanderen |
| **Robuustheid** | Het systeem mag niet falen bij WiFi-uitval (enkele minuten) op een druk event met honderden deelnemers |
| **Veiligheid** | Persoonsgegevens (CV's, contactinfo) moeten beschermd zijn tegen ongeautoriseerde toegang en het systeem moet bestand zijn tegen hacking |

### Vereisten onderzoeksvraag (uit de opdracht)

- **Helder** — duidelijk geformuleerd
- **Afgebakend** — niet te breed, niet te smal
- **Ondubbelzinnig** — maar één interpretatie mogelijk
- **Niet-Googlebaar** — het antwoord is niet met een simpele zoekopdracht te vinden

---

## Optie 1: Adviesgericht (hoe ontwerp je het systeem?)

> **"Hoe kan het QR-code-gebaseerde registratiesysteem voor het Handshake-event van Hogeschool PXL worden ontworpen zodat het fraudebestendig, robuust bij netwerkuitval en veilig is voor het verwerken van persoonsgegevens?"**

### Deelvragen
1. Welke fraudescenario's zijn realistisch wanneer studenten en bedrijven elkaars QR-codes scannen op een fysiek event, en welke technieken (dynamische codes, tijdslimieten, device-binding) kunnen deze voorkomen?
2. Hoe kan het systeem scanacties lokaal bufferen en synchroniseren zodat het betrouwbaar blijft bij WiFi-uitval tijdens een drukbezocht event?
3. Welke beveiligingsmaatregelen zijn nodig om de persoonsgegevens (CV's, contactinformatie) die via QR-scans worden gedeeld te beschermen tegen ongeautoriseerde toegang?
4. Hoe presteren deze maatregelen in een proof of concept dat de Handshake-context simuleert?

### Redenering
- **Sterktes:** Sluit 1-op-1 aan bij de drie pijlers uit de opdracht. De vraag is concreet door de verwijzing naar het specifieke event en systeem. Levert direct een bruikbaar advies op voor het vervolgproject.
- **Zwaktes:** Drie NFR's in één paper vereist strakke afbakening per deelvraag om niet te oppervlakkig te worden.
- **POC-richting:** Eén geïntegreerde demo-app die dynamische QR-codes genereert, offline scanning simuleert en basisbeveiliging toepast.

---

## Optie 2: Evaluatiegericht (wat zijn de risico's en oplossingen?)

> **"Welke niet-functionele risico's bestaan er bij het bidirectioneel scannen van QR-codes op het Handshake-event van Hogeschool PXL, en hoe kunnen deze worden gemitigeerd in een veilig, robuust en fraudebestendig systeem?"**

### Deelvragen
1. Welke niet-functionele risico's (fraude, uitval, datalekken) zijn het meest waarschijnlijk bij een QR-code-registratiesysteem op een grootschalig fysiek event?
2. Welke mitigatiemaatregelen worden in de literatuur aanbevolen voor elk van deze risico's?
3. Hoe kunnen deze maatregelen worden gecombineerd in een samenhangende architectuur voor het Handshake-systeem?
4. Hoe effectief zijn deze maatregelen wanneer ze worden getest in een proof of concept?

### Redenering
- **Sterktes:** Start vanuit een risicoanalyse, wat methodologisch sterk is. Je identificeert eerst de problemen en zoekt dan oplossingen — dat leest overtuigend in een paper. Past goed bij de "gefundeerd advies"-opdracht.
- **Zwaktes:** De term "risico's" kan vaag overkomen als je niet concreet genoeg bent in je deelvragen.
- **POC-richting:** Risicoanalyse-matrix + demo die de top-3 risico's adresseert met concrete technische oplossingen.

---

## Optie 3: Vergelijkend (welke aanpak werkt het beste?)

> **"Welke combinatie van technieken biedt de beste balans tussen fraudebestendigheid, robuustheid en veiligheid voor het QR-code-registratiesysteem van het Handshake-event aan Hogeschool PXL?"**

### Deelvragen
1. Welke bestaande technieken en patronen worden in de literatuur beschreven voor het beveiligen, robuust maken en fraudebestendig maken van QR-code-systemen?
2. Welke evaluatiecriteria (fraudepreventie, offline-betrouwbaarheid, databeveiliging, gebruiksvriendelijkheid, implementatiecomplexiteit) zijn relevant voor de Handshake-context?
3. Hoe scoren minstens twee alternatieve technische aanpakken op deze criteria in een vergelijkende proof of concept?
4. Welke aanpak is het meest geschikt als advies voor het vervolgproject?

### Redenering
- **Sterktes:** Vergelijkend onderzoek levert een heel duidelijk eindresultaat: "Aanpak A is beter dan B omdat...". Maakt het makkelijk om tot een concreet advies te komen. De evaluatiecriteria geven structuur aan zowel de paper als de POC.
- **Zwaktes:** Je moet meerdere varianten bouwen/testen, wat tijdsintensief kan zijn. Risico dat de vergelijking oppervlakkig wordt.
- **POC-richting:** Twee varianten bouwen (bijv. statische vs. dynamische QR-codes, of online-only vs. offline-first) en die testen op dezelfde criteria.

---

## Vergelijking

| Criterium | Optie 1 (Advies) | Optie 2 (Risico's) | Optie 3 (Vergelijkend) |
|---|---|---|---|
| Aansluiting bij opdracht | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| Helderheid & afbakening | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| Haalbaarheid (tijd) | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| Sterkte van eindadvies | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| POC-duidelijkheid | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |

Alle drie de opties zijn overkoepelend en dekken het volledige Handshake-systeem. Het verschil zit in de **invalshoek**:

- **Optie 1** is het meest recht-toe-recht-aan: "hoe bouwen we dit goed?"
- **Optie 2** begint vanuit de problemen: "wat kan er misgaan en hoe lossen we dat op?"
- **Optie 3** vergelijkt alternatieven: "welke aanpak is de beste?"

> **Bespreek de keuze met je groep en stem af met je begeleider voordat je finaliseert.**
