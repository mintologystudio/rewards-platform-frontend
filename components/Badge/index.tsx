/* eslint-disable @next/next/no-img-element */
import styles from './index.module.scss'
import Image from 'next/image'

const Badge = ({
  company,
  nft,
  width,
  height,
}: {
  company?: string,
  nft?: string,
  width?: string,
  height?: string,
}) => {
    const src = company && company != '' ? `/assets/companies/${company.toLowerCase()}.png` : `/assets/nfts/${nft}.png`;

    const newWidth = width && width != '' ? width : '25rem';
    const newHeight = height && height != '' ? height : width;

    return (
            <Image
                src={src}
                alt={`${company} Badge`}
                layout="fixed"
                width={newWidth}
                height={newHeight}
            />
    )
}

export default Badge
