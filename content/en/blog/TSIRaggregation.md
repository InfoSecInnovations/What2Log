---
title: The Struggle is Real: To Aggregate or Not to Aggregate
description: Log Aggregation is a critical step in log management for most orgs, but how necessary is it?
author: Flynn Weeks
---

# To Aggregate or Not to Aggregate
## That is the question.
Log aggregation is the practice of consolidating  all of a networks logs into one "container" to make them more easily searchable. It is important to note that this is not a guide to log aggregation tools, as plenty of those exist already. This is simply a discussion of both sides of log aggregation and the pros and cons that it presents. Centralized log aggregation seems like the smartest thing to do, especially with multiple log sources that may be on a network. By centralizing the logs, you are making your life so much easier by combining all of your information in one, easy to access location. However, is log aggregation all that it's cracked up to be?

## Pros

Aggregation certainly has its pros, otherwise it would not be as popular as it is. Log aggregation means that you don't have to go to each individual log source to analyze them, but you can instead just look in one place and see all the logs in one place. This, obviously, can save a lot of time and frustration of trying to analyze each machine that generates logs. There is also the ability that is then presented to quickly search through or analyze all of the logs from a network, not just the ones unique to a system. Some aggregation software also allows for real time monitoring, creating a dashboard of all the combined logs as they happen.

The biggest draw for log aggregation has to be the time saved, as it really does make your life easier. In a larger network, where you may be seeing logs from half a dozen or more sources, such as firewalls and cloud services. If they are in one place, they can be looked through all at once and may help in data correlation. When all the logs are in front of you, it is much easier to identify patterns and see the signs of an attack.

## Cons

As mentioned, log aggregation definitely has its cons. If you don't have a good aggregation software, you may end up with a confusing mess of different log types all combined into one. This could arguably make analysis more difficult as you have to take the extra step to make sure you catch the differences in each log file. This sounds harmless, and usually is, but a date format difference may cause an issue with data correlation. If the day/month/year format is used, then 1/4/2021 means the 4th of January, but if it is month/day/year, this would be the 1st of April. If you are not aware of these changes, or your software hasn't caught it, then you may severely skew the events of what happened on a particular day.

Another important point is that a log aggregation server or storage device would likely become a prime target during an attack. You absolutely need a backup of any log aggregation you have to ensure that you are not completely dead in the water in case of an attack.

## Conclusion

In the end, it is easy to see why log aggregation is such a popular choice in log management. As log as one is aware of the potential challenges they may face, it seems that the pros outweigh the cons. The amount of time that stands to be saved is a benefit that anyone would be hard pressed to argue is a bad thing. Log aggregation is a time saving utility that makes the job of log analysis easier, which I firmly believe is highly important. As long as one is mindful and does their research when selecting a log aggregation tool (or even making your own solution), most everyone will see improvement from log aggregation. However, at the end of the day, there is no one definite answer and the struggle is still real.
