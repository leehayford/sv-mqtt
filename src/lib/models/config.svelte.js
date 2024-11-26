export class Config {
    cycles = $state(0)
    height = $state(0.0)

    parse = (msg) => {
        let js = JSON.parse(msg) // console.log("JSON.parse(msg): ", js)
        this.cycles = js.cycles
        this.height = js.height
    }
}