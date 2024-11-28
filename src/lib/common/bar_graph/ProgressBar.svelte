<script>

    import {RGBA, BASE} from '$lib/common/colors'
    import BarGaugeH from './BarGaugeH.svelte'

    let {
        progress = $bindable(23),
        color = $bindable(BASE.AQUA),
        progress_lbl = "Prog Not Set"
    } = $props()

</script>

<div class="col-panel-header" style="padding: 0 var(--brd-rad);">
    <BarGaugeH 
        bind:color 
        bind:title={progress_lbl} 
        bind:num={progress} 
        max={100} 
        unit="%" 
    />
</div>