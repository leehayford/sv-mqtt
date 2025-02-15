
import mqtt from  'mqtt' // npm install mqtt
import {MQTT_BROKER, MQTT_USER, MQTT_PW, MQTT_DEVICE} from '$lib/app'

import {ALERT_CODES, showAlert, waitMilli } from '$lib/utils';

import { Alert } from './alert.svelte'
import { Admin } from './admin.svelte'
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
const MQTT_SIG_ALERT = MQTT_SIG_PRFX + 'alert'
const MQTT_SIG_ADMIN = MQTT_SIG_PRFX + 'admin'
const MQTT_SIG_STATE = MQTT_SIG_PRFX + 'state'
const MQTT_SIG_CONFIG = MQTT_SIG_PRFX + 'config'
const MQTT_SIG_OPS = MQTT_SIG_PRFX + 'ops'
const MQTT_SIG_OPS_POS = MQTT_SIG_OPS + '/pos'

/* MQTT Command Topics */
const MQTT_CMD_REPORT = MQTT_CMD_PRFX + 'report'

/* MQTT Command Topics - ADMIN */
const MQTT_CMD_ADMIN = MQTT_CMD_PRFX + 'admin'
const MQTT_CMD_ADMIN_SET = MQTT_CMD_ADMIN + '/set_def'
const MQTT_CMD_ADMIN_GET = MQTT_CMD_ADMIN + '/get_def'

/* MQTT Command Topics - IO / HW STATE */
const MQTT_CMD_STATE = MQTT_CMD_PRFX + 'state'

/* MQTT Command Topics - CONFIG */
const MQTT_CMD_CONFIG = MQTT_CMD_PRFX + 'config'

/* MQTT Command Topics - OPS */
const MQTT_CMD_OPS = MQTT_CMD_PRFX + 'ops'
const MQTT_CMD_OPS_RESET = MQTT_CMD_OPS + '/reset'
const MQTT_CMD_OPS_RUN = MQTT_CMD_OPS + '/run'
const MQTT_CMD_OPS_PAUSE = MQTT_CMD_OPS + '/pause'
const MQTT_CMD_OPS_CONTINUE = MQTT_CMD_OPS + '/continue'
const MQTT_CMD_OPS_EN_AWES = MQTT_CMD_OPS + '/en_awes'
const MQTT_CMD_OPS_DIS_AWES = MQTT_CMD_OPS + '/dis_awes'

/* MQTT Command Topics - DIAGNOSTICS */
const MQTT_DIAG_ENABLE = MQTT_DIAG_PRFX + 'enable'
const MQTT_DIAG_DISABLE = MQTT_DIAG_PRFX + 'disable'

const MQTT_DIAG_BRAKE_ON = MQTT_DIAG_PRFX + 'brake_on'
const MQTT_DIAG_BRAKE_OFF = MQTT_DIAG_PRFX + 'brake_off'

const MQTT_DIAG_MAGNET_ON = MQTT_DIAG_PRFX + 'magnet_on'
const MQTT_DIAG_MAGNET_OFF = MQTT_DIAG_PRFX + 'magnet_off'

const MQTT_DIAG_MOVE_UP = MQTT_DIAG_PRFX + 'move_up'
const MQTT_DIAG_MOVE_DOWN = MQTT_DIAG_PRFX + 'move_down'
const MQTT_DIAG_MOTOR_STOP = MQTT_DIAG_PRFX + 'motor_stop'
const MQTT_DIAG_MOTOR_ZERO = MQTT_DIAG_PRFX + 'motor_zero'


const MQTT_OPT_KEEP = 60
const MQTT_OPT_PROT_ID = 'MQTT'
const MQTT_OPT_PROT_V = 5
const MQTT_OPT_PROT_CLEAN = true
const MQTT_OPT_RECONN = 1000
const MQTT_OPT_TIMEOUT = MQTT_OPT_RECONN * 30


const MAX_SWING_HEIGHT = 48.00

export class Machine {
    alrt
    adm
    sta
    cfg
    ops

    mqttClient
    mqttClientID
    mqttConnected = false

    percentComplete = $state(0.0)

