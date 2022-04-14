---
title: "Hello Android Tutorial su Debian Testing"
date: "2010-10-17T11:54:00Z"
author: dario.santamaria
author_data:
    username: "dario.santamaria"
    fullname: "Dario Santamaria"
    email: "dario.santamaria@jugpadova.it"
categories:
    - name: "Tips & Tricks"
      permalink: "tips-and-tricks"
    - name: "Programmazione"
      permalink: "programmazione"
tags:
    - name: "android"
      display: "android"
    - name: "eclipse"
      display: "Eclipse"
    - name: "debian"
      display: "debian"
    - name: "tutorial"
      display: "tutorial"
---

Questo tutorial ha lo scopo di guidarvi passo passo nella creazione e
installazione di un'applicazione (*Hello Android*) all'interno di un
dispositivo Android disponendo di un PC con distribuzione Debian
Testing.

Di che cosa abbiamo bisogno:

\* Un IDE per sviluppare la nostra app -- **Eclipse**\
\* **Android SDK** -- presso Google\
\* Un plugin per l'IDE (**ADT**) per poter creare il nostro package
.apk\
\* Uno smartphone Android -- **Motorola Flipout**

Intanto segnalo il fatto che si potrebbe utilizzare come IDE
**Netbeans** (ne sono un utilizzatore convinto), ma il problema è che
nei repositories Debian siamo attualmente fermi alla versione 6.0.1 che
non supporta l'attuale plugin *nbandroid* :-(

Iniziamo a configurare la nostra distro per ottenere il risultato
desiderato: creare un package .apk da inviare al nostro smartphone.\
h3. 1. Eclipse IDE

Diamo da riga di comando:

`$ apt-get install eclipse`

e verranno installati in automatico tutti i pacchetti necessari (tra cui
`eclipse-jdt eclipse-pde eclipse-platform eclipse-platform-data eclipse-plugin-cvs eclipse-rcp`).

### 2. Android SDK

