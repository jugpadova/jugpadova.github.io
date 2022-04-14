---
title: "Bug storico..."
date: "2006-06-16T05:03:00Z"
author:
    username: "lucio.benfante"
    fullname: "Lucio Benfante"
    email: "lucio.benfante@jugpadova.it"
categories:
    - name: "Programmazione"
      permalink: "programmazione"
tags:
    - name: "bug"
      display: "bug"
    - name: "binary"
      display: "binary"
    - name: "search"
      display: "search"
    - name: "overflow"
      display: "overflow"
---
...presente nel JDK, e probabilmente nella maggior parte delle implementazioni di algoritmi con approccio "divide et impera".

Quanti di noi non hanno mai scritto questa semplice e innocente riga di codice (con <code>low</code> e <code>high</code> di tipo <code>int</code>)?

```int mid = (low+high)/2;```

Il problema è che la somma dei due interi può risultare in un overflow...gosh...

L'implementazione corretta sarebbe qualcosa di simile a:

```int mid = low + ((high-low)/2);```

Provate a cercare in qualunque libro di algoritmi e vedrete che anche i grandi sbagliano. Io ho guardato in "'The Art of Computer Programming' (Volume 3)":http://www.awprofessional.com/title/0201896850), e anche l'implementazione dell'algoritmo di ricerca binaria di "Donald E. Knuth":http://www-cs-faculty.stanford.edu/~knuth/ soffre dello stesso bug.

Per quanto riguarda il JDK, il bug si trova (almeno) nel metodo <code>binarySearch</code> della classe <code>java.utils.Arrays</code>. A me non è mai capitato, ma ve l'immaginate la sorpresa (per non dire altro) di vedervi sollevare un ArrayIndexOutOfBoundsException da un metodo di quella classe?

L'annuncio e la discussione del bug li fa lo stesso autore della classe, Josh Bloch, in questo "blog":http://googleresearch.blogspot.com/2006/06/extra-extra-read-all-about-it-nearly.html.


