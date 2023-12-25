import { Button, Form, InputNumber, App as AntdApp, Typography, Modal, Spin } from 'antd'
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom';
import { useEthers, useSendTransaction } from '@usedapp/core';

import * as utils from "web3-utils";
import Container from '@/components/Container';
import useIsChainId from '@/hooks/useChainId';
import inscriptionsApi from '@/utils/request';
import { ExplorerDataProps } from '@/utils/request.type';
import { decimalsToStr, shorten, strToDecimals } from '@/utils';


let instance: ReturnType<typeof Modal.error> | undefined;


const Recap: React.FC = () => {
  const { t } = useTranslation()
  const [form] = Form.useForm()

  const nav = useNavigate()

  const { message, modal } = AntdApp.useApp()

  const { sendTransaction, state } = useSendTransaction()

  const { account } = useEthers()

  const [maxSupply, setMaxSupply] = useState<number>(21000000)

  const param = useParams()

  const [loading, setLoading] = useState(false)

  const [detail, setDetail] = useState<ExplorerDataProps>({} as ExplorerDataProps)

  const getDetail = async () => {
    setLoading(true)
    inscriptionsApi.getInscriptionsDetail({
      tick_hash: param.hash,
      page: 1
    }).then((res) => {
      setLoading(false)
      if (res.code === 0 && res.data.list.length > 0) {
        const _detail = res.data.list[0];
        setDetail(_detail)
        form.setFieldsValue({
          decimals: _detail.decimals,
          totalSupply: decimalsToStr(_detail.max, _detail.decimals),
          minted: decimalsToStr(_detail.minted, _detail.decimals)
        })
      } else {
        if (instance === undefined) {
          instance = Modal.error({
            title: 'Error!',
            content: "No data found",
            okText: "Back",
            wrapClassName: "alert-model-wrap",
            onOk() {
              instance = undefined;
              nav(-1)
            },
          });
        }
      }
    }).catch(err => {
      setLoading(false)
      console.log(err, 'err')
    })
  }

  useEffect(() => {
    const hash = param.hash;
    if (hash?.startsWith('0x')) {
      getDetail()
    } else {
      nav('/')
    }
  }, [param.id])

  const { isTrueChainId } = useIsChainId()

  const onSubmit = () => {
    form.validateFields({ validateOnly: true }).then(res => {
      console.log(res, 'res')
      if (account === undefined) {
        modal.info({
          title: "",
          content: "Please Connect the Wallet First",
          wrapClassName: "alert-model-wrap",
          centered: true
        })
        return;
      }
      if (isTrueChainId === false) {
        modal.info({
          title: "",
          content: "Wrong Network",
          wrapClassName: "alert-model-wrap",
          centered: true
        })
        return;
      }
      const limitPerMint = +decimalsToStr(detail.lim, detail.decimals);

      if (res.newTotalSupply % limitPerMint !== 0) {
        modal.info({
          title: "",
          content: "limit per mint must be divisible by total supply",
          wrapClassName: "alert-model-wrap",
          centered: true
        })
        return;
      }

      const oldMax = +decimalsToStr(detail.max, detail.decimals)
      if (res.newTotalSupply >= oldMax) {
        modal.info({
          title: "",
          content: "Increasing is not allowed.",
          wrapClassName: "alert-model-wrap",
          centered: true
        })
        return;
      }

      const str = `data:,{
        "p"."bnb-48"
        "op":"recap".
        "tick-hash":"${detail.tick_hash}",
        "max":"${strToDecimals(res.newTotalSupply, detail.decimals)}"
      }`
      console.log(str.replace(/\s*/g, ''), 'str')

      sendTransaction({
        to: account,
        value: utils.toWei(0, 'ether'),
        data: utils.stringToHex(str.replace(/\s*/g, '')),
      })
      // _onClose()
      // resetForm()
    }).catch((err) => {
      console.log(err)
      message.error("Please enter correct information")
    })
  }

  useEffect(() => {
    if (state.status === "Success") {
      message.success("Success")
    }
  }, [state.status])

  console.log(detail, 'detail')
  return (
    <Spin spinning={loading}>
      <Container className='mt-[82px]'>
        <div className="flex items-center mt-[32px]">
          <svg onClick={() => nav(-1)} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect opacity="0.2" width="40" height="40" rx="16" fill="#F9F9F9" />
            <path d="M15.828 21L21.192 26.364L19.778 27.778L12 20L19.778 12.222L21.192 13.636L15.828 19L28 19L28 21L15.828 21Z" fill="white" />
          </svg>
          <h1 className="my-0 ml-[7px] text-[#FFC801]">{detail.tick}({shorten(detail.tick_hash)})</h1>
          <Typography.Paragraph className="m-[0_!important] betch-copy " copyable={{
            text: detail.tick_hash, icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.9375 1.875H14.8125C15.1606 1.875 15.4944 2.01328 15.7406 2.25942C15.9867 2.50556 16.125 2.8394 16.125 3.1875V11.0625C16.125 11.4106 15.9867 11.7444 15.7406 11.9906C15.4944 12.2367 15.1606 12.375 14.8125 12.375H6.9375C6.5894 12.375 6.25556 12.2367 6.00942 11.9906C5.76328 11.7444 5.625 11.4106 5.625 11.0625V3.1875C5.625 2.8394 5.76328 2.50556 6.00942 2.25942C6.25556 2.01328 6.5894 1.875 6.9375 1.875ZM6.9375 3C6.88777 3 6.84008 3.01975 6.80492 3.05492C6.76975 3.09008 6.75 3.13777 6.75 3.1875V11.0625C6.75 11.0871 6.75485 11.1115 6.76427 11.1343C6.7737 11.157 6.78751 11.1777 6.80492 11.1951C6.82233 11.2125 6.843 11.2263 6.86575 11.2357C6.8885 11.2451 6.91288 11.25 6.9375 11.25H14.8125C14.8622 11.25 14.9099 11.2302 14.9451 11.1951C14.9802 11.1599 15 11.1122 15 11.0625V3.1875C15 3.13777 14.9802 3.09008 14.9451 3.05492C14.9099 3.01975 14.8622 3 14.8125 3H6.9375ZM11.25 13.5C11.25 13.3508 11.3093 13.2077 11.4148 13.1023C11.5202 12.9968 11.6633 12.9375 11.8125 12.9375C11.9617 12.9375 12.1048 12.9968 12.2102 13.1023C12.3157 13.2077 12.375 13.3508 12.375 13.5V14.8125C12.375 15.1606 12.2367 15.4944 11.9906 15.7406C11.7444 15.9867 11.4106 16.125 11.0625 16.125H3.1875C2.8394 16.125 2.50556 15.9867 2.25942 15.7406C2.01328 15.4944 1.875 15.1606 1.875 14.8125V6.9375C1.875 6.5894 2.01328 6.25556 2.25942 6.00942C2.50556 5.76328 2.8394 5.625 3.1875 5.625H4.5C4.64918 5.625 4.79226 5.68426 4.89775 5.78975C5.00324 5.89524 5.0625 6.03832 5.0625 6.1875C5.0625 6.33668 5.00324 6.47976 4.89775 6.58525C4.79226 6.69074 4.64918 6.75 4.5 6.75H3.1875C3.13777 6.75 3.09008 6.76975 3.05492 6.80492C3.01975 6.84008 3 6.88777 3 6.9375V14.8125C3 14.8622 3.01975 14.9099 3.05492 14.9451C3.09008 14.9802 3.13777 15 3.1875 15H11.0625C11.1122 15 11.1599 14.9802 11.1951 14.9451C11.2302 14.9099 11.25 14.8622 11.25 14.8125V13.5Z" fill="#A9A9A9" />
            </svg>
          }} />
          <span className="inline-block ml-[8px] w-[46px] h-[18px] font-[400] flex-center text-[10px] bg-[#1E1E1E] rounded-full">BNB-48</span>
        </div>
        <div className='px-[4px] diy-scrollbar mb-[34px] pb-[0px] mt-[32px] deploy-form'>
          <Form form={form} layout="vertical" size="large" preserve={false}>
            <Form.Item name="decimals" label="Decimals">
              <InputNumber
                readOnly
                className="h-12 w-full border-none rounded bg-light-white text-[#FFC801]"
              />
            </Form.Item>
            <Form.Item name="minted" label="Minted">
              <InputNumber
                readOnly
                className="h-12 w-full border-none rounded bg-light-white text-[#FFC801]"
              />
            </Form.Item>
            <Form.Item name="totalSupply" label="Max Supply">
              <InputNumber
                readOnly
                className="h-12 w-full border-none rounded bg-light-white text-[#FFC801]"
              />
            </Form.Item>
            <Form.Item name="newTotalSupply" initialValue={21000000} rules={[{ required: true, message: 'Please enter new max supply' }]} label="New Max Supply">
              <InputNumber
                formatter={(value) => `${value}`.split('.')[0]}
                min={1}
                value={maxSupply}
                onChange={(e: any) => setMaxSupply(e)}
                className="h-12 w-full border-none rounded bg-light-white"
                placeholder='21000000'
              />
            </Form.Item>
          </Form>
        </div>
        {
          maxSupply < +decimalsToStr(detail.minted, detail.decimals) && <p className='mb-[20px] opacity-70 text-[#FFC801]'>! The minted amount will be the new max supply.</p>
        }
        <div className="w-full flex mb-[80px] justify-center gap-6 flex-wrap">
          <Button size="large" className="block text-[14px] h-[48px!_important] flex-1 text-[#A9A9A9] bg-[#E9E9E9] rounded no-border" onClick={() => nav(-1)}>
            {t('pool_cancel')}
          </Button>
          <Button
            type="primary"
            size="large"
            loading={state.status === "Mining" || state.status === "PendingSignature"}
            className="flex-1  h-[48px!_important] text-[14px] rounded bg-yellow no-border"
            onClick={onSubmit}
          >
            Recap
          </Button>
        </div>
      </Container>
    </Spin>
  )
}


export default Recap;