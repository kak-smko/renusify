import "./style.scss";

function mounted(el, binding) {
  let data = binding.value;
  if (!data.loading) {
    el.classList.add("r-skeleton");
  }
}

function updated(el, binding) {
  if (binding.value === binding.oldValue) {
    return null;
  }

  unmounted(el);
  mounted(el, binding);
}

function unmounted(el) {
  el.classList.remove("r-skeleton");
}

export default {
  mounted,
  updated,
  unmounted,
};
