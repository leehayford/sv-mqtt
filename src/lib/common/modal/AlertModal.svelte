<script module> const modalList = []; </script>

<script>

    import {ALERT_HEAD, ALERT_MSG, ALERT_CODE, ALERT_CODES, openModals, debug} from '../../utils'
    import {RGBA, BASE} from "../colors"

    import ButtonIcon from '../button_icon/ButtonIcon.svelte'
    import img_accept from '../../assets/Accept.svg'

    const store = openModals(false)

    let isOpen = store.isOpen
    export const open = store.open
    export const close = store.close

    const keyDown = (e) => {
        e.stopPropagation()
        clearAlert()
    }

    const transitioned = (e) => {
        const node = e.target
        node.focus()
    }

    const modalAction = (node) => {
        const returnFuncs = []
        if (document.body.style.overflow !== 'hidden') {
            const original = document.body.style.overflow
            document.body.style.overflow = 'hidden'
            returnFuncs.push(() => {document.body.style.overflow = original})
        }
        node.addEventListener('keydown', keyDown)
        node.addEventListener('transitioned', transitioned)
        
        modalList.push(node)
        returnFuncs.push(() =>{
            node.removeEventListener('keydown', keyDown)
            node.removeEventListener('transitioned', transitioned)
            modalList.pop( )
        })

        return {
            destroy: () => returnFuncs.forEach((fn) => fn()),
        }
    }

    let alertIntervalID = null
    const showAlert = (alertTimeout) => {
        open()
        alertIntervalID = setInterval(clearAlert, alertTimeout)
    }

    const clearAlert = () => {
        if (alertIntervalID !== null) {
            clearInterval(alertIntervalID)
            alertIntervalID = null
        }

        ALERT_HEAD.set("")
        ALERT_MSG.set("")
        ALERT_CODE.set(0)
        close()
    }

    let title = $state("")
    let color = $state(BASE.BLUE)
    let colorHeadText =  $derived(RGBA(BASE.LIGHT, 0.6))
    let colorMsgText =  RGBA(BASE.LIGHT, 0.8)
    let colorTitleText = RGBA(BASE.LIGHT, 0.6)
    let colorBorder = $derived(RGBA(color, 0.3))
    let colorBackround = $derived(RGBA(color, 0.23))
    let colorHdrBackround = $derived(RGBA(color, 0.23))
    $effect(() => {
        if ($ALERT_MSG !== "") {
            switch($ALERT_CODE) {
                case ALERT_CODES.SUCCESS:
                    title = "SUCCESS"
                    color = BASE.SEAFOAM
                    showAlert(10000)
                    break
                case ALERT_CODES.WARNING:
                    title = "WARNING"
                    color = BASE.AMBER
                    showAlert(15000)
                    break
                case ALERT_CODES.ERROR:
                    title = "ERROR"
                    color = BASE.RED
                    open()
                    break
            }
        }
    } )

    </script>

    {#if $isOpen}

    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <div class="modal" use:modalAction tabindex='-1'>
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <div class="backdrop"></div>

        <div class="col-panel left container" style="
            background-color:rgb(0, 0, 23, 1);
            border-color:{colorBorder};">
            
            <div class="col-panel-header left title-bar" style="
                background-color:{colorHdrBackround};
                border-color:{colorBorder};
                border-bottom: solid 0.1em var(--drk)">
                <h3 class="title" style="
                    color:{colorTitleText};">
                    {title}
                </h3>
                <ButtonIcon img={img_accept} func={clearAlert} color={RGBA(color, 0.7)} />
            </div>
            
            <div class="col-panel-content content" style="
                background-color:{colorBackround};
                color:{colorMsgText};">

                <div class="headline">
                    <p style="
                        background-color:{colorBackround};
                        color:{colorHeadText};">
                        { $ALERT_HEAD.toUpperCase() }
                    </p>
                </div>

                <div class="row msg">
                    <p>{ $ALERT_MSG }</p>
                </div>
                
            </div>
            
            <!-- <div class="row btns"style="
                color:{colorTitleText};">
                <ButtonIcon img={img_accept} func={clearAlert} color={RGBA(color, 0.7)} />
            </div> -->

        </div>

    </div>
    { /if }

    <style>
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            padding: 1em;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            opacity: 1;
            z-index: 3;
        }
        div.backdrop {
            background-color: var(--drk);
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 4;
            opacity: 0.85;
        }
        .container {
            align-items: center;
            justify-content: center;
            height: auto;
            min-width: 90%;
            max-width: 90%;
            opacity: 1;
            gap: 1em;
            z-index: 11;
            padding-bottom: 1em;
        }
        .title-bar { 
            grid-template-columns: 1fr 2.6em;
        }
        .title {
            font-size: 1.7em;
            font-weight: 300; 
            padding: 0;
        }
        .content {
            border-radius: 0.25em;
            padding: 1em;
            width: 93%;
        }
        
        .headline p { 
            justify-content: center;
            text-align: center;
            border-radius: 0.25em;
            font-weight: 400;
            font-size: 1.6em;
            padding: 0.25em;
        }

        .msg { 
            justify-content: center;
            text-align: center;
            border-radius: 0.25em;
            font-size: 1.2em;
            padding: 0.5em;
        }
        .msg p {
            font-size: 1.25em;
        }

    </style>