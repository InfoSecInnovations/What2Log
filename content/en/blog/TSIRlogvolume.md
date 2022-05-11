---
title: "The Struggle is Real: Log Volume"
description: Managing log volume
author: Flynn Weeks
---

One thing I learned very early on, even before What2Log, was that there are a lot of logs and that computers generate a lot of logs. What2Log was made to help parse some of the information from these logs and make them less daunting, because that is often how they are described. Despite being incredibly useful, people can be scared of logs because they don't know where to start when looking at them.

## What2Log's Role in Volume

You have probably noticed, if you use the site, that we have logging levels in our sidebar on the log pages, broken down into minimum, ideal and extreme.

This is because logs take up space and it really isn't practical for anyone to be capturing and analyzing every single log all the time. Using industry standards and some of our own intuition, we are compiling what we believe are the most important and relevant logs on a system to save you the time of doing so. Minimum level are all things we think you should be logging no matter what, these are the bare minimum logs you should have. Ideal is events that will likely generate more logs, but are still important and should be added. Extreme is events that will generate a lot of events (looking at you application opened and closed) but are still hugely helpful when analyzing events.

## Too Many Logs

Quite frankly, there are logs that exist that will never be used and plenty more that will be seldom used. While the quiet assurance that your machine is logging everything (and I mean everything- almost) is comforting, there is an argument to be made that these logs should be culled at times. This is not to say you should throw out all your logs out after a week to make room, and you really shouldn't do that, but you should be mindful that you can delete logs.

Many approaches to logging include "we need everything" and this isn't always beneficial. Storage is expensive, especially when you're looking at needing to store the logs from a large network, and if you are capturing every single event. Eventually, you're going to be drowning in hard drives. I personally use Windows 10 and my own (and relatively new) computer has 29k logs in the Security log alone. Apply this to a network scale, and you're looking at hundreds of thousands, if not millions, of logs.

## Compliances

There are compliances that require you to keep your logs for a certain amount of time. PCI DSS comes to mind as it requires logs to be kept for at least a year. Similarly, a company may have their own preferences for how long to keep logs. These of course, should be followed, but it does not mean that every event has to be logged.

## What is the Best Approach?

Tackling volume can come in choosing to only log certain events up front or by optimizing a log aggregator on a network, but it is something that should be done. There is no one best approach, unfortunately, computers are funny that way. What2Log hopes to help by showing that you really don't need to log everything and there is time and money to be saved by not doing so. Are we the final voice or the only voice you should listen to? Absolutely not. What2Log is still missing a lot of information; we're constantly researching and adding new logs that we think belong on here.  After all, the struggle is real.
