interface GriffImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const placeholderImage = '/system/placeholder.png'

export const GriffImage = ({
    src = placeholderImage,
    alt,
    className,
    sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    ...props
}: GriffImageProps) => {
    const extension = src.split('.').pop()?.toLowerCase()
    const baseFilename = src.replace(/\.[^/.]+$/, '')

    // If it's an SVG, render it directly
    if (extension === 'svg') {
        return <img src={`/images/optimized/${src}`} alt={alt} className={className} {...props} />
    }

    // For raster images, use picture element with srcset
    const imageSizes = [270, 768, 1024, 1310, 1536, 1720, 1890, 2048]

    const webpSrcSet = imageSizes.map((size) => `/images/optimized/${baseFilename}-${size}.webp ${size}w`).join(', ')

    const avifSrcSet = imageSizes.map((size) => `/images/optimized/${baseFilename}-${size}.avif ${size}w`).join(', ')

    return (
        <picture>
            <source type='image/avif' srcSet={avifSrcSet} sizes={sizes} />
            <source type='image/webp' srcSet={webpSrcSet} sizes={sizes} />
            <img src={`/images/optimized/${baseFilename}-1024.webp`} alt={alt} className={className} loading='lazy' decoding='async' {...props} />
        </picture>
    )
}
