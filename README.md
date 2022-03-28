# Anti-Scam Bank Transaction Monitor

This code demonstrates a method for banks to use client-side monitoring to detect if HTML has been altered on an already-downloaded bank page.

## Live Demo

A live demo can be found at [https://backupbrain.github.io/anti-scam-bank-page-monitor/demo.html](https://backupbrain.github.io/anti-scam-bank-page-monitor/demo.html)

## Why this exists

Bank, support, and gift card scams are on the rise in the United States, causing a reported loss [148 million dollars in 2021](https://www.ftc.gov/news-events/data-visualizations/data-spotlight/2021/12/scammers-prefer-gift-cards-not-just-any-card-will-do).

While consumer education helps reduce harm and police investigations help make the cost of running these scams more difficult, some simple systems can be implemented by companies that can make these scams much harder to implement.

This is an example of one such system that banking websites could implement, which I call "Client-side Content Revision Monitoring (CCRM)", because the acronym doesn’t collide with any major existing technologies or government organizations.

## Screen shot

![Screenshot](https://github.com/backupbrain/anti-scam-bank-page-monitor/blob/main/screenshot.png?raw=true)


## How it works

A common tactic of scammers is to use screen sharing to have a victim log into their bank account website, thereby downloading their balance and transaction history. The scammer then alters the downloaded HTML of the page to create the illusion that the victim has received a large payment which they must send back.

Victims are typically not tech-literate enough to understand that only their client-side HTML has been altered and are unaware that they can re-load accurate information by refreshing the page.

This code proposes a system where Javascript is used to create a unique hash of sensitive HTML elements including account balances and transaction histories, then monitoring those elements for changes.

If a change is detected to the client-side HTML, a banner is displayed to the user alerting them that the web content has been altered, that they may be being scammed, and they must refresh the page. The banner appears after several seconds, so the scammer is likely to have handed control of the computer back to the victim.

If this banner is closed or deleted, it will re-appear after a short time again, so that the scammer will have difficulty in maintaining the illusion that the page holds accurate banking information.

The banner is inserted in the `<body>` element so that no containing element can be deleted to prevent the banner from appearing. The banner content is held in Javascript rather than a `<template>` so that a scammer will have a harder time altering the resulting banner.

Try it out online at [https://backupbrain.github.io/anti-scam-bank-page-monitor/demo.html](https://backupbrain.github.io/anti-scam-bank-page-monitor/demo.html). Edit the account balance or transactions with the Inspector to trigger the banner after 5 seconds.
