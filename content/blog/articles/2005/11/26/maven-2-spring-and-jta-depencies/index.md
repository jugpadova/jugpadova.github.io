---
title: "Maven 2: Spring and JTA dependencies"
date: "2005-11-26T08:06:00Z"
author:
    username: "lucio.benfante"
    fullname: "Lucio Benfante"
    email: "lucio.benfante@jugpadova.it"
categories:
    - name: "Tips & Tricks"
      permalink: "tips-and-tricks"
tags:
    - name: "maven"
      display: "maven"
    - name: "spring"
      display: "spring"
    - name: "jta"
      display: "jta"
    - name: "dependency"
      display: "dependency"
---
Few weeks ago I started using [Maven 2](http://maven.apache.org) for one of my development projects. The project is very simple, but it has dependencies with some external libraries, in particular with [Spring](http://www.springframework.org):

```xml
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring</artifactId>
  <version>1.2.6</version>
  <scope>runtime</scope>
</dependency>
```


Introducing this dependency I had the following errors:

```
Downloading: ->
    http://repo1.maven.org/maven2/javax/transaction ->
      /jta/1.0.1B/jta-1.0.1B.jar
[WARNING] Unable to get resource from repository central ->
    (http://repo1.maven.org/maven2)
...
[INFO] Failed to resolve artifact.

required artifacts missing:
 javax.transaction:jta:jar:1.0.1B
```

This happened because Spring has a transitive dependency with the Sun's JTA classes, but the JTA jar can't be inserted in the [Maven repository](http://www.ibiblio.org/maven2/) because the Sun's Binary License.

For solving this dependency you have to download the _jta-1\_0\_1B-classes.zip_ file from the [Sun's site](http://java.sun.com/products/jta/) and install it into your local repository using the following command:

```
mvn install:install-file \
  -Dfile=./jta-1_0_1B-classes.zip \
  -DgroupId=javax.transaction \
  -DartifactId=jta -Dversion=1.0.1B \
  -Dpackaging=jar
```


More general information in these Maven's mini guides:
* [Coping with SUN JARs](http://maven.apache.org/guides/mini/guide-coping-with-sun-jars.html)
* [Guide to installing 3rd party JARs](http://maven.apache.org/guides/mini/guide-installing-3rd-party-jars.html)
