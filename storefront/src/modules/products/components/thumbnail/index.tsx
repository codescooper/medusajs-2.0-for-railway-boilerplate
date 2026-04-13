import { Container, clx } from "@medusajs/ui"
import Image from "next/image"
import React from "react"

import PlaceholderImage from "@modules/common/icons/placeholder-image"

type ThumbnailProps = {
  thumbnail?: string | null
  images?: any[] | null
  size?: "small" | "medium" | "large" | "full" | "square"
  isFeatured?: boolean
  className?: string
  "data-testid"?: string
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  thumbnail,
  images,
  size = "small",
  isFeatured,
  className,
  "data-testid": dataTestid,
}) => {
  const initialImage = thumbnail || images?.[0]?.url

  return (
    <Container
      className={clx(
        "group relative w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-2 backdrop-blur-xl transition-all duration-500 ease-out",
        "shadow-[0_10px_30px_rgba(0,0,0,0.18)] hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.28)]",
        className,
        {
          "aspect-[11/14]": isFeatured,
          "aspect-[4/5]": !isFeatured && size !== "square",
          "aspect-square": size === "square",
          "w-[180px]": size === "small",
          "w-[290px]": size === "medium",
          "w-[440px]": size === "large",
          "w-full": size === "full",
        }
      )}
      data-testid={dataTestid}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[1.2rem] bg-white/[0.03]">
        <ImageOrPlaceholder image={initialImage} size={size} />

        {/* overlay luxe subtil */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/[0.03]" />

        {/* reflet glass */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/[0.12] to-transparent opacity-60" />
      </div>
    </Container>
  )
}

const ImageOrPlaceholder = ({
  image,
  size,
}: Pick<ThumbnailProps, "size"> & { image?: string }) => {
  return image ? (
    <Image
      src={image}
      alt="Product image"
      className="absolute inset-0 object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      draggable={false}
      quality={85}
      sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
      fill
    />
  ) : (
    <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-gradient-to-br from-white/[0.04] to-white/[0.02]">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl">
        <PlaceholderImage size={size === "small" ? 16 : 24} />
      </div>
    </div>
  )
}

export default Thumbnail
