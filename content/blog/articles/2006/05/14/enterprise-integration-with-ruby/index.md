---
title: "Enterprise Integration with Ruby"
date: "2006-05-14T08:15:00Z"
author:
    username: "lucio.benfante"
    fullname: "Lucio Benfante"
    email: "lucio.benfante@jugpadova.it"
categories:
    - name: "Recensioni"
      permalink: "recensioni"
tags:
    - name: "ruby"
      display: "ruby"
    - name: "enterprise"
      display: "enterprise"
    - name: "integration"
      display: "integration"
---

<table>
<tr>
<td>

<a href="/files/0976694069.jpg"><img src="/files/0976694069.jpg" alt="Cover: Enterprise Integration with Ruby" width="120" border="0"/></a>

</td>
<td>

Titolo: Enterprise Integration with Ruby<br/>Autore: Maik
Schmidt<br/>Pagine: 346<br/>Anno: 2006<br/>Casa Editrice: The Pragmatic
Programmers LLC.<br/>ISBN: 0-9766940-6-9<br/>

</td>
</tr>
</table>

Una recensione di un libro su Ruby nel sito di un Java User Group?
Perchè no? Inoltre il libro, almeno leggendo il titolo, parla di
Enterprise Integration, un campo in cui Java la fa da padrone, almeno
leggendo le parole dei markettari, quindi come minimo può essere utile
per fare un confronto.

Premetto che, almeno per ora, non programmo in Ruby e mi sono limitato
solamente all'installazione di Ruby on Rails e a provare pochi banali
esempi. Al momento non sono convinto dell'effettiva utilità di Ruby e di
Rails, se non per uno sviluppo molto rapido, ma di applicazioni
piuttosto semplici e "regolari". Credo che quando la complessità aumenta
e l'applicazione richiede funzionalità meno standard, gran parte dei
vantaggi dell'addozione di Ruby rispetto a Java si perdano, ed anzi lo
sviluppo possa diventare più complicato.

...ma probabilmente mi sbaglio...e mi auguro che la lettura di questo
libro mi chiarisca un po' le idee.

Questa non vuole essere una vera e propria recensione, ma piuttosto un
diario di lettura. Sia perchè non ho voglia di scrivere qualcosa di
troppo organizzato, sia perchè fra qualche giorno devo passare il libro
al nostro amico Paul Given (in arte Paolo Donà), che sarà sicuramente
capace di scrivere una recensione migliore della mia, dato che conosce
meglio Ruby.

Ma passiamo al libro...\
*\[14 Maggio 2006...mattina\]*

Iniziato, e letti tutti d'un fiato i primi due capitoli (Introduction e
Databases). Secondo l'introduzione il libro è adatto a me :) : "...for
experienced enterprise developers who know Java, C\#, or C[]{.underline}
but don't know much Ruby...". Perfetto! Nell'introduzione non c'e' molto
altro, se non una breve descrizione di cosa si intende per enterprise
software ed enterprise integration. In tutto sette pagine, compresi i
ringraziamenti e un diagramma che descrive l'infrastruttura
dell'applicazione d'esempio.

Il secondo capitolo, dedicato ai database, è suddiviso in due parti: la
prima dedicata ai database relazionali, la seconda all'accesso a servizi
di directory mediante LDAP. L'approccio usato dal libro, fedele allo
stile della serie "Pragmatic Bookshelf", è quello di mostrare molti
esempi e molto codice, più che perdersi nella teoria. L'accesso ai
database viene spiegato usando, in sequenza, delle librerie ad-hoc per
Oracle e MySQL (contemporaneamente), una libreria con un'interfaccia
generica indipendente dal DB (DBI), e un framework di mapping
object-relational, ActiveRecord.

Nella parte su LDAP, si inizia con una breve introduzione alle
caratteristiche di tali database. Ne viene poi mostrato l'utilizzo in
Ruby, prima con la libreria Ruby/LDAP, e in seguito mediante ActiveLDAP,
l'equivalente di ActiveRecord per il mapping object-hierachical.

Il tutto è un discreto tutorial, di livello base, sulle tecniche di
accesso a tecnologie enterprise, database in questo caso, in Ruby.
Purtroppo non è esattamente quello che mi sarei aspettato da un libro
con questo titolo. Non vengono assolutamente affrontate le problematiche
di integrazione. L'unico spunto viene dato dal primo esempio, in cui si
accede a dati presenti in due database differenti (uno Oracle e l'altro
MySQL), ma senza comunque affrontare molti dei problemi che questo può
comportare. Ad esempio, non ci si preoccupa assolutamente della
transazionalità, risolta semplicemente attivando l'autocommit.

Anche nel caso di LDAP, ci si limita all'accesso ad OpenLDAP, senza
nessuna considerazione sulle problematiche di utilizzo di altri sistemi
di directory.

*\[15 Maggio 2006...mattina\]*

Il terzo capitolo si intitola "Processing XML". Iniziare così il lunedì
mattina? Noooo...passiamo oltre...cioè alla fine! :)

