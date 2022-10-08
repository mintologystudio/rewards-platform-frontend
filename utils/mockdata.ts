import {ICampaign, IPerk} from "./interfaces";

export const MOCK_DATA: Array<ICampaign> = [
    {
        campaignId: "1",
        nft: 'azuki',
        company: 'nike',
        location: 'nike.com',
        website: 'https://www.nike.com',
        startTime: 1657887360000,
        endTime: 1668950741000,
        nftCollectionAddr: '0xED5AF388653567Af2F388E6224dC7C4b3241C544',
        offer: '10% Off footwear',
        suboffer: 'Free one month membership',
        remaining: 100,
        totalCoupon: 500,
        bgUrl: 'assets/product1.png',
        offers: [
            '10% Off footwear',
        ],
        tnc: [
            'Limited to 1 redemption per user. Limited redemptions are available for the period',
            'Claims are available until October 20, 2022, or while supplies last.',
            'Applicable only for online purchases on nike.com.',
            'Other Nike T&Cs apply.'
        ],
        voucher: {
            title: '10% Off Footwear',
            description:
                '10% off when you purchase any footwear on nike.com!',
            tnc: [
                'Limited to 1 redemption per user. Limited redemptions are available for the period',
                'Claims are available until October 20, 2022, or while supplies last.',
                'Applicable only for online purchases on nike.com.',
                'Other Nike T&Cs apply.'
            ],
            code: '23cv-f34c-xc123',
        },
        expiration: 1666224000000
    },
    {
        campaignId: "2",
        nft: 'karafuru',
        company: 'atmos',
        location: 'atmosusa.com',
        website: 'https://www.atmosusa.com',
        startTime: 1657887360000,
        endTime: 1658319360000,
        nftCollectionAddr: '0xd2F668a8461D6761115dAF8Aeb3cDf5F40C532C6',
        offer: '10% Off footwear',
        suboffer: 'Free one month membership',
        remaining: 0,
        totalCoupon: 400,
        bgUrl: 'assets/product2.png',
        offers: [
            '10% off when you purchase any footwear on atmosusa.com!'
        ],
        tnc: [
            'Limited to 1 redemption per user. Limited redemptions are available for the period.',
            'Claims are available until June 20, 2022, or while supplies last.',
            'Applicable only for online purchases on atmosusa.com.',
            'Other Atmos T&Cs apply.'
        ],
        voucher: {
            title: '10% OFF FOOTWEAR',
            description:
                '10% off when you purchase any footwear on atmosusa.com!',
            tnc: [
                'Limited to 1 redemption per user. Limited redemptions are available for the period.',
                'Claims are available until June 20, 2022, or while supplies last.',
                'Applicable only for online purchases on atmosusa.com.',
                'Other Atmos T&Cs apply.'
            ],
            code: '56gg-sd56-sfdg4',
        },
        expiration: 1658319360000
    },
    {
        campaignId: "3",
        nft: 'doodles',
        company: 'ASOS',
        location: 'asos.com',
        website: 'https://www.asos.com',
        startTime: 1657887360000,
        endTime: 1668950741000,
        nftCollectionAddr: '0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e',
        offer: '10% Off footwear',
        suboffer: 'Free one month membership',
        remaining: 198,
        totalCoupon: 10000,
        bgUrl: 'assets/product3.png',
        offers: [
            '20% off when you purchase any merchandise on asos.com!'
        ],
        tnc: [
            'Limited to 1 redemption per user. Limited redemptions are available for the period.',
            'Claims are available until October 20, 2022, or while supplies last.',
            'Applicable only for online purchases on atmosusa.com.',
            'Other ASOS T&Cs apply.'
        ],
        voucher: {
            title: '10% OFF FOOTWEAR',
            description:
                '20% off when you purchase any merchandise on asos.com!',
            tnc: [
                'Limited to 1 redemption per user. Limited redemptions are available for the period.',
                'Claims are available until October 20, 2022, or while supplies last.',
                'Applicable only for online purchases on atmosusa.com.',
                'Other ASOS T&Cs apply.'
            ],
            code: '11uf-df78-kgsf5',
        },
        expiration: 1666224000000,
        // isEmpty: true
    }
]


export const CAMPAIGN_DATA: Array<ICampaign> = MOCK_DATA;


export const PERK_DATA: Array<IPerk> = MOCK_DATA;
