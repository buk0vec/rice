<script lang="ts">
	import type { ActionData } from './$types';
	// TODO: Display errors when they happen
</script>

<div class="flex flex-col items-center">
	<h1 class="font-semibold text-7xl text-center p-4">Sign in</h1>
	<form method="POST" action="?/signin">
		<label for="email" class="mb-4"
			>Email
			<input type="email" name="email" placeholder="grain@rice.com" />
		</label>
		<label for="password" class="mb-4"
			>Password
			<input type="password" name="password" placeholder="••••••" />
		</label>
		<div class="flex flex-row gap-4 justify-center">
			<a class="btn btn-filled-surface w-min" href="/">Back</a>
			<button class="btn btn-filled-primary w-min">Login</button>
		</div>
	</form>
	<div class="p-2">or</div>
	<a class="btn btn-filled-primary w-min" href="/signup">Create account</a>
</div>
