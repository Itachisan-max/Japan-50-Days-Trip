# 🎌 Giappone 50 Giorni - PWA

**App Progressive Web completa per il tuo viaggio in Giappone**

---

## 📱 INSTALLAZIONE SU IPHONE

### Passo 1: Aprire l'app
1. Carica tutti i file su un server web o usa un servizio come GitHub Pages
2. Apri Safari su iPhone
3. Vai all'URL dell'app

### Passo 2: Installare
1. Tap sull'icona **Condividi** (il quadrato con freccia in alto)
2. Scroll giù e trova **"Aggiungi a Home"**
3. Tap → **Aggiungi**
4. ✅ L'icona appare sulla Home Screen!

### Passo 3: Usare Offline
- Apri l'app dalla Home Screen
- Funziona **completamente offline** dopo la prima apertura
- Tutti i dati salvati localmente sul tuo iPhone

---

## ✨ FUNZIONALITÀ

### 📝 Edit Mode Completo
- **✏️ Modifica** ogni giorno dall'interfaccia
- Cambia: città, alloggio, budget, attività, spot anime
- Tutto si salva automaticamente

### 💾 Backup Automatico
- **Reminder ogni 7 giorni** per esportare backup
- **📤 Export**: Scarica file JSON
- **📥 Import**: Ripristina da file JSON
- Salva in **Files app** → backup automatico iCloud

### 💴 Gestione Spese
- Aggiungi spese per ogni giorno
- Categorie: Cibo, Alloggio, Trasporto, Attività, Shopping
- **Totale automatico** per giorno e viaggio

### 🗓️ Programma Personalizzato
- Crea il **programma orario** per ogni giorno
- Aggiungi/modifica/elimina attività
- Riordina con drag&drop

### 📝 Note e Memo
- **Note personali** per ogni giorno
- **Memo globali** con categorie:
  - ✅ Confermati
  - 🧳 Da portare
  - ⚠️ Da prenotare
  - 📚 Da sapere
  - 💡 Idee
  - 📄 Documenti

---

## 🔧 COME MODIFICARE I DATI

### Modificare un giorno:
1. Apri il giorno
2. Tap **"✏️ Modifica"** (in alto a destra nei tab)
3. Modifica quello che vuoi
4. Tap **"💾 Salva"**
5. ✅ Salvato automaticamente!

### Export/Import Backup:
- **Export**: Tap **"📤 export"** nell'header → salva il file JSON
- **Import**: Tap **"📥 import"** → scegli file JSON → conferma

### Sync tra dispositivi:
1. **iPhone** → Export backup → manda file a te stesso
2. **PC/iPad** → Ricevi file → Import backup
3. ✅ Dati sincronizzati!

---

## 🚨 FIX CRITICI INCLUSI

### ✅ Giorno 48 - Monte Fuji
**Alert**: Partenza Shinkansen **16:30-17:00** (non 20:00!)
- Tramonto ~19:00
- Siediti lato DESTRO (sedile E)

### ✅ Giorni 6 & 9 - Stagione Tsuyu
**Alert**: Gore-Tex obbligatorio
- Stagione piogge attiva
- Calcola +30% tempo per umidità

### ✅ Giorno 13 - Shirakawa-gō
**Alert CRITICO**: Verifica cena inclusa
- Villaggio chiuso dopo 17:00
- Nessun ristorante aperto
- Ultimo bus 17:00!

### ✅ Giorno 41 - Nara Festival
**Alert**: Parcheggia van FUORI città
- Chiusure stradali per Tanabata
- Avvicinati a piedi

---

## 📂 STRUTTURA FILE

```
giappone-pwa/
├── index.html          → Entry point
├── app.jsx             → App React completa
├── manifest.json       → Config PWA
├── service-worker.js   → Offline cache
├── icon-192.png        → Icona app (da creare)
├── icon-512.png        → Icona app grande (da creare)
└── README.md           → Questo file
```

---

## 🎨 ICONE (DA CREARE)

Per le icone app, crea 2 immagini PNG:

### icon-192.png (192x192px)
- Sfondo: #0D0D0D (nero)
- Emoji: 🎌 o 冒険
- Font: bianco/rosso

### icon-512.png (512x512px)
- Stessa cosa ma 512x512px

**Tip**: Usa Canva, Figma, o anche emoji screenshot!

---

## 💾 STORAGE iOS

L'app usa **LocalForage** (IndexedDB) per storage iOS-friendly:
- ✅ Più affidabile di localStorage su Safari
- ✅ Dati persistono anche dopo 7+ giorni
- ✅ Fino a ~50MB storage
- ⚠️ **Importante**: Fai backup regolari con Export!

---

## 🔄 AGGIORNAMENTI

Se aggiorni l'app:
1. Apri Safari → vai all'URL
2. L'app si aggiorna automaticamente
3. Chiudi e riapri dalla Home Screen
4. ✅ Nuova versione attiva!

---

## 🐛 TROUBLESHOOTING

### L'app non si installa?
- Usa **Safari** (non Chrome/Firefox)
- Controlla di essere su **https://** (non http://)
- Riprova dopo riavvio iPhone

### I dati non si salvano?
- Verifica **storage disponibile** su iPhone
- Prova Export → Import per ripristinare
- Controlla Console (Safari → Sviluppo)

### Offline non funziona?
- Apri l'app **online** almeno una volta
- Aspetta che il Service Worker si installi
- Poi funziona offline!

---

## 📞 SUPPORTO

Per problemi o domande, controlla:
- Console browser (Safari → Sviluppo → Console)
- Errori nel Service Worker
- Storage disponibile iPhone

---

## 🎌 BUON VIAGGIO!

**28 Maggio → 16 Luglio 2026**
**50 giorni · 3 fasi · Infinite avventure**

冒険の記録 🇯🇵
