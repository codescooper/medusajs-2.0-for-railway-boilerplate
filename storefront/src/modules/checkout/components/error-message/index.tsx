const ErrorMessage = ({
  error,
  "data-testid": dataTestid,
}: {
  error?: string | null
  "data-testid"?: string
}) => {
  if (!error) {
    return null
  }

  return (
    <div
      className="mt-3 flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-400"
      data-testid={dataTestid}
    >
      <span className="mt-[2px] h-2 w-2 rounded-full bg-red-400" />
      <span className="leading-relaxed">{error}</span>
    </div>
  )
}

export default ErrorMessage
