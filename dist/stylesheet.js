(function(exports) {
  /**
   * Create a new stylesheet
   */
  function Stylesheet() {
    var styleElement = document.createElement('style'),
      head = document.getElementsByTagName('head')[0];

    head.appendChild(styleElement);

    // Safari does not see the new stylesheet unless you append something.
    // However!  IE will blow chunks, so ... filter it thusly:
    if (!window.createPopup) {
      styleElement.appendChild(document.createTextNode(''));
    }

    this.sheet = document.styleSheets[document.styleSheets.length - 1];
  }
  exports.Stylesheet = Stylesheet;

  /**
   * Add A rule to the stylesheet
   * @param {String}  selector The CSS selector
   * @param {String}  rules    The CSS rules
   * @param {?Number} index    Where to enter in the CSSStyleSheet
   */
  Stylesheet.prototype.addRule = function(selector, rules, index) {
    if (!selector || typeof selector !== 'string') {
      throw new Error('selector should be a string!');
    }

    if (!rules || typeof rules !== 'string') {
      throw new Error('rules should be a string!');
    }

    if (typeof index !== 'undefined' && typeof index !== 'number') {
      throw new Error('index should be a number!');
    }

    if (this.sheet.insertRule) {
      this.sheet.insertRule(selector + '{' + rules + '}', index);
    } else {
      this.sheet.addRule(selector, rules, index);
    }
  };

  /**
   * Delete a rule by the selector
   * @param {String} selector The CSS selector to delete
   */
  Stylesheet.prototype.deleteRule = function(selector) {
    if (!selector || typeof selector !== 'string') {
      throw new Error('selector should be a string!');
    }

    var rules = this.sheet.cssRules,
      i = rules.length - 1;

    for (i; i >= 0; i--) {
      if (rules[i].selectorText === selector) {
        this.sheet.deleteRule(i);
      }
    }
  };

  /**
   * Clear the stylesheet and delete all rules
   */
  Stylesheet.prototype.clear = function() {
    for (var i = this.sheet.cssRules.length - 1; i >= 0; i--) {
      this.sheet.deleteRule(i);
    }
  };
})(this);
