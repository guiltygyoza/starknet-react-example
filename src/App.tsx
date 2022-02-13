import "./App.css";
import {
  CallContractStringifyReturn,
  useParagraphContract,
  useSvgContract,
  useTableContract,
  svgStringToBase64,
  htmlParse } from "./lib/contracts";
import { BlockHashProvider } from "./providers/BlockHashProvider";
import { StarknetProvider } from "./providers/StarknetProvider";
import { TransactionsProvider } from "./providers/TransactionsProvider";


//
// App
//
function App() {
  const paragraphContract = useParagraphContract();
  const svgContract = useSvgContract();
  const tableContract = useTableContract();
  const paragraph_string = CallContractStringifyReturn (paragraphContract, "return_html_paragraphs")
  const svg_string = CallContractStringifyReturn (svgContract, "return_svg");
  const html_string = CallContractStringifyReturn (tableContract, "return_html_table");

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
