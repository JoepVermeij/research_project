# Conclusie

Dit onderzoek beantwoordt de hoofdvraag: *"Hoe kan het QR-code-gebaseerde registratiesysteem voor het Handshake-event van Hogeschool PXL worden ontworpen zodat het fraudebestendig, robuust en veilig is?"* 

Op basis van de literatuurstudie en de resultaten uit de Proof of Concept (POC) is bewezen dat deze drie pijlers effectief en betrouwbaar in de praktijk te realiseren zijn. De conclusies worden hieronder per deelvraag uiteengezet.

## 1. Fraudebestendigheid (QR-codes)
*Antwoord op deelvraag 1: Welke digitale technieken kunnen worden ingezet om fraude met QR-codes (zoals kopiëren en ongeautoriseerd delen) te voorkomen?*

Statische QR-codes zijn kwetsbaar voor fraude zoals *proxy-attendance*. De POC bewijst dat **dynamische QR-codes** (verversing elke 15 seconden) in combinatie met server-side validatie dit risico succesvol neutraliseren. Extra hardware-checks (zoals GPS of IMEI) blijken overbodig: de strikte tijdslimiet voorkomt effectief misbruik zonder de privacy te schenden.

## 2. Veiligheid en GDPR
*Antwoord op deelvraag 2: Welke beveiligingsmaatregelen zijn nodig om persoonsgegevens conform de GDPR-wetgeving te verwerken en op te slaan?*

Het verwerken van persoonsgegevens vereist strikte beveiliging (OWASP) en privacywaarborging (AVG/GDPR). De POC dekt dit effectief af door twee maatregelen:
1. **Expliciete Toestemming:** Een verplichte, actieve consent-checkbox garandeert dat data pas gedeeld wordt na bewuste instemming van de student.
2. **Lokale Encryptie:** Offline data wordt direct in IndexedDB versleuteld via AES-GCM 256-bit. Hierdoor is de wachtrij onleesbaar (binaire ciphertext) voor kwaadwillenden, zonder merkbaar prestatieverlies tijdens versleuteling en latere synchronisatie.

## 3. Robuustheid (Offline-first)
*Antwoord op deelvraag 3: Hoe kan het systeem betrouwbaar blijven functioneren en data synchroniseren bij wifi netwerkuitval?*

Netwerkuitval is een reëel risico op evenementen. De praktijktesten bevestigen dat een **offline-first architectuur** hiertegen beschermt. De applicatie vangt offline scans foutloos op in de browser-native `IndexedDB` en synchroniseert deze automatisch op de achtergrond met de backend zodra de internetverbinding herstelt.

## Eindadvies
De onderzochte en geteste methodieken bieden een veilig en schaalbaar fundament voor het definitieve registratieproject. Het advies aan het ontwikkelteam is om de combinatie van dynamische QR-codes, IndexedDB voor offline functionaliteit en lokale AES-GCM encryptie integraal over te nemen in de eindapplicatie. Het enige openstaande aandachtspunt voor de productieomgeving is het veiliger beheren van de encryptiesleutel; hoewel de opslag in het app-geheugen volstaat voor passieve datalekken tijdens netwerkuitval, vereist een live omgeving een strikter server-side sleutelbeheer vanuit de backend.
