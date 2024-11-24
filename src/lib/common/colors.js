
export const RGBA = ( rgb, a ) => { return `rgba( ${ rgb }, ${ a } )`  }

const DARK = "0, 0, 23"
const CHAR = "105, 105, 105"
const GREY = "175, 175, 175"
const LIGHT = "230, 230, 230"

class RGB3 {
    constructor ( 
        // r = 210, g = 5, b = 15 // RED BASE
        r = 238, g = 105, b = 18 // ORANGE BASE
    ) {
        this.r = r
        this.g = g
        this.b = b
        this.c1 = `${ this.r }, ${ this.g }, ${this. b }` 
        this.c2 = `${ this.b }, ${ this.r }, ${ this.g }`
        this.c3 = `${ this.g }, ${ this.b }, ${ this.r }` 

        this.rc = 255 - this.r
        this.gc = 255 - this.g
        this.bc = 255 - this.b
        this.c1c = `${ this.rc }, ${ this.gc }, ${ this.bc }`  
        this.c2c = `${ this.bc }, ${ this.rc }, ${ this.gc }` 
        this.c3c = `${ this.gc }, ${ this.bc }, ${ this.rc }` 

        
        this.rx = Math.ceil( ( ( this.b / 2 ) + this.r ) )
        this.gx = Math.ceil( ( ( this.r / 2 ) + this.g ) )
        this.bx = Math.ceil( ( ( this.g / 2 ) + this.b ) )
        this.c1x = `${ this.rx }, ${ this.gx }, ${ this.bx }` 
        this.c2x = `${ this.bx }, ${ this.rx }, ${ this.gx }` 
        this.c3x = `${ this.gx }, ${ this.bx }, ${ this.rx }` 

        this.ry = 255 - this.rx
        this.gy = 255 - this.gx
        this.by = 255 - this.bx
        this.c1y = `${ this.ry }, ${ this.gy }, ${ this.by }` 
        this.c2y = `${ this.by }, ${ this.ry }, ${ this.gy }` 
        this.c3y = `${ this.gy }, ${ this.by }, ${ this.ry }` 
    }
}

const REDSEED = new RGB3( 210, 5, 15 ) // RED BASE
export const BASE = {
    DARK: DARK,
    CHAR: CHAR,
    GREY: GREY,
    LIGHT: LIGHT,
    RED: REDSEED.c1,
    ORANGE: REDSEED.c1x,
    YELLOW: REDSEED.c3c,
    LIME: REDSEED.c3y, // LIME
    GREEN: REDSEED.c2,
    SEAFOAM: REDSEED.c2x, // SEAFOAM
    AQUA: REDSEED.c1c,
    SKYBLUE: REDSEED.c1y,
    BLUE: REDSEED.c3,
    PURPLE: REDSEED.c3x,
    PINK: REDSEED.c2c,
    MAGENTA: REDSEED.c2y,
}