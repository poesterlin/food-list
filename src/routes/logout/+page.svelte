<script lang="ts">
  import { signOut } from "@auth/sveltekit/client"
</script>

<form method="post" action="/api/auth/signout">
  <button type="submit">Sign out</button>
</form>