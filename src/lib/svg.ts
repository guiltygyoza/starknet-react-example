import React from "react";
import { Contract, Abi, compileCalldata } from "starknet";
import { getSelectorFromName } from 'starknet/dist/utils/stark';
import { useStarknet } from "../providers/StarknetProvider";

//
// Can we pull abi from voyager? to minimize web2 footprint
//
import SVG from "./abi/svg_abi.json";

//
// Contract address
//
const ADDRESS =
  "0x04734f589e1a9c60cbccaa79bad157b7cb1704264990faa0f06ca2e3ebe2c45b";

//
// Function to set the contract
//
export function useSvgContract(): Contract | undefined {
  const { library } = useStarknet();
  const [contract, setContract] = React.useState<Contract | undefined>(
    undefined
  );

  React.useEffect(() => {
    setContract(new Contract(SVG as Abi[], ADDRESS, library));
  }, [library]);

  return contract;
}

//
// Function to retrieve svg from contract
//
export function CallReturnSvgString (
  contract: Contract | undefined
): string | undefined {

  const [ret, setRet] = React.useState<string | undefined>(undefined);

  const entrypointSelector = getSelectorFromName("return_svg")
  const calldata = compileCalldata({})

  const callRetSvg = React.useCallback(async () => {
    if (contract && contract.connectedTo) {

      contract.provider
        .callContract({
          contract_address: contract.connectedTo,
          calldata,
          entry_point_selector: entrypointSelector,
        }).then( (res) => {
          let recovered_string = ""
          let hexstr_array = res.result.slice(1,)
          for (var i=0; i<hexstr_array.length; i++){
            let str = hexstr_array[i].slice(2,)
            let bytes = hexToBytes(str)
            let s = bin2String(bytes)
            recovered_string += s
          }
          setRet(recovered_string)
        })

    }
    else {
      setRet(undefined)
    }

  }, [contract, calldata, entrypointSelector]);

  React.useEffect(() => {
    callRetSvg();
  }, [callRetSvg]);


  return ret;
}

//
// Utility functions below for parsing starknet contract return values
// TODO: move the functions below to separate files / publish them as library
//


// https://stackoverflow.com/questions/61272872/how-to-render-svg-string-as-image-in-react
// tl;dr btoa() does the work
export function svgStringToBase64 (str : string | undefined) {
  if (str) {
    return btoa(str);
  }
  else {
    return undefined;
  }
}


// https://stackoverflow.com/questions/14603205/how-to-convert-hex-string-into-a-bytes-array-and-a-bytes-array-in-the-hex-strin
function hexToBytes(hex : string) {
  for (var bytes = [], c = 0; c < hex.length; c += 2)
      bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
}


// https://stackoverflow.com/questions/9939760/how-do-i-convert-an-integer-to-binary-in-javascript
function bin2String(array : number[]) {
  var result = "";
  for (var i = 0; i < array.length; i++) {
    result += String.fromCharCode(parseInt(array[i].toString(2), 2));
  }
  return result;
}

