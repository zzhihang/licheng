// 供应商类别
const categorySupplier = [
    {
        value: 1, 
        label: '制造商'
    },
    {
        value: 2, 
        label: '代理商'
    }
]


// 公司性质
const natureCompany= [
    {
        value: 1, 
        label: '国企'
    },
    {
        value: 2, 
        label: '股份制'
    },
    {
        value: 3, 
        label: '私企/集体'
    },
    {
        value: 4, 
        label: '中外合资'
    },
    {
        value: 5, 
        label: '外商独资'
    },
    {
        value: 6, 
        label: '其他'
    }
]

// 公司/工厂/设备属性
const companyAttributes = [
    {
        value: 1, 
        label: '自有'
    },
    {
        value: 2, 
        label: '租贷'
    }
]

// 运行时间
const  elapsedTime = [
    {
        value: 1, 
        label: '运行3年以下'
    },
    {
        value: 2, 
        label: '运行3-5年'
    },
    {
        value: 3, 
        label: '运行5-10年'
    },
    {
        value: 4, 
        label: '运行10年及以上'
    },
    {
        value: 5, 
        label: '未运行'
    }
]

// 售后与经营-产品质保期
const productWarrantyList = [
    {
        value: 0,
        label: '无质保'
    },
    {
        value: 1,
        label: '1年一下半年以上'
    },
    {
        value: 2,
        label: '1-2年'
    },
    {
        value: 3,
        label: '2-5年'
    },
    {
        value: 4,
        label: '5年以上'
    },
    {
        value: 5,
        label: '终身质保'
    }
]

// 评分项类别
const scoreCategory = [
    { value: 0, label: '注册信息' },
    { value: 1, label: '供应商基本情况' },
    { value: 2, label: '供应商研发能力和产品介绍' },
    { value: 3, label: '售后服务' },
    { value: 4, label: '供应商经营情况和业绩' },
    { value: 5, label: '历史合作' }
]

 
export {
    categorySupplier,
    natureCompany,
    companyAttributes,
    elapsedTime,
    productWarrantyList,
    scoreCategory
}

