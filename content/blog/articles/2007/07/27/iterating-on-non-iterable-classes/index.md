---
title: "Iterating on non-iterable classes"
date: "2007-07-27T04:42:00Z"
author: lucio.benfante
author_data:
    username: "lucio.benfante"
    fullname: "Lucio Benfante"
    email: "lucio.benfante@jugpadova.it"
---
(You'll find all the code of this post in [Benfante's Utilities](http://www.benfante.com/bensite/sourcecode.jsf) mini-library)

One of the futures I 'm reappraising is the JDK 5 enhanced for statement.

I still consider it too limited, but it's very comfortable in the simplest (and maybe common) cases.

But...what if the elements on which you want to iterate are not managed by an Iterable class?

For example, this happens with the [XOM](http://www.xom.nu/) library, where the Element.getChildElements returns an instance of the Elements class, wich is neither a Collection, or an Iterable class. So, for iterating on children elements, you have to use the basic for statement:

```java
for (int i=0; i < elements.size(); i++) {
  Element element = elements.get(i);
  // etc...
}
```

I would like to write simply:

```java
for (Element element: elements) {
  // etc...
}
```

So I wrote an **<code>Iterabletor</code>** class that builds a proxy around a class, enhancing it with the Iterable interface.

Now You can write:

```java
Iterable<Element> iterable =
  new Iterabletor<Element>(elements).getIterable();

for (Element element: iterable) {
  // etc...
}
```


Take a look at how I realaized this.

First, the <code>Iterabletor</code> class:

```java
package com.benfante.utils.iterabletor;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.util.Iterator;

/**
 * A class for add iterability to another class
 * 
 * @author lucio
 */
public class Iterabletor<T> implements InvocationHandler {

    private final Object obj;
    private Class<? extends Iterator> iteratorClass;

    /**
     * Prepare for iterability the passed object using a XOMIterator.
     *
     * @param The object on which iterate.
     */
    @SuppressWarnings(value = "unchecked")
    public Iterabletor(Object obj) {
        this.obj = obj;
        this.iteratorClass = XOMIterator.class;
    }

    /**
     * Prepare for iterability the passed object using the passed iterator class.
     *
     * @param The object on which iterate.
     */
    public Iterabletor(Object obj, Class<? extends Iterator> iteratorClass) {
        this.obj = obj;
        this.iteratorClass = iteratorClass;
    }

    @SuppressWarnings(value = "unchecked")
    public synchronized Iterable<T> getIterable() {
        Class<?> objClass = obj.getClass();
        Class<?>[] oldInterfaces = objClass.getInterfaces();
        Class<?>[] newInterfaces = new Class<?>[oldInterfaces.length + 1];
        System.arraycopy(oldInterfaces, 0, newInterfaces, 0, oldInterfaces.length);
        newInterfaces[newInterfaces.length - 1] = Iterable.class;
        return (Iterable<T>) Proxy.newProxyInstance(objClass.getClassLoader(),
                newInterfaces,
                this);
    }

    @SuppressWarnings(value = "unchecked")
    private Iterator<T> iterator() {
        try {
            return (Iterator<T>) iteratorClass
                .getConstructor(Object.class).newInstance(obj);
        } catch (Exception e) {
            throw new UnsupportedOperationException("No contructor(object)", e);
        }
    }

    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        if (method.getName().equals("iterator")) {
            return this.iterator();
        } else {
            try {
                return method.invoke(obj, args);
            } catch (InvocationTargetException ite) {
                throw ite.getCause();
            }
        }
    }
}
```

The default Iterator is XOMIterator (you can imagine why this name :) ), which reflect on the "collection", calling the get(int) and size() methods:

```java
package com.benfante.utils.iterabletor;

import java.util.Iterator;
import org.apache.log4j.Logger;

/**
 * An Iterator for XOM-like collection classes
 * ...i.e. classes with get(int) and size() methods.
 * 
 * @author lucio
 */
public class XOMIterator<T> implements Iterator<T> {

    private static final Logger logger = Logger.getLogger(XOMIterator.class);
    private Object obj;
    private int index;

    public XOMIterator(Object obj) {
        this.obj = obj;
    }

    public boolean hasNext() {
        try {
            int count = ((java.lang.Integer) obj.getClass()
                    .getMethod("size", new Class[0])
                    .invoke(obj)).intValue();
            return index < count;
        } catch (Exception ex) {
            logger.error("No size() method in the target object ("
                    + obj.getClass().getName() + ")", ex);
            throw
                    new UnsupportedOperationException(
                    "No size() method in the target object ("
                    + obj.getClass().getName() + ")", ex);
        }
    }

    @SuppressWarnings(value = "unchecked")
    public T next() {
        try {
            return (T) obj.getClass()
                    .getMethod("get", new Class<?>[]{int.class})
                    .invoke(obj, new Integer(index++));
        } catch (Exception ex) {
            logger.error("No get(int) method in the target object ("
                    + obj.getClass().getName() + ")", ex);
            throw
                    new UnsupportedOperationException(
                    "No get(int) method in the target object ("
                    + obj.getClass().getName() + ")", ex);
        }
    }

    public void remove() {
        throw new UnsupportedOperationException("Not supported.");
    }
}
```

Of course, You can use a different Iterator:

```java
Iterator<MyElement> iterable =
    new Iterabletor<MyElement>(element, MyIterator.class)
        .getIterable();
```
