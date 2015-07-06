# stylesheet.js [![Build Status](https://secure.travis-ci.org/ro-ka/stylesheet.js.png?branch=master)](http://travis-ci.org/ro-ka/stylesheet.js)

Generate and edit a dynamic Cascading Style Sheet using JavaScript.

## Getting Started
Install the script via [bower](http://bower.io/):

```
bower install stylesheet.js --save
```

Include it in the head of your page:

```html
…
<head>
  …
  <script src="/bower_components/stylesheet.js/dist/stylesheet.min.js"></script>
  …
</head>
…
```

You are now ready to go!

## Documentation

Generate a new Instance:

```js
var stylesheet = new Stylesheet();
```

### #addRule

You can add new rules to that created stylesheet. It takes 3 parameters:
* *required* String `selector` The CSS selector.
* *required* String `rules` The CSS rules.
* *optional* Number `index` An index, where to insert the rule at in the new stylesheet.

### #deleteRule

To delete a rule, pass in the selector of that rule.
* *required* String `selector` The CSS selector.

### #clear

This will clear the whole stylesheet, leaving it empty without any rules.

## Examples

```js
var stylesheet = new Stylesheet();

stylesheet.addRule('.ninja', 'visibility: hidden;'); // Add a new rule
stylesheet.addRule('.bear', 'color: white;'); // Add a second rule
stylesheet.addRule('.bear', 'color: brown;', 0); // Add as first rule

stylesheet.deleteRule('.ninja'); // Delete the .ninja rule

stylesheet.clear(); // Clear all rules
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality.

## License
Copyright (c) 2014 Robert Katzki. Licensed under the MIT license.
