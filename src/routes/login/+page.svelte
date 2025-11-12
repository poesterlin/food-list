<script lang="ts">
    export let data
</script>

<div class="login-container">
    <h1>Login</h1>
    <a href={data.authUrl} class="btn">Sign in with Tailscale</a>
</div>

<style>
    .btn {
        display: inline-block;
        padding: 0.5rem 1rem;
        background: #0051ba;
        color: white;
        border-radius: 4px;
        text-decoration: none;
    }
</style>