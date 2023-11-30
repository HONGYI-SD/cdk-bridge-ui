import { BigNumber } from "ethers";
import { FC } from "react";

import { Token } from "src/domain";
import { formatTokenAmount } from "src/utils/amounts";
import { isAsyncTaskDataAvailable } from "src/utils/types";
import { Spinner } from "src/views/shared/spinner/spinner.view";
import { useTokenBalanceStyles } from "src/views/shared/token-balance/token-balance.styles";
import { Typography, TypographyProps } from "src/views/shared/typography/typography.view";

interface TokenBalanceProps {
  chainId: number;
  spinnerSize: number;
  token: Token;
  typographyProps: TypographyProps;
}

export const TokenBalance: FC<TokenBalanceProps> = ({chainId, spinnerSize, token, typographyProps }) => {
  const classes = useTokenBalanceStyles();
  let symbol =token.symbol;
  if (token.symbol === "ETH" && chainId !== token.chainId){
    symbol = "WETH"
  }
  const loader = (
    <div className={classes.loader}>
      <Spinner size={spinnerSize} />
      <Typography {...typographyProps}>&nbsp;{symbol}</Typography>
    </div>
  );

  if (!token.balance) {
    return loader;
  }

  switch (token.balance.status) {
    case "pending":
    case "loading":
    case "reloading": {
      return loader;
    }
    case "successful":
    case "failed": {
      const formattedTokenAmount = formatTokenAmount(
        isAsyncTaskDataAvailable(token.balance) ? token.balance.data : BigNumber.from(0),
        token
      );

      return (
        <Typography {...typographyProps}>{`${formattedTokenAmount} ${symbol}`}</Typography>
      );
    }
  }
};
