# AvailableLightDemo
Demo project for AvailableLight JavaScript and CSS "framework" for building cross-platform mobile apps.
The framework is intended as a learning tool - it is a simple "vanilla.js" approach to building a cross-platform app.
There is no dependency on SPA frameworks, databinding tools or even JQuery (with the exception of the test code).

All the rendering is done using native JavaScript techniques.
Instead of databinding, content is re-rendered as properties are changed.
Of course we are not suggesting you should build a production application in this way;
one of the disadvantages of this is that it becomes increasingly complicated to 
keep track of what variables have changed and so on.
In addition you have to deal with different browser implementations of the 
DOM, which is much less of a problem than it was a few years ago, 
but is still an issue, particularly when you accidentally stray outside the specification.
If you were to use this as a starting point you would find eventually that the
code becomes difficult to manage.

This is where a databinding framework can help.
Using a tool like Knockout.js you can use HTML markup and map elements to your viewmodel.
Another way to achieve the same effect is to use a view rendering tool like React.js.
Instead of databinding, React.js renders the whole of your view every time something changes,
but uses a Virtual DOM and applies changes selectively to the actual DOM making it
very efficient. 
It also allows you to build self-contained components to build up your solution.

Instead of using a SPA framework there are about 30 lines of code in availablelight.js that
take care of hiding and showing "pages" as the user navigates.
All SPA frameworks fundamentally work this way.
There is a single HTML page with different sections which are made visible or
invisible as the user navigates, giving the impression that they are moving
between pages.

In AvailableLight we use the HTML5 &lt;article&gt; element to represent each SPA page.
We also use the &lt;section&gt; element to subdivide pages horizontally to give a
semantic horizontal scroll to support small devices.
On larger devices the horizontal pages are shown side-by-side.

If you want to try AvailableLight you can either make a copy of this
demo project, or create an Apache Cordova app in Visual Studio 
and then add the AvailableLight nuget package. You will also need
to make some changes to your index.js file - see the demo code
for an example.

# Tests #
There is a set of QUnit tests included in the ClientTest project.
To run the tests, simply right-click on test.html and select
"View in Browser". To debug, right-click on the ClientTest project
and choose Debug->Start new instance.
 
