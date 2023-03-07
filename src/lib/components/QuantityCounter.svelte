<script lang="ts">
    import { numeric } from '$lib/validate/Numeric'

    export let quantity = 1
</script>

<div class="flex h-10 w-fit flex-row rounded-md">
    <button
        aria-label="decrement"
        class="h-full w-8 cursor-pointer rounded-l-md outline-none"
        disabled={quantity <= 1}
        on:click={() => quantity--}
    >
        <span class="m-auto text-lg font-thin">−</span>
    </button>
    <input
        type="text"
        aria-label="Quantity"
        inputmode="numeric"
        pattern="\d*"
        class="input-bordered input h-full w-16 text-center"
        name="custom-input-number"
        value={quantity}
        on:keypress={numeric}
    />
    <button
        aria-label="increment"
        class=" h-full w-8 cursor-pointer rounded-r-md"
        on:click={() => quantity++}
    >
        <span class="m-auto text-lg font-thin">+</span>
    </button>
</div>
