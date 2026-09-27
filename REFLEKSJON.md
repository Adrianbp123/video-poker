# Refleksjonsnotat

Siden semesterstart har jeg lært mye om React og Zustand. Jeg har også lært mer om TypeScript.
Det å sette sammen en større app med flere komponenter, routing og Zustand for å lagre data har vært krevende, men har hjulpet meg med å få en bedre forståelse av hvordan de forskjellige delene henger sammen.

## Utviklingen av oppgaven

Jeg prøvde å dele opp oppgaven i mindre deler og jobbet med en funksjon om gangen. Jeg startet med å sette opp prosjektet og rydde bort standardinnholdet. Deretter satte jeg opp React Router og lagde de forskjellige sidene og navigasjonen i headeren. Etter dette jobbet jeg videre med blant annet kortkomponenten, pokerhendene og logikken for å finne hvilken pokerhånd spilleren har.

Da grunnlaget var på plass begynte jeg å jobbe med Zustand og selve spillfunksjonaliteten. Jeg bygde videre på dette steg for steg før jeg til slutt jobbet med styling, responsivitet og universell utforming på alle sidene.
Mot slutten gikk jeg også gjennom koden for å rydde opp og formatere med Prettier. Jeg gikk også igjennom kommentarene og brukte @param og @returns der det var relevant for å beskrive funksjonene best mulig.

## GitHub og arbeidsflyt

GitHub har hjulpet meg å jobbe med prosjektet steg for steg og gjort det lettere å holde oversikt over utviklingsprosessen.
Siden vi lærte å bruke GitHub under Gatherly-oppgaven, gikk arbeidsflyten mye bedre denne gangen fordi jeg allerede var kjent med branches, commits, pull requests og merging.

Fra starten bestemte jeg meg for å dele opp branchene i feature, fix og chore fordi jeg fant ut at dette var en vanlig måte å organisere branches på, og fordi det gjorde det tydelig hva slags endringer branchen inneholdt.

## Utfordringer og problemløsning

En av utfordringene jeg hadde var å få selve spillflyten til å fungere med Zustand. Det var flere ting som måtte henge sammen når spilleren satset, fikk utdelt kort og valgte hvilke kort som skulle holdes. Jeg jobbet derfor med spillet steg for steg og testet de forskjellige delene etter hvert som jeg la dem til. Dette gjorde det lettere å finne feil enn om jeg hadde prøvd å lage hele spillet på en gang.

En annen utfordring var logikken for å finne riktig pokerhånd. Det var mange forskjellige kombinasjoner som måtte sjekkes, og jeg måtte passe på at de ble sjekket i riktig rekkefølge. Jeg valgte å skille denne logikken ut i en egen funksjon, getPokerHand, i stedet for å ha all logikken direkte i komponenten.

Jeg fant også flere små feil som dukket opp når jeg testet underveis. For eksempel opplevde jeg at spillrunden ikke ble resatt etter valg/sletting av spiller, slik at forrige runde fortsatt var aktiv. Dette løste jeg ved å passe på at dataene ble nullstilt når en spiller ble valgt eller slettet.

## Valg jeg har tatt

Underveis i prosjektet har jeg tatt flere valg for hvordan spillet skulle fungere.

Jeg valgte å dele opp funksjonaliteten i mindre komponenter og egne funksjoner. Dette gjorde det lettere for meg å holde oversikt over prosjektet og jobbe med en del av gangen.

Oppgaven spesifiserte ikke hvor mye de forskjellige pokerhendene skulle betale, så jeg valgte en enkel tabell der de bedre pokerhendene gir høyere utbetaling.

Jeg valgte også å lage CardBack som en egen komponent. Først prøvde jeg å ha kortbaksiden som en del av Card-komponenten, men fant ut at en egen komponent gjorde det enklere å vise kortbaksiden før kortene ble delt ut.

Jeg brukte hovedsakelig vanlig CSS i prosjektet, men valgte å bruke CSS Module på PokerHand-komponenten for å prøve det ut. Designet på appen prøvde jeg å holde clean og moderne, med mørk bakgrunn og gul primary-farge. Jeg valgte disse fargene fordi jeg syntes de passet godt til poker-temaet.
