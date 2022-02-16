import "./App.css";
import {
  CallContractStringifyReturn,
  useContract,
  svgStringToBase64,
  htmlParse } from "./lib/contracts";
import { BlockHashProvider } from "./providers/BlockHashProvider";
import { StarknetProvider } from "./providers/StarknetProvider";
import { TransactionsProvider } from "./providers/TransactionsProvider";


//
// App
//
function App() {
  const contract = useContract();
  const paragraph_string = CallContractStringifyReturn (contract, "return_html_paragraphs")
  const svg_string = CallContractStringifyReturn (contract, "return_svg");
  const html_string = CallContractStringifyReturn (contract, "return_html_table");

  return (
    <div className="container">

      {/* paragraph pulled from starknet */}
      <div className="row">
        { htmlParse(paragraph_string) }
      </div>

      {/* svg pulled from starknet */}
      <div className="row">
        <a href="https://twitter.com/topology_gg" target="_blank" rel="noopener noreferrer">
        <img src={`data:image/svg+xml;base64,${ svgStringToBase64(svg_string) }`} alt="" />
        </a>
      </div>

      {/* table pulled from starknet */}
      <div className="row">
        { htmlParse(html_string) }
      </div>

      <div className="row footnote">
        <p>Website contract address:</p>
        <p>
        <a href="https://goerli.voyager.online/contract/0x04ffa0a2b789fb6a454c0f2b13120ad9bc8418728040964a63910d71a710cd79" target="_blank" rel="noopener noreferrer">0x04ffa0a2b789fb6a454c0f2b13120ad9bc8418728040964a63910d71a710cd79</a>
        </p>
      </div>

    </div>
  );
}


//
// Wrapper for App
//
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
