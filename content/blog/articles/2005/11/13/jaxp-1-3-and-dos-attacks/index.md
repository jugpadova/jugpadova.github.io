---
title: "JAXP 1.3 and DoS attacks"
date: "2005-11-13T07:36:00Z"
author: andrea.nasato
author_data:
    username: "andrea.nasato"
    fullname: "Andrea Nasato"
    email: "andrea.nasato@jugpadova.it"
categories:
    - name: "Tips & Tricks"
      permalink: "tips-and-tricks"
tags:
    - name: "xml"
      display: "xml"
---
One of the new aspects introduced in [JAXP 1.3](http://www.jcp.org/en/jsr/detail?id=206  ) is the opportunity to specify the security level of the <code>SaxParser</code> used. The target of this feature is to prevent the application from DoS (Denial of Service) attacks, which use some vulnerabilities of XML.
There are two main attack categories, let's see them:
<ol> 
<li><em>Entity Resolution</em>: suppose that XML stream requires a DTD and this DTD is in an external server and not local to your application. The parser requests the DTD to the server, which can send the DTD slowly or can give it malformed: in this case the parsing stops indefinitely. The solution to this problem is to set to a false value these properties:

<ul>
<li><code>parser.setFeature(
&nbsp;&nbsp;"http://xml.org/sax/features/external-general-entities",
&nbsp;&nbsp;false)</code></li>
<li><code>parser.setFeature(
&nbsp;&nbsp;"http://xml.org/sax/features/external-parameter-entities", 
&nbsp;&nbsp;false)</code></li>
</ul>
In this way the parser doesn't call the external server to resolve the DTD.</li>
<li><em>Overflow attack</em>: XML doesn't give a limit to the number of attributes of an element, and to the length of an element name. Overflow attacks start from this observation, and their objective is stop the server from fulfilling other requests: if the parser uses the DOM API it maintains a tree representation of XML in memory. When the parser encounters such XML streams it starts allocating objects for each attribute, saturating server memory. If you have such a problem and you use JAXP 1.3 you can set this property: <code>http://javax.xml.XMLConstants/feature/secure-processing</code>. With this property set, your parser rejects this kind of XML streams. You can have notification of such event in the <code>fatalError</code> method of the handler registered with the parser.</li>
</ol>

So if your boss is paranoid, or if your services could effectively be attacked in such a way, use JAXP 1.3 and those simple rules.
If you want more information about JAXP 1.3, [this](http://java.sun.com/developer/technicalArticles/xml/jaxp1-3/ ) is a good link. For a complete description of DoS attacks with XML [this](http://www-128.ibm.com/developerworks/xml/library/x-tipcfsx.html?ca=dnt-622 ) is a good tutorial.


