import { constants as ethersConstants } from "ethers";

import { Chain, Token } from "src/domain";

const selectTokenAddress = (token: Token, chain: Chain): string => {
  return token.wrappedToken && chain.chainId === token.wrappedToken.chainId
    ? token.wrappedToken.address
    : token.address;
};

/*const isTokenEther = (token: Token): boolean => {
  return token.address === ethersConstants.AddressZero;
};*/

const isTokenEther = (token: Token, chainId?:number): boolean => {
  
  if ( chainId !== token.chainId && token.wrappedToken){
    return token.wrappedToken.address === ethersConstants.AddressZero;
  }
  return token.address === ethersConstants.AddressZero;
  
  
};

export { isTokenEther, selectTokenAddress };