    constructor() { // console.log("New Machine")
        this.alrt = new Alert()
        this.adm = new Admin()
        this.sta = new State()
        this.cfg = new Config()
        this.ops = new Ops()
        this.mqttConnect()
    }

    findPercentComplete = () => {

        this.percentComplete = (   
            (   this.cfg.cycles > 0                             /* We have a valid cycle setting */
            &&  this.ops.cycle_count <= this.cfg.cycles         /* we have a valid cycle count */
            )
                ? this.ops.cycle_count                          // Show the cycle count
                : 0.0                                           // Otherwise, show 0
        )
    }

    mqttConnect = () => {
        
        console.log('MQTT client connecting...')
        this.mqttClientID = '2ChainzUI_' + Math.random().toString(13).substring(2, 15)
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
                case MQTT_SIG_ALERT: 
                    this.alrt.parse(msg) 
                    showAlert(this.alrt.headline, this.alrt.message, this.alrt.code) 
                    console.log(this.alrt.toJson())
                    break

                case MQTT_SIG_ADMIN:
                    this.adm.parse(msg)
                    console.log("ADMIN:", this.adm.toJson())
                    break

                case MQTT_SIG_STATE: 
                    this.sta.parse(msg)
                    console.log("STATE:", this.sta.toJson())
                    break

                case MQTT_SIG_CONFIG: 
                    this.cfg.parse(msg)                             
                    console.log("CONFIG:", this.cfg.toJson())
                    break

                case MQTT_SIG_OPS: 
                    this.ops.parse(msg)       
                    console.log("OPS:", this.ops.toJson())
                    this.findPercentComplete()
                    break

                case MQTT_SIG_OPS_POS: 
                    this.sta.current_height = Number(msg).toFixed(3)
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

    /* MQTT publications ***************************************************************************/

    mqttCMDReport = () => {this.mqttPublish(MQTT_CMD_REPORT, 'yaaaaahhhh.....')}

    /* Admin Commands */
    mqttCMDAdmin = () => {this.mqttPublish(MQTT_CMD_ADMIN, this.adm.toCMD())}
    mqttCMDAdminSetDefaults = () => {this.mqttPublish(MQTT_CMD_ADMIN_SET, this.adm.toCMD())}
    mqttCMDAdminGetDefaults = () => {this.mqttPublish(MQTT_CMD_ADMIN_GET, 'yaaaaahhhh.....')}

    /* State Commands */
    mqttCMDState = () => {this.mqttPublish(MQTT_CMD_STATE, this.sta.toCMD())}

    /* Config Commands */
    mqttCMDConfig = () => {this.mqttPublish(MQTT_CMD_CONFIG, this.cfg.toCMD())}

    /* Ops Commands */
    mqttCMDOps = () => {this.mqttPublish(MQTT_CMD_OPS, 'send ops')}
    mqttCMDReset = () => {this.mqttPublish(MQTT_CMD_OPS_RESET, 'reset')}
    mqttCMDRun = () => {this.mqttPublish(MQTT_CMD_OPS_RUN, 'run')}
    mqttCMDPause = () => {this.mqttPublish(MQTT_CMD_OPS_PAUSE, 'run')}
    mqttCMDContinue = () => {this.mqttPublish(MQTT_CMD_OPS_CONTINUE, 'continue')}
    mqttCMDEnableAWESMode = () => {
        this.mqttPublish(MQTT_CMD_OPS_EN_AWES, 'enable awes')

        /* TODO: REMOVE */
        this.ops.awes_mode = true
        this.cfg.cycles = 1
    }
    mqttCMDDisableAWESMode = () => { 
        this.mqttPublish(MQTT_CMD_OPS_DIS_AWES, 'disable awes')

        /* TODO: REMOVE */
        this.ops.awes_mode = false
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
    
    mqttDIAGMotorStop = () => this.mqttPublish(MQTT_DIAG_MOTOR_STOP, '')
    mqttDIAGMotorZero = () => this.mqttPublish(MQTT_DIAG_MOTOR_ZERO, '')

    mqttPublish = (topic, cmd) => {this.mqttClient.publish(topic, cmd)}
}

export const GZ = $state(new Machine())

