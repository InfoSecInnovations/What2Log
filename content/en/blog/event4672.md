---
title: Event ID 4672: Special Privileges Assigned to a New Logon
description: What is event 4672 and why do we care?
author: Flynn Weeks
---

In gathering the information for W2L, I noticed the number of things that Windows 10 (in particular) logs and how some of these logs make almost no sense at first. One of these logs in particular was the log that is associated with Event ID 4672. I was curious as there were a lot of these logs, but I was the only person who had access to that particular machine. This lead me down a bit of a rabbit hole into discovering what this log was and why it can be immensely helpful in log analysis.

To put it simply, this log is generated whenever someone with administrator privileges logs on to a machine. These events are seen usually in close proximity with Event ID 4624, which is a User Logon. In fact, if an administrator logs on, you will see both of these events generated, with 4624 occurring first.

## Admin Rights
Because these events are generated when someone with admin privileges logs on, they can be used to see if a user has admin privileges. You expect to see this event after a log on if this is true. Similarly, you will be able to see if a user has unexpectedly gained admin privileges. This event can be used to monitor the usage of administrator privileges on a system and verify who has them. While not indicative if they are being used, it can still be an indicator that they are being misused or mistakenly assigned. After all, there is a big difference in what a normal user can do versus what a user with administrative powers can do.

## More than One Log
Logs can help in more than just the cleanup and analysis of an attack; they are a very useful monitoring tool. Event ID 4672 highlights this principal, although it can certainly be used in both instances. I think this event also helps show the number of things that actually happen when a user logs in to a computer. Someone may try and cover their tracks by deleting a 4624 event, but there may still be a 4672 event showing that they logged on and actions were performed. Using multiple logs from different sources can paint a better and more full picture of what happened at any particular time on a machine or network.

Logs can paint a picture of what happened or even what may happen and that is why they are so important. By using multiple logs, you can understand every step that was taken (and potentially block it.) Using Event ID 4672, especially in combination with other logs, can show when an administrator was on a network (or if someone has gained admin powers was on).
