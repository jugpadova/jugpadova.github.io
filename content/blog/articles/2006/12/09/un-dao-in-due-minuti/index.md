---
title: "Un DAO in DUE minuti"
date: "2006-12-09T05:40:00Z"
author: lucio.benfante
author_data:
    username: "lucio.benfante"
    fullname: "Lucio Benfante"
    email: "lucio.benfante@jugpadova.it"
---
[Parancoe](https://parancoe.dev.java.net) è un framework Web pensato per scrivere rapidamente applicazioni Web "di tutti i giorni", cioè applicazioni senza requisiti particolari, quelle che nel 90% dei casi viene richiesto di sviluppare. Lo scopo quindi non è avere un framework iper-flessibile, capace di adattarsi a tutti i requisiti possibili, ma un framework che renda _molto_ semplice la vita al programmatore sviluppando quel particolare tipo di applicazioni.

Il suo modulo di persistenza segue la stessa filosofia e permette di ottenere in pochi minuti le classi per accedere ai dati (DAO - Data Access Object) dell'applicazione, memorizzati in un database relazionale.

Ad esempio, supponiamo di avere una classe persistente <code>Person</code>, mappata sul DB mediante [Hibernate](http://www.hibernate.org). Per ottenere il suo DAO con Parancoe è sufficiente scriverne l'interfaccia:

```java
@Dao(entity=Person.class)
public interface PersonDao extends GenericDao<Person, Long> {}
```

...e scriverne una semplice configurazione per Spring:

```xml
<parancoe:dao id="personDao"
    interface="org.parancoe.example.dao.PersonDao"/>
```

Già così avete ottenuto un DAO con i seguenti metodi:

* <code>Long create(Person newInstance);</code>
* <code>Person read(Long id);</code>
* <code>void update(Person transientObject);</code>
* <code>void delete(Person persistentObject);</code>

Notate che non sono metodi "generici", ma usano il tipo dell'oggetto persistente, quindi non sono necessari cast.

Ma si può andare oltre. Supponiamo che abbiate bisogno di un metodo per ottenere la lista delle persone con un determinato nome e cognome. Con [Parancoe](https://parancode.dev.java.net) è sufficiente modificare l'interfaccia, aggiungendo tale metodo:

```java
@Dao(entity=Person.class)
public interface PersonDao extends GenericDao<Person, Long> {
    List<Person> findByFirstNameAndLastName(
        String firstName, String lastName);
}
```

Questo è tutto: non è necessario scrivere l'implementazione di tale metodo, nè modificare la configurazione del DAO.

Per saperne di più leggete [questo tutorial](http://wiki.java.net/bin/view/Projects/ParancoePersistenceTutorial) nel [wiki](http://wiki.java.net/bin/view/Projects/Parancoe) del progetto.

Se poi volete contribuire, anche solo per dare suggerimenti su come proseguire nello sviluppo, commentate questo articolo e visitate il sito del progetto:

[http://parancoe.dev.java.net](http://parancoe.dev.java.net)

Potete anche iscrivervi alle mailing-list del progetto:

[https://parancoe.dev.java.net/servlets/ProjectMailingListList](https://parancoe.dev.java.net/servlets/ProjectMailingListList)

*Aggiornato 28/12/2006:* è cambiato il modo di configurare i bean DAO.


