// Pure view layer: template strings + insertAdjacentHTML. No data fetching here.

/** Escape user-facing values before interpolating into markup. */
function esc(value) {
  return String(value).replace(
    /[&<>"']/g,
    (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]
  );
}

// Two visual variants share one product template:
//  - "grid"     → Bouquets catalogue card (square 296×296, centered text, AOS)
//  - "carousel" → Top-Selling card (405×320, left-aligned text)
function productCard(b, variant) {
  const isGrid = variant === "grid";
  const w = isGrid ? 296 : 405;
  const h = isGrid ? 296 : 320;
  const infoMod = isGrid ? " product__info--center" : "";

  // No data-aos here: AOS sets [data-aos] to opacity:0 and only animates on a scroll
  // event, which it misses for nodes injected after AOS.init — they'd stay invisible.
  return `
            <li class="product">
              <img
                class="product__image"
                src="${esc(b.image)}"
                srcset="${esc(b.image)} 1x, ${esc(b.image2x)} 2x"
                width="${w}"
                height="${h}"
                alt="${esc(b.alt)}"
              />
              <div class="product__info${infoMod}">
                <h3 class="product__name">${esc(b.name)}</h3>
                <p class="product__desc">${esc(b.description)}</p>
                <p class="product__price">$${esc(b.price)}</p>
              </div>
            </li>`;
}

/** Append product cards to a list container in one insertAdjacentHTML call. */
export function renderProducts(container, items, variant) {
  const html = items.map((item) => productCard(item, variant)).join("");
  container.insertAdjacentHTML("beforeend", html);
}

/** Replace a list's content with a single status message (loading / error / empty). */
export function setListState(container, message, isError = false) {
  container.innerHTML = `<li class="list-state${
    isError ? " list-state--error" : ""
  }">${esc(message)}</li>`;
}

/** Empty a list container. */
export function clearList(container) {
  container.innerHTML = "";
}
