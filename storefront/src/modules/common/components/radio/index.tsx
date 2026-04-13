const Radio = ({
  checked,
  "data-testid": dataTestId,
}: {
  checked: boolean
  "data-testid"?: string
}) => {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      data-state={checked ? "checked" : "unchecked"}
      className="group relative flex h-5 w-5 items-center justify-center outline-none"
      data-testid={dataTestId || "radio-button"}
    >
      <div
        className={`
          flex h-[16px] w-[16px] items-center justify-center rounded-full
          border transition-all duration-200
          ${
            checked
              ? "border-cyan-300/60 bg-cyan-300/15 shadow-[0_0_0_4px_rgba(103,232,249,0.08)]"
              : "border-white/20 bg-white/[0.04] group-hover:border-white/35 group-hover:bg-white/[0.07]"
          }
        `}
      >
        <div
          className={`
            h-1.5 w-1.5 rounded-full transition-all duration-200
            ${checked ? "bg-cyan-300" : "bg-transparent"}
          `}
        />
      </div>
    </button>
  )
}

export default Radio
