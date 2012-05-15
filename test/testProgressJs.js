describe('Progress.fillUpBar instantiated without config object', function() {
    it('returns false', function() {
        expect(Progress.fillUpBar()).toBeFalsy();
    });
});

describe('Progress.fillUpBar general (with config: { width: "100%", height: "4px", id: "progress1" })', function() {
	beforeEach(function() {
		config      = { width: "100%", height: "4px", id: "progress1" };
	    progressBar = Progress.fillUpBar(config);
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
    
    it('which, when called, removes the complete progress bar', function() {
        expect(document.getElementById('testArea').hasChildNodes()).toBeTruthy();
        progressBar.remove();
        expect(document.getElementById('testArea').hasChildNodes()).toBeFalsy();
    });
});

describe('Progress.fillUpBar autoRemove without timeout (with config: { width: "100%", height: "4px", id: "progress2", autoRemove: true })', function() {
	beforeEach(function() {
		config      = { width: "100%", height: "4px", id: "progress2", autoRemove: true };
	    progressBar = Progress.fillUpBar(config);
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

describe('Progress.fillUpBar autoRemove with timeout (with config: {width: "100%", height: "4px", id: "progress2", autoRemove: true, removeTimeout: 900})', function() {
	beforeEach(function() {
		config      = { width: "100%", height: "4px", id: "progress2", autoRemove: true, removeTimeout: 900 };
	    progressBar = Progress.fillUpBar(config);
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

