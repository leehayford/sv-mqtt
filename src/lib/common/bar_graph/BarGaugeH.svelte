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
        if( ( num === null || num === nan) 
        ||  ( max === 0 && num === 0)
        ) {
            num = nan
            width = 0
        } else {
            /*  PREVENT SHOWING -0.0 */
            if ( Math.round(Number(num).toFixed(dec)) === 0) num = 0 
            // if ( Math.round(num) === 0) num = 0 
            
            let val = num / (max - min) * 100
            width = (val <= 0 ? 0 : val) 
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

    <dvi class="row gauge-contatiner">

        <div class="row bar" style="
            width:{width}%; 
            background-color: {bar_color}; 
            border: solid 0.1em {bar_border_color};
            ">
        </div>

        <div style="width:{100 - width}%"></div>

        <div class="value">
            <div class="num" style="color: {title_color};">
                {(num === nan ? nan : Number(num).toFixed(dec))}
            </div>
            
            <div class="unit">{unit}</div>
        </div>
        

    </dvi>

</div>

<style>

    .container {
        display: grid;
        grid-template-columns: 5em 1fr;
        align-items: center;
    }

    .value {  
        display: grid; 
        grid-template-columns: 3em 3em;
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
        justify-content: flex-end;
        align-items: center;
    }

    .bar {
        height: 1.5em;
    }

    .num {
        font-size: 1.125em;
        text-align: right;
    }
    .unit {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        text-align: left;
        color: var(--grey_a);
        font-size: 1.2em;
        width: 2.5em;
    }

</style>