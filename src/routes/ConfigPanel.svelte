<script>
    
    import {getContext} from 'svelte'
    
    import {RGBA, BASE} from '$lib/common/colors'
    
    import KeyPadControl from '$lib/common/key_pad/KeyPadControl.svelte'
    import ButtonIcon from '$lib/common/button_icon/ButtonIcon.svelte'
    import img_reset from '$lib/assets/Reset.svg'
    import img_start from '$lib/assets/Start.svg'
    import img_pause from '$lib/assets/Pause.svg'

    let GZ = $state(getContext('gizmo'))

    let {
        awesColor = BASE.ORANGE
    } = $props()

    let prodMode = $state(true)
    let showRun = $state(false)
    $effect(() => {

        prodMode = !GZ.ops.awes_mode

        showRun = ( 
            (   GZ.cfg.validate(GZ.adm.mot_inch_max)   /* We have a valid configuration */
                &&  
                !GZ.ops.run             /* And have yet to start */
            )
            ||             
            (   GZ.ops.run          /* We have already started */
                &&  
                GZ.ops.pause        /* And have been paused */
            )
        )

    })

</script>

<div class="col">
    <div class="row sec-hdr">
        <h3>Configuration:</h3>
        
        <div class="row conf-btns">
            
            <ButtonIcon func={GZ.mqttCMDReset} img={img_reset} color={RGBA(BASE.RED, 0.7)} />
            
            {#if !GZ.ops.awes_mode}
            <ButtonIcon img={img_pause} color={RGBA(BASE.LIGHT, 0.3)} />
            {/if}

            {#if showRun}
            <ButtonIcon func={GZ.mqttCMDRun} img={img_start} color={RGBA(BASE.SEAFOAM, 0.7)} />
            {:else}
            <ButtonIcon img={img_start} color={RGBA(BASE.LIGHT, 0.3)} />
            {/if}
        </div>

    </div>

    <KeyPadControl bind:num={GZ.cfg.height} unit={"INCH"}
        title={"DROP HEIGHT"}
        enabled={true}
        color={(prodMode ? BASE.AMBER : awesColor )}
        on:validate={GZ.mqttCMDConfig}
    />

    {#if !GZ.ops.awes_mode}
    <KeyPadControl bind:num={GZ.cfg.cycles} isInteger={true} unit={"QTY"}
        title={"# OF DROPS"}
        bind:enabled={prodMode}
        on:validate={GZ.mqttCMDConfig}
    />
    {:else}
    <div class="awes-drops" style="color:{RGBA(awesColor, 0.4)}">
            AWES mode is a single drop opration.
    </div>
    {/if}

</div>

<style>

.awes-drops {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 1.5em;
    /* min-height: 1.7em;
    max-height: 1.7em; */
    height: 1.7em;
}

</style>