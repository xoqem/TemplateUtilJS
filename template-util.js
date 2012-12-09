var TemplateUtil = (function() {

  // Dependencies: jQuerey is required for using the methods that load external templates

  var tmpl_cache = {};
  var templates = {};

  ///////////////////////////////
  // Templating
  ///////////////////////////////

  // Adapted from John Resig's micro templating example: http://ejohn.org/blog/javascript-micro-templating/
  function tmpl(str, data) {
    try {
      var fn = !/\W/.test(str) ?
        tmpl_cache[str] = tmpl_cache[str] ||
          tmpl(templates[str]) :
        new Function("obj",
          "var p=[],print=function(){p.push.apply(p,arguments);};" +
          "with(obj){p.push('" +
          str
            .replace(/[\r\t\n]/g, " ")
            .replace(/'(?=[^%]*%>)/g,"\t")
            .split("'").join("\\'")
            .split("\t").join("'")
            .replace(/<%=(.+?)%>/g, "',$1,'")
            .split("<%").join("');")
            .split("%>").join("p.push('")
            + "');}return p.join('');");
      return data ? fn( data ) : fn;
    } catch(e) { return e.message; }
  }

  function addTemplate(templateName, contents) {
    templates[templateName] = contents;
  }

  function loadTemplate(templateName, url, callback) {
    $.get(url, function(data) {
      addTemplate(templateName, data);
      if (typeof callback !== 'undefined') {
        callback();
      }
    });
  }


  ///////////////////////////////
  // Script Loading
  ///////////////////////////////

  function loadScript(url, callback) {
    $.ajax({
      type: 'GET',
      url: url, 
      success: function() {
          if (typeof callback !== 'undefined') {
            callback();
          }
        },
      dataType: 'script',
      cache: true
    });
  }

  function loadScripts(scriptUrls, callback) {
    var itemsLoading = 0;
    $.each(scriptUrls, function(index, scriptUrl) {
      itemsLoading++;
      loadScript(scriptUrl, function() {
        itemsLoading--;
        if (itemsLoading == 0 && typeof callback !== 'undefined') {
          callback();
        }
      });
    });
  }


  ///////////////////////////////
  // Public Methods
  ///////////////////////////////

  function getQueryStringByName(name, defaultValue) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match ? decodeURIComponent(match[1].replace(/\+/g, ' ')) : defaultValue;
  }


  ///////////////////////////////
  // Public Methods
  ///////////////////////////////

  return {
    tmpl: tmpl,
    addTemplate: addTemplate,
    loadTemplate: loadTemplate,
    loadScript: loadScript,
    loadScripts: loadScripts,
    getQueryStringByName: getQueryStringByName
  };
}());