// React è già caricato tramite CDN
const { useState, useEffect, useCallback, useRef } = React;

const PC={1:"#1B4332",2:"#7B3F00",3:"#1a237e"};
const PL={1:"TRENO",2:"VAN",3:"FINALE"};
const PE={1:"🚄",2:"🚐",3:"✈️"};
const SC={ok:"#1B4332",bozza:"#856404",tbd:"#888",critical:"#C1121F"};
const SBG={ok:"#D8F3DC",bozza:"#FFF3CD",tbd:"#F5F5F5",critical:"#FFE5E5"};
const CY={bozza:"ok",ok:"tbd",tbd:"bozza"};
const CATS=[
  {k:"food",l:"🍜 Cibo",c:"#C62828"},{k:"acc",l:"🏠 Alloggio",c:"#1B4332"},
  {k:"move",l:"🚌 Trasporto",c:"#1565C0"},{k:"act",l:"🎌 Attività",c:"#6A1040"},
  {k:"shop",l:"🛍️ Shopping",c:"#7B3F00"},{k:"other",l:"💴 Altro",c:"#555"},
];
const MEMO_CATS=[
  {k:"conf",l:"✅ Confermati",c:"#1B4332"},{k:"pack",l:"🧳 Da portare",c:"#1565C0"},
  {k:"book",l:"⚠️ Da prenotare",c:"#C1121F"},{k:"know",l:"📚 Da sapere",c:"#1B4332"},
  {k:"idea",l:"💡 Idee",c:"#7B3F00"},{k:"doc",l:"📄 Documenti",c:"#555"},
];
const PRANGE={1:"28 MAG → 17 GIU · 21 notti",2:"18 GIU → 9 LUG · 22 notti",3:"9 LUG → 15 LUG · 7 notti FINALE"};
const TM={train:"🚆",shin:"🚄",local:"🚇",bus:"🚌",van:"🚐",ferry:"⛴️",plane:"✈️",walk:"🚶"};

const TRANSPORT={
  1:{from:"Narita",to:"Tokyo",mode:"train",min:60,yen:3250,jrp:true,note:"Narita Express N'EX · JR Pass ✓"},
  2:{from:"Tokyo",to:"Tokyo",mode:"local",min:0,yen:1000,jrp:false,note:"Metro IC giornaliero"},
  3:{from:"Tokyo",to:"Nikkō",mode:"train",min:110,yen:3330,jrp:false,note:"Tobu Limited Express Kegon — ⚠️ NON coperto JR Pass!"},
  4:{from:"Nikkō",to:"Fukushima",mode:"train",min:240,yen:2350,jrp:true,note:"JR via Utsunomiya + Kōriyama · JR Pass ✓"},
  5:{from:"Fukushima",to:"Sendai",mode:"train",min:90,yen:4210,jrp:true,note:"JR Tōhoku Line · JR Pass ✓"},
  6:{from:"Sendai",to:"Matsushima+Yamadera",mode:"train",min:120,yen:2400,jrp:true,note:"Senseki + Senzan Line · JR Pass ✓"},
  7:{from:"Sendai",to:"Morioka",mode:"shin",min:50,yen:7300,jrp:true,note:"Shinkansen Hayabusa · JR Pass ✓"},
  8:{from:"Morioka",to:"Morioka",mode:"walk",min:0,yen:500,jrp:false,note:"Giro a piedi + bus locale"},
  9:{from:"Morioka",to:"Tazawako",mode:"shin",min:40,yen:2900,jrp:true,note:"Shinkansen Komachi · JR Pass ✓"},
  10:{from:"Tazawa",to:"Nagano",mode:"shin",min:240,yen:22000,jrp:true,note:"Komachi→Omiya + Hokuriku Shinkansen · JR Pass ✓"},
  11:{from:"Nagano",to:"Jigokudani",mode:"bus",min:80,yen:2000,jrp:false,note:"Nagaden Bus da Yudanaka Stn A/R"},
  12:{from:"Nagano",to:"Suwa",mode:"train",min:180,yen:4640,jrp:false,note:"JR→Matsumoto + trenino+bus Kamikōchi + treno Suwa"},
  13:{from:"Suwa",to:"Shirakawa-gō",mode:"train",min:240,yen:10900,jrp:true,note:"JR Suwa→Toyama (JR Pass ✓) + bus Toyama→Shirakawa-gō 1.900¥"},
  14:{from:"Shirakawa-gō",to:"Kanazawa",mode:"bus",min:75,yen:1850,jrp:false,note:"Bus Hokutetsu diretto · ~1h15"},
  15:{from:"Kanazawa",to:"Nagoya",mode:"train",min:200,yen:8500,jrp:true,note:"Thunderbird→Tsuruga + Shinkansen · JR Pass ✓"},
  16:{from:"Nagoya",to:"Kyoto",mode:"shin",min:35,yen:6100,jrp:true,note:"Shinkansen Hikari/Kodama · JR Pass ✓"},
  17:{from:"Kyoto",to:"Kyoto",mode:"local",min:0,yen:1200,jrp:false,note:"Bus/metro IC Kyoto"},
  18:{from:"Kyoto",to:"Arashiyama",mode:"local",min:30,yen:1000,jrp:false,note:"Randen tram + bus locali"},
  19:{from:"Kyoto",to:"Osaka",mode:"train",min:28,yen:570,jrp:false,note:"JR Kyoto→Osaka Rapid Service"},
  20:{from:"Osaka",to:"USJ",mode:"local",min:25,yen:1000,jrp:false,note:"JR Osaka→Universal City"},
  21:{from:"Osaka",to:"Osaka",mode:"local",min:0,yen:800,jrp:false,note:"Metro locale Osaka"},
  22:{from:"Osaka",to:"Ine",mode:"van",min:180,yen:4000,jrp:false,note:"Van ~160km via Amanohashidate · carburante + pedaggi"},
  23:{from:"Ine",to:"Tottori",mode:"van",min:180,yen:4500,jrp:false,note:"Van ~200km costa est"},
  24:{from:"Tottori",to:"Matsue",mode:"van",min:150,yen:3500,jrp:false,note:"Van ~150km San'in Coast"},
  25:{from:"Matsue",to:"Hiroshima",mode:"van",min:210,yen:5000,jrp:false,note:"Van ~230km attraverso Honshu"},
  26:{from:"Hiroshima",to:"Miyajima",mode:"ferry",min:10,yen:400,jrp:false,note:"Traghetto JR Miyajima A/R · ~400¥"},
  27:{from:"Hiroshima",to:"Etajima",mode:"ferry",min:20,yen:800,jrp:false,note:"Traghetto Hiroshima→Etajima A/R"},
  28:{from:"Hiroshima",to:"Nagato",mode:"van",min:180,yen:4500,jrp:false,note:"Van ~200km costa nord"},
  29:{from:"Nagato",to:"Fukuoka",mode:"van",min:90,yen:2500,jrp:false,note:"Van ~100km + Kanmon Tunnel"},
  30:{from:"Fukuoka",to:"Yanagawa",mode:"van",min:60,yen:1500,jrp:false,note:"Van ~60km + Nanzo-in"},
  31:{from:"Yanagawa",to:"Kumamoto",mode:"van",min:90,yen:2500,jrp:false,note:"Van ~100km"},
  32:{from:"Kumamoto",to:"Takachiho",mode:"van",min:120,yen:3000,jrp:false,note:"Van ~120km montagna"},
  33:{from:"Takachiho",to:"Kurokawa",mode:"van",min:90,yen:2000,jrp:false,note:"Van ~80km via Aso"},
  34:{from:"Kurokawa",to:"Beppu",mode:"van",min:90,yen:2500,jrp:false,note:"Van ~90km via Hita + Bungo-Mori"},
  35:{from:"Beppu",to:"Kunisaki",mode:"van",min:60,yen:1500,jrp:false,note:"Van ~60km"},
  36:{from:"Kunisaki",to:"Matsuyama",mode:"ferry",min:90,yen:12800,jrp:false,note:"⛴️ Traghetto veicolare Beppu→Matsuyama · prenotato ✓"},
  37:{from:"Matsuyama",to:"Onomichi",mode:"van",min:180,yen:4500,jrp:false,note:"Van ~200km via Shimonada"},
  38:{from:"Onomichi",to:"Onomichi",mode:"van",min:120,yen:1500,jrp:false,note:"Shimanami Kaidō + bici noleggio"},
  39:{from:"Onomichi",to:"Naruto",mode:"van",min:180,yen:5000,jrp:false,note:"Van ~230km + pedaggi Shikoku"},
  40:{from:"Naruto",to:"Awaji",mode:"van",min:30,yen:1000,jrp:false,note:"Van locale Awaji"},
  41:{from:"Awaji",to:"Nara",mode:"van",min:120,yen:3500,jrp:false,note:"Van ~160km"},
  42:{from:"Nara",to:"Osaka",mode:"van",min:60,yen:1500,jrp:false,note:"Van ~50km verso Osaka"},
  43:{from:"Osaka KIX",to:"Okinawa",mode:"plane",min:130,yen:10000,jrp:false,note:"✈️ Jetstar GK357 KIX→OKA"},
  44:{from:"Naha",to:"Kerama",mode:"ferry",min:50,yen:2500,jrp:false,note:"Ferry Tomari Port→Zamami A/R"},
  45:{from:"Okinawa",to:"Kyoto",mode:"plane",min:150,yen:13000,jrp:false,note:"✈️ Jetstar GK352 OKA→KIX + Haruka train KIX→Kyoto"},
  46:{from:"Kyoto",to:"Kyoto",mode:"local",min:0,yen:1200,jrp:false,note:"Bus/metro Kyoto"},
  47:{from:"Kyoto",to:"Kyoto",mode:"local",min:0,yen:1200,jrp:false,note:"Bus/metro Kyoto"},
  48:{from:"Kyoto",to:"Tokyo",mode:"shin",min:135,yen:13750,jrp:true,note:"🚨 Shinkansen Hikari · PARTENZA 16:30-17:00 per Fuji! Siediti lato DESTRO 🗻"},
  49:{from:"Tokyo",to:"Tokyo",mode:"local",min:0,yen:800,jrp:false,note:"Metro/treni locali Tokyo"},
  50:{from:"Tokyo Haneda",to:"Italia",mode:"plane",min:0,yen:0,jrp:false,note:"✈️ Volo internazionale HND→Italia"},
};
const VAN_RENTAL_YEN=280000;

const MEMO0=[
  {id:101,cat:"conf",txt:"✅ PLAT HOSTEL KEIKYU ASAKUSA KARIN — 28-30 maggio 2026 · 34,85€ · Agoda"},
  {id:102,cat:"conf",txt:"✅ GUEST HOUSE KITOEDA — Nikkō · 30-31 maggio · 28€ · Confermato"},
  {id:103,cat:"conf",txt:"✅ YUMORI ONSEN HOSTEL — Fukushima · 31/05-01/06 · Confermato"},
  {id:104,cat:"conf",txt:"✅ KATAKURINOHANA — 5-6 giugno 2026 · 86€ con colazione · Vista Lago Tazawa · Booking #655173907"},
  {id:106,cat:"conf",txt:"✅ HOTEL LAFONTEINE SUWA — 8-9 giugno 2026 · 23,81€ · Camera con vasca onsen privata · Booking #655184791"},
  {id:105,cat:"conf",txt:"✅ MINSHUKU KANJIYA (Shirakawa-gō) — 9-10 giugno 2026 · 33.050¥ (~190€) cena+colazione · Booking #655176115"},
  {id:110,cat:"conf",txt:"✅ JETSTAR GK357 — 09/07 KIX 15:25 → OKA 17:40 · Booking ZNBWPP · Check-in chiude 14:45"},
  {id:111,cat:"conf",txt:"✅ JETSTAR GK352 — 13/07 OKA 12:30 → KIX 14:40 · Booking ZNBWPP · Check-in chiude 11:50"},
  {id:1,cat:"pack",txt:"Quaderno bianco per i timbri goshuin ⛩️ (acquistane uno a Sensō-ji il Gg.1)"},
  {id:2,cat:"pack",txt:"Tegaderm (cerotti impermeabili trasparenti) per coprire il tatuaggio in onsen"},
  {id:3,cat:"pack",txt:"🚨 GORE-TEX leggero — Stagione Tsuyu (piogge) attiva! Obbligatorio per Yamadera e Tazawa"},
  {id:4,cat:"pack",txt:"Scarpe comode per camminare molto (Yamadera 1015 scalini, Kamikochi, Tazawa 20km)"},
  {id:5,cat:"pack",txt:"Power bank grande — giornate lunghe fuori casa"},
  {id:6,cat:"pack",txt:"Yukata per Yoiyama il 14 lug 👘 (o comprarne uno in Giappone ~3.000¥)"},
  {id:7,cat:"book",txt:"GHIBLI PARK Nagoya (Gg.16, 12/06) — biglietti il 10 del mese! l-tike.com/statics/ghiblipark-en/"},
  {id:10,cat:"book",txt:"Dōgo Onsen kashikiri (Gg.37) — prenotare 1-2 mesi prima"},
  {id:11,cat:"book",txt:"Kurokawa Onsen kashikiri (Gg.33) — prenotare in anticipo"},
  {id:21,cat:"book",txt:"🍳 KICHI KICHI OMURICE Kyoto (Gg.17) — tableall.com · esaurito settimane prima!"},
  {id:25,cat:"book",txt:"🎮 USJ Express Pass Osaka (Gg.20) — FONDAMENTALE in estate: usj.co.jp o Klook"},
  {id:42,cat:"book",txt:"🌆 SHIBUYA SKY (Gg.2, 29/05) — slot tramonto aprono ora! shibuya-scramble-square.com"},
  {id:43,cat:"book",txt:"🐾 CAFE CAPYBA (Gg.2, 29/05 ore 16:00) — slot maggio aprono ora"},
  {id:50,cat:"book",txt:"🚨 SHINKANSEN Kyoto→Tokyo (Gg.48) — CAMBIA ORARIO da 20:00 a 16:30-17:00 per Fuji!"},
  {id:12,cat:"doc",txt:"Patente internazionale ✓ già pronta"},
  {id:13,cat:"doc",txt:"JR Pass — valutare se conviene considerando i tratti coperti"},
  {id:14,cat:"doc",txt:"eSIM o SIM giapponese — Airalo o IIJmio, attivare prima della partenza"},
  {id:15,cat:"know",txt:"Goshuin (御朱印): porta il quaderno in OGNI tempio/santuario del percorso"},
  {id:16,cat:"know",txt:"Michi-no-eki (道の駅): aree sosta van legali — app: 車中泊マップ"},
  {id:17,cat:"know",txt:"7-Eleven ATM: unico ATM affidabile per carte estere"},
  {id:18,cat:"know",txt:"Tatuaggio: Tegaderm in onsen pubbliche. Kashikiri = bagno privato = sempre ok"},
  {id:36,cat:"know",txt:"App GO taxi: come Uber in Giappone — scaricare prima di partire"},
  {id:37,cat:"know",txt:"App LINE: messaggistica giapponese — fondamentale per comunicare con locali"},
  {id:38,cat:"know",txt:"App EX / Smart EX: prenotare posti shinkansen — collegare alla Suica"},
  {id:51,cat:"know",txt:"🌧️ Stagione TSUYU (piogge): calcola +30% tempo per attività outdoor in caso pioggia"},
  {id:19,cat:"idea",txt:"📓 Momenti di silenzio per il diario — Kamikochi, Tazawa, Kurokawa"},
  {id:20,cat:"idea",txt:"🗣️ Interagire in giapponese appena possibile — Van Life = zero inglese"},
  {id:33,cat:"idea",txt:"🗻 Fuji dal treno Gg.48: siediti lato DESTRO (finestrino E) + parti PRIMA del tramonto!"},
];

