<script>

    import mqtt from  'mqtt' // npm install mqtt
    import { MQTT_BROKER, MQTT_USER, MQTT_PW } from '$lib/app'

    import { Config } from '$lib/models/config.svelte'
    let cfg = new Config( )  

    import { ALERT_CODES, alert } from '$lib/utils'
    import { RGBA, BASE } from '$lib/common/colors'
    import InputNum from '$lib/common/input_num/InputNum.svelte'
    import PanelControl from '$lib/common/panel/PanelControl.svelte'
    import ButtonIcon from '$lib/common/button_icon/ButtonIcon.svelte'
    import img_accept from '../lib/assets/Accept.svg'

    const clientId =  'esp32_000000'
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
    const client = mqtt.connect( MQTT_BROKER, options )
    client.on('error', ( err ) => { console.log('Connection error: ', err );  client.end( )  } )
    client.on('reconnect', ( ) => { console.log( 'Reconnecting...' )  } )
    client.on( 'message', ( topic, msg, pkt ) => { 
        console.log( `${ topic } -> ${ msg.toString( ) }` ) 

        switch( topic ) {
            case 'lee/test/error': alert( ALERT_CODES.ERROR, msg ); break
            case 'lee/test/warning': alert( ALERT_CODES.WARNING, msg ); break
            case 'lee/test/success': alert( ALERT_CODES.SUCCESS, msg ); break
            case 'lee/test/sig/config': cfg.parse( msg ); break
        }
    
    } )

    client.on('connect', ( ) => {  
        console.log( `Connected: ${ clientId }` ); 
        client.subscribe( 'lee/test/#', { qos: 0 } )     
    } )

    const testPub1 = ( ) => { client.publish('lee/test/1', 'mqtt over ws test 1', { qos: 0, retain: false } ) }
    const testPub2 = ( ) => { client.publish('lee/test/2', 'mqtt over ws test 2', { qos: 0, retain: false } ) }
    const testPub3 = ( ) => { client.publish('lee/test/3', 'mqtt over ws test 3', { qos: 0, retain: false } ) }
    const testPub4 = ( ) => { client.publish('lee/test/4', 'mqtt over ws test 4', { qos: 0, retain: false } ) }
    const testPub5 = ( ) => { client.publish('lee/test/5', 'mqtt over ws test 5', { qos: 0, retain: false } ) }

    const testAlertE = () => { alert( ALERT_CODES.ERROR, "test error" ) }
    const testAlertW = () => { alert( ALERT_CODES.WARNING, "test warning" ) }
    const testAlertS = () => { alert( ALERT_CODES.SUCCESS, "test success" ) }


</script>

<h1>MQTT  WebSocket Test</h1>
<div class="container">
    <div class="row">
        <div class="btn-col">
            <ButtonIcon  on:click={ testPub1 } color={ RGBA( BASE.LIME, 0.7 ) } />
            <ButtonIcon  on:click={ testPub2 } color={ RGBA( BASE.GREEN, 0.7 ) } />
            <ButtonIcon  on:click={ testPub3 } color={ RGBA( BASE.BLUE, 0.7 ) } />
            <ButtonIcon  on:click={ testPub4 } color={ RGBA( BASE.PINK, 0.7 ) } />
            <ButtonIcon  on:click={ testPub5 } color={ RGBA( BASE.PURPLE, 0.7 ) } />
            <br>
            <ButtonIcon  on:click={ testAlertE } color={ RGBA( BASE.RED, 0.7 ) } />
            <ButtonIcon  on:click={ testAlertW } color={ RGBA( BASE.ORANGE, 0.7 ) } />
            <ButtonIcon  on:click={ testAlertS } color={ RGBA( BASE.SEAFOAM, 0.7 ) } />
        </div>
        <br>
        <div class="col">
            <PanelControl lbl="Cycles" lbl_color={ RGBA( BASE.SEAFOAM, 0.7 )  }>
                <div class="control-num">
                    <InputNum width="100%" enabled={ true } height="var(--ctrl-h-s)" 
                        bind:num={ cfg.cycles } is_integer={ true }/>
                    <div>QTY</div>
                </div>
            </PanelControl>
            <PanelControl lbl="Height" lbl_color={ RGBA( BASE.SEAFOAM, 0.7 )  }>
                <div class="control-num">
                    <InputNum width="100%" enabled={ true } height="var(--ctrl-h-s)" 
                        bind:num={ cfg.height }/>
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

    .btn-col {
        display: flex;
        flex-direction: column;
        max-width: 3em;
        padding: 0.5em;
        cursor: pointer;
        gap: 1em;
    }

    .control-num {
        display: grid;
        grid-template-columns: 1fr 3em;
        align-items: center;
        min-height: 2.5em;
        gap:0.5em;
    }
</style>