import {ICampaign, IPerk} from "./interfaces";

export const MOCK_DATA: Array<ICampaign> = [
    {
        campaignId: "1",
        nft: 'azuki',
        company: 'nike',
        location: 'Worldwide Official Nike Stores',
        startTime: 1657887360000,
        endTime: 1668950741000,
        nftCollectionAddr: '0xED5AF388653567Af2F388E6224dC7C4b3241C544',
        offer: '10% Off footwear',
        suboffer: '30% Off apparels<br/>Free one month membership',
        redeemed: 100,
        bgUrl: 'assets/product1.png',
        voucher: {
            title: '10% Off Footwear',
            description:
                '10% off footwear when you purchase any footwear in-store!',
            tnc: [
                'Limited to 1 redemption per user. Limited redemptions available for the period',
                'Promo is valid from now until 30th June 2022 or redemption lasts, whichever is sooner',
                'Applicable only for in-store purchases',
                'Other Nike T&Cs apply',
            ],
            code: '23cv-f34c-xc123',
        },
        expiration: 1668950741000
    },
    {
        campaignId: "2",
        nft: 'karafuru',
        company: 'atmos',
        location: 'Worldwide Official karafuru Stores',
        startTime: 1657887360000,
        endTime: 1658319360000,
        nftCollectionAddr: '0xd2F668a8461D6761115dAF8Aeb3cDf5F40C532C6',
        offer: '10% Off footwear',
        suboffer: '30% Off apparels<br/>Free one month membership',
        redeemed: 232,
        bgUrl: 'assets/product2.png',
        voucher: {
            title: '10% OFF FOOTWEAR',
            description:
                '10% off footwear when you purchase any footwear in-store!',
            tnc: [
                'Limited to 1 redemption per user. Limited redemptions available for the period',
                'Promo is valid from now until 30th June 2022 or redemption lasts, whichever is sooner',
                'Applicable only for in-store purchases',
                'Other Nike T&Cs apply',
            ],
            code: '56gg-sd56-sfdg4',
        },
        expiration: 1658319360000
    },
    {
        campaignId: "3",
        nft: 'doodles',
        company: 'whitecastle',
        location: 'Worldwide Official doodles Stores',
        startTime: 1657887360000,
        endTime: 1668950741000,
        nftCollectionAddr: '0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e',
        offer: '10% Off footwear',
        suboffer: '30% Off apparels<br/>Free one month membership',
        redeemed: 9322,
        bgUrl: 'assets/product3.png',
        voucher: {
            title: '10% OFF FOOTWEAR',
            description:
                '10% off footwear when you purchase any footwear in-store!',
            tnc: [
                'Limited to 1 redemption per user. Limited redemptions available for the period',
                'Promo is valid from now until 30th June 2022 or redemption lasts, whichever is sooner',
                'Applicable only for in-store purchases',
                'Other Nike T&Cs apply',
            ],
            code: '11uf-df78-kgsf5',
        },
        expiration: 1668950741000
    }
]


export const CAMPAIGN_DATA: Array<ICampaign> = MOCK_DATA;


export const PERK_DATA: Array<IPerk> = MOCK_DATA;