const D0=[
{n:1,d:"28/05",dow:"Gio",c:"Tokyo",j:"東京",p:1,sl:"✅ Plat Hostel Keikyu Asakusa Karin — 34,85€ 2 notti",
 a:["Arrivo Narita 9:10 → Narita Express → check-in Asakusa","⛩️ Sensō-ji + acquisto quaderno Goshuin","🎌 CHAINSAW MAN: Kanda Church + Onnazaka","🎌 YOUR NAME: Suga Shrine Otokozaka","✅ ORE 20:00: TeamLab Planets Toyosu 🎨"],
 m:["🎌 CHAINSAW MAN REZE ARC: Kanda Church + Onnazaka","🎌 YOUR NAME: Suga Shrine Otokozaka"],b:82,st:"ok",
 nt:"✅ TEAMLAB: 28/05 ore 20:00 · NON cancellabile · Toyosu 6-1-16",
 schedule:[
   {id:1,time:"09:10",txt:"Atterraggio Narita · 7-Bank ATM per Yen · Welcome Suica su Apple Pay"},
   {id:2,time:"10:30",txt:"Narita Express → Asakusa · Check-in/drop bagagli in ostello"},
   {id:3,time:"13:30",txt:"⛩️ Sensō-ji · acquisto quaderno Goshuin"},
   {id:4,time:"15:00",txt:"🎌 Ochanomizu: ponte Hijiribashi (Chainsaw Man/Suzume spot)"},
   {id:5,time:"16:30",txt:"🎌 Suga Shrine Otokozaka (Yotsuya): le scale di Your Name"},
   {id:6,time:"20:00",txt:"✅ TeamLab Planets Toyosu · Booking HEADOUT-20260430-KUPX · NON cancellabile"},
 ],exp:[]},

{n:2,d:"29/05",dow:"Ven",c:"Tokyo",j:"東京",p:1,sl:"✅ Plat Hostel Keikyu Asakusa Karin (stessa prenotazione)",
 a:["🐟 ORE 8:00 Tsukiji Outer Market — colazione sushi","🛍️ Akihabara: SURUGA-YA, TRADER HQ, BOOKOFF","🛍️ NAKANO BROADWAY","🐾 ORE 16:00 Cafe Capyba","🌆 Tramonto Shibuya Sky"],
 m:["🎌 Akihabara: la tana otaku di Tokyo"],b:63,st:"ok",
 nt:"📌 Shibuya Sky slot tramonto + Cafe Capyba 16:00 — slot aperti ora!",
 schedule:[
   {id:1,time:"08:00",txt:"🐟 Tsukiji Outer Market — sushi fresco, ostriche, Tamagoyaki"},
   {id:2,time:"10:00",txt:"🛍️ Akihabara — SURUGA-YA, TRADER, Mandarake · retrogame"},
   {id:3,time:"11:30",txt:"GiGO o Taito Station — rhythm game"},
   {id:4,time:"16:30",txt:"🌆 Shibuya — Scramble Crossing · Shibuya Sky tramonto"},
 ],exp:[]},

{n:3,d:"30/05",dow:"Sab",c:"Tokyo → Nikkō",j:"東京→日光",p:1,sl:"✅ Guest House KITOEDA — Nikkō · 28€",
 a:["Spostamento Tokyo→Nikkō (~2h)","⛩️ Tōshō-gū: mausoleo di Tokugawa","🚌 Bus Lago Chūzenji → Cascata Kegon","🐉 Ryuzu Falls"],
 m:["🎌 Tōshō-gū: cedri + oro = atmosfera da anime fantasy"],b:84,st:"ok",
 nt:"⚠️ BUS OKUNIKKO RARO: Parti da Tokyo col PRIMO Tobu Express da Asakusa per avere tutto il pomeriggio.",
 schedule:[
   {id:1,time:"07:30",txt:"🚃 Primo Tobu Limited Express da Asakusa → Nikkō"},
   {id:2,time:"09:30",txt:"Arrivo Nikkō · deposita bagagli"},
   {id:3,time:"10:00",txt:"🌉 Ponte Shinkyo Bridge"},
   {id:4,time:"10:30",txt:"⛩️ Tōshō-gū Shrine · le tre scimmiette"},
   {id:5,time:"13:30",txt:"🚌 Bus Okunikko → Cascata Kegon → Lago Chuzenji"},
   {id:6,time:"16:00",txt:"🐉 Ryuzu Falls se c'è tempo"},
 ],exp:[]},

{n:4,d:"31/05",dow:"Dom",c:"Nikkō → Aizuwakamatsu → Fukushima",j:"日光→会津若松→福島",p:1,sl:"✅ YUMORI ONSEN HOSTEL",
 a:["Treno Aizuwakamatsu (via Koriyama)","🌀 SAZAEDO TEMPLE: tempio a doppia elica — UNICO!","Castello Tsuruga-jo","Treno Fukushima sera"],
 m:["🎌 Sazaedo: spirale mistica buddista"],b:58,st:"ok",
 nt:"Sazaedo + castello in 2-3h, poi verso Fukushima.",
 schedule:[
   {id:1,time:"08:00",txt:"Treni locali Nikkō → Utsunomiya → Kōriyama → Aizu-Wakamatsu"},
   {id:2,time:"11:30",txt:"Arrivo Aizu-Wakamatsu · locker bagagli"},
   {id:3,time:"12:00",txt:"🌀 Sazaedo Temple — doppia elica legno senza chiodi"},
   {id:4,time:"13:30",txt:"Pranzo: Sauce Katsudon — specialità locale"},
   {id:5,time:"14:30",txt:"🏯 Castello Tsuruga-jo"},
   {id:6,time:"17:00",txt:"Treno per Fukushima"},
 ],exp:[]},

{n:5,d:"01/06",dow:"Lun",c:"Fukushima → Sendai",j:"福島→仙台",p:1,sl:"Sendai Guest House Umebachi",
 a:["🦊 ZAO FOX VILLAGE (Shiroishi) — centinaia di volpi libere!","Arrivo Sendai","🐮 Cena: GYUTAN"],
 m:["🎌 ZAO FOX VILLAGE: spiriti kitsune da anime 🦊"],b:70,st:"ok",
 nt:"⚠️ Bus per Zao Fox Village RARO — taxi in alternativa.",
 schedule:[
   {id:1,time:"08:30",txt:"Treno Fukushima → Shiroishi-Zao"},
   {id:2,time:"09:30",txt:"🦊 Zao Fox Village — taxi/bus dalla stazione"},
   {id:3,time:"12:00",txt:"Treno per Sendai · check-in ostello"},
   {id:4,time:"14:00",txt:"Esplora Sendai — Jozenji-dori, Kokubuncho"},
   {id:5,time:"18:30",txt:"🐮 Gyutan da Kisuke o Rikyu"},
 ],exp:[]},

{n:6,d:"02/06",dow:"Mar",c:"Sendai → Yamadera",j:"仙台→山寺",p:1,sl:"Sendai Guest House Umebachi",
 a:["⛩️ YAMADERA — 1015 gradini nel bosco sacro","Vista dalla cima: vallata + tempio","Rientro Sendai sera"],
 m:["⛩️ Yamadera: paesaggio da opening anime fantasy"],b:55,st:"critical",
 nt:"🚨 FIX GEMINI: STAGIONE TSUYU attiva! Gore-Tex obbligatorio + calcola +30% tempo per pioggia/umidità. Campo base Sendai.",
 schedule:[
   {id:1,time:"08:00",txt:"Lasci bagaglio grosso in ostello · zaino leggero"},
   {id:2,time:"08:30",txt:"🚃 Senzan Line Sendai → Yamadera (~1h)"},
   {id:3,time:"09:30",txt:"⛩️ 1015 gradini nel bosco di cedri — PORTA GORE-TEX!"},
   {id:4,time:"11:30",txt:"Vista dalla cima sulla vallata · haiku di Bashō"},
   {id:5,time:"14:00",txt:"🚃 Rientro Sendai"},
 ],exp:[]},

{n:7,d:"03/06",dow:"Mer",c:"Sendai → Matsushima",j:"仙台→松島",p:1,sl:"Sendai Guest House Umebachi",
 a:["🌊 MATSUSHIMA — una delle 3 viste più belle del Giappone","Isole coperte di pini","Crociera nella baia"],
 m:["🌊 Matsushima: uno dei 3 paesaggi sacri"],b:50,st:"ok",
 nt:"Senseki Line da Sendai ~30min.",
 schedule:[
   {id:1,time:"09:00",txt:"🚃 Senseki Line Sendai → Matsushima-Kaigan"},
   {id:2,time:"09:45",txt:"🚢 Crociera nella baia tra isole coperte di pini"},
   {id:3,time:"11:30",txt:"🌉 Fukuura Bridge (porta fortuna)"},
   {id:4,time:"12:00",txt:"⛩️ Tempio Zuigan-ji"},
   {id:5,time:"13:00",txt:"🦪 Pranzo: ostriche grigliate — specialità Matsushima"},
 ],exp:[]},

{n:8,d:"04/06",dow:"Gio",c:"Sendai → Morioka",j:"仙台→盛岡",p:1,sl:"Ostello Morioka",
 a:["📦 TAKKYUBIN → spedisci valigia a Kanazawa","Shinkansen Hayabusa Sendai→Morioka","ROCK-SPLITTING CHERRY TREE","🍜 WANKO SOBA CHALLENGE — obiettivo >100 ciotoline!"],
 m:["🍜 Wanko Soba: il trick è NON bere il brodo","📦 Takkyubin: viaggi leggero"],b:86,st:"ok",
 nt:"📦 Yamato Takkyubin: ~1.500-2.000¥, arriva domani a Kanazawa.",
 schedule:[
   {id:1,time:"08:30",txt:"📦 TAKKYUBIN: Konbini/hotel — spedisci valigia 20kg a Kanazawa"},
   {id:2,time:"09:30",txt:"🚄 Shinkansen Hayabusa Sendai → Morioka (50min)"},
   {id:3,time:"10:30",txt:"Check-in ostello · deposita zaino"},
   {id:4,time:"11:00",txt:"🌸 Ishiwarizakura: ciliegio che spacca il granito"},
   {id:5,time:"12:00",txt:"🍡 KONZAYA: miso secolare"},
   {id:6,time:"13:00",txt:"🍜 WANKO SOBA da AZUMAYA — 100+ ciotoline! NON bere brodo!"},
 ],exp:[]},

{n:9,d:"05/06",dow:"Ven",c:"Morioka → Tazawa Lake",j:"盛岡→田沢湖",p:1,sl:"✅ Katakurinohana — 86€ · Booking #655173907",
 a:["Shinkansen Morioka→Tazawako","🏃 RUN 1: GIRO LAGO TAZAWA — 20.4km","📍 Statua dorata Tatsuko","♨️ NYUTO ONSEN kashikiri"],
 m:["♨️ Nyuto Onsen: acqua lattiginosa bosco","🌊 Lago Tazawa: color indaco"],b:132,st:"critical",
 nt:"🚨 FIX GEMINI: STAGIONE TSUYU! Gore-Tex + calcola +30% tempo. Kashikiri tatuaggio ok 🛁",
 schedule:[
   {id:1,time:"08:00",txt:"🚄 Shinkansen Morioka → Tazawako (40min) · zaino leggero!"},
   {id:2,time:"09:00",txt:"Check-in Katakurinohana · deposita zaino"},
   {id:3,time:"09:30",txt:"🏃 START: giro lago 20.4km — PORTA GORE-TEX per Tsuyu!"},
   {id:4,time:"12:00",txt:"📍 Statua dorata di Tatsuko (km ~10)"},
   {id:5,time:"13:00",txt:"🏁 Fine corsa · meritato riposo"},
   {id:6,time:"16:00",txt:"♨️ Nyuto Onsen kashikiri — acqua lattiginosa (tatuaggio ok!)"},
 ],exp:[]},

{n:10,d:"06/06",dow:"Sab",c:"Tazawa → Nagano",j:"田沢湖→長野",p:1,sl:"1166 Backpackers Nagano",
 a:["Colazione vista lago","🚄 IL GRANDE SALTO: Komachi→Omiya + Hokuriku (~4h)","💡 Bento Omiya","⛩️ ZENKŌ-JI + tunnel Okaidan Meguri"],
 m:["🚄 Komachi rosso → Hokuriku: traversata Giappone"],b:178,st:"ok",
 nt:"22.000¥ di treno oggi — il giorno più caro.",
 schedule:[
   {id:1,time:"07:30",txt:"🍳 Colazione vista lago"},
   {id:2,time:"09:00",txt:"🚄 Shinkansen Komachi → Omiya (~3h)"},
   {id:3,time:"12:00",txt:"💡 Omiya: bento regionali nell'hub"},
   {id:4,time:"13:00",txt:"🚄 Hokuriku Shinkansen → Nagano"},
   {id:5,time:"15:30",txt:"⛩️ ZENKŌ-JI: tempio immenso"},
   {id:6,time:"16:30",txt:"🌑 Okaidan Meguri: tunnel buio — chiave paradiso"},
 ],exp:[]},

{n:11,d:"07/06",dow:"Dom",c:"Nagano — Jigokudani",j:"長野",p:1,sl:"1166 Backpackers Nagano",
 a:["🐒 JIGOKUDANI MONKEY PARK — macachi onsen termali","Porta Kairo (scaldini)","Day trip OBUSE (Hokusai)"],
 m:["🐒 Jigokudani: scimmie onsen = slice-of-life anime"],b:57,st:"ok",
 nt:"Snow Monkey Pass copre tutto — compralo alla stazione.",
 schedule:[
   {id:1,time:"08:30",txt:"🚃 Snow Monkey Pass · treno Nagano → Yudanaka"},
   {id:2,time:"09:30",txt:"🚌 Bus Yudanaka → Jigokudani"},
   {id:3,time:"10:00",txt:"🐒 Jigokudani Monkey Park — macachi onsen"},
   {id:4,time:"13:30",txt:"🚃 Rientro Nagano"},
 ],exp:[]},

{n:12,d:"08/06",dow:"Lun",c:"Nagano → Kamikōchi → Suwa",j:"長野→上高地→諏訪",p:1,sl:"✅ Hotel Lafonteine Suwa — Booking #655184791",
 a:["Treno→Matsumoto + bus KAMIKŌCHI","🏔️ HIKE: Taisho Pond → Kappabashi Bridge","Fiume Azusa azzurro + Alpi 3000m"],
 m:["🎌 Kamikōchi: fiume azzurro + Alpi anime","🏔️ Location Kimi no Na wa 🌠"],b:78,st:"ok",
 nt:"Lafonteine Suwa: vasca onsen privata in camera.",
 schedule:[
   {id:1,time:"07:30",txt:"🚃 Treno Nagano → Matsumoto"},
   {id:2,time:"08:30",txt:"🚌 Matsumoto Dentetsu + bus per Kamikōchi"},
   {id:3,time:"10:00",txt:"🏔️ Taisho Pond: alberi morti + Alpi"},
   {id:4,time:"11:00",txt:"🌊 Kappabashi Bridge: fiume Azusa azzurro"},
   {id:5,time:"14:00",txt:"🚌 Rientro Matsumoto → treno Kamisuwa"},
   {id:6,time:"16:30",txt:"📸 Taxi/hike TATEISHI PARK — tramonto lago Suwa 🌠"},
 ],exp:[]},

{n:13,d:"09/06",dow:"Mar",c:"Suwa → Toyama → Shirakawa-gō",j:"諏訪→富山→白川郷",p:1,sl:"✅ Minshuku Kanjiya · Booking #655176115",
 a:["🏃 RUN 2: GIRO LAGO SUWA (16km)","♨️ ONSEN KATAKURAKAN","Treno Suwa→Toyama","🚌 ULTIMO BUS 17:00 Toyama→Shirakawa-gō","🏠 Cena intorno irori"],
 m:["🌠 Tateishi Park: cratere Itomori — Your Name!","🏠 Shirakawa-gō: senza tempo dopo tramonto"],b:281,st:"critical",
 nt:"🚨 FIX GEMINI CRITICO: VERIFICA CENA INCLUSA in prenotazione! Villaggio chiuso 17:00 = nessun ristorante. 🚨 ULTIMO BUS 17:00!",
 schedule:[
   {id:1,time:"06:30",txt:"🏃 START: giro lago Suwa 16km"},
   {id:2,time:"10:30",txt:"♨️ Onsen Katakurakan — vasca Sennin-buro"},
   {id:3,time:"12:30",txt:"🚃 Treno Suwa → Matsumoto → Toyama (~3h)"},
   {id:4,time:"15:30",txt:"Arrivo Toyama · CORRI al bus Nohi"},
   {id:5,time:"17:00",txt:"🚌 ULTIMO BUS Toyama → Shirakawa-gō — NON PERDERLO!"},
   {id:6,time:"18:30",txt:"Arrivo villaggio · check-in · 🚨 VERIFICA CENA INCLUSA 🚨"},
   {id:7,time:"19:00",txt:"🏠 Cena casalinga tatami con irori"},
 ],exp:[]},

{n:14,d:"10/06",dow:"Mer",c:"Shirakawa-gō → Kanazawa",j:"白川郷→金沢",p:1,sl:"Kanazawa Share House GAOoo",
 a:["🌅 Passeggiata mattutina — Gassho-zukuri nebbia","Bus Shirakawa-gō→Kanazawa","📦 RITIRO VALIGIA (Takkyubin)!","🌳 KENROKU-EN","🏘️ HIGASHI CHAYA","🍣 Omicho Market"],
 m:["🌳 Kenroku-en: paesaggio classico","🏯 Nagamachi: atmosfera samurai"],b:61,st:"ok",
 nt:"Bus Hokutetsu 1.850¥. 📦 Ritiro valigia!",
 schedule:[
   {id:1,time:"06:30",txt:"🌅 Passeggiata villaggio prima turisti — nebbia tra case paglia"},
   {id:2,time:"08:30",txt:"🚌 Bus Hokutetsu → Kanazawa (~1h15)"},
   {id:3,time:"10:00",txt:"📦 RITIRO VALIGIA ostello/hotel — eccola!"},
   {id:4,time:"11:00",txt:"🌳 Kenroku-en: uno dei 3 giardini più belli"},
   {id:5,time:"13:00",txt:"🦞 Omicho Market: Kaisendon — riso sommerso sashimi"},
   {id:6,time:"15:00",txt:"🏘️ Higashi Chaya: quartiere geishe"},
 ],exp:[]},

{n:15,d:"11/06",dow:"Gio",c:"Kanazawa → Gujo → Nagoya",j:"金沢→郡上→名古屋",p:1,sl:"2025 Renewal Open - Anshin Oyado Nagoya",
 a:["🎨 STAGNO DI MONET (Seki): acqua cristallina + carpe koi — GRATIS","🏯 GUJO HACHIMAN: castello + città canali","Treno Nagoya pomeriggio"],
 m:["🎨 Stagno Monet: a giugno perfetto","🏯 Gujo Hachiman: atmosfera RPG"],b:96,st:"ok",
 nt:"⚠️ Bus per Namonaki Ike rarissimi — controlla orari!",
 schedule:[
   {id:1,time:"07:30",txt:"🚃 Treno Kanazawa → Gifu"},
   {id:2,time:"09:30",txt:"🚌 Bus locale Seki → Namonaki Ike (calcola 1h+)"},
   {id:3,time:"11:00",txt:"🎨 Stagno di Monet — acqua cristallina, ninfee, carpe"},
   {id:4,time:"14:00",txt:"🏯 Gujo Hachiman: castello + canali medievali"},
   {id:5,time:"18:00",txt:"Check-in Nagoya"},
 ],exp:[]},

{n:16,d:"12/06",dow:"Ven",c:"Nagoya (Ghibli Park) → Kyoto",j:"名古屋→京都",p:1,sl:"Guesthouse KYOTO COMPASS",
 a:["🌳 GHIBLI PARK (Expo City Aichi) — minimo 5-6h","Locker stazione → parco → shinkansen","🚄 Shinkansen Nagoya→Kyoto (35min)"],
 m:["🌳 GHIBLI PARK: personaggi Miyazaki"],b:133,st:"ok",
 nt:"📌 Biglietti 10 aprile — l-tike.com/statics/ghiblipark-en/",
 schedule:[
   {id:1,time:"08:30",txt:"Lascia zaino coin locker Nagoya Station"},
   {id:2,time:"09:00",txt:"🚃 Linimo → Ai-Chikyuhaku Kinen Koen"},
   {id:3,time:"09:30",txt:"🌳 GHIBLI PARK — Casa Satsuki/Mei, Città Ferro"},
   {id:4,time:"16:00",txt:"🚃 Rientro Nagoya · ritiro zaino"},
   {id:5,time:"17:00",txt:"🚄 Shinkansen Nagoya → Kyoto (35min)"},
 ],exp:[]},

{n:17,d:"13/06",dow:"Sab",c:"Kyoto Centro",j:"京都",p:1,sl:"Guesthouse KYOTO COMPASS",
 a:["🌅 Fushimi Inari ALL'ALBA — prima 6:00","Sannenzaka + Higashiyama","🍡 MOCHI MOCHI live","🍳 Sera: KICHI KICHI OMURICE","🛍️ POKEMON CENTER KYOTO"],
 m:["🦊 Fushimi Inari alba","🍳 Kichi Kichi: show omurice virale"],b:63,st:"ok",
 nt:"📌 Kichi Kichi: prenota settimane prima. Piano B: Menbaka Fire Ramen.",
 schedule:[
   {id:1,time:"05:30",txt:"⏰ Sveglia brutale"},
   {id:2,time:"06:00",txt:"🏃 Fushimi Inari alba — torii silenzio · cima Monte Inari"},
   {id:3,time:"10:30",txt:"🏛️ Kiyomizu-dera · Sannenzaka · Ninenzaka"},
   {id:4,time:"14:00",txt:"🛍️ Pokemon Center Kyoto (Takashimaya T8)"},
   {id:5,time:"19:00",txt:"🍳 Kichi Kichi Omurice (prenotato) o 🔥 Menbaka Fire Ramen"},
 ],exp:[]},

{n:18,d:"14/06",dow:"Dom",c:"Kyoto Ovest (Arashiyama)",j:"京都・嵐山",p:1,sl:"Guesthouse KYOTO COMPASS",
 a:["🎍 Arashiyama: foresta bambù alba + Tenryu-ji","🗿 OTAGI NENBUTSUJI: 1200 statue — nascosto!","🎵 ORGEL-DO: carillon","🏯 Kinkaku-ji pomeriggio"],
 m:["🗿 Otagi Nenbutsuji: ogni statua scolpita da devoto"],b:51,st:"ok",
 nt:"Otagi Nenbutsuji: 20min a piedi da bambù — zero turisti.",
 schedule:[
   {id:1,time:"07:00",txt:"🎍 Arashiyama: foresta bambù — entra subito bosco"},
   {id:2,time:"08:00",txt:"⛩️ Tenryu-ji (giardino)"},
   {id:3,time:"09:00",txt:"🗿 OTAGI NENBUTSUJI: 20min salita — 1.200 statue diverse"},
   {id:4,time:"13:00",txt:"🥢 Nishiki Market: street food"},
   {id:5,time:"15:00",txt:"🏯 Kinkaku-ji (Padiglione d'Oro)"},
 ],exp:[]},

{n:19,d:"15/06",dow:"Lun",c:"Kyoto → Osaka",j:"京都→大阪",p:1,sl:"Guesthouse U-En Osaka",
 a:["Mattina: Nishiki + shopping","Kyoto→Osaka (~30min)","🌃 DOTONBORI — neon, takoyaki","🦞 Kuromon Ichiba","🌃 Shinsekai + Torre Tsūtenkaku"],
 m:["🌃 Dotonbori: l'Osaka da anime"],b:47,st:"ok",
 nt:"Zona ostello: Namba o Shinsaibashi.",
 schedule:[
   {id:1,time:"11:00",txt:"🚃 Special Rapid Kyoto → Osaka (~30min)"},
   {id:2,time:"12:00",txt:"Check-in · drop bagagli"},
   {id:3,time:"13:30",txt:"🏙️ Shinsekai: quartiere retrò · Torre Tsūtenkaku"},
   {id:4,time:"15:30",txt:"🦞 Kuromon Ichiba: assaggia tutto"},
   {id:5,time:"17:30",txt:"🌃 DOTONBORI: foto Glico Man"},
   {id:6,time:"18:30",txt:"🐙 Takoyaki Kukuru · Okonomiyaki · Kushikatsu"},
 ],exp:[]},

{n:20,d:"16/06",dow:"Mar",c:"Osaka — USJ",j:"大阪",p:1,sl:"Guesthouse U-En Osaka",
 a:["🎮 UNIVERSAL STUDIOS JAPAN — full day!","Super Nintendo World (Mario/Zelda/DK)","Harry Potter Wizarding World","💡 Express Pass FONDAMENTALE"],
 m:["🎌 Super Nintendo World: Mario, Zelda, DK"],b:195,st:"ok",
 nt:"📌 Express Pass Klook. Nintendo World senza lotteria.",
 schedule:[
   {id:1,time:"08:00",txt:"🚃 Treno → Universal City · arriva 1h prima apertura"},
   {id:2,time:"09:00",txt:"🎮 APERTURA: corri Super Nintendo World"},
   {id:3,time:"11:00",txt:"🎢 Attrazioni anime tempo limitato (Demon Slayer/JJK/CSM)"},
   {id:4,time:"14:30",txt:"⚡ Wizarding World Harry Potter"},
   {id:5,time:"20:00",txt:"Rientro — ramen veloce"},
 ],exp:[]},

{n:21,d:"17/06",dow:"Mer",c:"Osaka — Den Den Town",j:"大阪",p:1,sl:"Guesthouse U-En Osaka",
 a:["🎌 DEN DEN TOWN: shopping otaku","🐾 ANIMEAL Cafe: capybara 12:00-15:30","🎣 ZAUO Fishing Restaurant","💼 PREPARAZIONE ZAINI VAN"],
 m:["🎌 Den Den Town: tana otaku Osaka","🐾 Animeal: capybara + esotici"],b:130,st:"ok",
 nt:"Ultima notte letto normale 3 settimane — bucato!",
 schedule:[
   {id:1,time:"10:00",txt:"🎌 Den Den Town: Super Potato · modellismo · action figure"},
   {id:2,time:"12:00",txt:"🐾 ANIMEAL Cafe Shinsaibashi: capybara 12:00-15:30"},
   {id:3,time:"18:30",txt:"🎣 ZAUO Fishing Restaurant Namba"},
   {id:4,time:"21:00",txt:"💼 PREPARAZIONE VAN: bucato · organizza · provviste"},
 ],exp:[]},

{n:22,d:"18/06",dow:"Gio",c:"Osaka → Amanohashidate → Ine",j:"大阪→天橋立→伊根",p:2,sl:"🚐 Van (Michi-no-Eki)",
 a:["🚐 Ritiro van mattina","🛒 Spesa grossa supermercato","🌉 AMANOHASHIDATE: mata-nozoki — uno dei 3 più belli!","🌊 INE NO FUNAYA: case-barca tramonto","🌅 Prima notte van"],
 m:["🚐 INIZIO VAN LIFE!","🌉 Amanohashidate: passaggio Osaka"],b:55,st:"ok",
 nt:"Guida sinistra! Amanohashidate ~2h da Osaka, poi 20min Ine.",
 schedule:[
   {id:1,time:"08:30",txt:"🚐 Ritiro van · briefing batteria/letto"},
   {id:2,time:"09:30",txt:"🛒 Mega-supermercato: acqua, snack, ramen, caffè, frutta"},
   {id:3,time:"14:00",txt:"🌉 Amanohashidate: mata-nozoki — drago che vola"},
   {id:4,time:"16:30",txt:"🚗 20min → Ine no Funaya"},
   {id:5,time:"17:30",txt:"🌊 Tramonto case-barca legno acqua"},
   {id:6,time:"20:00",txt:"🅿️ Michi-no-Eki — prima dormita van!"},
 ],exp:[]},

{n:23,d:"19/06",dow:"Ven",c:"Ine → Tottori",j:"伊根→鳥取",p:2,sl:"🚐 Michi-no-Eki",
 a:["🌊 URADOME COAST: hike scogliere — grotte marine","🏜️ DUNE SABBIA TOTTORI: Sahara giapponese — corsa tramonto!","🎨 Sand Museum"],
 m:["🏜️ Dune Tottori: immagine anti-Giappone"],b:50,st:"ok",
 nt:"Tottori: granchi e pesce fresco porto.",
 schedule:[
   {id:1,time:"10:00",txt:"🌊 Uradome Coast: hike sentieri scogliere"},
   {id:2,time:"14:00",txt:"🎨 Sand Museum: sculture sabbia"},
   {id:3,time:"16:00",txt:"🏃 RUNNER: corsa Dune Tottori tramonto"},
   {id:4,time:"18:30",txt:"🦀 Cena: granchi e pesce porto"},
 ],exp:[]},

{n:24,d:"20/06",dow:"Sab",c:"Tottori → Matsue",j:"鳥取→松江",p:2,sl:"🚐 Michi-no-Eki",
 a:["🕵️ HOKUEI: Museo Detective Conan + statue","🏯 MATSUE-JŌ: uno dei 12 castelli originali","🌅 Lago Shinjiko tramonto"],
 m:["🎌 DETECTIVE CONAN: Hokuei = hometown creatore 🕵️"],b:50,st:"ok",
 nt:"Matsue-jo: castello originale — legno scuro.",
 schedule:[
   {id:1,time:"10:00",txt:"🕵️ Conan Town: Gosho Aoyama Manga Factory · statue"},
   {id:2,time:"13:30",txt:"🏯 Castello Matsue — legno scuro originale"},
   {id:3,time:"15:30",txt:"Horikawa boat: giro fossato"},
   {id:4,time:"17:30",txt:"🌅 Van Lago Shinji — tramonto isoletta Yomegashima"},
 ],exp:[]},

{n:25,d:"21/06",dow:"Dom",c:"Matsue → Hiroshima",j:"松江→広島",p:2,sl:"🚐 Van",
 a:["⛩️ IZUMO TAISHA: tra santuari più sacri","Guida sud attraverso Honshu","Arrivo Hiroshima sera"],
 m:["⛩️ Izumo Taisha: gravità diversa — si percepisce"],b:45,st:"ok",
 nt:"Shimenawa gigante — tutti dei Giappone si riuniscono qui.",
 schedule:[
   {id:1,time:"08:00",txt:"⛩️ Izumo Taisha: gigantesco shimenawa"},
   {id:2,time:"11:00",txt:"🚗 TAGLIO: lasci Mar Giappone, attraversi montagne sud"},
   {id:3,time:"19:00",txt:"🍜 Okonomiyaki Hiroshima — strati con noodles"},
 ],exp:[]},

{n:26,d:"22/06",dow:"Lun",c:"Hiroshima / Miyajima",j:"広島・宮島",p:2,sl:"🚐 Van",
 a:["🚐 Van al porto — parcheggio","⛴️ Traghetto MIYAJIMA (~10min)","⛩️ ITSUKUSHIMA SHRINE: torii nell'acqua","🦌 Cervi liberi isola"],
 m:["⛩️ Itsukushima: torii acqua — icona Giappone"],b:55,st:"ok",
 nt:"Torii galleggiante alta marea — controlla maree!",
 schedule:[
   {id:1,time:"08:30",txt:"🚗 Van porto Miyajimaguchi · parcheggio (~10€)"},
   {id:2,time:"09:00",txt:"⛴️ Traghetto Miyajima (10min · ~400¥ A/R)"},
   {id:3,time:"09:30",txt:"⛩️ Itsukushima Shrine + torii acqua (alta marea!)"},
   {id:4,time:"11:00",txt:"🏔️ Monte Misen: hike/funivia — Mare Seto"},
   {id:5,time:"13:30",txt:"🦪 Ostriche grigliate · Momiji Manju"},
 ],exp:[]},

{n:27,d:"23/06",dow:"Mar",c:"Etajima",j:"江田島",p:2,sl:"🚐 Van",
 a:["⛴️ Traghetto ETAJIMA — isola rurale Mare Seto","Esplorazione van — natura, zero turisti","Giornata lenta 🌿"],
 m:[],b:45,st:"ok",
 nt:"Strade costiere deserte, agrumi picco mare. Guida pura.",
 schedule:[
   {id:1,time:"09:00",txt:"⛴️ Traghetto veicolare Hiroshima → Etajima"},
   {id:2,time:"09:30",txt:"🚗 Strade costiere deserte · agrumi picco mare"},
   {id:3,time:"13:00",txt:"Pranzo localino isola"},
   {id:4,time:"17:00",txt:"⛴️ Rientro · 🚗 Partenza Nagato"},
 ],exp:[]},

{n:28,d:"24/06",dow:"Mer",c:"Hiroshima → Nagato",j:"広島→長門",p:2,sl:"🚐 Michi-no-Eki",
 a:["⛩️ MOTONOSUMI SHRINE: 123 torii rossi bordo scogliera!","🌉 TSUNOSHIMA: ponte bianco mare turchese"],
 m:["⛩️ Motonosumi: iconico","🌉 Tsunoshima: irreale"],b:45,st:"ok",
 nt:"Domani Kanmon Tunnel → Kyushu.",
 schedule:[
   {id:1,time:"11:00",txt:"⛩️ MOTONOSUMI SHRINE: 123 torii picco mare"},
   {id:2,time:"14:30",txt:"🌉 TSUNOSHIMA BRIDGE: ponte bianco cobalto"},
   {id:3,time:"16:30",txt:"🚗 Avvicinamento Stretto Kanmon"},
 ],exp:[]},

{n:29,d:"25/06",dow:"Gio",c:"Nagato → Fukuoka",j:"長門→福岡",p:2,sl:"🚐 Van",
 a:["🗡️ SHOHACHIMAN SHRINE: pietra DEMON SLAYER — Tanjiro spaccata qui!","Kanmon Tunnel → Kyushu","🏮 YATAI Nakasu: bancarelle fiume"],
 m:["🎌 DEMON SLAYER: Shohachiman = pietra Tanjiro!"],b:55,st:"ok",
 nt:"Kanmon Tunnel ~1.000¥. Yatai: dal tramonto.",
 schedule:[
   {id:1,time:"09:00",txt:"🚗 Kanmon: ponte/tunnel sottomarino → Kyushu!"},
   {id:2,time:"10:30",txt:"⛩️ Shohachiman: bosco · Itto-seki = masso Tanjiro (Demon Slayer)"},
   {id:3,time:"19:00",txt:"🏮 Nakasu Yatai fiume · Hakata Ramen"},
 ],exp:[]},

{n:30,d:"26/06",dow:"Ven",c:"Fukuoka → Yanagawa",j:"福岡→柳川",p:2,sl:"🚐 Van",
 a:["🗿 NANZO-IN: Buddha sdraiato più grande bronzo mondo (41m!)","🚣 YANAGAWA RIVER CRUISE: barche piatte canali","🍣 Unaju: anguilla laccata"],
 m:["🗿 Nanzo-in: quasi nessun turista straniero"],b:55,st:"ok",
 nt:"Nanzo-in: stazione Kido-Nanzoin-mae.",
 schedule:[
   {id:1,time:"10:00",txt:"🗿 NANZO-IN: Buddha reclinato bronzo enorme"},
   {id:2,time:"13:30",txt:"🚣 Donkobune: barche pertica canali"},
   {id:3,time:"15:30",txt:"🍣 Unagi no Seiro Mushi: anguilla vapore"},
 ],exp:[]},

{n:31,d:"27/06",dow:"Sab",c:"Yanagawa → Kumamoto",j:"柳川→熊本",p:2,sl:"🚐 Van",
 a:["🌊 NAGABETA SEABED ROAD: pali mare ⚠️ Verificare maree!","🏴‍☠️ Statua Jinbe ONE PIECE","🏴‍☠️ KUMAMOTO CITY: statue One Piece bronzo"],
 m:["🎌 Nagabeta: Spirited Away realtà!","🏴‍☠️ ONE PIECE Kumamoto"],b:45,st:"ok",
 nt:"📌 Calcola marea prima partire!",
 schedule:[
   {id:1,time:"09:00",txt:"🌊 NAGABETA SEABED ROAD — verifica MAREA!"},
   {id:2,time:"12:00",txt:"🏴‍☠️ Kumamoto: statue One Piece bronzo (Jinbe)"},
   {id:3,time:"15:00",txt:"🏯 Castello Kumamoto esterno"},
 ],exp:[]},

{n:32,d:"28/06",dow:"Dom",c:"Kumamoto → Takachiho",j:"熊本→高千穂",p:2,sl:"🚐 Van",
 a:["🌿 KAMISHIKIMI KUMANOIMASU: scalinata magica foresta","🏞️ GOLA TAKACHIHO: canyon sacro mitologia","🚣 Barca gola — cascate + acqua smeraldo (~25€)"],
 m:["🎌 Takachiho: luogo sacro — atmosfera anime"],b:65,st:"ok",
 nt:"Barca: prenotare o arrivare presto. Kamishikimi ~30min.",
 schedule:[
   {id:1,time:"10:30",txt:"⛩️ KAMISHIKIMI: scalinata bosco cedri — Hotarubi no Mori e"},
   {id:2,time:"14:00",txt:"🚣 GOLA TAKACHIHO: barchetta canyon — sotto cascata Minainotaki"},
 ],exp:[]},

{n:33,d:"29/06",dow:"Lun",c:"Takachiho → Kurokawa",j:"高千穂→黒川",p:2,sl:"🚐 Van",
 a:["🌋 MONTE ASO: corsa bordo cratere attivo — paesaggio lunare","♨️ KUROKAWA ONSEN: kashikiri bosco — tatuaggio ok!","Relax vulcanico 🌿"],
 m:["🌋 Monte Aso: cratere attivo — alieno"],b:55,st:"ok",
 nt:"📌 Aso: verifica attività vulcanica! Kurokawa kashikiri: prenotare.",
 schedule:[
   {id:1,time:"08:00",txt:"📱 Controlla allerta vulcanica Monte Aso!"},
   {id:2,time:"09:00",txt:"🌋 MONTE ASO: corsa/trek prati Kusasenri con cavalli"},
   {id:3,time:"11:00",txt:"🔥 Se permesso: cratere Nakadake fumante"},
   {id:4,time:"15:00",txt:"♨️ KUROKAWA ONSEN: kashikiri ~2.000¥/h — acqua vulcanica"},
 ],exp:[]},

{n:34,d:"30/06",dow:"Mar",c:"Kurokawa → Yufuin → Beppu",j:"黒川→由布院→別府",p:2,sl:"🚐 Michi-no-Eki Beppu",
 a:["⚔️ HITA CITY — ŌYAMA DAM: Eren+Mikasa+Armin bronzo — Wall Maria!","🚂 BUNGO-MORI: LA PORTA DI SUZUME 🎌","🌋 YUFUIN: onsen village","Arrivo Beppu"],
 m:["🎌 ATTACK ON TITAN: Ōyama Dam = Wall Maria!","🎌 SUZUME: porta reale Shinkai"],b:55,st:"ok",
 nt:"App 'Attack on Titan in Hita' per AR Colossal Titan.",
 schedule:[
   {id:1,time:"10:30",txt:"⚔️ DIGA OYAMA: statua Eren+Mikasa+Armin — Wall Maria reale!"},
   {id:2,time:"12:00",txt:"🚂 BUNGO-MORI: stazione locomotive rovina — porta Suzume"},
   {id:3,time:"14:30",txt:"🥩 Yufuin: crocchette carne · passeggiata"},
 ],exp:[]},

{n:35,d:"01/07",dow:"Mer",c:"Beppu → Kunisaki",j:"別府→国東",p:2,sl:"🚐 Van",
 a:["🔴🔵 JIGOKU MEGURI: 9 hell hot springs (~15€)","Sunamushi: sabbia vulcanica calda","⛩️ Kunisaki: templi nascosti foresta"],
 m:["🎌 Beppu: colori non esistono natura"],b:50,st:"ok",
 nt:"Jigoku Meguri ~1.500¥. Sunamushi ~1.500¥.",
 schedule:[
   {id:1,time:"09:00",txt:"🔴 JIGOKU MEGURI: pozza sangue · blu cobalto · coccodrilli"},
   {id:2,time:"11:30",txt:"Sunamushi: sabbia vulcanica mare"},
   {id:3,time:"15:00",txt:"⛩️ FUTAGO-JI: tempio roccia — zero turisti"},
 ],exp:[]},

{n:36,d:"02/07",dow:"Gio",c:"Kunisaki → Matsuyama (Shikoku)",j:"国東→松山",p:2,sl:"🚐 Van",
 a:["🗿 USUKI STONE BUDDHAS — 59 buddha foresta (~5€)","⛴️ TRAGHETTO VEICOLARE → Matsuyama 🚢","Arrivo Shikoku"],
 m:["🎌 Shikoku: isola più autentica"],b:110,st:"ok",
 nt:"Traghetto veicolare: prenotato ✓",
 schedule:[
   {id:1,time:"09:00",txt:"🗿 Usuki Stone Buddhas: 59 buddha foresta"},
   {id:2,time:"13:00",txt:"Rientro porto"},
   {id:3,time:"15:30",txt:"⛴️ IMBARCO traghetto veicolare Beppu→Matsuyama"},
 ],exp:[]},

{n:37,d:"03/07",dow:"Ven",c:"Matsuyama → Onomichi",j:"松山→尾道",p:2,sl:"🚐 Van",
 a:["🛁 DŌGO ONSEN: 3000 anni — ispirazione Spirited Away! Kashikiri 🎌","🚂 SHIMONADA STATION: stazione nel mare 📸","🌊 Arrivo ONOMICHI: città artisti e gatti"],
 m:["🎌 DŌGO ONSEN = bagni Yubaba!","🎌 Shimonada: stazione mare"],b:55,st:"ok",
 nt:"📌 Dōgo kashikiri: prenotare. Shimonada: pochi treni giorno.",
 schedule:[
   {id:1,time:"09:00",txt:"🛁 DŌGO ONSEN: 3 piani legno — Città Incantata · Kashikiri tatuaggio"},
   {id:2,time:"16:00",txt:"🚂 STAZIONE SHIMONADA: minuscola mare · tramonto"},
 ],exp:[]},

{n:38,d:"04/07",dow:"Sab",c:"Shimanami Kaidō",j:"しまなみ海道",p:2,sl:"🚐 Van",
 a:["🚴 SHIMANAMI KAIDŌ: corsa/ciclovia ponti Mare Seto","Noleggio bici se non corri (~20€)","Soste Ōshima, Hakata-jima 🌊"],
 m:["🎌 Shimanami Kaidō: percorsi ciclabili più belli mondo"],b:45,st:"ok",
 nt:"Bici: Giant noleggio Onomichi Station.",
 schedule:[
   {id:1,time:"08:00",txt:"🅿️ Parcheggio van inizio Shimanami (Imabari Shikoku)"},
   {id:2,time:"08:30",txt:"🏃 RUNNER: ponti sospesi 6 isole Mare Seto"},
   {id:3,time:"11:00",txt:"Ponte Kurushima-Kaikyo + isola Oshima"},
 ],exp:[]},

{n:39,d:"05/07",dow:"Dom",c:"Onomichi → Naruto",j:"尾道→鳴門",p:2,sl:"🚐 Michi-no-Eki Naruto",
 a:["Attraversamento Shikoku","🌀 UZUSHIO: barca vortici Naruto 🍥","Uzu-no-Michi: passerella vetro"],
 m:["🎌 NARUTO: vortici = simbolo Uzumaki 🍥"],b:60,st:"ok",
 nt:"Barca vortici: verificare orari marea.",
 schedule:[
   {id:1,time:"11:00",txt:"🌀 VORTICI NARUTO (Uzumaki): barca/ponte — cambio marea = giganti 🍥"},
   {id:3,time:"15:00",txt:"🚗 Ponte → Isola Awaji"},
 ],exp:[]},

{n:40,d:"06/07",dow:"Lun",c:"Naruto → Awaji Island",j:"鳴門→淡路島",p:2,sl:"🚐 Van",
 a:["🎌 NIJIGEN NO MORI — NARUTO × BORUTO PARK (~25€)","🌄 SONI HIGHLANDS: altipiani erbosi — quasi nessun turista"],
 m:["🎌 Naruto × Boruto Park: almeno 3-4h"],b:70,st:"ok",
 nt:"Nijigen no Mori: verificare orari.",
 schedule:[
   {id:1,time:"10:00",txt:"🎌 NIJIGEN NO MORI — Naruto & Boruto: Hokage · ostacoli alberi"},
   {id:2,time:"10:00",txt:"🍜 Ramen da Ichiraku (ristorante Naruto parco)"},
   {id:3,time:"18:00",txt:"🌄 Soni Highlands: praterie susuki — paesaggio mozzafiato"},
 ],exp:[]},

{n:41,d:"07/07",dow:"Mar",c:"Awaji → Nara",j:"淡路島→奈良",p:2,sl:"🚐 Van",
 a:["🦌 NARA: cervi liberi parco","🙏 TŌDAI-JI: Grande Buddha legno più grande mondo","🎋 TANABATA MATSURI: festival stelle!"],
 m:[],b:55,st:"critical",
 nt:"🚨 FIX GEMINI: PARCHEGGIA VAN FUORI NARA! Chiusure stradali Tanabata. 🚗 Avvicinati a piedi festival.",
 schedule:[
   {id:1,time:"10:00",txt:"🚗 ATTENZIONE: PARCHEGGIA BEN FUORI Parco Nara — chiusure stradali!"},
   {id:2,time:"10:30",txt:"🦌 Parco Nara cervi · NO cibo vista"},
   {id:3,time:"11:30",txt:"🙏 Tōdai-ji: Grande Buddha"},
   {id:4,time:"18:00",txt:"🎋 Tanabata Matsuri — avvicinati A PIEDI"},
 ],exp:[]},

{n:42,d:"08/07",dow:"Mer",c:"Nara → Osaka",j:"奈良→大阪",p:2,sl:"🚐 Van / Area sosta",
 a:["⛩️ KATSUOJI TEMPLE (Minoh): migliaia daruma 🎎","Guida Osaka","🚐 Pulizia van + preparazione bagagli","Ultima notte van"],
 m:["🎌 Katsuoji: daruma charm portare casa!"],b:40,st:"ok",
 nt:"Prepara tutto domani consegna van.",
 schedule:[
   {id:1,time:"09:00",txt:"🎎 KATSUOJI TEMPLE: migliaia Daruma rossi — compra talismano"},
   {id:2,time:"15:00",txt:"🚐 ULTIMA NOTTE VAN: area sosta vicino Osaka"},
   {id:3,time:"17:00",txt:"🧹 Svuota pulisci van"},
   {id:4,time:"18:00",txt:"📦 Valigione 20kg pesante/sporco · zainetto 7kg costumi Okinawa"},
 ],exp:[]},

{n:43,d:"09/07",dow:"Gio",c:"Osaka → Okinawa",j:"大阪→沖縄",p:3,sl:"Guesthouse Okinawa",
 a:["🚐 Consegna van — fine Fase Van! 22 giorni road 🎉","✈️ GK357 KIX 15:25 → OKA 17:40 (Jetstar · ZNBWPP)","Arrivo 17:40 — Giappone tropicale 🌺"],
 m:[],b:70,st:"ok",
 nt:"✅ VOLO CONFERMATO: GK357 · Check-in chiude 40min prima",
 schedule:[
   {id:1,time:"08:00",txt:"🚐 Riconsegna van deposito — 22 giorni road! 🎉"},
   {id:2,time:"09:30",txt:"📦 TAKKYUBIN: spedisci valigione Tokyo Haneda"},
   {id:3,time:"13:30",txt:"Arrivo KIX · check-in Jetstar (chiude 14:45!)"},
   {id:4,time:"15:25",txt:"✈️ Decollo KIX → Okinawa"},
   {id:5,time:"17:40",txt:"🌺 Atterraggio OKA — inizia blocco tropicale!"},
 ],exp:[]},

{n:44,d:"10/07",dow:"Ven",c:"Okinawa / Kerama",j:"沖縄・慶良間",p:3,sl:"Guesthouse Okinawa",
 a:["🤿 ISOLE KERAMA: snorkeling — tra migliori Asia","Coralli, pesci tropicali, tartarughe marine 🐢","Giornata libertà Pacifico"],
 m:[],b:65,st:"ok",
 nt:"⚠️ Stagione tifoni luglio: monitorare meteo!",
 schedule:[
   {id:1,time:"09:00",txt:"⛴️ Tomari Port Naha → Kerama (Tokashiki/Zamami) · ferry"},
   {id:2,time:"11:00",txt:"🤿 SNORKELING: Kerama Blue — coralli, pesci, tartarughe 🐢"},
   {id:3,time:"16:00",txt:"⛴️ Rientro Naha"},
 ],exp:[]},

{n:45,d:"11/07",dow:"Sab",c:"Okinawa / Kerama",j:"沖縄・慶良間",p:3,sl:"Guesthouse Okinawa",
 a:["🤿 Secondo giorno Kerama — snorkeling libero","🌺 Esplora Naha: Kokusai-dori, mercato Makishi","Cucina okinawana: goya champuru + awamori 🍶"],
 m:[],b:60,st:"ok",
 nt:"Giornata libera — senza fretta.",
 schedule:[
   {id:1,time:"09:00",txt:"🛵 Noleggia scooter o Yui Rail"},
   {id:2,time:"10:00",txt:"🏯 Castello Nakagusuku o Capo Chinen sud"},
   {id:3,time:"13:00",txt:"🧭 Mercato Makishi: labirinto colorato"},
   {id:4,time:"19:00",txt:"🥃 Goya Champuru + Awamori + birra Orion"},
 ],exp:[]},

{n:46,d:"12/07",dow:"Dom",c:"Okinawa",j:"沖縄",p:3,sl:"Guesthouse Okinawa",
 a:["🏯 Shuri Castle: antico regno Ryūkyū","Ultime passeggiate Naha","🍺 Awamori e street food serale — ultima notte tropicale"],
 m:[],b:55,st:"ok",
 nt:"Ultima notte Okinawa. Prepara bagaglio domani.",
 schedule:[
   {id:1,time:"09:30",txt:"🏯 Castello Shuri: architettura cinese — Regno Ryukyu"},
   {id:2,time:"14:00",txt:"🏖️ Ultima spiaggia: American Village o Naha"},
   {id:3,time:"20:00",txt:"📦 Prepara zainetto 7kg volo domani"},
 ],exp:[]},

{n:47,d:"13/07",dow:"Lun",c:"Okinawa → Kyoto (Pre-festival)",j:"沖縄→京都",p:3,sl:"Ostello Kyoto",
 a:["✈️ GK352 OKA 12:30 → KIX 14:40 (Jetstar · ZNBWPP)","🚄 Haruka train KIX→Kyoto (~75min)","Arrivo ~16:30 — deposita bagaglio","🏮 Passeggiata Gion — atmosfera pre-festival"],
 m:["🎌 Gion: setting Kimetsu no Yaiba"],b:75,st:"ok",
 nt:"✅ VOLO: GK352 · Check-in chiude 11:50",
 schedule:[
   {id:1,time:"10:30",txt:"🚗 Taxi/bus aeroporto Naha · check-in (chiude 11:50!)"},
   {id:2,time:"12:30",txt:"✈️ Decollo OKA → KIX"},
   {id:3,time:"14:40",txt:"Atterraggio Kansai"},
   {id:4,time:"15:00",txt:"🚄 Haruka Limited Express KIX → Kyoto"},
   {id:5,time:"17:30",txt:"🏮 GION & SHIJO-DORI: Yoiyoiyoiyama — carri, lanterne"},
 ],exp:[]},

{n:48,d:"14/07",dow:"Mar",c:"Kyoto → Tokyo (Yoiyama 🔥)",j:"京都→東京",p:3,sl:"Ostello Tokyo (Shinagawa/Kamata)",
 a:["🦊 Fushimi Inari alba — PRIMA 6:00","Philosopher's Path + Ginkaku-ji mattino","🔥 YOIYAMA pomeriggio/sera: strade chiuse, float illuminati 🎌","Indossa yukata 👘","🚄 Shinkansen Kyoto→Tokyo (lato DESTRO Fuji 🗻)"],
 m:["🎌 Yoiyama: festival 1100 anni — sii nel momento 🔥"],b:85,st:"critical",
 nt:"🚨 FIX GEMINI: PARTENZA SHINKANSEN 16:30-17:00 (NON 20:00!) per vedere Fuji! Tramonto ~19:00. Siediti lato DESTRO sedile E.",
 schedule:[
   {id:1,time:"10:00",txt:"🌸 Sentiero Filosofo → Ginkaku-ji"},
   {id:2,time:"14:00",txt:"👘 Indossa Yukata · scendi strada"},
   {id:3,time:"15:00",txt:"🔥 YOIYAMA: carri illuminati · Gion-bayashi · 1100 anni"},
   {id:4,time:"16:30",txt:"🚨 🚄 LA FUGA: Kyoto Station · Shinkansen Tokyo — PARTENZA 16:30-17:00! 🗻"},
   {id:5,time:"22:00",txt:"Arrivo Tokyo · check-in ostello Shinagawa/Kamata"},
 ],exp:[]},

{n:49,d:"15/07",dow:"Mer",c:"Tokyo",j:"東京",p:3,sl:"Ostello Tokyo (zona Haneda)",
 a:["☀️ Risveglio Tokyo — ultima mattina","🛍️ Se tempo: Akihabara ultima caccia o konbini omiyage","Preparazione partenza domani"],
 m:["🎌 Ultima mattina giapponese — goditi silenzio"],b:15,st:"ok",
 nt:"Ultima giornata Giappone. Riposo pre-volo.",
 schedule:[
   {id:1,time:"09:00",txt:"Ultima passeggiata Tokyo se energia"},
   {id:2,time:"14:00",txt:"Analisi flussi hub trasporti"},
   {id:3,time:"18:00",txt:"Conclusione operazioni · riposo pre-volo"},
 ],exp:[]},

{n:50,d:"16/07",dow:"Gio",c:"Tokyo → Italia 🇮🇹",j:"東京→🇮🇹",p:3,sl:"—",
 a:["☀️ Risveglio Tokyo — ultima mattina","✈️ Volo HANEDA ore 09:25 — arrivare 2h prima!","Fine avventura. 50 notti. 🎌"],
 m:["🎌 Ultima mattina giapponese"],b:15,st:"ok",
 nt:"⚠️ Volo Haneda 09:25 — sveglia presto! Haneda più vicino centro vs Narita.",
 schedule:[
   {id:1,time:"06:30",txt:"⏰ Sveglia · preparati"},
   {id:2,time:"07:00",txt:"🚃 Keikyu Line o Monorail → Haneda Terminal 3 (15min)"},
   {id:3,time:"07:15",txt:"📦 Yamato Transport: consegni ricevuta · RITIRO valigione 20kg Gg 43!"},
   {id:4,time:"07:30",txt:"Check-in e consegna bagagli"},
   {id:5,time:"09:25",txt:"✈️ Decollo Haneda → Italia · guarda Giappone finestrino"},
   {id:6,time:"",txt:"50 notti. Fine avventura. 🎌"},
 ],exp:[]},
];

