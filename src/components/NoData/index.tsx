import { useTranslation } from "react-i18next";
import emptyIocn from '@/assets/images/no-data.svg'

const NoData = () => {

    const { t } = useTranslation()

    return <div className="flex flex-col items-center justify-center py-16">
        <img src={emptyIocn} className="w-[134px] h-[96px] mb-6" alt="" />
        <span className="text-base text-gray">{t('no_records')}</span>
    </div>
}

export default NoData;