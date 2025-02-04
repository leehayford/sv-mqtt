<script>
    
    import {getContext} from 'svelte'

    import {RGBA, BASE} from '$lib/common/colors'

    import KeyPadControl from '$lib/common/key_pad/KeyPadControl.svelte'

    import PanelControl from '$lib/common/panel/PanelControl.svelte'
    import ButtonIcon from '$lib/common/button_icon/ButtonIcon.svelte'
    import img_led from '$lib/assets/LED.svg'
    import img_cancel from '$lib/assets/Cancel.svg'
    import img_up from '$lib/assets/MoveUp.svg'
    import img_down from '$lib/assets/MoveDown.svg'
    import img_stop from '$lib/assets/Stop.svg'

    let GZ = $state(getContext('gizmo'))

    let brake = $derived(GZ.sta.brake_on)
    let magnet = $derived(GZ.sta.magnet_on)


</script>


<div class="col container">

    <div class="diag-control">
        <p class="lbl">Brake</p>
        <br>
        <ButtonIcon img={img_led} 
            color={(brake ? RGBA(BASE.SEAFOAM, 0.7) : RGBA(BASE.LIGHT, 0.0))} 
            func={(brake ? GZ.mqttDIAGBrakeOff : GZ.mqttDIAGBrakeOn)} />
        <br>
        <p class="state">{(brake ? "ON" : "OFF")}</p>
    </div>

    <div class="diag-control">
        <p class="lbl">Magnet</p>
        <br>
        <ButtonIcon img={img_led} 
            color={(magnet ? RGBA(BASE.SEAFOAM, 0.7) : RGBA(BASE.LIGHT, 0.0))} 
            func={(magnet ? GZ.mqttDIAGMagnetOff : GZ.mqttDIAGMagnetOn)} />
        <br>
        <p class="state">{(magnet ? "ON" : "OFF")}</p>
    </div>

    <KeyPadControl bind:num={GZ.sta.current_height} unit={"Inch"}
        title={"Current position"}
        note={"Distance to move (up or down) in diagnostic mode"}
        enabled={false}
        on:validate={GZ.mqttCMDAdmin}
    />

    <KeyPadControl bind:num={GZ.adm.diag_inch} unit={"Inch"}
        title={"Distance to move"}
        note={"Distance to move (up or down) in diagnostic mode"}
        enabled={true}
        on:validate={GZ.mqttCMDAdmin}
    />
    <div class="row motor-btns">
        <ButtonIcon func={GZ.mqttDIAGMoveUp} img={img_up} color={RGBA(BASE.AMBER, 0.6)} />
        <ButtonIcon func={GZ.mqttDIAGMoveDown} img={img_down} color={RGBA(BASE.PINK, 0.6)} />
        <ButtonIcon func={GZ.mqttDIAGMotorStop} img={img_stop} color={RGBA(BASE.RED, 0.7)} />
    </div>
</div>


<style>

    .diag-control {
        display: grid;
        grid-template-columns: 1fr 1em 3em 1em 1fr;
        align-items: center;
        min-height: 3em;
        max-height: 3em;
        width:100%;
        padding:0 0.5em;
        gap:0.75em;
    }

    .lbl {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        color: var(--ylw07);
        font-size: 1.375em; 
        font-weight: 300;
    }
    .state {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        color: var(--ylw07);
        font-size: 1.375em; 
        font-weight: 300;
    }
    .motor-btns {
        justify-content: flex-end;
        padding-right: 7em;
    }

</style>