function SLabel({children,color,mt}){
  return <div style={{fontSize:8,fontWeight:900,letterSpacing:".12em",textTransform:"uppercase",color:color||"#AAA",marginBottom:5,marginTop:mt||0}}>{children}</div>;
}

function TransportRow({dayN}){
  const t=TRANSPORT[dayN];
  if(!t||t.yen===0)return null;
  const eur=(t.yen/160).toFixed(0);
  const icon=TM[t.mode]||"🚌";
  const bg=t.mode==="plane"?"#EEF2FF":t.mode==="van"?"#FDF3E8":t.mode==="ferry"?"#E8F4FD":"#F0F7F0";
  const dur=t.min>=60?`${Math.floor(t.min/60)}h${t.min%60?`${t.min%60}m`:""}`:t.min>0?`${t.min}min`:"";
  return(
    <div style={{display:"flex",alignItems:"center",gap:8,padding:"7px 12px",background:bg,borderBottom:"1px solid #EDEAE2",flexWrap:"wrap"}}>
      <span style={{fontSize:15}}>{icon}</span>
      <div style={{flex:1,minWidth:0}}>
        <span style={{fontSize:11,fontWeight:700,color:"#2D2D2D"}}>{t.from} → {t.to}</span>
        <span style={{fontSize:9,color:"#888",marginLeft:8}}>{t.note}</span>
      </div>
      <div style={{display:"flex",gap:8,alignItems:"center",flexShrink:0}}>
        {dur&&<span style={{fontSize:9,color:"#666",fontWeight:600}}>⏱ {dur}</span>}
        <span style={{fontSize:11,fontWeight:800,color:"#1565C0"}}>{t.yen.toLocaleString()}¥</span>
        <span style={{fontSize:10,fontWeight:700,color:"#555"}}>~{eur}€</span>
        {t.jrp&&<span style={{fontSize:8,background:"#1B4332",color:"white",padding:"1px 6px",fontWeight:900,borderRadius:2}}>✓ JR Pass</span>}
      </div>
    </div>
  );
}

