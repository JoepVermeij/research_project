# Conclusie

Dit onderzoek had als doel om de technische fundamenten te leggen voor een veilige, robuuste en GDPR-conforme oplossing voor een QR-code gebaseerd registratiesysteem. Op basis van de literatuurstudie en de succesvolle resultaten uit de experimentele Proof of Concept (POC), kunnen we concluderen dat de drie opgestelde non-functionele vereisten — fraudebestendigheid, robuustheid en veiligheid — effectief en betrouwbaar in de praktijk kunnen worden gerealiseerd.

## Fraudebestendigheid (QR-code)
Statische QR-codes zijn kwetsbaar voor fraude zoals *proxy-attendance*. De POC bewijst dat **dynamische QR-codes** (verversing elke 15 seconden) in combinatie met server-side validatie dit risico succesvol neutraliseren. Extra hardware-checks (zoals GPS of IMEI) blijken overbodig: de strikte tijdslimiet voorkomt effectief misbruik zonder de privacy te schenden.

## Robuustheid (Offline-first)
Netwerkuitval is een reëel risico op evenementen. De praktijktesten bevestigen dat een **offline-first architectuur** hiertegen beschermt. De applicatie vangt offline scans foutloos op in de browser-native `IndexedDB` en synchroniseert deze automatisch op de achtergrond met de backend zodra de internetverbinding herstelt.

## Veiligheid en GDPR
Het verwerken van persoonsgegevens vereist strikte beveiliging (OWASP) en privacywaarborging (AVG/GDPR). De POC dekt dit effectief af door twee maatregelen:
1. **Expliciete Toestemming:** Een verplichte, actieve consent-checkbox garandeert dat data pas gedeeld wordt na bewuste instemming van de student.
2. **Lokale Encryptie:** Offline data wordt direct in IndexedDB versleuteld via AES-GCM 256-bit. Hierdoor is de wachtrij onleesbaar (binaire ciphertext) voor kwaadwillenden, zonder merkbaar prestatieverlies tijdens versleuteling en latere synchronisatie.

## Eindadvies
De onderzochte en geteste methodieken bieden een veilig en schaalbaar fundament voor het definitieve registratieproject. Het advies aan het ontwikkelteam is om de combinatie van dynamische QR-codes, IndexedDB voor offline functionaliteit en lokale AES-GCM encryptie integraal over te nemen in de eindapplicatie. Het enige openstaande aandachtspunt voor de productieomgeving is het veiliger beheren van de encryptiesleutel; hoewel de opslag in het app-geheugen volstaat voor passieve datalekken tijdens netwerkuitval, vereist een live omgeving een strikter server-side sleutelbeheer vanuit de backend.
