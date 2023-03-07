<script>
    import { page } from '$app/stores'
    let status = $page.status.toString()
</script>

<div class="flex h-screen w-full items-center justify-center bg-base-100">
    <div class="text-center">
        {#if status.startsWith('4')}
            <iconify-icon icon="ph:circle-wavy-warning-duotone" width="48" height="48" />
        {:else if status.startsWith('5')}
            <div class="stack items-center">
                <div class="grid  place-content-center">
                    <iconify-icon icon="ph:circle-wavy-duotone" width="48" height="48" />
                </div>
                <div class="grid  place-content-center">
                    <iconify-icon icon="ph:x-duotone" width="24" height="24" />
                </div>
            </div>
        {/if}
        <h1 class="text-2xl font-bold">{$page.status}</h1>
        <h1 class="font-bold">{$page.error?.message}</h1>
    </div>
</div>
