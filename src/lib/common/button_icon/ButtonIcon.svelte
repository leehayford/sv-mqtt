<script>
    import { createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher( )

    import { BASE, RGBA } from '../colors'

    import defaultImage from '../../assets/Tilde.svg'
    export let img = defaultImage
    export let color = RGBA( BASE.ORANGE, 0.7 ) 
    export let enabled = true
    export let show = true
    export let size ='2em' 
    $: bgColor = ( show ? color : 'transparent' )
    $: cursor = ( show && enabled ? "pointer" : "default" )

    export let hint = null

    const isHovered = ( ) => dispatch( "show_hint" )
    const notHovered = ( ) => dispatch( "hide_hint" )

</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div 
    on:click on:keydown  
    on:mouseover={ isHovered } 
    on:focus={ isHovered }  
    on:mouseleave={ notHovered } 
    on:focusout={ notHovered } 

    class="icon"  

    style="
        background-image: url( { img } ); 
        background-color: { bgColor } ; cursor: { cursor };
        max-width:  { size };
        min-width:  { size };
        max-height:  { size };
        min-height:  { size };
        "
    >
    { #if hint !== null }
    <div class="hint" style="
    color: { bgColor };
    ">{ hint }</div>
    { /if }
</div>

<style>

    .icon {
        background-size: cover;
        border-radius: 50%;
        opacity: 0.8;
    }
    .icon:hover {
        opacity: 1;
    }

</style>