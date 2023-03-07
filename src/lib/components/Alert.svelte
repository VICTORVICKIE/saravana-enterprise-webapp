<script lang="ts">
    import { AlertStates } from '$lib/constants'
    import { alert } from '$lib/stores/observer'
    import { onMount } from 'svelte'
    import { quartInOut } from 'svelte/easing'
    import { scale } from 'svelte/transition'

    onMount(async () => {
        setTimeout(async () => {
            $alert = {
                status: '',
                message: '',
                duration: 0,
                show: false,
                action: false
            }
        }, $alert.duration)
    })

    const alert_state = AlertStates.get($alert.status)
</script>

<div
    transition:scale={{ easing: quartInOut }}
    class="alert absolute left-[calc(50%_-_10rem)] top-28 z-50 w-80 border border-neutral shadow-lg shadow-neutral"
>
    <div>
        <iconify-icon icon={alert_state?.icon} class={alert_state?.color} width="24" height="24" />

        <div>
            <div class="text-sm">{$alert.message}</div>
        </div>
    </div>
    {#if $alert.action}
        <div class="flex-none">
            <button on:click={$alert.options?.fxn} class="btn-sm btn">{$alert.options?.text}</button
            >
        </div>
    {/if}
</div>