Preleviamo da [developer.android.com](http://developer.android.com) il
pacchetto .tgz per la nostra piattaforma:

`$ wget http://dl.google.com/android/android-sdk_r07-linux_x86.tgz`

ed estraiamolo nella home del nostro debian user:

`$ tar xvzf android-sdk_r07-linux_x86.tgz `

### 3. Android Development Tools (ADT) Plugin per Eclipse

Eclipse dà la possibilità di inserire nell'IDE un URL attraverso il
quale trovare ed installare i plugins. In particolare per installare
l'ADT Plugin basta avviare l'IDE e selezionare dal menu:

`Window → Preferences`

Su questa finestra:

\* dalla lista a sinistra apriamo la sezione *Install/Update*\
\* selezioniamo *Available Software Sites*\
\* clicchiamo sul bottone *Add* a destra\
\* inseriamo l'indirizzo dove reperire il plugin:
`https://dl-ssl.google.com/android/eclipse/`\
\* e infine clicchiamo su *OK*

[![](/files/androidtutorial_adt-plugin-repo_small.png)](/files/androidtutorial_adt-plugin-repo.png)

Ora andiamo sul menu:

`Help → Install New Software`

Su questa finestra dal menu a tendina *Work with:* selezionate il
repository appena inserito. Sotto scegliete *Android Development Tools*
e proseguite nelle successive schermate (tra queste ci sarà anche
l'accettazione della licenza).

[![](/files/androidtutorial_adt-plugin-select_small.png)](/files/androidtutorial_adt-plugin-select.png)

A questo punto l'IDE chiede di essere riavviato.\
Dopo ciò, bisogna configurare il plugin in modo che sfrutti l'Android
SDK installato al *punto 2*. Andiamo su:

`Window → Preferences`

Troveremo sulla lista a sinistra una nuova voce: *Android*.
Selezioniamola e clicchiamo sul bottone *Browse* a destra inserendo la
posizione dell'Android SDK del *punto 2*
(`/home/stylee/android-sdk-linux_x86`).

Se qualcosa dovesse andare storto, vi riporto il link alla [guida
esaustiva](http://developer.android.com/sdk/eclipse-adt.html) per
l'installazione e configurazione del plugin.

### 4. Configurazione dell'Android SDK tramite il tool *the Android SDK and AVD Manager*

Il plugin è configurato all'interno dell'IDE. Ora dobbiamo configurare
l'ambiente dell' Android SDK per definire quale sarà il nostro
dispositivo su cui svilupperemo l'applicazione. Il tool da utilizzare è
lanciabile direttamente dall'interno di Eclipse con il bottone sul
pannello pricipale:

![](/files/androidtutorial_tool-bottone.png)

Nel caso particolare, per produrre un package installabile sul mio
*Motorola FlipOut*, dovrò installare le *API 7 per Android v2.1* (menu
*Available Packages* sulla sinistra):

[![](/files/androidtutorial_tool-add_small.png)](/files/androidtutorial_tool-add.png)

Dopo le API bisogna creare un *Android Virtual Device* sul quale verrà
testata la nostra app (tramite emulatore). Selezioniamo la voce *Virtual
Devices* sulla sinistra. Il mio FlipOut ha **2Gb** di scheda di memoria
SD, Android **2.1** e risoluzione **QVGA**.

[![](/files/androidtutorial_tool-avd_small.png)](/files/androidtutorial_tool-avd.png)

### 5. Hello Android

Creiamo un nuovo progetto con il wizard sulla barra principale di
Eclipse:

![](/files/androidtutorial_newandroid-bottone1.png)

Compilate i vari campi a vostro piacimento, seguendo le linee guida:

[![](/files/androidtutorial_newandroid-project_small.png)](/files/androidtutorial_newandroid-project.png)

Aprite nell'editor la classe `it.santasoft.helloandroid.HelloAndroid` e
modificate in questo modo:

    package it.santasoft.helloandroid;

    import android.app.Activity;
    import android.os.Bundle;
    import android.widget.TextView;

    public class HelloAndroid extends Activity {
        /** Called when the activity is first created. */
        @Override
        public void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            TextView tv = new TextView(this);
            tv.setText("Hello JUGPadova! From my Android Device");
            setContentView(tv);
        }
    }

Ora che abbiamo sistemato il codice, passiamo alla compilazione premendo
il tasto sul pannello dell'IDE

`Run → As Android Application`

Verrà compilato il nostro package e lanciato l'emulatore definito
precedentemente nella sezione *Android Virtual Devices*. Munitevi di
pazienza e attendete qualche minuto che l'emulatore si avvii... e
vedrete il risultato sperato.

Per maggiori informazioni e per alcuni approfondimenti sull'app
*HelloAndroid* visitate [questo link su
`developer.android.com`](http://developer.android.com/resources/tutorials/hello-world.html)

### 6. Installazione del package .apk sul dispositivo Android

Individuiamo il pacchetto *Hello Android.apk* all'interno
dell'alberatura del nostro progetto compilato in Eclipse:

`Hello Android → bin → it → Hello Android.apk`

Sul nostro dispositivo Android andiamo ad installare dall'*Android
Market* uno dei tanti **Apps Installer** che ci permettono di gestire
pacchetti .apk all'interno della scheda di memoria SD esterna. Io
utilizzo *appInstaller* di *Gregory House*.

Spegniamo il nostro dispositivo Android, estraiamo la scheda di memoria,
inseriamola sul nostro PC e trasferiamo nella directory radice il
package *Hello android.apk*; smontiamo la scheda, reinseriamo nel
dispositivo e accendiamo.

Per questioni di sicurezza è disabilitata di default l'opzione di poter
installare applicazioni al di fuori dell'*Android Market*, perciò per il
nostro scopo navighiamo nel menu del nostro dispositivo e abilitiamo
l'opzione

`Impostazioni → Applicazioni → Origini Sconosciute`

Avviamo l'applicazione *appInstaller* e scegliamo il nostro package
*Hello, Android*. E finalmente otteniamo

[![](/files/androidtutorial_P1080967_small.JPG)](/files/androidtutorial_P1080967.JPG)

Altro metodo molto veloce (testato di persona) se sul nostro Debian PC
abbiamo installato il web server *apache* e siamo in una rete wifi
domestica è il seguente.

\* Copiamo il nostro *Hello Android.apk* sulla root del webserver Apache
- `/var/www` di default\
\* Verifichiamo quale sia l'indirizzo IP del Debian PC connesso alla
rete wifi domestica - supponiamo `192.168.2.51`\
\* Attiviamo il wifi sul dispositivo Android\
\* Apriamo il browser del nostro smartphone all'indirizzo:
`http://192.168.2.51/Hello%20Android.apk`\
\* Dopo che il browser ha finito di scaricare il pacchetto comparirà una
notifica: toccate la riga della notifica e vi verrà chiesto se volete
installare il pacchetto.

(il `%20` sostituisce lo spazio negli URL).
