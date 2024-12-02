export class State {
    estop = $state(false)
    door_open = $state(false)
    fist_limit = $state(false)
    anvil_limit = $state(false)
    home_limit = $state(false)
    top_limit = $state(false)
    pressure = $state(false)
    
    brake_on = $state(false)
    magnet_on = $state(false)
    motor_on = $state(false)
    
    motor_steps = $state(0)
    current_height = $state(0.0)

    parse = (msg) => {
        let js = JSON.parse(msg) // console.log("JSON.parse(msg): ", js)
        
        this.estop = js.estop
        this.door_open = js.door_open
        this.fist_limit = js.fist_limit
        this.anvil_limit = js.anvil_limit
        this.home_limit = js.home_limit
        this.top_limit = js.top_limit
        this.pressure = js.pressure
        
        this.brake_on = js.brake_on
        this.magnet_on = js.magnet_on
        this.motor_on = js.motor_on
        
        this.motor_steps = js.motor_steps
        this.current_height = js.current_height
    }

    toJson = () => {
        return {
            estop: this.estop,
            door_open: this.door_open,
            fist_limit: this.fist_limit,
            anvil_limit: this.anvil_limit,
            home_limit: this.home_limit,
            top_limit: this.top_limit,
            pressure: this.pressure,
            
            brake_on: this.brake_on,
            magnet_on: this.magnet_on,
            motor_on: this.motor_on,

            motor_steps: this.motor_steps,
            current_height: this.current_height
        }
    }
    
    toCMD = () => {
        return JSON.stringify(this.toJson())
    }

}