# VI. Bronbespreking

In dit hoofdstuk worden de behandelde literatuur en theorieën samengevat, gegroepeerd binnen drie hoofdthema's: QR-code, GDPR & Veiligheid en Offline-first. Per thema bespreken we de inhoud, de onderlinge overeenkomsten en verschillen, de toepasbaarheid voor het onderzoek en welke aspecten er nog ontbreken.

## 1. QR-code
**Uitleg studies:** 
Verschillende studies dragen oplossingen aan voor frauderesistente QR-systemen. Zo is er onderzoek [1] naar het gebruik van *digital watermarking*, waarbij kopieën of foto's van een QR-code direct ongeldig worden omdat het watermerk niet behouden blijft. Een andere benadering [2] is gericht op aanwezigheidsregistratie, waarbij dynamische QR-codes (die elke 20 seconden verversen) worden gecombineerd met geofencing en apparaat-verificatie (IMEI) om zogeheten *proxy-attendance* onmogelijk te maken.

**Overeenkomsten & verschillen:** 
Beide benaderingen [1, 2] bestrijden QR-fraude, maar de technische insteek verschilt sterk. De ene methode [1] plaatst de beveiliging in de code zélf (het watermerk), terwijl de andere [2] focust op de context rondom de scan (tijd, locatie en het apparaat). 

**Toepasbaarheid:** 
De watermerk-methode [1] is breed inzetbaar voor document- of productauthenticatie, zelfs offline. De dynamische QR-code met locatie- en apparaatcontrole [2] is daarentegen specifiek toegespitst op aanwezigheidsregistratie op een vaste locatie, wat perfect aansluit bij beurzen, events of onderwijs.

**Wat ontbreekt er:** 
Bij de watermerk-techniek [1] is niet altijd duidelijk hoe het systeem presteert bij massaal gebruik of onder sterk wisselende scancondities. Bij de contextuele aanpak [2] ontbreekt een grondige evaluatie van de privacy-impact; het continu monitoren van apparaat-ID's en gps-locaties is zeer privacygevoelig en daardoor lastig schaalbaar.

**Implementatie in de POC:** 
Om deze theorie te toetsen, genereert de Vue.js-frontend [9] een dynamische QR-code voor de student die elke 15 seconden ververst. Bij het scannen valideert de .NET-backend de code en blokkeert direct dubbele of verlopen scans, wat fraude (zoals *proxy-attendance*) effectief voorkomt.

