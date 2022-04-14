---
title: "Google Web Toolkit"
date: "2006-05-18T18:25:00Z"
author: lucio.benfante
author_data:
    username: "lucio.benfante"
    fullname: "Lucio Benfante"
    email: "lucio.benfante@jugpadova.it"
---
Sembra che finalmente si potrà cambiare la maniera di scrivere le applicazioni Web.

Google ha rilasciato, con licenza Apache 2.0, il Google Web Toolkit (GWT) un framework per lo sviluppo di applicazioni Web AJAX "totalmente in Java", cioè senza dover scrivere codice HTML e JavaScript, ma solamente delle classi Java, molto simili a quelle usate in applicazioni Swing, che vengono successivamente tradotte da un apposito compilatore. Viene inoltre fornito un ambiente di esecuzione, che permette di eseguire l'applicazione in modalità "host", prima di compilarla, anche all'interno di un ambiente di sviluppo, usando quindi il normale debugger Java, e tutti i tool disponibili per questo linguaggio.

Il risultato è assolutamente stupefacente, e diventa alla portata di tutti realizzare applicazioni Web che non hanno nulla da invidiare a quelle desktop. Guardate e provate gli [esempi](http://code.google.com/webtoolkit/documentation/examples/)!

Purtroppo, leggendo un po' meglio, non viene tutto rilasciato con licenza opensource. Il compilatore Java-to-JavaScript e l' "hosted web browser" vengono distribuiti  solo in binario e occorre sottoscrivere un'apposita licenza, che sostanzialmente vieta di ridistribuirli, di derivarne ulteriori prodotti e di includerli in prodotti commerciali. Inoltre, ogni volta che si usa l'hosted web browser, verrà contattato un server di Google, per verificare che si sta usando la versione più aggiornata del prodotto. Però il codice e le classi prodotte con tali strumenti sono liberamente distribuibili, anche con scopi commerciali. 

Maggiori informazioni nel [sito Google Code](http://code.google.com/webtoolkit/).

