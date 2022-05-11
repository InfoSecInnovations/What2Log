---
title: "The Struggle is Real: Log Analysis"
description: Why is Log analysis such a struggle
author: Flynn Weeks
---

# Log Analysis

Log analysis is the real reason logs are collected and without it, there really isn't a point to collecting logs. Log analysis is what allows for events to be found and understood. As a whole, analysis can pose quite a few challenges from several different directions, but it is a necessary step in log management.

## Where to Start

When analyzing logs, there has to be a start point, but sometimes finding this start point is not so easy. Especially, when you introduce several sources of logs, there can be an overwhelming amount of information that may be daunting to start analyzing. I talked about log volume in another post, but it's an issue that we see pop back up in event analysis.ved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)

## What am I even looking for?

With log analysis, it is important to be able to look at any number of logs and correlate them together into events that occurred. Often times, there is more than one log that generates from a users activity, and there will likely also be a nice trail of the actions they took on a system. However, it is another matter to actually be able to identify and tie these events together. There are logs that don't hold much information and really aren't that helpful, but an analyst needs to be able to pick these out to paint the full picture.

## Event Correlation

This was another issue that I talked about earlier that we see once again. It is up to the analyst to identify what logs were made as parts of the same event. Logs act as the breadcrumb trail that we have to follow to find the full scope of what actually happened. However, you need the ability to follow that breadcrumb trail and weed out what isn't actually important or relevant. Similarly, you also need to be able to see early indicators of attack, to stop them before they happen, and identify what may just be a false alarm.

## Are logs really boring?

I think its a common thought that log analysis is just boring, and I would agree that it can be. However, I stand by the idea that logs are absolutely fascinating and that they can be fun. Being able to stop an attack or even getting to the bottom of one that occurred is not only satisfying, but fulfilling. To me, this justifies the boring stretches of looking through logs. On top of that, just the things you can learn about a system or network from logs is invaluable information and can act as a health check. However, these boring moments can also be a good sign, because it means that there isn't an attack happening.

I always stand by the fact that logs are great and I probably always will, given that you know how to utilize them. Log analysis will always take some amount of time, but with the right tools and skills, it can be a rewarding and important process. But, at the end of the day, the struggle is still real.