## 2. GDPR & Veiligheid
**Uitleg theorie:** 
De literatuur rondom privacy [3] benadrukt de strenge AVG-eisen op evenementen. Organisatoren moeten expliciete en geïnformeerde toestemming (*consent*) verkrijgen vóórdat bezoekersdata via QR-codes gedeeld mag worden, met een sterke focus op dataminimalisatie (vooral bij cv's). Aanvullend waarschuwen cybersecurity-standaarden [4] voor de gevaren van onbeveiligde lokale opslag. Zij eisen dat opgeslagen persoonlijke data altijd lokaal versleuteld wordt om datalekken te voorkomen.

**Overeenkomsten & verschillen:** 
De twee kaders vullen elkaar naadloos aan: de AVG [3] richt zich op de juridische plicht (het 'waarom' en de privacyrechten van de student), terwijl de OWASP-standaard [4] de technische uitvoering biedt (het 'hoe' beveiligen we data concreet in de code). 

**Toepasbaarheid:** 
Deze theoryeën [3, 4] vormen samen de fundering voor de Proof of Concept (POC). De AVG [3] dwingt ons tot het inbouwen van een expliciete *consent-flow* voor studenten. De OWASP-richtlijnen [4] vereisen dat offline verzamelde data (zoals cv's) via AES-encryptie lokaal in de IndexedDB van de browser wordt opgeslagen totdat er weer een verbinding is.

**Wat ontbreekt er:** 
De literatuur laat open wat de exacte prestatie-impact is van het offline versleutelen van bestanden (zoals cv's) binnen een mobiele webapplicatie. Bovendien ontbreken praktische, veilige oplossingen voor lokaal sleutelbeheer in een browser [4], wat direct getoetst zal moeten worden in de POC.

**Implementatie in de POC:** 
In de interface [9] is een verplichte, actieve consent-checkbox ingebouwd voor het delen van data. Daarnaast maakt de applicatie gebruik van de native Web Crypto API om scans en persoonsgegevens tijdens netwerkuitval lokaal via AES-GCM 256-bit te versleutelen in IndexedDB, waardoor OWASP M9-risico's worden afgedekt.

## 3. Offline-first
**Uitleg theorie:** 
Er is breed onderzoek gedaan [5-8] naar hoe apps betrouwbaar kunnen blijven zonder internet door data lokaal op te slaan (via bijvoorbeeld IndexedDB of SQLite) en deze later, op basis van delta's of versiebeheer, te synchroniseren. Implementaties maken hierbij veelal gebruik van Service Workers of synchronisatietools met conflict-detectie.

**Overeenkomsten & verschillen:** 
Alle methodieken [5-8] delen hetzelfde hoofddoel: robuustheid bij netwerkuitval. Het verschil zit in de praktische focus: theorie versus praktijk, webapplicaties (IndexedDB) [6] versus native apps (SQLite) [7], en het opslaan van simpele app-data versus complexe bestandssynchronisatie [8].

**Toepasbaarheid:** 
Deze offline-first concepten bepalen de architectuur van de webapplicatie. Om te waarborgen dat bedrijven kunnen blijven scannen als de wifi wegvalt, gebruiken we IndexedDB [6] om offline scans (en cv's) lokaal vast te houden. Bij netwerkherstel worden deze veilig op de achtergrond naar de database gesynchroniseerd.

**Wat ontbreekt er:** 
De bronnen [5-8] missen vaak diepgang over de harde limieten van browser-opslag. Het is onduidelijk hoe de app zich gedraagt bij het wegschrijven van grote hoeveelheden scans (inclusief versleutelde cv-pdf's) op lange termijn, zonder dat het toestel trager wordt, crasht of vol raakt. In de literatuur ligt hier opvallend weinig focus op.

**Implementatie in de POC:** 
De applicatie [9] is ontworpen om zonder internet robuust te blijven functioneren. Gescande codes worden bij offline status opgevangen in de browser-native IndexedDB. Zodra de verbinding met de backend herstelt, synchroniseert de Vue-app de wachtrij op de achtergrond en leegt de lokale opslag.

[1] Alsuhibany, S. A. (2025). Innovative QR code system for tamper-proof generation and fraud-resistant verification. Sensors. [Online]. Available: https://www.mdpi.com/1424-8220/25/13/3855 (Geraadpleegd op: 26 april 2026).
[2] Nwabuwe, A., Sanghera, B., Alade, T., & Olajide, F. (2023). Fraud mitigation in attendance monitoring systems using dynamic QR code, geofencing and IMEI technologies. International Journal of Advanced Computer Science and Applications, .Vol. 14 No. 4. [Paper]. Available: https://thesai.org/Downloads/Volume14No4/Paper_104-Fraud_Mitigation_in_Attendance_Monitoring_Systems.pdf (Geraadpleegd op: 26 april 2026).
[3] GDPR Local, "GDPR Compliance for Events," GDPR Local, 2025. [Online]. Available: https://gdprlocal.com/gdpr-compliance-for-events/ (Geraadpleegd op: 25 april 2026).
[4] OWASP, "Mobile Top 10: Insecure Data Storage (M9)," OWASP Foundation. [Online]. Available: https://owasp.org/www-project-mobile-top-10/2023-risks/m9-insecure-data-storage (Geraadpleegd op: 25 april 2026).
[5] Pothineni, S. H. (2024). Offline-First Mobile Architecture: Enhancing Usability and Resilience in Mobile Systems. Journal of Artificial Intelligence General science (JAIGS), ISSN 3006-4023, 7(1), 320-326. [Online]. Available: https://www.researchgate.net/publication/393910615_Offline-First_Mobile_Architecture_Enhancing_Usability_and_Resilience_in_Mobile_Systems (Geraadpleegd op: 3 mei 2026).
[6] Frontend Highlights. (2025). Implementing offline-first React applications: Building resilient apps that work anywhere. Medium. [Online]. Available: https://medium.com/@ignatovich.dm/implementing-offline-first-react-applications-building-resilient-apps-that-work-anywhere-3e8d5a1fe8f7 (Geraadpleegd op: 3 mei 2026).
[7] Tatakae Dev. (2024). Building an Offline-First Mobile App with PowerSync. Stackademic. [Online]. Available: https://blog.stackademic.com/building-an-offline-first-mobile-app-with-powersync-40674d8b7ea1 (Geraadpleegd op: 3 mei 2026).
[8] Nimrod Kramer. (2024). Offline File Sync: Developer Guide 2024. Daily.dev. [Online]. Available: https://daily.dev/blog/offline-file-sync-developer-guide-2024 (Geraadpleegd op: 3 mei 2026).
[9] A. Vep. (2026). research-prooject-Team1 [Source code]. GitHub. [Online]. Available: https://github.com/alessiovep/research-prooject-Team1 (Geraadpleegd op: 3 mei 2026).
