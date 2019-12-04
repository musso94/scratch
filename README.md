# Challenge

This project is an unfinished scratch card simulator.

The user should be able to click and drag in order to reveal the text underneath.
However, there are a few bugs in this implementation.

Here's a description of the bugs:

1. Sometimes the scratch card clears itself as soon as the cursor enters the canvas from left or right. It should only clear itself when most of the card has been scratched off. Currently, it only works if the user moves their cursor in from the top border, going downwards.

2. Sometimes the scratch card will not work at all, or the scratching will be offset from the cursor, but only when the browser window is smaller than the document size (e.g., browser window is 300px wide but the body has a min-width of 900px or something and the user had to scroll the card into view).

Both of these bugs can be fixed with a few small JS updates to the code in scratch.js.

We're looking to see if you can read other people's JS and provide solutions for broken code.
This process can be as interactive between us as you want.
If you have questions or need clarification, email me at chris@crucialinteractive.com.

Farewell.
