
import mqtt from  'mqtt' // npm install mqtt
import {MQTT_BROKER, MQTT_USER, MQTT_PW, MQTT_DEVICE} from '$lib/app'

import {ALERT_CODES, alert, waitMilli } from '$lib/utils';

import { Error } from './error.svelte'
import { State } from './state.svelte'
import { Config } from './config.svelte'
import { Ops } from './ops.svelte';

// const MQTT_PRFX = '002/001/'
// const MQTT_SIG_PRFX =  MQTT_PRFX + 'sig/'
// const MQTT_CMD_PRFX =  MQTT_PRFX + 'cmd/'

const MQTT_SIG_PRFX =  MQTT_DEVICE + '/sig/'
const MQTT_CMD_PRFX =  MQTT_DEVICE + '/cmd/'
const MQTT_DIAG_PRFX =  MQTT_CMD_PRFX + 'diag/'

/* MQTT Signal Topics */
const MQTT_SIG_ALL = MQTT_SIG_PRFX + '#'
const MQTT_SIG_ERR = MQTT_SIG_PRFX + 'error'
const MQTT_SIG_STATE = MQTT_SIG_PRFX + 'state'
const MQTT_SIG_CONFIG = MQTT_SIG_PRFX + 'config'
const MQTT_SIG_OPS = MQTT_SIG_PRFX + 'ops'
const MQTT_SIG_OPS_POS = MQTT_SIG_OPS + '/pos'

/* MQTT Command Topics */
const MQTT_CMD_REPORT = MQTT_CMD_PRFX + 'report'
const MQTT_CMD_STATE = MQTT_CMD_PRFX + 'state'
const MQTT_CMD_CONFIG = MQTT_CMD_PRFX + 'config'

const MQTT_CMD_OPS = MQTT_CMD_PRFX + 'ops'
const MQTT_CMD_OPS_RESET = MQTT_CMD_OPS + '/reset'
const MQTT_CMD_OPS_CONTINUE = MQTT_CMD_OPS + '/continue'

/* MQTT Diagnostic Command Topics */
const MQTT_DIAG_ENABLE = MQTT_DIAG_PRFX + 'enable'
const MQTT_DIAG_DISABLE = MQTT_DIAG_PRFX + 'disable'

const MQTT_DIAG_BRAKE_ON = MQTT_DIAG_PRFX + 'brake_on'
const MQTT_DIAG_BRAKE_OFF = MQTT_DIAG_PRFX + 'brake_off'

const MQTT_DIAG_MAGNET_ON = MQTT_DIAG_PRFX + 'magnet_on'
const MQTT_DIAG_MAGNET_OFF = MQTT_DIAG_PRFX + 'magnet_off'

const MQTT_DIAG_MOVE_UP = MQTT_DIAG_PRFX + 'move_up'
const MQTT_DIAG_MOVE_DOWN = MQTT_DIAG_PRFX + 'move_down'
const MQTT_DIAG_MOTOR_STOP = MQTT_DIAG_PRFX + 'motor_stop'


const MQTT_OPT_KEEP = 60
const MQTT_OPT_PROT_ID = 'MQTT'
const MQTT_OPT_PROT_V = 5
const MQTT_OPT_PROT_CLEAN = true
const MQTT_OPT_RECONN = 1000
const MQTT_OPT_TIMEOUT = MQTT_OPT_RECONN * 30


const MAX_SWING_HEIGHT = 48.00

export class Machine {
    sta
    cfg
    ops
    err

    mqttClient
    mqttClientID
    mqttConnected = false

    position = $state(0)
    percentComplete = $state(0)

    constructor() { // console.log("New Machine")
        this.sta = new State()
        this.cfg = new Config()
        this.ops = new Ops()
        this.err = new Error()
        this.mqttConnect()
    }


