<script lang="ts">
    import type { Shop } from '$lib/types'

    export let shop: Shop
</script>

<tr>
    <td>
        <span class="text-sm">{shop.name} </span>
    </td>
    <td>
        <span class="text-sm">{shop.address}</span>
    </td>
    <td>
        <a href="tel:+91{shop.phone}" class="text-sm">
            <iconify-icon icon="ph:phone-call-duotone" width="24" height="24" />
        </a>
    </td>
</tr>
