# progress.js
A javascript progress bar without dependencies. Easily to instanciate via a config object and rendered to any dom element by its renderTo() method. The progress bar may be of type 'charge' (form 0 to 100) or type 'discharge' (from 100 to 0). A moving background image can be set, thus resulting in a animated progress bar. There's also an auto remove feature (plus a timeout) to remove the progress bar once it reaches 0 (or 100). You may also display the current value in the center of the progress bar via a config parameter.

## Preface
Please do not hesitate to inform me about downsides, change requests et cetera. It is no good idea to complain about my script by mumbling curse spells at your screen. Write a comment instead, so I know whats wrong and can fix the problem.

## Dependencies
none

## Download
No stable version at the moment.

## Instruction
1. include progress.js to your page `<script type="text/javascript" src="progress.js"></script>`
2. include progress.css (very basic css) to your page `<link type="text/css" rel="stylesheet" href="progress.css" />`
3. create a new progress bar via `progressBar = Progress.bar(configObj);` (see below for config options)
4. render the progress bar to your page via `progressBar.renderTo(document.getElementById('yourDisplayElement'))`
5. have something that updates your progress bar with percentage values via `progressBar.update(integerInput0To100)`

## Configuration
The following configuration options are available:

`id:`              - String  -  the id of the progress bar outer div (can be used to apply custom styles)

`autoRemove:`      - Boolean -  removes the progress bar once it reaches 100 (if type: 'charge') or 0 (if type: 'discharge')

`removeTimeout:`   - Integer -  if autoremove is true, it waits for the set milliseconds to remove the progress bar

`backgroundSpeed:` - Integer -  the speed with which the background moves, try with low integer values

`type:`            - String  -  the type of the bar, either 'charge' (from 0 to 100) or 'discharge' (from 100 to 0)

`showPercentage:`  - Boolean -  shows the current percentage value in the center of the bar

Just build a config object in which the configuration options reside (any order): `{id: 'yourId', autoRemove: true, type: 'discharge', showPercentage: true}` and use it to replace 'configObj' in the instructions (see line 3 above).

## Demo
A demo can be found here: [http://github.dixpix.de/progress.js/](http://github.dixpix.de/progress.js/).

## Tests
progress.js is tested with [Jasmine BDD testing framework](https://github.com/jasmine/jasmine) which is not included. You can download Jasmine [here](https://github.com/jasmine/jasmine/releases) and place the contents in test/lib/. To run the tests, open test/specRunner.html in your browser.s