L'ultimo capitolo, il sesto, si chiama "Tools and Techniques"...un po'
più stimolante.

La prima sezione tratta di I18n e L10n. A quanto pare è attualmente un
punto dolente di Ruby, dato che il supporto è minimo e assolutamente non
completo. Comunque ci si può riuscire...facendo molta attenzione. A
parte alcune soluzioni "artigianali" per il trattamento dei caratteri, e
la citazione di un paio di librerie incomplete o non più mantenute
(jcode e unicode), la parte interessante è l'esame della libreria ICU4R,
decisamente promettente. Per quanto riguarda la localizzazione dei
messaggi, viene suggerita la libreria Ruby-GetText, porting in Ruby
della GNU gettext. Francamente la trovo un po' macchinosa. A parte le
probabili attuali limitazioni di Ruby in questo campo, che probablmente
spariranno col tempo, per quanto riguarda il libro, mi sarei aspettato
almeno un accenno o un tentativo di integrazione con i sistemi di
localizzazione di altri linguaggi, ad esempio con il meccanismo dei
ResourceBundle di Java...peccato.

Segue una sezione sul logging, con l'esame delle librerie Logging e
Log4R, l'equivalente il Ruby delle varie Log4J, Log4cpp, ecc. Niente da
dire. Peccato anche in questo caso che non ci sia un tentativo, di
riutilizzo-conversione almeno dei file di conversione delle liberie
delle altre famiglie.

Molto interessante invece la sezione sulla creazione di deamon e
servizi, sia in ambiente Unix, sia in ambiente Windows. Non c'e' molto
da dire su questo, ma, a parte RubyGems, per chi non lo conosce ancora,
è sicuramente la sezione più eccitante del capitolo.

Passando al processo di Build e Deployment, esamina setup.rb,
l'equivalente in Ruby di autoconf, e RubyGems. Quest'ultimo è un sistema
assolutamente comodo di installazione e di deployment, e, malgrado la
mia scarsissima esperienza (ma anche nel libro si afferma questo), credo
stia diventando il meccanismo standard di distribuzione di software
Ruby. Peccato venga trattato troppo brevemente, e solo per quanto
riguarda l'installazione delle Gems. Ci si dilunga invece su setup.rb,
mostrando anche come costruire un pacchettizzazione di un piccolo
progetto con questo tool.

La sezione successiva tratta dell'automazione del progetto, cioè del
processo di sviluppo. Viene suggerito sono Rake, l'equivalente in Ruby
di make. Paragonato con i tool presenti in Java (ad esempio Ant e Maven)
è decisamente un passo indietro. Brevemente: non portabile e con una
sintassi macchinosa come quella del make originale. Se non ricordo male,
esistono altri tool a questo scopo (un grazie a chi me li ricorda :) ).

L'ultima sezione è un tentativo di eseguire dei system test sulle
applicazioni legacy. Il risultato è poco più dell'automazione di una
serie di diff sull'output delle applicazioni, confrontato con l'output
di un'esecuzione precedente. Niente che non potesse essere realizzato
con un normale shell script, senza scomodare Ruby. Discutibile anche la
scelta di utilizzare YAML per la descrizione del testcase, invece di un
comune file XML.

*\[16 Maggio 2006...mattina\]*

Ok...coraggio...vediamo sto capitolo su XML (si capisce che odio l'XML?
:) ) ...ma purtroppo è un male necessario, e, quando non se ne abusa con
l'utilizzo, anche utile.

Il capitolo tutto sommato non è male. Ovviamente introduce,
fortunatamente molto brevemente, le basi dell'XML, per poi passare alla
generazione, parsing e validazione in Ruby. C'è anche una sezione
dedicata a XPath, che forse poteva essere evitata, o almeno ridotta (a
chi potrà mai interessare una tabella, che occupa metà di una pagina,
degli operatori booleani di XPath: =, !=, \>, ecc...?)