function ExpenseTracker({expenses,onAdd,onDel}){
  const [amt,setAmt]=useState("");
  const [lbl,setLbl]=useState("");
  const [cat,setCat]=useState("food");
  const [cur,setCur]=useState("eur");
  const total=expenses.reduce((a,e)=>a+(e.eur||0),0);
  const doAdd=()=>{
    const n=parseFloat(amt);if(!n||isNaN(n))return;
    const eur=cur==="yen"?+(n/160).toFixed(2):+n.toFixed(2);
    onAdd({id:Date.now(),lbl:lbl||(CATS.find(c=>c.k===cat)?.l||cat),cat,eur,raw:n,cur});
    setAmt("");setLbl("");
  };
  const catTotals=CATS.map(c=>({...c,tot:expenses.filter(e=>e.cat===c.k).reduce((a,e)=>a+(e.eur||0),0)})).filter(c=>c.tot>0);
  return(
    <div style={{borderTop:"1px solid #EDEAE2",padding:"8px 12px 10px",background:"#FDF8F2"}}>
      <SLabel color="#C1121F">💴 Tracker Spese</SLabel>
      <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:8,alignItems:"center"}}>
        <input value={amt} onChange={e=>setAmt(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doAdd()} placeholder="Importo" type="number"
          style={{width:80,border:"1px solid #DDD",padding:"5px 7px",fontSize:11,outline:"none",background:"white",borderRadius:2}}/>
        <select value={cur} onChange={e=>setCur(e.target.value)} style={{border:"1px solid #DDD",padding:"5px 6px",fontSize:10,background:"white",cursor:"pointer",fontWeight:700,borderRadius:2}}>
          <option value="eur">€</option><option value="yen">¥</option>
        </select>
        <select value={cat} onChange={e=>setCat(e.target.value)} style={{border:"1px solid #DDD",padding:"5px 6px",fontSize:10,background:"white",cursor:"pointer",flex:1,minWidth:100,borderRadius:2}}>
          {CATS.map(c=><option key={c.k} value={c.k}>{c.l}</option>)}
        </select>
        <input value={lbl} onChange={e=>setLbl(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doAdd()} placeholder="Descrizione"
          style={{flex:2,minWidth:90,border:"1px solid #DDD",padding:"5px 7px",fontSize:11,outline:"none",background:"white",borderRadius:2}}/>
        <button onClick={doAdd} style={{background:"#C1121F",color:"white",border:"none",padding:"5px 14px",fontSize:13,fontWeight:900,cursor:"pointer",borderRadius:2}}>+</button>
      </div>
      {expenses.length>0&&(
        <div style={{marginBottom:7,border:"1px solid #EEE",borderRadius:2,overflow:"hidden"}}>
          {expenses.map(e=>{const cc=CATS.find(c=>c.k===e.cat);return(
            <div key={e.id} style={{display:"flex",alignItems:"center",gap:6,padding:"5px 8px",borderBottom:".5px solid #F0EDE4",background:"white"}}>
              <span style={{fontSize:8,background:cc?.c||"#555",color:"white",padding:"1px 5px",fontWeight:800,flexShrink:0,borderRadius:2}}>{cc?.l||e.cat}</span>
              <span style={{fontSize:11,color:"#333",flex:1}}>{e.lbl}</span>
              <span style={{fontSize:11,fontWeight:700,color:"#333",flexShrink:0}}>{e.raw}{e.cur==="yen"?"¥":""} → <strong>{e.eur}€</strong></span>
              <button onClick={()=>onDel(e.id)} style={{background:"none",border:"none",color:"#CCC",cursor:"pointer",fontSize:14,padding:"0 2px"}}>×</button>
            </div>
          );})}
        </div>
      )}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:6}}>
        <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
          {catTotals.map(c=><span key={c.k} style={{fontSize:9,background:c.c,color:"white",padding:"2px 7px",fontWeight:800,borderRadius:2}}>{c.l} {c.tot.toFixed(0)}€</span>)}
          {expenses.length===0&&<span style={{fontSize:10,color:"#CCC",fontWeight:700}}>Nessuna spesa</span>}
        </div>
        <div style={{fontSize:13,fontWeight:900,color:"#C1121F"}}>Totale: {total.toFixed(0)}€</div>
      </div>
    </div>
  );
}

