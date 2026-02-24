<script>
  let { message = '' } = $props();
</script>

<div aria-live="assertive" aria-atomic="true" class="sr-only" role="status">
  {message}
</div>
