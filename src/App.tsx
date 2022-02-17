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
  const paragraph_string = CallContractStringifyReturn (contract, "return_html_paragraphs");
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
        <a href="https://goerli.voyager.online/contract/0x060b3481d3cfdc5a76193f25a403ddeda902c39547bfe25cf0151b66f6201086#readContract" target="_blank" rel="noopener noreferrer">0x060b3481d3cfdc5a76193f25a403ddeda902c39547bfe25cf0151b66f6201086</a>
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
