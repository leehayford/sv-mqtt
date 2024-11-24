<script>

    import { debug } from '$lib/utils'

    export let num = 0.0
    export let width = "7em"
    export let height = "var(--ctrl-h-s)"
    export let dec = 5
    export let enabled = false
    export let is_integer = false
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


<input style="width: { width }; text-align: center; height: { height };"
    step=0.000001
    type="number" 
    bind:value={ num }
    placeholder= { place }
    disabled={ !enabled }
    on:focusout={ format }
    on:change
>

