## Clear Code

This is the source code for my free Chrome extension. It's purpose is to grab embedded code examples, displaying them in a distraction free viewer, hopefully making them easier to digest. Useful for when embedded examples are poorly formatted or suffer from excessive horizontal scrolling.

The main injected frame that handles the view is an AngularJS application, you can find it in `app/features/iframe/content`, the options page is generated with another of my apps, [angular-chrome-options](https://github.com/nverba/angular-chrome-options), from the `chrome-options.json` file.

The main Angular app has no tests at the moment. Testing Chrome apps/extensions in situ is no trivial matter, and there is a distinct lack of documentation on this. I plan to take a run at this later, but this will require developing some generalised tools. Currently there exists [sinon-chrome](https://github.com/vitalets/sinon-chrome) which uses PhantomJS for unit tests, but what I really need is end to end testing done in situ.


