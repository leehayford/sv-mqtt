
import mqtt from  'mqtt' // npm install mqtt
import {MQTT_BROKER, MQTT_USER, MQTT_PW} from '$lib/app'

import {ALERT_CODES, alert, waitMilli } from '$lib/utils';

import { State } from "./state.svelte";
import { Config } from "./config.svelte";

const MQTT_PRFX = 'esp32/'

/* MQTT Signal Topics */
const MQTT_SIG_ALL = MQTT_PRFX + 'sig/#'
const MQTT_SIG_ERR = MQTT_PRFX + 'sig/error'
const MQTT_SIG_WARN = MQTT_PRFX + 'sig/warn'
const MQTT_SIG_SUCCESS = MQTT_PRFX + 'sig/success'
const MQTT_SIG_STATE = MQTT_PRFX + 'sig/state'
const MQTT_SIG_CONFIG = MQTT_PRFX + 'sig/config'
const MQTT_SIG_MOTPOS = MQTT_PRFX + 'sig/motpos'

/* MQTT Command Topics */
const MQTT_CMD_REPORT = MQTT_PRFX + 'cmd/report'
const MQTT_CMD_STATE = MQTT_PRFX + 'cmd/state'
const MQTT_CMD_CONFIG = MQTT_PRFX + 'cmd/config'

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

    mqttClient
    mqttClientID
    mqttConnected = false

    position = $state(0)
    percentComplete = $state(0)

    constructor() { // console.log("New Machine")
        this.sta = new State()
        this.cfg = new Config()
        this.mqttConnect()
    }


    mqttConnect = () => {
        
        console.log('MQTT client connecting...')
        this.mqttClientID = 'esp32_' + Math.random().toString(16).substr(2, 8)
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
                case MQTT_SIG_ERR: alert(ALERT_CODES.ERROR, msg); break
                case MQTT_SIG_WARN: alert(ALERT_CODES.WARNING, msg); break
                case MQTT_SIG_SUCCESS: alert(ALERT_CODES.SUCCESS, msg); break
                case MQTT_SIG_STATE: 
                    this.sta.parse(msg) 
                    this.percentComplete = (
                        this.cfg.cycles == 0 || this.sta.cycles_completed > this.cfg.cycles 
                        ? 0 
                        : this.sta.cycles_completed
                    ) // console.log("this.sta.parse(): ", this.sta)
                    break
                case MQTT_SIG_CONFIG: 
                    if(this.cfg.run) this.cfg.parse(msg) // console.log("this.cfg.parse(): ", this.cfg)
                    break
                case MQTT_SIG_MOTPOS: 
                    this.sta.current_height = Number(msg).toFixed(3)
                    this.position = Number(this.sta.current_height).toFixed(3)
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

    mqttCMDReport = () => {
        this.mqttPublish(MQTT_CMD_REPORT, 'yaaaaahhhh.....')
    }
    mqttCMDState = () => {
        this.sta.run = true
        this.mqttPublish(MQTT_CMD_STATE, this.sta.toCMD())
    }
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
    mqttPublish = (topic, cmd) => {this.mqttClient.publish(topic, cmd)}
}

export const GZ = $state(new Machine())

// export const GZ = $state({})

// export const createMachine = () => {
//     GZ = new Machine()
// }