function DaySchedule({dayN,schedule,onSave}){
  const [items,setItems]=useState(schedule||[]);
  const [time,setTime]=useState("");
  const [txt,setTxt]=useState("");
  useEffect(()=>setItems(schedule||[]),[schedule]);
  const add=()=>{
    if(!txt.trim())return;
    const newItems=[...items,{id:Date.now(),time,txt:txt.trim()}];
    setItems(newItems);onSave(newItems);
    setTime("");setTxt("");
  };
  const del=(id)=>{const newItems=items.filter(i=>i.id!==id);setItems(newItems);onSave(newItems);};
  const move=(idx,dir)=>{
    const newItems=[...items];
    const swap=idx+dir;
    if(swap<0||swap>=newItems.length)return;
    [newItems[idx],newItems[swap]]=[newItems[swap],newItems[idx]];
    setItems(newItems);onSave(newItems);
  };
  return(
    <div style={{padding:"10px 12px 12px",background:"#FAFAF7",borderTop:"1px solid #EDEAE2"}}>
      <SLabel color="#1565C0">🗓️ Programma del Giorno</SLabel>
      {items.length>0&&(
        <div style={{marginBottom:10,border:"1px solid #E8E4DC",borderRadius:3,overflow:"hidden"}}>
          {items.map((item,idx)=>(
            <div key={item.id} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 10px",
              borderBottom:idx<items.length-1?"1px solid #EDEAE2":"none",background:"white"}}>
              <div style={{display:"flex",flexDirection:"column",gap:1,flexShrink:0}}>
                <button onClick={()=>move(idx,-1)} disabled={idx===0}
                  style={{background:"none",border:"none",cursor:idx===0?"default":"pointer",
                    color:idx===0?"#DDD":"#999",fontSize:10,padding:"0 2px",lineHeight:1}}>▲</button>
                <button onClick={()=>move(idx,1)} disabled={idx===items.length-1}
                  style={{background:"none",border:"none",cursor:idx===items.length-1?"default":"pointer",
                    color:idx===items.length-1?"#DDD":"#999",fontSize:10,padding:"0 2px",lineHeight:1}}>▼</button>
              </div>
              <div style={{width:2,alignSelf:"stretch",background:"#1565C0",borderRadius:2,opacity:.4,flexShrink:0}}/>
              {item.time&&(
                <span style={{fontSize:11,fontWeight:800,color:"#1565C0",flexShrink:0,minWidth:38}}>{item.time}</span>
              )}
              <span style={{fontSize:11,color:"#2D2D2D",flex:1,lineHeight:1.4}}>{item.txt}</span>
              <button onClick={()=>del(item.id)}
                style={{background:"none",border:"none",color:"#CCC",cursor:"pointer",fontSize:14,
                  padding:"0 2px",flexShrink:0,lineHeight:1}}
                onMouseEnter={e=>e.target.style.color="#C1121F"}
                onMouseLeave={e=>e.target.style.color="#CCC"}>×</button>
            </div>
          ))}
        </div>
      )}
      <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
        <input value={time} onChange={e=>setTime(e.target.value)} placeholder="09:00"
          style={{width:60,border:"1px solid #DDD",padding:"5px 7px",fontSize:11,
            outline:"none",background:"white",borderRadius:2,textAlign:"center"}}/>
        <input value={txt} onChange={e=>setTxt(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&add()}
          placeholder="Attività... (invio per aggiungere)"
          style={{flex:1,minWidth:180,border:"1px solid #DDD",padding:"5px 8px",
            fontSize:11,outline:"none",background:"white",borderRadius:2}}/>
        <button onClick={add}
          style={{background:"#1565C0",color:"white",border:"none",padding:"5px 14px",
            fontSize:13,fontWeight:900,cursor:"pointer",borderRadius:2}}>+</button>
      </div>
      {items.length===0&&(
        <div style={{textAlign:"center",padding:"12px 0 2px",fontSize:10,color:"#CCC",fontWeight:600}}>
          Nessuna attività pianificata — aggiungile sopra
        </div>
      )}
    </div>
  );
}

