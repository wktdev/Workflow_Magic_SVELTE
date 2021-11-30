
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
'use strict';

var main = require('./main-6fbcec85.js');
var codemirror = require('./codemirror-fc7f6061.js');

var placeholder = main.createCommonjsModule(function (module, exports) {
// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE

(function(mod) {
  mod(codemirror.codemirror$1);
})(function(CodeMirror) {
  CodeMirror.defineOption("placeholder", "", function(cm, val, old) {
    var prev = old && old != CodeMirror.Init;
    if (val && !prev) {
      cm.on("blur", onBlur);
      cm.on("change", onChange);
      cm.on("swapDoc", onChange);
      CodeMirror.on(cm.getInputField(), "compositionupdate", cm.state.placeholderCompose = function() { onComposition(cm); });
      onChange(cm);
    } else if (!val && prev) {
      cm.off("blur", onBlur);
      cm.off("change", onChange);
      cm.off("swapDoc", onChange);
      CodeMirror.off(cm.getInputField(), "compositionupdate", cm.state.placeholderCompose);
      clearPlaceholder(cm);
      var wrapper = cm.getWrapperElement();
      wrapper.className = wrapper.className.replace(" CodeMirror-empty", "");
    }

    if (val && !cm.hasFocus()) onBlur(cm);
  });

  function clearPlaceholder(cm) {
    if (cm.state.placeholder) {
      cm.state.placeholder.parentNode.removeChild(cm.state.placeholder);
      cm.state.placeholder = null;
    }
  }
  function setPlaceholder(cm) {
    clearPlaceholder(cm);
    var elt = cm.state.placeholder = document.createElement("pre");
    elt.style.cssText = "height: 0; overflow: visible";
    elt.style.direction = cm.getOption("direction");
    elt.className = "CodeMirror-placeholder CodeMirror-line-like";
    var placeHolder = cm.getOption("placeholder");
    if (typeof placeHolder == "string") placeHolder = document.createTextNode(placeHolder);
    elt.appendChild(placeHolder);
    cm.display.lineSpace.insertBefore(elt, cm.display.lineSpace.firstChild);
  }

  function onComposition(cm) {
    setTimeout(function() {
      var empty = false;
      if (cm.lineCount() == 1) {
        var input = cm.getInputField();
        empty = input.nodeName == "TEXTAREA" ? !cm.getLine(0).length
          : !/[^\u200b]/.test(input.querySelector(".CodeMirror-line").textContent);
      }
      if (empty) setPlaceholder(cm);
      else clearPlaceholder(cm);
    }, 20);
  }

  function onBlur(cm) {
    if (isEmpty(cm)) setPlaceholder(cm);
  }
  function onChange(cm) {
    var wrapper = cm.getWrapperElement(), empty = isEmpty(cm);
    wrapper.className = wrapper.className.replace(" CodeMirror-empty", "") + (empty ? " CodeMirror-empty" : "");

    if (empty) setPlaceholder(cm);
    else clearPlaceholder(cm);
  }

  function isEmpty(cm) {
    return (cm.lineCount() === 1) && (cm.getLine(0) === "");
  }
});
});

var placeholder$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.assign(/*#__PURE__*/Object.create(null), placeholder, {
  'default': placeholder
}));

exports.placeholder = placeholder$1;
//# sourceMappingURL=placeholder-de12c917.js.map
