<script>

    import mqtt from  'mqtt' // npm install mqtt
    import {MQTT_BROKER, MQTT_USER, MQTT_PW} from '$lib/app'

    import {State} from '$lib/models/state.svelte'
    let sta = new State()

    import {Config} from '$lib/models/config.svelte'
    let cfg = new Config()

    import {ALERT_CODES, alert} from '$lib/utils'
    import {RGBA, BASE} from '$lib/common/colors'
    import InputNum from '$lib/common/input_num/InputNum.svelte'
    import PanelControl from '$lib/common/panel/PanelControl.svelte'
    import StateIcon from '$lib/common/state_icon/StateIcon.svelte'
    import ButtonIcon from '$lib/common/button_icon/ButtonIcon.svelte'
    import img_accept from '../lib/assets/Accept.svg'

    const clientId =  'esp32_' + Math.random().toString(16).substr(2, 8)
    const options = {      
        keepalive: 60,
        clientId: clientId,
        username: MQTT_USER,
        password: MQTT_PW,
        protocolId: 'MQTT',
        protocolVersion: 5,
        clean: true,
        reconnectPeriod: 1000,
        connectTimeout: 30 * 1000,
        will: {
            topic: 'will_msg',
            payload: 'connection closed abnormally',
            qos: 0,
            retain: false
        },
    }

    console.log('Connecting mqtt client')
    const client = mqtt.connect(MQTT_BROKER, options)
    client.on('error', (err) => {console.log('Connection error: ', err);  client.end()})
    client.on('reconnect', () => {console.log( 'Reconnecting...')})
    client.on('message', (topic, msg, pkt) => { // console.log(`${topic} -> ${msg.toString()}`)

        switch(topic) {
            case 'lee/test/error': alert(ALERT_CODES.ERROR, msg); break
            case 'lee/test/warning': alert(ALERT_CODES.WARNING, msg); break
            case 'lee/test/success': alert(ALERT_CODES.SUCCESS, msg); break
            case 'esp32/sig/state': 
                sta.parse(msg) 
                console.log("sta.parse(): ", sta)
                break
            case 'esp32/sig/config': 
                cfg.parse(msg) 
                console.log("cfg.parse(): ", cfg)
                break
            case 'esp32/sig/motpos': 
                sta.current_height = Number(msg).toFixed(3)
                break
        }
    
    })

    client.on('connect', () => {  
        console.log(`Connected: ${clientId}` ); 
        client.subscribe('lee/test/#', {qos: 0}) 
        client.subscribe('esp32/sig/#', {qos: 0})     
    })

    const testPub1 = () => {client.publish('lee/test/1', 'mqtt over ws test 1', {qos: 0, retain: false})}
    const testPub2 = () => {client.publish('lee/test/2', 'mqtt over ws test 2', {qos: 0, retain: false})}
    const testPub3 = () => {client.publish('lee/test/3', 'mqtt over ws test 3', {qos: 0, retain: false})}
    const testPub4 = () => {client.publish('lee/test/4', 'mqtt over ws test 4', {qos: 0, retain: false})}
    const testPub5 = () => {client.publish('lee/test/5', 'mqtt over ws test 5', {qos: 0, retain: false})}

    const testAlertE = () => {alert( ALERT_CODES.ERROR, "test error")}
    const testAlertW = () => {alert( ALERT_CODES.WARNING, "test warning")}
    const testAlertS = () => {alert( ALERT_CODES.SUCCESS, "test success")}

    let colorOK = RGBA(BASE.SEAFOAM, 0.8)
    let colorWarn = RGBA(BASE.ORANGE, 0.8)
    let colorFault = RGBA(BASE.RED, 0.8)

</script>

