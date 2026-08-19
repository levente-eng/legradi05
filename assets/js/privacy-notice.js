(() => {
  const container = document.querySelector('.simple-page .container.narrow');
  if (!container) return;

  const path = window.location.pathname;
  const lang = /(^|\/)hu(\/|$)/.test(path) ? 'hu' : /(^|\/)en(\/|$)/.test(path) ? 'en' : 'de';

  const notices = {
    hu: `
      <p class="eyebrow">Jogi információ</p>
      <h1>Adatkezelési tájékoztató</h1>
      <p>Jelen tájékoztató a LEGRADI weboldal kapcsolatfelvételi űrlapján és közvetlen elektronikus megkeresés során kezelt személyes adatokra vonatkozik.</p>

      <h2>1. Adatkezelő</h2>
      <p><strong>Légrádi Kft.</strong><br>Székhely: 9022 Győr, Batthyány tér 5.<br>E-mail: <a href="mailto:office@legradis.com">office@legradis.com</a><br>Telefon: <a href="tel:+36707790790">+36 70 779 0790</a><br>Képviselő: Légrádi Krisztina</p>

      <h2>2. A kezelt adatok és az adatkezelés célja</h2>
      <p>A kapcsolatfelvételi űrlapon megadott név vagy cégnév, e-mail-cím, telefonszám, projekt típusa és az üzenet tartalma kerül kezelésre. Az adatkezelés célja a megkeresés megválaszolása, a projektigény egyeztetése, ajánlatadás előkészítése és a kapcsolattartás.</p>

      <h2>3. Az adatkezelés jogalapja</h2>
      <p>Az űrlap használatakor az adatkezelés jogalapja az érintett hozzájárulása a GDPR 6. cikk (1) bekezdés a) pontja alapján. Amennyiben a megkeresés szerződés megkötését megelőző, az érintett kérésére tett lépésekhez kapcsolódik, az adatkezelés a GDPR 6. cikk (1) bekezdés b) pontján is alapulhat. A hozzájárulás bármikor visszavonható az adatkezelő fenti elérhetőségén; ez nem érinti a visszavonás előtti adatkezelés jogszerűségét.</p>

      <h2>4. Adattovábbítás és adatfeldolgozók</h2>
      <p>Az űrlap beküldése a <strong>FormSubmit</strong> külső űrlapkezelő szolgáltatáson keresztül történik. A szolgáltatás a beküldött adatokat az adatkezelő e-mail-címére továbbítja. A FormSubmit dokumentációja szerint a beküldött űrlapadatokat 30 napig őrzi meg. A kézbesítéshez az adatkezelő levelezési szolgáltatója is részt vesz az adatkezelésben.</p>
      <p>A FormSubmit adatvédelmi feltételeiről a szolgáltató saját adatvédelmi tájékoztatója ad további információt.</p>

      <h2>5. Adatmegőrzés</h2>
      <p>A FormSubmit rendszerében a beküldések megőrzési ideje a szolgáltató dokumentációja szerint 30 nap. Az adatkezelőhöz megérkezett megkeresést és az ahhoz kapcsolódó levelezést a kapcsolatfelvétel céljának teljesüléséig, illetve az esetleges további ügyintézéshez szükséges ideig őrizzük meg. Ha a megkeresésből szerződéses kapcsolat jön létre, az arra vonatkozó adatokat a kapcsolódó jogi és számviteli kötelezettségek szerint kezeljük.</p>

      <h2>6. Az érintett jogai</h2>
      <p>Az érintett kérheti a rá vonatkozó személyes adatokhoz való hozzáférést, azok helyesbítését, törlését vagy kezelésük korlátozását, és a jogalaptól függően élhet adathordozhatósági vagy tiltakozási jogával. Hozzájáruláson alapuló adatkezelés esetén a hozzájárulás bármikor visszavonható.</p>
      <p>Az érintetti kérelmeket az <a href="mailto:office@legradis.com">office@legradis.com</a> címen lehet benyújtani.</p>

      <h2>7. Panasz és jogorvoslat</h2>
      <p>Az érintett panaszt tehet a Nemzeti Adatvédelmi és Információszabadság Hatóságnál (NAIH). Cím: 1055 Budapest, Falk Miksa utca 9–11.; levelezési cím: 1363 Budapest, Pf. 9.; e-mail: <a href="mailto:ugyfelszolgalat@naih.hu">ugyfelszolgalat@naih.hu</a>.</p>

      <h2>8. Kötelező adatok és automatizált döntéshozatal</h2>
      <p>Az űrlapon kötelezőként jelölt adatok nélkül az üzenet nem küldhető el. Automatizált döntéshozatal vagy profilalkotás a kapcsolatfelvétel során nem történik.</p>

      <h2>9. Technikai működés</h2>
      <p>A weboldal a működéshez szükséges helyi tárolást használhat. A kapcsolatfelvételi űrlap a FormSubmit szolgáltatáson keresztül közvetlenül továbbítja a megadott adatokat az adatkezelőhöz; nem a látogató saját levelezőprogramját nyitja meg.</p>

      <p><small>Hatályos: 2026. augusztus 19. A tájékoztatót az alkalmazott szolgáltatások vagy adatkezelési folyamatok változása esetén frissítjük.</small></p>
    `,
    en: `
      <p class="eyebrow">Legal information</p>
      <h1>Privacy notice</h1>
      <p>This notice applies to personal data processed through the LEGRADI website contact form and through direct electronic enquiries.</p>

      <h2>1. Data controller</h2>
      <p><strong>Légrádi Kft.</strong><br>Registered office: 9022 Győr, Batthyány tér 5, Hungary<br>Email: <a href="mailto:office@legradis.com">office@legradis.com</a><br>Phone: <a href="tel:+36707790790">+36 70 779 0790</a><br>Representative: Légrádi Krisztina</p>

      <h2>2. Data processed and purpose</h2>
      <p>We process the name or company name, email address, phone number, project type and message content submitted through the contact form. The purposes are to respond to enquiries, discuss project requirements, prepare quotations and maintain contact.</p>

      <h2>3. Legal basis</h2>
      <p>When the form is used, processing is based on the data subject's consent under Article 6(1)(a) GDPR. Where an enquiry relates to steps taken at the request of the data subject prior to entering into a contract, processing may also rely on Article 6(1)(b) GDPR. Consent may be withdrawn at any time using the contact details above, without affecting the lawfulness of processing carried out before withdrawal.</p>

      <h2>4. Recipients and service providers</h2>
      <p>Form submissions are handled through the external <strong>FormSubmit</strong> form service, which forwards the submitted data to the controller's email address. According to FormSubmit's documentation, form submissions are retained by the service for 30 days. The controller's email service provider also participates in delivering and storing the correspondence.</p>
      <p>Further information on FormSubmit's processing practices is available in the provider's own privacy information.</p>

      <h2>5. Retention</h2>
      <p>According to FormSubmit's documentation, submissions are retained in its system for 30 days. Enquiries and related correspondence received by the controller are kept until the purpose of the contact has been fulfilled and for as long as reasonably necessary for any follow-up. If the enquiry results in a contractual relationship, the relevant data are processed in accordance with applicable legal and accounting obligations.</p>

      <h2>6. Data subject rights</h2>
      <p>Data subjects may request access to, rectification or erasure of their personal data, restriction of processing, and, depending on the legal basis, may exercise the right to data portability or object to processing. Where processing is based on consent, consent may be withdrawn at any time.</p>
      <p>Requests may be submitted to <a href="mailto:office@legradis.com">office@legradis.com</a>.</p>

      <h2>7. Complaint and remedies</h2>
      <p>A complaint may be lodged with the Hungarian National Authority for Data Protection and Freedom of Information (NAIH), 1055 Budapest, Falk Miksa utca 9–11, Hungary; postal address: 1363 Budapest, P.O. Box 9; email: <a href="mailto:ugyfelszolgalat@naih.hu">ugyfelszolgalat@naih.hu</a>.</p>

      <h2>8. Required fields and automated decision-making</h2>
      <p>The message cannot be submitted without completing the fields marked as required. No automated decision-making or profiling is carried out in connection with contact enquiries.</p>

      <h2>9. Technical operation</h2>
      <p>The website may use local storage required for its operation. The contact form sends the submitted data directly to the controller through FormSubmit; it does not open the visitor's own email application.</p>

      <p><small>Effective: 19 August 2026. This notice will be updated if the services used or the processing activities change.</small></p>
    `,
    de: `
      <p class="eyebrow">Rechtliche Informationen</p>
      <h1>Datenschutzerklärung</h1>
      <p>Diese Datenschutzerklärung gilt für personenbezogene Daten, die über das Kontaktformular der LEGRADI-Website sowie im Rahmen direkter elektronischer Anfragen verarbeitet werden.</p>

      <h2>1. Verantwortlicher</h2>
      <p><strong>Légrádi Kft.</strong><br>Sitz: 9022 Győr, Batthyány tér 5, Ungarn<br>E-Mail: <a href="mailto:office@legradis.com">office@legradis.com</a><br>Telefon: <a href="tel:+36707790790">+36 70 779 0790</a><br>Vertreterin: Légrádi Krisztina</p>

      <h2>2. Verarbeitete Daten und Zweck</h2>
      <p>Verarbeitet werden der im Kontaktformular angegebene Name bzw. Firmenname, die E-Mail-Adresse, Telefonnummer, Projektart und der Inhalt der Nachricht. Zweck der Verarbeitung sind die Beantwortung der Anfrage, die Abstimmung des Projektbedarfs, die Vorbereitung eines Angebots und die weitere Kontaktaufnahme.</p>

      <h2>3. Rechtsgrundlage</h2>
      <p>Bei Nutzung des Formulars erfolgt die Verarbeitung auf Grundlage der Einwilligung der betroffenen Person gemäß Art. 6 Abs. 1 lit. a DSGVO. Bezieht sich die Anfrage auf vorvertragliche Maßnahmen, die auf Anfrage der betroffenen Person erfolgen, kann die Verarbeitung zusätzlich auf Art. 6 Abs. 1 lit. b DSGVO gestützt werden. Die Einwilligung kann jederzeit über die oben genannten Kontaktdaten widerrufen werden; die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt unberührt.</p>

      <h2>4. Empfänger und Dienstleister</h2>
      <p>Die Übermittlung des Formulars erfolgt über den externen Formulardienst <strong>FormSubmit</strong>, der die angegebenen Daten an die E-Mail-Adresse des Verantwortlichen weiterleitet. Laut Dokumentation von FormSubmit werden Formularübermittlungen 30 Tage gespeichert. An der Zustellung und Speicherung der Korrespondenz ist außerdem der E-Mail-Dienstleister des Verantwortlichen beteiligt.</p>
      <p>Weitere Informationen zur Datenverarbeitung durch FormSubmit enthält die Datenschutzerklärung des Dienstanbieters.</p>

      <h2>5. Speicherdauer</h2>
      <p>Laut Dokumentation von FormSubmit werden Übermittlungen im System des Dienstes 30 Tage gespeichert. Beim Verantwortlichen eingegangene Anfragen und die dazugehörige Korrespondenz werden bis zur Erfüllung des Zwecks der Kontaktaufnahme und solange gespeichert, wie dies für eine angemessene Nachbearbeitung erforderlich ist. Entsteht aus der Anfrage ein Vertragsverhältnis, werden die betreffenden Daten entsprechend den einschlägigen gesetzlichen und buchhalterischen Pflichten verarbeitet.</p>

      <h2>6. Rechte der betroffenen Personen</h2>
      <p>Betroffene Personen können Auskunft über ihre personenbezogenen Daten sowie Berichtigung, Löschung oder Einschränkung der Verarbeitung verlangen und – abhängig von der Rechtsgrundlage – ihr Recht auf Datenübertragbarkeit oder Widerspruch ausüben. Bei einer auf Einwilligung beruhenden Verarbeitung kann die Einwilligung jederzeit widerrufen werden.</p>
      <p>Anfragen können an <a href="mailto:office@legradis.com">office@legradis.com</a> gerichtet werden.</p>

      <h2>7. Beschwerderecht</h2>
      <p>Eine Beschwerde kann bei der ungarischen Datenschutzaufsichtsbehörde NAIH (Nemzeti Adatvédelmi és Információszabadság Hatóság) eingereicht werden: 1055 Budapest, Falk Miksa utca 9–11, Ungarn; Postanschrift: 1363 Budapest, Postfach 9; E-Mail: <a href="mailto:ugyfelszolgalat@naih.hu">ugyfelszolgalat@naih.hu</a>.</p>

      <h2>8. Pflichtfelder und automatisierte Entscheidungen</h2>
      <p>Ohne das Ausfüllen der als Pflichtfelder gekennzeichneten Angaben kann die Nachricht nicht abgesendet werden. Im Zusammenhang mit Kontaktanfragen finden keine automatisierten Entscheidungen und kein Profiling statt.</p>

      <h2>9. Technischer Betrieb</h2>
      <p>Die Website kann für ihren Betrieb erforderlichen lokalen Speicher verwenden. Das Kontaktformular übermittelt die eingegebenen Daten über FormSubmit direkt an den Verantwortlichen und öffnet nicht das E-Mail-Programm des Besuchers.</p>

      <p><small>Stand: 19. August 2026. Diese Erklärung wird aktualisiert, wenn sich die eingesetzten Dienste oder Verarbeitungsvorgänge ändern.</small></p>
    `
  };

  container.innerHTML = notices[lang] || notices.de;
})();
