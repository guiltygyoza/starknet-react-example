import "./App.css";
import { CallReturnSvgString, useSvgContract, svgStringToBase64 } from "./lib/svg";
import {
  BlockHashProvider,
  // useBlockHash,
} from "./providers/BlockHashProvider";
import { StarknetProvider } from "./providers/StarknetProvider";
import { TransactionsProvider } from "./providers/TransactionsProvider";
// import { VoyagerLink } from "./components/VoyagerLink";

const rawHTML = `
<div class="dropdown">
  <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true">
    Dropdown
    <span class="caret"></span>
  </button>
  <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
    <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Action</a></li>
    <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Another action</a></li>
    <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Something else here</a></li>
    <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Separated link</a></li>
  </ul>
</div>`

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
