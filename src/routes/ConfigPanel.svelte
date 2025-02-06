<script>
    
    import {getContext} from 'svelte'
    
    import {RGBA, BASE} from '$lib/common/colors'
    
    import KeyPadControl from '$lib/common/key_pad/KeyPadControl.svelte'
    import ButtonIcon from '$lib/common/button_icon/ButtonIcon.svelte'
    import img_reset from '$lib/assets/Reset.svg'
    import img_start from '$lib/assets/Start.svg'
    import img_pause from '$lib/assets/Pause.svg'

    let GZ = $state(getContext('gizmo'))

    let showRun = $state(false)
    $effect(() => {

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
            <ButtonIcon img={img_pause} color={RGBA(BASE.LIGHT, 0.3)} />
            {#if showRun}
            <ButtonIcon func={GZ.mqttCMDRun} img={img_start} color={RGBA(BASE.SEAFOAM, 0.7)} />
            {:else}
            <ButtonIcon img={img_start} color={RGBA(BASE.LIGHT, 0.3)} />
            {/if}
        </div>

    </div>

    <KeyPadControl bind:num={GZ.cfg.height} unit={"Inch"}
        title={"Drop Height"}
        enabled={true}
        on:validate={GZ.mqttCMDConfig}
    />

    <KeyPadControl bind:num={GZ.cfg.cycles} isInteger={true} unit={"Qty"}
        title={"# of Drops"}
        enabled={true}
        on:validate={GZ.mqttCMDConfig}
    />

</div>

<style>


</style>