function EditModal({day,onClose,onSave}){
  const [city,setCity]=useState(day.c);
  const [cityJp,setCityJp]=useState(day.j);
  const [lodging,setLodging]=useState(day.sl);
  const [budget,setBudget]=useState(day.b);
  const [activities,setActivities]=useState(day.a||[]);
  const [animeSpots,setAnimeSpots]=useState(day.m||[]);
  const [editingActivity,setEditingActivity]=useState(null);
  const [editingAnime,setEditingAnime]=useState(null);

  const save=()=>{
    onSave({...day,c:city,j:cityJp,sl:lodging,b:Number(budget)||0,a:activities,m:animeSpots});
    onClose();
  };

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.7)",zIndex:9999,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={onClose}>
      <div style={{background:"white",width:"100%",maxWidth:600,maxHeight:"85vh",borderTopLeftRadius:12,borderTopRightRadius:12,overflow:"hidden",display:"flex",flexDirection:"column"}} onClick={e=>e.stopPropagation()}>
        <div style={{background:"#0D0D0D",color:"#F4F0E6",padding:"14px 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <div style={{fontSize:16,fontWeight:900}}>✏️ Modifica Giorno {day.n}</div>
            <div style={{fontSize:10,color:"rgba(244,240,230,.5)",marginTop:2}}>{day.d} {day.dow}</div>
          </div>
          <button onClick={onClose} style={{background:"none",border:"none",color:"rgba(244,240,230,.5)",fontSize:24,cursor:"pointer",padding:0,lineHeight:1}}>×</button>
        </div>
        
        <div style={{flex:1,overflowY:"auto",padding:"16px 16px 80px"}}>
          <div style={{marginBottom:16}}>
            <label style={{fontSize:11,fontWeight:700,color:"#666",display:"block",marginBottom:4}}>📍 Città</label>
            <input value={city} onChange={e=>setCity(e.target.value)} style={{width:"100%",padding:"8px 10px",border:"1px solid #DDD",borderRadius:4,fontSize:14}}/>
          </div>

          <div style={{marginBottom:16}}>
            <label style={{fontSize:11,fontWeight:700,color:"#666",display:"block",marginBottom:4}}>🇯🇵 Nome Giapponese</label>
            <input value={cityJp} onChange={e=>setCityJp(e.target.value)} style={{width:"100%",padding:"8px 10px",border:"1px solid #DDD",borderRadius:4,fontSize:14}}/>
          </div>

          <div style={{marginBottom:16}}>
            <label style={{fontSize:11,fontWeight:700,color:"#666",display:"block",marginBottom:4}}>🏠 Alloggio</label>
            <input value={lodging} onChange={e=>setLodging(e.target.value)} style={{width:"100%",padding:"8px 10px",border:"1px solid #DDD",borderRadius:4,fontSize:13}}/>
          </div>

          <div style={{marginBottom:20}}>
            <label style={{fontSize:11,fontWeight:700,color:"#666",display:"block",marginBottom:4}}>💰 Budget stimato (€)</label>
            <input type="number" value={budget} onChange={e=>setBudget(e.target.value)} style={{width:"100%",padding:"8px 10px",border:"1px solid #DDD",borderRadius:4,fontSize:14}}/>
          </div>

          <div style={{marginBottom:20}}>
            <div style={{fontSize:11,fontWeight:700,color:"#666",marginBottom:6}}>📅 Attività</div>
            {activities.map((act,i)=>(
              <div key={i} style={{background:"#F8F5EE",padding:"8px 10px",marginBottom:4,borderRadius:4,display:"flex",alignItems:"center",gap:8}}>
                {editingActivity===i?(
                  <input autoFocus value={act} onChange={e=>{const n=[...activities];n[i]=e.target.value;setActivities(n);}}
                    onBlur={()=>setEditingActivity(null)}
                    onKeyDown={e=>e.key==="Enter"&&setEditingActivity(null)}
                    style={{flex:1,padding:"4px 6px",border:"1px solid #DDD",borderRadius:2,fontSize:12}}/>
                ):(
                  <span style={{flex:1,fontSize:12,color:"#2D2D2D"}} onClick={()=>setEditingActivity(i)}>{act}</span>
                )}
                <button onClick={()=>setEditingActivity(i)} style={{background:"none",border:"none",color:"#999",cursor:"pointer",fontSize:12,padding:"0 4px"}}>✏️</button>
                <button onClick={()=>setActivities(activities.filter((_,idx)=>idx!==i))} style={{background:"none",border:"none",color:"#CCC",cursor:"pointer",fontSize:16,padding:"0 4px"}}>×</button>
              </div>
            ))}
            <button onClick={()=>setActivities([...activities,"Nuova attività"])} style={{background:"#1565C0",color:"white",border:"none",padding:"6px 12px",fontSize:12,fontWeight:700,borderRadius:4,cursor:"pointer",marginTop:4}}>+ Aggiungi attività</button>
          </div>

          <div>
            <div style={{fontSize:11,fontWeight:700,color:"#666",marginBottom:6}}>🎌 Spot Anime/Manga</div>
            {animeSpots.map((spot,i)=>(
              <div key={i} style={{background:"#FFF3F8",padding:"8px 10px",marginBottom:4,borderRadius:4,display:"flex",alignItems:"center",gap:8}}>
                {editingAnime===i?(
                  <input autoFocus value={spot} onChange={e=>{const n=[...animeSpots];n[i]=e.target.value;setAnimeSpots(n);}}
                    onBlur={()=>setEditingAnime(null)}
                    onKeyDown={e=>e.key==="Enter"&&setEditingAnime(null)}
                    style={{flex:1,padding:"4px 6px",border:"1px solid #DDD",borderRadius:2,fontSize:12}}/>
                ):(
                  <span style={{flex:1,fontSize:12,color:"#6A1040"}} onClick={()=>setEditingAnime(i)}>{spot}</span>
                )}
                <button onClick={()=>setEditingAnime(i)} style={{background:"none",border:"none",color:"#E89FC4",cursor:"pointer",fontSize:12,padding:"0 4px"}}>✏️</button>
                <button onClick={()=>setAnimeSpots(animeSpots.filter((_,idx)=>idx!==i))} style={{background:"none",border:"none",color:"#CCC",cursor:"pointer",fontSize:16,padding:"0 4px"}}>×</button>
              </div>
            ))}
            <button onClick={()=>setAnimeSpots([...animeSpots,"Nuovo spot anime"])} style={{background:"#6A1040",color:"white",border:"none",padding:"6px 12px",fontSize:12,fontWeight:700,borderRadius:4,cursor:"pointer",marginTop:4}}>+ Aggiungi spot</button>
          </div>
        </div>

        <div style={{position:"absolute",bottom:0,left:0,right:0,background:"white",borderTop:"1px solid #EEE",padding:"12px 16px",display:"flex",gap:8}}>
          <button onClick={onClose} style={{flex:1,background:"#EEE",color:"#666",border:"none",padding:"10px",fontSize:14,fontWeight:700,borderRadius:6,cursor:"pointer"}}>Annulla</button>
          <button onClick={save} style={{flex:1,background:"#1B4332",color:"white",border:"none",padding:"10px",fontSize:14,fontWeight:700,borderRadius:6,cursor:"pointer"}}>💾 Salva</button>
        </div>
      </div>
    </div>
  );
}