<h1>MQTT  WebSocket Test</h1>
<div class="container">
    <div class="row">
        <!-- <div class="btn-col">
            <br>
            <ButtonIcon func={testPub1} color={RGBA(BASE.LIME, 0.7)} />
            <ButtonIcon func={testPub2} color={RGBA(BASE.GREEN, 0.7)} />
            <ButtonIcon func={testPub3} color={RGBA(BASE.BLUE, 0.7)} />
            <ButtonIcon func={testPub4} color={RGBA(BASE.PINK, 0.7)} />
            <ButtonIcon func={testPub5} color={RGBA(BASE.PURPLE, 0.7)} />
            <br>
            <ButtonIcon func={testAlertE} color={RGBA(BASE.RED, 0.7)} />
            <ButtonIcon func={testAlertW} color={RGBA(BASE.ORANGE, 0.7)} />
            <ButtonIcon func={testAlertS} color={RGBA(BASE.SEAFOAM, 0.7)} />
        </div>
        <br> -->
        <div class="col">
            <h3>State: {sta.status}</h3>
            <PanelControl lbl="Cycle" lbl_color={RGBA(BASE.SEAFOAM, 0.7)}>
                <div class="control-num">
                    <InputNum width="100%" enabled={true} height="var(--ctrl-h-s)" 
                        bind:num={sta.cycles_completed} is_integer={true}/>
                    <div>QTY</div>
                </div>
            </PanelControl>
            <PanelControl lbl="Position" lbl_color={RGBA(BASE.SEAFOAM, 0.7)}>
                <div class="control-num">
                    <InputNum width="100%" enabled={true} height="var(--ctrl-h-s)" 
                        bind:num={sta.current_height}/>
                    <div>INCH</div>
                </div>
            </PanelControl>
            
            <StateIcon bind:alarm={sta.estop}
            colorClear={colorOK} lblClear="SYSTEM ENABLED"
            colorAlarm={colorFault} lblAlarm="EMERGENCY STOP"
            />
            
            <StateIcon bind:alarm={sta.door_open}
            colorClear={colorOK} lblClear="DOOR CLOSED"
            colorAlarm={colorFault} lblAlarm="DOOR OPEN"
            />

            <StateIcon bind:alarm={sta.pressure}
            colorClear={colorOK} lblClear="BRAKE PRESSURE: OK"
            colorAlarm={colorFault} lblAlarm="BRAKE PRESSURE: FAULT"
            />
            
            <StateIcon bind:alarm={sta.top_limit}
            colorClear={colorOK} lblClear="TOP LIMIT: OK"
            colorAlarm={colorFault} lblAlarm="TOP LIMIT: FAULT"
            />

            <br>

            <StateIcon bind:alarm={sta.fist_limit}
            colorAlarm={colorOK} lblAlarm="FIST CONTACT: HAMMER LOCATED"
            colorClear={colorWarn} lblClear="FIST CONTACT: HAMMER FREE"
            />
            
            <StateIcon bind:alarm={sta.anvil_limit}
            colorAlarm={colorOK} lblAlarm="ANVIL CONTACT: HAMMER LOCATED"
            colorClear={colorWarn} lblClear="ANVIL CONTACT: HAMMER FREE"
            />
            

            
            
            <StateIcon bind:alarm={sta.brake_on}
            colorClear={colorWarn} lblClear="BRAKE: RELEASED"
            colorAlarm={colorOK} lblAlarm="BRAKE: ENGAGED"
            />
            
            <StateIcon bind:alarm={sta.magnet_on}
            colorClear={colorWarn} lblClear="MAGNET: RELEASED"
            colorAlarm={colorOK} lblAlarm="MAGNET: ENGAGED"
            />
            
            <StateIcon bind:alarm={sta.motor_on}
            colorClear={colorOK} lblClear="MOTOR: DISABLED"
            colorAlarm={colorWarn} lblAlarm="MOTOR: ENABLED"
            />
        
        </div>    
        
        <br>

        <div class="col">
            <h3>Configuration:</h3>
            <PanelControl lbl="Cycles" lbl_color={RGBA(BASE.SEAFOAM, 0.7)}>
                <div class="control-num">
                    <InputNum width="100%" enabled={true} height="var(--ctrl-h-s)" 
                        bind:num={cfg.cycles} is_integer={true}/>
                    <div>QTY</div>
                </div>
            </PanelControl>
            <PanelControl lbl="Height" lbl_color={RGBA(BASE.SEAFOAM, 0.7)}>
                <div class="control-num">
                    <InputNum width="100%" enabled={true} height="var(--ctrl-h-s)" 
                        bind:num={cfg.height}/>
                    <div>INCH</div>
                </div>
            </PanelControl>

        </div>
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        width: 100%; 
        height: 100%;
    }

    /* .btn-col {
        display: flex;
        flex-direction: column;
        max-width: 3em;
        padding: 0.5em;
        cursor: pointer;
        gap: 1em;
    } */

    .control-num {
        display: grid;
        grid-template-columns: 1fr 3em;
        align-items: center;
        min-height: 2.5em;
        gap:0.5em;
    }
</style>