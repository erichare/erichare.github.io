---
layout: post
title:  "STAT 585X - Lubridate"
date:   2014-01-25 12:23:56
categories: blog
---

(This is a blog post made for the third reading assignment in STAT 585X, in reference to http://www.jstatsoft.org/v40/i03/paper)

{% highlight r %}
library(lubridate)
{% endhighlight %}

In this paper, Garrett and Hadley describe the lubridate package. Lubridate allows R programmers to more easily work with and manipulate date/time objects. They motivate the package by explaining the difficulty that can be encountered working with this type of data, including (but certainly not limited to) parsing a string as a date in the proper format. They illustrate the ease of syntax provided by lubridate compared to base R, such as:

{% highlight r %}
date <- dmy("01-01-2010")
month(date) # Returns 1
{% endhighlight %}

Although this snippet uses the dmy function, there is a suite of functions such as mdy, ydm, etc. for different date formats.

The authors then discuss manipulation and arithmetic of dates, including durations, which are objects used to record the number of seconds between two dates. They provide an example of calculating the number of weeks between Christmas and Halloween, and then coverting this to other units such as months. Finally, they discuss time zones, illustrating the with_tz function which can be used to display any date in a particular timezone.

All in all, lubridate takes away a lot of the frustration of working with dates in R. After learning it, I've resorted to using it for virtually every project in which I work with date-time objects. Its simple, elegant, and allows more time to focus on the data analysis itself rather than trying to parse and manipulate strings of dates.
