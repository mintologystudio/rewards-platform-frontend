import {ICampaign, ICampaignNew, IPerk} from "./interfaces";

export const MOCK_DATA: Array<ICampaignNew> = [
    // {
    //     _id: "1",
    //     merchantId: "62a825c555ead66f43ba2286",
    //     merchantAddress: "0xc1C9D88A4E58B5E395675ded16960Ffca265bA52",
    //     collectionIdentifiers: [
    //         "1-0x75E9Abc7E69fc46177d2F3538C0B92d89054eC91",
    //         "1-0x165a2eD732eb15B54b5E8C057CbcE6251370D6e8"
    //     ],
    //     title: 'NIKE',
    //     company: 'nike',
    //     companyLogoUrl: "https://static.nike.com/a/images/f_jpg,q_auto:eco/61b4738b-e1e1-4786-8f6c-26aa0008e80b/swoosh-logo-black.png",
    //     offer: '10% off footwear',
    //     description: '10% off when you purchase any footwear on nike.com!',
    //     bgUrl: 'assets/product1.png',
    //     location: 'nike.com',
    //     website: 'https://www.nike.com',
    //     tnc: [
    //         'Limited to 1 redemption per user. Limited redemptions are available for the period',
    //         'Claims are available until October 20, 2022, or while supplies last.',
    //         'Applicable only for online purchases on nike.com.',
    //         'Other Nike T&Cs apply.'
    //     ],
    //     startDate: '2022-06-15T00:00:00.000Z',
    //     endDate: '2022-10-20T00:00:00.000Z',
    //     status: 'active',
    //     remaining: 100,
    //     totalCoupon: 500,
    //     voucher: {
    //         title: '10% Off Footwear',
    //         description:
    //             '10% off when you purchase any footwear on nike.com!',
    //         tnc: [
    //             'Limited to 1 redemption per user. Limited redemptions are available for the period',
    //             'Claims are available until October 20, 2022, or while supplies last.',
    //             'Applicable only for online purchases on nike.com.',
    //             'Other Nike T&Cs apply.'
    //         ],
    //         code: 'ZXF28372929',
    //     },
    // },
    {
        _id: "1",
        merchantId: "62a825c555ead66f43ba2286",
        merchantAddress: "0xc1C9D88A4E58B5E395675ded16960Ffca265bA52",
        collectionIdentifiers: [
            "1-0x75E9Abc7E69fc46177d2F3538C0B92d89054eC91",
            "1-0x165a2eD732eb15B54b5E8C057CbcE6251370D6e8"
        ],
        title: 'Brushbound',
        company: 'nike',
        companyLogoUrl: "https://static.nike.com/a/images/f_jpg,q_auto:eco/61b4738b-e1e1-4786-8f6c-26aa0008e80b/swoosh-logo-black.png",
        offer: '20% off any merchandise ',
        description: '20% off when you purchase any ready-to-wear & art on brushbound.com!',
        bgUrl: 'assets/product1.png',
        location: 'https://www.brushbound.com',
        website: 'https://www.brushbound.com',
        tnc: [
            'Limited to 1 redemption per user. Limited redemptions are available for the period.',
            'Claims are available until December 4, 2022, or while supplies last.',
            'Applicable only for online purchases on https://www.brushbound.com.',
            'Other Brushbound T&Cs apply.'
        ],
        startDate: '2022-11-03T00:00:00.000Z',
        endDate: '2022-12-04T00:00:00.000Z',
        status: 'active',
        remaining: 100,
        totalCoupon: 100,
        voucher: {
            title: '10% Off Footwear',
            description:
                '20% off when you purchase any ready-to-wear & art on brushbound.com!',
            tnc: [
                'Limited to 1 redemption per user. Limited redemptions are available for the period.',
                'Claims are available until December 4, 2022, or while supplies last.',
                'Applicable only for online purchases on https://www.brushbound.com.',
                'Other Brushbound T&Cs apply.'
            ],
            code: 'BB001',
        },
    },
    {
        _id: "2",
        merchantId: "62a825c555ead66f43ba2286",
        merchantAddress: "0xc1C9D88A4E58B5E395675ded16960Ffca265bA52",
        collectionIdentifiers: [
            "1-0x75E9Abc7E69fc46177d2F3538C0B92d89054eC91",
            "1-0x165a2eD732eb15B54b5E8C057CbcE6251370D6e8"
        ],
        title: 'ATMOS',
        company: 'atmos',
        companyLogoUrl: "https://static.nike.com/a/images/f_jpg,q_auto:eco/61b4738b-e1e1-4786-8f6c-26aa0008e80b/swoosh-logo-black.png",
        offer: '10% off footwear',
        description: '10% off when you purchase any footwear on atmosusa.com!',
        bgUrl: 'assets/product2.png',
        location: 'atmosusa.com',
        website: 'https://www.atmosusa.com',
        tnc: [
            'Limited to 1 redemption per user. Limited redemptions are available for the period.',
            'Claims are available until June 20, 2022, or while supplies last.',
            'Applicable only for online purchases on atmosusa.com.',
            'Other Atmos T&Cs apply.'
        ],
        startDate: '2022-06-15T00:00:00.000Z',
        endDate: '2022-06-20T00:00:00.000Z',
        status: 'active',
        remaining: 0,
        totalCoupon: 400,
        voucher: {
            title: '10% Off Footwear',
            description:
                '10% off when you purchase any footwear on atmosusa.com!',
            tnc: [
                'Limited to 1 redemption per user. Limited redemptions are available for the period.',
                'Claims are available until June 20, 2022, or while supplies last.',
                'Applicable only for online purchases on atmosusa.com.',
                'Other Atmos T&Cs apply.'
            ],
            code: 'Q1238372421',
        },
    },
    {
        _id: "3",
        merchantId: "62a825c555ead66f43ba2286",
        merchantAddress: "0xc1C9D88A4E58B5E395675ded16960Ffca265bA52",
        collectionIdentifiers: [
            "1-0x75E9Abc7E69fc46177d2F3538C0B92d89054eC91",
            "1-0x165a2eD732eb15B54b5E8C057CbcE6251370D6e8"
        ],
        title: 'ASOS',
        company: 'ASOS',
        companyLogoUrl: "https://static.nike.com/a/images/f_jpg,q_auto:eco/61b4738b-e1e1-4786-8f6c-26aa0008e80b/swoosh-logo-black.png",
        offer: '20% off apparels',
        description: '20% off when you purchase any merchandise on asos.com!',
        bgUrl: 'assets/product3.png',
        location: 'asos.com',
        website: 'https://www.asos.com',
        tnc: [
            'Limited to 1 redemption per user. Limited redemptions are available for the period.',
            'Claims are available until October 20, 2022, or while supplies last.',
            'Applicable only for online purchases on asos.com.',
            'Other ASOS T&Cs apply.'
        ],
        startDate: '2022-06-15T00:00:00.000Z',
        endDate: '2022-10-20T00:00:00.000Z',
        status: 'active',
        remaining: 198,
        totalCoupon: 10000,
        voucher: {
            title: '20% Off Clothing',
            description:
                '20% off when you purchase any merchandise on asos.com!',
            tnc: [
                'Limited to 1 redemption per user. Limited redemptions are available for the period.',
                'Claims are available until October 20, 2022, or while supplies last.',
                'Applicable only for online purchases on asos.com.',
                'Other ASOS T&Cs apply.'
            ],
            code: 'RAS2837023',
        },
    },
]


export const CAMPAIGN_DATA: Array<ICampaignNew> = MOCK_DATA;


export const PERK_DATA: Array<IPerk> = MOCK_DATA;
