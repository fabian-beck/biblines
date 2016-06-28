Pre-final version of a biblines. 28.06 - last update.

I. CHECK:
1. Code in sparclificator/main.js has some redundancies.
See lines 68 - 103 and 107 - 149. 
We have to specify manualy which data to show (could not do automatically, requires understanding of the text).

2. Lines 16-25 in main.js. 
Highlighint the year which is hoverd on all the sparklines - buggy. First load of the page - works fine, but after you hover on a
sparkline (which makes timeline change), yellow higlighting appears only when you hover on the background and not on a bar itself. 
I think this is because I redraw the timeline (line 56, 148). Do not know what to do instead of redrawing it. The problem is - how to get
rid of the "overlaying" bars on a timeline after you mouseout from sparkline/keyword.

II. INTERACTION:
1. When you hower on some keywors (in bold) - it eigher highlites (with yellow) smth on (both) sparkline and timeline, or shows overlaying bars on a big timeline.
2. When you hover on a sparkline - it overlays on the timeline.
3. When you click on a sparkline - it stays on a timeline (becomes a "base", so to say).
4. When you hover on bars on a timeline - the corresponding years are highlighted on a sparkline. Buggy - see I.2.
5. When you hover on a keyword - it gets highlighted with gray color.
6. When you hover on a sparkline - corresponding sentence is highlighted with gray color. 

  
