'use strict'

var switcher = (() => {

    var init = ( containerClass, slideClass, buttonClass ) => {
        var debug;

        if ( !containerClass || typeof(containerClass) === 'undefined' ) {
            debug = 1;
            console.log(debug + " containerClass is undefined or doesnt exist");
            return false;
        }
        let container = document.querySelector(containerClass);

        //validate button
        if ( !buttonClass || typeof(buttonClass) === 'undefined' ) {
            debug = 2;
            console.log(debug + " buttonClass is undefined or doesnt exist");
            return false
        }
        let buttons = document.querySelectorAll(buttonClass);

        //validate slides
        if ( !slideClass || typeof(slideClass) === 'undefined' ) {
            debug = 3;
            console.log(debug + " slideClass is undefined or doesnt exist");
            return false
        }
        let slides = document.querySelectorAll(slideClass);

        applyActive(buttons, findActiveId(slides));
        let oldId = findActiveId(buttons);

        //single click event to use bubbling.
        container.addEventListener('click', (e) => {
            //if target contains dot

            //if element is inactive
            if ( doesElementContainActive(e)) {

                removeActive(buttons, oldId);
                removeActive(slides, oldId);
                e.target.classList.add('active');
                let newId = findActiveId(buttons);
                applyActive( slides, newId );

            }
        });
    };

    //return id of node that contains active class
    var findActiveId = ( nodeList ) => {
        for ( let i = nodeList.length - 1; i >= 0; i-- ) {
            if ( nodeList[i].classList.contains('active') ) {
                return i
            }
        }
    }
    //apply active class
    var applyActive = ( el , id ) => {
        el[id].classList.add( 'active' );
    }
    //remove active class
    var removeActive = ( el , id ) => {
        el[id].classList.remove( 'active' );
    }

    //event if target doesn't contain dot
    var doesElementContainActive = (e) => {

        if (( e.target.classList.contains( 'dot' ) === false )) {
            return false
        }

        if (( e.target.classList.contains( 'active' ) )) {
            return false
        }

        return true
    }
	return {
		init: init
	}

})();

//init is the only public method.
switcher.init( ".container", ".slide", ".dot" );
