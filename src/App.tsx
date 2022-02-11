// import React from "react";
import "./App.css";
import { CallReturnSvgString, useSvgContract, svgStringToBase64 } from "./lib/svg";
// import { useCounterContract } from "./lib/counter";
// import { useStarknetCall } from "./lib/hooks";
import {
  BlockHashProvider,
  // useBlockHash,
} from "./providers/BlockHashProvider";
import { StarknetProvider } from "./providers/StarknetProvider";
import {
  TransactionsProvider,
  // useTransactions,
} from "./providers/TransactionsProvider";
// import { ConnectedOnly } from "./components/ConnectedOnly";
// import { IncrementCounter } from "./components/IncrementCounter";
// import { VoyagerLink } from "./components/VoyagerLink";

function App() {
  // const blockNumber = useBlockHash();
  const svgContract = useSvgContract();
  // const counter = useStarknetCall(counterContract, "counter");
  // const svg = useStarknetCall(svgContract, "return_svg");

  const svg_string = CallReturnSvgString(svgContract);

  // const lastCaller = useStarknetCall(counterContract, "lastCaller");

  // const { transactions } = useTransactions();

  // console.log('blocknumber: ', blockNumber)
  return (
    <div className="container">

      <div className="row">
        :: Topology ::
      </div>

      <div className="row">
        where wizards stay up late
      </div>

      {/* <div className="row">
        Current Block:{" "}
        {blockNumber && <VoyagerLink.Block block={blockNumber} />}
      </div>

      <div className="row">
        Contract Address:{" "}
        {svgContract?.connectedTo && (
          <VoyagerLink.Contract contract={svgContract?.connectedTo} />
        )}
      </div> */}

      {/* <div className="row">SVG hexstring array: {svg?.arr}</div> */}
      {/* <div className="row">funky! {"wooow"}{svg_string} </div> */}

      <div className="row">
        {/* <img src='data:image/svg+xml;base64,${  }' alt="" /> */}
        <img src={`data:image/svg+xml;base64,${ svgStringToBase64(svg_string) }`} alt="" />
      </div>

      {/* <img src={`data:image/svg+xml;utf8,${svgStringToBase64(svg_string)}`} /> */}

      {/* <div className="row">Last Caller: {lastCaller?.address}</div> */}
      {/* <div className="row">
        <ConnectedOnly>
          <IncrementCounter contract={counterContract} />
        </ConnectedOnly>
      </div> */}
      {/* <div className="row">
        <p>Transactions:</p>
        <ul>
          {transactions.map((tx, idx) => (
            <li key={idx}>
              <VoyagerLink.Transaction transactionHash={tx.hash} />
            </li>
          ))}
        </ul>
      </div> */}

    </div>
  );
}

function AppWithProviders() {
  return (
    <StarknetProvider>
      <BlockHashProvider>
        <TransactionsProvider>
          <App />
        </TransactionsProvider>
      </BlockHashProvider>
    </StarknetProvider>
  );
}
export default AppWithProviders;
