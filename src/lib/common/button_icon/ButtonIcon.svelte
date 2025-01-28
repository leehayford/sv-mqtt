<script>
    import {createEventDispatcher} from 'svelte'
    const dispatch = createEventDispatcher()

    import {BASE, RGBA} from '../colors'

    import defaultImage from '../../assets/Tilde.svg'
    let { 
        img = defaultImage,
        color = $bindable(RGBA(BASE.ORANGE, 0.7)),
        enabled = true,
        show = true,
        size ='2.9em',
        hint = null,
        func = $bindable()
    } = $props()
    
    let bgColor = $state(show ? color : 'transparent')
    let cursor = $state(show && enabled ? "pointer" : "default")
    const isHovered = () => dispatch("show_hint")
    const notHovered = () => dispatch("hide_hint")

/*
*/
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div 
    onclick={func} onkeydown={func}  
    onmouseover={isHovered} 
    onfocus={isHovered}  
    onmouseleave={notHovered} 
    onfocusout={notHovered} 

    class="icon"  
    style="
        background-image: url({img});
        background-color: {bgColor};  
        cursor: {cursor};
        max-width: {size};
        min-width: {size};
        width: {size};
        max-height: {size};
        min-height: {size};
        height: {size};
        "
        >

    {#if hint !== null}
    <div class="hint" style="color: {bgColor};">{hint}</div>
    {/if}
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