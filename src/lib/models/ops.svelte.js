export class Ops {
    await_estop = $state(false)
    await_door = $state(false)
    await_config = $state(false)

    seek_help = $state(false)
    await_help = $state(false)
    recovery = $state(false)
    
    go_home = $state(false)
    seek_hammer = $state(false)
    seek_anvil = $state(false)
    seek_home = $state(false)
    
    raise_hammer = $state(false)
    drop_hammer = $state(false)
    
    cycle_count = $state(0)
    step_target = $state(0)
    step_hz = $state(0)
    
    status = $state("")

    parse = (msg) => {
        let js = JSON.parse(msg) // console.log("JSON.parse(msg): ", js)
        
        this.await_estop = js.await_estop
        this.await_door = js.await_door
        this.await_config = js.await_config

        this.seek_help = js.seek_help
        this.await_help = js.await_help
        
        this.recovery = js.recovery
        
        this.go_home = js.go_home
        this.seek_hammer = js.seek_hammer
        this.seek_anvil = js.seek_anvil
        this.seek_home = js.seek_home

        this.raise_hammer = js.raise_hammer
        this.drop_hammer = js.drop_hammer

        this.cycle_count = js.cycle_count
        this.step_target = js.step_target
        this.step_hz = js.step_hz

        this.status = js.status
    }

    toJson = () => {
        return {
            await_estop: this.await_estop,
            await_door: this.await_door,
            await_config: this.await_config,

            seek_help: this.seek_help,
            await_help: this.await_help,

            recovery: this.recovery,
            
            go_home: this.go_home,
            seek_hammer: this.seek_hammer,
            seek_anvil: this.seek_anvil,
            seek_home: this.seek_home,
            
            raise_hammer: this.raise_hammer,
            drop_hammer: this.drop_hammer,
            
            cycle_count: this.cycle_count,
            step_target: this.step_target,
            step_hz: this.step_hz,

            status: this.status
        }
    }
    
    toCMD = () => {
        return JSON.stringify(this.toJson())
    }

}