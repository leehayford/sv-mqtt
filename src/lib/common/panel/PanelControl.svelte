<script>
    export let lbl = ""
    export let lbl_color = "var(--gry07)"
    export let height = "var(--ctrl-h-l)"
</script>

<div class="control" style="height: {height};">
    <div class="panel-control-lbl" style="color: { lbl_color };">{ lbl }</div>
    <!-- <div class="vert-line" /> -->
    <slot />
</div>

<style>
    .panel-control-lbl {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        padding-right: 0.35em;
        max-width: var(--lbl-w); 
        min-width: var(--lbl-w);
    }
</style>