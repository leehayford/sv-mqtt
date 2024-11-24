/*
License:

	[PROPER LEGALESE HERE...]

	INTERIM LICENSE DESCRIPTION:
	In spirit, this license:
	1. Allows <Third Party> to use, modify, and / or distributre this software in perpetuity so long as <Third Party> understands:
		a. The software is porvided as is without guarantee of additional support from DataCan in any form.
		b. The software is porvided as is without guarantee of exclusivity.

	2. Prohibits <Third Party> from taking any action which might interfere with DataCan's right to use, modify and / or distributre this software in perpetuity.
*/

import { writable } from 'svelte/store'

import { debugging } from './app'

const DBGPFX = "utils.js -> "

/* SVELTE-KIT 1.x ADDS TRAILING SLASHES TO PAGE URLS IN SOME CASES
    THEN REMOVES THEM ON REFRESH.  v 2.x IS SAID TO HAVE FIXED THIS BUT, 
    UNTIL WE HAVE TIME TO MIGRATE:
        import { page } from '$app/stores'
        url = $page.url.pathname 
        pre = 'route_name/' 
        pg = 'page_name'
*/
export const routeFixer = ( url, pre, pg ) => { 
    return ( url.slice(url.length - 1,) === "/" ? pg : pre + pg )
}

export const debug = ( msg, obj ) => { 
    if ( debugging && obj ) console.log( msg, obj ) 
    else if ( debugging  ) console.log( msg ) 
}

export const waitMilli = ( ms ) => new Promise( ( res ) => setTimeout( res, ms ) )

export const randoID = ( ) => `inp${ ( ( ( 1+Math.random( ) ) * Date.now( ) ) | 0 ) }`

export const openModals = ( initial ) => {
    const isOpen = writable( initial )
    const { set, update } = isOpen
    return {
        isOpen,
        open: ( ) => set( true ),
        close: ( ) => set( false ),
        toggle: ( ) => update( ( n ) => !n ),
    }
}

export const ALERT = writable( "" )
export const ALERT_CODE = writable( 0 )
export const ALERT_CODES = {
    SUCCESS: 1,
    WARNING: 2,
    ERROR: 3
}

export const alert = async( code, msg ) => {
    debug( `${ DBGPFX } alert( ${ code }, ${ msg } )` )
    ALERT_CODE.set( code )
    ALERT.set( msg )
}


export const saveBlobToFile = async( blob, fileName ) => {

    if ( window.navigator && window.navigator.msSaveOrOpenBlob ) {

        window.navigator.msSaveOrOpenBlob( blob )

    } else {

        /* SAVE TO DEFAULT DOWNLOADS FOLDER */
        const url = window.URL.createObjectURL( blob )
        let link = document.createElement( 'a' )
        link.href = url
        link.download = fileName
        link.target="_blank"
        link.click( )

        // FIREFOX -> DELAY REVOKING ObjectURL.
        setTimeout( ( ) => { window.URL.revokeObjectURL( url ) }, 250)
    }
}