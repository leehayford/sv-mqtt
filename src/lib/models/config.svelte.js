export class Config {
    cycles = $state(0)
    height = $state(0.0)

    parse = (msg) => {
        let js = JSON.parse(msg) // console.log("JSON.parse(msg): ", js)
        this.cycles = js.cycles
        this.height = js.height
    }

    toJson = () => {
        return {
            cycles: this.cycles,
            height: this.height
        }
    }

    validate = (max) => {
        if( this.cycles > 0
        &&  this.height > 0
        &&  this.height <= max
        ) return true

        return false
    }

    toCMD = () => {
        return JSON.stringify(this.toJson())
    }
}


/*
Topic: esp32/sig/config
Message: 
{ 
    "cycles": 1000,
    "height": 47.9
}

*/