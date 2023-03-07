<script lang="ts">
    import type { User } from '$lib/types'

    export let user: User
</script>

<tr>
    <td>
        <a href="tel:+91{user.phone}" class="text-sm">{user.name}</a>
    </td>
    <td>
        <span class="text-sm">{user.address}</span>
    </td>
</tr>
