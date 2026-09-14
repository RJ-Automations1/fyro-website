/** Opens the site-wide chat widget, optionally sending a first message for the visitor. */
export function openChat(message?: string) {
  window.dispatchEvent(new CustomEvent("fyro:open-chat", { detail: { message } }));
}
