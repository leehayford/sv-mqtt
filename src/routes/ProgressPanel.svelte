<script>

    import {getContext} from 'svelte'
    
    import {RGBA, BASE} from '$lib/common/colors'
    
    import BarGaugeH from '$lib/common/bar_graph/BarGaugeH.svelte'
    import PanelControl from '$lib/common/panel/PanelControl.svelte'
    import ButtonIcon from '$lib/common/button_icon/ButtonIcon.svelte'
    import img_stop from '$lib/assets/Stop.svg'
    import img_start from '$lib/assets/Start.svg'
    import img_reset from '$lib/assets/Reset.svg'

    let GZ = $state(getContext('gizmo'))
</script>

<div class="col">
    <div class="row sec-hdr">
        <h3>Progress: </h3>
        <div class="row conf-btns">
            
            <ButtonIcon func={GZ.mqttCMDCancel} img={img_stop} color={RGBA(BASE.RED, 0.7)} />
            {#if GZ.ops.want_aid}
            <ButtonIcon func={GZ.mqttCMDConfig} img={img_start} color={RGBA(BASE.SEAFOAM, 0.7)} />
            {/if}

        </div>
    </div>
    <PanelControl>
    <BarGaugeH  
        color={BASE.SEAFOAM}
        bind:num={GZ.percentComplete}
        max={GZ.cfg.cycles}
        title="Complete"
        unit={`/${GZ.cfg.cycles}`}
    />
    </PanelControl>
    
    <PanelControl>
    <BarGaugeH  
        color={BASE.SEAFOAM}
        bind:num={GZ.position}
        max={(GZ.cfg.height === 0 ? 48 : GZ.cfg.height)}
        dec=2
        title="Position"
        unit="INCH"
    />
    </PanelControl>
</div>

<style>
    .sec-hdr {
    align-items: flex-end;
    justify-content: space-between;
    border-bottom: solid 0.1em var(--gry02);
    padding-bottom: 0.25em;
}
.sec-hdr h3 {
    color: var(--gry06);
}

.conf-btns {
    justify-content: flex-end;
    /* padding-right: 1.5em; */
}
</style>