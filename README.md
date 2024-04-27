# lawbot

Law students use the lawbot to consult their notes. 

So we're done with the chatbot, now it's a search tool. Basically you ask a question and you click on the relevant chunk that you'd like to see in context. Then, on the right side of the screen, you can see the chunk you clicked on highlighted in context, as if you had ctrl-fed it.  

## Current State

You can search the notes for something, click on the chunks, and then see that chunk in context. You can also change the width of the two panes, albeit with some bugs when you try to make the left side larger (the PDF API is causing problems again)

The PDF API is not great, I probably would've saved time had I just made a custom solution. It's a good exercise though. Yeah in the future I'm going to get need to get off of it now that I see it's making it impossible to implement the VSCode style divider.

## Current task

1. Figure out how to handle the ctrlF over a page break
