<script>
    
    import {getContext} from 'svelte'

    import {RGBA, BASE} from '$lib/common/colors'

    import PanelControl from '$lib/common/panel/PanelControl.svelte'
    import ButtonIcon from '$lib/common/button_icon/ButtonIcon.svelte'
    import img_led from '$lib/assets/LED.svg'
    import img_cancel from '$lib/assets/Cancel.svg'

    let GZ = $state(getContext('gizmo'))

    let brake = $derived(GZ.sta.brake_on)
    let magnet = $derived(GZ.sta.magnet_on)


</script>


<div class="col container">

    <div class="row sec-hdr">
        <h3>Diagnostics: </h3>
        <!-- <ButtonIcon func={GZ.mqttCMDReport} img={img_question} color={RGBA(BASE.MAGENTA, 0.7)} /> -->
        <ButtonIcon func={GZ.mqttCMDDisableDiagMdoe} img={img_cancel} color={RGBA(BASE.RED, 0.7)} />
    </div>

    <PanelControl>
        <div class="diag-control">
            <p>BRAKE</p>
            {#if brake}
            <ButtonIcon func={GZ.mqttDIAGBrakeOff} img={img_led} color={RGBA(BASE.SEAFOAM, 0.7)} />
            <p>ON</p>
            {:else}
            <ButtonIcon func={GZ.mqttDIAGBrakeOn} img={img_led} color={RGBA(BASE.SEAFOAM, 0.2)} />
            <p>OFF</p>
            {/if}
        </div>
    </PanelControl>

    <PanelControl>
        <div class="diag-control">
            <p>MAGNET</p>
            {#if magnet}
            <ButtonIcon func={GZ.mqttDIAGMagnetOff} img={img_led} color={RGBA(BASE.SEAFOAM, 0.7)} />
            <p>ON</p>
            {:else}
            <ButtonIcon func={GZ.mqttDIAGMagnetOn} img={img_led} color={RGBA(BASE.SEAFOAM, 0.2)} />
            <p>OFF</p>
            {/if}
        </div>
    </PanelControl>

    <br>

    <PanelControl>
        <div class="motor-control">
            <p>POSITION</p>
            <h4>{Number(GZ.sta.current_height).toFixed(2)}</h4>
            <ButtonIcon func={GZ.mqttDIAGMoveUp} img={img_led} color={RGBA(BASE.YELLOW, 0.6)} />
            <p>UP</p>
            <p>DOWN</p>
            <ButtonIcon func={GZ.mqttDIAGMoveDown} img={img_led} color={RGBA(BASE.PINK, 0.6)} />
        </div>
    </PanelControl>

    <PanelControl>
        <div class="diag-control">
            <p>MOTOR</p>
            <ButtonIcon func={GZ.mqttDIAGMotorStop} img={img_led} color={RGBA(BASE.RED, 0.7)} />
            <p>STOP</p>
        </div>
    </PanelControl>
</div>


<style>

    /* .container {
        width: 100%; 
        height: 100%;
        gap: 0.75em;
    } */

    .sec-hdr {
        align-items: flex-end;
        justify-content: space-between;
        border-bottom: solid 0.1em var(--gry02);
    }
    .sec-hdr h3 {
        color: var(--gry06);
    }

    .diag-control {
        display: grid;
        grid-template-columns: 5em 3em 1fr;
        align-items: center;
        min-height: 3em;
        max-height: 3em;
        width:100%;
        padding:0 0.5em;
        gap:0.75em;
    }

    .motor-control {
        display: grid;
        grid-template-columns: 5em 5em 3em 3em 3em 3em 3em;
        align-items: center;
        min-height: 3em;
        max-height: 3em;
        width:100%;
        padding:0 0.5em;
        gap:0.75em;
    }

</style>