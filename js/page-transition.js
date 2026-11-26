(() => {
  const prefetched = new Set();
  let navigating = false;

  window.addEventListener("pagereveal", (event) => {
    if (event.viewTransition) {
      document.documentElement.classList.add("transisi-lintas-halaman");
    }
  });

  window.navigasiDenganTransisi = (destination) => {
    const url = new URL(destination, window.location.href);

    if (
      url.origin === window.location.origin &&
      url.pathname === window.location.pathname &&
      url.search === window.location.search
    ) {
      if (url.hash !== window.location.hash) {
        window.location.assign(url.href);
      }
      return;
    }

    if (navigating) {
      return;
    }

    navigating = true;
    window.location.assign(url.href);
  };

  const prefetchTautan = (event) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }

    const link = target.closest("a[href]");
    if (
      !(link instanceof HTMLAnchorElement) ||
      link.hasAttribute("download") ||
      (link.target && link.target !== "_self") ||
      link.relList.contains("external")
    ) {
      return;
    }

    const destination = new URL(link.href, window.location.href);
    if (
      destination.origin !== window.location.origin ||
      (destination.pathname === window.location.pathname &&
        destination.search === window.location.search) ||
      prefetched.has(destination.href)
    ) {
      return;
    }

    const prefetch = document.createElement("link");
    prefetch.rel = "prefetch";
    prefetch.href = destination.href;
    document.head.append(prefetch);
    prefetched.add(destination.href);
  };

  document.addEventListener("pointerover", prefetchTautan);
  document.addEventListener("focusin", prefetchTautan);

  document.addEventListener("click", (event) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }

    const link = target.closest("a[href]");
    if (
      !(link instanceof HTMLAnchorElement) ||
      link.hasAttribute("download") ||
      (link.target && link.target !== "_self") ||
      link.relList.contains("external")
    ) {
      return;
    }

    const destination = new URL(link.href, window.location.href);
    if (
      destination.origin !== window.location.origin ||
      (destination.pathname === window.location.pathname &&
        destination.search === window.location.search) ||
      navigating
    ) {
      return;
    }

    event.preventDefault();
    window.navigasiDenganTransisi(destination.href);
  });

  document.addEventListener("submit", (event) => {
    if (event.defaultPrevented || !(event.target instanceof HTMLFormElement)) {
      return;
    }

    const form = event.target;
    const destination = new URL(form.action, window.location.href);
    if (
      form.method.toLowerCase() !== "get" ||
      (form.target && form.target !== "_self") ||
      destination.origin !== window.location.origin ||
      (destination.pathname === window.location.pathname &&
        destination.search === window.location.search)
    ) {
      return;
    }

    const parameters = new URLSearchParams(destination.search);
    new FormData(form).forEach((value, name) => {
      parameters.append(name, value instanceof File ? value.name : value);
    });

    const submitter = event.submitter;
    if (submitter instanceof HTMLButtonElement || submitter instanceof HTMLInputElement) {
      if (submitter.name && !submitter.disabled) {
        parameters.append(submitter.name, submitter.value);
      }
    }

    destination.search = parameters.toString();
    event.preventDefault();
    window.navigasiDenganTransisi(destination.href);
  });
})();
