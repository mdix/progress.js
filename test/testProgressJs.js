describe('Progress.bar instantiated without config object', function() {
    it('returns false', function() {
        expect(Progress.bar()).toBeFalsy();
    });
});

describe('Progress.bar general (with config: { id: "progress2" })', function() {
	beforeEach(function() {
		config      = { id: "progress2" };
	    progressBar = Progress.bar(config);
	    progressBar.renderTo(document.getElementById('testArea'));
	    renderedProgressBar = document.getElementById(config.id);
	});

	afterEach(function() {
		document.getElementById('testArea').innerHTML = "";
		delete(progressBar);
	});

    it('returns a progress bar object', function() {
        expect(typeof progressBar).toEqual('object');
    });

    it('which has renderTo method', function() {
        expect(typeof progressBar.renderTo).toEqual('function');
    });

    it('which, when called, appends the progressbar to the given element', function() {
        var testAreaChildren = document.getElementById('testArea').children;
        expect(testAreaChildren[0].getAttribute('class')).toEqual('outerDiv');
    });

    it('the so appended progress bar (dom node) has the given id', function() {
        var testAreaChildren = document.getElementById('testArea').children;
        expect(testAreaChildren[0].getAttribute('id')).toEqual('progress2');
    });

    it('which has update method', function() {
        expect(typeof progressBar.update).toEqual('function');
    });

    it('which, when called, changes the width of the inner div element', function() {
        var initialWidth = renderedProgressBar.getElementsByClassName('innerDiv')[0].offsetWidth;
        progressBar.update(20);
        expect(renderedProgressBar.getElementsByClassName('innerDiv')[0].offsetWidth).toNotEqual(initialWidth);
    });

    it('but not above 100 percent', function() {
    	progressBar.update(100);
    	var width = renderedProgressBar.getElementsByClassName('innerDiv')[0].offsetWidth;
    	progressBar.update(1000);
    	expect(renderedProgressBar.getElementsByClassName('innerDiv')[0].offsetWidth).toEqual(width);
    });

    it('and not below 0 percent', function() {
    	progressBar.update(50);
    	progressBar.update(-100);
    	expect(renderedProgressBar.getElementsByClassName('innerDiv')[0].offsetWidth).toEqual(0);
    });

    it('which has remove method', function() {
        expect(typeof progressBar.remove).toEqual('function');
    });

    it('which, when called, removes the rendered progress bar and the progressBar object', function() {
        expect(document.getElementById('testArea').hasChildNodes()).toBeTruthy();
        progressBar.remove();
        expect(document.getElementById('testArea').hasChildNodes()).toBeFalsy();
    });
});

describe('Progress.bar general (with config: {})', function() {
    beforeEach(function() {
        config      = { };
        progressBar = Progress.bar(config);
        progressBar.renderTo(document.getElementById('testArea'));
        renderedProgressBar = document.getElementById(config.id);
    });

    afterEach(function() {
        document.getElementById('testArea').innerHTML = "";
        delete(progressBar);
    });

    it('returns a progress bar object', function() {
        expect(typeof progressBar).toEqual('object');
    });

    it('which has renderTo method', function() {
        expect(typeof progressBar.renderTo).toEqual('function');
    });

    it('which has a random id: progress<number>', function() {
        var testAreaChildren = document.getElementById('testArea').children;
        expect(testAreaChildren[0].getAttribute('id')).toMatch(/progress[0-9]{1,4}/);
    });
});

describe('Progress.bar autoRemove without timeout (with config: {id: "progress2", autoRemove: true })', function() {
	beforeEach(function() {
		config      = { id: "progress2", autoRemove: true };
	    progressBar = Progress.bar(config);
	    progressBar.renderTo(document.getElementById('testArea'));
	});

	afterEach(function() {
		document.getElementById('testArea').innerHTML = "";
		delete(progressBar);
	});

	it('if autoRemove is true, the bar is instantly removed once it reached 100%', function() {
	    progressBar.update(10);
	    expect(testArea.hasChildNodes()).toBeTruthy();
	    progressBar.update(50);
	    expect(testArea.hasChildNodes()).toBeTruthy();
	    progressBar.update(100);
	    expect(testArea.hasChildNodes()).toBeFalsy();
	});
});

describe('Progress.bar autoRemove with timeout (with config: { id: "progress2", autoRemove: true, removeTimeout: 900})', function() {
	beforeEach(function() {
		config      = { id: "progress2", autoRemove: true, removeTimeout: 900 };
	    progressBar = Progress.bar(config);
	    progressBar.renderTo(document.getElementById('testArea'));
	});

	afterEach(function() {
		document.getElementById('testArea').innerHTML = "";
		delete(progressBar);
	});

	it('if autoRemove is true and removeTimeout is set, the bar is removed once it reached 100%, but after the timeout', function() {
	    progressBar.update(100);
	    expect(testArea.hasChildNodes()).toBeTruthy();

		waits(1100);

		runs(function() {
	        expect(testArea.hasChildNodes()).toBeFalsy();
		});
	});
});

describe("Progress.bar instantiated with type: 'discharge'", function() {
    beforeEach(function() {
        config      = { id: "progress2", autoRemove: true, type: 'discharge' };
        progressBar = Progress.bar(config);
        progressBar.renderTo(document.getElementById('testArea'));
        renderedProgressBar = document.getElementById(config.id);
    });

    afterEach(function() {
        document.getElementById('testArea').innerHTML = "";
        delete(progressBar);
    });

    it('gives the innerDiv a default width of 100%', function() {
        expect(renderedProgressBar.getElementsByClassName('innerDiv')[0].style.width).toEqual("100%");
    });

    it('is not autoRemoved on 100%', function() {
        progressBar.update(100);
        waits(100);
        expect(document.getElementById('testArea').hasChildNodes()).toBeTruthy();
    });

    it('but on 0%', function() {
        progressBar.update(0);
        waits(100);
        expect(document.getElementById('testArea').hasChildNodes()).toBeFalsy();
    });
});

