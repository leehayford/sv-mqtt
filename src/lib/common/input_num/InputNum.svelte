<script>

    import { debug } from '$lib/utils'

    let {
        num = $bindable(0.0),
        width = "7em",
        height = "var(--ctrl-h-s)", 
        dec = 5,
        enabled = false,
        is_integer = false
    } = $props()

    let place = ( is_integer ? 0 : 0.0 )

    const format = ( ) => {
        if ( num !== null && num !== undefined ) { 
            num = Number( is_integer 
                ? Math.floor( Number( num ) ) 
                : Number( Number( num ).toFixed( dec ) )
            )
        }  // debug( "num: ", num )
    }

</script>


<input style="width: {width}; text-align: center; height: {height};"
    step=0.000001
    type="number" 
    bind:value={num}
    placeholder={place}
    disabled={!enabled}
    onfocusout={format}
>

