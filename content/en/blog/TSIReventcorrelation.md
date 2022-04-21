---
title: "The Struggle Is Real: Event Correlation with Logs"
description: This blog explores event correlation and the importance of it
author: Flynn Weeks
---

## Event Correlation
Event Correlation is a key step in looking at security incidents, they allow different logs to be brought together to get the full picture of what happened in an incident. It is the process of analyzing the log files from a network and finding the ones that were apart of the same incident.

It is important to note that they may not all be sequential, a port scan from last week may tie into an attack that occurred today. Similarly, event correlation goes beyond simply tying in the logs from different sources and seeing what occurred at the same time. While it is important to use the different sources to create a full picture of what happened on the network, it is also important to look at the history in the logs and see what happened in the lead up to the incident.

There is, of course, something out there to make life easier when it comes to event correlation. Certain software allows for automatic event correlation, sometimes in combination with data aggregation. This makes the process of correlating logs to certain events a lot easier and can save a lot of time. It is possible that events may be missed that would have been caught through manual parsing, but the same is true in reverse.

Event correlation can even be used to help block an attack before it begins. Similar patterns that were seen in previous attacks or known patterns may show up and allow for better preparations to be made.

However, event correlation is really a chance to learn. By understanding exactly what events occurred in an attack, one can better prepare themselves or their network for the future. There are logs that may seem inconsequential, but when correlated to an event, paint a bigger picture that it really was an early warning sign. Obviously there is no one solution, as there may be false positives, but it is certainly something that can help better prepare a network for attacks or unusual activity. At the end of the day, the struggle is still real, but there event correlation can help make it a little less so.
