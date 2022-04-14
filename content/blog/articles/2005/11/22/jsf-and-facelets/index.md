---
title: "JSF and Facelets"
date: "2005-11-22T10:42:00Z"
author: andrea.nasato
author_data:
    username: "andrea.nasato"
    fullname: "Andrea Nasato"
    email: "andrea.nasato@jugpadova.it"
---

One of the main issues with JSF is the plenty of use of custom tags in
the view. If you don't want to use a visual instrument like Java Studio
Creator, building a page could become a nightmare, especially if your
graphic designer uses a huge amount of html components.

If you ever tried Tapestry you know that with that framework this is not
a problem, when you have the html template you have only to put the
proper attribute to dynamically rendered tags and it's all done.

Now also JSF allows you to do that: the project
[facelets](https://facelets.dev.java.net/) aims to have the same
approach used when developing with Tapestry. With facelets you can use
templating and write a plain html file as a view.

Facelets is registered in the JSF framework as a `ViewHandler`, so the
only things you have to do to start using facelest are

-   *make JSF use facelets as ViewHandler*: put those lines in the
    `faces-config.xml`

```xml\
<faces-config>\
<application>\
<view-handler>com.sun.facelets.FaceletViewHandler</view-handler>\
</application>\
</faces-config>\
```

-   *import libraries*: you have to put in your classpath the facelets
    implementation jar (jsf-facelets.jar) that you can find in the
    facelets' site.

<!-- -->

-   *modify the DEFAULT\_SUFFIX param*: facelets pages are simple xhtml
    files. JSF by default uses jsp files as view, so you have to tell
    the framework that now the views are the xhtml files. To do this you
    simply modify your `web.xml` in this way:

```xml\
<context-param>\
<param-name>javax.faces.DEFAULT\_SUFFIX</param-name>\
<param-value>.xhtml</param-value>\
</context-param>\
```

If you don't want to become crazy with html stuff (your graphic designer
is paid enough for this, isn't it?) and you want to use JSF, try out
facelets. If you want to learn more about facelets
[here](http://www.jsfcentral.com/articles/facelets_1.html) you can find
an introductive article and
[here](https://facelets.dev.java.net/nonav/docs/dev/docbook.html) you've
got the reference documentation.
