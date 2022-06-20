import moment from 'moment';

import { ReactComponent as CardBg } from '../../assets/union.svg';
import { ReactComponent as DefaultCoinIcon } from '../../assets/coin_default_icon.svg';

interface CoinCardType {
  symbol: string
  image: string
  price: number
  status: number
  createdTimestamp: string
  leaseEnd: number
  blockNumber: number
  active: boolean
  onClick: () => void
}

const CoinCard = ({ symbol, image, price, status, createdTimestamp, leaseEnd, blockNumber, onClick, active }: CoinCardType) => {
  const generateStatusColorBg = () => {
    switch (status) {
      case 1:
        return 'bg-active'
      case 2:
        return 'bg-terminated'
      default:
        return 'bg-suspended'
    }
  }

  const generateStatusColorText = () => {
    switch (status) {
      case 1:
        return 'text-active'
      case 2:
        return 'text-terminated'
      default:
        return 'text-suspended'
    }
  }

  const renderCoinLogo = () => {
    if (image === undefined) {
      return <div className="h-20 w-20 animate-pulse bg-slate-700 rounded-full col-span-1" />
    }

    if (image) {
      return <img className = "w-20 h-20 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20" src = { image } alt = "coin" />
    }

    return (<DefaultCoinIcon className = "w-20 h-20 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20" />)
  }

  return (
    <div className="flex w-full relative" onClick={onClick}>
      <CardBg className={`hover:stroke-primary cursor-pointer z-[1] ${active ? 'stroke-primary' : ''}`} width="100%" height="100%" />
      <div className="flex w-full absolute h-[23%]">
        {
          symbol ? (
            <div className="w-2/5 font-bold text-center flex text-xl text-white items-center justify-center sm:text-xs md:text-lg">{symbol?.toUpperCase()}</div>
          ) : (
            <div className="w-2/5 font-bold text-center flex text-xl text-white items-center justify-center sm:text-xs md:text-lg">
              <div className="h-5 w-2/5 animate-pulse bg-slate-700 rounded col-span-1"></div>
            </div>
          )
        }
        {
          status ? (
            <div className={`w-3/5 flex pr-3 items-center justify-end font-bold ${generateStatusColorText()} gap-2`}>
              <div className="relative flex flex-row">
                <div className={`relative w-5 h-5 sm:w-3 sm:h-3 lg:w-5 lg:h-5 rounded-full animate-ping ${generateStatusColorBg()}`} />
                <div className={`absolute w-5 h-5 sm:w-3 sm:h-3 lg:w-5 lg:h-5 rounded-full ${generateStatusColorBg()}`} />
              </div>
              <div className="relative sm:text-xs lg:text-xl">{status === 1 ? 'Active' : status === 2 ? 'Terminated' : 'Suspended'}</div>
            </div>
          ) : (
            <div className={`w-3/5 flex pr-3 items-center justify-end font-bold ${generateStatusColorText()} gap-2`}>
              <div className="relative flex flex-row">
                <div className="animate-pulse bg-slate-700 w-5 h-5 sm:w-3 sm:h-3 lg:w-5 lg:h-5 rounded-full col-span-1"></div>
              </div>
              <div className="bg-slate-700 w-20 h-5 rounded animate-pulse" />
            </div>
          )
        }
      </div>
      <div className="flex w-full absolute top-[23%] text-white font-bold font-primary h-[77%] px-0 py-3 sm:py-4">
        <div className="w-2/5 justify-center items-center flex">
          {renderCoinLogo()}
        </div>

        <div className="w-3/5 pl-3 sm:pl-0 flex flex-col gap-2 justify-center lg:pr-4">
          {
            price ? (
              <span className="text-3xl sm:text-base md:text-xl lg:text-2xl">$ {Number(price || 0)?.toLocaleString("en-US")}</span>
            ) : (
              <span className="w-11/12 h-5 rounded bg-slate-700 animate-pulse" />
            )
          }
          {
            createdTimestamp ? (
              <span className="text-xl sm:text-xs md:text-sm">End: {moment(createdTimestamp).add(3 * (leaseEnd - blockNumber), 'm').format('DD/MMM/YYYY HH:mm')}</span>
            ) : (
              <span className="w-11/12 h-5 rounded bg-slate-700 animate-pulse" />
            )
          }
        </div>
      </div>
    </div>
  )
}

export default CoinCard;