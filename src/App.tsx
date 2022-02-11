import "./App.css";
import { CallReturnSvgString, useSvgContract, svgStringToBase64 } from "./lib/svg";
import {
  BlockHashProvider,
  // useBlockHash,
} from "./providers/BlockHashProvider";
import { StarknetProvider } from "./providers/StarknetProvider";
import { TransactionsProvider } from "./providers/TransactionsProvider";
// import { VoyagerLink } from "./components/VoyagerLink";

function App() {
  // const blockNumber = useBlockHash();
  const svgContract = useSvgContract();
  const svg_string = CallReturnSvgString(svgContract);

  return (
    <div className="container">

      <div className="row">
        :: Topology ::
      </div>

      <div className="row">
        where wizards stay up late.
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

      <div className="row">
        {/* <img src='data:image/svg+xml;base64,${  }' alt="" /> */}
        <img src={`data:image/svg+xml;base64,${ svgStringToBase64(svg_string) }`} alt="" />
      </div>

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
