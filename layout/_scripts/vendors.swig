{# Reset `window.Promise` when it was not a function. #}
<script>
  if (Object.prototype.toString.call(window.Promise) !== '[object Function]') {
    window.Promise = null;
  }
</script>
<script src="{{ theme.jquery }}"></script>