Il primo approccio alla generazione è quello "artigianale" mediante
concatenazione di stringhe. Ovviamente sconsigliato anche dallo stesso
autore, ma è comunque un modo per concentrarsi sui problemi di
generazione dell'XML e un buon esempio di codice Ruby sul trattamento
delle stringhe. Successivamente viene mostrato come si dovrebbe fare
"sul serio", mediante la libreria
\[REXML\](http://www.ruby-doc.org/stdlib/libdoc/rexml/rdoc/) e mediante
la libreria \[Builder\](http://builder.rubyforge.org/).

Passando alla elaborazione/parsing di documenti XML, viene mostrato
l'utilizzo di REXML, che supporta sia un tree parsing (proprietario, non
DOM standard), sia due metodi di stream parsing, uno proprietario e
quello SAX2. Il supporto a quest'ultimo è molto buono, a parte ciò che
ha a che fare con il DTD. Inoltre si evidenziano alcuni vantaggi
derivanti dall'utilizzo di un linguaggio dinamico come Ruby, che evita
alcune delle "noiosità" sintattiche di un linguaggio statico e
fortemente tipizzato come Java.

Viene poi mostrato l'utilizzo di una libreria per l'XML binding, tipo
\[XMLBeans\](http://xmlbeans.apache.org), per capirci. La libreria si
chiama \[XmlSimple\](http://rubyforge.org/projects/xml-simple/), ed è il
porting in Ruby del modulo Perl XML:Simple. Peccato che il risultato sia
assolutamente equivalente al progetto Perl originale: una serie di array
e hashmap. Con le possibilità di generazione dinamica di Ruby mi sarei
aspettato qualcosa di più. Possibile che non esista niente di meglio?

Segue la nota dolente dell'attuale supporto XML di Ruby: la validazione.
Paraticamente nulla, almeno per le librerie esaminate in questo libro.
REXML supporta parzialmente RELAX NX, ma per nulla DTD e Schema. Se
proprio serve (? certo che serve!), nel libro viene suggerito di
invocare un tool esterno a riga di comando: xmllint.

In conclusione del capitolo vengono presentate, con esempi di codice
Ruby, le alternative all'uso di XML: CSV, Properties Files alla Java e
(entusiasticamente) YAML. Personalmente non condivido l'entusiasmo per
YAML...

*\[19 Maggio 2006...mattina\]*

Mooolto interessante il capitolo 5 "Low-Ceremony Distributed
Applications". Con questa dicitura l'autore intende applicazioni in
grado di comunicare all'esterno con dei protocolli molto semplici.

Viene quindi mostrato come costruire dei semplici TCP server
multi-thread. Mediante la libreria gserver, il tutto si risolve in
veramente poche righe di codice. Gi esempi costruiscono un semplice log
server, di cui vengono scritti i client in Ruby (ovviamente), Java e
Perl. In seguito al server vengono aggiunte le capacità di memorizzare
le voci di log in un database con ActiveRecord, e di spedire un'e-mail
in caso di logging di un fatal error. La libreria usata in questo caso è
\[tmail\](http://raa.ruby-lang.org/project/tmail/).

La seconda parte del capitolo si dedica invece ad applicazioni che
comunicano tramite il protocollo HTTP. Viene quindi mostrato come
scrivere dei client e dei server HTTP. Quest'ultimo compito viene rese
quasi banale dall'utilizzo della libreria
\[WEBrick\](http://www.webrick.org/). In pochi secondi si riesce a
mettere in piedi un server HTTP, eventualmente con supporto SSL, vari
tipi di autenticazione, la capacità di leggere le password dallo stesso
file di Apache httpd, e molto altro.

*\[20 Maggio 2006...mattina\]*

Lettura veloce del capitolo 5 "Distributed Applications with RPC", dato
che fra qualche ora devo mollare il libro a Paolo.

Anche questo, come il capitolo 4, è uno dei capitoli per cui secondo me
vale la pena di leggere il libro. In una sessantina di pagine viene
mostrato come usare in Ruby praticamente tutte le tecnologie per
intefacciarsi con applicazioni scritte in altri linguaggi (e viceversa):
XML-RPC, HTTP/REST, SOAP, CORBA e RMI.

Interessante, soprattutto dal punto di vista dell'integrazione,
l'approccio per CORBA (l'uso di RMI non viene mostrato, dato che è
ottenibile nella stessa maniera).\
Dato che non esiste, e probabilmente non esisterà mai,
un'implementazione di CORBA per Ruby...viene usata l'implementazione
corba di Java, usando direttamente una JVM e le classi Java da Ruby,
mediante \[rjb\](http://raa.ruby-lang.org/project/rjb/) (Ruby Java
Bridge). rjb usa la Java Native Interface per istanziare qualunque
classe Java da Ruby.

Infine viene mostrato l'uso di
\[dRuby\](http://raa.ruby-lang.org/project/druby/), l'equivalente in
Ruby dell'RMI in Java...decisamente sconsigliato, se l'obiettivo è
l'interoperabilità con altri linguaggi.

Concludendo....il libro è sicuramente da consigliare, soprattutto a chi
non conosce molto Ruby, e vuole farsi un'idea di come potrebbe essere
utilizzato in un ambiente eterogeneo. Il livello non è sicuramente
avanzato, ma intermedio, e questo è un peccato: in alcuni argomenti si
sarebbe potuto andare un po' più a fondo. La critica principale da fare
è che generalmente tende ad essere una mera esposizione con esempi delle
librerie disponibili in Ruby per usare le tecnologie che normalmente si
usano in ambiente enterprise. Mi sarei aspettato un'attenzione maggiore
ai problemi che si incontrano affrontando l'integrazione in ambiente
enterprise.

Ad esempio, nella sezione su SOAP viene semplicemente mostrato come
creare un servizio SOAP in Ruby. Possibile che non ci sia proprio nessun
problema o difficoltà ad usare tale servizio da client .NET o Java? O,
viceversa, che non si debba usare qualche accortezza se dobbiamo
accedere a servizi SOAP scritti in .NET o Java usando un client scritto
in Ruby?