    mqttConnect = () => {
        
        console.log('MQTT client connecting...')
        this.mqttClientID = '2chainz_' + Math.random().toString(16).substr(2, 8)
        this.mqttClient = mqtt.connect(MQTT_BROKER, {      
            keepalive: MQTT_OPT_KEEP,
            clientId: this.mqttClientID,
            username: MQTT_USER,
            password: MQTT_PW,
            protocolId: MQTT_OPT_PROT_ID,
            protocolVersion: MQTT_OPT_PROT_V,
            clean: MQTT_OPT_PROT_CLEAN,
            reconnectPeriod: MQTT_OPT_RECONN,
            connectTimeout: MQTT_OPT_TIMEOUT,
            // will: {topic: 'will_msg', payload: 'connection closed abnormally', qos: 0, retain: false}
        })
        
        this.mqttClient.on('error', (err) => {
            console.log('MQTT connection error: ', err)
            this.mqttClientclient.end()
            this.mqttConnected = false
        })
        this.mqttClient.on('reconnect', () => {
            console.log('MQTT reconnecting...')
        })
        this.mqttClient.on('connect', () => {  
            console.log(`MQTT client connected: ${this.mqttClientID}` ); 
            this.mqttClient.subscribe(MQTT_SIG_ALL, {qos: 0}) 
            this.mqttConnected = true  
            this.mqttCMDReport()  
        })

        this.mqttClient.on('message', (topic, msg, pkt) => { // console.log(`${topic} -> ${msg.toString()}`)

            switch(topic) {
                case MQTT_SIG_ERR: 
                    this.err.parse(msg) 
                    alert(this.err.code, this.err.message) 
                    console.log(this.err.toJson())
                    break

                case MQTT_SIG_STATE: 
                    this.sta.parse(msg)
                    console.log("STATE:", this.sta.toJson())
                    break

                case MQTT_SIG_CONFIG: 
                    if( this.cfg.run                                    /* We are running at the moment */ 
                    ) {
                        this.cfg.parse(msg)                             // Accept this message from the machine
                        console.log("CONFIG:", this.cfg.toJson())
                    }
                    break

                case MQTT_SIG_OPS: 
                    this.ops.parse(msg) 

                    this.percentComplete = (   
                    (   this.cfg.cycles >= 0                            /* We have a valid cycle setting */
                    &&  this.ops.cycle_count <= this.cfg.cycles         /* we have a valid cycle count */
                    )
                        ? this.ops.cycle_count                          // Show the cycle count
                        : 0                                             // Otherwise, show 0
                    ) 

                    this.position = Number(this.sta.current_height).toFixed(3)
                    console.log("OPS:", this.ops.toJson())
                    break

                case MQTT_SIG_OPS_POS: 
                    this.sta.current_height = Number(msg).toFixed(3)
                    this.position = Number(this.sta.current_height).toFixed(3)
                    // console.log("pos: ", this.sta.current_height)
                    break
            }
        
        })
    }

    mqttDisconnect = async() => {
        this.mqttClientclient.end()
        this.mqttConnected = false
        console.log("Machine MQTT disconnected")
        waitMilli(1000);
    }

    /* MQTT publiccations ***************************************************************************/

    mqttCMDReport = () => {
        this.mqttPublish(MQTT_CMD_REPORT, 'yaaaaahhhh.....')
    }

    /* State Commands */
    mqttCMDState = () => {
        this.mqttPublish(MQTT_CMD_STATE, this.sta.toCMD())
    }

    /* Config Commands */
    mqttCMDConfig = () => {
        this.cfg.run = true
        this.mqttPublish(MQTT_CMD_CONFIG, this.cfg.toCMD())
    }
    mqttCMDCancel = () => {
        this.cfg.run = false
        this.cfg.cycles = 0
        this.cfg.height = 0.0
        this.mqttPublish(MQTT_CMD_CONFIG, this.cfg.toCMD())
    }

    /* Ops Commands */
    mqttCMDOps = () => {
        this.mqttPublish(MQTT_CMD_OPS, 'yaaaaahhhh.....')
    }

    mqttCMDContinue = () => {
        console.log("mqttCMDContinue")
        this.mqttPublish(MQTT_CMD_OPS_CONTINUE, 'yaaaaahhhh.....')
    }

    mqttCMDReset = () => {
        console.log("mqttCMDReset")
        this.mqttPublish(MQTT_CMD_OPS_RESET, 'yaaaaahhhh.....')
    }

    /* Diagnostic Commands */
    mqttCMDEnableDiagMdoe = () => { this.mqttPublish(MQTT_DIAG_ENABLE, '') }
    mqttCMDDisableDiagMdoe = () => { this.mqttPublish(MQTT_DIAG_DISABLE, '') }

    mqttDIAGBrakeOn = () => { this.mqttPublish(MQTT_DIAG_BRAKE_ON, ''); console.log("brake on"); }
    mqttDIAGBrakeOff = () => { this.mqttPublish(MQTT_DIAG_BRAKE_OFF, ''); console.log("brake off"); }
    
    mqttDIAGMagnetOn = () => this.mqttPublish(MQTT_DIAG_MAGNET_ON, '')
    mqttDIAGMagnetOff = () => this.mqttPublish(MQTT_DIAG_MAGNET_OFF, '')
    
    mqttDIAGMoveUp = () => this.mqttPublish(MQTT_DIAG_MOVE_UP, '')
    mqttDIAGMoveDown = () => this.mqttPublish(MQTT_DIAG_MOVE_DOWN, '')
    mqttDIAGMotorStop = () => this.mqttPublish(MQTT_DIAG_MOTOR_ON, '')

    mqttPublish = (topic, cmd) => {this.mqttClient.publish(topic, cmd)}
}

export const GZ = $state(new Machine())

