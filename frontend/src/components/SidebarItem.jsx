import React from "react";

/**
 * @typedef {Object} SidebarItemProps
 * @property {any} icon
 * @property {string} label
 * @property {boolean} [active]
 * @property {() => void} [onClick]
 */

/** @param {SidebarItemProps} props */
function SidebarItem({
  icon: Icon,
  label,
  active = false,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={
        "w-full flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition " +
        (active
          ? "bg-blue-50 text-blue-700"
          : "text-slate-600 hover:bg-slate-100")
      }
    >
      <Icon className={"h-4 w-4 " + (active ? "text-blue-700" : "")} />
      <span className="truncate">{label}</span>
    </button>
  );
}

export default SidebarItem;
