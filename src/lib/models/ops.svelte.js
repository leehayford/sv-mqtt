export class Ops {
    await_estop = $state(false)
    await_door = $state(false)
    await_config = $state(false)
    req_help = $state(false)
    await_help = $state(false)
    recovery = $state(false)
    
    seek_hammer = $state(false)
    seek_anvil = $state(false)
    seek_home = $state(false)
    
    raise_hammer = $state(false)
    drop_hammer = $state(false)
    
    cycles_completed = $state(0)
    
    status = $state("")

    parse = (msg) => {
        let js = JSON.parse(msg) // console.log("JSON.parse(msg): ", js)
        
        this.await_estop = js.await_estop
        this.await_door = js.await_door
        this.await_config = js.await_config
        this.req_help = js.req_help
        this.await_help = js.await_help
        this.recovery = js.recovery
        
        this.seek_hammer = js.seek_hammer
        this.seek_anvil = js.seek_anvil
        this.seek_home = js.seek_home

        this.raise_hammer = js.raise_hammer
        this.drop_hammer = js.drop_hammer

        this.cycles_completed = js.cycles_completed

        this.status = js.status
    }

    toJson = () => {
        return {
            await_estop: this.await_estop,
            await_door: this.await_door,
            await_config: this.await_config,
            req_help: this.req_help,
            await_help: this.await_help,
            recovery: this.recovery,
            
            seek_hammer: this.seek_hammer,
            seek_anvil: this.seek_anvil,
            seek_home: this.seek_home,
            
            raise_hammer: this.raise_hammer,
            drop_hammer: this.drop_hammer,
            
            cycles_completed: this.cycles_completed,

            status: this.status
        }
    }
    
    toCMD = () => {
        return JSON.stringify(this.toJson())
    }

}