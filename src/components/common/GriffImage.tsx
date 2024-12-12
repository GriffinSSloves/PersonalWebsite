interface GriffImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
    src: string
    baseDir?: string
    sizes?: string
    imageWidth?: number
    imageHeight?: number
}

export const GriffImage = ({
    src,
    alt,
    className,
    baseDir = '/images',
    sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    imageWidth,
    imageHeight,
    ...props
}: GriffImageProps) => {
    // Remove file extension from src to use as base filename
    const baseFilename = src.substring(0, src.lastIndexOf('.')) || src

    // Common image sizes
    const imageSizes = [270, 768, 1024, 1310, 1536, 1720, 1890, 2048]

    // Generate srcSet for both WebP and AVIF
    const webpSrcSet = imageSizes.map((size) => `${baseDir}/${baseFilename}-${size}.webp ${size}w`).join(', ')

    const avifSrcSet = imageSizes.map((size) => `${baseDir}/${baseFilename}-${size}.avif ${size}w`).join(', ')

    return (
        <picture>
            {/* AVIF format */}
            <source type='image/avif' srcSet={avifSrcSet} sizes={sizes} />
            {/* WebP format */}
            <source type='image/webp' srcSet={webpSrcSet} sizes={sizes} />
            {/* Fallback image */}
            <img
                src={`${baseDir}/${baseFilename}-1024.webp`}
                alt={alt}
                className={className}
                width={imageWidth}
                height={imageHeight}
                loading='lazy'
                decoding='async'
                {...props}
            />
        </picture>
    )
}
