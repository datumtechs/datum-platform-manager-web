import Big from 'big.js';

/**
 * @param originNumber 原始金额
 * @param decimal 精度
 * @returns string
 * @method exchangeFrom 转换成10进制
 * @method exchangeTo 转换成当前精度链上数值
 */

export const useExchangeFrom = (originNumber: number, decimal: number = 18) => {
    return new Big(originNumber).div(new Big(10).pow(decimal)) + ''
}

export const useExchangeTo = (originNumber: number, decimal: number = 18) => {
    return new Big(10).pow(decimal).mul(new Big(originNumber)).toFixed();
}