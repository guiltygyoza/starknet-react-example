import "./App.css";
import { CallContractStringifyReturn, useSvgContract, useTableContract, svgStringToBase64, htmlParse } from "./lib/contracts";
import { BlockHashProvider } from "./providers/BlockHashProvider";
import { StarknetProvider } from "./providers/StarknetProvider";
import { TransactionsProvider } from "./providers/TransactionsProvider";


//
// App
//
function App() {
  const svgContract = useSvgContract();
  const tableContract = useTableContract();
  const svg_string = CallContractStringifyReturn (svgContract, "return_svg");
  const html_string = CallContractStringifyReturn (tableContract, "return_html_table");

  return (
    <div className="container">

      <div className="row">
        :: Topology ::
      </div>

      <div className="row">
        where wizards stay up late.
      </div>

      <div className="row">
        <a href="https://twitter.com/topology_gg" target="_blank" rel="noopener noreferrer">
        <img src={`data:image/svg+xml;base64,${ svgStringToBase64(svg_string) }`} alt="" />
        </a>
      </div>

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
