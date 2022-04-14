---
title: "Mustang SplashScreen"
date: "2006-04-01T07:45:00Z"
author: lucio.benfante
author_data:
    username: "lucio.benfante"
    fullname: "Lucio Benfante"
    email: "lucio.benfante@jugpadova.it"
categories:
    - name: "Tips & Tricks"
      permalink: "tips-and-tricks"
tags:
    - name: "mustang"
      display: "Mustang"
    - name: "desktop"
      display: "desktop"
    - name: "splashscreen"
      display: "splash screen"
---
[Mustang](https://mustang.dev.java.net/) will be the next release of the Java Standard Edition (Java SE 6). At present Mustang is in beta, it will be delivered in [Autumn 2006](http://weblogs.java.net/blog/ray_gans/archive/2006/01/where_we_are_wi.html).

One of the new [desktop features](http://java.sun.com/developer/technicalArticles/J2SE/Desktop/mustang/index.html)
of Mustang is the capability of showing a splash screen even before the starting of the Java Virtual Machine.

You can configure the splash screen by command line:
```
java -splash:mysplash.gif MyApplication
```
...or, if your application is packaged in a JAR file, using the _SplashScreen-Image_ option in the manifest file:
```
Manifest-Version: 1.0
Main-Class: MyApplication
SplashScreen-Image: mysplash.gif
```
For testing this new cool feature of Mustang, I wrote a small example, with some supporting classes. For trying it you can download the Splasher.jar file from [here](http://www.snipurl.com/bencode). Execute it using:
```
java -jar Splasher.jar
```
...of course you have to download and install [Mustang](https://mustang.dev.java.net/).
After the launch of the JVM the application can control and even drawing on the splash screen, retriving the SplashScreen object:
```java
SplashScreen splash = SplashScreen.getSplashScreen();
Graphics2D g = (Graphics2D)splash.getGraphics();
Rectangle r = splash.getBounds();
FontMetrics fm = g.getFontMetrics();
// drawing a message at the bottom of the splash screen
g.drawString("Welcome!",
            1, (int)r.getHeight()-1-fm.getDescent());
splash.update();
```
You can dismiss the splash screen using the close() method:
```java
splash.close();
```
This call is usually not needed as the splash screen will be **automatically** closed when the first window of the application will be made visible.

Some useful links:

* [SplashScreen javadoc](http://download.java.net/jdk6/docs/api/java/awt/SplashScreen.html)
* [A JDC TechTip](http://java.sun.com/developer/JDCTechTips/2005/tt1115.html)
* [An SDN article](http://java.sun.com/developer/technicalArticles/J2SE/Desktop/mustang/splashscreen/) (little outdated, but still good)
