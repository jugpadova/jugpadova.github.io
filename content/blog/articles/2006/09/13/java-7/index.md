---
title: "Java 7"
date: "2006-09-13T10:55:00Z"
author: andrea.nasato
author_data:
    username: "andrea.nasato"
    fullname: "Andrea Nasato"
    email: "andrea.nasato@jugpadova.it"
categories:
    - name: "Programmazione"
      permalink: "programmazione"
tags:
    - name: "java"
      display: "java"
    - name: "closures"
      display: "closures"
    - name: "gosling"
      display: "Gosling"
---

No, non avete letto male, non è ancora uscita la release ufficiale di
Java 6, che già si pensa a cosa inserire in Java 7.

In questi giorni si è aperta nella blogosfera che ruota attorno a Java
una piccola guerra di religione sulla necessità o meno di inserire le
chiusure nel linguaggio.

Per chi è avezzo di Smalltalk, Ruby o anche C\# il concetto di chiusura
è familiare. Per chi invece ha visto solo Java, il concetto è nuovo (o
quasi).

Brevemente un [closure](http://www.martinfowler.com/bliki/Closure.html)
è una funzione dichiarata all'interno di un'altra funzione della quale
condivide le variabili.\
[Neil
Gafter](http://gafter.blogspot.com/2006/09/closures-for-java-version-01.html)
(già co-autore del Collection Framework) propone che questo tipo di
costrutto sia inserito anche all'interno di Java.

Il concetto non è completamente nuovo perché in Java esistono già dei
costrutti simili, le classi interne anonime, che svolgono grossomodo lo
stesso compito, con due differenze, secondo Gafter, importanti:

1.  Le classi interne anonime possono lavorare con variabili del metodo
    che le contiene solo se queste sono dichiarate <code>final</code>.
2.  La sintassi che si ottiene con le chiusure è più semplice e pulita.

Vediamo un piccolo esempio del secondo punto. Supponiamo di avere un
metodo che ha il compito di sottomettere un task ad un altro thread
(usando <code>java.util.concurrent.Executor</code>).

Con le classi anonime scriveremmo il seguente codice:

```\
void sayHelloInAnotherThread(Executor ex) {\
ex.execute(new Runnable() {\
public void run() {\
System.out.println("hello");\
}\
});\
}\
```

mentre con le chiusure potremmo scrivere (la sintassi è ancora oggetto
di discussione):

```\
void sayHelloInAnotherThread(Executor ex) {\
ex.execute(() {\
System.out.println("hello");\
});\
}\
```

La questione è aperta. Anche
<a href="http://blogs.sun.com/jag/entry/the_black_hole_theory_of">James
Gosling</a> ha espresso dubbi circa la vera utilità di tale feature.

Staremo a vedere.
