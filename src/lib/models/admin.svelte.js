export class Admin {
    ops_tmr_hammer_usec = $state(500000)
    ops_tmr_brake_usec = $state(300000)
    ops_pos_period_msec = $state(300)
    
    io_tmr_itr_deb_usec = $state(2000)
    
    mot_hz_low = $state(500)
    mot_hz_high = $state(4000)
    mot_accel = $state(4000)
    mot_decel = $state(4000)

    mot_inch_rev = $state(6.0)
    mot_steps_rev = $state(2000)

    mot_inch_max = $state(46.75)
    mot_steps_max = $state(15583)
    
    mot_inch_over = $state(0.099)
    mot_steps_over = $state(33)

    diag_inch = $state(46.75)
    diag_steps = $state(4)

    parse = (msg) => {
        let js = JSON.parse(msg) // console.log("JSON.parse(msg): ", js)

        this.ops_tmr_hammer_usec = js.ops_tmr_hammer_usec
        this.ops_tmr_brake_usec = js.ops_tmr_brake_usec
        this.ops_pos_period_msec = js.ops_pos_period_msec
        
        this.io_tmr_itr_deb_usec = js.io_tmr_itr_deb_usec
        
        this.mot_hz_low = js.mot_hz_low
        this.mot_hz_high = js.mot_hz_high
        this.mot_accel = js.mot_accel
        this.mot_decel = js.mot_decel
        
        this.mot_inch_rev = js.mot_inch_rev
        this.mot_steps_rev = js.mot_steps_rev
        
        this.mot_inch_max = js.mot_inch_max
        this.mot_steps_max = js.mot_steps_max
        
        this.mot_inch_over = js.mot_inch_over
        this.mot_steps_over = js.mot_steps_over

        this.diag_inch = js.diag_inch
        this.diag_steps = js.diag_steps
    }

    toJson = () => {
        return {
            ops_tmr_hammer_usec: this.ops_tmr_hammer_usec,
            ops_tmr_brake_usec:this.ops_tmr_brake_usec,
            ops_pos_period_msec: this.ops_pos_period_msec,
            
            io_tmr_itr_deb_usec: this.io_tmr_itr_deb_usec,
            
            mot_hz_low: this.mot_hz_low,
            mot_hz_high: this.mot_hz_high,
            mot_accel: this.mot_accel,
            mot_decel: this.mot_decel,
            
            mot_inch_rev: this.mot_inch_rev,
            mot_steps_rev: this.mot_steps_rev,
            
            mot_inch_max: this.mot_inch_max,
            mot_steps_max: this.mot_steps_max,
            
            mot_inch_over: this.mot_inch_over,
            mot_steps_over: this.mot_steps_over,

            diag_inch: this.diag_inch,
            diag_steps: this.diag_steps,
        }
    }
    
    toCMD = () => {
        return JSON.stringify(this.toJson())
    }

}

/*
Topic: espdev/cmd/admin
Message:
{    
    "diag_inch": 0.002,
    "diag_steps": 33,
    "io_tmr_itr_deb_usec": 2000,
    "mot_accel": 4000,
    "mot_decel": 4000,
    "mot_hz_high": 4000,
    "mot_hz_low": 500,
    "mot_inch_max": 46.75,
    "mot_inch_over": 0.099,
    "mot_inch_rev": 6.0,
    "mot_steps_max": 15583,
    "mot_steps_over": 33,
    "mot_steps_rev": 2000,
    "ops_mag_delay_msec": 300,
    "ops_pos_period_msec": 300,
    "ops_tmr_hammer_usec": 500000
}

*/