<script>
    
    import {debug} from '$lib/utils'
    import {RGBA, BASE} from '$lib/common/colors'
    let {
        title = $bindable("Title"),
        color = $bindable(BASE.AQUA),
        width = $bindable(0),
        height = "var(--ctrl-h-l)",
        unit = "Unit",
        max = 100,
        min = 0,
        num = $bindable(0),
        dec = 0
    } = $props()
    
    let nan = "-"
    $effect(() => { 
        if  ( num === null || num === nan) {
            num = nan
            width = 0
        } else {
            /*  PREVENT SHOWING -0.0 */
            if ( Math.round(Number(num).toFixed(dec)) === 0) num = 0 
            // if ( Math.round(num) === 0) num = 0 
            
            let val = num / (max - min) * 100
            width = (val < 0 ? 0 : val) 
        }
    })

    const bar_color = RGBA(color, 0.15)
    const bar_border_color = RGBA(color, 0.45)
    const title_color = RGBA(color, 0.65)

</script>

<div class="row container" style="height: {height};">

    <div class="row title">
        <div style="color: {title_color}">{title}</div>
    </div>

    <div class="vert-line"></div>

    <dvi class="row gauge-contatiner">

        <div class="row bar" style="
            width:{width}%; 
            background-color: {bar_color}; 
            border: solid 0.1em {bar_border_color};
            ">
        </div>

        <div style="width:{100 - width}%"></div>

        <div class="row value">
            <div class="num" style="color: {title_color};">
                {(num === nan ? nan : Number(num).toFixed(dec))}
            </div>
            
            <div class="unit">{unit}</div>
        </div>
        

    </dvi>

</div>

<style>

    .container {
        align-items: center;
    }

    .value {   
        align-items: center;
        width: auto;
        gap: 0.5em;
        padding-left: 1em;
    }

    .gauge-contatiner {
        justify-content: left;
        align-items: center;
        width: 100%;
        gap: 0;
    }

    .title {
        min-width: 5em;
        width:auto;
    }

    .bar {
        height: 0.9em;
    }

    .num {
        font-size: 1.125em;
        /* width: 6em; */
        height: 1.5em;
        text-align: right;
    }
    .unit {
        text-align: left;
        color: var(--grey_a);
        font-size: 0.9em;
        /* width: auto; */
    }

</style>