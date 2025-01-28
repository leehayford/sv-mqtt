export class Config {
    run = $state(false)
    cycles = $state(0)
    height = $state(0.0)

    parse = (msg) => {
        let js = JSON.parse(msg) // console.log("JSON.parse(msg): ", js)
        this.run = js.run
        this.cycles = js.cycles
        this.height = js.height
    }

    toJson = () => {
        return {
            run: this.run,
            cycles: this.cycles,
            height: this.height
        }
    }

    validate = () => {
        if( this.cycles > 0
        &&  this.height > 0
        &&  this.height <= 48.0
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
    "run": true,
    "cycles": 1000,
    "height": 47.9
}

*/