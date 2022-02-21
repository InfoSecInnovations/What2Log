---
title: The Struggle is Real
description: The Struggle is real blog series and what it covers
author: Flynn Weeks
---

# The Struggle is Real
Log management is by no means easy, it requires foresight and ongoing work to ensure that it is done well, but it is vastly important in the field of computers. As Wikipedia points out, the field of log management can be broken down into 6 categories:
	-Log collection
  -Centralized log aggregation
  -Long-term storage and retention
  -Log rotation
  -Log analysis
  -Log searching and reporting
By breaking this field down, we can begin to understand the array of work that is required when we start looking at logs and why to manage them.

You might wonder why there is just not one way this is done, a single framework that we all can follow to ensure we are the most secure and prepared when it comes to logs. The short answer is there is no one answer when it comes to logging. Logging (and in turn, log management) is an individualized process that needs to be evaluated by companies and individuals on a case-by-case basis. What works for a multinational corporation probably won't be practical for a small home network.

Logging is not without its problems. We have issues of volume, especially when we introduce firewall and other network device logs. If we run out of space where we store our logs, we may have to delete certain logs or simply delete our current ones. Neither of these are good solutions, but they are sometimes seen as the only way to get around such a problem. Another problem is that analysis can take too long and may be unwieldy. Especially in a situation where you are seeing logs from multiple sources in different formats, trying to understand all of the information that is presented to you is almost an art. And, it is important to note, that if you do miss something, it could lead to big trouble in your network. We also see issues with data correlation, tying events together. It's easy to miss a single event that ties together two big events, but this is a key piece of information that we want to know when analyzing logs.

This "series" hopes to talk about some of these issues a little more in depth and help get you thinking about what can be done to help fight these issues. I know that we will not have the holy grail of answers as to how to deal with logs, but hopefully starting the conversation is enough. After all, the struggle is real.
