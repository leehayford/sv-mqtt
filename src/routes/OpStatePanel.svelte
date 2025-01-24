<script>

    import {getContext} from 'svelte'

    import {RGBA, BASE} from '$lib/common/colors'

    import PanelControl from '$lib/common/panel/PanelControl.svelte'
    import Indicator from '$lib/common/indicator/Indicator.svelte'
    import ButtonIcon from '$lib/common/button_icon/ButtonIcon.svelte'
    import img_led from '$lib/assets/LED.svg'

    let GZ = $state(getContext('gizmo'))

    let colorOK = RGBA(BASE.SEAFOAM, 0.8)
    let colorWarn = RGBA(BASE.ORANGE, 0.8)
    let colorFault = RGBA(BASE.RED, 0.8)
    let colorNone = RGBA(BASE.LIGHT, 0.03)

</script>

<div class="col container">

    <div class="row sec-hdr">
        <h3>Operation: </h3>
    </div>

    <Indicator bind:alarm={GZ.ops.want_estop_release} type="ALARM:" name="E-STOP"
    colorAlarm={colorFault} lblAlarm="EMERGENCY STOP"
    />
    
    <Indicator bind:alarm={GZ.ops.want_door_close} type="ALARM:" name="DOOR"
    colorAlarm={colorFault} 
    />
    
    <Indicator bind:alarm={GZ.ops.want_aid} type="ALARM:" name="ERROR"
    colorAlarm={colorFault} 
    />
    
    <Indicator bind:alarm={GZ.ops.want_config} type="PROMPT:" name="CONFIG"
    colorAlarm={colorWarn} 
    />

    <Indicator bind:alarm={GZ.ops.seek_hammer} type="OPERATION:" name="HAMMER"
    colorAlarm={colorOK} 
    />
    
    <Indicator bind:alarm={GZ.ops.seek_anvil} type="OPERATION:" name="ANVIL"
    colorAlarm={colorOK} 
    />
    
    <Indicator bind:alarm={GZ.ops.seek_home} type="OPERATION:" name="HOME"
    colorAlarm={colorOK} 
    />

    <Indicator bind:alarm={GZ.ops.raise_hammer} type="OPERATION:" name="RAISE"
    colorAlarm={colorOK} 
    />

    <Indicator bind:alarm={GZ.ops.drop_hammer} type="OPERATION:" name="DROP"
    colorAlarm={colorOK} 
    />

    <Indicator bind:alarm={GZ.ops.want_strike} type="OPERATION:" name="STRIKE"
    colorAlarm={colorOK} 
    />

</div>

<style>
    
    .container {
        gap:0.5em;
    }

    .sec-hdr {
        align-items: flex-end;
        justify-content: space-between;
        border-bottom: solid 0.1em var(--gry02);
        padding-bottom: 0.25em;
    }
    .sec-hdr h3 {
        color: var(--gry06);
    }

</style>