# 1. Proof of Concept

## 1.1 Inleiding
Om de drie non-functionele vereisten (fraudebestendigheid, robuustheid en veiligheid) in de praktijk te toetsen, is een losstaande Proof of Concept (POC) ontwikkeld met Vue.js en .NET. Dit gebeurde bewust buiten het bestaande Handshake-systeem om vrij te kunnen experimenteren.

## 1.2 Fraudebestendigheid
**Implementatie:** 
Het platform simuleert een check-in proces waarbij dynamische QR-codes elke 15 seconden verversen. 

**Testresultaten:**
* **Test 1 – Geldige scan:** Een correcte QR-code wordt geaccepteerd.
* **Test 2 – Dubbele scan:** Een tweede scan van dezelfde code geeft succesvol de foutmelding “Token onbekend of al gebruikt”.
* **Test 3 – Verlopen QR-code:** Oude codes geven succesvol de foutmelding “Token was verlopen op moment van scannen”.
* **Test 4 – Verzonnen QR-code:** Fictieve codes geven een foutmelding.
* **Test 5 – Refresh:** De QR-codes genereren correct opnieuw na het verlopen van de timer.

## 1.3 Robuustheid bij netwerkuitval
**Implementatie:** 
*(Nog in te vullen)*

**Testresultaten:** 
*(Nog in te vullen)*

## 1.4 Veiligheid en GDPR
**1.4.1 Consent-flow (Vue.js)**
Conform GDPR [3] is er een verplichte, actief aan te vinken checkbox toegevoegd in de frontend. Zonder expliciete toestemming voor het delen van persoonsgegevens (zoals cv's) wordt de registratie geblokkeerd.

**1.4.2 Encryptie van de offline wachtrij**
Om OWASP M9-risico's [4] af te dekken, versleutelt de app data lokaal in IndexedDB tijdens netwerkuitval. Dit gebeurt via de native Web Crypto API (AES-GCM 256-bit met een unieke vector per entry). Zodra er internet is, volgt ontsleuteling op de backend en lokale opschoning.

**1.4.3 Testresultaten** 
* **Test 1 – Consent verplicht:** Registratie zonder toestemming wordt succesvol gestopt.
* **Test 2 – Inspectie IndexedDB:** Data is onleesbaar (binaire ciphertext) in IndexedDB DevTools. Dit toont aan dat lokale data veilig is.
* **Test 3 – Synchronisatie:** Synchronisatie naar de server na netwerkherstel werkt zonder data-integriteitsfouten.

**1.4.4 Reflectie**
Het versleutelen toont vooralsnog geen merkbaar prestatieverlies op losse scans. Een belangrijk aandachtspunt voor het vervolgtraject: de encryptiesleutel staat nu in het app-geheugen. Dit volstaat voor offline scenario's, maar een productieomgeving vereist strikter server-side sleutelbeheer.
