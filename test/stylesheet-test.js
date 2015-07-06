/* global chai, beforeEach, describe, it, Stylesheet, CSSStyleSheet */

/* eslint-disable max-nested-callbacks */

var expect = chai.expect;

describe('Stylesheet', function() {
  var stylesheet;

  beforeEach(function() {
    stylesheet = new Stylesheet();
  });

  describe('constructor', function() {
    it('creates a new Stylesheet', function() {
      expect(stylesheet).to.be.an.instanceof(Stylesheet);
    });

    it('adds a new element to the page', function() {
      var style = document.getElementsByTagName('style')[0];

      expect(style).to.exist();
    });

    it('adds a new element to the document.styleSheets', function() {
      var stylesBefore = document.styleSheets.length,
        newStylesheet = new Stylesheet(), // eslint-disable-line
        stylesAfter = document.styleSheets.length;

      expect(stylesAfter).to.equal(stylesBefore + 1);
    });

    it('creates an empty CSSStyleSheet', function() {
      expect(stylesheet.sheet.cssRules.length).to.equal(0);
    });

    it('has an internal reference to the created CSSStyleSheet', function() {
      expect(stylesheet.sheet).to.be.an.instanceof(CSSStyleSheet);
    });
  });

  describe('#addRule', function() {
    beforeEach(function() {
      stylesheet.clear();
    });

    it('adds a new rule to the stylesheet', function() {
      stylesheet.addRule('.ninja', 'visibility: hidden;');

      expect(stylesheet.sheet.cssRules.length).to.equal(1);
    });

    it('throws an error when no selector is passed in', function() {
      expect(function() {
        stylesheet.addRule();
      }).to.throw(Error);
    });

    it('throws an error when the selector is not a string', function() {
      expect(function() {
        stylesheet.addRule(12, 'visibility: hidden;');
      }).to.throw(Error);
    });

    it('throws an error when the selector is an empty string', function() {
      expect(function() {
        stylesheet.addRule('', 'visibility: hidden;');
      }).to.throw(Error);
    });

    it('throws an error when no rule is passed in', function() {
      expect(function() {
        stylesheet.addRule('.ninja');
      }).to.throw(Error);
    });

    it('throws an error when rule is not a string', function() {
      expect(function() {
        stylesheet.addRule('.ninja', 12);
      }).to.throw(Error);
    });

    it('throws an error when rule is an empty string', function() {
      expect(function() {
        stylesheet.addRule('.ninja', '');
      }).to.throw(Error);
    });

    it('throws an error when index is not a number', function() {
      expect(function() {
        stylesheet.addRule('.ninja', 'visibility: hidden;', '');
      }).to.throw(Error);
    });
  });

  describe('#deleteRule', function() {
    beforeEach(function() {
      stylesheet.clear();
    });

    it('deletes a rule from the stylesheet', function() {
      stylesheet.addRule('.ninja', 'visibility: hidden;');
      stylesheet.addRule('.bear', 'color: brown;');
      stylesheet.deleteRule('.ninja');

      expect(stylesheet.sheet.cssRules.length).to.equal(1);
    });

    it('throws an error when no selector is passed in', function() {
      expect(function() {
        stylesheet.deleteRule();
      }).to.throw(Error);
    });

    it('throws an error when the selector is not a string', function() {
      expect(function() {
        stylesheet.deleteRule(12);
      }).to.throw(Error);
    });

    it('throws an error when the selector is an empty string', function() {
      expect(function() {
        stylesheet.deleteRule('');
      }).to.throw(Error);
    });
  });

  describe('#clear', function() {
    beforeEach(function() {
      stylesheet.clear();
    });

    it('clears the whole stylesheet', function() {
      stylesheet.addRule('.ninja', 'visibility: hidden;');
      stylesheet.addRule('.bear', 'color: brown;');
      stylesheet.clear();

      expect(stylesheet.sheet.cssRules.length).to.equal(0);
    });
  });
});