function DayCard({day,open,onToggle,onNote,onAddExp,onDelExp,onSaveSchedule,onEdit}){
  const pc=PC[day.p]||"#333";
  const hasAnime=day.m?.length>0;
  const isCritical=day.st==="critical";
  const isUrgent=day.nt?.toUpperCase().includes("URGENTE")||day.nt?.includes("🚨");
  const dayReal=(day.exp||[]).reduce((a,e)=>a+(e.eur||0),0);
  const [note,setNote]=useState(day.nt||"");
  const [activeTab,setActiveTab]=useState("info");
  useEffect(()=>setNote(day.nt||""),[day.nt]);
  
  const alertColor=isCritical?"#C1121F":isUrgent?"#E9C46A":"#E0DDD4";
  const alertBg=isCritical?"#FFE5E5":isUrgent?"#FFFBEA":"white";
  
  return(
    <div style={{marginBottom:2,background:"white",borderLeft:`4px solid ${pc}`,border:`1px solid ${alertColor}`,boxShadow:open?"0 2px 8px rgba(0,0,0,.06)":"none"}}>
      <div style={{display:"flex",cursor:"pointer",alignItems:"stretch",background:open?"#FAFAF6":"white"}} onClick={onToggle}>
        <div style={{background:pc,color:"white",minWidth:42,width:42,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"7px 2px",position:"relative",flexShrink:0}}>
          <div style={{fontSize:7,fontWeight:800,opacity:.5,letterSpacing:".05em",textTransform:"uppercase"}}>Gg</div>
          <div style={{fontSize:17,fontWeight:900,lineHeight:1}}>{day.n}</div>
          {dayReal>0&&<div style={{position:"absolute",bottom:3,left:0,right:0,textAlign:"center",fontSize:7,fontWeight:800,color:"rgba(255,255,255,.7)"}}>{dayReal}€</div>}
          {isCritical&&<div style={{position:"absolute",top:2,right:2,fontSize:10}}>🚨</div>}
        </div>
        <div style={{flex:1,padding:"8px 10px",minWidth:0}}>
          <div style={{display:"flex",alignItems:"center",gap:4,marginBottom:2,flexWrap:"wrap"}}>
            <span style={{fontSize:9,color:"#999",fontWeight:700}}>{day.d} {day.dow}</span>
            <span style={{fontSize:8,background:pc,color:"white",padding:"1px 5px",fontWeight:900,borderRadius:2}}>{PL[day.p]}</span>
            {hasAnime&&<span style={{fontSize:8,background:"#6A1040",color:"white",padding:"1px 5px",fontWeight:900,borderRadius:2}}>🎌 ANIME</span>}
            {isCritical&&<span style={{fontSize:8,background:"#C1121F",color:"white",padding:"1px 5px",fontWeight:900,borderRadius:2}}>🚨 CRITICO</span>}
          </div>
          <div style={{marginBottom:2}}>
            <span style={{fontSize:15,fontWeight:900,color:"#0D0D0D"}}>{day.c}</span>
            <span style={{fontSize:10,color:"#C0BDB5",marginLeft:6}}>{day.j}</span>
          </div>
          <div style={{fontSize:11,color:"#777",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{day.a[0]}{day.a.length>1?` · +${day.a.length-1}`:""}</div>
        </div>
        <div style={{padding:"8px 10px",display:"flex",flexDirection:"column",alignItems:"flex-end",justifyContent:"center",gap:4,flexShrink:0}}>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:14,fontWeight:900,color:"#0D0D0D"}}>~{day.b}€</div>
            {dayReal>0&&<div style={{fontSize:9,color:"#C1121F",fontWeight:700}}>✓{dayReal.toFixed(0)}€</div>}
          </div>
          <div style={{fontSize:11,color:open?"#C1121F":"#CCC",fontWeight:900}}>{open?"▲":"▼"}</div>
        </div>
      </div>
      {open&&(
        <div style={{borderTop:"1px solid #EDEAE2"}}>
          <TransportRow dayN={day.n}/>
          <div style={{display:"flex",borderBottom:"1px solid #EDEAE2",background:"#FAFAF6",alignItems:"center"}}>
            {[{k:"info",l:"📋 Info"},{k:"programma",l:"🗓️ Programma"},{k:"spese",l:"💴 Spese"},{k:"note",l:"📝 Note"}].map(t=>(
              <button key={t.k} onClick={()=>setActiveTab(t.k)}
                style={{background:"transparent",border:"none",borderBottom:`2px solid ${activeTab===t.k?pc:"transparent"}`,
                  color:activeTab===t.k?pc:"#999",padding:"7px 12px",fontSize:10,fontWeight:900,
                  cursor:"pointer",letterSpacing:".04em",whiteSpace:"nowrap",marginBottom:-1}}>
                {t.l}
              </button>
            ))}
            <div style={{flex:1}}/>
            <button onClick={(e)=>{e.stopPropagation();onEdit();}}
              style={{background:"transparent",border:"none",color:"#999",padding:"7px 12px",fontSize:10,fontWeight:900,
                cursor:"pointer",letterSpacing:".04em",whiteSpace:"nowrap"}}>
              ✏️ Modifica
            </button>
          </div>
          {activeTab==="info"&&(
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr"}}>
              <div style={{padding:"10px 12px",borderRight:"1px solid #EDEAE2"}}>
                <SLabel color={pc}>📅 Attività</SLabel>
                {day.a.map((x,i)=>(
                  <div key={i} style={{display:"flex",gap:7,marginBottom:5,alignItems:"flex-start"}}>
                    <div style={{width:3,minWidth:3,background:pc,borderRadius:2,alignSelf:"stretch",opacity:.7,marginTop:2}}/>
                    <div style={{fontSize:11,color:"#2D2D2D",lineHeight:1.45}}>{x}</div>
                  </div>
                ))}
                <SLabel color="#666" mt={10}>🏠 Alloggio</SLabel>
                <div style={{fontSize:11,color:"#555",background:"#F8F5EE",padding:"5px 8px",borderRadius:2}}>{day.sl}</div>
              </div>
              <div style={{padding:"10px 12px"}}>
                {hasAnime?(
                  <>
                    <SLabel color="#6A1040">🎌 Anime / Manga</SLabel>
                    {day.m.map((x,i)=>(
                      <div key={i} style={{display:"flex",gap:7,marginBottom:5,alignItems:"flex-start"}}>
                        <div style={{width:3,minWidth:3,background:"#6A1040",borderRadius:2,alignSelf:"stretch",marginTop:2}}/>
                        <div style={{fontSize:11,color:"#6A1040",fontWeight:500,lineHeight:1.45}}>{x}</div>
                      </div>
                    ))}
                  </>
                ):(
                  <div style={{height:"100%",display:"flex",alignItems:"center",justifyContent:"center",color:"#CCC",fontSize:10,fontWeight:700}}>Nessuno spot anime</div>
                )}
                {day.nt&&(
                  <div style={{marginTop:8,background:alertBg,border:`1.5px solid ${alertColor}`,padding:"6px 9px",fontSize:10,lineHeight:1.5,color:isCritical||isUrgent?"#C1121F":"#7D4E00",fontWeight:isCritical||isUrgent?700:400,borderRadius:2}}>
                    {isCritical||isUrgent?"🚨 ":"📌 "}{day.nt}
                  </div>
                )}
              </div>
            </div>
          )}
          {activeTab==="programma"&&(
            <DaySchedule dayN={day.n} schedule={day.schedule} onSave={onSaveSchedule}/>
          )}
          {activeTab==="spese"&&(
            <ExpenseTracker expenses={day.exp||[]} onAdd={onAddExp} onDel={onDelExp}/>
          )}
          {activeTab==="note"&&(
            <div style={{padding:"10px 12px 12px",background:"#FAFAF7"}}>
              <SLabel color="#555">📝 Note personali</SLabel>
              <textarea value={note} onChange={e=>setNote(e.target.value)} onBlur={()=>onNote(note)}
                placeholder={`Note per il Giorno ${day.n}...`}
                style={{width:"100%",minHeight:100,border:"1px solid #DDD",padding:"6px 8px",fontSize:11,fontFamily:"system-ui",resize:"vertical",background:"white",outline:"none",display:"block",marginBottom:5,borderRadius:2}}/>
              <button onClick={()=>onNote(note)} style={{background:"#0D0D0D",color:"white",border:"none",padding:"5px 14px",fontSize:9,fontWeight:900,letterSpacing:".08em",cursor:"pointer",textTransform:"uppercase",borderRadius:2}}>💾 Salva</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function PhaseDivider({phase}){
  return(
    <div style={{display:"flex",alignItems:"center",gap:10,margin:"16px 0 7px"}}>
      <div style={{background:PC[phase],color:"white",padding:"5px 14px",fontSize:11,fontWeight:900,letterSpacing:".08em",whiteSpace:"nowrap"}}>
        {PE[phase]} FASE {phase} · {PRANGE[phase]}
      </div>
      <div style={{flex:1,height:1,background:PC[phase],opacity:.15}}/>
    </div>
  );
}

function MemoBoard({memos,open,onToggle,onAdd,onDel,onToggleDone}){
  const [newTxt,setNewTxt]=useState("");
  const [newCat,setNewCat]=useState("pack");
  const [activeCat,setActiveCat]=useState("all");
  const done=memos.filter(m=>m.done).length;
  const show=activeCat==="all"?memos:memos.filter(m=>m.cat===activeCat);
  return(
    <div style={{background:"#0D0D0D",marginBottom:6,border:"1px solid #2A2A2A"}}>
      <div style={{display:"flex",alignItems:"center",padding:"8px 12px",cursor:"pointer",borderBottom:open?"1px solid #2A2A2A":"none"}} onClick={onToggle}>
        <div style={{flex:1}}>
          <span style={{fontSize:12,fontWeight:900,color:"#F4F0E6"}}>📌 MEMO & PROMEMORIA</span>
          <span style={{fontSize:9,color:"rgba(244,240,230,.3)",fontWeight:700,marginLeft:8}}>{done}/{memos.length} completati</span>
        </div>
        <div style={{display:"flex",gap:4}}>
          {MEMO_CATS.map(c=>{const cnt=memos.filter(m=>m.cat===c.k&&!m.done).length;if(!cnt)return null;
            return <span key={c.k} style={{background:c.c,color:"white",fontSize:8,fontWeight:900,padding:"1px 6px",borderRadius:2}}>{cnt}</span>;})}
        </div>
        <span style={{color:"rgba(244,240,230,.3)",fontSize:11,fontWeight:900,marginLeft:8}}>{open?"▲":"▼"}</span>
      </div>
      {open&&(
        <>
          <div style={{display:"flex",borderBottom:"1px solid #2A2A2A",overflowX:"auto"}}>
            {[{k:"all",l:"Tutti",c:"#444"},...MEMO_CATS].map(c=>(
              <button key={c.k} onClick={()=>setActiveCat(c.k)}
                style={{background:activeCat===c.k?c.c:"transparent",border:"none",color:activeCat===c.k?"white":"rgba(244,240,230,.4)",
                  padding:"6px 10px",fontSize:9,fontWeight:900,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0,textTransform:"uppercase"}}>
                {c.l}
              </button>
            ))}
          </div>
          <div style={{maxHeight:220,overflowY:"auto"}}>
            {show.length===0&&<div style={{textAlign:"center",padding:18,fontSize:10,color:"rgba(244,240,230,.2)",fontWeight:700}}>Nessun memo</div>}
            {show.map(m=>{const cc=MEMO_CATS.find(c=>c.k===m.cat);return(
              <div key={m.id} style={{display:"flex",alignItems:"flex-start",gap:8,padding:"6px 12px",borderBottom:".5px solid #1A1A1A",opacity:m.done?.6:1}}>
                <button onClick={()=>onToggleDone(m.id)}
                  style={{background:m.done?"#1B4332":"transparent",border:`1.5px solid ${m.done?"#1B4332":"rgba(244,240,230,.2)"}`,
                    width:14,height:14,flexShrink:0,cursor:"pointer",marginTop:1,color:"white",fontSize:9,fontWeight:900,
                    display:"flex",alignItems:"center",justifyContent:"center",borderRadius:2,padding:0}}>
                  {m.done?"✓":""}
                </button>
                <span style={{fontSize:8,background:cc?.c||"#555",color:"white",padding:"1px 5px",fontWeight:900,flexShrink:0,borderRadius:2,marginTop:1}}>{cc?.l||m.cat}</span>
                <span style={{fontSize:11,color:"#D4D0C8",flex:1,lineHeight:1.45,textDecoration:m.done?"line-through":"none"}}>{m.txt}</span>
                <button onClick={()=>onDel(m.id)} style={{background:"none",border:"none",color:"rgba(244,240,230,.2)",cursor:"pointer",fontSize:14,padding:"0 2px",flexShrink:0}}>×</button>
              </div>
            );})}
          </div>
          <div style={{padding:"8px 12px 9px",borderTop:"1px solid #2A2A2A",display:"flex",gap:5,flexWrap:"wrap",alignItems:"center"}}>
            <select value={newCat} onChange={e=>setNewCat(e.target.value)}
              style={{background:"#1A1A1A",border:"1px solid #333",color:"#F4F0E6",padding:"5px 6px",fontSize:9,fontWeight:800,cursor:"pointer",borderRadius:2,textTransform:"uppercase"}}>
              {MEMO_CATS.map(c=><option key={c.k} value={c.k}>{c.l}</option>)}
            </select>
            <input value={newTxt} onChange={e=>setNewTxt(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&(onAdd(newCat,newTxt),setNewTxt(""))}
              placeholder="Nuovo memo..."
              style={{flex:1,minWidth:180,background:"#1A1A1A",border:"1px solid #333",color:"#F4F0E6",padding:"5px 8px",fontSize:11,outline:"none",borderRadius:2}}/>
            <button onClick={()=>{onAdd(newCat,newTxt);setNewTxt("");}}
              style={{background:"#C1121F",color:"white",border:"none",padding:"5px 14px",fontSize:13,fontWeight:900,cursor:"pointer",borderRadius:2}}>+</button>
          </div>
        </>
      )}
    </div>
  );
}

export default function App(){
  const [days,setDays]=useState(D0);
  const [memos,setMemos]=useState(MEMO0);
  const [ready,setReady]=useState(false);
  const [open,setOpen]=useState(null);
  const [filter,setFilter]=useState(0);
  const [memoOpen,setMemoOpen]=useState(true);
  const [editingDay,setEditingDay]=useState(null);

  useEffect(()=>{
    (async()=>{
      try{
        // localforage è iOS-friendly (IndexedDB + fallback)
        const saved=await localforage.getItem("boken_v7_50days");
        if(saved){
          const merged=D0.map(def=>{
            const s=saved.find(x=>x.n===def.n);
            if(!s)return def;
            return{...def,st:s.st||def.st,nt:s.nt||def.nt,exp:s.exp||[],schedule:(s.schedule&&s.schedule.length>0)?s.schedule:(def.schedule||[])};
          });
          setDays(merged);
        }
        const savedMemos=await localforage.getItem("boken_memos_v6");
        if(savedMemos)setMemos(savedMemos);
        
        // Check last backup reminder
        const lastBackup=await localforage.getItem("last_backup_check");
        const now=Date.now();
        if(!lastBackup||now-lastBackup>7*24*60*60*1000){
          // 7 giorni passati - mostra reminder backup
          setTimeout(()=>{
            if(confirm("💾 Backup consigliato!\n\nÈ passata una settimana. Vuoi esportare un backup dei tuoi dati?")){
              document.getElementById("exportBtn")?.click();
            }
            localforage.setItem("last_backup_check",now);
          },3000);
        }
      }catch(e){console.error("Load error:",e);}
      setReady(true);
    })();
  },[]);

  const persist=useCallback(async(d)=>{try{await localforage.setItem("boken_v7_50days",d);}catch(e){console.error("Save error:",e);}},[]);
  const persistM=useCallback(async(m)=>{try{await localforage.setItem("boken_memos_v6",m);}catch(e){console.error("Save error:",e);}},[]);
  useEffect(()=>{if(ready)persist(days);},[days,ready,persist]);
  useEffect(()=>{if(ready)persistM(memos);},[memos,ready,persistM]);

  const addMemo=(cat,txt)=>{if(!txt.trim())return;setMemos(p=>[...p,{id:Date.now(),cat,txt:txt.trim()}]);};
  const delMemo=(id)=>setMemos(p=>p.filter(m=>m.id!==id));
  const toggleDone=(id)=>setMemos(p=>p.map(m=>m.id===id?{...m,done:!m.done}:m));
  const updateNote=(n,v)=>setDays(p=>p.map(d=>d.n===n?{...d,nt:v}:d));
  const addExp=(n,e)=>setDays(p=>p.map(d=>d.n===n?{...d,exp:[...(d.exp||[]),e]}:d));
  const delExp=(n,id)=>setDays(p=>p.map(d=>d.n===n?{...d,exp:(d.exp||[]).filter(e=>e.id!==id)}:d));
  const saveSchedule=(n,s)=>setDays(p=>p.map(d=>d.n===n?{...d,schedule:s}:d));
  const saveEditedDay=(edited)=>setDays(p=>p.map(d=>d.n===edited.n?edited:d));

  const conf=days.filter(d=>d.sl.startsWith("✅")).length;
  const budEst=days.reduce((a,d)=>a+(d.b||0),0);
  const budReal=days.reduce((a,d)=>a+(d.exp||[]).reduce((b,e)=>b+(e.eur||0),0),0);
  const animeCnt=days.filter(d=>d.m?.length>0).length;
  const criticalCnt=days.filter(d=>d.st==="critical").length;
  const transpEur=Math.round((Object.values(TRANSPORT).reduce((a,t)=>a+t.yen,0)+VAN_RENTAL_YEN)/160);
  const jrpSavings=Math.round(Object.values(TRANSPORT).filter(t=>t.jrp).reduce((a,t)=>a+t.yen,0)/160);
  const show=filter===0?days:days.filter(d=>d.p===filter);

  // Export/Import functions
  const exportData=()=>{
    try{
      const data={
        version:"v7",
        exportDate:new Date().toISOString(),
        days,
        memos
      };
      const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
      const url=URL.createObjectURL(blob);
      const a=document.createElement("a");
      a.href=url;
      a.download=`giappone-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      localforage.setItem("last_backup_check",Date.now());
      alert("✅ Backup esportato!\n\nSalva il file in un posto sicuro (Files app, iCloud)");
    }catch(e){
      alert("❌ Errore export: "+e.message);
    }
  };

  const importData=()=>{
    const input=document.createElement("input");
    input.type="file";
    input.accept=".json";
    input.onchange=async(e)=>{
      try{
        const file=e.target.files[0];
        if(!file)return;
        const text=await file.text();
        const data=JSON.parse(text);
        if(data.version!=="v7"){
          if(!confirm("⚠️ Versione diversa. Continuare?"))return;
        }
        if(!confirm(`📥 Importare backup del ${new Date(data.exportDate).toLocaleDateString()}?\n\nI dati attuali saranno sovrascritti!`))return;
        setDays(data.days||D0);
        setMemos(data.memos||MEMO0);
        await localforage.setItem("boken_v7_50days",data.days||D0);
        await localforage.setItem("boken_memos_v6",data.memos||MEMO0);
        alert("✅ Backup importato!\n\nDati ripristinati con successo.");
        window.location.reload();
      }catch(e){
        alert("❌ Errore import: "+e.message);
      }
    };
    input.click();
  };

  return(
    <div style={{background:"#F4F0E6",minHeight:"100vh",fontFamily:"system-ui,sans-serif"}}>
      <div style={{background:"#0D0D0D",position:"sticky",top:0,zIndex:50,borderBottom:"3px solid #C1121F"}}>
        <div style={{maxWidth:860,margin:"0 auto",padding:"12px 12px 0"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8,flexWrap:"wrap",gap:6}}>
            <div>
              <span style={{fontSize:"clamp(18px,4.5vw,28px)",fontWeight:900,color:"#F4F0E6"}}>冒険<span style={{color:"#C1121F"}}>の記録</span></span>
              <span style={{fontSize:9,fontWeight:700,color:"rgba(244,240,230,.3)",letterSpacing:".1em",marginLeft:10,textTransform:"uppercase"}}>v7 · 50 GIORNI</span>
              <div style={{fontSize:9,fontWeight:700,color:"rgba(244,240,230,.35)",letterSpacing:".12em",textTransform:"uppercase",marginTop:3}}>
                28 Maggio → 16 Luglio 2026 · 50 giorni
              </div>
            </div>
          </div>
          <div style={{display:"flex",gap:4,marginBottom:8,flexWrap:"wrap"}}>
            {[
              {l:"🏠 Confermati",v:`${conf}`,c:"#6FCF97"},
              {l:"Stimato",v:`~${budEst}€`},
              {l:"Speso",v:`${budReal.toFixed(0)}€`,c:budReal>0?"#FF8A8A":null},
              {l:"🚄 Trasporti",v:`~${transpEur}€`,c:"#60A5FA"},
              {l:"JR Pass save",v:`~${jrpSavings}€`,c:"#6FCF97"},
              {l:"🎌 Anime",v:`${animeCnt}gg`,c:"#E89FC4"},
              {l:"🚨 Critici",v:`${criticalCnt}gg`,c:"#FF6B6B"},
            ].map((s,i)=>(
              <div key={i} style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",padding:"3px 8px",borderRadius:2}}>
                <span style={{fontSize:9,color:"rgba(244,240,230,.35)",fontWeight:700}}>{s.l} </span>
                <span style={{fontSize:10,fontWeight:900,color:s.c||"#F4F0E6"}}>{s.v}</span>
              </div>
            ))}
          </div>
          <div style={{height:3,background:"rgba(255,255,255,.08)",marginBottom:7,borderRadius:2}}>
            <div style={{height:"100%",background:"linear-gradient(to right,#1B4332,#7B3F00,#1a237e)",width:`${(conf/50)*100}%`,borderRadius:2}}/>
          </div>
          <div style={{display:"flex",gap:0}}>
            {["Tutti","🚄 Treno","🚐 Van","✈️ Finale"].map((l,i)=>(
              <button key={i} onClick={()=>setFilter(i)}
                style={{background:"transparent",border:"none",color:filter===i?"#F4F0E6":"rgba(244,240,230,.38)",
                  padding:"7px 11px",fontSize:9,fontWeight:900,letterSpacing:".07em",cursor:"pointer",
                  textTransform:"uppercase",borderBottom:filter===i?"3px solid #C1121F":"3px solid transparent",marginBottom:-3}}>
                {l}
              </button>
            ))}
            <div style={{flex:1}}/>
            <button id="exportBtn" onClick={exportData}
              style={{background:"transparent",border:"none",color:"rgba(244,240,230,.4)",padding:"7px 8px",fontSize:8,cursor:"pointer",fontWeight:700,marginBottom:-3}}>
              📤 export
            </button>
            <button onClick={importData}
              style={{background:"transparent",border:"none",color:"rgba(244,240,230,.4)",padding:"7px 8px",fontSize:8,cursor:"pointer",fontWeight:700,marginBottom:-3}}>
              📥 import
            </button>
            <button onClick={()=>{if(window.confirm("Reset ai dati originali? Le note e spese salvate andranno perse."))setDays(D0);}}
              style={{background:"transparent",border:"none",color:"rgba(244,240,230,.18)",padding:"7px 8px",fontSize:8,cursor:"pointer",fontWeight:700,marginBottom:-3}}>
              ↺ reset
            </button>
          </div>
        </div>
      </div>

      <div style={{maxWidth:860,margin:"0 auto",padding:"8px 8px 0"}}>
        <MemoBoard memos={memos} open={memoOpen} onToggle={()=>setMemoOpen(p=>!p)}
          onAdd={addMemo} onDel={delMemo} onToggleDone={toggleDone}/>
      </div>

      <div style={{padding:"6px 8px 60px",maxWidth:860,margin:"0 auto"}}>
        {show.map((day,i)=>{
          const prev=show[i-1];
          return(
            <div key={day.n}>
              {(!prev||prev.p!==day.p)&&<PhaseDivider phase={day.p}/>}
              <DayCard day={day} open={open===day.n}
                onToggle={()=>setOpen(open===day.n?null:day.n)}
                onNote={v=>updateNote(day.n,v)}
                onAddExp={e=>addExp(day.n,e)}
                onDelExp={id=>delExp(day.n,id)}
                onSaveSchedule={s=>saveSchedule(day.n,s)}
                onEdit={()=>setEditingDay(day)}
              />
            </div>
          );
        })}
      </div>

      {editingDay&&<EditModal day={editingDay} onClose={()=>setEditingDay(null)} onSave={saveEditedDay}/>}

      <div style={{textAlign:"center",padding:16,fontSize:9,color:"#AAA",fontWeight:700,letterSpacing:".08em",borderTop:"2px solid #111",background:"#F4F0E6"}}>
        冒険の記録 · v7 · 50 GIORNI · 28 Maggio → 16 Luglio 2026 🎌
      </div>
    </div>
  );
}

// Render app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
