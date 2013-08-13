==============
TemplateUtilJS
==============

This is a util for simple javascript templating.  If you are looking for your solution, I highly suggest trying a more tried and true solution, like Underscore's built in template method or Handlebars.  The code for the tmpl function was adapted from John Resig's micro templating example (http://ejohn.org/blog/javascript-micro-templating/).  A couple of helper methods were adding for adding templates from either a string or external url.

The only file you need to use this is the template-util.js file.  To see an example run index.html and take a peek at the source code.


============
Dependencies
============

jQuerey is required for using the loadTemplate method, which allows the user to load an external template


====
Docs
====


tmpl(str, data)
---------------

Processes the identified template and interjects the values from the supplied data parameter into the template, and returns the results as a string.

str - This can be either the template name or the contents of a template.  If it is a template name, it will attempt to load the template contents from the internal templates variable.  If it is not found in the templates variable, it will be treated as a template string.  

data - This is the object which will define properties that are matched by properties in the template.  The values from this data object will be interjected into the template.


addTemplate(templateName, contentes)
------------------------------------

Adds a template string to the internal templates variable to be used later with the tmpl function.

templateName - The dentifier you want to use for the template you are adding.
contents - The contents (as a string) of the template


loadTemplate(templateName, url, callback)
-----------------------------------------

Adds a templte loaded from an external url to the internal templates variable to be used later with the tmpl function.

templateName - The dentifier you want to use for the template you are adding.
url - The url of the external template
callback - (Optional) A callback function to be executed after the template loading is complete
