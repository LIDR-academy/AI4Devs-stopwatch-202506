Act as an expert frontend developer.

Create a stopwatch webapp that has allows the user to start a timer clicking a button. When it is pressed, the button then converts to a "Stop" button that, when clicked, makes the timer stop. There should be also a "Clear" button that, when clicked, resets the timer to 0.
For the design, you can use the attached picture as a reference.

I want you to output two separate files.
- One is script.js, a javascript file which should contain all the application logic.
- The other is index.html, an HTML file that acts as the index of the app. Use the following template to make this file.
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Timer and Countdown</title>
<link rel="stylesheet" href="styles.css">
</head>
<body>
<h1>Timer and Countdown</h1>
<script src="script.js"></script>
</body>
</html>

Try to make the page as stylish as possible. Feel free to use any CSS library you might see convenient, if you want.
Ask me any questions you might have before proceeding.

------------------------------------

Provide me the styles.css file as well to style the page.

-------------------------------------

Great! I want to make some changes:
- I would like the stop button to be blue instead of orange.
- I want to add the following feature: when the user right clicks instead of left click the stop button, a partial time should be registered. When this happens, a text appears with the following content: "Partial <n>: <time with milliseconds>".

Try to use the same fonts and styles that you used previously for these partial texts. Very importantly: the stop button should NOT move because of the new texts appearing. That would make the user have to move the mouse and it would be bad for the UX. Try to think where it would be nice for these texts to appear, then implement the solution.

Ask me any questions you might have before proceeding.

---------------------------------------

Yes, when the user clicks "Clear", the partial times should dissapear. The clear button should reset all the app to where it was.

----------------------------------------

Great, but the stop button is still orange and the buttons are moving when the partial texts appear. Try to make these changes.

-----------------------------------------

Perfect. I want one final change. When a lot of partials are made, the div is not autoscrolling to the bottom when the scroll bar appears. Can you implement this behavior?