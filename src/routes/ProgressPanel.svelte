<script>

    import {getContext} from 'svelte'
    
    import {RGBA, BASE} from '$lib/common/colors'
    
    import BarGaugeH from '$lib/common/bar_graph/BarGaugeH.svelte'
    import PanelControl from '$lib/common/panel/PanelControl.svelte'
    import ButtonIcon from '$lib/common/button_icon/ButtonIcon.svelte'
    import img_reset from '$lib/assets/Reset.svg'
    import img_pause from '$lib/assets/Pause.svg'
    import img_start from '$lib/assets/Start.svg'

    let GZ = $state(getContext('gizmo'))
    
    let showPause = $state(false)    
    $effect(() => {
        showPause = (    
            GZ.ops.run          /* We have already started */
            &&  
            !GZ.ops.pause       /* And have not been paused */
        )
    })

</script>

<div class="col">
    <div class="row sec-hdr">
        <h3>Progress: </h3>
        <div class="row conf-btns">
            
            <ButtonIcon func={GZ.mqttCMDReset} img={img_reset} color={RGBA(BASE.RED, 0.7)} />

            {#if showPause}
            <ButtonIcon func={GZ.mqttCMDPause} img={img_pause} color={RGBA(BASE.AMBER, 0.7)} />
            <ButtonIcon img={img_start} color={RGBA(BASE.LIGHT, 0.3)} />
            {:else}
            <ButtonIcon img={img_pause} color={RGBA(BASE.LIGHT, 0.3)} />
            <ButtonIcon func={GZ.mqttCMDRun} img={img_start} color={RGBA(BASE.SEAFOAM, 0.7)} />
            {/if}

        </div>
    </div>
    
    
    <BarGaugeH  
        color={BASE.SEAFOAM}
        bind:num={GZ.sta.current_height}
        max={(GZ.cfg.height === 0 ? GZ.adm.mot_inch_max : GZ.cfg.height)}
        dec=2
        title="POSITION"
        unit="Inch"
    />
    
    <BarGaugeH  
        color={BASE.SEAFOAM}
        bind:num={GZ.percentComplete}
        max={GZ.cfg.cycles}
        title="COMPLETE"
        unit={`/\t${GZ.cfg.cycles}`}
    />

</div>

<style>
    .sec-hdr {
    align-items: flex-end;
    justify-content: space-between;
    border-bottom: solid 0.1em var(--gry02);
    padding-bottom: 0.5em;
    }
    .sec-hdr h3 {
        color: var(--gry06);
    }

    .conf-btns {
        justify-content: flex-end;
        /* padding-right: 1.5em; */
    }
</style>