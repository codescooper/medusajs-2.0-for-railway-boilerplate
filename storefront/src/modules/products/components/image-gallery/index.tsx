import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Image from "next/image"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  return (
    <div className="relative flex items-start">
      <div className="flex flex-1 flex-col gap-y-5 small:mx-10 xl:mx-16">
        {images.map((image, index) => {
          return (
            <Container
              key={image.id}
              id={image.id}
              className="
                group relative w-full overflow-hidden rounded-[2rem]
                border border-white/10 bg-white/[0.04] p-2
                backdrop-blur-xl transition-all duration-500
                hover:border-white/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.28)]
              "
            >
              <div className="relative aspect-[29/34] w-full overflow-hidden rounded-[1.5rem] bg-white/[0.03]">
                {!!image.url && (
                  <Image
                    src={image.url}
                    priority={index <= 2}
                    alt={`Image produit ${index + 1}`}
                    fill
                    sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
                    className="absolute inset-0 object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                )}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/[0.04]" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/[0.10] to-transparent opacity-70" />
              </div>
            </Container>
          )
        })}
      </div>
    </div>
  )
}

export default ImageGallery
