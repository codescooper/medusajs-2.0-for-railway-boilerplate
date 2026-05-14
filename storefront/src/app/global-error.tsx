"use client"

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="fr">
      <body>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            fontFamily: "sans-serif",
          }}
        >
          <h1 style={{ fontSize: "1.5rem", fontWeight: 600 }}>
            Une erreur est survenue
          </h1>
          <p>Quelque chose s'est mal passé. Veuillez réessayer.</p>
          <button
            onClick={() => reset()}
            style={{ textDecoration: "underline", cursor: "pointer" }}
          >
            Réessayer
          </button>
        </div>
      </body>
    </html>
  )
}
