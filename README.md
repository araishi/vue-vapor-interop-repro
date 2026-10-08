# vapor > vdom > vapor hydration mismatch

Vue 3.6.0-rc.10. `App` (vapor) renders `Outlet` (vdom), which renders `Page` (vapor), followed by `Child` (vapor):

```vue
<!-- App.vue (vapor) -->
<div>
  <Outlet />
  <Child />
</div>
```

Open it on StackBlitz: https://stackblitz.com/github/araishi/vue-vapor-interop-repro

Or locally: `npm install && npm run dev`, then open the page and the console.

- Expected: one `child 0` button, no hydration warnings.
- Actual: `Hydration node mismatch` (an empty text node where `<button>` is expected), and the button is rendered twice.
