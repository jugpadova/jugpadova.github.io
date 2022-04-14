---
title: "Ma voi le wrappate le liste?"
date: "2006-12-06T07:45:00Z"
author: paolo.dona
author_data:
    username: "paolo.dona"
    fullname: "Paolo Dona'"
    email: "paolo.dona@jugpadova.it"
categories:
    - name: "Tips & Tricks"
      permalink: "tips-and-tricks"
tags:
    - name: "list"
      display: "list"
---

Ciao, in un progetto su cui sto lavorando sto provando un approccio che
non avevo mai usato in passato per le liste di oggetti java, immaginate
che di avere una lista tipo:

<code>

    List<SomeObject> list = new ArrayList<SomeObject>();

</code>

Se volessi estrarre dalla lista tutti gli elementi aventi un certo campo
valorizzato ad un dato valore, ovvero fare un filtro, farei:

<code>

    class SomeObject {
      public static List<SomeObject> filterByField(List<SomeObject> input, String value) {
        // ciclo la lista input e restituisco una lista nuova con gli oggetti che hanno field=value 
      }
    }

</code>

usato così:

<code>

    List<SomeObject> all = new ArrayList<SomeObject>();
    List<SomeObject> filtered = SomeObject.filterByField(all, "someValue");

</code>

Il fatto però di avere metodi statici 'helper' dentro `SomeObject` per
aggiungere funzionalità ad una lista non mi piace molto... ho provato
invece a wrappare `List` e a spostare il metodo `filerByValue` da
`SomeObject` alla nuova classe `SomeObjects`:

<code>

    class SomeObjects extends ArrayList<SomeObject> {
       public SomeObjects filterByField(String value){
         // filtro ciclando gli elementi in this e restituisco una nuova istanza di SomeObjects
       }
    }

</code>

Il codice di utilizzo quindi diventa:\
<code>

    SomeObjects all = new SomeObjects();
    SomeObjects filtered = all.filterByField("someValue");

</code>

Che mi pare molto più pulito e leggible, che ve ne pare?

So che non è un gran cambiamento, ma ho un parametro in meno per ogni
`filterByXXX` che desidero aggiungere e ogni metodo è nel posto che gli
compete, ovvero i medoti per filtrare una lista stanno nella lista e non
come metodi helper dell'oggetto contenuto.

Un'altro punto dove questo approccio è utile è nei Dao che wrappano
funzionalità di IBatis o Hibernate, dove si trova spesso codice di
questo tipo per prevenire il ritorno di liste nulle:

<code>

    List<SomeObject> result = new ArrayList<SomeObject>();
    result.addAll( ...queryForList("your query", param));
    return result;

</code>

Con i wrapper possiamo scrivere un costruttore ad hoc, che prende una
lista in input e fa `addAll(...)` solo se è diversa da `null`:

<code>

    public class SomeObjects extends ArrayList<SomeObject> {

        public SomeObjects () {}

        public SomeObjects (Collection<SomeObject> c) {
           if (c!=null) addAll(c);
        }
    }

</code>

E il codice di utilizzo diventa magicamente:

<code>

    return new SomeObjects(...queryForList("your query", param));

</code>

Fatemi sapere che ne pensate, io mi sto trovando bene con questo
approccio.

<small>\
[Paolo Donà](mailto:paolo.dona@seesaw.it) si occupa di sviluppo web in
Java e Ruby, sviluppo progetti su commessa e formazione/training. Potete
contattarlo via mail o leggere il suo blog
[aziendale](http://blog.seesaw.it) o
[personale](http://paolodona.blogspot.com). \
</small>
