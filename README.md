## Clear Code

This is the source code for my free Chrome extension. It's purpose is to grab embedded code examples, displaying them in a distraction free viewer, hopefully making them easier to digest. Useful for when embedded examples are poorly formatted or suffer from excessive horizontal scrolling.

The main injected frame that handles the view is an AngularJS application, you can find it in `app/features/iframe/content`, the options page is generated with another of my apps, [angular-chrome-options](https://github.com/nverba/angular-chrome-options), from the `chrome-options.json` file.
