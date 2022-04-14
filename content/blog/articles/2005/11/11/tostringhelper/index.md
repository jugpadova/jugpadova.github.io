---
title: "ToStringHelper"
date: "2005-11-11T18:49:00Z"
author: lucio
author_data:
    username: "lucio"
    fullname: ""
    email: ""
categories:
    - name: "Tips & Tricks"
      permalink: "tips-and-tricks"
tags:
---
One of the traits I personally appreciate most in a good programmer is what I call the _"constructive laziness"_. It is the attitude to build software solutions for avoiding boring activities.

One of the most frequent and boring activities happening in the writing of a Java class is the implementation of the toString method, especially if the class contains lot of attributes and if it is frequently updated.

Last summer, in a mood of constructive laziness than surely doesn't make me a good programmer, I wrote a small class library that tries to solve this problem.  Using such library you can write a toString method as simple as the following:

<code>
public String toString() { ToStringHelper.toString(this);  }
</code>


Furthermore the ToStringHelper class is configurabile, allowing the choice of various strategies for producing its output, even without the need of recompiling the application. The default configuration builds the output reflecting on the object attributes. You can modify it:

*  at startup, setting the system property <code>com.benfante.utils.string.ToStringHelper.defaultWorker</code> with the name of your worker class. For example, passing to the JVM the parameter <code>-Dcom.benfante.utils.string.ToStringHelper.defaultWorker = com.benfante.utils.string.ObjectToStringWorker</code>, the ToStringHelper class will produce its output like the toString method of the <code>java.lang.Object</code> class. Of course you can write your own worker class, implementing the ToStringWorker interface. Your worker must have a no-parameter constructor.
* at run-time, calling the <code>ToStringHelper.setWorker(ToStringWorker)</code> static method.

The library is freely usable, released under the Apache License v. 2.0. You can download it from [here](http://snipurl.com/bencode).


