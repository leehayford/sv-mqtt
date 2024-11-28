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

    toCMD = () => {
        return JSON.stringify(this.toJson())
    }
}