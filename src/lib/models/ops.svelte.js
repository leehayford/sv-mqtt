export class Ops {
    
    diagnostic_mode = $state(false)

    want_estop_release = $state(false)
    want_door_close = $state(false)
    want_config = $state(false)

    request_aid = $state(false)
    want_aid = $state(false)
    reorient = $state(false)
    
    go_home = $state(false)
    seek_hammer = $state(false)
    seek_anvil = $state(false)
    seek_home = $state(false)
    
    raise_hammer = $state(false)
    drop_hammer = $state(false)
    want_strike = $state(true)
    
    cycle_count = $state(0)
    step_target = $state(0)
    step_hz = $state(0)
    
    status = $state("yearns for purpose...")

    parse = (msg) => {
        let js = JSON.parse(msg) // console.log("JSON.parse(msg): ", js)
        
        this.diagnostic_mode = js.diagnostic_mode
        
        this.want_estop_release = js.want_estop_release
        this.want_door_close = js.want_door_close
        this.want_config = js.want_config

        this.request_aid = js.request_aid
        this.want_aid = js.want_aid
        this.reorient = js.reorient
        
        this.go_home = js.go_home
        this.seek_hammer = js.seek_hammer
        this.seek_anvil = js.seek_anvil
        this.seek_home = js.seek_home

        this.raise_hammer = js.raise_hammer
        this.drop_hammer = js.drop_hammer
        this.want_strike = js.want_strike

        this.cycle_count = js.cycle_count
        this.step_target = js.step_target
        this.step_hz = js.step_hz

        this.status = js.status
    }

    toJson = () => {
        return {
            diagnostic_mode: this.diagnostic_mode,

            want_estop_release: this.want_estop_release,
            want_door_close: this.want_door_close,
            want_config: this.want_config,

            request_aid: this.request_aid,
            want_aid: this.want_aid,
            reorient: this.reorient,
            
            go_home: this.go_home,
            seek_hammer: this.seek_hammer,
            seek_anvil: this.seek_anvil,
            seek_home: this.seek_home,
            
            raise_hammer: this.raise_hammer,
            drop_hammer: this.drop_hammer,
            want_strike: this.want_strike,
            
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



/*

Topic: esp32/sig/ops
Message: 
{ 
    "diagnostic_mode": true,

    "want_estop_release": true,
    "want_door_close": true,
    "want_config": true,

    "request_aid": true,
    "want_aid": true,
    "reorient": true,

    "go_home": true,
    "seek_hammer": true,
    "seek_anvil": true,
    "seek_home": true,
    
    "raise_hammer": true,
    "drop_hammer": true,
    "want_strike": true,

    "cycle_count": 999,
    "step_target": 1000,
    "step_hz": 4000,

    "status": "has recived an test ops message"
}

Topic: esp32/sig/ops/pos
Message: 23.5


*/